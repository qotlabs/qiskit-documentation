#!/usr/bin/env python3

import os
import tarfile
import json
import argparse
import shutil
import errno
from pathlib import Path


def path_relative_to_script(path: Path | str) -> Path:
    return (Path(__file__).parent / path).relative_to(Path.cwd())


def get_tar_members(tar: tarfile.TarFile, path: str,
                    node_modules: bool = True,
                    verbose: bool = False):
    if not path.endswith("/"):
        path += "/"
    offset = len(path)
    for info in tar.getmembers():
        if info.name.startswith(path):
            info.name = info.name[offset:]
            if not node_modules and info.name.startswith("node_modules"):
                continue
            if verbose:
                print(info.name)
            yield info


def do_download(args):
    docker_pull = path_relative_to_script("docker_pull.py")
    os.system(f"./{docker_pull} icr.io/qc-open-source-docs-public/preview@{args.digest}")


def do_extract(args):
    with tarfile.open(args.tar, "r") as image_tar:
        with image_tar.extractfile("manifest.json") as manifest_file:
            manifest = json.load(manifest_file)[0]
            layer_paths = manifest["Layers"]
        for layer_path in layer_paths:
            print(f"Extracting layer {layer_path}")
            with image_tar.extractfile(layer_path) as layer_file:
                with tarfile.open(fileobj=layer_file) as layer_tar:
                    members = get_tar_members(layer_tar, "home/node/app")
                    layer_tar.extractall(args.dir, members, filter="data")


def do_cache_clean(args):
    cache_dir = path_relative_to_script("app/packages/preview/.next/cache/")
    if cache_dir.exists():
        shutil.rmtree(cache_dir)
    print(f"Cleaned {cache_dir}")

    EXTENSIONS = ".body", ".html", ".meta", ".out", ".rsc"
    app_dir = path_relative_to_script("app/packages/preview/.next/server/app/")
    for root, dirs, files in app_dir.walk(top_down=False):
        for name in files:
            if name.endswith(EXTENSIONS):
                (root / name).unlink()
        for name in dirs:
            try:
                (root / name).rmdir()
            except OSError as e:
                if e.errno != errno.ENOTEMPTY:
                    raise
    print(f"Cleaned {app_dir}/*{{{','.join(EXTENSIONS)}}}")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description="Update Qiskit documentation application")
    subparsers = parser.add_subparsers(dest="command", title="commands",
                                       required=True)
    # Download
    download = subparsers.add_parser("download", help="Download Docker image")
    download.set_defaults(func=do_download)
    download.add_argument("--digest", "-d",
                          help="Docker image digest for downloading",
                          default="latest")
    # Extract
    extract = subparsers.add_parser("extract", help="Extract Docker image from TAR")
    extract.set_defaults(func=do_extract)
    extract.add_argument("--tar", "-t", help="Image TAR filename",
                         metavar="<filename>", default="qc-open-source-docs-public_preview.tar")
    extract.add_argument("--dir", "-d", help="Output directory name",
                         metavar="<dirname>", default="app_new")
    # Cache clean
    cache_clean = subparsers.add_parser("cache-clean", aliases=["cc"],
                                        help="Clean app cache")
    cache_clean.set_defaults(func=do_cache_clean)

    args = parser.parse_args()
    args.func(args)

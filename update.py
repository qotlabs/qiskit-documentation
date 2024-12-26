#!/usr/bin/env python3

import os
import tarfile
import json

def get_members(tar: tarfile.TarFile, path: str,
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

if __name__ == '__main__':
    os.system("./docker_pull.py icr.io/qc-open-source-docs-public/preview@latest")
    with tarfile.open("qc-open-source-docs-public_preview.tar", "r") as image_tar:
        with image_tar.extractfile("manifest.json") as manifest_file:
            manifest = json.load(manifest_file)[0]
            layer_paths = manifest["Layers"]
        for layer_path in layer_paths:
            print(f"Extracting layer {layer_path}")
            with image_tar.extractfile(layer_path) as layer_file:
                with tarfile.open(fileobj=layer_file) as layer_tar:
                    members = get_members(layer_tar, "home/node/app")
                    layer_tar.extractall("app_new", members, filter="data")

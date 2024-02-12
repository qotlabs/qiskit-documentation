# Last Modified: Mon Feb 12 21:08:29 2024
abi <abi/3.0>,

include <tunables/global>

@{QISKIT_DOC_DIR}=/home/user/progs/qiskit-documentation
@{START_NODE_SH}=start-node.sh
@{NODE_EXECUTABLE}=/snap/node/7823/bin/node 

profile @{QISKIT_DOC_DIR}/@{START_NODE_SH} {
  include <abstractions/base>
  include <abstractions/consoles>

  @{QISKIT_DOC_DIR}/@{START_NODE_SH} r,
  @{NODE_EXECUTABLE} Cx,


  profile @{NODE_EXECUTABLE} {
    include <abstractions/base>
    include <abstractions/consoles>
    include <abstractions/openssl>

    network inet stream,
    network inet6 stream,

    /snap/core20/2105/usr/lib/x86_64-linux-gnu/* mr,
    @{NODE_EXECUTABLE} mr,
    owner /proc/*/cgroup r,
    owner @{QISKIT_DOC_DIR}/app/node_modules/** r,
    owner @{QISKIT_DOC_DIR}/app/node_modules/@parcel/watcher-linux-x64-glibc/watcher.node mr,
    owner @{QISKIT_DOC_DIR}/app/package.json r,
    owner @{QISKIT_DOC_DIR}/app/packages/** r,
    owner @{QISKIT_DOC_DIR}/app/packages/preview/.next/cache/** w,
    owner @{QISKIT_DOC_DIR}/docs/docs/ r,
    owner @{QISKIT_DOC_DIR}/docs/docs/** r,
    owner @{QISKIT_DOC_DIR}/docs/public/** r,

  }
}

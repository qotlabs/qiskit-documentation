abi <abi/3.0>,

include <tunables/global>

@{QISKIT_REPO}=/srv/qiskit/documentation
@{NODE_EXECUTABLE}=/snap/node/7823/bin/node

profile @{QISKIT_REPO}/app.sh {
  include <abstractions/base>
  include <abstractions/consoles>

  @{QISKIT_REPO}/app.sh r,
  @{NODE_EXECUTABLE} Cx,


  profile @{NODE_EXECUTABLE} {
    include <abstractions/base>
    include <abstractions/consoles>
    include <abstractions/openssl>

    network inet tcp,
    network inet6 tcp,

    /snap/core20/2105/usr/lib/x86_64-linux-gnu/* mr,
    @{NODE_EXECUTABLE} mr,
    owner @{QISKIT_REPO}/app/node_modules/** r,
    owner @{QISKIT_REPO}/app/package.json r,
    owner @{QISKIT_REPO}/app/packages/** r,
    owner @{QISKIT_REPO}/app/packages/preview/.next/cache/ w,
    owner @{QISKIT_REPO}/app/packages/preview/.next/cache/** w,
    owner @{QISKIT_REPO}/docs/docs/ r,
    owner @{QISKIT_REPO}/docs/docs/** r,
    owner @{QISKIT_REPO}/docs/public/** r,

  }
}

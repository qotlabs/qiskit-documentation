"use strict";exports.id=0,exports.ids=[0],exports.modules={28e3:(r,e,o)=>{o.r(e),o.d(e,{ComposerReadOnly:()=>ComposerReadOnly});var s=o(84196),a=o(8482),t=o(11415),i=o(53036);let c={...a.Q,Container:{...a.Q.Container,background:"var(--cds-background)"},Wires:{...a.Q.Wires,color:"var(--cds-layer-accent-01)"},RegisterLabels:{...a.Q.RegisterLabels,text:"var(--cds-text-helper)"},Operations:{...a.Q.Operations,qubitToBitWireColor:"#979797",qubitToBitWireText:"var(--cds-text-primary)",background:(r,e)=>"gate"===r.kind&&e?"built-in"===e.location.kind&&"CX"===e.id?"var(--composer-classical-bg)":t.aE(e)?"h"===e.id?"var(--composer-h-bg)":["x","cx","ccx","c3x","c4x","swap","cswap","id"].includes(e.id)?"var(--composer-classical-bg)":["t","s","z","tdg","sdg","p","rz"].includes(e.id)?"var(--composer-phase-bg)":"var(--composer-quantum-bg)":"var(--composer-custom-bg)":"reset"===r.kind||"measure"===r.kind?"var(--composer-operator-bg)":"barrier"===r.kind?"var(--composer-barrier)":"var(--composer-operator-bg)",text:r=>"gate"===r.kind?"h"===r.id?"var(--composer-h-text)":"rzz"===r.id?"var(--composer-rzz-text)":["t","s","z","tdg","sdg","p","rz"].includes(r.id)?"var(--composer-phase-text)":"var(--composer-classical-text)":"var(--composer-operator-text)"}};function ComposerReadOnly(r){return s.jsx(i.q,{theme:c,...r})}}};
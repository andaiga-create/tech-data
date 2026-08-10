# Troubleshooting

**Keywords:** Overload, Weight Error, Zero Drift, LMI Fault, No Load Reading

---

## Case 1 — LMI Shows Erratic / Unstable Load Reading

**Problem**
Displayed load value jumps or flickers even with a static load, or fluctuates with no load applied.

**Possible Cause**
- Moisture ingress at load cell connector or junction box
- Damaged signal cable (chafe, crush point)
- Electrical noise from nearby VFD/motor cable
- Faulty amplifier/junction box card

**Inspection**
1. Check connector and junction box for moisture, corrosion.
2. Inspect cable run for damage/chafe points.
3. Check cable routing relative to power cables.
4. Swap/test with known-good junction box card if available.

**Corrective Action**
- Dry out and reseal connector, replace damaged seals/glands.
- Replace damaged cable section.
- Re-route signal cable away from power cables, add shielding if needed.
- Replace junction box/amplifier card if isolated to that component.

**Final Check**
Confirm stable reading (± normal tolerance) over 10-minute static load hold.

---

## Case 2 — Zero Offset / Reading Consistently Wrong

**Problem**
LMI reads a nonzero value with no load, or reading is consistently off by a fixed amount across the range.

**Possible Cause**
- Zero drift from mechanical shift (pin seated differently after reassembly)
- Physical damage to load cell (overload event, impact)
- Calibration lost after processor replacement/reset

**Inspection**
1. Record current zero-load reading, compare to last calibration record.
2. Inspect load cell/pin for visible damage or signs of prior overload.
3. Check calibration record date and any recent maintenance events (pin/cell replacement).

**Corrective Action**
- If offset is small and consistent → re-zero per **Setting** procedure.
- If load cell shows physical damage or reading is unstable/nonlinear → replace load cell, full re-calibration required.
- If recent processor replacement → restore calibration factors or perform full span calibration.

**Final Check**
Full calibration check per **Setting** procedure; do not return to service until within acceptance criteria.

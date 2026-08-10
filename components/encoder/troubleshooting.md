# Troubleshooting

**Keywords:** Encoder Error, Signal Error, No Feedback, Calibration Error

---

## Case 1 — No Feedback / Angle Frozen

**Problem**
PLC boom angle value does not change when boom is raised/lowered. Alarm: `ENCODER NO SIGNAL`.

**Possible Cause**
- Broken coupling between shaft and encoder
- Disconnected or broken signal cable
- Encoder internal failure
- PLC input card failure

**Inspection**
1. Check 24V supply present at encoder terminals (measure at connector).
2. Check A/B pulse output with multimeter set to frequency, rotate shaft by hand.
3. Inspect coupling for slippage or breakage.

**Corrective Action**
- If 24V missing → trace back to PLC card fuse / wiring.
- If 24V present but no pulses → replace encoder.
- If coupling broken → replace coupling, re-do zero teach (see **Setting**).

**Final Check**
Rotate boom through full range, confirm smooth continuous angle change with no dropout.

---

## Case 2 — Angle Reading Drifts / Inconsistent

**Problem**
Angle value differs from actual boom position, error grows over time or after repeated cycles.

**Possible Cause**
- Coupling slipping under load (not fully tightened)
- Electrical noise on signal line (cable routed near VFD/motor cable)
- Zero offset lost after power interruption

**Inspection**
1. Check coupling set-screw torque.
2. Check cable routing/shielding — signal cable should not run parallel to power cable.
3. Compare PLC angle to boom angle indicator or inclinometer.

**Corrective Action**
- Re-torque coupling set screw to spec, re-teach zero.
- Re-route or shield signal cable away from power cables.
- Re-teach zero offset (see **Setting**).

**Final Check**
Confirm angle tracks actual position within ±0.5° across full range after 3 full cycles.

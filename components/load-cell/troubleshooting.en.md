## Troubleshooting

Search keywords: Load Cell, Overload, Calibration Error, Signal Error, Zero Drift

### Symptom: RCL displayed load value is inaccurate (does not match actual load)

**Possible Cause**
- Zero drift (temperature or aging-related zero shift)
- Accumulated calibration error
- Signal noise from poor cable/connector contact

**Inspection**
- [ ] Re-check the zero value with no load applied
- [ ] Verify accuracy using a known test weight
- [ ] Check signal wire grounding and shielding

**Corrective Action**
1. Re-zero if zero drift is present
2. If error exceeds spec, perform a full recalibration
3. If noise is wiring-related, replace with shielded cable and improve grounding

**Final Check**
Confirm the calibration acceptance criteria (within ±1% across the full range) are met.

---

### Symptom: Overload indicator remains triggered despite a normal actual load

**Possible Cause**
- Prior shock-load event causing a false trip history
- Internal strain gauge damage

**Inspection**
- [ ] Re-verify calibration accuracy
- [ ] Perform detailed visual/non-destructive inspection of the load cell body

**Corrective Action**
1. If detailed inspection finds no issue, reset the indicator and recalibrate
2. If strain gauge damage is confirmed, replace the load cell with a new unit (not field-repairable)

> ⚠ The load cell is a safety-related component. If damage is suspected, never attempt a field repair — always replace with a new unit.

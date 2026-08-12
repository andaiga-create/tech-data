## Troubleshooting

Symptom-based causes and actions. Search keywords: Encoder Error, Signal Error, No Feedback, Calibration Error

### Symptom: Encoder Alarm (PLC Fault Code E-12)

**Possible Cause**
- Signal wire open circuit / poor contact
- Poor connector engagement
- Supply voltage abnormal (below 24V)

**Inspection**
- [ ] Re-check connector engagement
- [ ] Measure supply terminal voltage (rated 24V ±10%)
- [ ] Measure signal wire resistance / continuity

**Corrective Action**
1. Re-seat the connector or replace the cable
2. Inspect the power supply and adjust voltage
3. Reset the PLC fault and restart

**Final Check**
Confirm the PLC pulse count increases without delay during normal rotation.

---

### Symptom: No Feedback (no signal received at all)

**Possible Cause**
- Cable completely severed
- Encoder internal circuit failure
- SSI/pulse communication wiring error

**Inspection**
- [ ] Cable continuity test
- [ ] Power the encoder standalone and check output waveform (oscilloscope)

**Corrective Action**
1. Replace the cable if severed
2. Replace the encoder if internally faulty
3. Rewire per the wiring diagram if a wiring error is found

> ⚠ If the same symptom persists after replacement, expand the scope to the PLC card or inverter input side.

## Troubleshooting

Search keywords: DX series, temperature controller, OOOO, UUUU, LBA, Auto-tuning, AT lamp, alarm

### Symptom: PV display shows `OOOO` or `UUUU`

**Possible Cause**
- Input out of range (actual sensor value exceeds max/min scale)
- Mismatch between the suffix-code input type and the sensor actually connected
- Sensor open circuit or reversed wiring polarity

**Inspection**
- [ ] Compare the nameplate/suffix-code input type (K, J, R, Pt100, etc.) against the actual sensor
- [ ] Check input terminal wiring polarity and connection
- [ ] Measure sensor resistance/voltage with a meter to check for an open circuit

**Corrective Action**
1. If the input type is mismatched, reset it correctly in SL1 (initial setting mode)
2. If wiring polarity is wrong or there's an open circuit, rewire or replace the cable
3. Power-cycle and re-verify the PV display is normal

**Final Check**
Confirm PV stably tracks close to the actual temperature under normal conditions.

---

### Symptom: Auto-tuning never completes, AT lamp keeps blinking

**Possible Cause**
- Heater/cooler is not actually operating (bad output wiring, actuator failure)
- Control operation direction (SL9) set incorrectly (heating/cooling reversed)

**Inspection**
- [ ] Check whether the heater/cooler actually responds when the control output is active (via ammeter or temperature change)
- [ ] Check the SL9 control operation direction setting

**Corrective Action**
1. Inspect and repair output wiring and actuator (SSR, contactor, heater)
2. Set SL9 to match the actual application (heating/cooling)
3. Restart auto-tuning

---

### Symptom: Loop Break Alarm (LBA) triggers

**Possible Cause**
- Heater burned out or SSR/relay failed, so control output isn't reaching the load
- LBA time set shorter than the system's actual response speed
- Sensor detached from the actual target (dislodged temperature probe)

**Inspection**
- [ ] Measure heater resistance (check for open circuit)
- [ ] Check voltage/continuity at the SSR/relay output
- [ ] Check sensor insertion position and mounting
- [ ] Check the LBA time setting

**Corrective Action**
1. Replace the burned-out heater or failed output device
2. Reinsert and secure the sensor
3. Re-tune LBA time to match the system's thermal capacity if needed
4. Reset LBA and confirm normal operation

---

### Symptom: High/Low alarm lamp stays on

**Possible Cause**
- Actual process temperature is outside the alarm setpoints (SL13/SL14)
- Alarm setpoints themselves are set incorrectly
- Sensor drift (long-term error)

**Inspection**
- [ ] Compare actual temperature against the PV display (cross-check with an independent thermometer)
- [ ] Check the high/low alarm setpoints
- [ ] Check for sensor aging/drift (calibrate if needed)

**Corrective Action**
1. If it's a genuine process fault (overheating/overcooling), address the root cause first
2. If the setpoints are inappropriate, reset them to match actual operating range
3. If sensor drift is suspected, replace or calibrate the sensor

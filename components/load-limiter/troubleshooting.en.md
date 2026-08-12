## Troubleshooting

Search keywords: Load Limiter, SH-1200A, E-01, E-02, E-03, E-04, Error Code, unstable reading, Overload

### Error Code: E-01

**Possible Cause**
- The difference between the GAIN A/D value and the zero-setting A/D value is 1000 counts or less (signal difference too small)

**Inspection**
- [ ] Check load cell wiring (EXC+/-, SIG+/-) connections
- [ ] Check load cell supply voltage (DC±10V)
- [ ] Compare the A/D value with and without load, using A/D VALUE VIEW mode

**Corrective Action**
1. Re-check and re-seat the load cell wiring
2. If the load cell itself is suspected faulty, replace it and redo the setup
3. Redo the WEIGHT SET (actual load calibration) procedure

---

### Error Code: E-02

**Possible Cause**
- The GAIN setting is 2000 counts or more while DIVISION is set to 1 (mismatched settings)

**Inspection**
- [ ] Check the current DIVISION setting
- [ ] Check the GAIN (A/D) setting

**Corrective Action**
1. Increase DIVISION (to 2 or 5), or
2. Redo WEIGHT SET so the GAIN value falls back within spec

---

### Error Code: E-03

**Possible Cause**
- DIVISION was set to 1 while GAIN is 2000 counts or more (same root cause family as E-02)

**Inspection**
- [ ] Check the GAIN value before changing DIVISION to 1

**Corrective Action**
1. Before setting DIVISION to 1, confirm GAIN is below 2000 counts
2. If that's not achievable, keep DIVISION at 2 or higher

---

### Error Code: E-04

**Possible Cause**
- Load cell input voltage is OVER (exceeds the allowed range)

**Inspection**
- [ ] Check load cell wiring polarity (+/-) for a miswire
- [ ] Check the load cell itself for damage (history of overload)
- [ ] Confirm the load cell supply voltage doesn't exceed spec (DC±10V)

**Corrective Action**
1. Correct the wiring polarity
2. Replace the load cell with a new unit if damage is confirmed (never repair a load cell with an overload history — replace it)
3. If the supply voltage is abnormal, inspect the controller's power supply section

> ⚠ The load cell is a safety-related component. If damage is suspected, never attempt a field repair — always replace it with a new unit.

---

### Symptom: Reading jitters or won't stabilize even with no load

**Possible Cause**
- Load cell mounting direction (load point) doesn't match the actual load direction
- Load cell locating key/groove worn or loose
- Signal cable routed close to power/motor drive cables, picking up noise
- Signal cable shield poorly grounded or double-grounded

**Inspection**
- [ ] Confirm the load cell's load-point direction matches the actual applied load direction
- [ ] Check the locating key and groove for wear
- [ ] Check the signal cable routing and its separation distance from power cables
- [ ] Check the shield grounding points (single ground at start/end only?)

**Corrective Action**
1. Realign the load cell mounting direction
2. Replace the locating key if worn
3. Re-route the signal cable away from power/motor cables; apply metal flexible conduit if needed
4. Consolidate shield grounding to a single point at the start/end (remove any double-grounding)

**Final Check**
Temporarily raise the FILTER value (e.g. to 5–7) and see if the instability eases immediately — if it does, the cause is noise/installation-related; if not, narrow the investigation to the load cell itself.

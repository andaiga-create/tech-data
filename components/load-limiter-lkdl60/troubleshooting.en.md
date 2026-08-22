## Troubleshooting

Search Keywords: LOAD LIMITER, overload, E-Pr, E-bC, EA-C, EAb-, E---, reverse phase, phase loss, LOAd, L.-Lo., H.-Lo.

### Symptom: Overload trip (`LOAd` → `L.-Lo.` or `H.-Lo.` shown, Relay opens)

**Possible Cause**
- An actual motor overload (mechanical jam, load exceeding rating, etc.)
- L/H phase setting current set too low relative to the actual load
- SHOCK TIME set too short, tripping on momentary starting current

**Inspection**
- [ ] Check the machine on-site for jamming or overload
- [ ] Use the SELECT button to check the current L/H setting current and SHOCK TIME
- [ ] Confirm reproducibility using the HT/LT test buttons

**Corrective Action**
1. Resolve the actual overload cause (mechanical jam, etc.) first if present.
2. If the setting current/SHOCK TIME doesn't match actual load conditions, re-set it following the Setting procedure (do not raise it arbitrarily, which would defeat the protection function).
3. Press the RETURN button to restore the `P.0.0` state.

**Final Check**
Confirm that during normal-load operation the L/H current display stays stable within the setting and no repeat trip occurs.

---

### Symptom: 3-phase reverse-phase detected (`E-Pr` shown, 3 short beeps repeating)

**Possible Cause**
- Incorrect phase sequence (R-S-T) wiring of the incoming 3-phase power to the control panel

**Inspection**
- [ ] Check the phase sequence of the incoming 3-phase supply
- [ ] (LKDL-60 series) Confirm that in the reverse-phase state, UP/DOWN operation via the push buttons is disabled, and any other operation continues to show the ERROR MESSAGE with the buzzer sounding

**Corrective Action**
1. Turn the power OFF (on the LKDL-60 series, the ERROR state does not clear until power is cycled).
2. Swap the connection order of two of the three incoming power leads to restore the correct phase sequence.
3. Re-apply power and confirm the display returns normally to `P.0.0`.

**Final Check**
After re-applying power, confirm there is no error display, the unit enters `P.0.0` normally, and UP/DOWN operation works correctly.

---

### Symptom: Phase loss detected (`E-bC`/`EA-C`/`EAb-`/`E---` shown, 2 short beeps repeating)

**Possible Cause**
- An open/loose connection in one phase (R/S/T) or all phases of the 3-phase supply
- A blown fuse or tripped breaker on the affected phase in the control panel

**Inspection**
- [ ] Identify the affected phase(s) from the display code: `E-bC` (R phase), `EA-C` (S phase), `EAb-` (T phase), `E---` (all of R, S, T)
- [ ] Check the wiring and terminal connections on the affected phase
- [ ] Check the fuse/breaker condition on the affected phase

**Corrective Action**
1. De-energize the unit and re-inspect/re-secure the wiring on the affected phase.
2. Replace any broken cable or blown fuse.
3. Re-apply power and confirm the error clears.

**Final Check**
After re-applying power, confirm the display returns normally to `P.0.0` and the L/H phase current values change normally with load.

---

### Symptom: Mis-operation from excessive jogging (continuous long buzzer tone)

**Possible Cause**
- Jog operation repeated at short intervals, exceeding the configured jog-sensitivity time (t) / count (n) thresholds

**Inspection**
- [ ] Check the current jog-sensitivity time (`t 0.0`) and count (`n 0.0`) settings
- [ ] Review the actual jogging pattern used (interval, frequency)

**Corrective Action**
1. Increase the interval between jog operations, or reduce the number of consecutive jogs, during operation.
2. If frequent jogging is unavoidable given the actual operating pattern, have the safety officer review and adjust the t/n values to suit field conditions following the Setting procedure.

---

### Symptom: LED display stays off or unresponsive after power-on

**Possible Cause**
- Supply voltage mismatch (nameplate spec is AC24V/110V/220V but a different voltage is actually applied)
- Internal cable connector disconnected or making poor contact
- Damaged main unit (shipping/handling shock, applied voltage outside rating, etc.)

**Inspection**
- [ ] Confirm the nameplate POWER rating matches the actual applied voltage
- [ ] Check the main unit–to–cable connector seating
- [ ] Check for external damage (from transport or impact)

**Corrective Action**
1. De-energize the unit and re-verify the supply voltage matches the rating.
2. Re-seat the cable connector.
3. If the display remains off despite no issues found, disconnect the main unit from the cable, replace it, and contact the manufacturer (LK HOIST CO., LTD.) for A/S.

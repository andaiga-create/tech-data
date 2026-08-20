## Inspection

> ⚠ Opening the inner front panel (setting area) while power is energized risks electric shock and mis-operation. Any internal work such as DATA changes must be performed only by an authorized safety officer, and the unit must be re-sealed after the work is complete.

- [ ] Confirm the nameplate (MODEL, POWER voltage) matches the actual supply voltage
- [ ] Confirm the LED display shows `P.0.0` (ready state) after power-on
- [ ] Use the SELECT button to review the SETTING DATA: L/H SHOCK TIME, RESET TIME, L/H setting current, jog-sensitivity time/count
- [ ] Check the external current transformer (C.T) wiring condition and lead length (recommended within 1 m)
- [ ] Check the cover is fastened and the seal is intact
- [ ] Use the HT/LT test buttons to confirm a normal overload trip, then confirm normal recovery via the RETURN button

### Acceptance Criteria

| Item | NORMAL | ABNORMAL |
|---|---|---|
| Power-on display | Shows `P.0.0` then enters ready state | No display, flickering, or an ERROR code (`E-Pr`/`E-bC`/`EA-C`/`EAb-`/`E---`) |
| L/H phase running current display | `L 0.0` / `H 0.0` changes in proportion to actual motor load | Value stuck, jittering, or abnormally low/zero at all times |
| Overload trip | Shows `LOAd` → `L.-Lo.` or `H.-Lo.` when current exceeds the setting, Relay opens, buzzer sounds continuous short beeps | No trip under overload, or buzzer does not sound |
| HT/LT test button operation | Holding the button past the set time produces a normal trip | No trip occurs, or the unit does not clear with the RETURN button |
| 3-phase wiring | No error code shown with correct wiring | `E-Pr` (reverse phase), `E-bC`/`EA-C`/`EAb-` (single-phase loss), `E---` (all-phase loss) shown, with 3-beep or 2-beep buzzer pattern |
| Cover / seal | Fully fastened, seal intact | Loose, seal broken or missing |

> ✅ If every item is NORMAL, the unit can be placed into service. If any item is ABNORMAL, proceed to the Troubleshooting section.

## Setting

| Display | Item | Factory Default | Adjustment Range | Setting Unit |
|---|---|---|---|---|
| `5.L.0.0` | "L" SHOCK TIME | 1 sec | 0.1 ⇔ 9.9 sec | 0.1 sec |
| `5.H.0.0` | "H" SHOCK TIME | 1 sec | 0.1 ⇔ 9.9 sec | 0.1 sec |
| `5.5.0.0` | RESET TIME | 1.5 sec | 0.1 ⇔ 9.9 sec | 0.1 sec |
| `L 0.0` | "L" phase setting current | Set per motor capacity | 1.0 ⇔ 80A | 0.1A |
| `H 0.0` | "H" phase setting current | Set per motor capacity | 1.0 ⇔ 80A | 0.1A |
| `t 0.0` | Jog-sensitivity setting time | 350 msec | 10 ⇔ 990 msec | 1 msec |
| `n 0.0` | Jog-sensitivity setting count | 5 times | 1 ⇔ 20 times | 1 time |

> ℹ The factory default for the "L"/"H" phase setting current is determined on-site based on the applied motor capacity — the source material does not provide a fixed default figure. Record and manage the actual field value from the installed unit's SETTING DATA and nameplate.

### Setting Procedure

> ⚠ DATA entry/change is only possible from the inner front panel and must be performed only by an authorized safety officer. Re-seal the unit after the work is complete.

1. Power on the unit and confirm the LED display shows `P.0.0` (ready state).
2. Open the cover to access the inner front panel (setting area).
3. Press the MEMORY button once to enter SETTING mode (display shows `C.0.0`).
4. Press the ▲ button to bring up the LOAD LIMITER SETTING CHART code (`C.18`).
5. Press the SELECT button to step through the setting items in this order: `5.L.0.0` ("L" SHOCK TIME) → `5.H.0.0` ("H" SHOCK TIME) → `5.5.0.0` (RESET TIME) → `H 0.0` ("H" phase setting current) → `L 0.0` ("L" phase setting current) → `t 0.0` (jog-sensitivity time) → `n 0.0` (jog-sensitivity count).
6. At each item, use the ▲/▼ buttons to set the desired value.
7. After all items are set, press SELECT to advance, then press MEMORY once to save.
8. If the newly entered value differs from the stored value, the display shows `SAVE` and stores it, then returns to `P.0.0`. If it's unchanged, the display shows `ESC` and returns without saving.
9. After setting is complete, close the cover and re-seal the unit.

> ⚠ Repeated continuous jogging can cause mis-operation — be mindful of the jog-sensitivity settings (t, n) and how often jogging is used during actual operation.

### Acceptance Criteria

- Every SETTING item must display the same value that was entered when re-checked via the SELECT button
- Saving must show `SAVE` and return normally to `P.0.0` (ready state)
- The HT/LT test buttons must trip normally at approximately the set current value
- The cover must be fastened and the seal intact after setting is complete

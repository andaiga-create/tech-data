## Setting

### How to enter each mode

| Mode | How to enter | Description |
|---|---|---|
| PV/SV setting mode | Press [MODE] key briefly | Enter SV (set value), used during normal operation |
| Initial setting mode (SL1/SL2/SL3) | Press [MODE] + [▲] together for 3 seconds | Initial setup of input type, output type, alarm mode, etc. (entry method can vary slightly by firmware version) |
| Main function setting mode (SL4–SL15) | Hold [MODE] key for 4+ seconds | Detailed parameters: decimal point position, input correction, alarm settings, LBA, etc. |

> ℹ The full SL1–SL15 parameter table was not transcribed in full here due to the limits of scanned-table recognition accuracy. Always verify exact parameter codes and setting ranges against the "Part name and functions" / "Main functions" tables in the attached original manual PDF.

### Auto-tuning (AT) procedure

1. From PV/SV mode, hold the [MODE] key for 3+ seconds to start auto-tuning.
2. The AT lamp blinks while tuning is in progress (the controller automatically calculates PID and ARW values).
3. When auto-tuning completes normally, the AT lamp turns off automatically.
4. To cancel auto-tuning mid-way, hold [MODE] for 3+ seconds again to turn the AT lamp off.

> ℹ Auto-tuning starts from roughly 2/3 of the target SV. Run it with the heater/cooler actually responding for an accurate result.

### Set values

- ALH : 70
- ALL : 60
- P : 0000
- A : 0000
- I : 0000
- d : 0000
- LbA : 0001
- C : 20
- HYS : 10
- F-r : Default value
- U-r : Default value
- LoC : 0000

### Control operation direction (SL9)

| Setting | Meaning |
|---|---|
| 0 | Reverse operation — heating control |
| 1 | Direct operation — cooling control |

### Loop Break Alarm (LBA) setting

If PV doesn't change by the specified rate within the specified LBA time despite the control output being active, LBA activates. This is used to detect a burnt-out heater, actuator failure, or sensor disconnection.

### Acceptance criteria after setting

- Confirm PV stabilizes within the setting tolerance of SV
- Confirm the AT lamp is fully off
- Confirm ALM1/ALM2/LBA lamps are in the normal (off) state when no alarm condition exists
- After power cycling, confirm the model display (e.g. `dX9`) and version (`V0.1`) appear correctly

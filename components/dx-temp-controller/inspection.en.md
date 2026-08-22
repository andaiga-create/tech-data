## Inspection

Check the following items, in order, before starting work.

> ⚠ Working on wiring without cutting power off risks electric shock and malfunction. Always power OFF before working, and always confirm relay output wiring stays within its rated load (current/voltage).

- [ ] Confirm Power OFF
- [ ] Check sensor (thermocouple/RTD) wiring and polarity — confirm the input type on the nameplate/suffix code matches the actual sensor installed
- [ ] Check output wiring terminals (relay/SSR/current output) are properly seated
- [ ] Check panel mounting and insulation
- [ ] Check the PV/SV display for contamination, damage, or condensation
- [ ] Check indicator lamps (OUT, AT, ALM1, ALM2, LBA)

### Acceptance criteria

| Item | NORMAL | ABNORMAL |
|---|---|---|
| PV display | Reads proportionally to actual temperature | Shows `OOOO` (over input range) or `UUUU` (under input range) |
| Sensor wiring | Fully seated, no insulation damage | Open circuit, poor contact, reversed polarity |
| Output lamp (OUT) | Blinks normally with control action | Stuck ON or completely OFF (no response) |
| AT lamp | Blinks only during auto-tuning, off when complete | Stays blinking for an extended time |
| LBA indicator | OFF under normal operation | ON when a loop break is detected |

> ✅ If all items are NORMAL, the unit can be put into normal operation. If any item is ABNORMAL, go to the Troubleshooting procedure below.

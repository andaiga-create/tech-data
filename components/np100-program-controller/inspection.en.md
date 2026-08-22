## Inspection

Check the following items, in order, before starting work.

> ⚠ The input/output terminals carry electric shock risk. Before wiring, always cut power to the controller and any external supply, and confirm with a meter that connected cables are not live before working.

- [ ] Confirm Power OFF and check wiring connections (terminal polarity)
- [ ] Confirm the installed sensor type matches the Input Setting Group (G.In) configuration
- [ ] Check grounding (2mm² or thicker wire, Class-3 grounding or better, ground resistance ≤100Ω, cable length ≤20m)
- [ ] Check front-panel LED status (RUN/WAIT/HOLD/MAN, AL1/AL2, TS1/TS2, OUT, AT, SEG1-10)
- [ ] Check panel mounting (2 mounting brackets, tightening torque approx. 14.7 N·cm)

### Individual LED functions

| LED | Function |
|---|---|
| RUN | Lit while program operation is running |
| WAIT | Lit during a WAIT action while the program is running |
| HOLD | Lit during a HOLD action while the program is running |
| MAN | Lit during manual operation |
| AL1 / AL2 | Lit when alarm 1 / alarm 2 is active |
| TS1 / TS2 | Lit when time signal 1 / 2 is active |
| OUT | Lit when the control output is ON |
| AT | Blinks during auto-tuning |
| SEG1-10 | Shows the segment currently in progress during program operation |
| PT1 / PT2 | Lit when pattern 1 / pattern 2 is selected |
| ▲(rising) / ━(soak) / ▼(falling) | Lit when the segment is in a rising / soak (hold) / falling stage |

### Acceptance criteria

| Item | NORMAL | ABNORMAL |
|---|---|---|
| PV display | Reads proportionally to actual temperature | On burnout (input open), display is pinned to the configured UP/DOWN scale direction |
| RUN LED | Lit while program runs, off when stopped | Doesn't light after a run command |
| AT LED | Blinks only during auto-tuning, off when done | Keeps blinking for an extended time |
| Alarm (AL1/AL2) | Activates only under the configured condition | Alarms persistently under normal conditions, or fails to respond to an actual fault |

> ✅ If all items are NORMAL, the unit can be put into normal operation. If any item is ABNORMAL, go to the Troubleshooting procedure below.

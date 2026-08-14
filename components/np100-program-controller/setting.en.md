## Setting

> ⚠ All pre-operation setup must be done in Engineering mode. Configure groups in the order **Input → Output → other groups**. Changing input or output group data out of order after other groups are already set can reset those other groups' data.

### Mode entry / navigation

| Action | Method |
|---|---|
| Run display mode → Engineering mode | Hold SET for 2.5+ seconds (shows G.EnG) |
| Engineering group ↔ Program group | From the G.EnG/G.Pro screen, toggle with STEP (▲) / HOLD (▼) |
| Enter a group | SET key |
| Move between groups | STEP (▲) / HOLD (▼) |
| Return to the parent group | < (left) key |
| Move digit position | < key |
| Save value and move to next item | Change the value, then press SET |
| Pause/resume the current segment during a run | Press < + HOLD together |
| Force-advance to the next segment during a run | Press < + STEP together |
| Change pattern number | P1/P2 key |
| Switch Auto/Manual | AUTO/MAN key |
| End the current program/run and go to stop | RST key |

### Key function summary

| Key | Function |
|---|---|
| RUN | Starts running the currently selected pattern |
| SET | Enters/confirms a setting value, moves between parameters; hold 2.5+ sec to toggle run display ↔ engineering mode |
| RST | Ends the running program/manual operation and returns to stop/reset; exits program setting mode |
| < | Moves the digit position being edited |
| STEP (▲) | Changes a parameter value; moves between groups |
| HOLD (▼) | Changes a parameter value; moves between groups |
| P1/P2 | Toggles the pattern number each press |
| AUTO/MAN | Toggles between program run and manual (MAN) control |

---

### 8-1-1. Input Setting Group (G.In)

| Symbol | Item | Setting range | Default |
|---|---|---|---|
| InP | Input type | 18 types total: 12 thermocouples, 2 RTDs, 4 DC voltage ranges | K(1) |
| Fr-H | Upper range | Within range (FR-H > FR-L) | 1370 |
| Fr-L | Lower range | Within range | -200 |
| dP-P | Decimal point position | 0-3 (voltage input) | 1 |
| SL-H | Upper scale | -1999 to 9999 (voltage input; SL-H > SL-L) | 100.0 |
| SL-L | Lower scale | -1999 to 9999 (voltage input) | 0.0 |
| rJC | Cold-junction compensation | ON, OFF (thermocouple input) | ON |
| FILT | Measured-value filter | OFF, 1-120 | OFF |
| bIAS | Measured-value correction (bias) | -100 to 100 %(EUS) | 0% |
| boUt | Burnout action | OFF, UP, DOWN | UP |

> ℹ On burnout (input open), selecting UP pins the display to the max value and DOWN pins it to the min value; the output goes OFF either way.

### 8-1-2. Output Setting Group (G.oUt)

| Symbol | Item | Setting range | Default |
|---|---|---|---|
| oUt | Output type | ON/OFF, SSR (solid-state relay), SCR (4-20mA current), RLY (relay) | RLY |
| oACt | Heat/cool control select | REV (heating/reverse), DIR (cooling/direct) | REV |
| Ct | Heating cycle time | 1-1000 sec (SSR, relay) | 30 sec |
| HYS | Hysteresis | 0-100%(EUS) (ON/OFF control) | 0.5%(EUS) |
| Po | Preset output value | -5.0 to 105.0% | 0.0 |
| oL-H | Output upper limit | OL-L+1 digit to 105.0% (PID control) | 100.0% |
| oL-L | Output lower limit | -5.0% to OL-H-1 digit (PID control) | 0.0% |

> ℹ For heating control select REV (reverse action, ON when PV < SV); for cooling select DIR (direct action, ON when PV > SV). Cycle time is normally recommended at 30 sec for relay output, 2 sec for SSR output (for contact life).

### 8-1-3. Communication Setting Group (G.Con) — shown only on the communication option

| Symbol | Item | Setting range | Default |
|---|---|---|---|
| P-rS | Communication protocol | PCL.0 (PC LINK) / PCL.1 (PC LINK SUM) | PCL.0 |
| bPS | Baud rate | 600/1200/2400/4800/9600 bps | 9600 |
| Pr I | Parity | NONE/EVEN/ODD | NONE |
| StP | Stop bit | 1 or 2 | 1 |
| dLn | Data length | 7 or 8 (8 for anything other than PC Link) | 8 |
| Adr | Address | 1-99 (up to 31 units) | 1 |
| rPt | Response time | 0-10 (processing + response time, ms) | 0 |

> ⚠ Always cut power to the controller and any external supply before wiring the communication terminals. Terminate both ends (or the master station) of the communication line with a 220Ω 1/4W terminating resistor.

### 8-1-4. Transmission Setting Group (G.trn)

| Symbol | Item | Setting range | Default |
|---|---|---|---|
| rEt | Transmission output select | PV (measured value), SV (set value), MV (output value), SPS (external sensor power) | PV |
| rEt.H | Transmission output upper limit | T.C/RTD: FR-H to FR-L; mV/V: SL-H to SL-L (RET.H > RET.L) | Follows input |
| rEt.L | Transmission output lower limit | T.C/RTD: FR-H to FR-L; mV/V: SL-H to SL-L | Follows input |

> ℹ Transmission output is 4-20mA DC. Selecting SPS (external sensor power, 24V DC 20mA max) disables the transmission output function, since they share the same terminals.

### 8-1-5. Alarm Setting Group (G.ALn)

| Symbol | Item | Setting range | Default |
|---|---|---|---|
| A1TY | Alarm-1 type | OFF / 1-21 (see Alarm Type & Code table) | 3 |
| A2TY | Alarm-2 type | OFF / 1-21 | 4 |
| A1db | Alarm-1 dead band | 0.0-100.0%(EUS) | 0.5% |
| A2db | Alarm-2 dead band | 0.0-100.0%(EUS) | 0.5% |
| AL-1 | Alarm-1 setpoint | Absolute: 0.0-100.0%(EU); deviation: -100.0 to 100.0%(EUS) | 0.0 |
| AL-2 | Alarm-2 setpoint | Same as above | 0.0 |
| P.E1 | Pattern-1 end signal | OFF/PUL/CONT (when alarm type 21 selected) | OFF |
| P.E2 | Pattern-2 end signal | OFF/PUL/CONT (when alarm type 21 selected) | OFF |

> ⚠ For relay contact output, any load beyond the contact rating (240V AC 1A, 30V DC 1A, resistive load) must always be switched through an auxiliary relay.

### Alarm types & codes (summary)

| Code | Name | ON condition |
|---|---|---|
| 1 | Absolute high alarm (normal) | PV ≥ ALM |
| 2 | Absolute low alarm (normal) | PV ≤ ALM |
| 3 | Deviation high alarm (normal) | DEV ≥ ALM |
| 4 | Deviation low alarm (normal) | DEV ≤ -ALM |
| 5 | Deviation high alarm (reverse) | DEV ≥ ALM |
| 6 | Deviation low alarm (reverse) | DEV ≤ -ALM |
| 7 | Deviation high/low alarm (normal) | DEV ≥ ALM or DEV ≤ -ALM |
| 8 | Deviation high/low band alarm (normal) | DEV ≤ ALM and DEV ≥ -ALM |
| 9 | Absolute high alarm (reverse) | PV ≥ ALM |
| 10 | Absolute low alarm (reverse) | PV ≤ ALM |
| 11-20 | Same as 1-10 above, plus hold function | — |
| 21 | Pattern end alarm | On pattern completion |

> ℹ Codes 11-20 add a "hold at power-on / on alarm type change" behavior to the same actions as codes 1-10. Refer to the original manual's "10. Alarm Types & Codes" table for exact ON/OFF conditions and timing diagrams.

### 8-1-6. Control Setting Group (G.CtL)

| Symbol | Item | Setting range | Default |
|---|---|---|---|
| FUZY | Fuzzy function | OFF/ON (not available on ON/OFF control) | OFF |
| tnU | Time unit | HH.MM (00h 00m) / MM.SS (00m 00s) | HH.MM |
| WZ | Wait zone | OFF / 0 to max range | OFF |
| Wtn | Wait time | OFF / 0.01-99.59 | OFF |
| PWr.S | Power-recovery mode | COOL / HOT | COOL |

> ℹ The FUZZY function suppresses overshoot. Wait zone/wait time makes a segment hold — instead of advancing — until PV comes within the configured deviation (wait zone), or until the wait time elapses. On power recovery: COOL returns to a reset state; HOT resumes program operation from the segment active before the outage (note: elapsed time within that segment is not preserved — it restarts from the beginning of that segment).

### 8-1-7. PID Setting Group (G.PId)

| Symbol | Item | Setting range | Default |
|---|---|---|---|
| Ar | Anti-reset windup (ARW) | Auto / 50.0-200.0% | Auto |
| PId | PID display group select | OFF / P1Gr-P4Gr | 0 |
| n.P | Proportional band | 0.1-999.9% | 5.0% |
| n.I | Integral time | OFF / 1-6000 sec | 240 sec |
| n.D | Derivative time | OFF / 1-6000 sec | 60 sec |
| n.MR | Manual reset | -5.0 to 105.0% (shown only when integral time is OFF) | 50.0% |

> ℹ There are 4 PID parameter groups (P1-P4Gr); each pattern/segment can be assigned any group. Group 1 alone typically gives acceptable control results outside special cases.

### 8-1-8. Auto-Tuning Group (G.At, shown only while running)

| Symbol | Item | Setting range | Default |
|---|---|---|---|
| At.n | Auto-tuning method | STD (standard) / LOW (low-measured-value method) | STD |
| At | Auto-tuning execute | OFF / 1-4 (PID group number) | OFF |

> ⚠ Do not use auto-tuning on: fast-responding processes like flow or pressure control; processes where the output must never toggle ON/OFF even momentarily; processes that must not see a large load applied mid-cycle; or processes where exceeding the allowed setpoint variation would harm product quality.
>
> Changing the target setpoint during auto-tuning restarts AT against the new value; once complete, the setpoint is set to the new value. If a burnout or A-D error occurs during auto-tuning, AT stops and the preset output value is output instead.

---

### 8-2. Program Group Setting (G.Pro)

#### 8-2-1. Program Repeat Count Group (G.rPt)

| Symbol | Item | Setting range | Default |
|---|---|---|---|
| rPt | Repeat count | 0 (infinite repeat) / 1-99 | 1 |

#### 8-2-2. Program Setting Mode (G.Pt)

| Symbol | Item | Setting range | Default |
|---|---|---|---|
| Pt.no | Pattern number | 0-2 | 0 |
| SEG.n | "0" segment setting (pattern base condition) | 0-10 | 0 |
| I.SSP | Start set value | Within input range | -200 |
| I.StC | Start type | SSV (start set value) / PV (current measured value) | SSV |
| tt1o | Time signal-1 ON time | OFF / 00.00-99.59 | OFF |
| tt1F | Time signal-1 OFF time (ON time < OFF time) | OFF / 00.00-99.59 | OFF |
| tt2o | Time signal-2 ON time | OFF / 00.00-99.59 | OFF |
| tt2F | Time signal-2 OFF time (ON time < OFF time) | OFF / 00.00-99.59 | OFF |
| WC | End-of-program mode | RST/HOLD/PT-1/PT-2 | RST (RESET) |
| SEG.n (1-10) | Segment number | 0-10 | 1 |
| n.PI | PID group number | 1-4 | 1 |
| n.SP | Target set value | Within input range | -200 |
| n.tm | Segment time | OFF / 00.00-99.59 (unit set in the Control Setting Group) | OFF |

**Setting procedure summary**

1. After completing all Engineering mode settings, move to Program mode (G.Pro) with STEP/HOLD.
2. Enter the Repeat Count group (G.rPt) or the Pattern setting group (G.Pt).
3. Select the pattern number (Pt.no), and set the pattern's common conditions in the "0" segment: start value, start type, time signals, end-of-program mode, etc.
4. From segment 1 onward, set the PID group, target set value, and segment time for each segment, up to 10 segments.
5. Hold SET for 2.5+ seconds to return to run mode, then press RUN to start the program.

> ℹ End-of-program mode: after pattern 1 finishes, selecting PT-1 runs it to the repeat count then resets (HOLD keeps the last value instead); selecting PT-2 chains pattern 1 into pattern 2. If pattern 2's end mode is set to PT-2, pattern 2 repeats for the configured repeat count.

### Acceptance criteria after setting

- In run display mode, confirm PV/SV and the segment's remaining time display as intended by the program
- After pressing RUN, confirm the SEG1-10 LEDs light in sequence as the program advances
- Confirm the AT lamp turns off once auto-tuning completes
- Confirm alarms (AL1/AL2) and time signals (TS1/TS2) activate only under their configured conditions

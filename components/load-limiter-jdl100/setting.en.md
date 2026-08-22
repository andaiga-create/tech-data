## Setting

> ⚠ The setting (MODE) key can only be operated with the front cover open, and only by the authorized handler or safety manager. Inching operation more than twice per second causes malfunction.

### Functional setting range and unit

| Display | Function | Initial setting | Setting range | Setting unit |
|---|---|---|---|---|
| d.0 1.0 | "L"/"H" start delay time | 1.5 (Sec) | 0.1-10 (Sec) | 0.1 (Sec) |
| o.0 1.0 | "L"/"H" overload time | 1.5 (Sec) | 0.1-10 (Sec) | 0.1 (Sec) |
| r.0 1.5 | "L"/"H" reset time | 1.5 (Sec) | 0.1-10 (Sec) | 0.1 (Sec) |
| L.000.4 | Setting current under low speed | Rated current value of motor | Depending on hoist model rating | — |
| H.000.4 | Setting current under high speed | Rated current value of motor | Depending on hoist model rating | — |

### Setting procedure

1. From standby (ready-to-run) status, press the setting (MODE) key once to enter the "L"/"H" start delay time screen (d.0 1.0).
2. Use the SEL key to select the digit position to change, then use Up (▲) / Down (▼) to change the value.
3. Keep pressing MODE to move on: overload time (2nd press) → reset time (3rd press) → H-mode current (4th press) → L-mode current (5th press), setting each the same way.
4. After the last item, press MODE once more; the unit beeps and returns to standby, saving the changes.

> ℹ To change only one function, adjust its value, then keep pressing MODE until the display returns to standby — only then is the change saved.

### Setting remarks

- Start delay time ships set to 1.5 seconds. There's no need to change it unless the actual start time is longer.
- It's safer to set reset time at least 0.2 seconds longer than start delay time.
- For a single-speed hoist, set L-mode and H-mode current to the same value (current is sensed from 2 phase lines).
- For a two-speed (creep type, pole-change type) hoist, set L-mode from the low-speed current and H-mode from the high-speed current.
- Set overload time shorter than start delay time to protect the motor against overcurrent. A setting within 1.5 seconds is normally recommended.

### Control-power wiring caution

> ⚠ The load limiter's control power must be connected upstream of the hoist/crane's power ON-OFF switch (on the incoming side). If control power is cut together with the motor ON/OFF switching, the settings may be reset or the unit may malfunction (refer to the attached "Electric Hoist Sequence" wiring diagram).

### Acceptance criteria after setting

- In standby, press Up/Down to step through and confirm the saved values (start delay / overload time / reset time / L & H current) match the intended settings
- Confirm normal TRIP operation via the L test / H test keys
- Confirm normal recovery via the RESET key

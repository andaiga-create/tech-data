## Setting

> ⚠ The WEIGHT SET (actual load calibration) menu must not be operated by anyone other than qualified maintenance personnel. The password must be obtained from the manufacturer. Unauthorized operation can lead to a serious accident.

### Key Board Usage

| Key | Function |
|---|---|
| ▲ | Increase value (by 1 per press) |
| ▼ | Decrease value (by 1 per press) |
| ▶ | Move to the next (lower/right) digit; wraps from lowest to highest row |
| ENTER | Confirm input |
| CANCEL | Cancel input / return to the parent menu |

> ℹ Adjustment sequence: `ENTER → ▶ → [select MODE] → ENTER → [enter value] → ENTER`. Read the full key-board instructions before making any adjustment.

### Mode Parameters

| Mode | Function | Input Range | Notes |
|---|---|---|---|
| AUTO | AUTO ZERO | YES / NO | Zeroes the currently displayed value |
| INIT | INITIAL | YES / NO | Resets the zeroed value |
| POIT | POINT (decimal position) | 0, 1, 2 | e.g. 1 → displays as 20.0 Ton |
| FILT | FILTER | 0–9 | Higher = more stable (averaged), less jitter |
| dIuI | DIVISION (display increment) | 0, 1, 2, 5 | Minimum step of the load display |
| nSIg | SIG1 (HIGH) / SIG2 (HIGH TIME DELAY) / SIG3 (LOW) | -999 to 9999 | Typically SIG1 = 95–100% rated, SIG2 = 100–105% rated |
| nSEt | WEIGHT SET (actual load calibration) | Password required | Maintenance personnel only |
| n420 | 4-20mA OUTPUT | Password required | Option; sets min/max weight and current |
| -Ad- | A/D VALUE VIEW | 0–16538 | Displays the current input voltage's A/D value (read-only) |

### Setting Procedure

1. **Set POINT first** — decide the decimal position (e.g. to display 20.0 Ton, set POINT = 1).
2. **AUTO ZERO** — zero the unit with no load applied (always do this after setting POINT).
3. **FILTER / DIVISION** — tune stability (FILTER) and display resolution (DIVISION) to the site's vibration conditions.
4. **WEIGHT SET (actual load calibration)** — hoist a load of at least 1/2 the crane's rated capacity at least 30cm off the ground, enter the password, then input the actual load value.
5. **SIG1/SIG2/SIG3 setting** — enter SIG1 (pre-alarm), SIG2 (alarm, with time delay), and SIG3 (low-load reference) to match the crane's rating.
6. **4-20mA output setting** (if the option is used) — enter the 4mA/20mA reference points corresponding to min/max weight.
7. **Final check via A/D VALUE VIEW** — with an actual load applied, confirm the A/D value reads stably.

### Installation Notes (Load Cell / Cabling)

- Install so the direction of force on the load cell exactly matches its load point (↓). Misalignment causes skewed output and an unstable reading.
- Properly secure the load cell's locating key. A wide or deep key groove can let the load cell rotate or shift during crane operation, affecting output.
- After installation, ensure grease is supplied normally so the sheave doesn't interfere with the load cell during rotation.
- Route load cell/signal cables separately from power cables, motor drive cables, and other high-voltage or motion-signal cables.
- Keep signal cable runs as short as possible; if separation isn't feasible, use metal flexible conduit or similar to block noise.
- Ground the controller/converter case to the crane (thick paint can prevent grounding — verify grounding continuity separately).
- Always ground the signal cable shield at both ends, but never double-ground it at intermediate J/B terminal points (double-grounding can introduce noise).
- If the distance between the load cell and controller is long, use the 4-20mA Converter (SBCA-X).

### Acceptance Criteria

- After AUTO ZERO, the no-load reading is stable at (or very close to) zero
- After WEIGHT SET, the displayed value matches a verification load within the site's required accuracy
- The relationship SIG1 < SIG2 (ALARM) < SIG3 is logically consistent with the crane's rating (confirm the alarm → cutoff sequence)

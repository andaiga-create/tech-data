# Setting

## Setting Value

| Parameter | Value |
|---|---|
| PVEH coil current range | 0–1000 mA |
| Deadband (start of spool travel) | 100–150 mA |
| Ramp time (accel/decel) | 0.5–1.5 s per function |

## Factory Default

Deadband: **120 mA** &nbsp;|&nbsp; Max current: **680 mA** &nbsp;|&nbsp; Ramp time: **1.0 s**

## Recommended Value

Adjust deadband only if function has dead joystick travel with no movement, or jumps immediately to fast speed.

## Adjustment Range

Deadband: 80–200 mA &nbsp;|&nbsp; Max current: 550–750 mA (per PVEH coil spec)

## Procedure

1. Connect PC service tool (Danfoss PLUS+1 or PLC service screen) to amplifier card.
2. Select the section/function to adjust.
3. With joystick at neutral, confirm 0 mA output.
4. Slowly deflect joystick, note current at which spool first moves — adjust `Deadband` so movement starts just past joystick's own mechanical deadband.
5. Deflect joystick fully, confirm max current within spec — adjust `Max Current` for full rated speed without exceeding coil spec.
6. Save parameters to amplifier card.

## Acceptance Criteria

- Smooth proportional response from first joystick movement, no jump/lag
- Max speed reached at full joystick deflection matches nameplate cycle time
- No function creep at neutral

## Warning

> ⚠ Do not exceed max coil current in the manufacturer datasheet — coil damage and overheating will result. Confirm crane is in a safe, clear area before testing full-range function response.

# Setting

## Setting Value

| Parameter | Value |
|---|---|
| Boom down limit angle | 0.0° |
| Boom up limit angle | 82.0° |
| Pulses per revolution | 1024 PPR |

## Factory Default

Zero offset: **0** (raw counter value at boom horizontal, set at factory calibration)

## Recommended Value

Field zero-offset should be re-taught any time the encoder, coupling, or gearbox is replaced.

## Adjustment Range

Offset teach range: ±5.0° from mechanical horizontal reference mark.

## Procedure

1. Lower boom to the horizontal reference mark (painted line on boom foot).
2. Open PLC service menu → `Encoder Calibration`.
3. Confirm live angle reads within ±0.3° of horizontal.
4. Press `TEACH ZERO` to store the new offset.
5. Raise boom to full up-limit and confirm angle reads within ±0.5° of nameplate max angle.
6. Cycle boom up/down once and re-check zero point holds.

## Acceptance Criteria

- Zero point within **±0.3°** of horizontal reference
- Full-range angle within **±0.5°** of mechanical stop
- No pulse dropout across full range of travel

## Warning

> ⚠ **Do not** perform this procedure with a load on the hook. Boom must be free to move through full range during calibration.

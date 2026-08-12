## Setting

| Item | Factory Default | Recommended | Adjustment Range |
|---|---|---|---|
| LS Pressure (Section) | Load pressure + 18 bar | Match pump LS margin | 15–25 bar |
| Ramp Time (accel/decel) | 0.5 sec | Adjust per crane duty | 0.2–2.0 sec |
| Dead Band | ±5% | ±3–8% | ±2–10% |
| Max Spool Stroke Current | 800 mA | Per coil spec | 700–1000 mA |

### Setting Procedure

1. With the joystick in neutral, confirm the spool zero position
2. Adjust the PVEH amplifier card's dead band to the specified range
3. Adjust ramp time to the task (longer for precision work, shorter for fast work)
4. Adjust LS pressure to match the pump's LS margin
5. Verify flow linearity against joystick input across the full low-to-high speed range

> ⚠ Setting the dead band too narrow can cause the actuator to react to minor joystick vibration, resulting in unintended micro-movement.

### Acceptance Criteria

LS pressure within ±3% of setting; flow deviation within ±5% at 50% joystick input.

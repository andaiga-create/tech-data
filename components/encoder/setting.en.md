## Setting

The encoder itself has few mechanical setting elements, but the following parameters must always be verified/adjusted in the field.

| Item | Factory Default | Recommended | Adjustment Range |
|---|---|---|---|
| Pulse per Revolution | 2048 ppr | 2048 ppr | 1024–4096 ppr |
| Zero Pulse Position | Unaligned | Within ±2° of reference cam | ±5° |
| PLC Scaling Factor | 1.000 | Calculated from field gear ratio | - |

### Setting Procedure

1. With power OFF, engage the coupling
2. Manually rotate the shaft to the reference position
3. Check whether the PLC's Zero Pulse reception matches the reference position
4. If mismatched, loosen the coupling and rotate only the encoder shaft to realign
5. Re-tighten and run a 3-cycle round-trip test to verify repeatability

> ⚠ When re-tightening the coupling, always follow the manufacturer's specified set-screw torque (typically 1.2–1.5 N·m). Over-tightening can damage the shaft.

### Acceptance Criteria

Zero Pulse position error within ±2°, repeatability deviation within ±0.5° over 3 cycles.

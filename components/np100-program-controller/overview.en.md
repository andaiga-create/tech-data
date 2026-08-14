## Overview

The NP100 is a **HANYOUNG NUX** program controller (multi-input/output program temperature controller). It controls temperature by stepping the target value through time-based stages (patterns/segments), enabling ramp-and-soak temperature profiles rather than simple fixed-point control — used where a heater/cooler must follow a rise/hold/fall profile over time.

> ℹ This reference is translated from the manufacturer's Korean-language manual; no English manual was provided by the manufacturer. Always cross-check exact figures and wiring against the attached original Korean PDF.

### Three operating modes

| Mode | Entry | Description |
|---|---|---|
| Run display mode | Default display at power-on | Shows PV/SV, PV/output value, and — during program operation — the remaining time of the current segment |
| Engineering mode | Hold the SET key for 2.5+ seconds | Configures the instrument's base specifications: input (sensor) type, output type, communication, transmission, alarm, control action, PID, auto-tuning |
| Program mode | From engineering mode, move with STEP/HOLD | Configures the control program: repeat count, pattern number, segment settings, program start condition, time signals, end-of-program mode, and per-segment parameters |

### Key features

| Function | Details |
|---|---|
| Options | RS485/422, 2-point time signal |
| PV display | 4-row display, ±0.1% accuracy, 250ms sampling, multi-input support |
| Control output | Multi-output (current/voltage pulse, relay) |
| Transmission output | Current or SPS (external sensor supply power), shares the RET terminal |
| Alarm output | 2-point relay |
| Time signal output | 2-point transistor |
| Total PT / total SEG | 2 patterns / 20 segments (max. 10 segments per pattern) |
| Communication | RS485/422, 600-9600bps, up to 31 units per line |
| Power | 100-240V AC, 50-60Hz |

### Model code structure

Format `NP100-□□`: the first digit is the control type (0 = general/heating), the second is the option code.

| Code | Content |
|---|---|
| 0 | No option |
| 1 | 2-point time signal |
| 2 | Communication (RS485/422) |
| 3 | 2-point time signal + communication (RS485/422) |

### Mounting location

Flush-mounted inside the crane/hoist control panel, used to control the temperature of a heater/cooler through a time profile. Panel cutout: 92.0×92.0mm (+0.8/0 tolerance), recommended panel thickness 2-10mm steel.

> ⚠ The input/output terminals carry electric shock risk — never let the body or any conductive object contact them. Always cut power before wiring.

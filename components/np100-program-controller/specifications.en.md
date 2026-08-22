## Specifications

### 9-1. Input Specifications

| Item | Spec |
|---|---|
| Input channels | 1 channel |
| Input types | Thermocouple, RTD, DC voltage |
| Input range | Thermocouple/RTD adjustable within the tabulated temperature range; DC voltage min/max adjustable within each range |
| Sampling cycle | 250ms |
| Input resistance | Thermocouple/mV input: ≥1MΩ; DCV input: approx. 1MΩ |
| Allowable signal-source resistance | Thermocouple input: ≤250Ω; mV/DCV input: ≤2kΩ |
| Allowable wiring resistance | RTD input: ≤10Ω per lead |
| Allowable input voltage | mV/TC/RTD: ±10V; DCV: ±20V |
| Noise rejection | NMRR: ≥40dB (50/60Hz ±1%); CMRR: ≥12dB (50/60Hz ±1%) |
| Applicable standards | TC/RTD (JIS/IEC/DIN) |
| Reference junction compensation error | ±1.5°C (15-35°C), ±2.0°C (0-50°C) |
| Burnout detection | OFF/UP SCALE/DOWN SCALE selectable; TC burnout → UP/DOWN scale, RTD burnout → UP scale; detection current approx. 50nA |
| Measurement accuracy | ±0.1% of F.S |

### 9-2. Control Output

| Output type | Spec |
|---|---|
| Relay contact output | Contact rating 240V AC 3A / 30V DC 3A (resistive load), 1c configuration, time-proportional or ON/OFF action, cycle time 1-1000 sec, output limit 0.0-100.0% (upper/lower configurable), hysteresis 0-100% for ON/OFF control |
| SSR output (voltage pulse) | ON voltage ≥ approx. 25V DC (≥600Ω load, short-circuit current limited to approx. 30mA), OFF voltage ≤0.1V DC, cycle time 1-1000 sec, output limit 0.0-100.0% |
| SCR output (current, 4-20mA DC) | Output current range 4-20mA DC, update cycle 250ms, load resistance ≤600Ω, continuous PID action, output ripple ≤0.1% of FS (p-p) at 150Hz, accuracy ±0.3% of FS, output limit -0.5 to 105.0% |

### 9-3. Alarm Output

| Item | Spec |
|---|---|
| Relay output | Contact rating 240V AC 1A / 30V DC 1A (resistive load), 1a × 2 points, ON/OFF action, dead band 0.0-100.0%(EUS) |

### 9-4. Transmission Output

| Item | Spec |
|---|---|
| Output current range | 4-20mA DC |
| Load resistance | ≤600Ω |
| Accuracy | ±0.3% of FS |
| Resolution | Approx. 3000 |
| Output ripple | ≤0.1% of FS (p-p) at 150Hz |
| Update cycle | 250ms |
| External sensor power | 24V DC 20mA max (shares terminals with transmission output — not usable simultaneously) |

### 9-5. Communication Interface

| Item | Spec |
|---|---|
| Standard | EIA RS485 compliant |
| Max. units | 31 (address 1-99 configurable) |
| Method | 2-wire half-duplex |
| Sync | Start-stop (asynchronous) |
| Distance | Within 1.2km |
| Speed | 600/1200/2400/4800/9600 bps |
| Start bit | 1 bit |
| Data length | 7 or 8 bit |
| Parity | None/even/odd |
| Stop bit | 1 or 2 bit |
| Protocol | PC Link |

### 9-6. Operating Environment

| Item | Spec |
|---|---|
| Installation (vibration) | Continuous vibration ≤1.2mm (5-14Hz); ≤4.9m/s² (0.5G) (4-150Hz); short-term vibration ≤14.7m/s² (1.5G), 15 sec; shock 147m/s² (15G), ≤11ms |
| Normal operating conditions | Ambient temp 0-50°C, ambient humidity 35-85%RH (no condensation), magnetic field ≤400AT/m, warm-up ≥30 min |
| Ambient temperature effect | Voltage/thermocouple input: ±1μV/°C or ±0.01% of FS/°C; RTD input: ≤±0.05°C/°C; analog output: ≤±0.05% of FS/°C |
| Voltage variation effect (within rated range) | Analog input: ±1μV/10V or ±0.01% of FS/10V; analog output: ≤±0.05% of FS/10V |

### 9-7. Transport & Storage Conditions

| Item | Spec |
|---|---|
| Temperature | -25 to 70°C |
| Humidity | 5-95%RH (no condensation) |
| Shock | Package drop ≤1m |

### 9-8. Construction / 9-9. Power / 9-10~11. Insulation & Dielectric

| Item | Spec |
|---|---|
| Material | Plastic case |
| Weight | 696g (including mounting brackets and packaging) |
| Panel cutout | 96(W) × 96(H) × 100(D) mm |
| Rated voltage | 100-240V AC, 50-60Hz |
| Allowable voltage variation | ±10% of rated voltage |
| Power consumption | 10VA max (6.0W max) |
| Insulation resistance | Primary-secondary, primary-ground, and ground-secondary terminals: all ≥500V DC 20MΩ |
| Dielectric strength | Primary-secondary: 2300V AC 50/60Hz for 1 min; primary-ground: 2300V AC for 1 min; F.G-secondary: 1500V AC for 1 min |

### 9-12. Functional Specification Summary

| Category | Item | Details |
|---|---|---|
| Measurement input | Bias | -100.0 to 100.0% of range width |
| | Scaling | Per SL-H/SL-L settings |
| | Input filter | OFF, 1-120 sec |
| Control | Pattern | 2 patterns, up to 10 segments per pattern |
| | PID groups | 4 |
| | Proportional band (P) | 0.1-999.9% (of max range) |
| | Integral time (I) | OFF, 1-6000 sec |
| | Derivative time (D) | OFF, 1-6000 sec |
| | Anti-reset windup (ARW) | AUTO, 50.0-200.0% |
| | Fuzzy function | OFF, ON |
| Transmission output | Signal | Select PV/SV/MV/SPS |
| | Sensor power (SPS) | 24V DC 20mA max |
| Alarm | Setpoints | 2 (max.) |
| | Types | High/low, high/low deviation |
| | Hysteresis | 0.0-100.0% of instrument range |

> ℹ Specs are for reference only; the nameplate and model code (NP100-□□) on the actual installed unit always take precedence. Refer to the attached original manual's "3. Terminal Layout" page for exact terminal assignments.

## Pressure and Flow Setting

### 1. Main Relief / PVP

- PVP pressure adjustment defines the **upper limit of system pressure**.
- In a closed-center LS system, the catalog states that the PVP pressure relief should be set **approximately 30 bar above maximum system pressure**.
- The actual crane target setting has priority.

### 2. LSA / LSB Relief

- LSA = A-port pressure limitation
- LSB = B-port pressure limitation
- They can limit both maximum pressure and flow for an individual function.
- When PVLP shock valves are used, the maximum LSA/B setting is limited by the PVLP setting.

**Catalog limits**

- PVLP ≤ 150 bar → LSA/B ≤ 0.8 × PVLP
- PVLP > 150 bar → PVLP − LSA/B ≥ 30 bar
- Minimum LSA/B setting: 30 bar

### 3. Speed / Flow Control

- Speed Control adjusts the maximum flow of the function.
- Increasing flow generally increases actuator speed.
- PVG 32 A/B rated flow is up to 100 L/min with pressure compensation and 125 L/min without pressure compensation.
- For pressure-control spools, maximum flow can be reduced by about 50% by limiting spool travel from 7 mm to 5.5 mm.

### 4. Crane Functions

| Function | Check |
|---|---|
| Hoisting | Hoisting Relief / Speed Control |
| Luffing Up | Luffing Up Relief / Speed Control |
| Luffing Down | Luffing Down Relief / Speed Control |
| Slewing Left | Slewing Left Relief / Speed Control |
| Slewing Right | Slewing Right Relief / Speed Control |
| Overall system | Main Relief |

> ⚠ Adjust pressure while monitoring with a pressure gauge. Adjust Speed Control in small increments and confirm the final value by functional testing.

> ℹ The supplied field setting drawing shows **HEX 4 mm** for Relief adjustment and **HEX 3 mm** for Speed Control adjustment. The drawing shows **120 bar** as a relief setting example; compare it with the actual machine Setting Sheet before applying it.

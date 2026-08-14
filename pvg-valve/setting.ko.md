## 압력 및 유량 세팅

### 1. Main Relief / PVP

- PVP의 압력 조정은 **전체 시스템 압력의 상한**을 결정한다.
- Closed-center LS 시스템에서는 PVP pressure relief를 **최대 시스템 압력보다 약 30 bar 높게** 설정하도록 카탈로그에서 안내한다.
- 실제 크레인 목표값은 장비별 설정값을 우선한다.

### 2. LSA / LSB Relief

- LSA = A Port 압력 제한
- LSB = B Port 압력 제한
- 각 기능의 최대 압력과 유량을 함께 제한할 수 있다.
- PVLP Shock Valve가 있는 경우 LSA/B의 최대 설정값은 PVLP 설정에 따라 제한된다.

**카탈로그 기준**

- PVLP ≤ 150 bar → LSA/B ≤ 0.8 × PVLP
- PVLP > 150 bar → PVLP − LSA/B ≥ 30 bar
- LSA/B 최소 설정: 30 bar

### 3. Speed / Flow Control

- Speed Control은 해당 기능의 최대 유량을 조정한다.
- 유량이 증가하면 일반적으로 액추에이터 속도가 증가한다.
- PVG 32 A/B 포트 정격 유량은 pressure compensator 적용 시 최대 100 L/min, 미적용 시 최대 125 L/min이다.
- Pressure control spool은 스풀 스트로크를 7 mm → 5.5 mm로 제한하여 최대 유량을 약 50% 줄일 수 있다.

### 4. 크레인 기능별 확인

| 기능 | 확인 항목 |
|---|---|
| Hoisting | Hoisting Relief / Speed Control |
| Luffing Up | Luffing Up Relief / Speed Control |
| Luffing Down | Luffing Down Relief / Speed Control |
| Slewing Left | Slewing Left Relief / Speed Control |
| Slewing Right | Slewing Right Relief / Speed Control |
| 전체 시스템 | Main Relief |

> ⚠ 압력 조정은 반드시 압력계로 확인하면서 실시한다. Speed Control은 작은 폭으로 조정하고 기능 시험 후 최종값을 확정한다.

> ℹ 제공된 현장 설정 도면에서는 Relief 조정에 **HEX 4 mm**, Speed Control 조정에 **HEX 3 mm**가 표시되어 있다. 도면에는 Relief 설정 예시로 **120 bar**가 표시되어 있으므로 실제 장비 적용 전 Setting Sheet와 대조한다.

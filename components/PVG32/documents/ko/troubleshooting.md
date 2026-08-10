# PVG 32 Troubleshooting

## 1. Neutral인데 작동하거나 LS Pressure가 올라감
### 확인
1. PVBS spool type 확인
2. PVE actuator type 확인
3. 특히 Linear Characteristic PVBS + PVEM 조합 여부 확인
4. Neutral command / mechanical centering 확인
5. Pilot pressure 확인

### 중요
카탈로그는 Linear Characteristic PVBS를 PVEM과 함께 사용하지 말 것을 명시한다. 작은 spool dead band와 PVEM 20% hysteresis의 상호작용으로 Neutral에서 LS pressure가 형성될 위험이 있다.

## 2. Crane 동작이 Hunting / Oscillation
### 가능 원인
- LS system instability
- 큰 inertia torque
- Over-center valve 등 2차 pressure-controlled component
- Pressure control spool이 필요한 application

### 확인
- Slewing / Main lifting-lowering 기능인지 확인
- Load pressure 변화 확인
- Pressure-control spool 적용 여부 확인
- PVB pressure compensator 확인
- LSA/B pressure limiting setting 확인

## 3. 유량이 부족하거나 동작이 느림
### 확인 순서
1. Pump flow
2. P pressure
3. LS pressure
4. Spool stroke / command
5. PVB pressure compensator
6. Filter contamination
7. A/B restriction
8. PVBS spool size

## 4. 과도한 압력
- PVP relief setting 확인
- PVLP/LSA/B setting 관계 확인
- Closed-center pump standby pressure 확인
- LS unloading(PVPX) 동작 확인

## 5. Cavitation / Shock
- PVLA suction valve 확인
- PVLP shock/suction valve 확인
- Return/T pressure 확인
- Over-center valve 및 load condition 확인

## 6. PVE Fault
- Supply voltage
- Connector
- Pilot oil pressure
- Fault output / LED
- Spool feedback
- CAN wiring(PVED)
를 순서대로 확인한다.

> 이 문서는 진단 방향을 제공하는 현장 참고자료이며, 실제 원인 판정은 회로도·실측값·장착품 사양을 함께 검토해야 한다.

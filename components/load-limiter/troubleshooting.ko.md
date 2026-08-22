## Troubleshooting

검색 Keyword: Load Limiter, SH-1200A, E-01, E-02, E-03, E-04, Error Code, 하중 흔들림, Overload

### Error Code: E-01

**Possible Cause**
- GAIN A/D 값과 영점(Zero) 설정 시 A/D 값의 차이가 1000 카운트 이하 (신호차가 너무 작음)

**Inspection**
- [ ] Load Cell 배선(EXC+/-, SIG+/-) 결선 상태 확인
- [ ] Load Cell 공급전압 확인 (DC±10V)
- [ ] A/D 값 VIEW 모드에서 무하중/하중 상태별 A/D 값 비교

**Corrective Action**
1. Load Cell 배선 재확인 및 재체결
2. Load Cell 자체 불량 의심 시 교체 후 재설정
3. WEIGHT SET(하중조정) 절차 재실시

---

### Error Code: E-02

**Possible Cause**
- DIVISION 설정이 1일 때 GAIN 설정값이 2000 카운트 이상 (설정값 상호 불일치)

**Inspection**
- [ ] 현재 DIVISION 설정값 확인
- [ ] GAIN(A/D) 설정값 확인

**Corrective Action**
1. DIVISION 값을 상향 조정 (2 또는 5)하거나
2. WEIGHT SET을 재실시하여 GAIN 값을 규정 범위로 재조정

---

### Error Code: E-03

**Possible Cause**
- GAIN 값이 2000 카운트 이상인 상태에서 DIVISION을 1로 설정한 경우 (E-02와 원인 계열 동일)

**Inspection**
- [ ] DIVISION 설정을 1로 변경하기 전 GAIN 값 확인

**Corrective Action**
1. DIVISION을 1로 설정하기 전에 GAIN 값이 2000 카운트 미만인지 먼저 확인
2. 불가피할 경우 DIVISION을 2 이상으로 유지

---

### Error Code: E-04

**Possible Cause**
- LOAD CELL 입력 전압이 OVER(허용 범위 초과) 된 상태

**Inspection**
- [ ] Load Cell 결선 극성(+/-) 오결선 여부 확인
- [ ] Load Cell 자체 손상(과부하 이력) 여부 확인
- [ ] Load Cell 공급전압이 규정치(DC±10V)를 초과하지 않는지 확인

**Corrective Action**
1. 결선 극성 정정
2. Load Cell 손상 확인 시 신품 교체 (과부하 이력이 있는 Load Cell은 수리하지 않고 교체)
3. 공급전압 이상 시 컨트롤러 전원부 점검

> ⚠ Load Cell은 안전 관련 부품이다. 손상이 의심되면 임의로 수리하지 않고 반드시 신품으로 교체한다.

---

### 증상: 무하중 시에도 표시값이 흔들리거나(Jitter) 안정되지 않음

**Possible Cause**
- Load Cell 설치 방향(하중 포인트)과 실제 하중 방향 불일치
- Load Cell 고정 KEY 홈 마모/헐거움
- 신호 케이블이 동력/모터 구동 케이블과 근접 배선되어 노이즈 유입
- 신호 케이블 SHIELD 접지 불량 또는 이중 접지

**Inspection**
- [ ] Load Cell 하중 포인트 방향과 실제 인가 하중 방향 일치 여부 확인
- [ ] 고정 KEY 및 홈 마모 상태 확인
- [ ] 신호 케이블 포설 경로 및 동력 케이블과의 이격 거리 확인
- [ ] SHIELD 접지 지점 (시작/끝 단일 접지 여부) 확인

**Corrective Action**
1. Load Cell 설치 방향 재정렬
2. 고정 KEY 마모 시 교체
3. 신호 케이블을 동력/모터 케이블과 분리 재포설, 필요 시 금속 Flexible 적용
4. SHIELD 접지를 시작/끝 1개소로 정리 (이중 접지 지점 해제)

**Final Check**
FILTER 값을 임시로 높여(예: 5~7) 흔들림이 즉시 완화되는지 확인 — 완화되면 노이즈/설치 문제, 완화되지 않으면 Load Cell 자체 점검으로 범위를 좁힌다.

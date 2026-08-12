## Troubleshooting

검색 Keyword: Load Cell, Overload, Calibration Error, Signal Error, Zero Drift

### 증상: RCL 표시 하중값 이상 (실제 하중과 불일치)

**Possible Cause**
- Zero Drift (온도/노후화로 인한 영점 이동)
- Calibration 오차 누적
- 케이블/커넥터 접촉 불량으로 인한 신호 노이즈

**Inspection**
- [ ] 무하중 상태에서 Zero 값 재확인
- [ ] 알려진 하중(Test Weight)으로 정밀도 검증
- [ ] 신호선 접지 및 실드 상태 확인

**Corrective Action**
1. Zero Drift 발생 시 재영점 조정
2. 오차가 규정 초과 시 전체 Calibration 재실시
3. 노이즈 원인이 배선인 경우 실드 케이블로 교체 및 접지 개선

**Final Check**
Calibration 절차의 Acceptance Criteria(전 구간 ±1% 이내) 충족 여부 확인.

---

### 증상: Overload Indicator 지속 작동 (실제로는 정상 하중)

**Possible Cause**
- 과거 순간 과부하(Shock Load)로 인한 오작동 이력
- 로드셀 내부 스트레인게이지 손상

**Inspection**
- [ ] Calibration 정밀도 재검증
- [ ] 로드셀 본체 정밀 육안/비파괴 검사

**Corrective Action**
1. 정밀 검사 결과 이상 없으면 Indicator Reset 및 재Calibration
2. 스트레인게이지 손상 확인 시 로드셀 신품 교체 (수리 불가)

> ⚠ 로드셀은 안전 관련 부품으로, 손상이 의심되는 경우 임의 수리하지 않고 반드시 신품으로 교체한다.

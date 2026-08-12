## Troubleshooting

증상별로 원인과 조치를 정리한다. 검색 Keyword: Encoder Error, Signal Error, No Feedback, Calibration Error

### 증상: Encoder Alarm 발생 (PLC Fault Code E-12)

**Possible Cause**
- 신호선 단선/접촉불량
- 커넥터 결합 불량
- 전원 전압 이상 (24V 미만)

**Inspection**
- [ ] 커넥터 체결 상태 재확인
- [ ] 전원 단자 전압 측정 (정격 24V ±10%)
- [ ] 신호선 저항/단선 여부 측정

**Corrective Action**
1. 커넥터 재체결 또는 케이블 교체
2. 전원 공급부 점검 및 전압 조정
3. PLC 측 Fault Reset 후 재기동

**Final Check**
정상 회전 시 PLC 상 Pulse Count가 지연 없이 증가하는지 확인한다.

---

### 증상: No Feedback (신호 완전 미수신)

**Possible Cause**
- 케이블 완전 단선
- 엔코더 내부 회로 소손
- SSI/Pulse 통신 라인 배선 오류

**Inspection**
- [ ] 케이블 연속성 테스트
- [ ] 엔코더 단품 전원 인가 후 출력 파형 확인 (오실로스코프)

**Corrective Action**
1. 케이블 단선 시 교체
2. 엔코더 자체 불량 확인 시 신품 교체
3. 배선 오류 시 결선도 기준 재배선

> ⚠ 신품 교체 후에도 동일 증상 발생 시, PLC 카드 또는 인버터 입력측 점검으로 범위를 확대한다.

## Inspection

작업 전 아래 항목을 순서대로 확인한다.

> ⚠ 전원을 차단하지 않은 상태에서 커넥터를 분리하면 신호 오류 및 감전 위험이 있다. 반드시 Power OFF 후 작업한다.

- [ ] Power OFF 확인
- [ ] Connector 체결 및 잠금 상태 확인
- [ ] Cable 피복 손상 여부 확인
- [ ] 케이블 Bending Radius 준수 여부 확인
- [ ] Mounting Bolt 풀림 여부 확인
- [ ] Coupling 유격 및 정렬(Alignment) 확인
- [ ] 하우징 외관 손상/부식 확인
- [ ] PLC 상에서 Signal 정상 수신 여부 확인 (A/B/Z 또는 SSI)

### 판정 기준

| 항목 | NORMAL | ABNORMAL |
|---|---|---|
| Connector | 완전 체결, 잠금 클립 정상 | 헐거움, 클립 파손 |
| Cable | 피복 손상 없음 | 크랙, 노출, 눌림 |
| Coupling | 유격 0.1mm 이하 | 눈에 띄는 유격/소음 |
| Signal | PLC 값이 회전에 비례하여 변화 | 값 고정, 튐(Jitter), 미수신 |

> ✅ 모든 항목이 NORMAL이면 정상 가동 가능. ABNORMAL 항목 발생 시 Troubleshooting 절차로 이동한다.

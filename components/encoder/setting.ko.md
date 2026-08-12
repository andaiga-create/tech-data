## Setting

엔코더 자체는 기계적 세팅 요소가 적으나, 아래 파라미터는 현장에서 반드시 확인/조정해야 한다.

| 항목 | Factory Default | Recommended | Adjustment Range |
|---|---|---|---|
| Pulse per Revolution | 2048 ppr | 2048 ppr | 1024 ~ 4096 ppr |
| Zero Pulse 위치 | 미정렬 | Reference Cam과 ±2° 이내 | ±5° |
| PLC Scaling Factor | 1.000 | 현장 감속비에 따라 계산 | - |

### Setting 절차

1. Power OFF 상태에서 커플링 체결
2. 축을 기준 위치(Reference Position)로 수동 회전
3. PLC 상 Zero Pulse 수신 시점과 기준 위치 일치 여부 확인
4. 불일치 시 커플링을 풀고 엔코더 축만 미세 회전하여 재정렬
5. 재체결 후 3회 왕복 회전 테스트로 반복 정밀도 확인

> ⚠ 커플링 재체결 시 Set Screw 토크는 제조사 지정값(통상 1.2–1.5 N·m)을 반드시 준수한다. 과체결 시 축 손상이 발생할 수 있다.

### Acceptance Criteria

Zero Pulse 위치 오차 ±2° 이내, 3회 반복 측정 편차 ±0.5° 이내.

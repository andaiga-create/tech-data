## Setting

| 항목 | Factory Default | Recommended | Adjustment Range |
|---|---|---|---|
| LS Pressure (Section) | 부하압 + 18bar | 펌프 LS Margin과 일치 | 15–25 bar |
| Ramp Time (가속/감속) | 0.5 sec | 크레인 용도에 따라 조정 | 0.2–2.0 sec |
| Dead Band | ±5% | ±3–8% | ±2–10% |
| Max Spool Stroke Current | 800 mA | 코일 규격에 따름 | 700–1000 mA |

### Setting 절차

1. 조이스틱 중립 상태에서 스풀 Zero Position 확인
2. PVEH 앰프 카드의 Dead Band를 규정 범위로 조정
3. Ramp Time을 작업 특성(정밀 작업 시 길게, 신속 작업 시 짧게)에 맞춰 조정
4. LS Pressure를 펌프 LS Margin과 일치하도록 조정
5. 저속~고속 전 구간에서 조이스틱 입력 대비 유량 선형성 확인

> ⚠ Dead Band를 과도하게 좁히면 미세한 조이스틱 진동에도 액추에이터가 반응하여 예기치 않은 미동이 발생할 수 있다.

### Acceptance Criteria

LS Pressure Setting 값 ±3% 이내, 조이스틱 50% 입력 시 유량 편차 ±5% 이내.

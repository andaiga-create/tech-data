## 개요

로드리미터(Load Limiter)는 호이스트/크레인 및 엘리베이터 등 양중기의 과부하를 Strain Gauge식 Load Cell(전자식 J-1 TYPE)로 검지하여, 과적으로부터 오는 인적·물적 재해를 사전에 예방하는 안전장치이다.

본 문서는 **신한전자(SHINHAN ELECTRONICS) SH-1200A Load Limiter**를 기준으로 작성되었다.

> ℹ 본 매뉴얼은 "테크플라워, HHI 해군 DF-천지함-RB-SI, 3TON RIB DAVIT CRANE" 프로젝트 납품 문서(Document No. D0LB231023, Rev.0, 2023.10.23)를 기준으로 한다. 다른 프로젝트/크레인에 적용 시 SIG1/SIG2/SIG3 등 세팅값은 반드시 해당 크레인 정격에 맞춰 재설정해야 한다.

### 시스템 구성

SH-1200A 로드리미터 시스템은 아래 4개 장치로 구성된다.

- **Load Limit Controller (SH-1200A)** — 하중 표시, 경보/차단 판정 및 릴레이 출력
- **Load Cell (SPE-6.5T)** — Strain Gauge식 하중 검출 센서
- **4-20mA Converter (SBCA-X)** — 하중 신호를 4-20mA로 원거리 전송 (Option)
- **Large Display (SLD-404)** — 원거리 시인용 대형 하중 표시기

### 주요 특징

- 고속·고정 밀도로 과부하 상태를 검지 (기동시간 무관)
- 인칭(순간 흔들림) 작업을 판별하는 회로 내장으로 오작동 방지
- 반도체 충·방전 회로 채택으로 과부하 검출시간 정확도 확보
- 전기식이 아닌 실제 적재하중 기반 검출로 신뢰성 향상
- 4-Digit Display로 SET치 및 현재 하중치를 직접 판독 가능
- 부품 호환성이 높고 유지보수가 용이한 COMPACT 설계

### 주요 기능

- 실시간 하중 표시 (4-Digit)
- SIG(중간 경보)/ALARM(과부하 경보)/OVER(차단) 3단계 릴레이 출력
- OVER SET치 이하로 복귀 시 자동 복귀
- 과부하 검출시간 1초 이내

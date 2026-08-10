# PVG 32 Component Package

첨부된 PVG 32 카탈로그를 기반으로 기존에 구상한 **Component 단위 HTML 서비스 구조**에 맞춰 구성한 패키지입니다.

## 구조

```text
PVG32/
├─ documents/
│  ├─ ko/
│  │  ├─ overview.md
│  │  ├─ setting.md
│  │  ├─ specifications.md
│  │  ├─ inspection.md
│  │  └─ troubleshooting.md
│  ├─ en/
│  │  ├─ overview.md
│  │  ├─ setting.md
│  │  ├─ specifications.md
│  │  ├─ inspection.md
│  │  └─ troubleshooting.md
│  └─ source_reference.md
├─ images/
├─ component.json
├─ inspection.md
├─ overview.md
├─ setting.md
├─ specifications.md
└─ troubleshooting.md
```

루트의 MD는 기본 한국어 화면용이며, `documents/en/`에는 영문 버전이 들어 있습니다. 실제 HTML 서비스에서는 `component.json`의 `languages` 및 `localizedDocuments`를 이용해 언어 전환을 구현할 수 있습니다.

# FieldRef — Field Engineer Component Technical Data Service

현장 엔지니어가 선박 위에서 스마트폰으로 크레인/장비의 **점검(Inspection)·세팅(Setting)·고장조치(Troubleshooting)·사양(Specification)** 자료를 10~20초 내에 찾아볼 수 있도록 만든 정적 웹 서비스입니다.

- Backend/Database 없음 — 순수 정적 사이트 (HTML/CSS/Vanilla JS/JSON/Markdown)
- GitHub Pages로 바로 배포 가능
- Component는 폴더 단위로 관리 — **HTML/JS 코드를 건드리지 않고 자료 폴더만 추가/수정**하면 반영됨

---

## 1. 폴더 구조

```text
/
├─ index.html                 앱 진입점
├─ css/style.css              전체 스타일 (다크 테마, 모바일 우선)
├─ js/
│  ├─ app.js                  라우팅 · 화면 렌더링 · 즐겨찾기/최근본 항목
│  ├─ component-loader.js     component.json / *.md 로딩, 마크다운 렌더러
│  └─ search.js                전체 텍스트 검색 인덱스
├─ data/
│  └─ components.json         등록된 Component id 목록 (매니페스트)
├─ components/
│  ├─ encoder/
│  │  ├─ component.json       메타데이터 (모델, 제조사, 문서/사진 목록 등)
│  │  ├─ overview.md
│  │  ├─ inspection.md
│  │  ├─ setting.md
│  │  ├─ troubleshooting.md
│  │  ├─ specifications.md
│  │  ├─ images/              사진 (component.json의 images 배열에 등록)
│  │  └─ documents/           PDF 등 원본 문서 (component.json의 documents 배열에 등록)
│  ├─ hydraulic-pump/
│  ├─ pvg-valve/
│  └─ load-cell/
└─ README.md
```

## 2. 로컬 확인 / GitHub Pages 배포

1. 이 폴더 전체를 GitHub Repository로 push 합니다.
2. Repository → **Settings → Pages** → Source를 `main` 브랜치 `/ (root)`로 지정합니다.
3. 몇 분 후 `https://<사용자명>.github.io/<repo명>/` 로 접속하면 서비스가 열립니다.
4. 로컬에서 미리 보려면 (브라우저에서 `file://`로 직접 열면 `fetch()`가 막히므로) 로컬 서버가 필요합니다:
   ```bash
   npx serve .
   # 또는
   python3 -m http.server 8080
   ```

## 3. 새 Component 추가하는 방법

HTML/JS를 전혀 수정하지 않고 아래 순서만 따르면 자동으로 홈 화면 목록, 검색 결과에 반영됩니다.

1. `components/` 아래에 새 폴더를 만듭니다. (예: `components/gearbox/`)
2. 그 안에 아래 5개 Markdown 파일을 작성합니다: `overview.md`, `inspection.md`, `setting.md`, `troubleshooting.md`, `specifications.md`
3. `component.json`을 작성합니다 (아래 템플릿 참고). `documents`, `images` 배열에는 실제로 `documents/`, `images/` 폴더에 넣은 파일명을 적습니다.
4. `data/components.json`의 `components` 배열에 새 폴더 이름(id)을 한 줄 추가합니다.
5. Git commit → push 하면 끝입니다.

```text
1. Git Repository 접속
2. components/gearbox/ 폴더 생성
3. component.json, overview.md, inspection.md, setting.md,
   troubleshooting.md, specifications.md 작성
4. images/, documents/ 에 사진·PDF 추가
5. data/components.json 에 "gearbox" 한 줄 추가
6. Git Commit → Push
```

### component.json 템플릿

```json
{
  "id": "gearbox",
  "name": "Gearbox",
  "category": "Mechanical",
  "manufacturer": "",
  "models": [],
  "description": "",
  "keywords": ["gearbox", "오일누유", "이상소음"],
  "sections": ["overview", "inspection", "setting", "troubleshooting", "specifications"],
  "documents": [
    { "file": "gearbox-datasheet.pdf", "name": "Gearbox Datasheet" }
  ],
  "images": [
    { "file": "gearbox-location.jpg", "caption": "Gearbox mounting location" }
  ],
  "updated": "2026-08-10"
}
```

## 4. 다국어 (한글/English)

화면 우측 상단 버튼으로 한글 ↔ English 를 즉시 전환할 수 있습니다. 선택한 언어는 기기에 저장되어 다음 방문 시에도 유지됩니다.

- **UI 문자열**(메뉴, 버튼, 안내문구)은 `js/i18n.js` 사전에서 관리하며 이미 두 언어 모두 완성되어 있습니다.
- **Component 본문(overview/inspection/setting/troubleshooting/specifications)**은 언어별로 별도 파일을 만들면 자동 인식됩니다:
  - `setting.md` — 기본 자료 (특정 언어 파일이 없을 때 사용되는 대체본)
  - `setting.ko.md` — 한글 버전 (있으면 한글 선택 시 우선 로드)
  - `setting.en.md` — English 버전 (있으면 English 선택 시 우선 로드)
  - 예: `components/encoder/inspection.ko.md` 참고 (실제 한글 버전 샘플)
  - 아직 언어별 파일을 나누지 않은 컴포넌트는 지금처럼 `setting.md` 하나만으로도 정상 동작하며, 이후 필요할 때 `.ko.md` / `.en.md`로 나눠서 넣으면 그때부터 자동으로 언어별로 분리됩니다.
- **component.json의 설명**도 언어별로 나눌 수 있습니다: `description_ko`, `description_en` 필드를 추가하면 그 값이 우선 사용되고, 없으면 기존 `description` 값이 두 언어 모두에 공통으로 쓰입니다. (`components/encoder/component.json` 예시 참고)
- **문서(documents)/사진(images) 이름·캡션**도 같은 방식으로 `name_ko`/`name_en`, `caption_ko`/`caption_en`을 추가하면 언어별로 분리됩니다.

즉, 지금 당장 모든 자료를 번역할 필요 없이 **필요한 컴포넌트부터 하나씩** 한글/영문 파일을 나눠서 채워나가면 됩니다.

## 5. Markdown 작성 규칙 (렌더러가 인식하는 문법)

`js/component-loader.js`의 `MiniMarkdown`이 다음 문법만 지원합니다 (외부 라이브러리 미사용):

- `#`, `##`, `###` 제목
- `**굵게**`, `` `code` ``, `[링크](url)`
- 표 (`| 컬럼 | 컬럼 |` + 구분선 `|---|---|`)
- 목록 `- 항목`, 번호 목록 `1. 항목`
- 체크리스트 `- [ ] 항목` / `- [x] 항목` → Inspection 화면에서 큰 터치 영역의 체크 항목으로 렌더링
- 경고 블록 `> ⚠ 내용` → 노란색 Warning 박스로 렌더링 (안전 관련 정보는 반드시 이 형식 사용)
- `---` 구분선

## 6. 검색 범위

`js/search.js`는 아래 항목을 모두 인덱싱합니다:

- Component 이름 / 제조사 / 모델 / Category / keywords / description
- 모든 섹션의 본문 텍스트 (overview, inspection, setting, troubleshooting, specifications)

검색창에 "Encoder Error", "Hydraulic Pressure Low" 같은 증상 키워드를 입력하면 해당 Troubleshooting 항목이 바로 검색됩니다.

## 7. 오프라인/PWA 확장

현재 버전은 PWA가 아니지만, 향후 다음을 추가하면 오프라인 지원으로 확장할 수 있도록 파일 구조를 분리해두었습니다:

- `sw.js` (Service Worker) 를 루트에 추가하고 `index.html`에 등록
- `manifest.json` 을 추가해 "Add to Home Screen" 지원
- Component 자료가 모두 정적 파일(md/json/jpg/pdf)이므로 Cache-First 전략으로 오프라인 열람이 가능합니다

## 8. 향후 확장 아이디어

Component QR Code · Crane Model별 자료 묶음 · FSR Report · Claim History · RCA · Calibration Record · Maintenance History · Field Checklist 저장(현재는 Inspection 결과 Normal/Abnormal만 로컬에 저장됨) · Setting Calculator · Unit Converter · Hydraulic Pressure Calculator · Electrical Measurement Guide · Sensor Diagnostic Tool

# Tech Flower — Field Engineer Technical Data

**Tech Flower Co., Ltd.** 현장 엔지니어를 위한 선박용 크레인/산업기계 기술자료 참조 서비스.

정적 웹사이트(HTML/CSS/Vanilla JS/JSON/Markdown)로 구성되어 있으며, 서버·데이터베이스 없이 GitHub Pages에서 서비스된다. iPhone Safari 사용을 최우선으로 설계되었다.

---

## 1. 폴더 구조

```
/
├─ index.html
├─ css/
│  └─ style.css
├─ js/
│  ├─ app.js                 # 라우팅 + 화면 렌더링 + LocalStorage
│  ├─ i18n.js                # UI 문자열 언어 딕셔너리
│  ├─ component-loader.js    # components.json / Markdown 로더 + 렌더러
│  └─ search.js              # 전문(全文) 검색 인덱스
├─ data/
│  └─ components.json        # 전체 Component 목록 및 메타데이터 (유일한 JSON)
├─ components/
│  ├─ encoder/
│  │  ├─ overview.ko.md / overview.en.md
│  │  ├─ inspection.ko.md / inspection.en.md
│  │  ├─ setting.ko.md / setting.en.md
│  │  ├─ troubleshooting.ko.md / troubleshooting.en.md
│  │  ├─ specifications.ko.md / specifications.en.md
│  │  ├─ images/
│  │  └─ documents/
│  ├─ hydraulic-pump/  (동일 구조)
│  ├─ pvg-valve/       (동일 구조)
│  └─ load-cell/       (동일 구조)
└─ README.md
```

각 Component 폴더에는 **JSON 파일을 두지 않는다.** 모든 메타데이터(이름, 모델, 제조사, 카테고리, 이미지/문서 목록)는 `data/components.json` 하나로 관리한다.

---

## 2. GitHub Pages 배포 방법

1. GitHub 저장소(`andaiga-create/tech-data` 등)에 위 폴더 구조 그대로 Push한다.
2. GitHub 저장소 → **Settings → Pages**로 이동한다.
3. **Branch**를 `main`, 폴더를 `/(root)`로 지정하고 **Save**를 누른다.
4. 몇 분 후 `https://<계정명>.github.io/<저장소명>/` 주소로 서비스가 활성화된다.
5. 이후 자료를 수정하고 Commit/Push하면 GitHub Pages가 자동으로 최신 내용을 반영한다.

> 별도의 빌드 과정이 없으므로, Push 즉시(또는 수 분 내) 배포가 반영된다.

---

## 3. 새 Component 추가 방법 (HTML/JS 수정 불필요)

1. `components/` 아래에 새 폴더를 만든다. (예: `components/gearbox/`)
2. 그 안에 아래 10개 Markdown 파일과 `images/`, `documents/` 폴더를 만든다.
   ```
   overview.ko.md   overview.en.md
   inspection.ko.md inspection.en.md
   setting.ko.md    setting.en.md
   troubleshooting.ko.md troubleshooting.en.md
   specifications.ko.md  specifications.en.md
   images/
   documents/
   ```
3. `images/`, `documents/`에 실제 사진/PDF를 넣는다.
4. `data/components.json`에 새 Component 항목을 추가한다.
   ```json
   {
     "id": "gearbox",
     "name": { "ko": "감속기", "en": "Gearbox" },
     "model": "모델명",
     "manufacturer": "제조사",
     "category": "mechanical",
     "description": { "ko": "설명", "en": "Description" },
     "keywords": ["gearbox", "감속기"],
     "updated": "YYYY-MM-DD",
     "images": [
       { "file": "images/example.jpg", "caption": { "ko": "설명", "en": "Caption" } }
     ],
     "documents": [
       { "file": "documents/example.pdf", "title": { "ko": "제목", "en": "Title" }, "type": "datasheet" }
     ]
   }
   ```
5. Git Commit / Push 한다.

**HTML과 JavaScript 코드는 수정하지 않는다.** Component별 Hard Coding이 없기 때문에 위 과정만으로 새 Component가 Home 화면, 검색, 카테고리 필터에 자동으로 노출된다.

---

## 4. 언어(한/영) 관리 규칙

- UI 텍스트: `js/i18n.js`의 딕셔너리에 키를 추가하면 즉시 한/영 전환에 반영된다.
- 기술자료: `[section].ko.md` / `[section].en.md`를 각각 관리한다. 언어 전환 버튼(KR/EN)을 누르면 현재 보고 있는 Section의 동일 언어 파일로 자동 전환된다.
- 선택한 언어는 `localStorage`에 저장되어 다음 방문 시에도 유지된다.

---

## 5. Markdown 작성 규칙 (component-loader.js가 지원하는 문법)

- 제목: `##`, `###`, `####`
- 표: 일반 GitHub 스타일 `| ... | ... |`
- 체크리스트: `- [ ] 항목` / `- [x] 항목`
- 목록: `- 항목` (순서 없음), `1. 항목` (순서 있음)
- 강조: `**굵게**`, `*기울임*`, `` `inline code` ``
- 주의/경고 블록: `> ⚠ 내용` (Warning), `> ℹ 내용` (Info), `> ✅ 내용` (Success/정상)

---

## 6. 로컬 확인 방법

정적 파일이므로 별도 빌드가 필요 없다. 로컬에서 확인하려면 프로젝트 루트에서 간단한 정적 서버를 실행한다.

```bash
python3 -m http.server 8080
# 이후 브라우저에서 http://localhost:8080 접속
```

`file://`로 직접 열면 `fetch()`가 로컬 파일 접근을 차단하는 브라우저가 있으므로, 반드시 위와 같은 로컬 서버를 통해 확인한다.

---

## 7. 향후 확장 (PWA / Offline)

- Service Worker를 추가하여 Markdown/이미지/문서를 캐싱하면 선박 현장의 불안정한 네트워크 환경에서도 오프라인으로 자료를 열람할 수 있다.
- `manifest.json`을 추가하면 iPhone 홈 화면에 아이콘으로 추가(Add to Home Screen)할 수 있다.
- 현재 구조는 이 확장을 염두에 두고 데이터(Markdown/JSON)와 로직(JS)을 분리해 두었으므로, 추후 Service Worker 추가 시 기존 코드 변경을 최소화할 수 있다.

/**
 * app.js
 * Hash 기반 SPA Router + 화면 렌더링 + LocalStorage(최근 본 자료/즐겨찾기) 관리
 * 어떤 Component에도 종속되지 않는다.
 */

const STORAGE_KEYS = {
  RECENT: "techflower_recent",
  FAVORITES: "techflower_favorites"
};

const MAIN_SECTIONS = ["inspection", "setting", "troubleshooting"];
const SUB_SECTIONS = ["specifications", "documents", "photos"];

const appEl = document.getElementById("app-content");
const searchBarWrap = document.getElementById("global-search-wrap");
const searchInput = document.getElementById("global-search-input");

/* ---------------- LocalStorage Helpers ---------------- */

function readList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
}

function pushRecent(componentId) {
  let list = readList(STORAGE_KEYS.RECENT).filter((id) => id !== componentId);
  list.unshift(componentId);
  list = list.slice(0, 12);
  localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(list));
}

function toggleFavorite(componentId) {
  let list = readList(STORAGE_KEYS.FAVORITES);
  if (list.includes(componentId)) {
    list = list.filter((id) => id !== componentId);
  } else {
    list.unshift(componentId);
  }
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(list));
  return list.includes(componentId);
}

function isFavorite(componentId) {
  return readList(STORAGE_KEYS.FAVORITES).includes(componentId);
}

/* ---------------- Small DOM helpers ---------------- */

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function categoryLabel(cat) {
  const map = {
    electrical: "categoryElectrical",
    hydraulic: "categoryHydraulic",
    mechanical: "categoryMechanical",
    safety: "categorySafety"
  };
  return t(map[cat] || "categoryAll");
}

function sectionIcon(section) {
  const icons = {
    inspection: "🔎",
    setting: "🎚️",
    troubleshooting: "🛠️",
    specifications: "📐",
    documents: "📄",
    photos: "🖼️",
    overview: "ℹ️"
  };
  return icons[section] || "📁";
}

/* ---------------- Router ---------------- */

function parseHash() {
  const hash = location.hash.replace(/^#\/?/, "");
  const [path, queryStr] = hash.split("?");
  const parts = path.split("/").filter(Boolean);
  const query = {};
  if (queryStr) {
    new URLSearchParams(queryStr).forEach((v, k) => (query[k] = v));
  }
  return { parts, query };
}

async function router() {
  const { parts, query } = parseHash();
  setActiveNav(parts);

  // 검색창 중복 방지: Home 화면은 Hero 검색창만 노출하고
  // 헤더의 전역 검색창은 숨긴다. 그 외 화면은 헤더 검색창만 노출한다.
  const isHome = parts.length === 0;
  searchBarWrap.classList.toggle("is-hidden-header-search", isHome);

  // 검색 화면 진입 시 헤더 검색창에 현재 검색어를 반영한다.
  if (parts[0] === "search") {
    searchInput.value = query.q || "";
  }

  try {
    if (parts.length === 0) {
      await renderHome();
    } else if (parts[0] === "search") {
      await renderSearch(query.q || "");
    } else if (parts[0] === "favorites") {
      await renderFavorites();
    } else if (parts[0] === "recent") {
      await renderRecent();
    } else if (parts[0] === "component" && parts[1]) {
      const section = parts[2] || null;
      await renderComponentDetail(parts[1], section);
    } else {
      await renderHome();
    }
  } catch (err) {
    console.error(err);
    appEl.innerHTML = `<div class="empty-state"><p>${t("loadError")}</p></div>`;
  }

  window.scrollTo(0, 0);
}

function setActiveNav(parts) {
  document.querySelectorAll(".bottom-nav a").forEach((a) => a.classList.remove("active"));
  let key = "nav-home";
  if (parts[0] === "search") key = "nav-search";
  else if (parts[0] === "favorites") key = "nav-favorites";
  else if (parts[0] === "recent") key = "nav-recent";
  const activeEl = document.getElementById(key);
  if (activeEl) activeEl.classList.add("active");
}

/* ---------------- Views ---------------- */

async function renderHome() {
  const components = await loadComponentsList();
  const categories = ["all", "electrical", "hydraulic", "mechanical", "safety"];

  appEl.innerHTML = `
    <section class="hero">
      <div class="hero-search">
        <label class="search-box" for="home-search-input">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input id="home-search-input" type="search" data-i18n-placeholder="searchPlaceholder" placeholder="${t("searchPlaceholder")}" autocomplete="off">
        </label>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title" data-i18n="componentsTitle">${t("componentsTitle")}</h2>
      <div class="chip-row" id="category-chips">
        ${categories.map((c, idx) => `<button class="chip ${idx === 0 ? "chip-active" : ""}" data-cat="${c}">${c === "all" ? t("categoryAll") : categoryLabel(c)}</button>`).join("")}
      </div>
      <div class="card-grid" id="component-grid"></div>
    </section>
  `;

  const grid = document.getElementById("component-grid");
  const renderGrid = (cat) => {
    const filtered = cat === "all" ? components : components.filter((c) => c.category === cat);
    grid.innerHTML = filtered.map(componentCardHtml).join("") ||
      `<div class="empty-state"><p>${t("noResults")}</p></div>`;
  };
  renderGrid("all");

  document.getElementById("category-chips").addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    document.querySelectorAll("#category-chips .chip").forEach((c) => c.classList.remove("chip-active"));
    btn.classList.add("chip-active");
    renderGrid(btn.dataset.cat);
  });

  const homeInput = document.getElementById("home-search-input");
  homeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && homeInput.value.trim()) {
      location.hash = `#/search?q=${encodeURIComponent(homeInput.value.trim())}`;
    }
  });
}

function componentCardHtml(c) {
  const lang = getCurrentLang();
  return `
    <a class="component-card" href="#/component/${c.id}">
      <div class="component-card-top">
        <span class="badge badge-${c.category}">${categoryLabel(c.category)}</span>
        ${isFavorite(c.id) ? '<span class="fav-dot" title="favorite">★</span>' : ""}
      </div>
      <h3 class="component-card-title">${c.name[lang] || c.name.ko}</h3>
      <p class="component-card-model">${c.model || ""}</p>
      <p class="component-card-desc">${(c.description && c.description[lang]) || ""}</p>
    </a>
  `;
}

async function renderSearch(initialQuery) {
  appEl.innerHTML = `
    <section class="section search-section">
      <div id="search-results" class="search-results"></div>
    </section>
  `;

  // 검색 입력은 헤더의 전역 검색창 하나만 사용한다 (중복 제거).
  searchInput.focus();
  if (initialQuery) await runHeaderSearch(initialQuery);
}

/**
 * 헤더 검색창 값으로 검색을 실행하고, 현재 화면이 검색 결과 화면일 때만
 * #search-results 영역을 갱신한다. (Home/Component 등 다른 화면에서는 무시)
 */
async function runHeaderSearch(q) {
  const resultsEl = document.getElementById("search-results");
  if (!resultsEl) return; // 검색 화면이 아니면 아무 것도 하지 않는다

  if (!q.trim()) {
    resultsEl.innerHTML = "";
    return;
  }
  resultsEl.innerHTML = `<div class="empty-state"><p>${t("loading")}</p></div>`;
  const lang = getCurrentLang();
  const components = await loadComponentsList();
  const byId = Object.fromEntries(components.map((c) => [c.id, c]));
  const results = await searchAll(q, lang);

  if (!results.length) {
    resultsEl.innerHTML = `<div class="empty-state"><p>${t("noResults")}</p></div>`;
    return;
  }

  resultsEl.innerHTML = `<p class="results-count">${results.length} ${t("resultsCount")}</p>` +
    results.map((r) => {
      const comp = byId[r.componentId];
      if (!comp) return "";
      const href = r.section ? `#/component/${r.componentId}/${r.section}` : `#/component/${r.componentId}`;
      return `
        <a class="result-card" href="${href}">
          <div class="result-card-icon">${sectionIcon(r.section || "overview")}</div>
          <div class="result-card-body">
            <div class="result-card-title">${r.title}</div>
            <div class="result-card-snippet">${r.snippet}</div>
          </div>
        </a>
      `;
    }).join("");
}

async function renderFavorites() {
  const ids = readList(STORAGE_KEYS.FAVORITES);
  const components = await loadComponentsList();
  const list = ids.map((id) => components.find((c) => c.id === id)).filter(Boolean);

  appEl.innerHTML = `
    <section class="section">
      <h2 class="section-title" data-i18n="favorites">${t("favorites")}</h2>
      <div class="card-grid">
        ${list.map(componentCardHtml).join("") || `<div class="empty-state"><p>${t("noFavorites")}</p></div>`}
      </div>
    </section>
  `;
}

async function renderRecent() {
  const ids = readList(STORAGE_KEYS.RECENT);
  const components = await loadComponentsList();
  const list = ids.map((id) => components.find((c) => c.id === id)).filter(Boolean);

  appEl.innerHTML = `
    <section class="section">
      <h2 class="section-title" data-i18n="recentlyViewed">${t("recentlyViewed")}</h2>
      <div class="card-grid">
        ${list.map(componentCardHtml).join("") || `<div class="empty-state"><p>${t("noRecent")}</p></div>`}
      </div>
    </section>
  `;
}

async function renderComponentDetail(componentId, section) {
  const comp = await getComponentById(componentId);
  if (!comp) {
    appEl.innerHTML = `<div class="empty-state"><p>${t("loadError")}</p></div>`;
    return;
  }
  pushRecent(componentId);
  const lang = getCurrentLang();

  if (!section) {
    appEl.innerHTML = `
      <a class="back-link" href="#/">
        <span aria-hidden="true">←</span> <span data-i18n="back">${t("back")}</span>
      </a>

      <section class="component-header">
        <div class="nameplate">
          <div class="nameplate-top">
            <span class="badge badge-${comp.category}">${categoryLabel(comp.category)}</span>
            <button class="fav-btn" id="fav-toggle-btn" aria-label="${t("addFavorite")}">${isFavorite(comp.id) ? "★" : "☆"}</button>
          </div>
          <h1 class="nameplate-title">${(comp.name[lang] || comp.name.ko).toUpperCase()}</h1>
          <p class="nameplate-sub">${(comp.description && comp.description[lang]) || ""}</p>
          <div class="nameplate-meta">
            <span><strong>${t("model")}</strong> ${comp.model || "-"}</span>
            <span><strong>${t("manufacturer")}</strong> ${comp.manufacturer || "-"}</span>
            <span><strong>${t("updated")}</strong> ${comp.updated || "-"}</span>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-nav-grid primary">
          ${MAIN_SECTIONS.map((s) => sectionNavCardHtml(componentId, s)).join("")}
        </div>
        <div class="section-nav-grid secondary">
          ${SUB_SECTIONS.map((s) => sectionNavCardHtml(componentId, s)).join("")}
        </div>
      </section>
    `;

    document.getElementById("fav-toggle-btn").addEventListener("click", (e) => {
      const nowFav = toggleFavorite(componentId);
      e.currentTarget.textContent = nowFav ? "★" : "☆";
    });
    return;
  }

  if (section === "documents") {
    await renderDocuments(comp);
    return;
  }
  if (section === "photos") {
    await renderPhotos(comp);
    return;
  }

  // overview / inspection / setting / troubleshooting / specifications
  appEl.innerHTML = `
    <a class="back-link" href="#/component/${componentId}">
      <span aria-hidden="true">←</span> <span data-i18n="back">${t("back")}</span>
    </a>
    <section class="section-header-row">
      <span class="section-icon-badge">${sectionIcon(section)}</span>
      <div>
        <div class="section-eyebrow">${(comp.name[lang] || comp.name.ko)}</div>
        <h1 class="section-page-title">${t(section === "specifications" ? "specification" : section)}</h1>
      </div>
    </section>
    <section class="markdown-body" id="markdown-body">
      <div class="empty-state"><p>${t("loading")}</p></div>
    </section>
  `;

  const body = document.getElementById("markdown-body");
  const html = await loadSectionHtml(componentId, section, lang);
  body.innerHTML = html || `<div class="empty-state"><p>${t("loadError")}</p></div>`;
}

function sectionNavCardHtml(componentId, section) {
  const label = t(section === "specifications" ? "specification" : section);
  return `
    <a class="section-nav-card" href="#/component/${componentId}/${section}">
      <span class="section-nav-icon">${sectionIcon(section)}</span>
      <span class="section-nav-label">${label}</span>
      <span class="section-nav-arrow" aria-hidden="true">›</span>
    </a>
  `;
}

async function renderDocuments(comp) {
  const lang = getCurrentLang();
  const docs = comp.documents || [];
  appEl.innerHTML = `
    <a class="back-link" href="#/component/${comp.id}">
      <span aria-hidden="true">←</span> <span data-i18n="back">${t("back")}</span>
    </a>
    <section class="section-header-row">
      <span class="section-icon-badge">${sectionIcon("documents")}</span>
      <div>
        <div class="section-eyebrow">${comp.name[lang] || comp.name.ko}</div>
        <h1 class="section-page-title">${t("documents")}</h1>
      </div>
    </section>
    <section class="section">
      <div class="doc-list">
        ${docs.map((d) => `
          <a class="doc-card" href="${comp.id ? `components/${comp.id}/${d.file}` : d.file}" target="_blank" rel="noopener">
            <span class="doc-icon">📄</span>
            <span class="doc-title">${d.title[lang] || d.title.ko}</span>
            <span class="doc-open">${t("openDocument")} ›</span>
          </a>
        `).join("") || `<div class="empty-state"><p>${t("noDocuments")}</p></div>`}
      </div>
    </section>
  `;
}

async function renderPhotos(comp) {
  const lang = getCurrentLang();
  const images = comp.images || [];
  appEl.innerHTML = `
    <a class="back-link" href="#/component/${comp.id}">
      <span aria-hidden="true">←</span> <span data-i18n="back">${t("back")}</span>
    </a>
    <section class="section-header-row">
      <span class="section-icon-badge">${sectionIcon("photos")}</span>
      <div>
        <div class="section-eyebrow">${comp.name[lang] || comp.name.ko}</div>
        <h1 class="section-page-title">${t("photos")}</h1>
      </div>
    </section>
    <section class="section">
      <div class="photo-grid">
        ${images.map((img, idx) => `
          <button class="photo-thumb" data-idx="${idx}">
            <img src="components/${comp.id}/${img.file}" alt="${img.caption[lang] || img.caption.ko}" loading="lazy">
            <span class="photo-caption">${img.caption[lang] || img.caption.ko}</span>
          </button>
        `).join("") || `<div class="empty-state"><p>${t("noPhotos")}</p></div>`}
      </div>
    </section>
    <div class="photo-viewer" id="photo-viewer" hidden>
      <button class="photo-viewer-close" id="photo-viewer-close" aria-label="close">✕</button>
      <img id="photo-viewer-img" src="" alt="">
      <p id="photo-viewer-caption"></p>
    </div>
  `;

  const viewer = document.getElementById("photo-viewer");
  const viewerImg = document.getElementById("photo-viewer-img");
  const viewerCaption = document.getElementById("photo-viewer-caption");

  document.querySelectorAll(".photo-thumb").forEach((btn) => {
    btn.addEventListener("click", () => {
      const img = images[Number(btn.dataset.idx)];
      viewerImg.src = `components/${comp.id}/${img.file}`;
      viewerCaption.textContent = img.caption[lang] || img.caption.ko;
      viewer.hidden = false;
    });
  });
  document.getElementById("photo-viewer-close").addEventListener("click", () => (viewer.hidden = true));
  viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.hidden = true; });
}

/* ---------------- Utilities ---------------- */

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

/* ---------------- Language Toggle ---------------- */

function setupLanguageToggle() {
  const btnKo = document.getElementById("lang-ko");
  const btnEn = document.getElementById("lang-en");

  const applyState = () => {
    const lang = getCurrentLang();
    btnKo.classList.toggle("lang-active", lang === "ko");
    btnEn.classList.toggle("lang-active", lang === "en");
    document.documentElement.lang = lang;
    applyI18n();
  };

  btnKo.addEventListener("click", () => { setCurrentLang("ko"); applyState(); router(); });
  btnEn.addEventListener("click", () => { setCurrentLang("en"); applyState(); router(); });

  applyState();
}

/* ---------------- Global header search (검색 페이지 이외 화면에서 Enter로 이동) ---------------- */

function setupGlobalSearch() {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && searchInput.value.trim()) {
      location.hash = `#/search?q=${encodeURIComponent(searchInput.value.trim())}`;
      searchInput.blur();
    }
  });

  // 검색 화면에 있을 때는 입력할 때마다 실시간으로 결과를 갱신한다.
  searchInput.addEventListener("input", debounce(() => {
    const { parts } = parseHash();
    if (parts[0] !== "search") return;
    runHeaderSearch(searchInput.value);
  }, 250));
}

/* ---------------- Init ---------------- */

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", () => {
  setupLanguageToggle();
  setupGlobalSearch();
  router();
});

/* =========================================================
   app.js
   Hash-based router + rendering. No component-specific
   logic lives here — everything is driven by data files.
   ========================================================= */

(() => {
  const $app = document.getElementById('app');
  const LS_FAV = 'fe_favorites';
  const LS_RECENT = 'fe_recent';
  const LS_RESULT_PREFIX = 'fe_result_';

  /* ---------------- storage helpers ---------------- */
  const store = {
    get(key, fallback) {
      try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
      catch { return fallback; }
    },
    set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  };

  function getFavorites() { return store.get(LS_FAV, []); }
  function toggleFavorite(id) {
    let favs = getFavorites();
    favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
    store.set(LS_FAV, favs);
    return favs;
  }
  function getRecent() { return store.get(LS_RECENT, []); }
  function pushRecent(id) {
    let recent = getRecent().filter(r => r !== id);
    recent.unshift(id);
    recent = recent.slice(0, 10);
    store.set(LS_RECENT, recent);
  }

  /* ---------------- router ---------------- */
  const routes = [];
  function route(pattern, handler) { routes.push({ pattern, handler }); }

  function parseHash() {
    const hash = location.hash.replace(/^#\/?/, '');
    return hash.split('?')[0].split('/').filter(Boolean);
  }
  function parseQuery() {
    const q = location.hash.split('?')[1] || '';
    return Object.fromEntries(new URLSearchParams(q));
  }

  async function render() {
    const parts = parseHash();
    const query = parseQuery();
    window.scrollTo(0, 0);

    try {
      if (parts.length === 0) return renderHome();
      if (parts[0] === 'search') return renderSearch(query.q || '');
      if (parts[0] === 'favorites') return renderFavorites();
      if (parts[0] === 'recent') return renderRecent();
      if (parts[0] === 'component' && parts[1] && !parts[2]) return renderComponentDetail(parts[1]);
      if (parts[0] === 'component' && parts[1] && parts[2]) return renderSection(parts[1], parts[2]);
      return renderHome();
    } catch (err) {
      console.error(err);
      renderError(err);
    }
  }

  window.addEventListener('hashchange', render);

  /* ---------------- shell pieces ---------------- */
  function header({ title = null, back = null } = {}) {
    if (back) {
      return `
        <header class="header">
          <button class="header__back" data-nav="${back}" aria-label="Back">&#8592;</button>
          <div class="header__title">${title || ''}</div>
        </header>`;
    }
    return `
      <header class="header">
        <div class="header__brand">FIELD<span>REF</span></div>
      </header>`;
  }

  function tabbar(active) {
    const tabs = [
      { key: 'home', href: '#/', icon: '&#127968;', label: 'Home' },
      { key: 'search', href: '#/search', icon: '&#128269;', label: 'Search' },
      { key: 'recent', href: '#/recent', icon: '&#128337;', label: 'Recent' },
      { key: 'favorites', href: '#/favorites', icon: '&#9733;', label: 'Favorites' }
    ];
    return `
      <nav class="tabbar">
        ${tabs.map(t => `
          <a class="tabbar__btn ${active === t.key ? 'active' : ''}" href="${t.href}">
            <span class="ic">${t.icon}</span><span>${t.label}</span>
          </a>`).join('')}
      </nav>`;
  }

  function shell(headerHtml, mainHtml, tabbarHtml = '') {
    $app.innerHTML = `${headerHtml}<main class="main">${mainHtml}</main>${tabbarHtml}`;
    bindNavButtons();
  }

  function bindNavButtons() {
    $app.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', () => { location.hash = el.dataset.nav; });
    });
  }

  function renderError(err) {
    shell(header(), `<div class="empty-state">Failed to load data.<br><small>${err.message}</small></div>`, tabbar());
  }

  /* ---------------- category color helper ---------------- */
  function catClass(cat) { return `cat-${cat}`; }
  function dotClass(cat) { return `dot-${cat}`; }

  /* ---------------- Home ---------------- */
  async function renderHome() {
    shell(header(), `
      <div class="search">
        <span class="search__icon">&#128269;</span>
        <input id="home-search" placeholder="Search component, model, error keyword…" autocomplete="off">
      </div>
      <div class="chip-row" id="cat-chips"></div>
      <div class="section-label">Components</div>
      <div class="card-list" id="comp-list"><div class="skeleton"></div><div class="skeleton"></div></div>
    `, tabbar('home'));

    const searchInput = document.getElementById('home-search');
    searchInput.addEventListener('focus', () => { location.hash = '#/search'; });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') location.hash = `#/search?q=${encodeURIComponent(searchInput.value)}`;
    });

    const components = await ComponentLoader.getAllComponents();
    const cats = [...new Set(components.map(c => c.category))];
    let activeCat = null;

    const chipsEl = document.getElementById('cat-chips');
    function renderChips() {
      chipsEl.innerHTML = `<button class="chip ${!activeCat ? 'active' : ''}" data-cat="">All</button>` +
        cats.map(c => `<button class="chip ${activeCat === c ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');
      chipsEl.querySelectorAll('.chip').forEach(btn => {
        btn.addEventListener('click', () => {
          activeCat = btn.dataset.cat || null;
          renderChips();
          renderList();
        });
      });
    }

    const listEl = document.getElementById('comp-list');
    const favs = getFavorites();
    function renderList() {
      const filtered = activeCat ? components.filter(c => c.category === activeCat) : components;
      if (!filtered.length) {
        listEl.innerHTML = `<div class="empty-state">No components in this category.</div>`;
        return;
      }
      listEl.innerHTML = filtered.map(c => componentCardHtml(c, favs.includes(c.id))).join('');
      bindCardEvents(listEl);
    }

    renderChips();
    renderList();
  }

  function componentCardHtml(c, isFav) {
    return `
      <div class="comp-card" data-nav="#/component/${c.id}">
        <div class="comp-card__main">
          <div class="comp-card__top">
            <span class="cat-dot ${dotClass(c.category)}"></span>
            <span class="comp-card__name">${c.name}</span>
          </div>
          <div class="comp-card__meta">${c.manufacturer || '—'}${c.models && c.models.length ? ' · ' + c.models.join(', ') : ''}</div>
          <div class="comp-card__desc">${c.description || ''}</div>
          <div class="comp-card__updated">UPDATED ${c.updated || '—'}</div>
        </div>
        <button class="comp-card__fav ${isFav ? 'active' : ''}" data-fav="${c.id}" aria-label="Toggle favorite">${isFav ? '&#9733;' : '&#9734;'}</button>
        <span class="comp-card__chevron">&#8250;</span>
      </div>`;
  }

  function bindCardEvents(container) {
    container.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('[data-fav]')) return;
        location.hash = el.dataset.nav;
      });
    });
    container.querySelectorAll('[data-fav]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const favs = toggleFavorite(btn.dataset.fav);
        btn.classList.toggle('active', favs.includes(btn.dataset.fav));
        btn.innerHTML = favs.includes(btn.dataset.fav) ? '&#9733;' : '&#9734;';
      });
    });
  }

  /* ---------------- Search ---------------- */
  async function renderSearch(initialQ) {
    shell(header(), `
      <div class="search">
        <span class="search__icon">&#128269;</span>
        <input id="search-input" placeholder="Search component, model, error keyword…" autocomplete="off" value="${initialQ.replace(/"/g, '&quot;')}">
        <button class="search__clear" id="search-clear">&times;</button>
      </div>
      <div class="search-results" id="search-results"></div>
    `, tabbar('search'));

    const input = document.getElementById('search-input');
    const resultsEl = document.getElementById('search-results');
    const clearBtn = document.getElementById('search-clear');
    input.focus();
    if (input.value) input.setSelectionRange(input.value.length, input.value.length);

    async function runSearch(q) {
      clearBtn.classList.toggle('show', !!q);
      if (!q.trim()) {
        resultsEl.innerHTML = `<div class="search-results__empty">Type to search across all components,<br>including inspection / setting / troubleshooting content.</div>`;
        return;
      }
      resultsEl.innerHTML = `<div class="skeleton"></div>`;
      const hits = await Search.search(q);
      if (!hits.length) {
        resultsEl.innerHTML = `<div class="search-results__empty">No results for "${q}"</div>`;
        return;
      }
      resultsEl.innerHTML = hits.slice(0, 30).map(hitHtml).join('');
      resultsEl.querySelectorAll('[data-nav]').forEach(el => {
        el.addEventListener('click', () => { location.hash = el.dataset.nav; });
      });
    }

    function hitHtml(hit) {
      const href = hit.section
        ? `#/component/${hit.id}/${hit.section}`
        : `#/component/${hit.id}`;
      return `
        <div class="search-hit" data-nav="${href}">
          <div class="search-hit__section">${hit.sectionLabel}</div>
          <div class="search-hit__body">
            <div class="search-hit__name">${hit.component.name} <span style="color:var(--text-faint);font-weight:400;">— ${hit.component.manufacturer || ''}</span></div>
            <div class="search-hit__snippet">${hit.snippet}</div>
          </div>
        </div>`;
    }

    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => runSearch(input.value), 150);
    });
    clearBtn.addEventListener('click', () => { input.value = ''; runSearch(''); input.focus(); });

    runSearch(initialQ);
  }

  /* ---------------- Favorites / Recent ---------------- */
  async function renderFavorites() {
    const ids = getFavorites();
    await renderIdList('Favorites', ids, 'favorites', 'No favorites yet. Tap the star on any component to save it here.');
  }
  async function renderRecent() {
    const ids = getRecent();
    await renderIdList('Recently Viewed', ids, 'recent', 'Components you open will appear here.');
  }

  async function renderIdList(title, ids, tabKey, emptyMsg) {
    shell(header(), `
      <div class="section-label">${title}</div>
      <div class="card-list" id="id-list"><div class="skeleton"></div></div>
    `, tabbar(tabKey));

    const listEl = document.getElementById('id-list');
    if (!ids.length) {
      listEl.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
      return;
    }
    const favs = getFavorites();
    const comps = (await Promise.all(ids.map(id => ComponentLoader.getComponent(id).catch(() => null)))).filter(Boolean);
    if (!comps.length) {
      listEl.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
      return;
    }
    listEl.innerHTML = comps.map(c => componentCardHtml(c, favs.includes(c.id))).join('');
    bindCardEvents(listEl);
  }

  /* ---------------- Component Detail ---------------- */
  async function renderComponentDetail(id) {
    shell(header({ back: '#/', title: 'COMPONENT' }), `<div class="skeleton" style="height:140px;"></div>`, tabbar());
    const comp = await ComponentLoader.getComponent(id);
    pushRecent(id);
    const favs = getFavorites();
    const isFav = favs.includes(id);

    const priority = ['inspection', 'setting', 'troubleshooting'];
    const sectionOrder = [
      ...priority.filter(s => (comp.sections || []).includes(s)),
      ...(comp.sections || []).filter(s => !priority.includes(s)),
      'documents', 'photos'
    ];

    const tilesHtml = sectionOrder.map(sec => {
      const meta = ComponentLoader.SECTION_META[sec] || { label: sec, icon: '&#128203;' };
      const isPriority = priority.includes(sec);
      return `
        <div class="section-tile ${isPriority ? 'priority' : ''}" data-nav="#/component/${id}/${sec}">
          <span class="section-tile__icon">${meta.icon}</span>
          <span class="section-tile__label">${meta.label}</span>
          ${isPriority ? '<span class="section-tile__hint">Field priority</span>' : ''}
        </div>`;
    }).join('');

    shell(header({ back: '#/', title: comp.category }), `
      <div class="nameplate">
        <span class="nameplate__rivet tl"></span><span class="nameplate__rivet tr"></span>
        <span class="nameplate__rivet bl"></span><span class="nameplate__rivet br"></span>
        <div class="nameplate__cat ${catClass(comp.category)}">
          <span class="cat-dot ${dotClass(comp.category)}"></span>${comp.category}
        </div>
        <div class="nameplate__name">${comp.name}</div>
        <div class="nameplate__sub">${comp.manufacturer || '—'} &nbsp;/&nbsp; ${(comp.models || []).join(', ') || '—'}</div>
        <div class="nameplate__desc">${comp.description || ''}</div>
        <div class="nameplate__updated">UPDATED ${comp.updated || '—'}</div>
      </div>
      <div class="section-grid">${tilesHtml}</div>
    `, tabbar());

    // add favorite toggle into header via title area replacement
    const headerTitle = document.querySelector('.header__title');
    headerTitle.innerHTML = `${comp.category} <button id="fav-toggle" style="background:none;border:none;color:${isFav ? 'var(--accent)' : 'var(--text-faint)'};font-size:16px;float:right;">${isFav ? '&#9733;' : '&#9734;'}</button>`;
    document.getElementById('fav-toggle').addEventListener('click', (e) => {
      e.stopPropagation();
      const nowFavs = toggleFavorite(id);
      const nowFav = nowFavs.includes(id);
      e.target.innerHTML = nowFav ? '&#9733;' : '&#9734;';
      e.target.style.color = nowFav ? 'var(--accent)' : 'var(--text-faint)';
    });

    bindNavButtons();
  }

  /* ---------------- Section detail ---------------- */
  async function renderSection(id, section) {
    shell(header({ back: `#/component/${id}`, title: 'LOADING' }), `<div class="skeleton" style="height:300px;"></div>`, tabbar());
    const comp = await ComponentLoader.getComponent(id);
    const meta = ComponentLoader.SECTION_META[section] || { label: section, icon: '' };

    let bodyHtml;
    if (section === 'documents') {
      bodyHtml = documentsHtml(comp);
    } else if (section === 'photos') {
      bodyHtml = photosHtml(comp);
    } else {
      const raw = await ComponentLoader.getSectionRaw(id, section);
      const rendered = MiniMarkdown.render(raw || `# ${meta.label}\n\nNo data available yet for this section.`);
      bodyHtml = `<div class="content-block md">${rendered}</div>`;
      if (section === 'inspection') bodyHtml += resultToggleHtml(id);
    }

    shell(header({ back: `#/component/${id}`, title: `${comp.name} · ${meta.label}` }), bodyHtml, tabbar());

    if (section === 'photos') bindPhotoEvents();
    if (section === 'documents') bindDocEvents();
    if (section === 'inspection') bindResultToggle(id);
  }

  function documentsHtml(comp) {
    const docs = comp.documents || [];
    if (!docs.length) return `<div class="doc-empty">No documents attached for this component yet.</div>`;
    return `<div class="doc-list">` + docs.map(d => `
      <div class="doc-item" data-doc="components/${comp.id}/documents/${d.file}">
        <span class="doc-item__icon">&#128196;</span>
        <span class="doc-item__name">${d.name}</span>
        <span class="doc-item__go">&#8250;</span>
      </div>`).join('') + `</div>`;
  }
  function bindDocEvents() {
    document.querySelectorAll('[data-doc]').forEach(el => {
      el.addEventListener('click', () => window.open(el.dataset.doc, '_blank'));
    });
  }

  function photosHtml(comp) {
    const imgs = comp.images || [];
    if (!imgs.length) return `<div class="doc-empty">No photos attached for this component yet.</div>`;
    return `<div class="photo-grid">` + imgs.map((img, i) => `
      <div class="photo-grid__item" data-photo-index="${i}">
        <img src="components/${comp.id}/images/${img.file}" alt="${img.caption || ''}"
             onerror="this.parentElement.textContent='${(img.caption || img.file).replace(/'/g, '')}'">
      </div>`).join('') + `</div>
      <div class="lightbox" id="lightbox">
        <button class="lightbox__close" id="lightbox-close">&times;</button>
        <img id="lightbox-img" src="" alt="">
        <div class="lightbox__caption" id="lightbox-caption"></div>
      </div>`;
  }

  let _currentPhotoSet = [];
  function bindPhotoEvents() {
    // recover current component's images from DOM (data attr) — simplest: re-query via last render context
    const comp = _lastRenderedComponent;
    _currentPhotoSet = (comp && comp.images) || [];
    const lightbox = document.getElementById('lightbox');
    const imgEl = document.getElementById('lightbox-img');
    const capEl = document.getElementById('lightbox-caption');
    document.querySelectorAll('[data-photo-index]').forEach(el => {
      el.addEventListener('click', () => {
        const idx = +el.dataset.photoIndex;
        const item = _currentPhotoSet[idx];
        if (!item) return;
        imgEl.src = `components/${comp.id}/images/${item.file}`;
        capEl.textContent = item.caption || '';
        lightbox.classList.add('open');
      });
    });
    document.getElementById('lightbox-close').addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  }

  function resultToggleHtml(id) {
    const saved = store.get(LS_RESULT_PREFIX + id, null);
    return `
      <div class="result-toggle">
        <button class="result-btn normal ${saved === 'normal' ? 'active' : ''}" data-result="normal">NORMAL</button>
        <button class="result-btn abnormal ${saved === 'abnormal' ? 'active' : ''}" data-result="abnormal">ABNORMAL</button>
      </div>`;
  }
  function bindResultToggle(id) {
    document.querySelectorAll('[data-result]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.set(LS_RESULT_PREFIX + id, btn.dataset.result);
        document.querySelectorAll('[data-result]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  let _lastRenderedComponent = null;

  /* ---------------- init ---------------- */
  async function init() {
    // wrap getComponent to remember last component for photo lightbox convenience
    const orig = ComponentLoader.getComponent;
    ComponentLoader.getComponent = async (id) => {
      const c = await orig(id);
      _lastRenderedComponent = c;
      return c;
    };
    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();

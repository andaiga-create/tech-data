/* =========================================================
   search.js
   Searches Component / Model / Manufacturer / Category /
   Keyword plus full text of every section (overview,
   inspection, setting, troubleshooting, specifications).
   Index is built lazily on first search and cached.
   ========================================================= */

const Search = (() => {

  let _index = null;      // array of { id, component, section, sectionLabel, text, plain }
  let _building = null;

  async function buildIndex() {
    const components = await ComponentLoader.getAllComponents();
    const entries = [];

    for (const comp of components) {
      // metadata entry
      const metaText = [
        comp.name, comp.manufacturer, comp.category,
        ...(comp.models || []), ...(comp.keywords || []), comp.description
      ].filter(Boolean).join(' ');

      entries.push({
        id: comp.id, component: comp, section: null, sectionLabel: 'Component',
        text: metaText.toLowerCase(), plain: comp.description || ''
      });

      // section entries
      const sections = comp.sections || [];
      await Promise.all(sections.map(async (sec) => {
        const raw = await ComponentLoader.getSectionRaw(comp.id, sec);
        if (!raw) return;
        const plain = MiniMarkdown.toPlainText(raw);
        entries.push({
          id: comp.id, component: comp, section: sec,
          sectionLabel: (ComponentLoader.SECTION_META[sec] || {}).label || sec,
          text: plain.toLowerCase(), plain
        });
      }));
    }

    return entries;
  }

  async function ensureIndex() {
    if (_index) return _index;
    if (!_building) _building = buildIndex().then(idx => { _index = idx; return idx; });
    return _building;
  }

  function snippet(text, plain, query) {
    const pos = text.indexOf(query);
    if (pos === -1) return plain.slice(0, 90);
    const start = Math.max(0, pos - 30);
    return (start > 0 ? '…' : '') + plain.slice(start, start + 100) + '…';
  }

  async function search(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const index = await ensureIndex();

    const scored = [];
    const seenComponentOnly = new Set();

    for (const entry of index) {
      const idx = entry.text.indexOf(q);
      if (idx === -1) continue;

      let score = 0;
      if (entry.section === null) score += 50;                    // metadata match ranks high
      if (entry.component.name.toLowerCase().includes(q)) score += 100;
      if ((entry.component.manufacturer || '').toLowerCase().includes(q)) score += 30;
      if ((entry.component.models || []).some(m => m.toLowerCase().includes(q))) score += 40;
      score += Math.max(0, 20 - idx);  // earlier match ranks slightly higher

      scored.push({
        id: entry.id,
        component: entry.component,
        section: entry.section,
        sectionLabel: entry.sectionLabel,
        snippet: snippet(entry.text, entry.plain, q),
        score
      });
    }

    // dedupe: keep best-scoring hit per component+section
    const byKey = new Map();
    for (const r of scored) {
      const key = r.id + '::' + (r.section || 'meta');
      if (!byKey.has(key) || byKey.get(key).score < r.score) byKey.set(key, r);
    }

    return Array.from(byKey.values()).sort((a, b) => b.score - a.score);
  }

  return { search, ensureIndex };
})();

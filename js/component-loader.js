/* =========================================================
   component-loader.js
   - Discovers components via data/components.json manifest
   - Fetches each components/{id}/component.json
   - Fetches + renders markdown section files
   - No component-specific code lives here: adding a new
     component folder + one line in data/components.json
     is the only step required.
   ========================================================= */

const ComponentLoader = (() => {

  const BASE = 'components';
  let _manifestCache = null;
  const _componentCache = new Map();   // id -> component.json data
  const _sectionCache = new Map();     // "id/section" -> raw markdown text

  const SECTION_META = {
    overview:        { label: 'Overview',        icon: '&#128203;' },
    inspection:      { label: 'Inspection',       icon: '&#128269;' },
    setting:         { label: 'Setting',          icon: '&#9881;'   },
    troubleshooting: { label: 'Troubleshooting',  icon: '&#9888;'   },
    specifications:  { label: 'Specification',    icon: '&#128203;' },
    documents:       { label: 'Documents',        icon: '&#128196;' },
    photos:          { label: 'Photos',           icon: '&#128247;' }
  };

  async function getManifest() {
    if (_manifestCache) return _manifestCache;
    const res = await fetch('data/components.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('Failed to load component manifest');
    const json = await res.json();
    _manifestCache = json.components || [];
    return _manifestCache;
  }

  async function getComponent(id) {
    if (_componentCache.has(id)) return _componentCache.get(id);
    const res = await fetch(`${BASE}/${id}/component.json`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to load component: ${id}`);
    const data = await res.json();
    _componentCache.set(id, data);
    return data;
  }

  async function getAllComponents() {
    const ids = await getManifest();
    const results = await Promise.all(ids.map(id =>
      getComponent(id).catch(err => { console.warn(err); return null; })
    ));
    return results.filter(Boolean);
  }

  async function getSectionRaw(id, section) {
    const key = `${id}/${section}`;
    if (_sectionCache.has(key)) return _sectionCache.get(key);
    const res = await fetch(`${BASE}/${id}/${section}.md`, { cache: 'no-cache' });
    if (!res.ok) return null;
    const text = await res.text();
    _sectionCache.set(key, text);
    return text;
  }

  // list files inside components/{id}/documents or /images via a manifest
  // convention: component.json may optionally include "documents": [...] / "images": [...]
  // fallback: none listed -> empty state shown.

  return {
    SECTION_META,
    getManifest,
    getComponent,
    getAllComponents,
    getSectionRaw
  };
})();

/* =========================================================
   Minimal Markdown renderer
   Supports: # ## ###, **bold**, tables, ul/ol, checklists,
   blockquote warnings (> ⚠ ...), hr, inline `code`, links
   ========================================================= */

const MiniMarkdown = (() => {

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function inline(text) {
    let t = escapeHtml(text);
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    t = t.replace(/&amp;nbsp;/g, '&nbsp;');
    return t;
  }

  function isTableSep(line) {
    return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/.test(line);
  }

  function parseTableRow(line) {
    return line.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
  }

  function render(md) {
    if (!md) return '';
    const lines = md.replace(/\r\n/g, '\n').split('\n');
    let html = '';
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (!line.trim()) { i++; continue; }

      // horizontal rule
      if (/^---+$/.test(line.trim())) { html += '<hr>'; i++; continue; }

      // headers
      let m;
      if ((m = /^###\s+(.*)$/.exec(line))) { html += `<h3>${inline(m[1])}</h3>`; i++; continue; }
      if ((m = /^##\s+(.*)$/.exec(line)))  { html += `<h2>${inline(m[1])}</h2>`; i++; continue; }
      if ((m = /^#\s+(.*)$/.exec(line)))   { html += `<h1>${inline(m[1])}</h1>`; i++; continue; }

      // blockquote warning
      if (/^>\s*/.test(line)) {
        let block = [];
        while (i < lines.length && /^>\s*/.test(lines[i])) {
          block.push(lines[i].replace(/^>\s*/, ''));
          i++;
        }
        const text = block.join(' ');
        const iconMatch = /^(&#9888;|⚠️?|\*\*⚠)/.test(text);
        html += `<div class="md-warning"><span class="md-warning__icon">&#9888;&#65039;</span><div>${inline(text.replace(/^⚠\s*/, ''))}</div></div>`;
        continue;
      }

      // table
      if (line.includes('|') && lines[i + 1] && isTableSep(lines[i + 1])) {
        const header = parseTableRow(line);
        i += 2;
        const rows = [];
        while (i < lines.length && lines[i].includes('|') && lines[i].trim()) {
          rows.push(parseTableRow(lines[i]));
          i++;
        }
        html += '<table><thead><tr>' +
          header.map(h => `<th>${inline(h)}</th>`).join('') +
          '</tr></thead><tbody>' +
          rows.map(r => '<tr>' + r.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') +
          '</tbody></table>';
        continue;
      }

      // checklist
      if (/^-\s+\[( |x|X)\]\s+/.test(line)) {
        let items = [];
        while (i < lines.length && /^-\s+\[( |x|X)\]\s+/.test(lines[i])) {
          const cm = /^-\s+\[( |x|X)\]\s+(.*)$/.exec(lines[i]);
          items.push({ checked: cm[1].toLowerCase() === 'x', text: cm[2] });
          i++;
        }
        html += '<ul class="md-checklist">' + items.map(it =>
          `<li><span class="md-checkbox${it.checked ? ' checked' : ''}">&#10003;</span><span>${inline(it.text)}</span></li>`
        ).join('') + '</ul>';
        continue;
      }

      // unordered list
      if (/^[-*]\s+/.test(line)) {
        let items = [];
        while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^[-*]\s+/, ''));
          i++;
        }
        html += '<ul>' + items.map(t => `<li>${inline(t)}</li>`).join('') + '</ul>';
        continue;
      }

      // ordered list
      if (/^\d+\.\s+/.test(line)) {
        let items = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\d+\.\s+/, ''));
          i++;
        }
        html += '<ol>' + items.map(t => `<li>${inline(t)}</li>`).join('') + '</ol>';
        continue;
      }

      // paragraph (collect until blank line)
      let para = [line];
      i++;
      while (i < lines.length && lines[i].trim() && !/^(#|>|-|\d+\.|---)/.test(lines[i])) {
        para.push(lines[i]);
        i++;
      }
      html += `<p>${inline(para.join(' '))}</p>`;
    }

    return html;
  }

  function toPlainText(md) {
    if (!md) return '';
    return md
      .replace(/^#+\s+/gm, '')
      .replace(/[*`>_#|-]/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
  }

  return { render, toPlainText };
})();

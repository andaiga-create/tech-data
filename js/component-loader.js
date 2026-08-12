/**
 * component-loader.js
 * - data/components.json 로드
 * - components/[id]/[section].[lang].md 로드
 * - 경량 Markdown -> HTML 렌더러 (MiniMarkdown)
 *
 * 이 파일은 특정 Component에 종속되지 않는다. (원칙 #24)
 */

let COMPONENTS_CACHE = null;

async function loadComponentsList() {
  if (COMPONENTS_CACHE) return COMPONENTS_CACHE;
  const res = await fetch("data/components.json");
  if (!res.ok) throw new Error("components.json load failed");
  COMPONENTS_CACHE = await res.json();
  return COMPONENTS_CACHE;
}

async function getComponentById(id) {
  const list = await loadComponentsList();
  return list.find((c) => c.id === id) || null;
}

/**
 * Section markdown 파일을 로드한다.
 * 파일명 규칙: components/[id]/[section].[lang].md
 * 언어별 파일이 반드시 존재해야 하는 구조이지만,
 * 혹시 파일이 없을 경우를 대비해 상대 언어로 1회 폴백한다.
 */
async function loadSectionMarkdown(componentId, section, lang) {
  const primaryPath = `components/${componentId}/${section}.${lang}.md`;
  let res = await fetch(primaryPath);

  if (!res.ok) {
    const fallbackLang = lang === "ko" ? "en" : "ko";
    const fallbackPath = `components/${componentId}/${section}.${fallbackLang}.md`;
    res = await fetch(fallbackPath);
    if (!res.ok) {
      return null;
    }
  }
  return await res.text();
}

async function loadSectionHtml(componentId, section, lang) {
  const md = await loadSectionMarkdown(componentId, section, lang);
  if (md === null) return null;
  return renderMarkdown(md);
}

/* -------------------------------------------------------------
 * MiniMarkdown: Vanilla JS 경량 Markdown 렌더러
 * 지원: heading, bold/italic, inline code, link,
 *       ordered/unordered list, checklist, table,
 *       warning/info/success blockquote, hr, paragraph
 * ------------------------------------------------------------- */
function renderMarkdown(src) {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let i = 0;

  const inline = (text) => {
    text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
    text = text.replace(/`([^`]+?)`/g, '<code class="inline-code">$1</code>');
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    return text;
  };

  while (i < lines.length) {
    let line = lines[i];

    if (line.trim() === "") { i++; continue; }

    // Warning / Info / Success blockquote block: > ⚠ ... or > ℹ ... or > ✅ ...
    if (/^>\s?[⚠ℹ✅]/.test(line)) {
      const icon = line.trim().charAt(1) || line.trim().charAt(2);
      let cls = "note-warning", iconChar = "⚠";
      if (line.includes("ℹ")) { cls = "note-info"; iconChar = "ℹ"; }
      else if (line.includes("✅")) { cls = "note-success"; iconChar = "✅"; }
      const bodyLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        bodyLines.push(lines[i].replace(/^>\s?[⚠ℹ✅]?\s?/, ""));
        i++;
      }
      const label = cls === "note-warning" ? t("warning") : (cls === "note-success" ? t("normal") : "");
      html += `<div class="note-block ${cls}"><div class="note-icon">${iconChar}</div><div class="note-body"><div class="note-label">${label}</div><p>${bodyLines.map(inline).join(" ")}</p></div></div>`;
      continue;
    }

    // Heading
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = h[1].length + 1; // h2~h5 (h1은 페이지 타이틀 용)
      html += `<h${level} class="md-h${level}">${inline(h[2])}</h${level}>`;
      i++;
      continue;
    }

    // Table
    if (/^\|.*\|$/.test(line.trim()) && lines[i + 1] && /^\|?\s*-{2,}/.test(lines[i + 1].trim())) {
      const headerCells = line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      i += 2;
      const rows = [];
      while (i < lines.length && /^\|.*\|$/.test(lines[i].trim())) {
        rows.push(lines[i].trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
        i++;
      }
      html += '<div class="md-table-wrap"><table class="md-table"><thead><tr>' +
        headerCells.map((c) => `<th>${inline(c)}</th>`).join("") +
        "</tr></thead><tbody>" +
        rows.map((r) => "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>").join("") +
        "</tbody></table></div>";
      continue;
    }

    // Checklist
    if (/^[-*]\s+\[[ xX]\]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+\[[ xX]\]\s+/.test(lines[i])) {
        const checked = /\[[xX]\]/.test(lines[i]);
        const text = lines[i].replace(/^[-*]\s+\[[ xX]\]\s+/, "");
        items.push({ checked, text });
        i++;
      }
      html += '<ul class="md-checklist">' +
        items.map((it, idx) =>
          `<li class="checklist-item"><label><input type="checkbox" class="checklist-box" ${it.checked ? "checked" : ""} data-idx="${idx}"><span class="checklist-mark"></span><span>${inline(it.text)}</span></label></li>`
        ).join("") + "</ul>";
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      html += "<ol class=\"md-ol\">" + items.map((it) => `<li>${inline(it)}</li>`).join("") + "</ol>";
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      html += "<ul class=\"md-ul\">" + items.map((it) => `<li>${inline(it)}</li>`).join("") + "</ul>";
      continue;
    }

    // Horizontal rule
    if (/^-{3,}$/.test(line.trim())) {
      html += "<hr class=\"md-hr\">";
      i++;
      continue;
    }

    // Paragraph (gather until blank line)
    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== "" &&
           !/^(#{1,4})\s+/.test(lines[i]) &&
           !/^[-*]\s+\[[ xX]\]\s+/.test(lines[i]) &&
           !/^[-*]\s+/.test(lines[i]) &&
           !/^\d+\.\s+/.test(lines[i]) &&
           !/^\|.*\|$/.test(lines[i].trim()) &&
           !/^>\s?[⚠ℹ✅]/.test(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    html += `<p class="md-p">${paraLines.map(inline).join(" ")}</p>`;
  }

  return html;
}

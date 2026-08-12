/**
 * search.js
 * Component 메타데이터 + 각 Section Markdown 원문을 대상으로 하는
 * 클라이언트 사이드 Full-Text 검색 인덱스.
 *
 * 언어가 바뀌면 해당 언어의 Markdown 파일을 다시 읽어 인덱스를 재구축한다.
 */

const SEARCH_SECTIONS = ["overview", "inspection", "setting", "troubleshooting", "specifications"];

let SEARCH_INDEX = [];
let SEARCH_INDEX_LANG = null;
let SEARCH_INDEX_BUILDING = null;

function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/^\|.*\|$/gm, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[>*_#|-]/g, " ")
    .replace(/\[[ xX]\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function buildSearchIndex(lang) {
  if (SEARCH_INDEX_LANG === lang && SEARCH_INDEX.length) return SEARCH_INDEX;
  if (SEARCH_INDEX_BUILDING) return SEARCH_INDEX_BUILDING;

  SEARCH_INDEX_BUILDING = (async () => {
    const components = await loadComponentsList();
    const index = [];

    for (const comp of components) {
      // Component 자체(개요) 엔트리
      index.push({
        componentId: comp.id,
        section: null,
        title: comp.name[lang] || comp.name.ko,
        text: [
          comp.name.ko, comp.name.en,
          comp.model, comp.manufacturer,
          comp.description ? comp.description[lang] : "",
          (comp.keywords || []).join(" ")
        ].filter(Boolean).join(" ").toLowerCase()
      });

      for (const section of SEARCH_SECTIONS) {
        try {
          const md = await loadSectionMarkdown(comp.id, section, lang);
          if (!md) continue;
          index.push({
            componentId: comp.id,
            section,
            title: `${comp.name[lang] || comp.name.ko} · ${t(section)}`,
            text: stripMarkdown(md).toLowerCase(),
            raw: md
          });
        } catch (e) {
          // 파일이 없으면 건너뛴다
        }
      }
    }

    SEARCH_INDEX = index;
    SEARCH_INDEX_LANG = lang;
    SEARCH_INDEX_BUILDING = null;
    return index;
  })();

  return SEARCH_INDEX_BUILDING;
}

function makeSnippet(text, query, radius = 60) {
  const idx = text.indexOf(query);
  if (idx === -1) return text.slice(0, radius * 2) + (text.length > radius * 2 ? "…" : "");
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);
  return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
}

/**
 * 검색을 수행한다.
 * @param {string} query
 * @param {string} lang
 * @returns {Promise<Array>} 결과 배열 (componentId, section, title, snippet 포함)
 */
async function searchAll(query, lang) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const index = await buildSearchIndex(lang);
  const results = [];

  for (const entry of index) {
    if (entry.text.includes(q)) {
      let score = 0;
      if (entry.title.toLowerCase().includes(q)) score += 10;
      if (!entry.section) score += 5; // 컴포넌트 이름/키워드 매치는 가중치를 준다
      score += (entry.text.split(q).length - 1); // 등장 횟수

      results.push({
        componentId: entry.componentId,
        section: entry.section,
        title: entry.title,
        snippet: makeSnippet(entry.text, q),
        score
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

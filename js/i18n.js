/* =========================================================
   i18n.js
   UI 문자열 사전 + 언어 상태 관리.
   Component 본문(마크다운)은 component-loader.js 에서
   {section}.{lang}.md 를 우선 시도하고, 없으면 {section}.md
   로 자동 대체(fallback)합니다. → 향후 한/영 자료를 별도
   파일로 추가하기만 하면 자동 반영됩니다.
   ========================================================= */

const I18N = (() => {
  const LS_LANG = 'fe_lang';
  const DEFAULT_LANG = 'ko';

  const DICT = {
    ko: {
      brand: 'FIELD', brandAccent: 'REF',
      tab_home: '홈', tab_search: '검색', tab_recent: '최근', tab_favorites: '즐겨찾기',
      search_placeholder: '부품명, 모델명, 고장 증상 키워드로 검색…',
      section_components: '부품 목록',
      chip_all: '전체',
      empty_category: '이 카테고리에 등록된 부품이 없습니다.',
      label_updated: '업데이트',
      search_hint: '부품명, 모델명뿐 아니라\n점검 · 세팅 · 고장조치 본문까지 검색됩니다.',
      search_no_result: (q) => `"${q}" 검색 결과가 없습니다`,
      title_favorites: '즐겨찾기',
      empty_favorites: '즐겨찾기한 부품이 없습니다. 부품 목록에서 별표를 눌러 추가하세요.',
      title_recent: '최근 본 항목',
      empty_recent: '열어본 부품이 여기에 표시됩니다.',
      header_component: '부품',
      header_loading: '불러오는 중',
      field_priority: '현장 우선',
      result_normal: '정상',
      result_abnormal: '이상',
      no_documents: '등록된 문서가 없습니다.',
      no_photos: '등록된 사진이 없습니다.',
      no_section_data: '이 항목에 대한 자료가 아직 없습니다.',
      section_overview: '개요',
      section_inspection: '점검',
      section_setting: '세팅',
      section_troubleshooting: '고장조치',
      section_specifications: '사양',
      section_documents: '문서',
      section_photos: '사진',
      cat_Electrical: '전기', cat_Hydraulic: '유압', cat_Mechanical: '기계',
      lang_toggle_label: 'EN'   // 버튼에 표시되는, "누르면 전환될 언어"
    },
    en: {
      brand: 'FIELD', brandAccent: 'REF',
      tab_home: 'Home', tab_search: 'Search', tab_recent: 'Recent', tab_favorites: 'Favorites',
      search_placeholder: 'Search component, model, error keyword…',
      section_components: 'Components',
      chip_all: 'All',
      empty_category: 'No components in this category.',
      label_updated: 'UPDATED',
      search_hint: 'Type to search across all components,\nincluding inspection / setting / troubleshooting content.',
      search_no_result: (q) => `No results for "${q}"`,
      title_favorites: 'Favorites',
      empty_favorites: 'No favorites yet. Tap the star on any component to save it here.',
      title_recent: 'Recently Viewed',
      empty_recent: 'Components you open will appear here.',
      header_component: 'Component',
      header_loading: 'Loading',
      field_priority: 'Field priority',
      result_normal: 'Normal',
      result_abnormal: 'Abnormal',
      no_documents: 'No documents attached for this component yet.',
      no_photos: 'No photos attached for this component yet.',
      no_section_data: 'No data available yet for this section.',
      section_overview: 'Overview',
      section_inspection: 'Inspection',
      section_setting: 'Setting',
      section_troubleshooting: 'Troubleshooting',
      section_specifications: 'Specification',
      section_documents: 'Documents',
      section_photos: 'Photos',
      cat_Electrical: 'Electrical', cat_Hydraulic: 'Hydraulic', cat_Mechanical: 'Mechanical',
      lang_toggle_label: '한글'
    }
  };

  let _lang = localStorage.getItem(LS_LANG) || DEFAULT_LANG;
  const _listeners = [];

  function t(key, ...args) {
    const entry = (DICT[_lang] || DICT[DEFAULT_LANG])[key];
    if (typeof entry === 'function') return entry(...args);
    return entry != null ? entry : key;
  }

  function catLabel(category) {
    return t('cat_' + category) !== ('cat_' + category) ? t('cat_' + category) : category;
  }

  function getLang() { return _lang; }

  function setLang(lang) {
    if (!DICT[lang] || lang === _lang) return;
    _lang = lang;
    localStorage.setItem(LS_LANG, lang);
    document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
    _listeners.forEach(fn => fn(lang));
  }

  function onChange(fn) { _listeners.push(fn); }

  // bilingual field helper: comp.description_en / comp.description_ko 우선,
  // 없으면 기존 단일 필드(comp[field])로 대체
  function field(obj, name) {
    if (!obj) return '';
    const suffixed = obj[`${name}_${_lang}`];
    return suffixed != null ? suffixed : (obj[name] || '');
  }

  document.documentElement.lang = _lang === 'ko' ? 'ko' : 'en';

  return { t, catLabel, getLang, setLang, onChange, field, SECTION_KEYS: {
    overview: 'section_overview', inspection: 'section_inspection', setting: 'section_setting',
    troubleshooting: 'section_troubleshooting', specifications: 'section_specifications',
    documents: 'section_documents', photos: 'section_photos'
  }};
})();

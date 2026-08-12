/**
 * i18n.js
 * UI 문자열 언어 딕셔너리 (Korean / English)
 * Component 기술자료 언어와는 별개로, 화면 UI 텍스트만 관리한다.
 */

const i18n = {
  ko: {
    brand: "TECH FLOWER",
    brandSub: "현장 기술자료",
    searchPlaceholder: "기술자료 검색...",
    componentsTitle: "부품",
    categoryAll: "전체",
    categoryElectrical: "전기",
    categoryHydraulic: "유압",
    categoryMechanical: "기계",
    categorySafety: "안전",
    inspection: "점검",
    setting: "세팅",
    troubleshooting: "고장조치",
    specification: "사양",
    overview: "개요",
    documents: "기술문서",
    photos: "사진",
    recentlyViewed: "최근 본 자료",
    favorites: "즐겨찾기",
    updated: "업데이트",
    back: "뒤로가기",
    warning: "주의",
    safety: "안전",
    navHome: "홈",
    navSearch: "검색",
    navFavorites: "즐겨찾기",
    navRecent: "최근",
    noResults: "검색 결과가 없습니다",
    noFavorites: "즐겨찾기한 자료가 없습니다",
    noRecent: "최근 본 자료가 없습니다",
    noDocuments: "등록된 문서가 없습니다",
    noPhotos: "등록된 사진이 없습니다",
    addFavorite: "즐겨찾기 추가",
    removeFavorite: "즐겨찾기 해제",
    model: "모델",
    manufacturer: "제조사",
    loading: "불러오는 중...",
    loadError: "자료를 불러오지 못했습니다",
    openDocument: "문서 열기",
    resultsCount: "건 검색됨",
    home: "홈",
    searchSectionTitle: "검색 결과",
    quickSections: "빠른 이동",
    normal: "정상",
    abnormal: "비정상"
  },
  en: {
    brand: "TECH FLOWER",
    brandSub: "Field Engineer Technical Data",
    searchPlaceholder: "Search technical information...",
    componentsTitle: "Components",
    categoryAll: "All",
    categoryElectrical: "Electrical",
    categoryHydraulic: "Hydraulic",
    categoryMechanical: "Mechanical",
    categorySafety: "Safety",
    inspection: "Inspection",
    setting: "Setting",
    troubleshooting: "Troubleshooting",
    specification: "Specification",
    overview: "Overview",
    documents: "Documents",
    photos: "Photos",
    recentlyViewed: "Recently Viewed",
    favorites: "Favorites",
    updated: "Updated",
    back: "Back",
    warning: "Warning",
    safety: "Safety",
    navHome: "Home",
    navSearch: "Search",
    navFavorites: "Favorites",
    navRecent: "Recent",
    noResults: "No results found",
    noFavorites: "No favorites yet",
    noRecent: "No recently viewed items",
    noDocuments: "No documents available",
    noPhotos: "No photos available",
    addFavorite: "Add to Favorites",
    removeFavorite: "Remove Favorite",
    model: "Model",
    manufacturer: "Manufacturer",
    loading: "Loading...",
    loadError: "Failed to load data",
    openDocument: "Open Document",
    resultsCount: "results",
    home: "Home",
    searchSectionTitle: "Search Results",
    quickSections: "Quick Sections",
    normal: "Normal",
    abnormal: "Abnormal"
  }
};

const I18N_STORAGE_KEY = "techflower_lang";

function getCurrentLang() {
  return localStorage.getItem(I18N_STORAGE_KEY) || "ko";
}

function setCurrentLang(lang) {
  localStorage.setItem(I18N_STORAGE_KEY, lang);
}

function t(key) {
  const lang = getCurrentLang();
  return (i18n[lang] && i18n[lang][key]) || (i18n.ko[key] || key);
}

/**
 * data-i18n 속성이 있는 모든 요소의 textContent를 현재 언어로 갱신한다.
 * data-i18n-placeholder 속성이 있으면 placeholder도 갱신한다.
 */
function applyI18n(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });
}

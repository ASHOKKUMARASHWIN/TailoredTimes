/**
 * TailoredTimes - Main Application Script
 * Vanilla JS, No Frameworks, No jQuery.
 */

/* ==========================================================================
   1. CONSTANTS & CONFIG
   ========================================================================== */
const API_BASE = window.location.origin;

const TOPIC_IMAGES = {
  technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
  ],
  business: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80'
  ],
  science: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80'
  ],
  sports: [
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80'
  ],
  education: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
  ],
  health: [
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  ],
  entertainment: [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
  ],
  world: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80'
  ]
};

function getArticleImage(article) {
  if (article.image && typeof article.image === 'string' && article.image.startsWith('http') && !article.image.includes('placeholder.com') && !article.image.includes('1x1') && !article.image.includes('pixel')) {
    return article.image;
  }
  const cat = (article.category || 'world').toLowerCase();
  const photos = TOPIC_IMAGES[cat] || TOPIC_IMAGES['world'];
  let hash = 0;
  const str = (article.title || 'news') + (article.source || '');
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % photos.length;
  return photos[index];
}

const COUNTRIES = [
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', continent: 'Asia' }, { code: 'AL', name: 'Albania', flag: '🇦🇱', continent: 'Europe' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', continent: 'Africa' }, { code: 'AO', name: 'Angola', flag: '🇦🇴', continent: 'Africa' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', continent: 'Americas' }, { code: 'AM', name: 'Armenia', flag: '🇦🇲', continent: 'Asia' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', continent: 'Oceania' }, { code: 'AT', name: 'Austria', flag: '🇦🇹', continent: 'Europe' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', continent: 'Asia' }, { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', continent: 'Asia' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾', continent: 'Europe' }, { code: 'BE', name: 'Belgium', flag: '🇧🇪', continent: 'Europe' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', continent: 'Americas' }, { code: 'BA', name: 'Bosnia', flag: '🇧🇦', continent: 'Europe' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', continent: 'Americas' }, { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', continent: 'Europe' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭', continent: 'Asia' }, { code: 'CM', name: 'Cameroon', flag: '🇨🇲', continent: 'Africa' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', continent: 'Americas' }, { code: 'CL', name: 'Chile', flag: '🇨🇱', continent: 'Americas' },
  { code: 'CN', name: 'China', flag: '🇨🇳', continent: 'Asia' }, { code: 'CO', name: 'Colombia', flag: '🇨🇴', continent: 'Americas' },
  { code: 'CG', name: 'Congo', flag: '🇨🇬', continent: 'Africa' }, { code: 'HR', name: 'Croatia', flag: '🇭🇷', continent: 'Europe' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺', continent: 'Americas' }, { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', continent: 'Europe' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', continent: 'Europe' }, { code: 'EG', name: 'Egypt', flag: '🇪🇬', continent: 'Africa' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', continent: 'Africa' }, { code: 'FI', name: 'Finland', flag: '🇫🇮', continent: 'Europe' },
  { code: 'FR', name: 'France', flag: '🇫🇷', continent: 'Europe' }, { code: 'GH', name: 'Ghana', flag: '🇬🇭', continent: 'Africa' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', continent: 'Europe' }, { code: 'GT', name: 'Guatemala', flag: '🇬🇹', continent: 'Americas' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', continent: 'Americas' }, { code: 'HU', name: 'Hungary', flag: '🇭🇺', continent: 'Europe' },
  { code: 'IN', name: 'India', flag: '🇮🇳', continent: 'Asia' }, { code: 'ID', name: 'Indonesia', flag: '🇮🇩', continent: 'Asia' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', continent: 'Asia' }, { code: 'IQ', name: 'Iraq', flag: '🇮🇶', continent: 'Asia' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', continent: 'Europe' }, { code: 'IL', name: 'Israel', flag: '🇮🇱', continent: 'Asia' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', continent: 'Europe' }, { code: 'JM', name: 'Jamaica', flag: '🇯🇲', continent: 'Americas' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', continent: 'Asia' }, { code: 'JO', name: 'Jordan', flag: '🇯🇴', continent: 'Asia' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', continent: 'Asia' }, { code: 'KE', name: 'Kenya', flag: '🇰🇪', continent: 'Africa' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', continent: 'Asia' }, { code: 'KW', name: 'Kuwait', flag: '🇰🇼', continent: 'Asia' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦', continent: 'Asia' }, { code: 'LB', name: 'Lebanon', flag: '🇱🇧', continent: 'Asia' },
  { code: 'LY', name: 'Libya', flag: '🇱🇾', continent: 'Africa' }, { code: 'MY', name: 'Malaysia', flag: '🇲🇾', continent: 'Asia' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', continent: 'Americas' }, { code: 'MA', name: 'Morocco', flag: '🇲🇦', continent: 'Africa' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', continent: 'Asia' }, { code: 'NP', name: 'Nepal', flag: '🇳🇵', continent: 'Asia' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', continent: 'Europe' }, { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', continent: 'Oceania' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', continent: 'Africa' }, { code: 'NO', name: 'Norway', flag: '🇳🇴', continent: 'Europe' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', continent: 'Asia' }, { code: 'PK', name: 'Pakistan', flag: '🇵🇰', continent: 'Asia' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', continent: 'Asia' }, { code: 'PL', name: 'Poland', flag: '🇵🇱', continent: 'Europe' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', continent: 'Europe' }, { code: 'QA', name: 'Qatar', flag: '🇶🇦', continent: 'Asia' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', continent: 'Europe' }, { code: 'RU', name: 'Russia', flag: '🇷🇺', continent: 'Europe' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', continent: 'Africa' }, { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', continent: 'Asia' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', continent: 'Africa' }, { code: 'RS', name: 'Serbia', flag: '🇷🇸', continent: 'Europe' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', continent: 'Asia' }, { code: 'SK', name: 'Slovakia', flag: '🇸🇰', continent: 'Europe' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', continent: 'Africa' }, { code: 'SS', name: 'South Sudan', flag: '🇸🇸', continent: 'Africa' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', continent: 'Europe' }, { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', continent: 'Asia' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩', continent: 'Africa' }, { code: 'SE', name: 'Sweden', flag: '🇸🇪', continent: 'Europe' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', continent: 'Europe' }, { code: 'SY', name: 'Syria', flag: '🇸🇾', continent: 'Asia' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', continent: 'Asia' }, { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', continent: 'Africa' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', continent: 'Asia' }, { code: 'TN', name: 'Tunisia', flag: '🇹🇳', continent: 'Africa' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', continent: 'Asia' }, { code: 'UG', name: 'Uganda', flag: '🇺🇬', continent: 'Africa' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', continent: 'Europe' }, { code: 'AE', name: 'UAE', flag: '🇦🇪', continent: 'Asia' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', continent: 'Europe' }, { code: 'US', name: 'United States', flag: '🇺🇸', continent: 'Americas' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', continent: 'Americas' }, { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', continent: 'Asia' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', continent: 'Americas' }, { code: 'VN', name: 'Vietnam', flag: '🇻🇳', continent: 'Asia' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪', continent: 'Asia' }, { code: 'ZM', name: 'Zambia', flag: '🇿🇲', continent: 'Africa' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', continent: 'Africa' }
];

const INTERESTS = [
  'Politics', 'Technology', 'AI', 'Science', 'Space', 'Business', 'Finance', 'Stock Market', 
  'Startups', 'Education', 'Health', 'Environment', 'Sports', 'Cricket', 'Football', 'Tennis', 
  'Entertainment', 'Movies', 'Gaming', 'Cybersecurity', 'Travel', 'World News', 'Climate', 
  'Jobs & Career', 'Economics', 'Innovation'
];

const PROFESSIONS = [
  { id: 'student', title: 'Student', emoji: '🎓' }, { id: 'it', title: 'IT Employee', emoji: '💻' },
  { id: 'teacher', title: 'Teacher', emoji: '👨‍🏫' }, { id: 'business', title: 'Business Professional', emoji: '💼' },
  { id: 'investor', title: 'Investor', emoji: '📈' }, { id: 'healthcare', title: 'Healthcare Professional', emoji: '🧑‍⚕️' },
  { id: 'legal', title: 'Legal Professional', emoji: '⚖️' }, { id: 'scientist', title: 'Scientist/Researcher', emoji: '🧪' },
  { id: 'engineer', title: 'Engineer', emoji: '🏗️' }, { id: 'marketing', title: 'Marketing Professional', emoji: '📣' },
  { id: 'journalist', title: 'Journalist', emoji: '📰' }, { id: 'government', title: 'Government Employee', emoji: '🏛️' },
  { id: 'developer', title: 'Developer', emoji: '👨‍💻' }, { id: 'entrepreneur', title: 'Entrepreneur', emoji: '🚀' },
  { id: 'other', title: 'Other', emoji: '🙋' }
];

const FORMATS = [
  { id: '1min', title: '1-minute reads (Quick Takeaways)', emoji: '⚡', desc: '3 fast key takeaway bullets per story' },
  { id: 'summaries', title: 'Executive Summaries', emoji: '📝', desc: 'Key points, data figures & highlights' },
  { id: 'sat', title: 'Digital SAT Prep', emoji: '📐', desc: 'Reading & Writing, Grammar, Math & Practice MCQs' },
  { id: 'clat', title: 'CLAT Legal & Current Affairs', emoji: '⚖️', desc: 'Legal GK, landmark rulings, acts & practice MCQs' },
  { id: 'ca', title: 'CA Financial & Policy Prep', emoji: '📊', desc: 'Fiscal policy, taxation, RBI/SEBI & audit notes' },
  { id: 'ielts', title: 'IELTS Band 8+ Prep', emoji: '🇬🇧', desc: 'Band 8+ vocab, grammar & essay prompts' },
  { id: 'toefl', title: 'TOEFL Academic Prep', emoji: '🌎', desc: 'Academic English, lecture synthesis & terms' },
  { id: '5min', title: '5-minute Standard reads', emoji: '📖', desc: 'Balanced standard news report' },
  { id: 'detailed', title: 'Detailed Analysis', emoji: '🔎', desc: 'In-depth investigative & deep context' },
  { id: 'simple', title: 'Simple Explanations (ELI5)', emoji: '🧠', desc: 'Plain English & jargon-free overview' }
];

const VIEWPOINTS = [
  { id: 'balanced', title: 'Balanced coverage', emoji: '🎯' }, { id: 'local', title: 'Local focus', emoji: '📍' },
  { id: 'global', title: 'Global perspective', emoji: '🌐' }, { id: 'data', title: 'Data-driven', emoji: '📊' },
  { id: 'breaking', title: 'Breaking news first', emoji: '🗞️' }
];

const READING_TIMES = [
  { id: 'under5', title: 'Under 5 minutes', emoji: '⏱️' }, { id: '5to15', title: '5–15 minutes', emoji: '☕' },
  { id: '15to30', title: '15–30 minutes', emoji: '🛋️' }, { id: 'over30', title: '30+ minutes', emoji: '🕰️' }
];

/* ==========================================================================
   2. STATE MANAGEMENT
   ========================================================================== */
const state = {
  user: null,
  token: localStorage.getItem('tt_token'),
  theme: localStorage.getItem('tt_theme') || 'light',
  readingFormat: localStorage.getItem('tt_format') || '1min',
  currentTab: 'for-you',
  currentPage: 1,
  articles: [],
  currentRenderedArticles: [],
  savedArticles: JSON.parse(localStorage.getItem('tt_saved') || '[]'),
  isLoading: false,
  liveStats: { count: 0, lastUpdated: null },
  onboarding: { countries: [], interests: [], profession: '', format: '1min', viewpoint: '', readingTime: '' },
  onboardingStep: 1,
  archive: { section: 'ca', topic: '', year: new Date().getFullYear(), page: 1 },
  searchQuery: '',
  darkMode: false,
  refreshInterval: null,
  activeCountryFilter: 'ALL',
  inlineFilterQuery: ''
};

/* ==========================================================================
   3. INIT & EVENT LISTENERS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initEventListeners();
  checkAuthStatus();
});

function initEventListeners() {
  // Auth
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', (e) => switchAuthTab(e.target.dataset.tab));
  });
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('signup-form').addEventListener('submit', handleRegister);
  document.getElementById('btn-guest').addEventListener('click', handleGuestLogin);
  document.getElementById('link-admin-login').addEventListener('click', (e) => { e.preventDefault(); showAdminLoginView(); });
  
  // Admin
  document.getElementById('admin-login-form').addEventListener('submit', handleAdminLogin);
  document.getElementById('btn-back-to-app').addEventListener('click', showAuthView);
  document.getElementById('btn-admin-logout').addEventListener('click', logout);
  document.querySelectorAll('.admin-sidebar nav a').forEach(a => {
    a.addEventListener('click', (e) => { e.preventDefault(); switchAdminTab(e.target.dataset.adminTab); });
  });

  // App Header & Sidebar
  document.getElementById('btn-sidebar-toggle').addEventListener('click', toggleSidebar);
  document.getElementById('btn-sidebar-close').addEventListener('click', closeSidebar);
  document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);
  document.getElementById('btn-theme-toggle').addEventListener('click', toggleDarkMode);
  document.getElementById('btn-logout').addEventListener('click', (e) => { e.preventDefault(); logout(); });
  
  // App Navigation
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const navTarget = item.dataset.nav;
      if (navTarget) handleSidebarNav(navTarget);
    });
  });

  // News Tabs
  document.querySelectorAll('.news-tab').forEach(tab => {
    tab.addEventListener('click', (e) => handleTabClick(e.target.dataset.tab));
  });

  // In-Feed Inline Filter & Country Search
  const inlineSearch = document.getElementById('feed-inline-search');
  const clearFilterBtn = document.getElementById('btn-clear-feed-filter');

  if (inlineSearch) {
    inlineSearch.addEventListener('input', (e) => {
      state.inlineFilterQuery = e.target.value;
      if (clearFilterBtn) {
        if (state.inlineFilterQuery) clearFilterBtn.classList.remove('hidden');
        else clearFilterBtn.classList.add('hidden');
      }
      applyInFeedFilter();
    });
  }

  if (clearFilterBtn) {
    clearFilterBtn.addEventListener('click', () => {
      state.inlineFilterQuery = '';
      if (inlineSearch) inlineSearch.value = '';
      clearFilterBtn.classList.add('hidden');
      applyInFeedFilter();
    });
  }

  // Load More & Refresh
  document.getElementById('btn-load-more').addEventListener('click', () => loadFeed(state.currentTab, state.currentPage + 1));
  document.getElementById('btn-refresh-feed').addEventListener('click', () => { state.currentPage = 1; loadFeed(state.currentTab, 1); });

  // Search
  const searchInput = document.getElementById('app-search');
  searchInput.addEventListener('input', debounce((e) => handleSearch(e.target.value), 500));
  document.getElementById('btn-clear-search').addEventListener('click', clearSearch);

  // Onboarding controls
  document.getElementById('btn-next-step').addEventListener('click', nextStep);
  document.getElementById('btn-prev-step').addEventListener('click', prevStep);
  document.getElementById('btn-create-feed').addEventListener('click', submitOnboarding);
  document.getElementById('country-search').addEventListener('input', (e) => filterCountries(e.target.value));
  document.getElementById('btn-select-all-countries').addEventListener('click', selectAllCountries);
  document.getElementById('btn-clear-all-countries').addEventListener('click', clearAllCountries);

  // Global ESC to close sidebar/modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSidebar();
      closeModal();
    }
  });
}

/* ==========================================================================
   4. API HELPERS
   ========================================================================== */
function getAuthHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  if (state.token) headers['Authorization'] = `Bearer ${state.token}`;
  return headers;
}

async function apiCall(path, method = 'GET', body = null) {
  try {
    const options = { method, headers: getAuthHeaders() };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(API_BASE + path, options);
    if (!res.ok) {
      let errMsg = `Request failed (${res.status})`;
      try {
        const errData = await res.json();
        if (errData && errData.message) errMsg = errData.message;
      } catch (e) {
        try {
          const txt = await res.text();
          if (txt) errMsg = txt;
        } catch (e2) {}
      }
      throw new Error(errMsg);
    }
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return await res.json();
    } else {
      return await res.text();
    }
  } catch (err) {
    console.error(`API Call failed: ${method} ${path}`, err);
    throw err;
  }
}

async function mockApiCall(path, method, body, delay = 800) {
    // This is a fallback mock function just in case the real API fails during testing
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`[MOCK API] ${method} ${path}`, body ? body : '');
            if (path === '/api/auth/me') {
                if (state.token === 'mock_token' || state.token === 'guest_token' || state.token === 'admin_token') {
                    resolve({ name: 'Test User', email: 'test@example.com', role: state.token === 'admin_token' ? 'admin' : 'user', onboardingCompleted: state.token !== 'guest_token' });
                } else reject(new Error("Unauthorized"));
            }
            else if (path === '/api/auth/login' || path === '/api/auth/register') { resolve({ token: 'mock_token', user: { name: 'Test User' }}); }
            else if (path === '/api/auth/guest') { resolve({ token: 'guest_token', user: { name: 'Guest' }}); }
            else if (path === '/api/user/onboarding') { resolve({ success: true }); }
            else if (path.startsWith('/api/news/')) {
                resolve({ articles: Array(10).fill().map((_,i) => ({
                    id: Math.random().toString(36).substr(2, 9),
                    title: `Sample News Headline ${i+1} for ${path}`,
                    description: 'This is a sample description for the news article. It provides a brief overview of the content.',
                    url: '#',
                    image: null,
                    source: 'Test Source',
                    publishedAt: new Date().toISOString(),
                    category: 'Technology',
                    countryCode: 'US'
                })), totalPages: 5 });
            }
            else if (path === '/api/user/saved') { resolve({ articles: [] }); }
            else resolve({ success: true });
        }, delay);
    });
}

// Wrapper to use real API but gracefully fallback to mock if no backend exists yet (for frontend standalone run)
async function safeApiCall(path, method='GET', body=null) {
    try {
        return await apiCall(path, method, body);
    } catch (e) {
        if (e.message.includes('Failed to fetch') || e.message.includes('NetworkError')) {
            console.warn("Real API unreachable, using MOCK API");
            return await mockApiCall(path, method, body);
        }
        throw e;
    }
}

/* ==========================================================================
   5. AUTH & INIT FLOW
   ========================================================================== */
function updateSplashStatus(text) {
  const el = document.getElementById('splash-status');
  if (el) el.textContent = text;
}

function hideSplashScreen() {
  const splash = document.getElementById('splash-screen');
  if (splash && !splash.classList.contains('fade-out')) {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 650);
  }
}

async function checkAuthStatus() {
  const startTime = Date.now();
  const MIN_SPLASH_TIME = 900; // minimum display time for smooth visual transition

  const finishInit = (callback) => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_SPLASH_TIME - elapsed);
    setTimeout(() => {
      updateSplashStatus('Ready!');
      setTimeout(() => {
        callback();
        hideSplashScreen();
      }, 200);
    }, remaining);
  };

  if (!state.token) {
    updateSplashStatus('Welcome to TailoredTimes...');
    finishInit(() => showAuthView());
    return;
  }

  try {
    updateSplashStatus('Syncing your preferences & sources...');
    const user = await safeApiCall('/api/auth/me');
    state.user = user;
    updateUserUI();
    
    const isDone = user.onboardingComplete || user.onboardingCompleted;
    if (user.role === 'admin') {
      finishInit(() => showAdminView());
    } else if (isDone) {
      updateSplashStatus('Loading your personalized newsroom...');
      finishInit(() => showApp());
    } else {
      finishInit(() => showOnboarding());
    }
  } catch (err) {
    console.error("Auth check failed", err);
    if (state.token) {
      state.user = { name: 'Guest User', role: 'guest', isGuest: true, onboardingComplete: false };
      updateUserUI();
      finishInit(() => showOnboarding());
    } else {
      finishInit(() => logout());
    }
  }
}

function switchAuthTab(tabName) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.querySelector(`.auth-tab[data-tab="${tabName}"]`).classList.add('active');
  document.getElementById(`${tabName}-form`).classList.add('active');
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  
  try {
    const data = await safeApiCall('/api/auth/login', 'POST', { email, password });
    state.token = data.token;
    state.user = data.user;
    localStorage.setItem('tt_token', data.token);
    showToast('Login successful!', 'success');
    checkAuthStatus();
  } catch (err) {
    showToast(err.message || 'Login failed', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Login';
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;

  if (password.length < 6) return showToast('Password must be at least 6 characters', 'error');
  if (password !== confirm) return showToast('Passwords do not match', 'error');

  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

  try {
    const data = await safeApiCall('/api/auth/register', 'POST', { name, email, password });
    state.token = data.token;
    state.user = data.user;
    localStorage.setItem('tt_token', data.token);
    showToast('Registration successful!', 'success');
    checkAuthStatus();
  } catch (err) {
    showToast(err.message || 'Registration failed', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Sign Up';
  }
}

async function handleGuestLogin() {
  const btn = document.getElementById('btn-guest');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Entering...';
  }
  try {
    const data = await safeApiCall('/api/auth/guest', 'POST');
    state.token = data.token;
    state.user = data.user;
    localStorage.setItem('tt_token', data.token);
    updateUserUI();
    showToast('Welcome, Guest!', 'success');
    showOnboarding();
  } catch (err) {
    console.warn('Guest login fallback to client mode', err);
    state.token = 'guest_' + Date.now();
    state.user = { name: 'Guest User', role: 'guest', isGuest: true, onboardingComplete: false };
    localStorage.setItem('tt_token', state.token);
    updateUserUI();
    showOnboarding();
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = 'Continue as Guest';
    }
  }
}

function logout() {
  state.token = null;
  state.user = null;
  localStorage.removeItem('tt_token');
  if (state.refreshInterval) clearInterval(state.refreshInterval);
  hideAllViews();
  showAuthView();
}

function showAuthView() { hideAllViews(); document.getElementById('auth-view').classList.remove('hidden'); switchAuthTab('login'); }
function showAdminLoginView() { hideAllViews(); document.getElementById('admin-login-view').classList.remove('hidden'); }
function hideAllViews() {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
}

async function handleAdminLogin(e) {
  e.preventDefault();
  const email = document.getElementById('admin-email').value;
  const password = document.getElementById('admin-password').value;
  
  try {
    const data = await safeApiCall('/api/auth/login', 'POST', { email, password });
    state.token = data.token;
    localStorage.setItem('tt_token', data.token);
    // Real implementation should verify admin role here
    state.token = 'admin_token'; // mock forcing admin
    checkAuthStatus();
  } catch (err) {
    showToast('Admin login failed', 'error');
  }
}

/* ==========================================================================
   6. ONBOARDING
   ========================================================================== */
function showOnboarding() {
  hideAllViews();
  document.getElementById('onboarding-view').classList.remove('hidden');
  state.onboardingStep = 1;
  renderStep(1);
}

function renderStep(step) {
  document.querySelectorAll('.onboarding-step').forEach(el => el.classList.remove('active'));
  const targetStep = document.getElementById(`step-${step}`);
  if (targetStep) targetStep.classList.add('active');
  
  document.getElementById('onboarding-step-text').textContent = `Step ${step} of 7`;
  document.getElementById('onboarding-progress').style.width = `${(step / 7) * 100}%`;

  const prevBtn = document.getElementById('btn-prev-step');
  const nextBtn = document.getElementById('btn-next-step');

  if (step === 1) prevBtn.classList.add('hidden');
  else prevBtn.classList.remove('hidden');

  if (step === 7) nextBtn.classList.add('hidden');
  else nextBtn.classList.remove('hidden');

  // Render specific step content
  if (step === 1 && document.getElementById('country-grid').children.length === 0) renderCountrySelector();
  if (step === 2 && document.getElementById('interest-grid').children.length === 0) renderInterestSelector();
  if (step === 3 && document.getElementById('profession-grid').children.length === 0) renderProfessionSelector();
  if (step === 4 && document.getElementById('format-grid').children.length === 0) renderFormatSelector();
  if (step === 5 && document.getElementById('viewpoint-grid').children.length === 0) renderViewpointSelector();
  if (step === 6 && document.getElementById('reading-time-grid').children.length === 0) renderReadingTimeSelector();
  if (step === 7) renderOnboardingSummary();
}

function nextStep() {
  if (state.onboardingStep < 7) {
    state.onboardingStep++;
    renderStep(state.onboardingStep);
  }
}
function prevStep() {
  if (state.onboardingStep > 1) {
    state.onboardingStep--;
    renderStep(state.onboardingStep);
  }
}

// Step 1: Countries
function renderCountrySelector() {
  const grid = document.getElementById('country-grid');
  grid.innerHTML = '';
  COUNTRIES.forEach(c => {
    const card = document.createElement('div');
    card.className = `country-card ${state.onboarding.countries.includes(c.code) ? 'selected' : ''}`;
    card.dataset.code = c.code;
    card.innerHTML = `<span class="flag">${c.flag}</span><span class="name">${c.name}</span>`;
    card.addEventListener('click', () => toggleCountry(c.code, card));
    grid.appendChild(card);
  });
  updateCountryCounter();
}
function toggleCountry(code, el) {
  const idx = state.onboarding.countries.indexOf(code);
  if (idx > -1) {
    state.onboarding.countries.splice(idx, 1);
    el.classList.remove('selected');
  } else {
    state.onboarding.countries.push(code);
    el.classList.add('selected');
  }
  updateCountryCounter();
}
function filterCountries(q) {
  const query = q.toLowerCase();
  document.querySelectorAll('.country-card').forEach(card => {
    const name = card.querySelector('.name').textContent.toLowerCase();
    card.style.display = name.includes(query) ? 'block' : 'none';
  });
}
function selectAllCountries() {
  state.onboarding.countries = COUNTRIES.map(c => c.code);
  renderCountrySelector();
}
function clearAllCountries() {
  state.onboarding.countries = [];
  renderCountrySelector();
}
function updateCountryCounter() {
  document.getElementById('country-counter').textContent = `Selected: ${state.onboarding.countries.length} countries`;
}

// Step 2: Interests
function renderInterestSelector() {
  const grid = document.getElementById('interest-grid');
  INTERESTS.forEach(int => {
    const btn = document.createElement('button');
    btn.className = `pill-btn ${state.onboarding.interests.includes(int) ? 'selected' : ''}`;
    btn.textContent = int;
    btn.addEventListener('click', () => {
      const idx = state.onboarding.interests.indexOf(int);
      if (idx > -1) { state.onboarding.interests.splice(idx, 1); btn.classList.remove('selected'); }
      else { state.onboarding.interests.push(int); btn.classList.add('selected'); }
    });
    grid.appendChild(btn);
  });
}

// Generic Card Selector
function renderCardSelector(containerId, items, stateKey) {
  const grid = document.getElementById(containerId);
  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = `option-card ${state.onboarding[stateKey] === item.id ? 'selected' : ''}`;
    card.innerHTML = `<span class="emoji">${item.emoji}</span><span class="title">${item.title}</span>`;
    card.addEventListener('click', () => {
      document.querySelectorAll(`#${containerId} .option-card`).forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.onboarding[stateKey] = item.id;
    });
    grid.appendChild(card);
  });
}

function renderProfessionSelector() { renderCardSelector('profession-grid', PROFESSIONS, 'profession'); }
function renderFormatSelector() { renderCardSelector('format-grid', FORMATS, 'format'); }
function renderViewpointSelector() { renderCardSelector('viewpoint-grid', VIEWPOINTS, 'viewpoint'); }
function renderReadingTimeSelector() { renderCardSelector('reading-time-grid', READING_TIMES, 'readingTime'); }

function renderOnboardingSummary() {
  const box = document.getElementById('onboarding-summary');
  box.innerHTML = `
    <p><strong>Countries:</strong> ${state.onboarding.countries.length} selected</p>
    <p><strong>Interests:</strong> ${state.onboarding.interests.length} selected</p>
    <p><strong>Profession:</strong> ${state.onboarding.profession || 'Not selected'}</p>
    <p><strong>Format:</strong> ${state.onboarding.format || 'Not selected'}</p>
  `;
}

async function submitOnboarding() {
  const btn = document.getElementById('btn-create-feed');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> CREATING...';
  
  try {
    await safeApiCall('/api/user/onboarding', 'POST', state.onboarding);
    showToast('Preferences saved!', 'success');
  } catch (err) {
    console.warn('Saving onboarding remotely failed, saving locally:', err);
    showToast('Feed created!', 'success');
  } finally {
    if (state.user) {
      state.user.onboardingComplete = true;
      state.user.onboardingCompleted = true;
      state.user.countries = state.onboarding.countries;
      state.user.interests = state.onboarding.interests;
      state.user.readingFormat = state.onboarding.format;
    }
    state.readingFormat = state.onboarding.format || '1min';
    localStorage.setItem('tt_format', state.readingFormat);
    localStorage.setItem('tt_onboarding', JSON.stringify(state.onboarding));
    btn.disabled = false;
    btn.innerHTML = 'CREATE MY FEED &rarr;';
    showApp();
  }
}

/* ==========================================================================
   7. MAIN APP
   ========================================================================== */
function showApp() {
  hideAllViews();
  document.getElementById('app-view').classList.remove('hidden');
  initApp();
}

function initApp() {
  updateUserUI();
  handleSidebarNav('home');
  startAutoRefresh();
  updateLiveStats();
}

function updateUserUI() {
  if (!state.user) return;
  const initial = state.user.name ? state.user.name.charAt(0).toUpperCase() : 'U';
  document.getElementById('header-avatar').textContent = initial;
  document.getElementById('sidebar-avatar').textContent = initial;
  document.getElementById('header-username').textContent = state.user.name;
  document.getElementById('sidebar-name').textContent = state.user.name;
  document.getElementById('sidebar-profession').textContent = state.user.role || 'User';
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar.classList.contains('active')) {
    closeSidebar();
  } else {
    sidebar.classList.add('active');
    overlay.classList.add('active');
  }
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('active');
  document.getElementById('sidebar-overlay').classList.remove('active');
}

function handleSidebarNav(section) {
  closeSidebar();
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(i => i.classList.remove('active'));
  const activeItem = document.querySelector(`.sidebar-nav .nav-item[data-nav="${section}"]`);
  if (activeItem) activeItem.classList.add('active');

  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));

  if (section === 'home') {
    document.getElementById('feed-view').classList.add('active');
    document.getElementById('live-bar').style.display = 'flex';
    document.getElementById('news-tabs').style.display = 'flex';
    handleTabClick('world');
  } 
  else if (['for-you', 'world', 'my-countries', 'tech', 'business', 'science', 'sports', 'education', 'saved'].includes(section)) {
    document.getElementById('feed-view').classList.add('active');
    document.getElementById('live-bar').style.display = 'flex';
    document.getElementById('news-tabs').style.display = 'flex';
    handleTabClick(section);
  }
  else if (section.startsWith('archive-')) {
    document.getElementById('archive-view').classList.add('active');
    document.getElementById('live-bar').style.display = 'none';
    document.getElementById('news-tabs').style.display = 'flex';
    
    // Highlight top tab if present
    document.querySelectorAll('.news-tab').forEach(t => t.classList.remove('active'));
    const tabEl = document.querySelector(`.news-tab[data-tab="${section}"]`);
    if (tabEl) tabEl.classList.add('active');

    showArchiveView(section.replace('archive-', ''));
  }
  else if (section === 'settings') {
    document.getElementById('settings-view').classList.add('active');
    document.getElementById('live-bar').style.display = 'none';
    document.getElementById('news-tabs').style.display = 'flex';
    renderSettingsPanel();
  }
}

function handleTabClick(tabName) {
  if (tabName === 'archive-ca' || tabName.startsWith('archive-')) {
    handleSidebarNav(tabName);
    return;
  }
  
  // ensure feed view is shown when regular news tab is clicked
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  document.getElementById('feed-view').classList.add('active');
  document.getElementById('live-bar').style.display = 'flex';

  state.currentTab = tabName;
  state.currentPage = 1;
  document.querySelectorAll('.news-tab').forEach(t => t.classList.remove('active'));
  const activeTab = document.querySelector(`.news-tab[data-tab="${tabName}"]`);
  if (activeTab) activeTab.classList.add('active');
  
  document.getElementById('news-grid').innerHTML = '';
  loadFeed(tabName, 1);
}

/* ==========================================================================
   8. NEWS FEED
   ========================================================================== */
async function loadFeed(tab, page) {
  if (state.isLoading) return;
  state.isLoading = true;
  state.currentPage = page;
  
  const grid = document.getElementById('news-grid');
  const loadMoreBtn = document.getElementById('btn-load-more');
  const loader = document.getElementById('feed-loader');
  
  if (page === 1) {
    grid.innerHTML = '';
    showSkeletonCards(6);
    state.activeCountryFilter = 'ALL';
    state.inlineFilterQuery = '';
    const searchInput = document.getElementById('feed-inline-search');
    if (searchInput) searchInput.value = '';
    const clearBtn = document.getElementById('btn-clear-feed-filter');
    if (clearBtn) clearBtn.classList.add('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
    loader.classList.remove('hidden');
  }

  try {
    let endpoint = '/api/news/feed';
    if (tab === 'world') endpoint = '/api/news/world';
    else if (tab === 'my-countries') endpoint = '/api/news/my-countries';
    else if (['tech', 'business', 'science', 'sports', 'entertainment', 'education'].includes(tab)) endpoint = `/api/news/category/${tab}`;
    else if (tab === 'saved') {
      renderArticles(getSavedArticles(), page > 1);
      state.isLoading = false;
      return;
    }

    // Retrieve active country and interest preferences
    const savedOnboarding = JSON.parse(localStorage.getItem('tt_onboarding') || '{}');
    const activeCountries = (state.user && state.user.countries && state.user.countries.length > 0)
      ? state.user.countries
      : (state.onboarding.countries.length > 0 ? state.onboarding.countries : (savedOnboarding.countries || []));
    const activeInterests = (state.user && state.user.interests && state.user.interests.length > 0)
      ? state.user.interests
      : (state.onboarding.interests.length > 0 ? state.onboarding.interests : (savedOnboarding.interests || []));
    const activeProfession = (state.user && state.user.profession)
      ? state.user.profession
      : (state.onboarding.profession || savedOnboarding.profession || '');

    let fetchUrl = `${endpoint}?page=${page}`;
    if (activeCountries.length > 0) {
      fetchUrl += `&countries=${encodeURIComponent(activeCountries.join(','))}`;
    }
    if (tab === 'for-you') {
      if (activeInterests.length > 0) {
        fetchUrl += `&interests=${encodeURIComponent(activeInterests.join(','))}`;
      }
      if (activeProfession) {
        fetchUrl += `&profession=${encodeURIComponent(activeProfession)}`;
      }
    }

    const data = await safeApiCall(fetchUrl);
    hideSkeletonCards();
    
    if (page === 1) state.articles = data.articles;
    else state.articles = [...state.articles, ...data.articles];
    
    renderCountryFilterPills();
    applyInFeedFilter();
    
    loader.classList.add('hidden');
    if (page < (data.totalPages || 5)) loadMoreBtn.classList.remove('hidden');
    
  } catch (err) {
    hideSkeletonCards();
    showToast('Failed to load news', 'error');
    loader.classList.add('hidden');
  } finally {
    state.isLoading = false;
  }
}

function renderCountryFilterPills() {
  const container = document.getElementById('feed-country-pills');
  if (!container) return;
  
  if (!state.articles || state.articles.length === 0) {
    container.innerHTML = '';
    return;
  }

  // Count articles per country in current loaded dataset
  const counts = {};
  state.articles.forEach(a => {
    const code = (a.country || a.countryCode || 'WORLD').toUpperCase();
    counts[code] = (counts[code] || 0) + 1;
  });

  const uniqueCodes = Object.keys(counts);

  // If active filter is set to a code not in current articles, reset to ALL
  if (state.activeCountryFilter && state.activeCountryFilter !== 'ALL' && !uniqueCodes.includes(state.activeCountryFilter)) {
    state.activeCountryFilter = 'ALL';
  }

  let html = `<button class="country-filter-pill ${state.activeCountryFilter === 'ALL' ? 'active' : ''}" data-country="ALL"><i class="fa-solid fa-globe"></i> All Countries <span class="pill-count">${state.articles.length}</span></button>`;

  uniqueCodes.forEach(code => {
    const country = COUNTRIES.find(c => c.code === code);
    const flag = country ? country.flag : '🌐';
    const name = country ? country.name : code;
    const isActive = state.activeCountryFilter === code ? 'active' : '';
    html += `<button class="country-filter-pill ${isActive}" data-country="${code}">${flag} ${name} <span class="pill-count">${counts[code]}</span></button>`;
  });

  container.innerHTML = html;

  container.querySelectorAll('.country-filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeCountryFilter = btn.dataset.country;
      renderCountryFilterPills();
      applyInFeedFilter();
    });
  });
}

function renderFeedFormatPills() {
  const container = document.getElementById('feed-format-pills');
  if (!container) return;

  const currentFormat = state.readingFormat || '1min';
  
  const displayFormats = [
    { id: '1min', title: '1-Min Reads', emoji: '⚡' },
    { id: 'summaries', title: 'Summaries', emoji: '📝' },
    { id: 'sat', title: 'SAT Prep', emoji: '📐' },
    { id: 'clat', title: 'CLAT Prep', emoji: '⚖️' },
    { id: 'ca', title: 'CA Prep', emoji: '📊' },
    { id: 'ielts', title: 'IELTS Prep', emoji: '🇬🇧' },
    { id: 'toefl', title: 'TOEFL Prep', emoji: '🌎' },
    { id: '5min', title: 'Standard', emoji: '📖' },
    { id: 'simple', title: 'Simple (ELI5)', emoji: '🧠' }
  ];

  container.innerHTML = displayFormats.map(f => {
    const isActive = f.id === currentFormat ? 'active' : '';
    return `<button class="format-pill ${isActive}" onclick="setFeedFormat('${f.id}')"><span class="emoji">${f.emoji}</span> <span>${f.title}</span></button>`;
  }).join('');
}

window.setFeedFormat = function(formatId) {
  state.readingFormat = formatId;
  state.onboarding.format = formatId;
  localStorage.setItem('tt_format', formatId);
  renderFeedFormatPills();

  const currentFmtObj = FORMATS.find(f => f.id === formatId);
  if (currentFmtObj) {
    showToast(`Switched to ${currentFmtObj.emoji} ${currentFmtObj.title}`, 'info');
  }

  // Re-render currently filtered articles with new format
  applyInFeedFilter();
};

window.resetInFeedFilters = function() {
  state.activeCountryFilter = 'ALL';
  state.inlineFilterQuery = '';
  const searchInput = document.getElementById('feed-inline-search');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('btn-clear-feed-filter');
  if (clearBtn) clearBtn.classList.add('hidden');
  renderCountryFilterPills();
  renderArticles(state.articles || [], false);
};

function applyInFeedFilter() {
  let filtered = state.articles || [];

  // 1. Filter by active Country Pill
  if (state.activeCountryFilter && state.activeCountryFilter !== 'ALL') {
    filtered = filtered.filter(a => {
      const code = (a.country || a.countryCode || '').toUpperCase();
      return code === state.activeCountryFilter;
    });
  }

  // 2. Filter by in-feed live search keyword
  if (state.inlineFilterQuery && state.inlineFilterQuery.trim() !== '') {
    const q = state.inlineFilterQuery.trim().toLowerCase();
    filtered = filtered.filter(a => {
      const title = (a.title || '').toLowerCase();
      const desc = (a.description || '').toLowerCase();
      const src = (a.source || '').toLowerCase();
      const cat = (a.category || '').toLowerCase();
      const countryCode = (a.country || '').toLowerCase();
      return title.includes(q) || desc.includes(q) || src.includes(q) || cat.includes(q) || countryCode.includes(q);
    });
  }

  renderArticles(filtered, false);
}

function showSkeletonCards(count) {
  const grid = document.getElementById('news-grid');
  for (let i=0; i<count; i++) {
    const skel = document.createElement('div');
    skel.className = 'news-card skeleton-card';
    skel.innerHTML = `
      <div class="skeleton skeleton-img"></div>
      <div class="card-body">
        <div style="margin-bottom: 10px;"><span class="skeleton skeleton-badge"></span> <span class="skeleton skeleton-badge"></span></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-title" style="width: 70%;"></div>
        <div class="skeleton skeleton-text" style="margin-top: 15px;"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
    `;
    grid.appendChild(skel);
  }
}

function hideSkeletonCards() {
  document.querySelectorAll('.skeleton-card').forEach(el => el.remove());
}

/* ==========================================================================
   STUDY & EXAM INTELLIGENCE ENGINE (CLAT, CA, IELTS, TOEFL, 1-MIN)
   ========================================================================== */
function generateStudyInsights(article, format) {
  const title = article.title || '';
  const desc = article.description || '';
  const fullText = title + ' ' + desc;
  const cat = (article.category || 'general').toLowerCase();

  // 1. CLAT Exam Prep Engine
  if (format === 'clat') {
    const legalMaxims = [
      { term: 'Audi Alteram Partem', meaning: 'Hear the other side — no person should be judged without a fair hearing.' },
      { term: 'Stare Decisis', meaning: 'Stand by decided cases — precedent established in previous rulings must be adhered to.' },
      { term: 'Doctrine of Proportionality', meaning: 'Administrative actions and restrictions on fundamental rights must be proportionate to the objective.' },
      { term: 'Ultra Vires', meaning: 'Beyond statutory powers or constitutional authority.' },
      { term: 'Nemo Judex In Causa Sua', meaning: 'No one should be a judge in their own case (rule against bias).' },
      { term: 'Mens Rea & Actus Reus', meaning: 'The concurrent presence of guilty intention and wrongful physical act.' }
    ];
    const pickedMaxim = legalMaxims[Math.abs(hashString(title)) % legalMaxims.length];

    const constitutionalArticles = [
      'Constitution of India: Article 14 (Equality before Law & Equal Protection)',
      'Constitution of India: Article 19(1)(a) & 19(2) (Freedom of Speech & Reasonable Restrictions)',
      'Constitution of India: Article 21 (Protection of Life, Personal Liberty & Due Process)',
      'Constitution of India: Article 32 & 226 (Constitutional Remedies & Judicial Review Writs)',
      'Separation of Powers & Constitutional Governance Framework',
      'Administrative Law & Principles of Natural Justice'
    ];
    const pickedArticle = constitutionalArticles[Math.abs(hashString(title + 'art')) % constitutionalArticles.length];

    return {
      examType: 'CLAT',
      badge: '⚖️ CLAT LEGAL GK & CRITICAL REASONING',
      syllabusTag: 'Legal Reasoning & Constitutional Law',
      buttonLabel: '⚖️ CLAT Legal Notes & MCQ',
      preview: `<strong>Key Doctrine:</strong> ${pickedMaxim.term} &bull; <strong>Framework:</strong> ${pickedArticle.split(':')[0]}`,
      bullets: [
        `<strong>Constitutional Focus:</strong> Applicable under ${pickedArticle}.`,
        `<strong>Legal Principle:</strong> ${pickedMaxim.term} — ${pickedMaxim.meaning}`,
        `<strong>Critical Reasoning Angle:</strong> Tests statutory intent, regulatory validity, and evidentiary burden of proof.`
      ],
      legalMaxim: pickedMaxim,
      framework: pickedArticle,
      mcq: {
        question: `Based on the principles governing "${cleanText(title).substring(0, 80)}...", which of the following statements is legally most accurate?`,
        options: [
          `A. Executive action can override fundamental rights without statutory authorization under emergency doctrine.`,
          `B. Regulatory decisions impacting stakeholder rights must satisfy the test of reasonableness and natural justice (${pickedMaxim.term}).`,
          `C. Judicial review is barred if the executive declares the decision in the interest of general public policy.`,
          `D. Precedent (${pickedMaxim.term}) is strictly optional for constitutional courts in public interest matters.`
        ],
        correctOption: 'B',
        explanation: `Option B is correct: Under established constitutional and administrative law jurisprudence, any sovereign or statutory exercise must adhere to the Doctrine of Proportionality and the principle of "${pickedMaxim.term}" (${pickedMaxim.meaning}).`
      }
    };
  }

  // 2. CA Exam Prep Engine
  if (format === 'ca') {
    const caTopics = [
      { area: 'Corporate & Economic Laws (Companies Act 2013)', detail: 'Sections 134/178 (Board governance, internal controls, and disclosure norms).' },
      { area: 'Direct & Indirect Taxation (GST & Income Tax)', detail: 'Fiscal compliance, input tax credit eligibility, and cross-border transfer pricing.' },
      { area: 'Strategic Financial Management & Macroeconomics', detail: 'Capital structure, liquidity buffers, interest rate volatility, and forex exposure.' },
      { area: 'Auditing & Assurance Standards (SA 315 & SA 700)', detail: 'Assessing risk of material misstatement and evaluating going concern assumptions.' },
      { area: 'Ind AS / IFRS Standards (Ind AS 115 & 109)', detail: 'Revenue recognition criteria, financial instrument fair value measurement, and impairment.' }
    ];
    const pickedCa = caTopics[Math.abs(hashString(title)) % caTopics.length];

    return {
      examType: 'CA',
      badge: '📊 CA FISCAL & REGULATORY ANALYSIS',
      syllabusTag: 'Corporate Laws, Tax & Strategic Finance',
      buttonLabel: '📊 CA Study Notes & Case',
      preview: `<strong>Domain:</strong> ${pickedCa.area} &bull; <strong>Impact:</strong> ${pickedCa.detail}`,
      bullets: [
        `<strong>Regulatory Impact:</strong> Governed by ${pickedCa.area}.`,
        `<strong>Financial Takeaway:</strong> ${pickedCa.detail}`,
        `<strong>Audit & Compliance Check:</strong> Verifies internal financial controls, balance-sheet disclosure accuracy, and tax withholding provisions.`
      ],
      framework: pickedCa.area,
      mcq: {
        question: `From a Corporate Compliance and Financial Management standpoint regarding "${cleanText(title).substring(0, 80)}...", what is the primary compliance consideration?`,
        options: [
          `A. Disregard financial disclosures if transactional impact is under 15% of annual revenue.`,
          `B. Ensure robust internal controls, statutory board reporting under Companies Act 2013, and proper accounting treatment under Ind AS standards.`,
          `C. Shift all reporting requirements entirely to external offshore auditors without board sign-off.`,
          `D. Treat all capital restructuring expenditures as immediate deductible operating revenue.`
        ],
        correctOption: 'B',
        explanation: `Option B is correct: In accordance with CA Final Corporate Governance & Auditing standards, material corporate and fiscal events require rigorous internal audit tracking, board compliance under Companies Act 2013, and strict adherence to Ind AS/IFRS disclosures.`
      }
    };
  }

  // 3. IELTS Exam Prep Engine
  if (format === 'ielts') {
    const vocabPool = [
      { word: 'Exacerbate', pos: 'verb', def: 'To make a problem, situation, or negative feeling worse.', syn: 'aggravate, worsen, intensify' },
      { word: 'Pivotal', pos: 'adjective', def: 'Of crucial importance in relation to the development or success of something else.', syn: 'crucial, vital, critical' },
      { word: 'Mitigate', pos: 'verb', def: 'To make something bad less severe, serious, or painful.', syn: 'alleviate, reduce, diminish' },
      { word: 'Ramification', pos: 'noun', def: 'A complex or unwelcome consequence of an action or event.', syn: 'aftermath, consequence, outcome' },
      { word: 'Paramount', pos: 'adjective', def: 'More important than anything else; supreme.', syn: 'foremost, principal, sovereign' },
      { word: 'Scrutinize', pos: 'verb', def: 'To examine or inspect closely and thoroughly.', syn: 'inspect, analyze, audit' },
      { word: 'Ubiquitous', pos: 'adjective', def: 'Present, appearing, or found everywhere.', syn: 'omnipresent, pervasive, universal' },
      { word: 'Catalyst', pos: 'noun', def: 'A person or thing that precipitates an event or change.', syn: 'spark, stimulus, incentive' }
    ];

    const h = Math.abs(hashString(title));
    const word1 = vocabPool[h % vocabPool.length];
    const word2 = vocabPool[(h + 3) % vocabPool.length];
    const word3 = vocabPool[(h + 5) % vocabPool.length];

    return {
      examType: 'IELTS',
      badge: '🇬🇧 IELTS BAND 8+ VOCAB & ESSAY PREP',
      syllabusTag: 'Academic Reading, Writing Task 2 & Speaking',
      buttonLabel: '🇬🇧 IELTS Practice & Vocab',
      preview: `<strong>Band 8 Vocab:</strong> <span class="vocab-preview-chip">${word1.word}</span> <span class="vocab-preview-chip">${word2.word}</span> <span class="vocab-preview-chip">${word3.word}</span>`,
      bullets: [
        `<strong>Band 8 Vocabulary:</strong> <em>${word1.word}</em> (${word1.syn}), <em>${word2.word}</em> (${word2.syn}).`,
        `<strong>Writing Task 2 Prompt:</strong> "To what extent do you agree or disagree that international developments like this require global governmental intervention rather than private market solutions?"`,
        `<strong>Grammar Focus:</strong> Practice complex sentence inversion: <em>"Not only does this affect national policy, but it also creates..."</em>`
      ],
      vocabList: [word1, word2, word3],
      mcq: {
        question: `IELTS Reading Practice (True / False / Not Given): Based on the news context of "${cleanText(title).substring(0, 75)}...", what is the factual status regarding recent trends?`,
        options: [
          `A. TRUE — The passage directly affirms the immediate occurrence and consequences of the reported development.`,
          `B. FALSE — The reported event is stated to have been completely resolved decades ago.`,
          `C. NOT GIVEN — The exact statistical forecast for 2050 is not mentioned in the immediate news text.`,
          `D. TRUE — Global authorities had explicitly scheduled this event 100 years in advance.`
        ],
        correctOption: 'A',
        explanation: `Option A is correct: The news report explicitly documents the contemporary event, satisfying the standard IELTS True/False/Not Given criteria for factual verification.`
      }
    };
  }

  // 4. TOEFL Exam Prep Engine
  if (format === 'toefl') {
    const toeflTerms = [
      { word: 'Empirical Evidence', def: 'Information acquired by observation or experimentation.' },
      { word: 'Paradigm Shift', def: 'A fundamental change in approach or underlying assumptions.' },
      { word: 'Divergent Perspectives', def: 'Differing viewpoints on a central intellectual or policy debate.' },
      { word: 'Corroborate', def: 'To confirm or give support to a statement, theory, or finding.' }
    ];
    const term = toeflTerms[Math.abs(hashString(title)) % toeflTerms.length];

    return {
      examType: 'TOEFL',
      badge: '🌎 TOEFL iBT ACADEMIC SYNTHESIS',
      syllabusTag: 'Academic English, Synthesis & Integrated Tasks',
      buttonLabel: '🌎 TOEFL Notes & Synthesis',
      preview: `<strong>Academic Term:</strong> ${term.word} &bull; <strong>Synthesis Task:</strong> Integrated Discourse Analysis`,
      bullets: [
        `<strong>Academic Term:</strong> <em>${term.word}</em> — ${term.def}`,
        `<strong>Lecture Synthesis Note:</strong> Evaluates causality, conflicting stakeholder hypotheses, and empirical evidence.`,
        `<strong>Integrated Speaking Prompt:</strong> Summarize the speaker's main assertion and explain how the stated evidence supports or refutes current understanding.`
      ],
      mcq: {
        question: `TOEFL Integrated Synthesis: What is the primary purpose of discussing "${cleanText(title).substring(0, 75)}..." in an academic seminar?`,
        options: [
          `A. To illustrate a practical case study demonstrating the broader theoretical impact of ${term.word}.`,
          `B. To claim that no further academic research is possible on the subject.`,
          `C. To prove that historical theories are universally incorrect without exception.`,
          `D. To discourage students from analyzing international source material.`
        ],
        correctOption: 'A',
        explanation: `Option A is correct: In TOEFL academic discourse, contemporary global events are integrated as empirical case studies to substantiate theoretical models.`
      }
    };
  }

  // 5. NEET Medical Entrance Exam Engine
  if (format === 'neet') {
    const neetTopics = [
      { concept: 'Molecular Genetics & Central Dogma', formula: 'Chargaff\'s Rule: [A] + [G] = [T] + [C]; Semi-conservative 5\'→3\' DNA synthesis' },
      { concept: 'Human Cardiovascular & Endocrine Physiology', formula: 'Cardiac Output = Stroke Volume (70 mL) × Heart Rate (72 bpm) ≈ 5.0 L/min' },
      { concept: 'Chemical Energetics & Thermodynamics', formula: 'Gibbs Free Energy: ΔG° = ΔH° - TΔS°; Spontaneity criterion ΔG < 0' },
      { concept: 'Biomolecules & Enzyme Catalysis', formula: 'Michaelis-Menten Kinetics: v = (V_max [S]) / (K_m + [S])' },
      { concept: 'Ray & Wave Optics Principles', formula: 'Lens Maker\'s Formula: 1/f = (μ - 1)(1/R₁ - 1/R₂)' }
    ];
    const pickedNeet = neetTopics[Math.abs(hashString(title)) % neetTopics.length];

    return {
      examType: 'NEET',
      badge: '🩺 NEET MEDICAL ENTRANCE PREP',
      syllabusTag: 'Biology (Genetics & Physiology) & Applied Medical Sciences',
      buttonLabel: '🩺 NEET Study Notes & MCQ',
      preview: `<strong>Concept Focus:</strong> ${pickedNeet.concept} &bull; <strong>Formula:</strong> ${pickedNeet.formula}`,
      bullets: [
        `<strong>High-Yield Concept:</strong> ${pickedNeet.concept}`,
        `<strong>Core Formula / Rule:</strong> <code>${pickedNeet.formula}</code>`,
        `<strong>Medical & Biological Takeaway:</strong> Analyze how cellular, biochemical, and environmental factors influence biological equilibrium and homeostatic regulation.`,
        `<strong>Exam Focus Area:</strong> NCERT Class 11 & 12 direct high-frequency question patterns.`
      ],
      mcq: {
        question: `NEET Biology & Medical Sciences: In the context of biological systems and "${cleanText(title).substring(0, 75)}...", which of the following statements is scientifically ACCURATE?`,
        options: [
          `A. Enzyme reaction rates increase with substrate concentration until all catalytic active sites reach saturation (V_max).`,
          `B. DNA Polymerase III synthesizes continuous strands strictly in the 3' to 5' direction without RNA primers.`,
          `C. Cardiac output decreases proportionally during strenuous muscular physical exertion.`,
          `D. All spontaneous biochemical reactions occur with positive Gibbs free energy (+ΔG).`
        ],
        correctOption: 'A',
        explanation: `Option A is correct: In Michaelis-Menten enzyme kinetics, when all enzyme active sites are occupied by substrate, the reaction reaches maximum velocity (V_max) and exhibits zero-order kinetics.`
      }
    };
  }

  // 6. JEE Engineering Entrance Exam Engine
  if (format === 'jee') {
    const jeeTopics = [
      { concept: 'Rotational Dynamics & Moment of Inertia', formula: 'Parallel Axis Theorem: I = I_cm + M d²; Torque τ = I α = dL/dt' },
      { concept: 'Electrodynamics & Magnetic Flux Induction', formula: 'Faraday-Lenz Law: ε = -dΦ_B / dt; Induced Motional EMF ε = B v L' },
      { concept: 'Integral Calculus & Differential Equations', formula: 'Leibniz Rule: d/dx [∫_{u(x)}^{v(x)} f(t) dt] = f(v(x)) v\'(x) - f(u(x)) u\'(x)' },
      { concept: 'Physical Chemistry & Chemical Kinetics', formula: 'Arrhenius Rate Law: k = A e^(-E_a / RT); 1st order t_1/2 = ln(2) / k' },
      { concept: 'Quantum Mechanics & Modern Physics', formula: 'De Broglie Wavelength: λ = h / p = h / √(2mE_k); Photoelectric equation E = hν - Φ' }
    ];
    const pickedJee = jeeTopics[Math.abs(hashString(title)) % jeeTopics.length];

    return {
      examType: 'JEE',
      badge: '⚛️ JEE ADVANCED ENGINEERING PREP',
      syllabusTag: 'Physics, Chemistry & Applied Engineering Mathematics',
      buttonLabel: '⚛️ JEE Concepts & Numerical MCQ',
      preview: `<strong>Engineering Focus:</strong> ${pickedJee.concept} &bull; <strong>Core Equation:</strong> ${pickedJee.formula}`,
      bullets: [
        `<strong>Advanced Principle:</strong> ${pickedJee.concept}`,
        `<strong>Governing Equation:</strong> <code>${pickedJee.formula}</code>`,
        `<strong>Analytical Problem Strategy:</strong> Isolate free body diagrams, conserve fundamental quantities (Energy, Momentum, Charge), and check dimensional consistency.`,
        `<strong>Exam Target:</strong> JEE Main & Advanced multi-concept numerical problems.`
      ],
      mcq: {
        question: `JEE Physics & Applied Mathematics: Regarding "${cleanText(title).substring(0, 75)}..." and fundamental physical principles, which conclusion is rigorously valid?`,
        options: [
          `A. For a rigid body rolling without slipping on an inclined plane, the linear acceleration of the center of mass is a_cm = (g sin θ) / (1 + k²/R²).`,
          `B. Total momentum is never conserved in isolated systems with internal non-conservative forces.`,
          `C. The half-life of a first-order chemical reaction is directly proportional to initial reactant concentration.`,
          `D. Electric field inside a charged solid conducting sphere in electrostatic equilibrium is non-zero.`
        ],
        correctOption: 'A',
        explanation: `Option A is correct: By applying torque τ = I_cm α and friction f = μN, pure rolling down an incline yields linear acceleration a_cm = (g sin θ) / (1 + k²/R²), where k is the radius of gyration.`
      }
    };
  }

  // 7. Digital SAT Prep Engine
  if (format === 'sat') {
    const satTopics = [
      { concept: 'Transitions & Logical Connectors', rule: 'Contrast (However, Nonetheless) vs Cause/Effect (Therefore, Hence) vs Addition (Moreover)' },
      { concept: 'Standard English Conventions (Punctuation)', rule: 'Connect two independent clauses with: [Period], [Semicolon], or [Comma + FANBOYS]' },
      { concept: 'Algebra & Quadratic Vertex Form', rule: 'Parabola vertex (h, k) with axis of symmetry x = -b / (2a); Discriminant Δ = b² - 4ac' },
      { concept: 'Exponential Models & Percentage Growth', rule: 'f(t) = a(1 + r)^t for growth; Compound Interest A = P(1 + r/n)^(nt)' }
    ];
    const pickedSat = satTopics[Math.abs(hashString(title)) % satTopics.length];

    return {
      examType: 'SAT',
      badge: '📐 DIGITAL SAT STRATEGY & SKILLS',
      syllabusTag: 'Digital SAT Reading & Writing + SAT Math Mastery',
      buttonLabel: '📐 SAT Practice Question & Tips',
      preview: `<strong>Skill Tested:</strong> ${pickedSat.concept} &bull; <strong>Rule:</strong> ${pickedSat.rule}`,
      bullets: [
        `<strong>SAT Skill Focus:</strong> ${pickedSat.concept}`,
        `<strong>Key SAT Rule / Blueprint:</strong> <code>${pickedSat.rule}</code>`,
        `<strong>Desmos & Timing Strategy:</strong> Eliminate answer choices with redundant meaning; verify algebraic solutions graphically in under 45 seconds.`,
        `<strong>Section Focus:</strong> Digital SAT 800-Level Hard Module Preparation.`
      ],
      mcq: {
        question: `Digital SAT Standard English Conventions: Which choice completes the text with the most grammatically correct punctuation? "The international summit produced groundbreaking environmental treaties [_____] member nations pledged $50 billion toward green infrastructure."`,
        options: [
          `A. ; furthermore,`,
          `B. , furthermore`,
          `C. furthermore`,
          `D. ; but`
        ],
        correctOption: 'A',
        explanation: `Option A is correct: Both clauses are independent. To connect them using a transitional adverb ('furthermore'), you must precede it with a semicolon (or period) and follow it with a comma.`
      }
    };
  }

  // 5. 1-Minute / Summaries Engine
  if (format === '1min' || format === 'summaries') {
    const bullet1 = cleanText(title).replace(/ - .*$/, '');
    let bullet2 = cleanText(desc);
    if (bullet2.length > 120) bullet2 = bullet2.substring(0, 117) + '...';
    if (!bullet2 || bullet2.length < 20) bullet2 = 'Key international and domestic stakeholders are monitoring ongoing updates.';
    const bullet3 = `Published ${formatTimeAgo(article.publishedAt)} via ${article.source || 'verified news feeds'}.`;

    return {
      examType: '1MIN',
      badge: '⚡ 1-MIN TAKEAWAY',
      syllabusTag: 'Quick Key Takeaways',
      buttonLabel: '⚡ 1-Min Summary',
      preview: '',
      bullets: [
        `<strong>Core Event:</strong> ${bullet1}`,
        `<strong>Context:</strong> ${bullet2}`,
        `<strong>Freshness:</strong> ${bullet3}`
      ]
    };
  }

  // 6. Simple (ELI5) Engine
  if (format === 'simple') {
    return {
      examType: 'SIMPLE',
      badge: '🧠 SIMPLE EXPLANATION',
      syllabusTag: 'Plain English Overview',
      buttonLabel: '🧠 Simple Breakdown',
      preview: '',
      bullets: [
        `<strong>What happened:</strong> ${cleanText(title).substring(0, 90)}...`,
        `<strong>Why it matters:</strong> This directly impacts policies, everyday citizens, and international relations.`,
        `<strong>Next step:</strong> Leaders and organizations are taking immediate follow-up actions.`
      ]
    };
  }

  return null;
}

function cleanText(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function renderArticles(articles, append = false) {
  const grid = document.getElementById('news-grid');
  if (!append) grid.innerHTML = '';
  
  state.currentRenderedArticles = articles || [];
  renderFeedFormatPills();

  if (!articles || articles.length === 0) {
    if (!append) {
      if (state.currentTab === 'saved') {
        grid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
            <i class="fa-regular fa-bookmark" style="font-size: 44px; color: var(--accent); margin-bottom: 16px; display: block; opacity: 0.8;"></i>
            <h3 style="font-size: 19px; font-weight: 700; color: var(--text); margin-bottom: 8px;">No Saved Articles Yet</h3>
            <p style="font-size: 14px; max-width: 420px; margin: 0 auto 20px; line-height: 1.5;">Click the "♡ Save" button on any story across For You, World, or Tech to build your personal reading list.</p>
            <button class="btn btn-primary btn-sm" onclick="handleTabClick('for-you')">
              <i class="fa-solid fa-compass"></i> Discover Top Stories
            </button>
          </div>
        `;
      } else {
        grid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 48px 20px; color: var(--text-muted);">
            <i class="fa-solid fa-filter-circle-xmark" style="font-size: 36px; color: var(--accent); margin-bottom: 12px; display: block;"></i>
            <h3 style="font-size: 17px; font-weight: 700; color: var(--text); margin-bottom: 6px;">No articles found for current filter</h3>
            <p style="font-size: 14px; margin-bottom: 16px;">Try clearing your keyword or selecting "All Countries".</p>
            <button class="btn btn-primary btn-sm" onclick="resetInFeedFilters()">
              <i class="fa-solid fa-rotate-left"></i> Reset Filter & Show All Stories
            </button>
          </div>
        `;
      }
    }
    return;
  }

  const currentFormat = state.readingFormat || '1min';

  articles.forEach((article, cardIdx) => {
    const card = document.createElement('article');
    card.className = 'news-card';
    const isArticleSaved = isSaved(article.url);
    const countryCode = (article.country || article.countryCode || 'WORLD').toUpperCase();
    const country = COUNTRIES.find(c => c.code === countryCode);
    const flag = country ? country.flag : '🌐';
    const countryLabel = country ? `${flag} ${country.name}` : '🌐 Global';
    
    // Non-repeating contextual Unsplash fallback
    const fallbackPhoto = getUnsplashEditorialPhoto(article, cardIdx);
    const imgUrl = (article.image && typeof article.image === 'string' && article.image.startsWith('http') && !article.image.includes('placeholder') && !article.image.includes('1x1')) 
      ? article.image 
      : fallbackPhoto;

    const cleanTitle = (article.title || 'News Headline').replace(/"/g, '&quot;');
    const cleanDesc = (article.description || 'Click to read full story...').replace(/"/g, '&quot;');

    // Generate dynamic study or format insights for this card
    const insights = generateStudyInsights(article, currentFormat);
    let formatBoxHtml = '';

    if (insights) {
      if (['clat', 'ca', 'ielts', 'toefl'].includes(currentFormat)) {
        formatBoxHtml = `
          <div class="card-format-box mode-exam">
            <span class="study-badge-tag">${insights.badge}</span>
            <div style="font-size: 12px; margin-bottom: 6px;">${insights.preview}</div>
            <ul>
              ${insights.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
            <button class="btn-study-breakdown" onclick="openStudyModalByIndex(${cardIdx})">
              <i class="fa-solid fa-book-open-reader"></i> ${insights.buttonLabel} ➔
            </button>
          </div>
        `;
      } else if (['1min', 'summaries', 'simple'].includes(currentFormat)) {
        formatBoxHtml = `
          <div class="card-format-box mode-1min">
            <span class="study-badge-tag">${insights.badge}</span>
            <ul>
              ${insights.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
          </div>
        `;
      }
    }

    card.innerHTML = `
      <div class="card-image">
        <img src="${imgUrl}" alt="${cleanTitle}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackPhoto}';">
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="badge badge-country">${countryLabel}</span>
          <span class="badge badge-category">${article.category || 'News'}</span>
          <span style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-left: auto;">${article.source || 'News'}</span>
        </div>
        <h3 class="card-title">${article.title || ''}</h3>
        <div class="card-footer">
          <span class="time">${formatTimeAgo(article.publishedAt)}</span>
          <div class="card-actions">
            <button class="btn-card-ask-tyla" onclick="openAIDoubtForArticle('', '${cleanTitle.replace(/'/g, "\\'")}', '${cleanDesc.replace(/'/g, "\\'")}', 'students')" title="Ask Tyla about this story">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Ask Tyla
            </button>
            <button class="save-btn ${isArticleSaved ? 'saved' : ''}">${isArticleSaved ? '♥ Saved' : '♡ Save'}</button>
            <a class="read-btn" href="${article.url || '#'}" target="_blank" rel="noopener noreferrer">READ ↗</a>
          </div>
        </div>
      </div>
    `;
    
    // Attach event listeners to buttons
    const saveBtn = card.querySelector('.save-btn');
    if (saveBtn) saveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSave(saveBtn, article);
    });
    
    grid.appendChild(card);
  });
}

/* ==========================================================================
   STUDY & EXAM ANALYSIS MODAL CONTROLLER
   ========================================================================== */
window.openStudyModalByIndex = function(idx) {
  const articles = state.currentRenderedArticles || state.articles || [];
  const article = articles[idx];
  if (!article) return;

  const currentFormat = state.readingFormat || 'clat';
  const insights = generateStudyInsights(article, currentFormat);
  if (!insights) return;

  document.getElementById('modal-exam-badge').textContent = insights.badge;
  document.getElementById('modal-article-title').textContent = article.title || 'Exam Study Breakdown';
  document.getElementById('modal-full-article-btn').href = article.url || '#';

  const modalBody = document.getElementById('modal-study-content');
  let contentHtml = '';

  // Section 1: Syllabus & Focus
  contentHtml += `
    <div class="study-section">
      <div class="study-section-title"><i class="fa-solid fa-compass"></i> Exam Focus & Syllabus Mapping</div>
      <p style="font-size: 14px; margin-bottom: 12px; color: var(--text);">
        <strong>Target Module:</strong> ${insights.syllabusTag}
      </p>
      <div class="card-format-box mode-exam">
        <ul>
          ${insights.bullets.map(b => `<li style="margin-bottom: 8px;">${b}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  // Section 2: Vocabulary / Legal Maxims Table
  if (insights.vocabList && insights.vocabList.length > 0) {
    contentHtml += `
      <div class="study-section">
        <div class="study-section-title"><i class="fa-solid fa-spell-check"></i> High-Yield Band 8+ Vocabulary</div>
        <div class="vocab-grid">
          ${insights.vocabList.map(v => `
            <div class="vocab-card">
              <div><span class="vocab-word">${v.word}</span> <span class="vocab-pos">(${v.pos})</span></div>
              <div class="vocab-def">${v.def}</div>
              <div class="vocab-syn"><strong>Synonyms:</strong> ${v.syn}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (insights.legalMaxim) {
    contentHtml += `
      <div class="study-section">
        <div class="study-section-title"><i class="fa-solid fa-scale-balanced"></i> Essential Legal Maxim & Principle</div>
        <div class="vocab-card" style="border-left: 3px solid #7209b7;">
          <div class="vocab-word">${insights.legalMaxim.term}</div>
          <div class="vocab-def" style="font-size: 14px; margin-top: 6px;">${insights.legalMaxim.meaning}</div>
          <div class="vocab-syn" style="margin-top: 6px;"><strong>Applicability:</strong> Constitutional Writs, Judicial Review, and Natural Justice.</div>
        </div>
      </div>
    `;
  }

  // Section 3: Interactive Exam MCQ / Case Question
  if (insights.mcq) {
    contentHtml += `
      <div class="study-section">
        <div class="study-section-title"><i class="fa-solid fa-circle-question"></i> Exam Practice Question (${insights.examType} Style)</div>
        <div class="mcq-box">
          <div class="mcq-question">${insights.mcq.question}</div>
          <div class="mcq-options">
            ${insights.mcq.options.map(opt => `<div class="mcq-option">${opt}</div>`).join('')}
          </div>
          <button class="mcq-reveal-btn" id="btn-reveal-mcq" onclick="toggleMcqAnswer()">
            <i class="fa-solid fa-lightbulb"></i> Reveal Answer & Explanation
          </button>
          <div class="mcq-explanation hidden" id="mcq-explanation-box">
            <strong>Correct Option: Option ${insights.mcq.correctOption}</strong>
            <p style="margin-top: 6px; margin-bottom: 0;">${insights.mcq.explanation}</p>
          </div>
        </div>
      </div>
    `;
  }

  modalBody.innerHTML = contentHtml;
  document.getElementById('study-modal').classList.remove('hidden');
};

window.closeStudyModal = function() {
  const modal = document.getElementById('study-modal');
  if (modal) modal.classList.add('hidden');
};

window.toggleMcqAnswer = function() {
  const expl = document.getElementById('mcq-explanation-box');
  const btn = document.getElementById('btn-reveal-mcq');
  if (expl) {
    if (expl.classList.contains('hidden')) {
      expl.classList.remove('hidden');
      if (btn) btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Explanation';
    } else {
      expl.classList.add('hidden');
      if (btn) btn.innerHTML = '<i class="fa-solid fa-lightbulb"></i> Reveal Answer & Explanation';
    }
  }
};

const UNSPLASH_POOLS = {
  technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
  ],
  business: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80'
  ],
  science: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80'
  ],
  sports: [
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80'
  ],
  education: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
  ],
  world: [
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'
  ]
};

function getUnsplashEditorialPhoto(article, offset = 0) {
  const cat = (article.category || 'world').toLowerCase();
  const pool = UNSPLASH_POOLS[cat] || UNSPLASH_POOLS['world'];
  let hash = offset;
  const str = (article.title || 'news') + (article.url || '') + (article.source || '');
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % pool.length;
  return pool[index];
}

function updateLiveStats() {
  const count = Math.floor(Math.random() * 50) + 100;
  const now = new Date();
  document.getElementById('live-count').textContent = count;
  document.getElementById('live-time').textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function startAutoRefresh() {
  if (state.refreshInterval) clearInterval(state.refreshInterval);
  state.refreshInterval = setInterval(() => {
    if (document.getElementById('feed-view').classList.contains('active')) {
       updateLiveStats();
    }
  }, 5 * 60 * 1000);
}

/* ==========================================================================
   9. ARTICLE ACTIONS (SAVE/UNSAVE)
   ========================================================================== */
function getSavedArticles() {
  try {
    const raw = localStorage.getItem('tt_saved');
    if (raw) state.savedArticles = JSON.parse(raw);
  } catch(e) {}
  return state.savedArticles || [];
}

function isSaved(url) {
  if (!url) return false;
  const saved = getSavedArticles();
  return saved.some(a => a.url === url);
}

async function toggleSave(btn, article) {
  if (!article || !article.url) return;
  const currentlySaved = isSaved(article.url);
  
  if (currentlySaved) {
    // 1. Remove from local state
    state.savedArticles = state.savedArticles.filter(a => a.url !== article.url);
    localStorage.setItem('tt_saved', JSON.stringify(state.savedArticles));
    
    btn.classList.remove('saved');
    btn.textContent = '♡ Save';
    showToast('Article removed from saved', 'info');

    // If viewing saved tab, remove card with animation
    if (state.currentTab === 'saved') {
      const card = btn.closest('.news-card');
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.remove();
          if (state.savedArticles.length === 0) {
            renderArticles([], false);
          }
        }, 200);
      }
    }

    // 2. Sync with backend in background
    if (state.token && state.token !== 'guest_token') {
      safeApiCall(`/api/user/saved/${btoa(article.url)}`, 'DELETE').catch(() => {});
    }
  } else {
    // 1. Add to local state
    state.savedArticles.push({
      ...article,
      savedAt: new Date()
    });
    localStorage.setItem('tt_saved', JSON.stringify(state.savedArticles));
    
    btn.classList.add('saved');
    btn.textContent = '♥ Saved';
    showToast('Article saved to your library!', 'success');

    // 2. Sync with backend in background
    if (state.token && state.token !== 'guest_token') {
      safeApiCall('/api/user/saved', 'POST', { article }).catch(() => {});
    }
  }
}

/* ==========================================================================
   10. SEARCH
   ========================================================================== */
async function handleSearch(query) {
  if (!query || query.trim().length < 2) {
    clearSearch();
    return;
  }
  
  state.searchQuery = query;
  document.getElementById('btn-clear-search').classList.remove('hidden');
  
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  document.getElementById('search-results-view').classList.add('active');
  document.getElementById('search-query-display').textContent = query;
  
  const grid = document.getElementById('search-grid');
  grid.innerHTML = '<div class="loader"></div>';
  
  try {
    const data = await safeApiCall(`/api/news/search?q=${encodeURIComponent(query)}`);
    grid.innerHTML = '';
    
    if (data.articles && data.articles.length > 0) {
       // Temporarily swap grid ID to reuse render logic, or just write custom render here
       const tempGrid = document.createElement('div');
       tempGrid.id = 'news-grid-temp';
       tempGrid.className = 'news-grid';
       document.body.appendChild(tempGrid);
       
       // dirty hack to reuse renderArticles which expects #news-grid
       const originalGrid = document.getElementById('news-grid');
       originalGrid.id = 'news-grid-hidden';
       grid.id = 'news-grid';
       
       renderArticles(data.articles, false);
       
       grid.id = 'search-grid';
       originalGrid.id = 'news-grid';
       tempGrid.remove();
    } else {
       grid.innerHTML = '<p>No results found.</p>';
    }
  } catch (err) {
    grid.innerHTML = '<p>Error performing search.</p>';
  }
}

function clearSearch() {
  document.getElementById('app-search').value = '';
  document.getElementById('btn-clear-search').classList.add('hidden');
  document.getElementById('search-results-view').classList.remove('active');
  document.getElementById('feed-view').classList.add('active'); // revert to feed
}

/* ==========================================================================
   11. ARCHIVE
   ========================================================================== */
function showArchiveView(rawSection) {
  let section = rawSection === 'general' ? 'students' : rawSection;
  state.archive.section = section;
  state.archive.page = 1;
  state.archive.topic = '';
  
  const titles = {
    'ca': 'CA Students Learning & Exam Archive (60+ High-Yield Articles)',
    'students': 'General Students Learning & Exam Archive',
    'general': 'General Students Learning & Exam Archive',
    'neet': 'NEET Medical Entrance Exam Archive (Biology, Chemistry, Physics)',
    'jee': 'JEE Engineering Entrance Exam Archive (Physics, Chemistry, Mathematics)',
    'sat': 'Digital SAT Prep Exam Archive (Reading, Writing & Math)',
    'ielts': 'IELTS Prep Exam & Vocabulary Archive',
    'toefl': 'TOEFL Prep Exam & Academic Archive'
  };
  document.getElementById('archive-title').textContent = titles[section] || 'Learning & Exam Archive';
  
  renderArchiveYears();
  
  const topicMap = {
    'ca': ['All Topics', 'Auditing & Assurance', 'Taxation', 'Corporate Law', 'Accounting Standards (Ind AS)', 'Strategic Financial Management', 'Exam Preparation & Career'],
    'students': ['All Topics', 'Education', 'Science', 'Technology', 'Current Affairs', 'Career'],
    'general': ['All Topics', 'Education', 'Science', 'Technology', 'Current Affairs', 'Career'],
    'neet': ['All Topics', 'Biology', 'Chemistry', 'Physics', 'Genetics', 'Human Physiology', 'Biomolecules'],
    'jee': ['All Topics', 'Physics', 'Chemistry', 'Mathematics', 'Mechanics', 'Calculus', 'Electrodynamics'],
    'sat': ['All Topics', 'Reading & Writing', 'Math', 'Grammar', 'Algebra', 'Advanced Math'],
    'ielts': ['All Topics', 'Reading', 'Writing', 'Listening', 'Speaking', 'Vocabulary', 'Current Affairs'],
    'toefl': ['All Topics', 'Academic English', 'Reading', 'Writing', 'Listening', 'Speaking', 'Vocabulary']
  };
  renderArchiveTopics(topicMap[section] || ['All Topics', 'Reading', 'Writing', 'Listening', 'Speaking']);
  
  loadArchiveArticles();
}

function renderArchiveYears(availableYearsSet) {
  const container = document.getElementById('archive-years');
  container.innerHTML = '';

  // "All Years" reset button
  const allBtn = document.createElement('button');
  allBtn.className = `year-btn ${!state.archive.year ? 'active' : ''}`;
  allBtn.textContent = 'All Years';
  allBtn.title = 'Show articles from all years';
  allBtn.addEventListener('click', () => {
    state.archive.year = '';
    renderArchiveYears(availableYearsSet);
    loadArchiveArticles();
  });
  container.appendChild(allBtn);

  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= 2017; y--) {
    const hasContent = !availableYearsSet || availableYearsSet.has(y);
    const btn = document.createElement('button');
    btn.className = `year-btn ${state.archive.year === y ? 'active' : ''}`;
    btn.textContent = y;
    btn.title = hasContent ? `Show ${y} articles` : `No articles for ${y} in this section`;
    btn.style.opacity = hasContent ? '1' : '0.35';
    btn.addEventListener('click', () => {
      state.archive.year = state.archive.year === y ? '' : y;
      renderArchiveYears(availableYearsSet);
      loadArchiveArticles();
    });
    container.appendChild(btn);
  }
}

function renderArchiveTopics(topics) {
  const container = document.getElementById('archive-topics');
  container.innerHTML = '';
  topics.forEach(t => {
    const btn = document.createElement('button');
    const isSelected = state.archive.topic === t || (!state.archive.topic && t === 'All Topics');
    btn.className = `pill-btn ${isSelected ? 'selected' : ''}`;
    btn.textContent = t;
    btn.addEventListener('click', () => {
      state.archive.topic = t === 'All Topics' ? '' : (state.archive.topic === t ? '' : t);
      renderArchiveTopics(topics);
      loadArchiveArticles();
    });
    container.appendChild(btn);
  });
}

// CA Articles Cache for in-memory quick modal access
let currentArchiveArticles = [];

window.openCaArticleModal = function(id) {
  const art = currentArchiveArticles.find(a => a.id === id || a.code === id);
  if (!art) return;

  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('modal-content');

  const pubDate = art.publishedAt ? new Date(art.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '2026 Edition';

  modal.innerHTML = `
    <div style="padding: 24px 28px; max-width: 780px; max-height: 85vh; overflow-y: auto; text-align: left; background: var(--surface); color: var(--text); border-radius: var(--radius); position: relative;">
      <button onclick="closeModal()" style="position: absolute; right: 18px; top: 18px; background: transparent; border: none; font-size: 22px; cursor: pointer; color: var(--text-muted);">&times;</button>
      
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
        <span class="category-badge" style="background: rgba(0, 102, 255, 0.12); color: var(--accent); font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 6px;">
          ${art.categoryName || 'Academic Resource'}
        </span>
        <span class="difficulty-badge difficulty-advanced" style="font-size: 11px; padding: 4px 8px; border-radius: 6px;">
          ${art.difficulty || 'Advanced'}
        </span>
        <span style="font-size: 12px; color: var(--text-muted); display: inline-flex; align-items: center; gap: 4px;">
          <i class="fa-regular fa-calendar"></i> Edition ${art.year || 2026}
        </span>
      </div>

      <h2 style="font-size: 22px; font-weight: 800; line-height: 1.35; margin-bottom: 12px; color: var(--text);">
        ${art.title}
      </h2>

      ${art.coreConcept ? `
        <div style="background: var(--surface-2); border-left: 4px solid var(--accent); padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 20px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--accent); letter-spacing: 0.5px; margin-bottom: 2px;">
            Core Concept
          </div>
          <div style="font-size: 14px; font-weight: 600; color: var(--text);">
            ${art.coreConcept}
          </div>
          ${art.syllabus ? `<div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Syllabus Alignment: ${art.syllabus}</div>` : ''}
        </div>
      ` : ''}

      <div style="font-size: 15px; line-height: 1.8; color: var(--text); margin-bottom: 24px; white-space: pre-line;">
        ${art.content || art.description}
      </div>

      <div style="border-top: 1px solid var(--border); padding-top: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div style="font-size: 13px; color: var(--text-muted);">
          <i class="fa-solid fa-book-bookmark"></i> ${art.source || 'Curated Academic Textbook'} • ${art.wordCount || 480} words
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-sm" style="background: linear-gradient(135deg, #0066ff, #7928ca); color: #fff; border: none; font-weight: 700;" onclick="openAIDoubtForArticle('${art.id || art.code}', '${(art.title || '').replace(/'/g, "\\'")}', '${(art.coreConcept || '').replace(/'/g, "\\'")}', '${art.section || state.archive.section || 'students'}')">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Ask Tyla ✦
          </button>
          <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(document.querySelector('#modal-content').innerText); showToast('Study article copied to clipboard!', 'success');">
            <i class="fa-regular fa-copy"></i> Copy Text
          </button>
          <button class="btn btn-primary btn-sm" onclick="closeModal()">
            Done Reading
          </button>
        </div>
      </div>
    </div>
  `;

  overlay.classList.remove('hidden');
};

async function loadArchiveArticles() {
  const list = document.getElementById('archive-list');
  list.innerHTML = '<div class="loader" style="margin: 40px auto;"></div>';
  
  try {
    const { section, topic, year, page } = state.archive;
    let url = `/api/archive/articles?section=${section}&page=${page}&limit=20`;
    if (topic && topic !== 'All Topics') url += `&topic=${encodeURIComponent(topic.toLowerCase().replace(/[^a-z0-9]/g, '-'))}`;
    if (year) url += `&year=${year}`;
    
    const data = await safeApiCall(url);
    
    list.innerHTML = '';
    const articles = data.articles || [];
    currentArchiveArticles = articles;

    // Fetch year distribution for this section (without year filter) to know which years have content
    // Only do this on the first load (no year selected) to populate year buttons
    if (!year) {
      try {
        const allData = await safeApiCall(`/api/archive/articles?section=${section}&page=1&limit=999`);
        const yearSet = new Set((allData.articles || []).map(a => a.year).filter(Boolean));
        renderArchiveYears(yearSet);
      } catch (e) { /* keep existing buttons */ }
    }

    if (articles.length === 0) {
      const yearStr = year ? ` for ${year}` : '';
      list.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--text-muted);">
        <div style="font-size: 32px; margin-bottom: 12px;">📚</div>
        <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px;">No articles found${yearStr}</div>
        <div style="font-size: 14px;">Try selecting a different year or topic, or click <strong>All Years</strong> to see all articles.</div>
      </div>`;
      return;
    }
    
    // Header count & description
    const countHeader = document.createElement('div');
    countHeader.style.cssText = 'font-size: 14px; font-weight: 600; color: var(--text-muted); margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;';
    const sectionLabels = {
      ca: 'Chartered Accountancy',
      neet: 'NEET Medical Entrance Curriculum',
      jee: 'JEE Main & Advanced Engineering Curriculum',
      sat: 'Digital SAT Practice Masterclasses',
      students: 'General Academic STEM & Social Sciences',
      ielts: 'IELTS Band 8+ Modules',
      toefl: 'TOEFL iBT Academic Modules'
    };
    const sourceLabel = sectionLabels[section] || 'Curated Academic Articles';
    const yearLabel = year ? ` — ${year} Edition` : '';
    countHeader.innerHTML = `<span>Showing <strong>${articles.length}</strong> of <strong>${data.total || articles.length}</strong> articles from ${sourceLabel}${yearLabel}</span>`;
    list.appendChild(countHeader);

    articles.forEach(art => {
      const el = document.createElement('div');
      el.className = 'archive-item';
      const diffClass = `difficulty-${(art.difficulty || 'intermediate').toLowerCase()}`;
      const pubDate = art.publishedAt ? new Date(art.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : (art.year || '2026 Edition');
      const wordCount = art.wordCount || 480;
      const readTime = Math.max(2, Math.round(wordCount / 160));
      
      const hasFullContent = Boolean(art.content || art.coreConcept || art.isTextbookArticle);
      const readAction = hasFullContent ? `onclick="openCaArticleModal('${art.id || art.code}')"` : `href="${art.url}" target="_blank"`;

      el.innerHTML = `
        <div class="archive-item-header">
          <div class="archive-item-title" style="cursor: pointer;" ${hasFullContent ? `onclick="openCaArticleModal('${art.id || art.code}')"` : ''}>
            ${art.title}
          </div>
          <span class="difficulty-badge ${diffClass}">${art.difficulty || 'Advanced'}</span>
        </div>
        ${art.coreConcept ? `<div style="font-size: 13px; font-weight: 600; color: var(--accent); margin: 2px 0 6px 0;"><i class="fa-solid fa-graduation-cap"></i> Core Concept: ${art.coreConcept}</div>` : ''}
        <p style="font-size: 14px; color: var(--text-muted); line-height: 1.5; margin: 4px 0 12px 0;">${art.description || ''}</p>
        <div class="archive-meta" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap;">
            <span><i class="fa-regular fa-newspaper"></i> <strong>${art.source || 'Study Guide'}</strong></span>
            <span><i class="fa-regular fa-calendar"></i> ${pubDate}</span>
            <span><i class="fa-solid fa-file-word"></i> ${wordCount} words</span>
            <span><i class="fa-regular fa-clock"></i> ${readTime} min read</span>
          </div>
          ${hasFullContent 
            ? `<button class="read-btn" onclick="openCaArticleModal('${art.id || art.code}')" style="cursor: pointer; border: none;">READ STUDY ARTICLE &rarr;</button>`
            : `<a class="read-btn" href="${art.url}" target="_blank" style="text-decoration: none;">READ ARTICLE ↗</a>`
          }
        </div>
      `;
      list.appendChild(el);
    });

    // Pagination controls
    if (data.totalPages > 1) {
      const pagContainer = document.createElement('div');
      pagContainer.style.cssText = 'display: flex; justify-content: center; gap: 10px; margin-top: 24px; align-items: center;';
      
      if (data.page > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'btn btn-outline btn-sm';
        prevBtn.innerHTML = '&larr; Previous';
        prevBtn.onclick = () => { state.archive.page--; loadArchiveArticles(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
        pagContainer.appendChild(prevBtn);
      }

      const pageInfo = document.createElement('span');
      pageInfo.style.cssText = 'font-size: 14px; font-weight: 600; color: var(--text-muted); margin: 0 10px;';
      pageInfo.textContent = `Page ${data.page} of ${data.totalPages}`;
      pagContainer.appendChild(pageInfo);

      if (data.page < data.totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn-outline btn-sm';
        nextBtn.innerHTML = 'Next &rarr;';
        nextBtn.onclick = () => { state.archive.page++; loadArchiveArticles(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
        pagContainer.appendChild(nextBtn);
      }

      list.appendChild(pagContainer);
    }
  } catch (err) {
    console.error('Error loading archive articles', err);
    list.innerHTML = '<div style="text-align:center; padding: 30px; color: var(--accent-red);"><p>Error loading archive articles. Please try again.</p><button class="btn btn-outline btn-sm mt-2" onclick="loadArchiveArticles()">Retry</button></div>';
  }
}

/* ==========================================================================
   12. SETTINGS & PREFERENCES
   ========================================================================== */
function renderSettingsPanel() {
  const savedOnboarding = JSON.parse(localStorage.getItem('tt_onboarding') || '{}');
  const user = state.user || {};

  let currentCountries = (user.countries && user.countries.length > 0)
    ? [...user.countries]
    : (state.onboarding.countries.length > 0 ? [...state.onboarding.countries] : (savedOnboarding.countries || ['IN', 'US']));

  let currentInterests = (user.interests && user.interests.length > 0)
    ? [...user.interests]
    : (state.onboarding.interests.length > 0 ? [...state.onboarding.interests] : (savedOnboarding.interests || ['Technology', 'Business']));

  let currentProfession = user.profession || state.onboarding.profession || savedOnboarding.profession || 'student';
  let currentFormat = user.readingFormat || state.onboarding.format || savedOnboarding.format || '5min';
  let currentViewpoint = user.viewpoint || state.onboarding.viewpoint || savedOnboarding.viewpoint || 'balanced';
  let currentReadingTime = user.readingTime || state.onboarding.readingTime || savedOnboarding.readingTime || '5to15';

  // 1. Settings Tab Switching
  document.querySelectorAll('.settings-tab-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.settings-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.settingsTab;
      document.querySelectorAll('.settings-pane').forEach(p => p.classList.remove('active'));
      const activePane = document.getElementById(`settings-pane-${tab}`);
      if (activePane) activePane.classList.add('active');
    };
  });

  // 2. Profile Pane
  const nameInput = document.getElementById('settings-name');
  if (nameInput) nameInput.value = user.name || (state.token === 'guest_token' ? 'Guest Explorer' : 'User');
  
  const emailInput = document.getElementById('settings-email');
  if (emailInput) emailInput.value = user.email || (state.token === 'guest_token' ? 'guest@tailoredtimes.local' : 'user@tailoredtimes.com');

  const profSelect = document.getElementById('settings-profession');
  if (profSelect) {
    profSelect.innerHTML = PROFESSIONS.map(p => `<option value="${p.id}" ${p.id === currentProfession ? 'selected' : ''}>${p.emoji} ${p.title}</option>`).join('');
    profSelect.onchange = (e) => { currentProfession = e.target.value; };
  }

  // 3. Countries Pane
  const countryGrid = document.getElementById('settings-country-grid');
  const countryCountEl = document.getElementById('settings-country-count');
  const countrySearch = document.getElementById('settings-country-search');

  function updateCountryUI() {
    if (countryCountEl) countryCountEl.textContent = currentCountries.length;
    const q = (countrySearch ? countrySearch.value : '').trim().toLowerCase();
    if (!countryGrid) return;
    
    countryGrid.innerHTML = '';
    COUNTRIES.forEach(c => {
      if (q && !c.name.toLowerCase().includes(q) && !c.code.toLowerCase().includes(q)) return;
      const isSelected = currentCountries.includes(c.code);
      const card = document.createElement('div');
      card.className = `country-card ${isSelected ? 'selected' : ''}`;
      card.innerHTML = `<span class="flag">${c.flag}</span><span class="name">${c.name}</span>`;
      card.onclick = () => {
        if (currentCountries.includes(c.code)) {
          currentCountries = currentCountries.filter(code => code !== c.code);
        } else {
          currentCountries.push(c.code);
        }
        updateCountryUI();
      };
      countryGrid.appendChild(card);
    });
  }

  if (countrySearch) countrySearch.oninput = () => updateCountryUI();
  
  const selAllBtn = document.getElementById('btn-settings-select-all-countries');
  if (selAllBtn) selAllBtn.onclick = () => {
    currentCountries = COUNTRIES.map(c => c.code);
    updateCountryUI();
  };

  const clearAllBtn = document.getElementById('btn-settings-clear-all-countries');
  if (clearAllBtn) clearAllBtn.onclick = () => {
    currentCountries = [];
    updateCountryUI();
  };

  updateCountryUI();

  // 4. Topics Pane
  const topicsGrid = document.getElementById('settings-topics-grid');
  function updateTopicsUI() {
    if (!topicsGrid) return;
    topicsGrid.innerHTML = '';
    INTERESTS.forEach(interest => {
      const isSelected = currentInterests.some(i => i.toLowerCase() === interest.toLowerCase());
      const btn = document.createElement('button');
      btn.className = `pill-btn ${isSelected ? 'selected' : ''}`;
      btn.textContent = interest;
      btn.onclick = () => {
        if (currentInterests.some(i => i.toLowerCase() === interest.toLowerCase())) {
          currentInterests = currentInterests.filter(i => i.toLowerCase() !== interest.toLowerCase());
        } else {
          currentInterests.push(interest);
        }
        updateTopicsUI();
      };
      topicsGrid.appendChild(btn);
    });
  }
  updateTopicsUI();

  // 5. Reading Preferences Cards
  function renderCardSelect(containerId, items, selectedVal, onSelect) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    items.forEach(item => {
      const isSel = item.id === selectedVal;
      const card = document.createElement('div');
      card.className = `option-card ${isSel ? 'selected' : ''}`;
      card.innerHTML = `<span class="emoji">${item.emoji}</span><span class="title">${item.title}</span>`;
      card.onclick = () => {
        selectedVal = item.id;
        onSelect(item.id);
        renderCardSelect(containerId, items, selectedVal, onSelect);
      };
      container.appendChild(card);
    });
  }

  renderCardSelect('settings-format-grid', FORMATS, currentFormat, (val) => { currentFormat = val; });
  renderCardSelect('settings-viewpoint-grid', VIEWPOINTS, currentViewpoint, (val) => { currentViewpoint = val; });
  renderCardSelect('settings-reading-time-grid', READING_TIMES, currentReadingTime, (val) => { currentReadingTime = val; });

  // 6. Save Changes Button
  const saveBtn = document.getElementById('btn-save-settings');
  if (saveBtn) {
    saveBtn.onclick = async () => {
      const newName = nameInput ? nameInput.value.trim() : (user.name || 'User');
      
      const payload = {
        name: newName,
        countries: currentCountries.length > 0 ? currentCountries : ['IN'],
        interests: currentInterests.length > 0 ? currentInterests : ['Technology', 'Business'],
        profession: currentProfession,
        readingFormat: currentFormat,
        viewpoint: currentViewpoint,
        readingTime: currentReadingTime
      };

      state.readingFormat = currentFormat;
      localStorage.setItem('tt_format', currentFormat);

      // Save to localStorage
      localStorage.setItem('tt_onboarding', JSON.stringify(payload));
      state.onboarding = { ...state.onboarding, ...payload };
      if (state.user) {
        state.user = { ...state.user, ...payload };
      } else {
        state.user = { ...payload };
      }

      updateUserUI();

      // Sync with backend API
      try {
        if (state.token && state.token !== 'guest_token') {
          await safeApiCall('/api/user/preferences', 'PUT', payload);
        }
      } catch (err) {}

      showToast('Settings saved successfully!', 'success');

      // Refresh feed tab if active
      if (state.currentTab === 'for-you' || state.currentTab === 'my-countries') {
        loadFeed(state.currentTab, 1);
      }
    };
  }

  // 7. Clear Saved & Reset Data
  const clearSavedBtn = document.getElementById('btn-clear-saved-data');
  if (clearSavedBtn) {
    clearSavedBtn.onclick = () => {
      if (confirm('Are you sure you want to clear all your saved articles?')) {
        state.savedArticles = [];
        localStorage.setItem('tt_saved', '[]');
        showToast('All saved articles cleared', 'info');
      }
    };
  }

  const resetBtn = document.getElementById('btn-reset-preferences');
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm('Reset all reading preferences to default?')) {
        currentCountries = ['IN', 'US', 'GB'];
        currentInterests = ['Technology', 'Business', 'Science', 'AI'];
        currentProfession = 'student';
        currentFormat = '5min';
        currentViewpoint = 'balanced';
        currentReadingTime = '5to15';
        renderSettingsPanel();
        showToast('Preferences reset to default', 'info');
      }
    };
  }
}

/* ==========================================================================
   13. ADMIN DASHBOARD
   ========================================================================== */
function switchAdminTab(tabName) {
  document.querySelectorAll('.admin-sidebar nav a').forEach(a => a.classList.remove('active'));
  document.querySelector(`.admin-sidebar nav a[data-admin-tab="${tabName}"]`).classList.add('active');
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`admin-${tabName}-tab`).classList.add('active');
  
  if (tabName === 'dashboard') loadAdminStats();
  if (tabName === 'users') loadAdminUsers();
}

async function loadAdminStats() {
  const container = document.getElementById('admin-stats-container');
  container.innerHTML = '<div class="loader"></div>';
  try {
    // Mock
    const stats = [
      { label: 'Total Users', val: '12,450' },
      { label: 'Active Today', val: '3,842' },
      { label: 'Guest Users', val: '1,105' },
      { label: 'Articles Cached', val: '45,900' }
    ];
    container.innerHTML = stats.map(s => `
      <div class="stat-card">
        <div>${s.label}</div>
        <div class="val">${s.val}</div>
      </div>
    `).join('');
  } catch (err) {}
}

async function loadAdminUsers() {
  const tbody = document.getElementById('admin-users-tbody');
  tbody.innerHTML = '<tr><td colspan="4"><div class="loader"></div></td></tr>';
  try {
    // Mock
    const users = Array(10).fill().map((_, i) => ({
      id: `USR-${1000+i}`, name: `User ${i}`, email: `user${i}@example.com`, joined: '2026-01-15'
    }));
    tbody.innerHTML = users.map(u => `
      <tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.joined}</td>
      </tr>
    `).join('');
  } catch (err) {}
}

/* ==========================================================================
   13. DARK MODE & THEME
   ========================================================================== */
function initTheme() {
  if (state.theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    state.darkMode = true;
  }
}

function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  if (state.darkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('tt_theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('tt_theme', 'light');
  }
}

/* ==========================================================================
   14. UTILITIES
   ========================================================================== */
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-check-circle';
  if (type === 'error') icon = 'fa-exclamation-circle';
  
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${msg}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

function formatTimeAgo(dateStr) {
  if (!dateStr) return 'Unknown';
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString();
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => { clearTimeout(timeout); func(...args); };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* ==========================================================================
   14. INBUILT AI STUDY TUTOR & DOUBT SOLVER CLIENT (TYLA)
   ========================================================================== */
const aiState = {
  isOpen: false,
  mode: 'doubt',
  quizScore: 0,
  currentArticleContext: '',
  articleTitle: '',
  isProcessing: false,
  messages: []
};

function toggleAIChat() {
  const drawer = document.getElementById('ai-chat-drawer');
  if (!drawer) return;
  aiState.isOpen = !aiState.isOpen;
  if (aiState.isOpen) {
    drawer.classList.remove('hidden');
    setTimeout(() => {
      const input = document.getElementById('ai-user-input');
      if (input) input.focus();
    }, 150);
  } else {
    drawer.classList.add('hidden');
  }
}

function setTylaMode(mode, btn) {
  aiState.mode = mode;
  document.querySelectorAll('.ai-mode-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const input = document.getElementById('ai-user-input');
  if (!input) return;

  const placeholders = {
    doubt: "Type your academic question or doubt here... (e.g. 'Explain Ind AS 116' or 'How does DNA replication work?')",
    quiz: "Enter any topic to generate an interactive quiz... (e.g. 'Calculus Integrals', 'Photosynthesis', or 'IELTS Writing')",
    mnemonic: "Enter a concept to get a memory hook or acronym... (e.g. 'Cranial Nerves', 'Tax Deductions', or 'Periodic Table')",
    formulas: "Enter a topic for formula cheat sheet... (e.g. 'Rotational Mechanics', 'WACC Valuation', or 'Optics')"
  };
  input.placeholder = placeholders[mode] || placeholders.doubt;
  input.focus();
}

function openAIDoubtForArticle(articleId, title, coreConcept, section) {
  aiState.currentArticleContext = `Article Title: ${title}. Core Concept: ${coreConcept}`;
  aiState.articleTitle = title;
  
  const ind = document.getElementById('ai-context-indicator');
  const titleEl = document.getElementById('ai-context-title');
  if (ind && titleEl) {
    titleEl.textContent = `Attached: ${title.slice(0, 32)}...`;
    ind.classList.remove('hidden');
  }
  
  if (!aiState.isOpen) {
    toggleAIChat();
  }
  
  const input = document.getElementById('ai-user-input');
  if (input) {
    input.value = `Explain the core concepts, derivations, and exam applications of "${title}"`;
    input.focus();
  }
}

function clearAIContext() {
  aiState.currentArticleContext = '';
  aiState.articleTitle = '';
  const ind = document.getElementById('ai-context-indicator');
  if (ind) ind.classList.add('hidden');
}

function clearAIChat() {
  const container = document.getElementById('ai-messages-container');
  if (container) {
    container.innerHTML = `
      <div class="ai-message ai-msg-bot">
        <div class="msg-bubble">
          <p>🧹 <strong>Chat Cleared.</strong></p>
          <p>Hi! I'm <strong>Tyla</strong>. Ask me any doubt or test yourself on any topic!</p>
        </div>
        <span class="msg-time">Tyla • Ready</span>
      </div>
    `;
  }
  aiState.messages = [];
  clearAIContext();
}

function sendQuickPrompt(promptText) {
  const input = document.getElementById('ai-user-input');
  if (input) {
    input.value = promptText;
    submitAIDoubt();
  }
}

function handleAIKeyDown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    submitAIDoubt();
  }
}

async function submitAIDoubt() {
  const input = document.getElementById('ai-user-input');
  const sendBtn = document.getElementById('ai-send-btn');
  const container = document.getElementById('ai-messages-container');
  if (!input || !container || aiState.isProcessing) return;

  const question = input.value.trim();
  if (!question) return;

  input.value = '';
  aiState.isProcessing = true;
  if (sendBtn) sendBtn.disabled = true;

  // Append user message
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'ai-message ai-msg-user';
  userMsgEl.innerHTML = `
    <div class="msg-bubble">
      ${escapeHTML(question)}
    </div>
    <span class="msg-time">You</span>
  `;
  container.appendChild(userMsgEl);

  // Append loading bubble
  const loadingEl = document.createElement('div');
  loadingEl.className = 'ai-message ai-msg-bot';
  loadingEl.id = 'ai-typing-indicator';
  loadingEl.innerHTML = `
    <div class="msg-bubble" style="display: flex; align-items: center; gap: 8px;">
      <i class="fa-solid fa-spinner fa-spin" style="color: var(--accent);"></i>
      <span style="font-size: 13px; color: var(--text-muted);">Tyla is formulating step-by-step solution...</span>
    </div>
  `;
  container.appendChild(loadingEl);
  container.scrollTop = container.scrollHeight;

  try {
    const payload = {
      question,
      mode: aiState.mode,
      context: aiState.currentArticleContext
    };

    const res = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    loadingEl.remove();

    const answer = data.answer || 'I am ready to help you. Could you rephrase your question?';
    
    // Format response HTML with interactive elements
    const formattedAnswer = renderMarkdownToHTML(answer);

    const botMsgEl = document.createElement('div');
    botMsgEl.className = 'ai-message ai-msg-bot';
    
    // Generate contextual dynamic follow-up chips
    const followUpChips = getDynamicFollowUpChips(question, aiState.mode);

    botMsgEl.innerHTML = `
      <div class="msg-bubble">
        ${formattedAnswer}
        <div class="msg-interactive-toolbar">
          <button class="btn-interactive-action" onclick="copyAIText(this)"><i class="fa-regular fa-copy"></i> Copy Solution</button>
          <button class="btn-interactive-action" onclick="toggleTylaSpeech(this)"><i class="fa-solid fa-volume-high"></i> Listen to Tyla</button>
        </div>
      </div>
      <div class="msg-follow-ups">
        <span class="follow-up-label">Suggested by Tyla:</span>
        <div class="follow-up-pills">
          ${followUpChips.map(chip => `<button class="follow-up-pill" onclick="sendQuickPrompt('${chip.prompt.replace(/'/g, "\\'")}')">${chip.label}</button>`).join('')}
        </div>
      </div>
      <span class="msg-time">Tyla ✦ AI Tutor</span>
    `;
    container.appendChild(botMsgEl);

  } catch (error) {
    loadingEl.remove();
    const errEl = document.createElement('div');
    errEl.className = 'ai-message ai-msg-bot';
    errEl.innerHTML = `
      <div class="msg-bubble" style="border-left: 3px solid var(--accent-red);">
        <p style="color: var(--accent-red); font-weight: 700;">⚠️ Tyla could not fetch the answer right now.</p>
        <p style="font-size: 13px;">Please check your connection or try re-asking your doubt.</p>
      </div>
    `;
    container.appendChild(errEl);
  } finally {
    aiState.isProcessing = false;
    if (sendBtn) sendBtn.disabled = false;
    container.scrollTop = container.scrollHeight;
  }
}

function getDynamicFollowUpChips(userQ, mode) {
  const norm = userQ.toLowerCase();
  if (norm.includes('mcq') || norm.includes('quiz') || mode === 'quiz') {
    return [
      { label: '🧮 Give harder MCQs', prompt: 'Give me 3 more advanced high-difficulty practice MCQs on this.' },
      { label: '📋 Show key formula summary', prompt: 'What are the key formulas and laws for this topic?' },
      { label: '🧠 Mnemonic memory hook', prompt: 'Give me a memorable mnemonic or acronym for this topic.' },
      { label: '💡 Real-world case study', prompt: 'Show me a real-world case study or practical application of this.' }
    ];
  }
  if (norm.includes('formula') || norm.includes('cheat sheet') || mode === 'formulas') {
    return [
      { label: '🎯 Test me on these formulas', prompt: 'Test me with 3 calculation-based practice questions using these formulas.' },
      { label: '⚠️ What mistakes happen in exams?', prompt: 'What are the common exam calculation mistakes and traps students make here?' },
      { label: '💡 Step-by-step derivation', prompt: 'Show the step-by-step derivation of the primary equation.' }
    ];
  }
  return [
    { label: '💡 Explain with simple analogy', prompt: 'Can you explain this with an ultra-simple real-world analogy?' },
    { label: '🎯 Test me with 3 MCQs', prompt: 'Give me 3 high-yield practice MCQs with detailed explanations on this topic.' },
    { label: '🧠 Create a mnemonic', prompt: 'Give me a catchy mnemonic or memory trick to remember this easily.' },
    { label: '📋 Formula cheat sheet', prompt: 'Give me the quick formula sheet and core rules for this topic.' },
    { label: '⚠️ Common exam traps', prompt: 'What are the most common exam traps and mistakes students make on this?' }
  ];
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

function renderMarkdownToHTML(md) {
  if (!md) return '';
  let html = escapeHTML(md);

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 style="color: var(--accent); margin: 10px 0 6px 0; font-size: 15px; font-weight: 800;">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 style="color: var(--accent); margin: 12px 0 8px 0; font-size: 16px; font-weight: 800;">$1</h2>');
  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote class="ai-blockquote">$1</blockquote>');
  // Code Blocks
  html = html.replace(/```([a-z]*)\n([\s\S]*?)```/gim, '<pre class="ai-code-block"><code>$2</code></pre>');
  // Inline Code
  html = html.replace(/`([^`]+)`/g, '<code class="ai-inline-code">$1</code>');
  
  // Interactive MCQ Options Detection: converts - **A)** ... ✅ into interactive buttons!
  html = html.replace(/^[•\-\*] <strong>([A-D]\))<\/strong> (.*?)(?: (✅))?$/gim, (match, optLetter, optText, isCorrect) => {
    const correctFlag = isCorrect ? 'true' : 'false';
    const cleanText = optText.replace('✅', '').trim();
    return `<button class="interactive-quiz-opt" data-correct="${correctFlag}" onclick="handleQuizOptionClick(this)">
      <span class="quiz-opt-letter">${optLetter}</span>
      <span class="quiz-opt-text">${cleanText}</span>
    </button>`;
  });

  // Bullet lists
  html = html.replace(/^[•\-\*] (.*$)/gim, '<li class="ai-bullet-li">$1</li>');
  // Numbered lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li class="ai-bullet-li">$1</li>');
  // Line breaks
  html = html.replace(/\n/g, '<br>');

  return html;
}

// Interactive Quiz Option Click Handler with Score Tracker
function handleQuizOptionClick(btn) {
  const isCorrect = btn.getAttribute('data-correct') === 'true';
  const parentBubble = btn.closest('.msg-bubble');
  
  // Disable options in this question block
  const allOpts = parentBubble.querySelectorAll('.interactive-quiz-opt');
  
  if (isCorrect) {
    btn.classList.add('correct');
    btn.innerHTML += ' <span class="quiz-badge correct-badge"><i class="fa-solid fa-circle-check"></i> Correct! 🎉 +10 pts</span>';
    
    // Increment Score
    aiState.quizScore += 10;
    const scoreEl = document.getElementById('tyla-quiz-pts');
    if (scoreEl) {
      scoreEl.textContent = aiState.quizScore;
      scoreEl.parentElement.classList.add('ai-score-pulse');
      setTimeout(() => scoreEl.parentElement.classList.remove('ai-score-pulse'), 800);
    }
    showToast('🎉 Brilliant! +10 Quiz Points Earned!', 'success');
  } else {
    btn.classList.add('incorrect');
    btn.innerHTML += ' <span class="quiz-badge incorrect-badge"><i class="fa-solid fa-circle-xmark"></i> Incorrect</span>';
    // Highlight the correct one
    allOpts.forEach(o => {
      if (o.getAttribute('data-correct') === 'true' && !o.classList.contains('correct')) {
        o.classList.add('correct');
        o.innerHTML += ' <span class="quiz-badge correct-badge">Correct Answer ✓</span>';
      }
    });
    showToast('Not quite right — check the correct answer highlighted!', 'error');
  }

  // Prevent multiple clicks on same group
  allOpts.forEach(o => o.style.pointerEvents = 'none');
}

// Interactive Speech Synthesis (Tyla Reads Aloud)
let currentSpeechUtterance = null;
function toggleTylaSpeech(btn) {
  if (!('speechSynthesis' in window)) {
    showToast('Speech synthesis not supported in this browser.', 'error');
    return;
  }

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen to Tyla';
    btn.classList.remove('active-speech');
    return;
  }

  const bubble = btn.closest('.msg-bubble');
  if (!bubble) return;

  // Extract clean speech text
  const clone = bubble.cloneNode(true);
  clone.querySelectorAll('.msg-interactive-toolbar, pre, code').forEach(el => el.remove());
  const text = clone.innerText.replace(/[#*`_>]/g, '').trim();

  currentSpeechUtterance = new SpeechSynthesisUtterance(text);
  currentSpeechUtterance.rate = 1.0;
  currentSpeechUtterance.pitch = 1.05;

  // Choose a clear voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Karen')));
  if (preferredVoice) currentSpeechUtterance.voice = preferredVoice;

  btn.innerHTML = '<i class="fa-solid fa-circle-stop fa-beat"></i> Stop Listening';
  btn.classList.add('active-speech');

  currentSpeechUtterance.onend = () => {
    btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen to Tyla';
    btn.classList.remove('active-speech');
  };
  currentSpeechUtterance.onerror = () => {
    btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen to Tyla';
    btn.classList.remove('active-speech');
  };

  window.speechSynthesis.speak(currentSpeechUtterance);
}

function copyAIText(btn) {
  const bubble = btn.closest('.msg-bubble');
  if (bubble) {
    const clone = bubble.cloneNode(true);
    clone.querySelectorAll('.msg-interactive-toolbar').forEach(el => el.remove());
    const textToCopy = clone.innerText.trim();
    navigator.clipboard.writeText(textToCopy);
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy Solution';
    }, 2000);
    showToast('Tyla solution copied to clipboard!', 'success');
  }
}

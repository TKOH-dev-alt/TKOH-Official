/* ============================================================
   TKHO WELLNESS — app.js  v3.0  COMPLETE
   Theme toggle · Logo · All 16 components · Dark/Light
   ============================================================ */
'use strict';

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const DATA = {
  therapists: [
    { id:1, name:'Dr. Ananya Gupta',  title:'Anxiety & Stress Specialist',  rating:4.9, reviews:142, tags:['Anxiety','Mindfulness','CBT'],       bio:'With a decade of clinical experience, Dr. Gupta specialises in evidence-based CBT and mindfulness techniques to help patients overcome chronic anxiety and reclaim lasting inner calm.',           price:'₹1,200', specialty:'anxiety'    },
    { id:2, name:'Dr. Rohan Verma',   title:'Depression & Mood Therapist',  rating:4.8, reviews:97,  tags:['Depression','Grief','DBT'],           bio:'Dr. Verma provides compassionate, non-judgmental support for individuals navigating depression, grief, and major life transitions using Dialectical Behaviour Therapy.',                          price:'₹1,400', specialty:'depression' },
    { id:3, name:'Dr. Meera Nair',    title:'Relationship Counsellor',      rating:4.7, reviews:203, tags:['Couples','Communication','Attachment'], bio:'A systemic therapist helping couples and individuals build deeper connections, resolve conflicts, and understand their attachment patterns in a safe, supportive environment.',           price:'₹1,100', specialty:'relations'  },
    { id:4, name:'Vikram Singh',       title:'Career & Life Coach',          rating:4.6, reviews:78,  tags:['Career','Burnout','Identity'],         bio:'Combines psychological insight with practical coaching to help professionals navigate career crossroads, workplace stress, and personal identity challenges with clarity and confidence.',         price:'₹900',   specialty:'career'     },
    { id:5, name:'Dr. Fatima Zaidi',  title:'Trauma & PTSD Specialist',     rating:4.9, reviews:116, tags:['Trauma','PTSD','EMDR'],               bio:'Trained in EMDR and somatic approaches, Dr. Zaidi specialises in helping trauma survivors rebuild safety, self-trust, and a renewed sense of personal identity and belonging over time.',  price:'₹1,600', specialty:'trauma'     },
    { id:6, name:'Aryan Kapoor',      title:'Child & Adolescent Therapist', rating:4.7, reviews:89,  tags:['Teens','Family','Anxiety'],           bio:'Passionate about supporting young people through developmental challenges, school stress, and family dynamics using play therapy and narrative therapeutic approaches that resonate.',          price:'₹1,000', specialty:'anxiety'    },
  ],

  blogs: [
    { category:'Mental Health',  date:'May 28, 2026',   title:'The Science Behind Mindfulness: What Research Actually Shows',        summary:'Decades of neuroscience research have revealed how mindfulness meditation literally reshapes neural pathways associated with stress and emotional regulation, improving well-being.',         author:'Dr. Priya Sharma'  },
    { category:'Therapy',        date:'May 22, 2026',   title:'When to Seek Help: Signs You Would Benefit From Therapy',             summary:"Many people wait years before seeking professional support. Here's how to recognize the clear signs that talking to a therapist could genuinely transform your life for the better.",      author:'Dr. Rohan Verma'   },
    { category:'Wellness',       date:'May 15, 2026',   title:'Sleep and Mental Health: The Bidirectional Relationship',             summary:'Poor sleep worsens anxiety and depression, while mental health conditions disrupt sleep. Understanding this interconnected cycle is the first step to lasting recovery.',                author:'Leila Nazari'      },
    { category:'Breathwork',     date:'May 8, 2026',    title:'Box Breathing: A Navy SEAL Technique for Everyday Calm',             summary:'The tactical breathing technique used by elite military units directly activates your parasympathetic nervous system — and anyone can master it in under five focused minutes.',     author:'Arjun Mehta'       },
    { category:'Growth',         date:'April 30, 2026', title:'Post-Traumatic Growth: How Adversity Can Become Your Strength',      summary:'Research shows many trauma survivors not only recover but develop deeper meaning, closer relationships, and expanded personal capability through the healing journey.',              author:'Dr. Fatima Zaidi'  },
    { category:'Relationships',  date:'April 22, 2026', title:'How to Have Difficult Conversations Without Damaging Relationships', summary:'The words we choose, the timing we select, and the emotional safety we create together can mean the difference between genuine connection and lasting irreparable conflict.',        author:'Dr. Meera Nair'    },
  ],

  faqCategories: [
    {
      label: 'TKHO QUESTIONS',
      items: [
        { q:'Is the AI Buddy private?', a:'Your AI Buddy conversation is designed for private reflection. Avoid sharing passwords or information that could identify someone else, and review our confidentiality policy before using the service.' },
        { q:'How are psychologists verified?', a:'TKHO reviews listed psychologists’ identity and professional credentials, including relevant M.Phil, MA Psychology, or equivalent qualifications, before publishing their profiles.' },
        { q:'How much do sessions cost, and what is the refund policy?', a:'Each profile shows its current price before booking. Cancellations made at least 24 hours before a session are eligible for a full refund; later cancellations may be charged according to the provider’s policy.' },
        { q:'What is the difference between the AI Buddy and human therapy?', a:'The AI Buddy offers instant emotional support and structured reflection. A psychologist provides confidential, personalised clinical care, including assessment and treatment when appropriate.' },
        { q:'Which languages are supported?', a:'Therapist availability includes English, Hindi, and selected regional languages. Language options are shown on each profile and can be discussed before booking.' },
        { q:'Can the AI Buddy diagnose me or handle an emergency?', a:'No. The AI Buddy is not a medical professional and cannot diagnose, prescribe, or monitor emergencies. If you are in immediate danger, contact local emergency services or an Indian crisis helpline listed in our safety policy.' },
      ]
    },
  ],

  quotes: [
    '"The greatest revolution of our generation is the discovery that human beings can alter their lives by altering their attitudes of mind."',
    '"You don\'t have to control your thoughts. You just have to stop letting them control you."',
    '"Mental health is not a destination, but a process. It\'s about how you drive, not where you\'re going."',
    '"Healing is not linear. Every single step forward matters, no matter how small it may seem today."',
    '"Out of your vulnerabilities will come your strength." — Sigmund Freud',
    '"You are allowed to be both a masterpiece and a work in progress simultaneously." — Sophia Bush',
  ],
};

/* ══════════════════════════════════════════════════
   APP STATE
══════════════════════════════════════════════════ */
const STATE = {
  currentPage:     'home',
  currentUser:     null,
  bookings:        [],
  moods:           [],
  chatOpen:        false,
  activeSession:   false,
  buddyMode:       'vent',
  breathRunning:   false,
  breathSeconds:   60,
  breathPhaseIdx:  0,
  breathPhaseTick: 0,
  quoteIdx:        0,
  sessionSec:      0,
  theme:           'light',
};

let _breathTimer  = null;
let _sessionTimer = null;
let _quoteTimer   = null;

function $(id)    { return document.getElementById(id); }
function $$(sel)  { return document.querySelectorAll(sel); }
function pad2(n)  { return String(n).padStart(2, '0'); }
function qs(sel)  { return document.querySelector(sel); }
function getInitials(name) {
  return String(name || 'TK').split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}

/* ══════════════════════════════════════════════════
   THEME TOGGLE  ─ light ↔ dark
══════════════════════════════════════════════════ */
function toggleTheme() {
  const html  = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const next   = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  STATE.theme = next;
  try { localStorage.setItem('tkho-theme', next); } catch(e) {}
  showToast('info', isDark
    ? 'Light mode activated — clean, bright, and clear.'
    : 'Dark mode activated — elegant, focused, and premium.');
}

function initTheme() {
  try {
    const saved = localStorage.getItem('tkho-theme');
    if (saved === 'dark' || saved === 'light') {
      document.documentElement.setAttribute('data-theme', saved);
      STATE.theme = saved;
    }
  } catch(e) {}
}

/* ══════════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════════ */
const PAGES = ['home','therapists','about','blog','help','policy','dashboard','video'];

function navigate(page) {
  if ((page === 'dashboard' || page === 'video') && !STATE.currentUser) {
    openAuth('login');
    showToast('info', 'Log in to access your private account area.');
    return false;
  }
  if (page === 'video' && !STATE.activeSession) {
    showToast('info', 'Start a scheduled session from your dashboard to enter the video room.');
    return false;
  }
  PAGES.forEach(p => {
    const el = $('page-' + p);
    if (el) el.classList.remove('active');
  });
  const target = $('page-' + page);
  if (target) target.classList.add('active');

  $$('.nav-links a').forEach(a => a.classList.remove('active'));
  const nl = $('nav-' + page);
  if (nl) nl.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  STATE.currentPage = page;

  if (page === 'therapists') renderTherapists('all');
  if (page === 'blog')       renderBlog();
  if (page === 'help')       renderFAQ();
  if (page === 'dashboard')  renderDashboard();
  if (page === 'video')      startSessionTimer();
  if (page !== 'video')      clearInterval(_sessionTimer);
  return false;
}

window.addEventListener('scroll', () => {
  const nav = $('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
});

/* ══════════════════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════════════════ */
function toggleMobile() {
  $('hamburger').classList.toggle('open');
  $('mobile-menu').classList.toggle('open');
}
function mobileNav(page) { toggleMobile(); navigate(page); }

/* ══════════════════════════════════════════════════
   TOAST SYSTEM
══════════════════════════════════════════════════ */
function showToast(type, msg) {
  const container = $('toast-container');
  if (!container) return;
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span class="toast-msg">${msg}</span>
                 <button class="toast-x" onclick="dismissToast(this.parentElement)">✕</button>`;
  container.appendChild(t);
  setTimeout(() => dismissToast(t), 4500);
}

function dismissToast(el) {
  if (!el || !el.parentElement) return;
  el.classList.add('out');
  setTimeout(() => el && el.remove(), 300);
}

/* ══════════════════════════════════════════════════
   HERO QUOTE ROTATION
══════════════════════════════════════════════════ */
function startQuoteRotation() {
  const el = $('hero-quote');
  if (!el) return;
  el.style.transition = 'opacity .4s ease, transform .4s ease';
  _quoteTimer = setInterval(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px)';
    setTimeout(() => {
      STATE.quoteIdx = (STATE.quoteIdx + 1) % DATA.quotes.length;
      el.textContent = DATA.quotes[STATE.quoteIdx];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 420);
  }, 5500);
}

/* ══════════════════════════════════════════════════
   HERO PROGRESS BAR ANIMATION
══════════════════════════════════════════════════ */
function animateHeroProgress() {
  const bar = $('hero-progress-fill');
  if (!bar) return;
  let val = 0;
  const interval = setInterval(() => {
    val = Math.min(val + 1, 78);
    bar.style.width = val + '%';
    if (val >= 78) clearInterval(interval);
  }, 18);
}

/* ══════════════════════════════════════════════════
   AUTH SYSTEM
══════════════════════════════════════════════════ */
function openAuth(tab) {
  $('auth-modal').classList.remove('hidden');
  switchAuthTab(tab);
}

function closeModal(id) {
  const el = $(id);
  if (el) el.classList.add('hidden');
}

function switchAuthTab(tab) {
  $('login-form-body').style.display = 'block';
  $('auth-tab-login').classList.add('active');
}

function doLogin() {
  const email = $('login-email').value.trim();
  const pass  = $('login-pass').value.trim();
  if (!email || !pass) { showToast('danger', 'Please enter your email and password.'); return; }
  STATE.currentUser = {
    name:    'Arjun Mehta',
    email,
    role:    'user',
    initial:  'A',
    provider: 'local'
  };
  persistSession();
  applyLoggedIn();
  closeModal('auth-modal');
  showToast('success', `Welcome back, ${STATE.currentUser.name.split(' ')[0]}!`);
  navigate('dashboard');
}

function applyLoggedIn() {
  const u = STATE.currentUser;
  $('nav-auth-btns').style.display = 'none';
  $('nav-user-pill').style.display = 'flex';
  $('nav-user-av').textContent     = u.initial;
  $('nav-user-av').style.background = u.role === 'therapist'
    ? 'linear-gradient(135deg,var(--gold),var(--gold-dark))'
    : 'linear-gradient(135deg,var(--accent),var(--accent-dark))';
  if (u.role === 'therapist') $('nav-user-av').style.color = '#07090F';
  $('nav-user-name').textContent = u.name.split(' ')[0];
  $('nav-dashboard').style.display        = '';
  $('mobile-nav-dashboard').style.display = '';
}

function persistSession() {
  if (!STATE.currentUser) return;
  try { localStorage.setItem('tkho-demo-session', JSON.stringify(STATE.currentUser)); } catch (error) {}
}

function restoreSession() {
  try {
    const saved = JSON.parse(localStorage.getItem('tkho-demo-session') || 'null');
    if (saved && saved.role === 'user' && saved.name) {
      STATE.currentUser = saved;
      applyLoggedIn();
    }
  } catch (error) {}
}

function logout() {
  STATE.currentUser = null;
  try { localStorage.removeItem('tkho-demo-session'); } catch (error) {}
  $('nav-auth-btns').style.display = 'flex';
  $('nav-user-pill').style.display = 'none';
  $('nav-dashboard').style.display        = 'none';
  $('mobile-nav-dashboard').style.display = 'none';
  showToast('info', 'You have been signed out. See you soon.');
  navigate('home');
}

/* ══════════════════════════════════════════════════
   MOOD TRACKER
══════════════════════════════════════════════════ */
function selectMood(btn, mood) {
  $$('.mood-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const now = new Date();
  const ts  = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
  const conf = $('mood-confirm');
  if (conf) {
    conf.textContent = `✓ Mood "${mood}" logged at ${ts}`;
    conf.classList.add('show');
  }
  showToast('success', `Mood "<strong>${mood}</strong>" tracked at ${ts}.`);
}

/* ══════════════════════════════════════════════════
   BREATHING EXERCISE
══════════════════════════════════════════════════ */
const BREATH_PHASES = [
  { name:'Inhale', dur:4, cls:'inhale' },
  { name:'Hold',   dur:4, cls:'hold'   },
  { name:'Exhale', dur:6, cls:'exhale' },
  { name:'Rest',   dur:2, cls:''       },
];

function toggleBreathing() {
  STATE.breathRunning ? stopBreathing() : startBreathing();
}

function startBreathing() {
  STATE.breathRunning  = true;
  STATE.breathSeconds  = 60;
  STATE.breathPhaseIdx  = 0;
  STATE.breathPhaseTick = 0;
  const btn = $('breath-btn');
  if (btn) btn.textContent = '⏹ Stop';
  _breathTimer = setInterval(tickBreath, 1000);
  tickBreath();
}

function stopBreathing() {
  clearInterval(_breathTimer);
  STATE.breathRunning = false;
  STATE.breathSeconds = 60;
  const btn   = $('breath-btn');
  const ring  = $('breath-ring-ui');
  const timer = $('breath-timer-ui');
  const phase = $('breath-phase-lbl');
  if (btn)   btn.textContent   = '▶ Start';
  if (ring)  { ring.textContent = 'Begin'; ring.className = 'breath-ring'; }
  if (timer) timer.textContent = '01:00';
  if (phase) phase.textContent = 'Tap to start your session';
}

function tickBreath() {
  if (STATE.breathSeconds <= 0) {
    stopBreathing();
    showToast('success', '🏆 Breathing session complete! Excellent work.');
    return;
  }
  STATE.breathSeconds--;
  const m = Math.floor(STATE.breathSeconds / 60);
  const s = STATE.breathSeconds % 60;
  const timer = $('breath-timer-ui');
  if (timer) timer.textContent = `${pad2(m)}:${pad2(s)}`;

  const ph   = BREATH_PHASES[STATE.breathPhaseIdx];
  const ring = $('breath-ring-ui');
  const lbl  = $('breath-phase-lbl');
  if (ring) { ring.textContent = ph.name; ring.className = 'breath-ring' + (ph.cls ? ' ' + ph.cls : ''); }
  if (lbl)  lbl.textContent = `${ph.name} · ${ph.dur}s`;

  STATE.breathPhaseTick++;
  if (STATE.breathPhaseTick >= ph.dur) {
    STATE.breathPhaseTick = 0;
    STATE.breathPhaseIdx  = (STATE.breathPhaseIdx + 1) % BREATH_PHASES.length;
  }
}

/* ══════════════════════════════════════════════════
   SELF-CARE CHECKLIST
══════════════════════════════════════════════════ */
function toggleCheck(item) {
  item.classList.toggle('done');
  const done  = $$('#checklist-items .done').length;
  const total = $$('#checklist-items .check-item').length;
  const fill  = $('habit-fill');
  const cap   = $('habit-caption');
  if (fill) fill.style.width = (done / total * 100) + '%';
  if (cap)  cap.textContent  = `${done} / ${total} tasks completed`;
  if (done === total) showToast('success', '🏆 All self-care tasks complete for today! Amazing.');
}

/* ══════════════════════════════════════════════════
   THERAPIST DIRECTORY
══════════════════════════════════════════════════ */
function renderTherapists(filter) {
  const grid = $('therapist-grid');
  if (!grid) return;
  const list = filter === 'all'
    ? DATA.therapists
    : DATA.therapists.filter(t => t.specialty === filter);

  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text-3)">No therapists found for this specialty.</div>`;
    return;
  }

  grid.innerHTML = list.map(t => `
    <div class="tc-card card-lift">
      <div class="tc-head">
        <div class="tc-av">${getInitials(t.name)}</div>
        <div>
          <div class="tc-name">${t.name}</div>
          <div class="tc-title">${t.title}</div>
          <div class="tc-rating">${t.rating} rating <span style="color:var(--text-3)">(${t.reviews} reviews)</span></div>
        </div>
      </div>
      <div class="tc-tags">${t.tags.map(tag => `<span class="tc-tag">${tag}</span>`).join('')}</div>
      <div class="tc-bio">${t.bio}</div>
      <div class="tc-footer">
        <div class="tc-price">${t.price} <span>/ hour</span></div>
        <button class="btn btn-primary btn-sm" onclick="openBooking(${t.id})">Book Session</button>
      </div>
    </div>
  `).join('');
}

function filterTherapists(filter, btn) {
  $$('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderTherapists(filter);
}

/* ══════════════════════════════════════════════════
   BOOKING MODAL
══════════════════════════════════════════════════ */
function openBooking(therapistId) {
  if (!STATE.currentUser) {
    showToast('info', 'Please log in first to book a session.');
    openAuth('login');
    return;
  }
  const t = DATA.therapists.find(x => x.id === therapistId);
  if (!t) return;

  $('booking-modal').dataset.therapistId = therapistId;
  $('bk-av').textContent    = getInitials(t.name);
  $('bk-name').textContent  = t.name;
  $('bk-meta').textContent  = `${t.title} · ${t.rating} rating`;
  $('bk-price').textContent = `${t.price}/hr`;

  const scroll = $('bk-date-scroll');
  const days   = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const today  = new Date();
  scroll.innerHTML = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return `<div class="date-btn${i === 0 ? ' sel' : ''}" onclick="selectDate(this)">
      <div class="date-day-lbl">${days[d.getDay()]}</div>
      <div class="date-num-lbl">${d.getDate()}</div>
    </div>`;
  }).join('');

  $('booking-modal').classList.remove('hidden');
}

function selectDate(btn) {
  $$('.date-btn').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
}

function selectTimeSlot(btn) {
  $$('.time-slot').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
}

function confirmBooking() {
  if (!STATE.currentUser) {
    closeModal('booking-modal');
    openAuth('login');
    showToast('info', 'Log in with the preview account to request a therapist session.');
    return;
  }
  const therapistId = $('booking-modal').dataset.therapistId || 'directory-selection';
  const startTime = new Date().toISOString();
  STATE.bookings.unshift({ therapistId, startTime, status: 'requested' });
  renderDashboard();
  closeModal('booking-modal');
  showToast('success', 'Session request saved.');
}

/* ══════════════════════════════════════════════════
   BLOG
══════════════════════════════════════════════════ */
function renderBlog() {
  const grid = $('blog-grid');
  if (!grid) return;
  grid.innerHTML = DATA.blogs.map((b, i) => `
    <div class="blog-card card-lift">
      <div class="blog-img">${b.category.slice(0, 2).toUpperCase()}</div>
      <div class="blog-body">
        <div class="blog-meta"><span class="cat">${b.category}</span> · ${b.date}</div>
        <div class="blog-title">${b.title}</div>
        <div class="blog-summary">${b.summary}</div>
        <div class="blog-footer">
          <span class="blog-author">${b.author}</span>
          <span class="blog-read-link" onclick="openArticle(${i})">Read Article →</span>
        </div>
      </div>
    </div>
  `).join('');
}

function openArticle(idx) {
  const b   = DATA.blogs[idx];
  const body = $('article-modal-body');
  if (!body) return;
  body.innerHTML = `
    <h2>${b.title}</h2>
    <div class="art-meta">${b.category} &middot; ${b.date} &middot; Written by ${b.author}</div>
    <p>${b.summary}</p>
    <p>Mental health is not a luxury — it is a fundamental pillar of human flourishing. Scientific research over the past three decades has transformed our understanding of how emotional wellbeing shapes everything from immune function to creative capacity, from relationship quality to professional performance across every domain of life.</p>
    <p>The evidence points to a compelling conclusion: investing in your psychological health is one of the highest-leverage actions you can take. Whether through professional therapy, daily mindfulness practice, social connection, or simply tracking your mood — every intentional act of self-care compounds into remarkable resilience and emotional intelligence over time.</p>
    <p>At TKHO, we are building a clearer path from self-reflection to human support. Our platform combines therapist discovery and booking with thoughtful AI guidance, so people can choose the kind of help that fits their next step.</p>
    <p>We hope this article has offered both insight and encouragement. Your mental health matters immensely — and you do not have to navigate any of it alone. Our community, our therapists, and your AI companion are here whenever you reach out.</p>
  `;
  $('article-modal').classList.remove('hidden');
}

/* ══════════════════════════════════════════════════
   FAQ — Wellzy-style with category headers
══════════════════════════════════════════════════ */
function renderFAQ(filter) {
  const container = $('faq-container');
  if (!container) return;
  const q = filter ? filter.toLowerCase() : '';
  let html = '', total = 0;

  DATA.faqCategories.forEach(cat => {
    const filtered = q
      ? cat.items.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
      : cat.items;
    if (!filtered.length) return;
    total += filtered.length;
    html += `<div class="faq-category">${cat.label}</div>`;
    filtered.forEach(f => {
      html += `
        <div class="faq-item">
          <button class="faq-q" onclick="toggleFAQ(this)">
            <span>${f.q}</span>
            <span class="faq-chev">▼</span>
          </button>
          <div class="faq-ans">
            <div class="faq-ans-inner">${f.a}</div>
          </div>
        </div>`;
    });
  });

  container.innerHTML = html;
  const empty = $('faq-empty');
  if (empty) empty.classList.toggle('show', total === 0);
}

function toggleFAQ(btn) {
  const isOpen = btn.classList.contains('open');
  $$('.faq-q.open').forEach(q => {
    q.classList.remove('open');
    if (q.nextElementSibling) q.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    btn.classList.add('open');
    if (btn.nextElementSibling) btn.nextElementSibling.classList.add('open');
  }
}

function searchFAQ(val) {
  const clear = $('faq-clear-btn');
  if (clear) clear.classList.toggle('show', val.length > 0);
  renderFAQ(val);
}

function clearFAQSearch() {
  const inp = $('faq-search-inp');
  if (inp) inp.value = '';
  const clear = $('faq-clear-btn');
  if (clear) clear.classList.remove('show');
  renderFAQ();
}

/* ══════════════════════════════════════════════════
   POLICY TABS
══════════════════════════════════════════════════ */
function switchPolicy(idx, btn) {
  for (let i = 0; i < 3; i++) {
    const el = $('policy-pane-' + i);
    if (el) el.style.display = (i === idx) ? 'block' : 'none';
  }
  $$('.policy-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
}

/* ══════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════ */
function renderDashboard() {
  const logged = $('dash-logged-state');
  if (!logged || !STATE.currentUser) return;
  logged.style.display = 'block';

  const isDoc    = STATE.currentUser.role === 'therapist';
  const avClass  = isDoc ? 'dash-av dash-av-doc' : 'dash-av dash-av-user';
  const navItems = isDoc
    ? [
        { id:'schedule', icon:'', label:'My Schedule'   },
        { id:'clients',  icon:'', label:'Client Roster' },
      ]
    : [
        { id:'overview', icon:'', label:'Overview'          },
        { id:'bookings', icon:'', label:'Bookings'           },
        { id:'history',  icon:'', label:'Session History'    },
        { id:'reports',  icon:'', label:'Wellness Reports'   },
      ];

  $('dash-sidebar-inner').innerHTML = `
    <div class="dash-profile">
      <div class="${avClass}">${STATE.currentUser.initial}</div>
      <div class="dash-fullname">${STATE.currentUser.name}</div>
      <span class="badge ${isDoc ? 'badge-gold' : 'badge-blue'}">${isDoc ? 'Therapist' : 'Patient'}</span>
    </div>
    <div class="dash-nav">
      ${navItems.map((item, i) => `
        <button class="dash-nav-btn${i === 0 ? ' active' : ''}" onclick="switchDashView('${item.id}', this)">
          <span class="dash-nav-icon">${item.icon}</span>${item.label}
        </button>`).join('')}
      <button class="dash-nav-btn" onclick="beginSession()">
        <span class="dash-nav-icon">📹</span>Video Room
      </button>
      <button class="dash-nav-btn" style="color:var(--danger);margin-top:8px" onclick="logout()">
        <span class="dash-nav-icon">↩</span>Log Out
      </button>
    </div>
  `;

  $('dash-main-content').innerHTML = isDoc ? buildTherapistDash() : buildUserDash();
}

/* ── User Dashboard Views ── */
function buildUserDash() {
  const first = STATE.currentUser.name.split(' ')[0];
  const upcoming = STATE.bookings.filter(b => b.status !== 'completed').slice(0, 3);
  const next = upcoming[0];
  const nextDate = next ? new Date(next.startTime).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric' }) : 'No session scheduled';
  const moodCount = STATE.moods.length;
  return `
    <!-- OVERVIEW -->
    <div class="dash-view active" id="dv-overview">
      <div class="dash-welcome">
        <h3>Good day, ${first}.</h3>
        <p>Here is your wellness snapshot for today — keep going, you are doing great.</p>
      </div>
      <div class="dash-stats-row">
        <div class="dash-stat-box">
          <div class="dsb-label">Next Session</div>
          <div class="dsb-val" style="font-size:15px;margin-top:4px">${nextDate}</div>
          <div class="dsb-sub">${next ? next.status : 'Book a therapist when you are ready'}</div>
        </div>
        <div class="dash-stat-box">
          <div class="dsb-label">Sessions Done</div>
          <div class="dsb-val">${STATE.bookings.length}</div>
          <div class="dsb-sub">Saved sessions</div>
        </div>
        <div class="dash-stat-box">
          <div class="dsb-label">Mood Score</div>
          <div class="dsb-val" style="color:var(--accent)">${moodCount}</div>
          <div class="dsb-sub">Mood check-ins</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div style="padding:16px;background:var(--bg-muted);border:1px solid var(--border);border-radius:12px">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--text-3);margin-bottom:10px">UPCOMING</div>
          <div class="booking-card">
            <div class="booking-av">TK</div>
            <div class="booking-info">
              <div class="booking-name">${next ? next.therapistId : 'No upcoming therapist session'}</div>
              <div class="booking-time">${next ? nextDate : 'Browse therapists to get started'}</div>
            </div>
            ${next ? '<button class="btn btn-primary btn-sm" onclick="beginSession()">Join</button>' : ''}
          </div>
        </div>
        <div style="padding:16px;background:var(--bg-muted);border:1px solid var(--border);border-radius:12px">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--text-3);margin-bottom:10px">MOOD TREND</div>
          ${(STATE.moods.length ? STATE.moods.slice(0, 7).reverse().map(m => Math.min(10, Math.max(1, Number(m.score || 5)))) : [0,0,0,0,0,0,0]).map((v,i)=>`
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">
              <span style="font-size:11px;color:var(--text-3);width:14px">${['M','T','W','T','F','S','S'][i]}</span>
              <div style="flex:1;height:7px;border-radius:4px;background:var(--border)">
                <div style="height:100%;border-radius:4px;width:${v*10}%;background:var(--accent)"></div>
              </div>
              <span style="font-size:11px;color:var(--text-3);min-width:10px">${v || '—'}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- BOOKINGS -->
    <div class="dash-view" id="dv-bookings">
      <div class="disclaimer-box"><strong>Reminder:</strong> Sessions start 5 min before scheduled time. Check your email for video call links.</div>
      <h3 style="font-size:17px;font-weight:800;margin-bottom:16px">Upcoming Sessions</h3>
      ${upcoming.length ? upcoming.map(b=>`
        <div class="booking-card">
          <div class="booking-av">TK</div>
          <div class="booking-info">
            <div class="booking-name">${b.therapistId}</div>
            <div class="booking-time">${new Date(b.startTime).toLocaleString()}</div>
          </div>
          <button class="btn btn-outline btn-sm" onclick="beginSession()">Join Video Call</button>
        </div>`).join('') : '<div class="booking-card">No saved bookings yet. Browse therapists to request your first session.</div>'}
    </div>

    <!-- HISTORY -->
    <div class="dash-view" id="dv-history">
      <h3 style="font-size:17px;font-weight:800;margin-bottom:16px">Session History</h3>
      <div class="booking-card" style="flex-direction:column;align-items:flex-start">
        <div style="display:flex;gap:12px;margin-bottom:10px;width:100%;align-items:center">
          <div class="booking-av">TK</div>
          <div>
            <div class="booking-name">Dr. Ananya Gupta</div>
            <div class="booking-time">May 30, 2026 · Completed ✓</div>
          </div>
          <span class="badge badge-success" style="margin-left:auto">Done</span>
        </div>
        <div style="padding:12px 14px;background:var(--bg-muted);border-radius:10px;font-size:13px;color:var(--text-2);width:100%;line-height:1.68">
          <em>Clinical notes:</em> Focused on breathing techniques and catastrophising patterns. Identified three core cognitive distortions. Homework assigned: 5-min morning journaling daily for two weeks.
        </div>
      </div>
    </div>

    <!-- REPORTS -->
    <div class="dash-view" id="dv-reports">
      <h3 style="font-size:17px;font-weight:800;margin-bottom:16px">Wellness Reports</h3>
      <div class="dash-stats-row" style="grid-template-columns:1fr 1fr;margin-bottom:20px">
        <div class="dash-stat-box">
          <div class="dsb-label">Habit Completion</div>
          <div class="dsb-val" style="color:var(--success)">72%</div>
          <div class="dsb-sub">This week</div>
        </div>
        <div class="dash-stat-box">
          <div class="dsb-label">Emotional Stability</div>
          <div class="dsb-val" style="color:var(--accent)">Good</div>
          <div class="dsb-sub">Trending up 📈</div>
        </div>
      </div>
      <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--text-3);margin-bottom:10px">MOOD LOG</div>
      ${[
        {d:'Jun 4',m:'Peaceful', s:8},
        {d:'Jun 3',m:'Anxious',  s:4},
        {d:'Jun 2',m:'Radiant',  s:9},
        {d:'Jun 1',m:'Neutral',  s:6},
        {d:'May 31',m:'Down',    s:3},
      ].map(l=>`
        <div class="mood-log-item">
          <span class="mli-date">${l.d}</span>
          <span class="mli-mood">${l.m}</span>
          <span class="mli-score">${l.s}/10</span>
        </div>`).join('')}
    </div>
  `;
}

/* ── Therapist Dashboard Views ── */
function buildTherapistDash() {
  const first = STATE.currentUser.name.split(' ')[0];
  return `
    <!-- SCHEDULE -->
    <div class="dash-view active" id="dv-schedule">
      <div class="dash-welcome">
        <h3>Good morning, ${first}.</h3>
        <p>You have 3 sessions scheduled today. Your patients are counting on your presence.</p>
      </div>
      <div class="dash-stats-row">
        <div class="dash-stat-box">
          <div class="dsb-label">Today's Sessions</div>
          <div class="dsb-val">3</div>
          <div class="dsb-sub">All confirmed</div>
        </div>
        <div class="dash-stat-box">
          <div class="dsb-label">Active Clients</div>
          <div class="dsb-val">14</div>
          <div class="dsb-sub">This month</div>
        </div>
        <div class="dash-stat-box">
          <div class="dsb-label">Pending Requests</div>
          <div class="dsb-val" style="color:var(--warning)">2</div>
          <div class="dsb-sub">Awaiting response</div>
        </div>
      </div>
      <h3 style="font-size:15px;font-weight:800;margin:16px 0 12px">Today's Appointments</h3>
      ${[
        {e:'👤', n:'Arjun M.',  t:'10:00 AM', s:'Anxiety'},
        {e:'👤', n:'Priya S.',  t:'2:00 PM',  s:'Depression'},
        {e:'👤', n:'Rahul K.',  t:'5:00 PM',  s:'Relationships'},
      ].map(b=>`
        <div class="booking-card">
          <div class="booking-av">${b.e}</div>
          <div class="booking-info">
            <div class="booking-name">${b.n} <span style="font-size:11px;color:var(--text-3);font-weight:500">· ${b.s}</span></div>
            <div class="booking-time">Today · ${b.t}</div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="beginSession()">Start Session</button>
        </div>`).join('')}
    </div>

    <!-- CLIENTS -->
    <div class="dash-view" id="dv-clients">
      <h3 style="font-size:17px;font-weight:800;margin-bottom:16px">Client Roster</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        ${['Arjun M.','Priya S.','Rahul K.','Sneha J.','Vikram T.','Leila N.','Nisha P.','Dev R.'].map((n,i)=>`
          <div style="padding:14px;border-radius:12px;background:var(--bg-muted);border:1px solid var(--border);display:flex;align-items:center;gap:12px;transition:all var(--t)">
            <div style="width:38px;height:38px;border-radius:50%;background:var(--accent);color:white;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0">${n[0]}</div>
            <div>
              <div style="font-size:14px;font-weight:700">${n}</div>
              <div style="font-size:12px;color:var(--text-3)">Session ${i+3} · Active</div>
            </div>
          </div>`).join('')}
      </div>
    </div>
  `;
}

function switchDashView(view, btn) {
  $$('.dash-view').forEach(v => v.classList.remove('active'));
  $$('.dash-nav-btn').forEach(b => b.classList.remove('active'));
  const el = $('dv-' + view);
  if (el)  el.classList.add('active');
  btn.classList.add('active');
}

/* ══════════════════════════════════════════════════
   VIDEO SESSION TIMER
══════════════════════════════════════════════════ */
function startSessionTimer() {
  clearInterval(_sessionTimer);
  STATE.sessionSec = 0;
  _sessionTimer = setInterval(() => {
    STATE.sessionSec++;
    const el = $('session-timer-display');
    if (el) el.textContent = `${pad2(Math.floor(STATE.sessionSec / 60))}:${pad2(STATE.sessionSec % 60)}`;
  }, 1000);
}

function beginSession() {
  if (!STATE.currentUser) {
    openAuth('login');
    return;
  }
  STATE.activeSession = true;
  navigate('video');
}

/* ══════════════════════════════════════════════════
   CHATBOT WIDGET
══════════════════════════════════════════════════ */
const BUDDY_MODES = {
  vent: {
    prompt: 'Yaar, today was exhausting...',
    reply: 'Tell me everything, no filters needed.',
    starter: 'I need to vent about my day.'
  },
  overthinking: {
    prompt: 'I keep replaying the worst possible outcome.',
    reply: 'Let’s slow it down: what happened, what are you predicting, and what evidence do you have for each thought?',
    starter: 'Help me untangle what I am overthinking.'
  },
  therapy: {
    prompt: 'I want therapy, but I do not know how to explain what I feel.',
    reply: 'We can name the feeling, the moments it shows up, and what you hope will change. That is already a useful place to begin.',
    starter: 'Help me prepare for a therapy session.'
  }
};

function setBuddyMode(mode, button) {
  const selected = BUDDY_MODES[mode] || BUDDY_MODES.vent;
  STATE.buddyMode = mode;
  $$('.mode-pill').forEach(pill => pill.classList.remove('active'));
  if (button) button.classList.add('active');
  const prompt = $('buddy-prompt');
  const reply = $('buddy-reply');
  if (prompt) prompt.textContent = selected.prompt;
  if (reply) reply.textContent = selected.reply;
}

function openBuddyExperience() {
  if (!STATE.chatOpen) toggleChat();
  const selected = BUDDY_MODES[STATE.buddyMode] || BUDDY_MODES.vent;
  const input = $('chat-input');
  if (input) input.placeholder = selected.starter;
}

const BOT_REPLIES = {
  'book':      "To book a session, visit the Therapist Directory, pick a professional, and click 'Book Session'. Choose a date, time, and add optional notes.",
  'anxious':   "I hear you — anxiety is really tough. We can slow the thought down together, or I can help you find a psychologist who works with anxiety.",
  'depress':   "Thank you for sharing that with me. Depression is real and treatable. I can listen, or help you find a psychologist for more personalised support.",
  'therapist': "You can browse the professionals currently listed on TKHO and review their areas of focus. Please confirm credentials, availability, and suitability directly before beginning care.",
  'tkho':      "TKHO gives you two ways to feel lighter: an always-there AI Buddy and confidential sessions with verified psychologists.",
  'price':     "Therapy sessions start at ₹799/session. Each psychologist's current price and cancellation terms are shown before booking.",
  'crisis':    "If you are in immediate danger, call local emergency services or a crisis helpline now. iCall: 9152987821 · Vandrevala Foundation: 1860-2662-345 · KIRAN/Tele-MANAS: 14416.",
  'default':   "I am here to listen. You can vent, untangle an anxious thought, prepare for therapy, or ask me how to find a psychologist.",
};

function getReply(msg) {
  const l = msg.toLowerCase();
  for (const [key, reply] of Object.entries(BOT_REPLIES)) {
    if (key !== 'default' && l.includes(key)) return reply;
  }
  return BOT_REPLIES.default;
}

function toggleChat() {
  STATE.chatOpen = !STATE.chatOpen;
  const panel = $('chat-panel');
  if (panel) panel.classList.toggle('hidden', !STATE.chatOpen);
}

function addChatMessage(text, isUser) {
  const msgs = $('chat-messages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'chat-msg ' + (isUser ? 'user' : 'bot');
  const init = STATE.currentUser ? STATE.currentUser.initial : 'U';
  div.innerHTML = `
    <div class="msg-av ${isUser ? 'user' : 'bot'}">${isUser ? init : 'TK'}</div>
    <div class="msg-bub">${text}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addTypingIndicator() {
  const msgs = $('chat-messages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.id = 'typing-ind';
  div.innerHTML = `
    <div class="msg-av bot">TK</div>
    <div class="msg-bub">
      <div style="display:flex;align-items:center;gap:4px;padding:2px 0">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function sendChat() {
  const inp = $('chat-input');
  if (!inp) return;
  const msg = inp.value.trim();
  if (!msg) return;
  addChatMessage(msg, true);
  inp.value = '';
  addTypingIndicator();
  const delay = 1100 + Math.random() * 700;
  setTimeout(() => {
    const ind = $('typing-ind');
    if (ind) ind.remove();
    addChatMessage(getReply(msg), false);
  }, delay);
}

function sendQuickChat(msg) {
  const inp = $('chat-input');
  if (inp) { inp.value = msg; sendChat(); }
}

/* ══════════════════════════════════════════════════
   TAG BUTTON INTERACTIONS (tool cards)
══════════════════════════════════════════════════ */
function initTagGroup(selector) {
  $$(selector).forEach(tag => {
    tag.addEventListener('click', function() {
      $$(selector).forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

/* ══════════════════════════════════════════════════
   MODAL OVERLAY — CLICK OUTSIDE TO CLOSE
══════════════════════════════════════════════════ */
function initModalOverlays() {
  $$('.modal-backdrop').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.add('hidden');
    });
  });
}

/* ══════════════════════════════════════════════════
   KEYBOARD SHORTCUTS
══════════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    $$('.modal-backdrop:not(.hidden)').forEach(m => m.classList.add('hidden'));
    if (STATE.chatOpen) toggleChat();
  }
});

/* ══════════════════════════════════════════════════
   SCROLL ANIMATIONS (Intersection Observer)
══════════════════════════════════════════════════ */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.12 });

  $$('.tc-card, .blog-card, .helps-card, .testimonial-card, .stat-card, .tool-card, .team-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    observer.observe(el);
  });
}

/* ══════════════════════════════════════════════════
   INIT — DOM READY
══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. Apply saved theme from localStorage */
  initTheme();
  restoreSession();

  /* 2. Start on home page */
  navigate('home');

  /* 3. Hero quote rotation */
  startQuoteRotation();

  /* 4. Hero progress bar animation */
  setTimeout(animateHeroProgress, 600);

  /* 5. Modal overlay click-to-close */
  initModalOverlays();

  /* 6. Tool card tag interactions */
  initTagGroup('.breath-tag');
  initTagGroup('.med-tag');

  /* 7. Chat input Enter key */
  const chatInp = $('chat-input');
  if (chatInp) {
    chatInp.addEventListener('keydown', e => {
      if (e.key === 'Enter') sendChat();
    });
  }

  /* 8. Scroll animations (after short delay to let page paint) */
  setTimeout(initScrollAnimations, 300);

  /* 9. Welcome toast */
  setTimeout(() => {
    showToast('info', 'Welcome to TKHO. Use the header toggle to switch themes.');
  }, 1800);

  /* 10. Nav scroll shadow on initial load */
  window.dispatchEvent(new Event('scroll'));
});

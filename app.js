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
    { id:1, emoji:'👩‍⚕️', name:'Dr. Ananya Gupta',  title:'Anxiety & Stress Specialist',  rating:4.9, reviews:142, tags:['Anxiety','Mindfulness','CBT'],       bio:'With a decade of clinical experience, Dr. Gupta specialises in evidence-based CBT and mindfulness techniques to help patients overcome chronic anxiety and reclaim lasting inner calm.',           price:'₹1,200', specialty:'anxiety'    },
    { id:2, emoji:'🧑‍⚕️', name:'Dr. Rohan Verma',   title:'Depression & Mood Therapist',  rating:4.8, reviews:97,  tags:['Depression','Grief','DBT'],           bio:'Dr. Verma provides compassionate, non-judgmental support for individuals navigating depression, grief, and major life transitions using Dialectical Behaviour Therapy.',                          price:'₹1,400', specialty:'depression' },
    { id:3, emoji:'👩‍🔬', name:'Dr. Meera Nair',    title:'Relationship Counsellor',      rating:4.7, reviews:203, tags:['Couples','Communication','Attachment'], bio:'A systemic therapist helping couples and individuals build deeper connections, resolve conflicts, and understand their attachment patterns in a safe, supportive environment.',           price:'₹1,100', specialty:'relations'  },
    { id:4, emoji:'🧔',   name:'Vikram Singh',       title:'Career & Life Coach',          rating:4.6, reviews:78,  tags:['Career','Burnout','Identity'],         bio:'Combines psychological insight with practical coaching to help professionals navigate career crossroads, workplace stress, and personal identity challenges with clarity and confidence.',         price:'₹900',   specialty:'career'     },
    { id:5, emoji:'👩‍💼', name:'Dr. Fatima Zaidi',  title:'Trauma & PTSD Specialist',     rating:4.9, reviews:116, tags:['Trauma','PTSD','EMDR'],               bio:'Trained in EMDR and somatic approaches, Dr. Zaidi specialises in helping trauma survivors rebuild safety, self-trust, and a renewed sense of personal identity and belonging over time.',  price:'₹1,600', specialty:'trauma'     },
    { id:6, emoji:'🧑‍🏫', name:'Aryan Kapoor',      title:'Child & Adolescent Therapist', rating:4.7, reviews:89,  tags:['Teens','Family','Anxiety'],           bio:'Passionate about supporting young people through developmental challenges, school stress, and family dynamics using play therapy and narrative therapeutic approaches that resonate.',          price:'₹1,000', specialty:'anxiety'    },
  ],

  blogs: [
    { emoji:'🧠', category:'Mental Health',  date:'May 28, 2026',   title:'The Science Behind Mindfulness: What Research Actually Shows',        summary:'Decades of neuroscience research have revealed how mindfulness meditation literally reshapes neural pathways associated with stress and emotional regulation, improving well-being.',         author:'Dr. Priya Sharma'  },
    { emoji:'💙', category:'Therapy',        date:'May 22, 2026',   title:'When to Seek Help: Signs You Would Benefit From Therapy',             summary:"Many people wait years before seeking professional support. Here's how to recognize the clear signs that talking to a therapist could genuinely transform your life for the better.",      author:'Dr. Rohan Verma'   },
    { emoji:'🌙', category:'Wellness',       date:'May 15, 2026',   title:'Sleep and Mental Health: The Bidirectional Relationship',             summary:'Poor sleep worsens anxiety and depression, while mental health conditions disrupt sleep. Understanding this interconnected cycle is the first step to lasting recovery.',                author:'Leila Nazari'      },
    { emoji:'🫁', category:'Breathwork',     date:'May 8, 2026',    title:'Box Breathing: A Navy SEAL Technique for Everyday Calm',             summary:'The tactical breathing technique used by elite military units directly activates your parasympathetic nervous system — and anyone can master it in under five focused minutes.',     author:'Arjun Mehta'       },
    { emoji:'🌱', category:'Growth',         date:'April 30, 2026', title:'Post-Traumatic Growth: How Adversity Can Become Your Strength',      summary:'Research shows many trauma survivors not only recover but develop deeper meaning, closer relationships, and expanded personal capability through the healing journey.',              author:'Dr. Fatima Zaidi'  },
    { emoji:'💬', category:'Relationships',  date:'April 22, 2026', title:'How to Have Difficult Conversations Without Damaging Relationships', summary:'The words we choose, the timing we select, and the emotional safety we create together can mean the difference between genuine connection and lasting irreparable conflict.',        author:'Dr. Meera Nair'    },
  ],

  faqCategories: [
    {
      label: 'GENERAL',
      items: [
        { q:'What is TKHO Wellness?',          a:'TKHO (The Key Happiness Outlet) is an early-stage mental wellness platform with guided exercises, mood reflection, educational content, and therapist discovery. Digital tools are not a replacement for qualified clinical care.' },
        { q:'Is TKHO Wellness free to use?',   a:'TKHO operates on a freemium model. The AI chatbot, mood tracker, and daily mindfulness tools are completely free. Human therapy sessions start at ₹900/hr. Students and low-income users may qualify for subsidised rates through our compassion fund.' },
        { q:'Is my data private and secure?',  a:"Absolutely. All sessions are end-to-end encrypted using AES-256. Your clinical data is never sold or shared with advertisers. You may request complete deletion of your account data at any time. We comply fully with India's DPDP Act 2023 and international GDPR standards." },
      ]
    },
    {
      label: 'AI THERAPY & FEATURES',
      items: [
        { q:'How does the AI chatbot work?',                               a:'The companion offers general wellness prompts and educational suggestions. It is not a therapist, does not monitor emergencies, and cannot guarantee clinical follow-up.' },
        { q:'Will the AI replace human therapists?',                      a:'No. Our AI is a supportive companion and first point of contact — not a replacement for clinical care. For diagnosis, medication, trauma therapy, or complex mental health needs, our licensed human professionals are always the recommended path forward.' },
        { q:'What therapeutic approaches do your therapists use?',        a:'Our therapists are trained across CBT (Cognitive Behavioural Therapy), DBT (Dialectical Behaviour Therapy), EMDR, Mindfulness-Based Therapy, Somatic Therapy, Narrative Therapy, and Person-Centred approaches depending on individual client needs.' },
        { q:'What makes TKHO different from ChatGPT or other AI chatbots?', a:'TKHO is purpose-built for mental wellness with trauma-informed guardrails, clinical supervision protocols, and seamless escalation to human therapists. We do not use generic AI — our model is continuously refined and validated by licensed clinicians.' },
      ]
    },
    {
      label: 'BOOKINGS & SESSIONS',
      items: [
        { q:'How do I book a therapy session?',          a:"Browse our Therapist Directory, select a professional that resonates with you, and click 'Book Session'. Choose your preferred date and time slot, optionally add session focus notes, and confirm. You will receive a secure video call link via email and in your dashboard." },
        { q:'Can I cancel or reschedule a session?',    a:'Yes. Cancellations or reschedules made at least 24 hours before the session incur no charge. Within 24 hours, a 50% cancellation fee applies to compensate the therapist for their reserved time slot and preparation.' },
        { q:'What technology do I need for sessions?',  a:'Just a stable internet connection and a device with a camera and microphone — any modern smartphone, tablet, or laptop works perfectly. No downloads are required; sessions run entirely in your browser via our encrypted WebRTC video room.' },
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
  chatOpen:        false,
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
    ? '☀️ Light mode activated — clean, bright, and clear.'
    : '🌙 Dark mode activated — elegant, focused, and premium.');
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

function openTherapistPortal() {
  window.location.href = 'Dr. Dashboard/therapist-dashboard.html';
}

function closeModal(id) {
  const el = $(id);
  if (el) el.classList.add('hidden');
}

function switchAuthTab(tab) {
  $('login-form-body').style.display  = tab === 'login'  ? 'block' : 'none';
  $('signup-form-body').style.display = tab === 'signup' ? 'block' : 'none';
  $('auth-tab-login').classList.toggle('active',  tab === 'login');
  $('auth-tab-signup').classList.toggle('active', tab === 'signup');
}

function doLogin() {
  const email = $('login-email').value.trim();
  const pass  = $('login-pass').value.trim();
  if (!email || !pass) { showToast('danger', '⚠️ Please enter your email and password.'); return; }
  STATE.currentUser = {
    name:    'Arjun Mehta',
    role:    'user',
    initial:  'A',
  };
  applyLoggedIn();
  closeModal('auth-modal');
  showToast('success', `✅ Welcome back, ${STATE.currentUser.name.split(' ')[0]}!`);
  navigate('dashboard');
}

function doSignup() {
  const fname = $('su-fname').value.trim();
  const lname = $('su-lname').value.trim();
  const email = $('su-email').value.trim();
  if (!fname || !lname || !email) { showToast('danger', '⚠️ Please fill in all required fields.'); return; }
  STATE.currentUser = {
    name:    `${fname} ${lname}`,
    role:    'user',
    initial: fname[0].toUpperCase(),
  };
  applyLoggedIn();
  closeModal('auth-modal');
  showToast('success', `✅ Welcome to TKHO, ${fname}! Your wellness journey begins now. 🌟`);
  navigate('dashboard');
}

function applyLoggedIn() {
  const u = STATE.currentUser;
  $('nav-auth-btns').style.display = 'none';
  document.querySelectorAll('.btn-therapist').forEach(button => {
    button.style.display = 'none';
  });
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

function logout() {
  STATE.currentUser = null;
  $('nav-auth-btns').style.display = 'flex';
  document.querySelectorAll('.btn-therapist').forEach(button => {
    button.style.display = '';
  });
  $('nav-user-pill').style.display = 'none';
  $('nav-dashboard').style.display        = 'none';
  $('mobile-nav-dashboard').style.display = 'none';
  showToast('info', '👋 You have been signed out. See you soon!');
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
  showToast('success', `✅ Mood "<strong>${mood}</strong>" tracked at ${ts}.`);
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
        <div class="tc-av">${t.emoji}</div>
        <div>
          <div class="tc-name">${t.name}</div>
          <div class="tc-title">${t.title}</div>
          <div class="tc-rating">⭐ ${t.rating} <span style="color:var(--text-3)">(${t.reviews} reviews)</span></div>
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
    showToast('info', '💡 Please log in first to book a session.');
    openAuth('login');
    return;
  }
  const t = DATA.therapists.find(x => x.id === therapistId);
  if (!t) return;

  $('bk-av').textContent    = t.emoji;
  $('bk-name').textContent  = t.name;
  $('bk-meta').textContent  = `${t.title} · ⭐ ${t.rating}`;
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
  closeModal('booking-modal');
  showToast('success', '✅ Session booked successfully! Check your dashboard for the video link.');
}

/* ══════════════════════════════════════════════════
   BLOG
══════════════════════════════════════════════════ */
function renderBlog() {
  const grid = $('blog-grid');
  if (!grid) return;
  grid.innerHTML = DATA.blogs.map((b, i) => `
    <div class="blog-card card-lift">
      <div class="blog-img">${b.emoji}</div>
      <div class="blog-body">
        <div class="blog-meta"><span class="cat">${b.category}</span> · ${b.date}</div>
        <div class="blog-title">${b.title}</div>
        <div class="blog-summary">${b.summary}</div>
        <div class="blog-footer">
          <span class="blog-author">✍️ ${b.author}</span>
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
    <div class="art-meta">${b.emoji} ${b.category} &middot; ${b.date} &middot; Written by ${b.author}</div>
    <p>${b.summary}</p>
    <p>Mental health is not a luxury — it is a fundamental pillar of human flourishing. Scientific research over the past three decades has transformed our understanding of how emotional wellbeing shapes everything from immune function to creative capacity, from relationship quality to professional performance across every domain of life.</p>
    <p>The evidence points to a compelling conclusion: investing in your psychological health is one of the highest-leverage actions you can take. Whether through professional therapy, daily mindfulness practice, social connection, or simply tracking your mood — every intentional act of self-care compounds into remarkable resilience and emotional intelligence over time.</p>
    <p>At TKHO Wellness, we are committed to making this journey accessible to every person. Our platform combines the warmth of human therapeutic connection with the accessibility of digital tools — meeting you wherever you are, at any hour of the day or night, with zero judgment.</p>
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
  const guest  = $('dash-guest-state');
  const logged = $('dash-logged-state');
  if (!guest || !logged) return;

  if (!STATE.currentUser) {
    guest.style.display  = 'block';
    logged.style.display = 'none';
    return;
  }

  guest.style.display  = 'none';
  logged.style.display = 'block';

  const isDoc    = STATE.currentUser.role === 'therapist';
  const avClass  = isDoc ? 'dash-av dash-av-doc' : 'dash-av dash-av-user';
  const navItems = isDoc
    ? [
        { id:'schedule', icon:'📅', label:'My Schedule'   },
        { id:'clients',  icon:'👥', label:'Client Roster' },
      ]
    : [
        { id:'overview', icon:'🏠', label:'Overview'          },
        { id:'bookings', icon:'📅', label:'Bookings'           },
        { id:'history',  icon:'📋', label:'Session History'    },
        { id:'reports',  icon:'📊', label:'Wellness Reports'   },
      ];

  $('dash-sidebar-inner').innerHTML = `
    <div class="dash-profile">
      <div class="${avClass}">${STATE.currentUser.initial}</div>
      <div class="dash-fullname">${STATE.currentUser.name}</div>
      <span class="badge ${isDoc ? 'badge-gold' : 'badge-blue'}">${isDoc ? '🩺 Therapist' : '👤 Patient'}</span>
    </div>
    <div class="dash-nav">
      ${navItems.map((item, i) => `
        <button class="dash-nav-btn${i === 0 ? ' active' : ''}" onclick="switchDashView('${item.id}', this)">
          <span class="dash-nav-icon">${item.icon}</span>${item.label}
        </button>`).join('')}
      <button class="dash-nav-btn" onclick="navigate('video')">
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
  return `
    <!-- OVERVIEW -->
    <div class="dash-view active" id="dv-overview">
      <div class="dash-welcome">
        <h3>Good day, ${first}! 🌟</h3>
        <p>Here is your wellness snapshot for today — keep going, you are doing great.</p>
      </div>
      <div class="dash-stats-row">
        <div class="dash-stat-box">
          <div class="dsb-label">Next Session</div>
          <div class="dsb-val" style="font-size:15px;margin-top:4px">Fri, Jun 6</div>
          <div class="dsb-sub">Dr. Ananya · 3:00 PM</div>
        </div>
        <div class="dash-stat-box">
          <div class="dsb-label">Sessions Done</div>
          <div class="dsb-val">7</div>
          <div class="dsb-sub">This month</div>
        </div>
        <div class="dash-stat-box">
          <div class="dsb-label">Mood Score</div>
          <div class="dsb-val" style="color:var(--accent)">7.4/10</div>
          <div class="dsb-sub">Weekly average</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div style="padding:16px;background:var(--bg-muted);border:1px solid var(--border);border-radius:12px">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--text-3);margin-bottom:10px">📅 UPCOMING</div>
          <div class="booking-card">
            <div class="booking-av">👩‍⚕️</div>
            <div class="booking-info">
              <div class="booking-name">Dr. Ananya Gupta</div>
              <div class="booking-time">Fri Jun 6 · 3:00 PM</div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="navigate('video')">Join</button>
          </div>
        </div>
        <div style="padding:16px;background:var(--bg-muted);border:1px solid var(--border);border-radius:12px">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--text-3);margin-bottom:10px">📈 MOOD TREND</div>
          ${[8,6,7,5,8,7,7].map((v,i)=>`
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">
              <span style="font-size:11px;color:var(--text-3);width:14px">${['M','T','W','T','F','S','S'][i]}</span>
              <div style="flex:1;height:7px;border-radius:4px;background:var(--border)">
                <div style="height:100%;border-radius:4px;width:${v*10}%;background:var(--accent)"></div>
              </div>
              <span style="font-size:11px;color:var(--text-3);min-width:10px">${v}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- BOOKINGS -->
    <div class="dash-view" id="dv-bookings">
      <div class="disclaimer-box">⚡ <strong>Reminder:</strong> Sessions start 5 min before scheduled time. Check your email for video call links.</div>
      <h3 style="font-size:17px;font-weight:800;margin-bottom:16px">Upcoming Sessions</h3>
      ${[
        {e:'👩‍⚕️',n:'Dr. Ananya Gupta',t:'Fri Jun 6 · 3:00 PM'},
        {e:'🧑‍⚕️',n:'Dr. Rohan Verma', t:'Mon Jun 9 · 11:00 AM'},
      ].map(b=>`
        <div class="booking-card">
          <div class="booking-av">${b.e}</div>
          <div class="booking-info">
            <div class="booking-name">${b.n}</div>
            <div class="booking-time">${b.t}</div>
          </div>
          <button class="btn btn-outline btn-sm" onclick="navigate('video')">Join Video Call</button>
        </div>`).join('')}
    </div>

    <!-- HISTORY -->
    <div class="dash-view" id="dv-history">
      <h3 style="font-size:17px;font-weight:800;margin-bottom:16px">Session History</h3>
      <div class="booking-card" style="flex-direction:column;align-items:flex-start">
        <div style="display:flex;gap:12px;margin-bottom:10px;width:100%;align-items:center">
          <div class="booking-av">👩‍⚕️</div>
          <div>
            <div class="booking-name">Dr. Ananya Gupta</div>
            <div class="booking-time">May 30, 2026 · Completed ✓</div>
          </div>
          <span class="badge badge-success" style="margin-left:auto">Done</span>
        </div>
        <div style="padding:12px 14px;background:var(--bg-muted);border-radius:10px;font-size:13px;color:var(--text-2);width:100%;line-height:1.68">
          📝 <em>Clinical notes:</em> Focused on breathing techniques and catastrophising patterns. Identified three core cognitive distortions. Homework assigned: 5-min morning journaling daily for two weeks.
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
        {d:'Jun 4',m:'Peaceful 😌', s:8},
        {d:'Jun 3',m:'Anxious 😰',  s:4},
        {d:'Jun 2',m:'Radiant 🤩',  s:9},
        {d:'Jun 1',m:'Neutral 😐',  s:6},
        {d:'May 31',m:'Down 😔',    s:3},
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
        <h3>Good morning, ${first}! 🩺</h3>
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
          <button class="btn btn-primary btn-sm" onclick="navigate('video')">Start Session</button>
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

/* ══════════════════════════════════════════════════
   CHATBOT WIDGET
══════════════════════════════════════════════════ */
const BOT_REPLIES = {
  'book':      "To book a session, visit the Therapist Directory, pick a professional, and click 'Book Session'. Choose a date, time, and add optional notes. 📅",
  'anxious':   "I hear you — anxiety is really tough. Try our Mindful Breathing tool on the homepage for immediate relief. Box breathing calms your nervous system in 2 minutes. Would you like me to connect you with one of our anxiety therapists? 💙",
  'depress':   "Thank you for sharing that with me. Depression is real and very treatable. Our therapists specialise in compassionate, evidence-based support. You are absolutely not alone in this. 💙",
  'therapist': "You can browse the professionals currently listed on TKHO and review their areas of focus. Please confirm credentials, availability, and suitability directly before beginning care.",
  'tkho':      "TKHO stands for The Key Happiness Outlet! We're a telehealth platform connecting people with mental health professionals through secure video sessions, plus free AI wellness tools to support your daily journey. 🌟",
  'price':     "Therapy sessions start at ₹900/hr. Our AI chatbot, mood tracker, and daily mindfulness tools are completely free. Students may qualify for subsidised rates through our compassion fund. 💰",
  'crisis':    "If you are in immediate danger, please call emergency services (112) or a crisis helpline right now. iCall: 9152987821 · Vandrevala Foundation: 1860-2662-345. You matter deeply. 🚨",
  'sleep':     "Sleep and mental health are deeply connected. Poor sleep can affect mood and stress. Try the Meditation Timer with the 'Sleep' preset as a gentle wind-down exercise; results vary from person to person. 🌙",
  'default':   "I'm here to support your wellness journey! Ask me about booking sessions, finding therapists, our tools, or just share what's on your mind. I'm always listening. 💙",
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
  if (STATE.chatOpen) {
    const badge = qs('.chat-unread');
    if (badge) badge.style.display = 'none';
  }
}

function addChatMessage(text, isUser) {
  const msgs = $('chat-messages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'chat-msg ' + (isUser ? 'user' : 'bot');
  const init = STATE.currentUser ? STATE.currentUser.initial : 'U';
  div.innerHTML = `
    <div class="msg-av ${isUser ? 'user' : 'bot'}">${isUser ? init : '🤖'}</div>
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
    <div class="msg-av bot">🤖</div>
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
    showToast('info', '👋 Welcome to TKHO Wellness! Toggle ☀️/🌙 in the header to switch themes.');
  }, 1800);

  /* 10. Nav scroll shadow on initial load */
  window.dispatchEvent(new Event('scroll'));
});

/* ============================================================
   TKOH WELLNESS — therapist-app.js  v2.0  COMPLETE
   ============================================================ */
'use strict';

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const THERAPIST = {
  name: 'Dr. Ananya Gupta',
  initial: 'A',
  specialty: 'Anxiety & Stress',
  email: 'ananya@tkohwellness.com'
};

const SESSIONS = [
  { id:1, time:'9:00 AM',  name:'Arjun Mehta',   type:'Anxiety · CBT',    status:'confirmed', sessions:7,  risk:'medium', diag:'Anxiety (GAD)' },
  { id:2, time:'11:00 AM', name:'Priya Sharma',  type:'Depression · DBT', status:'confirmed', sessions:12, risk:'high',   diag:'Depression' },
  { id:3, time:'2:00 PM',  name:'Rahul Kapoor',  type:'Relationships',    status:'pending',   sessions:3,  risk:'low',    diag:'Relationship Stress' },
  { id:4, time:'4:00 PM',  name:'Sneha Joshi',   type:'PTSD · EMDR',     status:'confirmed', sessions:9,  risk:'medium', diag:'PTSD' },
  { id:5, time:'5:30 PM',  name:'Vikram Tiwari', type:'Career Coaching',  status:'confirmed', sessions:5,  risk:'low',    diag:'Career Stress' },
];

const COMPLETED_SESSIONS = [
  { id:6, time:'May 30', name:'Arjun Mehta',  type:'Anxiety · CBT',    status:'done',   sessions:6,  diag:'Anxiety (GAD)' },
  { id:7, time:'May 29', name:'Priya Sharma', type:'Depression · DBT', status:'done',   sessions:11, diag:'Depression' },
  { id:8, time:'May 28', name:'Rahul Kapoor', type:'Relationships',    status:'done',   sessions:2,  diag:'Relationship Stress' },
];

const NOSHOW_SESSIONS = [
  { id:9, time:'May 27', name:'Leila Nair', type:'Anxiety', status:'noshow', sessions:4, diag:'Anxiety' },
];

const PATIENTS = [
  { id:1, name:'Arjun Mehta',   initial:'A', diag:'Anxiety (GAD)', age:29, sessions:7,  since:'Jan 2026', status:'Active',  risk:'medium', tags:['Anxiety','Mindfulness','CBT'],  note:'Showing improvement in breathing techniques.' },
  { id:2, name:'Priya Sharma',  initial:'P', diag:'Depression',    age:34, sessions:12, since:'Oct 2025', status:'Active',  risk:'high',   tags:['Depression','DBT','Grief'],     note:'Requires close monitoring — recent setback.' },
  { id:3, name:'Rahul Kapoor',  initial:'R', diag:'Relationship',  age:41, sessions:3,  since:'Apr 2026', status:'Active',  risk:'low',    tags:['Couples','Communication'],      note:'Making good progress in communication skills.' },
  { id:4, name:'Sneha Joshi',   initial:'S', diag:'PTSD',          age:27, sessions:9,  since:'Dec 2025', status:'Active',  risk:'medium', tags:['PTSD','EMDR','Trauma'],         note:'EMDR phase 3 — responding well.' },
  { id:5, name:'Vikram Tiwari', initial:'V', diag:'Career Stress', age:38, sessions:5,  since:'Feb 2026', status:'Active',  risk:'low',    tags:['Burnout','Career','Identity'],  note:'Stable. Career clarity improving.' },
  { id:6, name:'Leila Nair',    initial:'L', diag:'Anxiety',       age:25, sessions:4,  since:'Mar 2026', status:'On Hold', risk:'low',    tags:['Anxiety','CBT'],               note:'On hold — patient requested pause.' },
  { id:7, name:'Dev Rathore',   initial:'D', diag:'Depression',    age:31, sessions:8,  since:'Nov 2025', status:'Active',  risk:'medium', tags:['Depression','Mindfulness'],     note:'Medication adjustment — monitor mood.' },
  { id:8, name:'Kavya Singh',   initial:'K', diag:'OCD',           age:22, sessions:6,  since:'Jan 2026', status:'Active',  risk:'low',    tags:['OCD','ERP','CBT'],             note:'ERP exercises progressing well.' },
];

const RISK_ALERTS = [
  {
    id:1, patient:'Priya Sharma', level:'high', initial:'P',
    trigger:'Keyword detection: "hopeless", "can\'t go on"',
    time:'2 hours ago',
    desc:'AI detected high-distress language in session notes. Patient expressed hopelessness and mentions sleeping difficulties for 3+ weeks.',
    actions:['Call Patient','Review Notes','Notify Admin','Crisis Plan']
  },
  {
    id:2, patient:'Dev Rathore', level:'medium', initial:'D',
    trigger:'Missed last 2 sessions + mood score drop',
    time:'1 day ago',
    desc:'Patient has missed two consecutive sessions without contact. Mood tracking shows a 40% drop over past 10 days. Previous notes indicate isolation tendencies.',
    actions:['Send Message','Schedule Follow-up','Escalate']
  },
];

const NOTES_DATA = [
  { id:1, patient:'Arjun Mehta',  date:'May 30, 2026', preview:'Patient reported reduced anxiety episodes this week...', s:'Patient reports feeling calmer this week. Breathing exercises have been effective.', o:'Affect: neutral-positive. Eye contact maintained. No signs of distress.', a:'Anxiety (GAD) — improving. Progress noted in coping skills.', p:'Continue CBT exercises. Box breathing 2x daily. Review next session.', private:'Patient seems to be responding well. Consider reducing session frequency in 4 weeks.' },
  { id:2, patient:'Priya Sharma', date:'May 29, 2026', preview:'Patient continues to struggle with low motivation...', s:'Patient reports persistent low mood and lack of motivation. Sleep remains disturbed.', o:'Affect: flat. Psychomotor slowing observed. Tearful at times.', a:'MDD — moderate severity. No significant improvement this week.', p:'Increase session frequency. Review medication with psychiatrist. Crisis plan updated.', private:'High concern — monitor closely. Consider referral for medication review.' },
  { id:3, patient:'Rahul Kapoor', date:'May 28, 2026', preview:'Good communication progress with partner...', s:'Reports improved communication with partner. One argument this week resolved constructively.', o:'Mood elevated. Engaged throughout session. Positive body language.', a:'Relationship stress — improving significantly.', p:'Continue communication exercises. Practice active listening daily.', private:'Excellent progress. Possibly discharge in 3-4 sessions if trend continues.' },
];

const DOCS_DATA = [
  { icon:'📄', name:'CBT Thought Record',     type:'PDF · Worksheet', patients:'Assigned to 6 patients' },
  { icon:'📊', name:'Mood Tracking Sheet',    type:'PDF · Tool',      patients:'Assigned to 12 patients' },
  { icon:'🎵', name:'Guided Breathing Audio', type:'Audio · MP3',     patients:'Assigned to 8 patients' },
  { icon:'📖', name:'DBT Skills Workbook',    type:'PDF · Workbook',  patients:'Assigned to 4 patients' },
  { icon:'🧘', name:'Mindfulness Guide',      type:'PDF · Exercise',  patients:'Assigned to 10 patients' },
  { icon:'📝', name:'SOAP Note Template',     type:'DOCX · Template', patients:'Therapist use only' },
  { icon:'🎬', name:'Relaxation Video',       type:'Video · MP4',     patients:'Assigned to 5 patients' },
  { icon:'📋', name:'Safety Plan Template',   type:'PDF · Clinical',  patients:'Assigned to 3 patients' },
];

const INVOICES = [
  { patient:'Arjun Mehta',   date:'Jun 6, 2026', dur:'50 min', amount:'₹1,200', status:'paid' },
  { patient:'Priya Sharma',  date:'Jun 5, 2026', dur:'60 min', amount:'₹1,400', status:'paid' },
  { patient:'Rahul Kapoor',  date:'Jun 4, 2026', dur:'50 min', amount:'₹1,100', status:'pending' },
  { patient:'Sneha Joshi',   date:'Jun 3, 2026', dur:'60 min', amount:'₹1,600', status:'paid' },
  { patient:'Vikram Tiwari', date:'Jun 2, 2026', dur:'50 min', amount:'₹900',   status:'paid' },
  { patient:'Dev Rathore',   date:'Jun 1, 2026', dur:'50 min', amount:'₹1,200', status:'paid' },
];

const CONSENTS = [
  { name:'Arjun Mehta',   date:'Jan 12, 2026' },
  { name:'Priya Sharma',  date:'Oct 8, 2025' },
  { name:'Rahul Kapoor',  date:'Apr 2, 2026' },
  { name:'Sneha Joshi',   date:'Dec 5, 2025' },
  { name:'Vikram Tiwari', date:'Feb 18, 2026' },
];

const ACCESS_LOGS = [
  { who:'Dr. Ananya Gupta', action:'Viewed Priya Sharma records',    time:'Today, 11:42 AM' },
  { who:'Dr. Ananya Gupta', action:'Saved SOAP note — Arjun Mehta', time:'Today, 10:15 AM' },
  { who:'System',           action:'Automated backup completed',     time:'Today, 3:00 AM' },
  { who:'Dr. Ananya Gupta', action:'Uploaded CBT worksheet',         time:'Yesterday, 5:22 PM' },
  { who:'Admin',            action:'Compliance audit log reviewed',  time:'Jun 4, 9:00 AM' },
];

const AI_REPLIES = {
  soap:     'Here is a draft SOAP note:\n\n**S:** Patient reported reduced anxiety this week. Breathing exercises practiced daily. Mood rated 6/10.\n\n**O:** Affect neutral-positive. Good eye contact. No signs of acute distress.\n\n**A:** GAD — progressing. Coping skills improving with CBT framework.\n\n**P:** Continue exposure hierarchy. Review thought records next session. Assign box breathing twice daily.',
  summary:  'Session Summary (AI Draft):\nDuration: 52 min | Patient: Arjun Mehta | Date: Today\n\nKey themes: anxiety management, breathing techniques, work stress triggers. Patient demonstrated improved insight into cognitive distortions. No safety concerns raised. Homework compliance: 80%.',
  risk:     '⚠️ Risk Scan Results:\n• Priya Sharma — HIGH: distress language detected. Crisis plan review recommended.\n• Dev Rathore — MEDIUM: 2 missed sessions + mood decline.\n• All other patients: LOW risk. No immediate concerns.',
  plan:     'Suggested Treatment Plan for Arjun Mehta:\n1. Continue weekly CBT sessions for 4 more weeks\n2. Introduce exposure hierarchy for workplace anxiety\n3. Add progressive muscle relaxation to daily routine\n4. Consider transitioning to bi-weekly sessions in 6 weeks\n5. Reassess GAD severity scale at next session',
  template: 'Available SOAP Templates:\n📋 **CBT Session Note** — Suitable for anxiety/depression\n📋 **DBT Skills Note** — For emotional regulation focus\n📋 **Trauma-Informed Note** — For PTSD/EMDR sessions\n📋 **Crisis Session Note** — For high-risk presentations\n📋 **Intake Assessment** — First session structured template\n\nWhich template would you like me to populate?',
  insight:  'Patient Insights — Arjun Mehta:\n📈 Mood trend: Improving (+2.1 avg over 6 weeks)\n✅ Session attendance: 100% (7/7)\n📝 Homework compliance: 78%\n🎯 Goal progress: Anxiety management — 65% achieved\n⚠️ Watch: Workplace triggers remain elevated\n💡 Recommendation: Consider adding mindfulness-based stress reduction.',
  default:  'I can help you with:\n• 📝 Generate SOAP notes from session keywords\n• 📋 Create session summaries\n• ⚠️ Run risk assessments\n• 🎯 Suggest treatment plans\n• 📄 Provide clinical note templates\n• 💡 Generate patient insight reports\n\nWhat would you like to do?',
};

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
const STATE = {
  loggedIn: false,
  therapist: null,
  currentModule: 'overview',
  liveTimerInterval: null,
  liveSeconds: 0,
  theme: 'dark',
  calYear: new Date().getFullYear(),
  calMonth: new Date().getMonth(),
  calSelected: null,
  /* availability: dayKey -> array of slot objects {time, status} */
  availability: {},
  /* registered availability from reg form */
  regDays: ['Mon','Tue','Wed','Thu','Fri'],
  regSlots: ['9 AM','11 AM','2 PM'],
  livePatient: null,
};

/* ══════════════════════════════════════════
   UTILS
══════════════════════════════════════════ */
function $(id){ return document.getElementById(id); }
function $$(s){ return document.querySelectorAll(s); }
function pad2(n){ return String(n).padStart(2,'0'); }
function dateKey(y,m,d){ return `${y}-${pad2(m+1)}-${pad2(d)}`; }

function showToast(type, msg){
  const area = $('toast-area');
  if(!area) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span class="toast-msg">${msg}</span><button class="toast-x" onclick="this.parentElement.remove()">✕</button>`;
  area.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 280); }, 4200);
}

function getGreeting(){
  const h = new Date().getHours();
  if(h < 12) return 'morning';
  if(h < 17) return 'afternoon';
  return 'evening';
}

/* ══════════════════════════════════════════
   THEME
══════════════════════════════════════════ */
function toggleDashTheme(){
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  STATE.theme = isDark ? 'light' : 'dark';
  try { localStorage.setItem('tkoh-dash-theme', STATE.theme); } catch(e){}
  showToast('info', isDark ? '☀️ Light mode activated.' : '🌙 Dark mode activated.');
}

function initTheme(){
  try {
    const saved = localStorage.getItem('tkoh-dash-theme');
    if(saved){ document.documentElement.setAttribute('data-theme', saved); STATE.theme = saved; }
  } catch(e){}
}

/* ══════════════════════════════════════════
   AUTH — SHOW / HIDE VIEWS
══════════════════════════════════════════ */
function showLogin(){
  const lv = $('login-view'), rv = $('register-view');
  if(lv) lv.style.display = 'block';
  if(rv) rv.style.display = 'none';
  /* re-trigger animations */
  $$('.auth-anim-item').forEach(el => {
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = '';
  });
}

function showRegister(){
  const lv = $('login-view'), rv = $('register-view');
  if(lv) lv.style.display = 'none';
  if(rv) rv.style.display = 'block';
  /* re-trigger animations */
  $$('.reg-anim-item').forEach(el => {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = '';
  });
}

/* ══════════════════════════════════════════
   AUTH — LOGIN
══════════════════════════════════════════ */
function doAuthLogin(){
  const email = ($('login-email') || {}).value || '';
  const pass  = ($('login-password') || {}).value || '';
  if(!email.trim() || !pass.trim()){
    showToast('danger','⚠️ Please enter your credentials.');
    return;
  }
  STATE.loggedIn = true;
  STATE.therapist = { ...THERAPIST };
  /* use default reg days/slots */
  STATE.regDays  = ['Mon','Tue','Wed','Thu','Fri'];
  STATE.regSlots = ['9 AM','11 AM','2 PM'];
  enterDashboard();
}

/* ══════════════════════════════════════════
   AUTH — REGISTER
══════════════════════════════════════════ */
function doAuthRegister(){
  const fname = ($('reg-fname') || {}).value || '';
  const lname = ($('reg-lname') || {}).value || '';
  const email = ($('reg-email') || {}).value || '';
  const pass  = ($('reg-pass')  || {}).value || '';
  if(!fname.trim() || !lname.trim() || !email.trim() || !pass.trim()){
    showToast('danger','⚠️ Please fill all required fields.');
    return;
  }

  /* capture availability from checkboxes */
  STATE.regDays = [];
  $$('#reg-avail-grid input[type=checkbox]:checked').forEach(cb => {
    STATE.regDays.push(cb.value);
  });

  STATE.regSlots = [];
  $$('.reg-avail-grid input[type=checkbox]:checked').forEach(cb => {
    if(['9 AM','11 AM','2 PM','4 PM','6 PM'].includes(cb.value)){
      STATE.regSlots.push(cb.value);
    }
  });

  if(STATE.regDays.length === 0){
    showToast('danger','⚠️ Please select at least one available day.');
    return;
  }
  if(STATE.regSlots.length === 0) STATE.regSlots = ['9 AM','11 AM','2 PM'];

  STATE.loggedIn = true;
  STATE.therapist = {
    name: `Dr. ${fname.trim()} ${lname.trim()}`,
    initial: fname.trim()[0].toUpperCase(),
    specialty: ($('reg-specialty') || {}).value || 'General',
    email: email.trim()
  };
  enterDashboard();
}

/* ══════════════════════════════════════════
   ENTER / LEAVE DASHBOARD
══════════════════════════════════════════ */
function enterDashboard(){
  const auth = $('auth-screen');
  const dash = $('dashboard');
  if(auth) auth.style.display = 'none';
  if(dash) dash.classList.add('is-visible');

  const t = STATE.therapist;
  const setTxt = (id, val) => { const e=$(id); if(e) e.textContent = val; };
  setTxt('sb-av',   t.initial);
  setTxt('sb-name', t.name);
  setTxt('top-av',  t.initial);
  setTxt('greeting', `Good ${getGreeting()}, ${t.name.split(' ')[0]} 👋`);

  const nd = $('note-date');
  if(nd) nd.value = new Date().toISOString().split('T')[0];

  /* activate overview */
  $$('.module').forEach(m => m.classList.remove('active'));
  $$('.sbn').forEach(b => b.classList.remove('active'));
  const om = $('mod-overview'), ob = document.querySelector('.sbn[data-mod="overview"]');
  if(om) om.classList.add('active');
  if(ob) ob.classList.add('active');
  const tb = $('topbar-title');
  if(tb) tb.textContent = 'Dashboard Overview';
  STATE.currentModule = 'overview';

  /* seed availability from registered days/slots */
  seedAvailabilityFromReg();

  /* render all */
  renderOverviewSessions();
  renderOverviewAlerts();
  renderSessionsList('upcoming');
  renderPatients('');
  renderNotesList();
  renderRiskAlerts();
  renderDocs();
  renderInvoices();
  renderWeeklyChart();
  renderWeeklyTemplate();
  renderCalendar();
  renderConsents();
  renderAccessLogs();

  showToast('success', `✅ Welcome back, ${t.name.split(' ')[0]}! 3 sessions scheduled today.`);
  setTimeout(() => showToast('danger','⚠️ Risk Alert: Priya Sharma — high distress detected.'), 2500);
}

function doLogout(){
  STATE.loggedIn = false;
  const auth = $('auth-screen');
  const dash = $('dashboard');
  if(auth) auth.style.display = 'flex';
  if(dash) dash.classList.remove('is-visible');
  clearInterval(STATE.liveTimerInterval);
  closeLiveModal();
  showLogin();
  showToast('info','👋 Logged out. See you soon, Doctor.');
}

/* ══════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════ */
const MODULE_TITLES = {
  overview:'Dashboard Overview', sessions:'Session Management',
  patients:'Patient Management', notes:'Clinical Notes',
  risk:'Risk & Alerts', ai:'AI Clinical Assistant',
  docs:'Documents & Resources', analytics:'Dashboard Analytics',
  billing:'Earnings & Billing', availability:'Availability & Scheduling',
  privacy:'Privacy & Consent',
};

function switchModule(btn, modId){
  $$('.sbn').forEach(b => b.classList.remove('active'));
  $$('.module').forEach(m => m.classList.remove('active'));
  if(btn) btn.classList.add('active');
  const mod = $('mod-' + modId);
  if(mod) mod.classList.add('active');
  const tb = $('topbar-title');
  if(tb) tb.textContent = MODULE_TITLES[modId] || modId;
  STATE.currentModule = modId;
  if(window.innerWidth <= 900){ const sb=$('sidebar'); if(sb) sb.classList.remove('open'); }
  window.scrollTo({ top:0, behavior:'smooth' });
}

function toggleSidebar(){
  const sb = $('sidebar');
  if(sb) sb.classList.toggle('open');
}

/* ══════════════════════════════════════════
   LIVE SESSION MODAL
══════════════════════════════════════════ */
function openLiveModal(patient){
  STATE.livePatient = patient || SESSIONS[0];
  const modal = $('live-modal');
  if(!modal) return;

  /* populate patient info */
  const p = STATE.livePatient;
  const setTxt = (id,v) => { const e=$(id); if(e) e.textContent = v; };
  setTxt('live-doc-name',    STATE.therapist ? STATE.therapist.name.replace('Dr. ','') : 'Ananya Gupta');
  setTxt('live-patient-name', p.name);
  setTxt('lp-name',  p.name);
  setTxt('lp-diag',  p.diag || p.type);
  setTxt('lp-sess',  `Session #${p.sessions + 1}`);
  setTxt('lp-risk',  (p.risk || 'low').toUpperCase());

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  startLiveTimer();
  showToast('success', `🔴 Live session started with ${p.name}`);
}

function closeLiveModal(){
  const modal = $('live-modal');
  if(modal) modal.style.display = 'none';
  document.body.style.overflow = '';
  stopLiveTimer();
}

function endLiveSession(){
  const dur = Math.floor(STATE.liveSeconds / 60);
  closeLiveModal();
  showToast('success', `✅ Session ended — ${dur} min. Don't forget to save your notes.`);
}

function saveLiveNote(){
  const area = $('live-soap');
  if(!area || !area.value.trim()){ showToast('danger','Please write a note first.'); return; }
  showToast('success','📝 Session note saved.');
}

/* ══════════════════════════════════════════
   LIVE TIMER
══════════════════════════════════════════ */
function startLiveTimer(){
  clearInterval(STATE.liveTimerInterval);
  STATE.liveSeconds = 0;
  updateTimerDisplay();
  STATE.liveTimerInterval = setInterval(() => {
    STATE.liveSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopLiveTimer(){
  clearInterval(STATE.liveTimerInterval);
  STATE.liveTimerInterval = null;
}

function updateTimerDisplay(){
  const el = $('live-timer');
  if(!el) return;
  const m = Math.floor(STATE.liveSeconds / 60);
  const s = STATE.liveSeconds % 60;
  el.textContent = `${pad2(m)}:${pad2(s)}`;
}

/* ══════════════════════════════════════════
   RENDER: OVERVIEW
══════════════════════════════════════════ */
function renderOverviewSessions(){
  const el = $('ov-sessions');
  if(!el) return;
  el.innerHTML = SESSIONS.slice(0,4).map(s => `
    <div class="session-item">
      <div class="si-time">${s.time}</div>
      <div class="si-av">${s.name[0]}</div>
      <div style="flex:1;min-width:0">
        <div class="si-name">${s.name}</div>
        <div class="si-type">${s.type}</div>
      </div>
      <span class="si-status ${s.status}">${s.status}</span>
      <button class="si-join" onclick="openLiveModal(SESSIONS[${SESSIONS.indexOf(s)}])">Join →</button>
    </div>`).join('');
}

function renderOverviewAlerts(){
  const el = $('ov-alerts');
  if(!el) return;
  el.innerHTML = RISK_ALERTS.map(a => `
    <div class="alert-item ${a.level === 'medium' ? 'medium' : ''}">
      <div class="ai-name">${a.patient} <span class="risk-badge risk-${a.level}">${a.level.toUpperCase()}</span></div>
      <div class="ai-desc">${a.trigger}</div>
      <div class="ai-actions">
        <button class="ai-act primary" onclick="switchModule(document.querySelector('.sbn[data-mod=risk]'),'risk')">View Alert</button>
        <button class="ai-act outline" onclick="showToast('info','Alert dismissed.')">Dismiss</button>
      </div>
    </div>`).join('');
}

/* ══════════════════════════════════════════
   RENDER: SESSIONS
══════════════════════════════════════════ */
function renderSessionsList(tab){
  const el = $('sessions-list');
  if(!el) return;
  let list = tab === 'upcoming' ? SESSIONS : tab === 'completed' ? COMPLETED_SESSIONS : NOSHOW_SESSIONS;
  if(!list.length){
    el.innerHTML = `<div style="text-align:center;padding:48px;color:var(--text-3)">No sessions in this category.</div>`;
    return;
  }
  el.innerHTML = list.map((s,i) => `
    <div class="card" style="margin-bottom:12px">
      <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
        <div class="si-av" style="width:48px;height:48px;font-size:18px;flex-shrink:0">${s.name[0]}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:16px;font-weight:800">${s.name}</div>
          <div style="font-size:13px;color:var(--text-3)">${s.type} · Session #${s.sessions}</div>
        </div>
        <div style="font-size:15px;font-weight:800;color:var(--accent)">${s.time}</div>
        <span class="si-status ${s.status}">${s.status === 'noshow' ? 'No-Show' : s.status}</span>
        ${s.status !== 'done' && s.status !== 'noshow' ? `
          <button class="btn-primary btn-sm" onclick="openLiveModal(${tab === 'upcoming' ? 'SESSIONS' : 'COMPLETED_SESSIONS'}[${i}])">Join Session</button>
          <button class="btn-outline btn-sm" onclick="showToast('info','Rescheduling ${s.name}...')">Reschedule</button>
        ` : `
          <button class="btn-outline btn-sm" onclick="switchModule(document.querySelector('.sbn[data-mod=notes]'),'notes')">View Notes</button>
        `}
      </div>
    </div>`).join('');
}

function sessTab(btn, tab){
  $$('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderSessionsList(tab);
}

/* ══════════════════════════════════════════
   RENDER: PATIENTS
══════════════════════════════════════════ */
function renderPatients(query){
  const grid = $('patient-grid');
  if(!grid) return;
  const q = query.toLowerCase();
  const list = q ? PATIENTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.diag.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  ) : PATIENTS;
  if(!list.length){
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text-3)">No patients found.</div>`;
    return;
  }
  grid.innerHTML = list.map((p,i) => `
    <div class="patient-card">
      <div class="pc-head">
        <div class="pc-av">${p.initial}</div>
        <div>
          <div class="pc-name">${p.name}</div>
          <div class="pc-diag">${p.diag}</div>
        </div>
        <span class="risk-badge risk-${p.risk}" style="margin-left:auto">${p.risk}</span>
      </div>
      <div class="pc-info">
        <div class="pc-inf">Age: <strong>${p.age}</strong></div>
        <div class="pc-inf">Sessions: <strong>${p.sessions}</strong></div>
        <div class="pc-inf">Since: <strong>${p.since}</strong></div>
        <div class="pc-inf">Status: <strong>${p.status}</strong></div>
      </div>
      <div class="pc-tags">${p.tags.map(t => `<span class="pc-tag">${t}</span>`).join('')}</div>
      <div style="font-size:12px;color:var(--text-2);margin-bottom:14px;line-height:1.55">${p.note}</div>
      <div class="pc-actions">
        <button class="btn-primary btn-sm" onclick="openLiveModal(PATIENTS[${PATIENTS.indexOf(p)}])">Start Session</button>
        <button class="btn-outline btn-sm" onclick="switchModule(document.querySelector('.sbn[data-mod=notes]'),'notes')">Notes</button>
      </div>
    </div>`).join('');
}

function filterPatients(val){ renderPatients(val); }

/* ══════════════════════════════════════════
   RENDER: NOTES
══════════════════════════════════════════ */
function renderNotesList(){
  const el = $('notes-list');
  if(!el) return;
  el.innerHTML = NOTES_DATA.map((n,i) => `
    <div class="note-item${i===0?' active':''}" onclick="selectNote(${i},this)">
      <div class="ni-name">${n.patient}</div>
      <div class="ni-date">${n.date}</div>
      <div class="ni-preview">${n.preview}</div>
    </div>`).join('');
  selectNote(0, null);
}

function selectNote(idx, el){
  $$('.note-item').forEach(n => n.classList.remove('active'));
  if(el) el.classList.add('active');
  const n = NOTES_DATA[idx];
  if(!n) return;
  const setVal = (id,v) => { const e=$(id); if(e) e.value = v; };
  setVal('soap-s', n.s); setVal('soap-o', n.o);
  setVal('soap-a', n.a); setVal('soap-p', n.p);
  setVal('soap-private', n.private);
}

function openNoteEditor(){
  ['soap-s','soap-o','soap-a','soap-p','soap-private'].forEach(id => { const e=$(id); if(e) e.value=''; });
  showToast('info','📝 New note editor ready.');
}

/* ══════════════════════════════════════════
   RENDER: RISK ALERTS
══════════════════════════════════════════ */
function renderRiskAlerts(){
  const grid = $('risk-grid');
  if(!grid) return;
  grid.innerHTML = RISK_ALERTS.map(a => `
    <div class="card" style="border-left:4px solid var(--${a.level==='high'?'danger':'warning'})">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
        <div class="si-av" style="background:${a.level==='high'?'linear-gradient(135deg,#EF4444,#B91C1C)':'linear-gradient(135deg,#F59E0B,#D97706)'}">${a.initial}</div>
        <div style="flex:1">
          <div style="font-size:16px;font-weight:800">${a.patient}</div>
          <div style="font-size:12px;color:var(--text-3)">${a.time}</div>
        </div>
        <span class="risk-badge risk-${a.level}">${a.level.toUpperCase()}</span>
      </div>
      <div style="font-size:13px;font-weight:700;margin-bottom:6px">${a.trigger}</div>
      <div style="font-size:13px;color:var(--text-2);line-height:1.6;margin-bottom:14px">${a.desc}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${a.actions.map((ac,i) => `
          <button class="${i===0?'btn-danger':'btn-outline'} btn-sm" onclick="riskAction('${ac}','${a.patient}')">${ac}</button>
        `).join('')}
      </div>
    </div>`).join('');
}

function riskAction(action, patient){
  const msgs = {
    'Call Patient':       `📞 Initiating call to ${patient}...`,
    'Review Notes':       `📋 Opening notes for ${patient}...`,
    'Notify Admin':       `📧 Admin notified about ${patient}.`,
    'Crisis Plan':        `🆘 Crisis plan opened for ${patient}.`,
    'Send Message':       `💬 Message sent to ${patient}.`,
    'Schedule Follow-up': `📅 Follow-up scheduled for ${patient}.`,
    'Escalate':           `⚠️ Case escalated to senior clinician.`,
  };
  showToast(action==='Escalate'||action==='Notify Admin'?'danger':'success', msgs[action]||`Action: ${action}`);
  if(action==='Review Notes') switchModule(document.querySelector('.sbn[data-mod=notes]'),'notes');
}

/* ══════════════════════════════════════════
   AI ASSISTANT
══════════════════════════════════════════ */
function aiAction(type){
  addAiMsg('Give me ' + type + ' assistance.', true);
  setTimeout(() => addAiMsg(AI_REPLIES[type]||AI_REPLIES.default, false), 900);
}

function addAiMsg(text, isUser){
  const msgs = $('ai-msgs');
  if(!msgs) return;
  const div = document.createElement('div');
  div.className = 'ai-msg ' + (isUser ? 'user' : 'bot');
  div.innerHTML = `<div class="ai-msg-bub">${text.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function sendAiMsg(){
  const inp = $('ai-input');
  const msg = inp ? inp.value.trim() : '';
  if(!msg) return;
  addAiMsg(msg, true);
  inp.value = '';
  const lower = msg.toLowerCase();
  let reply = AI_REPLIES.default;
  for(const [key,val] of Object.entries(AI_REPLIES)){
    if(key !== 'default' && lower.includes(key)){ reply = val; break; }
  }
  setTimeout(() => addAiMsg(reply, false), 900);
}

function aiQuick(msg){
  const inp = $('ai-input');
  if(inp){ inp.value = msg; sendAiMsg(); }
}

/* ══════════════════════════════════════════
   RENDER: DOCUMENTS
══════════════════════════════════════════ */
function renderDocs(){
  const grid = $('docs-grid');
  if(!grid) return;
  grid.innerHTML = DOCS_DATA.map(d => `
    <div class="doc-card">
      <div class="dc-icon">${d.icon}</div>
      <div class="dc-name">${d.name}</div>
      <div class="dc-type">${d.type}</div>
      <div class="dc-patients">${d.patients}</div>
      <div style="display:flex;gap:8px;margin-top:14px">
        <button class="btn-primary btn-sm" onclick="showToast('success','Assigned to patient.')">Assign</button>
        <button class="btn-outline btn-sm" onclick="showToast('info','Downloading...')">Download</button>
      </div>
    </div>`).join('');
}

/* ══════════════════════════════════════════
   RENDER: ANALYTICS CHART
══════════════════════════════════════════ */
function renderWeeklyChart(){
  const el = $('weekly-chart');
  if(!el) return;
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const vals = [6,4,7,5,8,3,2];
  const max  = Math.max(...vals);
  el.innerHTML = days.map((d,i) => `
    <div class="bar-col">
      <div style="font-size:11px;color:var(--text-3);margin-bottom:4px">${vals[i]}</div>
      <div class="bar-fill" style="height:${Math.round(vals[i]/max*100)}px"></div>
      <div class="bar-label">${d}</div>
    </div>`).join('');
}

/* ══════════════════════════════════════════
   RENDER: BILLING / INVOICES
══════════════════════════════════════════ */
function renderInvoices(){
  const el = $('invoice-list');
  if(!el) return;
  el.innerHTML = INVOICES.map(inv => `
    <div class="inv-row">
      <span>${inv.patient}</span>
      <span>${inv.date}</span>
      <span>${inv.dur}</span>
      <span style="font-weight:800">${inv.amount}</span>
      <span class="inv-${inv.status}">${inv.status}</span>
    </div>`).join('');
}

/* ══════════════════════════════════════════
   RENDER: PRIVACY / CONSENT
══════════════════════════════════════════ */
function renderConsents(){
  const el = $('consent-list');
  if(!el) return;
  el.innerHTML = CONSENTS.map(c => `
    <div class="consent-row">
      <div>
        <div class="cr-name">${c.name}</div>
        <div class="cr-date">Signed ${c.date}</div>
      </div>
      <span class="cr-status">✓ Signed</span>
    </div>`).join('');
}

function renderAccessLogs(){
  const el = $('access-log');
  if(!el) return;
  el.innerHTML = ACCESS_LOGS.map(l => `
    <div class="al-row">
      <span>${l.time}</span>
      <strong>${l.who}:</strong> ${l.action}
    </div>`).join('');
}

/* ══════════════════════════════════════════
   AVAILABILITY — SEED FROM REGISTRATION
══════════════════════════════════════════ */
function seedAvailabilityFromReg(){
  /* Build a map of day-of-week name -> all matching dates this/next month */
  const today = new Date();
  const DOW_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  /* Seed next 4 weeks */
  for(let offset = 0; offset < 28; offset++){
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    const dayName = DOW_NAMES[d.getDay()];
    if(STATE.regDays.includes(dayName)){
      const key = dateKey(d.getFullYear(), d.getMonth(), d.getDate());
      if(!STATE.availability[key]){
        STATE.availability[key] = STATE.regSlots.map(time => ({
          time,
          status: Math.random() > 0.75 ? 'booked' : 'available'
        }));
      }
    }
  }
}

/* ══════════════════════════════════════════
   AVAILABILITY — CALENDAR
══════════════════════════════════════════ */
function renderCalendar(){
  const grid = $('cal-grid');
  const label = $('cal-month-label');
  if(!grid) return;

  const y = STATE.calYear, m = STATE.calMonth;
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  if(label) label.textContent = `${monthNames[m]} ${y}`;

  const firstDay = new Date(y, m, 1).getDay(); /* 0=Sun */
  const daysInMonth = new Date(y, m+1, 0).getDate();
  const today = new Date();
  const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let html = DOW.map(d => `<div class="cal-dow">${d}</div>`).join('');

  /* empty cells before first day */
  for(let i = 0; i < firstDay; i++) html += `<div class="cal-day cal-empty"></div>`;

  for(let d = 1; d <= daysInMonth; d++){
    const key = dateKey(y, m, d);
    const isToday = key === todayKey;
    const isSelected = key === STATE.calSelected;
    const slots = STATE.availability[key] || [];
    const hasBooked    = slots.some(s => s.status === 'booked');
    const hasAvailable = slots.some(s => s.status === 'available');
    const hasBlocked   = slots.length === 0 && STATE.regDays.includes(
      ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(y,m,d).getDay()]
    ) ? false : slots.length === 0;

    let cls = 'cal-day';
    if(isToday) cls += ' cal-today';
    else if(isSelected) cls += ' cal-selected';

    let dot = '';
    if(hasBooked)    dot += `<div class="cal-dot booked"></div>`;
    if(hasAvailable) dot += `<div class="cal-dot avail"></div>`;

    html += `<div class="${cls}" onclick="selectCalDay(${d})">${d}${dot}</div>`;
  }

  grid.innerHTML = html;
}

function calNav(dir){
  STATE.calMonth += dir;
  if(STATE.calMonth > 11){ STATE.calMonth = 0; STATE.calYear++; }
  if(STATE.calMonth < 0){  STATE.calMonth = 11; STATE.calYear--; }
  STATE.calSelected = null;
  renderCalendar();
  clearDayPanel();
}

function selectCalDay(d){
  const key = dateKey(STATE.calYear, STATE.calMonth, d);
  STATE.calSelected = key;
  renderCalendar();
  renderDaySlots(d, key);
}

function clearDayPanel(){
  const title = $('avail-day-title');
  const slots = $('avail-day-slots');
  if(title) title.textContent = 'Select a date';
  if(slots) slots.innerHTML = `<p style="color:var(--text-3);font-size:13px;padding:12px 0">Click a date on the calendar to manage slots.</p>`;
}

function renderDaySlots(d, key){
  const title = $('avail-day-title');
  const slotsEl = $('avail-day-slots');
  if(!title || !slotsEl) return;

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  title.textContent = `${d} ${months[STATE.calMonth]} ${STATE.calYear}`;

  const slots = STATE.availability[key] || [];
  if(!slots.length){
    slotsEl.innerHTML = `
      <p style="color:var(--text-3);font-size:13px;padding:8px 0 14px">No slots set for this date.</p>
      <button class="btn-primary btn-sm" onclick="addCustomSlot()">+ Add Time Slot</button>`;
    return;
  }

  slotsEl.innerHTML = slots.map((s,i) => `
    <div class="avail-slot-item slot-${s.status}" id="slot-item-${i}">
      <div>
        <div class="slot-time">${s.time}</div>
        <div class="slot-label">50 min session</div>
      </div>
      <div class="slot-actions">
        <span class="slot-status-badge ${s.status}">${s.status}</span>
        <select class="filter-sel" style="font-size:12px;padding:4px 8px" onchange="changeSlotStatus(${i},'${key}',this.value)">
          <option value="available" ${s.status==='available'?'selected':''}>Available</option>
          <option value="booked"    ${s.status==='booked'   ?'selected':''}>Booked</option>
          <option value="blocked"   ${s.status==='blocked'  ?'selected':''}>Blocked</option>
        </select>
        <button class="slot-del-btn" onclick="deleteSlot(${i},'${key}')" title="Remove slot">✕</button>
      </div>
    </div>`).join('');
}

function changeSlotStatus(idx, key, newStatus){
  if(!STATE.availability[key]) return;
  STATE.availability[key][idx].status = newStatus;
  renderDaySlots(parseInt(STATE.calSelected && STATE.calSelected.split('-')[2]), key);
  renderCalendar();
}

function deleteSlot(idx, key){
  if(!STATE.availability[key]) return;
  STATE.availability[key].splice(idx, 1);
  const d = parseInt(key.split('-')[2]);
  renderDaySlots(d, key);
  renderCalendar();
  showToast('info','Slot removed.');
}

function addCustomSlot(){
  if(!STATE.calSelected){
    showToast('danger','Please select a date on the calendar first.');
    return;
  }
  /* Show inline time picker */
  const slotsEl = $('avail-day-slots');
  if(!slotsEl) return;
  const existing = $('add-slot-form');
  if(existing){ existing.remove(); return; }

  const form = document.createElement('div');
  form.id = 'add-slot-form';
  form.style.cssText = 'display:flex;gap:8px;align-items:center;padding:12px;background:var(--bg-muted);border-radius:10px;margin-top:8px;border:1px solid var(--border);flex-wrap:wrap;';
  form.innerHTML = `
    <input type="time" id="new-slot-time" class="ai" style="max-width:130px;padding:7px 10px">
    <select class="filter-sel" id="new-slot-status">
      <option value="available">Available</option>
      <option value="blocked">Blocked</option>
    </select>
    <button class="btn-primary btn-sm" onclick="confirmAddSlot()">Add</button>
    <button class="btn-outline btn-sm" onclick="document.getElementById('add-slot-form').remove()">Cancel</button>`;
  slotsEl.appendChild(form);
}

function confirmAddSlot(){
  const timeInput = $('new-slot-time');
  const statusSel = $('new-slot-status');
  const key = STATE.calSelected;
  if(!timeInput || !timeInput.value || !key){ showToast('danger','Please pick a time.'); return; }

  /* Format 24h -> 12h */
  const [hh, mm] = timeInput.value.split(':').map(Number);
  const suffix = hh >= 12 ? 'PM' : 'AM';
  const h12 = hh % 12 || 12;
  const label = mm === 0 ? `${h12} ${suffix}` : `${h12}:${pad2(mm)} ${suffix}`;

  if(!STATE.availability[key]) STATE.availability[key] = [];
  STATE.availability[key].push({ time: label, status: statusSel.value });
  /* sort by time */
  STATE.availability[key].sort((a,b) => {
    const to24 = t => {
      const [tp, suf] = t.split(' ');
      let [h,min] = tp.split(':').map(Number);
      if(!min) min = 0;
      if(suf === 'PM' && h !== 12) h += 12;
      if(suf === 'AM' && h === 12) h = 0;
      return h*60+min;
    };
    return to24(a.time) - to24(b.time);
  });

  const d = parseInt(key.split('-')[2]);
  renderDaySlots(d, key);
  renderCalendar();
  showToast('success', `✅ Slot ${label} added.`);
}

function saveAvailability(){
  showToast('success','✅ Availability saved successfully!');
}

/* ══════════════════════════════════════════
   RENDER: WEEKLY TEMPLATE
══════════════════════════════════════════ */
function renderWeeklyTemplate(){
  const el = $('weekly-template-grid');
  if(!el) return;
  const ALL_DAYS  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const ALL_SLOTS = ['9 AM','11 AM','2 PM','4 PM','6 PM'];

  el.innerHTML = ALL_DAYS.map(day => {
    const isOn = STATE.regDays.includes(day);
    if(!isOn) return `
      <div class="wt-row">
        <span class="wt-day">${day}</span>
        <span class="wt-off">Off</span>
      </div>`;
    return `
      <div class="wt-row">
        <span class="wt-day">${day}</span>
        <div class="wt-slots">
          ${ALL_SLOTS.map(sl => `
            <span class="wt-slot ${STATE.regSlots.includes(sl)?'active':''}"
                  onclick="toggleTemplateSlot('${day}','${sl}',this)">${sl}</span>
          `).join('')}
        </div>
      </div>`;
  }).join('');
}

function toggleTemplateSlot(day, slot, el){
  el.classList.toggle('active');
  const isNowActive = el.classList.contains('active');
  if(isNowActive){
    if(!STATE.regSlots.includes(slot)) STATE.regSlots.push(slot);
  } else {
    STATE.regSlots = STATE.regSlots.filter(s => s !== slot);
  }
  showToast('info', `${day} ${slot} ${isNowActive ? 'enabled' : 'disabled'}.`);
}

/* ══════════════════════════════════════════
   GLOBAL EVENTS
══════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if(e.key === 'Enter'){
    if(document.activeElement === $('ai-input')) sendAiMsg();
  }
  if(e.key === 'Escape'){
    const modal = $('live-modal');
    if(modal && modal.style.display !== 'none') closeLiveModal();
  }
});

document.addEventListener('click', e => {
  const sb = $('sidebar');
  const toggle = document.querySelector('.sidebar-toggle');
  if(sb && sb.classList.contains('open') && !sb.contains(e.target) && e.target !== toggle){
    sb.classList.remove('open');
  }
  /* close live modal if clicking overlay */
  const modal = $('live-modal');
  if(modal && e.target === modal) closeLiveModal();
});

/* ══════════════════════════════════════════
   SOAP TAB SWITCH (live modal)
══════════════════════════════════════════ */
function initSoapTabs(){
  const tabs  = $$('.soap-tab');
  const labels = ['Subjective: Patient reported...','Objective: Observed affect...','Assessment: Clinical impression...','Plan: Next steps...'];
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const area = document.querySelector('.soap-area');
      if(area) area.placeholder = labels[i] || '';
    });
  });
}

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSoapTabs();

  /* Pre-fill demo hint */
  const em = $('login-email'), pw = $('login-password');
  if(em) em.placeholder = 'doc@tkoh.com';
  if(pw) pw.placeholder  = 'pass123';
});

/* ══════════════════════════════════════════
   AUTH BACKGROUND CANVAS ANIMATION
══════════════════════════════════════════ */
(function(){
  const canvas = document.getElementById('auth-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  function isDark(){ return document.documentElement.getAttribute('data-theme') === 'dark'; }
  function rnd(a,b){ return a + Math.random()*(b-a); }

  /* Particles */
  const PCNT = 55;
  const particles = Array.from({length:PCNT}, () => ({
    x: rnd(0,1), y: rnd(0,1),
    r: rnd(1.5,5), op: rnd(0.08,0.45),
    vx: rnd(-0.18,0.18)/1000, vy: rnd(-0.22,-0.06)/1000,
    pulse: rnd(0,Math.PI*2), ps: rnd(0.008,0.022),
  }));

  /* Waves */
  const waves = [
    {amp:38,freq:0.008,phase:0,  speed:0.008,op:0.07},
    {amp:28,freq:0.012,phase:2.1,speed:0.012,op:0.05},
    {amp:18,freq:0.018,phase:4.4,speed:0.016,op:0.04},
  ];

  /* Mandala rings */
  const rings = [
    {radius:180,segs:12,phase:0,   speed:0.003,op:0.06},
    {radius:120,segs:8, phase:1.57,speed:-0.005,op:0.05},
    {radius:260,segs:16,phase:0.8, speed:0.002,op:0.04},
  ];

  let t = 0, animFrame;

  function drawWave(w, baseY){
    ctx.beginPath();
    for(let x=0;x<=canvas.width;x+=4){
      const y = baseY
        + Math.sin(x*w.freq + w.phase + t*w.speed*60)*w.amp
        + Math.sin(x*w.freq*1.7 + w.phase*0.7 + t*w.speed*40)*(w.amp*0.4);
      x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.lineTo(canvas.width,canvas.height);
    ctx.lineTo(0,canvas.height);
    ctx.closePath();
    const dark = isDark();
    const g = ctx.createLinearGradient(0,baseY-w.amp,0,canvas.height);
    if(dark){ g.addColorStop(0,`rgba(91,74,232,${w.op})`); g.addColorStop(1,'rgba(91,74,232,0)'); }
    else     { g.addColorStop(0,`rgba(14,165,233,${w.op*1.4})`); g.addColorStop(1,'rgba(14,165,233,0)'); }
    ctx.fillStyle = g;
    ctx.fill();
  }

  function drawRing(ring, cx, cy){
    const dark = isDark();
    const col = dark ? `rgba(124,111,240,${ring.op})` : `rgba(14,165,233,${ring.op})`;
    ctx.strokeStyle = col;
    ctx.lineWidth = 1;
    ctx.setLineDash([4,8]);
    const angle = (Math.PI*2)/ring.segs;
    ctx.beginPath();
    for(let i=0;i<=ring.segs;i++){
      const a = i*angle + ring.phase + t*ring.speed*60;
      const x=cx+Math.cos(a)*ring.radius, y=cy+Math.sin(a)*ring.radius;
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.stroke();
    ctx.globalAlpha = ring.op*0.7;
    for(let i=0;i<ring.segs;i++){
      const a=i*angle+ring.phase+t*ring.speed*60;
      ctx.beginPath(); ctx.moveTo(cx,cy);
      ctx.lineTo(cx+Math.cos(a)*ring.radius, cy+Math.sin(a)*ring.radius);
      ctx.stroke();
    }
    ctx.globalAlpha=1; ctx.setLineDash([]);
  }

  function drawParticles(){
    const dark = isDark();
    particles.forEach(p => {
      p.pulse += p.ps;
      const scale = 1+Math.sin(p.pulse)*0.3;
      const op = p.op*(0.7+Math.sin(p.pulse)*0.3);
      const px = p.x*canvas.width, py = p.y*canvas.height;
      const g = ctx.createRadialGradient(px,py,0,px,py,p.r*scale*2.5);
      if(dark){ g.addColorStop(0,`rgba(180,160,255,${op})`); g.addColorStop(1,'rgba(91,74,232,0)'); }
      else     { g.addColorStop(0,`rgba(56,189,248,${op})`);  g.addColorStop(1,'rgba(14,165,233,0)'); }
      ctx.beginPath(); ctx.arc(px,py,p.r*scale*2.5,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if(p.y < -0.02){ p.y=1.02; p.x=Math.random(); }
      if(p.x < -0.02) p.x=1.02;
      if(p.x >  1.02) p.x=-0.02;
    });
  }

  function drawNeural(){
    const dark = isDark();
    const col = dark ? 'rgba(124,111,240,' : 'rgba(14,165,233,';
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=(particles[i].x-particles[j].x)*canvas.width;
        const dy=(particles[i].y-particles[j].y)*canvas.height;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){
          const op=(1-dist/120)*0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x*canvas.width, particles[i].y*canvas.height);
          ctx.lineTo(particles[j].x*canvas.width, particles[j].y*canvas.height);
          ctx.strokeStyle=col+op+')'; ctx.lineWidth=0.7; ctx.stroke();
        }
      }
    }
  }

  function drawBreathOrb(){
    const cx=canvas.width*0.5, cy=canvas.height*0.42;
    const pulse=(Math.sin(t*0.4)*0.5+0.5);
    const r=60+pulse*28;
    const dark=isDark();
    const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r*2.8);
    if(dark){
      g.addColorStop(0,`rgba(124,111,240,${0.14+pulse*0.08})`);
      g.addColorStop(0.4,`rgba(91,74,232,${0.07+pulse*0.04})`);
      g.addColorStop(1,'rgba(91,74,232,0)');
    } else {
      g.addColorStop(0,`rgba(56,189,248,${0.18+pulse*0.10})`);
      g.addColorStop(0.4,`rgba(14,165,233,${0.08+pulse*0.04})`);
      g.addColorStop(1,'rgba(14,165,233,0)');
    }
    ctx.beginPath(); ctx.arc(cx,cy,r*2.8,0,Math.PI*2);
    ctx.fillStyle=g; ctx.fill();
  }

  function animate(){
    animFrame = requestAnimationFrame(animate);
    t += 0.016;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = isDark() ? '#08080E' : '#F0F9FF';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    drawBreathOrb();
    const cx=canvas.width*0.5, cy=canvas.height*0.42;
    rings.forEach(r => drawRing(r,cx,cy));
    waves.forEach(w => drawWave(w, canvas.height*0.68));
    drawNeural();
    drawParticles();
  }

  /* Only run when auth is visible */
  const authEl = document.getElementById('auth-screen');
  function checkRun(){
    if(authEl && getComputedStyle(authEl).display !== 'none'){
      if(!animFrame) animate();
    } else {
      cancelAnimationFrame(animFrame);
      animFrame = null;
    }
  }
  new MutationObserver(checkRun).observe(authEl||document.body, {attributes:true,attributeFilter:['style','class']});
  animate();
})();

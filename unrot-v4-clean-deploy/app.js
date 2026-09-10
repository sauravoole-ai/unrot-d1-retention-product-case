import {
  QUIZZES, BUILDS, scoreQuiz, promptStrength, generatePrototypeResponse,
  makeAchievement, decodeProof, sharePayload, platformShareUrls, restorePrototypeState
} from './core.mjs';

const screen = document.getElementById('screen');
const progressBar = document.getElementById('progressBar');
const KEY = 'unrot-build-mode-v4';
const ORDER = ['lesson','level','quiz','result','choose','configure','test','achievement','tomorrow'];

const freshState = () => ({
  step:'lesson',
  track:'guided',
  level:null,
  quiz:null,
  category:null,
  builder:{...BUILDS.career},
  question:'What should I focus on next for an Applied AI internship?',
  response:null,
  achievement:null,
  reminder:null,
  leaderboardOpen:false
});

let state = loadState();

function loadState(){
  const defaults=freshState();
  try { return restorePrototypeState(JSON.parse(localStorage.getItem(KEY) || 'null'),defaults); } catch { return defaults; }
}
function saveState(){ try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }
function patch(next){ state = {...state, ...next}; saveState(); render(); }
function go(step){ patch({step}); }
function reset(){ try{ localStorage.removeItem(KEY); }catch{} state=freshState(); history.replaceState(null,'',location.pathname); render(); }
function esc(v=''){ return String(v).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])); }
function backButton(label='Back', action='back-lesson'){ return `<button class="back" data-action="${action}">← ${label}</button>`; }
function button(label, action, cls='primary'){ return `<button class="btn ${cls}" data-action="${action}">${label}</button>`; }
function progress(){ const idx=Math.max(0,ORDER.indexOf(state.step)); return Math.max(8,Math.round(((idx+1)/ORDER.length)*100)); }

function lessonScreen(){
  return `
    <div class="eyebrow orange">Course · Prompt Engineering Basics</div>
    <h1>Lesson complete. Now make it useful.</h1>
    <p class="lead">You just learned the structure behind clearer AI instructions. Build Mode turns that concept into something you can use—and something worth returning to improve.</p>

    <div class="lesson-context">
      <div class="lesson-head">
        <div><div class="lesson-title">Prompt Engineering Basics</div><div class="muted">Beginner · 5 min lesson</div></div>
        <div class="score-pill">Quiz 4/5 ✓</div>
      </div>
      <div class="lesson-points">
        <div class="lesson-point"><strong>Role</strong><span>Tell AI who to act as.</span></div>
        <div class="lesson-point"><strong>Context</strong><span>Give only what it needs.</span></div>
        <div class="lesson-point"><strong>Task + format</strong><span>Define the useful outcome.</span></div>
      </div>
    </div>

    <div class="build-hero">
      <div class="eyebrow orange">NEW · Build Mode</div>
      <div class="tagline">Learn. <span>Build.</span> Earn.</div>
      <p>Apply today’s concept to a tiny AI assistant, keep a shareable proof of the build, then upgrade the same artifact tomorrow.</p>
      <div class="hero-actions">
        ${button('Start Build Mode →','start-guided','primary')}
        ${button('Take Builder Challenge →','start-challenge','light')}
      </div>
      <div class="path-note">Guided path ≈ 2 min · Challenge path ≈ 3 min · both end in a build.</div>
    </div>`;
}

function levelScreen(){
  const levels=[
    ['beginner','1','Beginner','Prompting, hallucinations, safe use'],
    ['intermediate','2','Intermediate','RAG, embeddings, structured outputs'],
    ['advanced','3','Advanced','Evaluation, agents, guardrails']
  ];
  return `${backButton('Back to lesson','back-lesson')}
    <div class="eyebrow orange">Builder Challenge</div>
    <h1>Where are you with AI?</h1>
    <p class="lead">Choose the closest level. Five questions calibrate how much guidance your build gets—never whether you’re allowed to build.</p>
    <div class="grid3">${levels.map(([key,n,title,desc])=>`<button class="card-btn" data-level="${key}"><div class="icon">${n}</div><strong>${title}</strong><small>${desc}</small><span class="cta">Choose level →</span></button>`).join('')}</div>
    <p class="muted">About 90 seconds · 5 questions · no penalty for a lower score.</p>`;
}

function quizScreen(){
  const quiz=QUIZZES[state.level]||QUIZZES.beginner;
  return `${backButton('Change level','back-level')}
    <div class="quiz-meta"><div><div class="eyebrow orange">${esc((state.level||'beginner').toUpperCase())} Challenge</div><h1 style="font-size:44px">5 quick checks.</h1></div><span class="pill">≈ 90 sec</span></div>
    <form id="quizForm">
      ${quiz.map((q,i)=>`<fieldset class="question"><legend>${i+1}. ${esc(q[0])}</legend><div class="answers">${q[1].map((opt,j)=>`<label class="answer"><input type="radio" name="q${i}" value="${j}" required><span>${esc(opt)}</span></label>`).join('')}</div></fieldset>`).join('')}
      <button class="btn primary full" type="submit">Score & unlock my build →</button>
    </form>`;
}

function resultScreen(){
  const r=state.quiz;
  return `<div class="eyebrow orange">Challenge complete</div>
    <div class="score-panel">
      <div class="score-ring"><div><strong>${r.score}/${r.total}</strong><small>${r.score*20}%</small></div></div>
      <div><h1 style="font-size:46px">${esc(r.tier.label)}</h1><p class="lead">Your score changes the support level—not your access to Build Mode.</p></div>
    </div>
    <div class="unlock"><div class="eyebrow">Build mode unlocked</div><strong>${esc(r.tier.mode)}</strong><p>${r.tier.level===1?'Strong defaults and guidance stay visible while you build.':r.tier.level===2?'Useful defaults stay available, with room to customize the build.':'The build opens with lighter scaffolding and more room to make it your own.'}</p></div>
    <div class="hero-actions">${button('Choose what to build →','choose-build','primary')}${button('Retry challenge','retry-quiz','secondary')}</div>`;
}

function chooseScreen(){
  return `${backButton('Back',state.track==='challenge'?'back-result':'back-lesson')}
    <div class="eyebrow orange">Build Mode</div>
    <h1>What do you want to build?</h1>
    <p class="lead">One useful choice—no extra onboarding questionnaire.</p>
    <div class="build-grid">${Object.entries(BUILDS).map(([key,b])=>`<button class="build-card" data-build="${key}"><span class="emoji">${b.icon}</span><strong>${key==='custom'?'Something else':key[0].toUpperCase()+key.slice(1)}</strong><small>Build ${esc(b.name)}</small></button>`).join('')}</div>
    <p class="muted">You can edit the role, context and task before testing the assistant.</p>`;
}

function configureScreen(){
  const meter=promptStrength(state.builder);
  const level=state.quiz?.tier?.level || 1;
  return `${backButton('Change build','back-choose')}
    <div class="builder-header"><div><div class="eyebrow orange">Build Lab</div><h1>Build your ${esc(state.builder.name)}</h1></div><span class="builder-level">Builder Level ${level}</span></div>
    <p class="lead">Apply the exact structure from today’s lesson. Edit as much or as little as you want.</p>
    <span class="concept-chip-2">Role + Context + Task + Format</span>
    <form id="builderForm" class="form">
      <label><span class="field-label">Role</span><textarea name="role" rows="2">${esc(state.builder.role)}</textarea></label>
      <label><span class="field-label">Context</span><textarea name="context" rows="2">${esc(state.builder.context)}</textarea></label>
      <label><span class="field-label">Task + output</span><textarea name="task" rows="3">${esc(state.builder.task)}</textarea></label>
      <div class="prompt-meter"><div class="meter-copy"><span>Prompt structure</span><span id="meterLabel">${meter.label} · ${meter.percent}%</span></div><div class="meter-line"><span id="meterBar" style="width:${meter.percent}%"></span></div></div>
      <button class="btn primary full" type="submit">Build & test assistant →</button>
    </form>`;
}

function testScreen(){
  return `${backButton('Edit build','back-configure')}
    <div class="assistant-head"><div class="ai-mark">AI</div><div><div class="eyebrow orange">Your build is ready</div><h1 style="font-size:44px">${esc(state.builder.name)}</h1></div></div>
    <p class="lead">Try the assistant you just configured.</p>
    <form id="testForm" class="ask-row"><input name="question" value="${esc(state.question||'What should I focus on next?')}" aria-label="Question"><button class="btn dark" type="submit">Run assistant</button></form>
    ${state.response?`<div class="response"><strong>Example output</strong><ul>${state.response.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="sim">Simulated prototype response · no live model call.</div></div><div class="actions">${button('Create achievement card →','claim','primary')}</div>`:''}`;
}

function achievementScreen(){
  const a=state.achievement;
  const payload=sharePayload(a,location.origin+location.pathname);
  const urls=platformShareUrls(payload);
  const level=state.quiz?.tier?.level||1;
  return `<div class="eyebrow orange">Build complete</div>
    <h1>You made something. Keep the proof.</h1>
    <p class="lead">Recognition follows an applied build step—not just a completed lesson.</p>
    <article class="achievement">
      <div class="ach-top"><div class="ach-brand"><span class="brand-dot" style="display:inline-block;margin-right:6px"></span>unrot</div><span class="tiny">Build Mode</span></div>
      <div class="ach-level">${esc(a.title)}</div><h2>${esc(a.build)}</h2>
      <div class="ach-grid">
        <div><span>Skill demonstrated</span><strong>${esc(a.skill)}</strong></div>
        <div><span>Track</span><strong>${esc(a.track)}</strong></div>
        <div><span>Achievement ID</span><strong>${esc(a.id)}</strong></div>
        <div><span>Issued</span><strong>${esc(a.issuedOn)}</strong></div>
      </div>
    </article>
    <div class="share-wrap"><div class="eyebrow">Share build proof</div><div class="share-row">
      <a class="share-btn" target="_blank" rel="noopener" href="${urls.linkedin}"><span class="brand-icon linkedin">in</span>LinkedIn</a>
      <a class="share-btn" target="_blank" rel="noopener" href="${urls.x}"><span class="brand-icon x">X</span>X</a>
      <a class="share-btn" target="_blank" rel="noopener" href="${urls.whatsapp}"><span class="brand-icon wa">◔</span>WhatsApp</a>
      <button class="share-btn" data-action="native-share"><span class="brand-icon">↗</span>Share</button>
      <button class="share-btn" data-action="copy-proof"><span class="brand-icon">⧉</span>Copy link</button>
      <button class="share-btn" data-action="download-card"><span class="brand-icon">↓</span>Download card</button>
    </div><div id="shareStatus" class="share-status"></div></div>
    <div class="milestone"><div class="milestone-head"><div><div class="eyebrow">Next milestone</div><strong>Builder Level ${Math.min(3,level+1)}</strong></div><span class="pill">+1 applied build</span></div>
      ${state.track==='challenge'?`<div style="margin-top:13px"><button class="text-link" data-action="toggle-board">Preview weekly Builder Board</button>${state.leaderboardOpen?leaderboardPreview():''}</div>`:''}
    </div>
    <div class="actions">${button('See tomorrow’s upgrade →','tomorrow','primary')}</div>`;
}

function leaderboardPreview(){
  return `<div class="rank-preview"><div class="tiny">Concept preview only · production ranking would use real cohort data and transparent scoring.</div><table><tr><td>1</td><td>Aarav</td><td>Level 3 · 5 builds</td></tr><tr><td>2</td><td>Maya</td><td>Level 3 · 4 builds</td></tr><tr><td>3</td><td>Riya</td><td>Level 2 · 4 builds</td></tr><tr class="you"><td>—</td><td>You</td><td>Rank appears after real cohort scoring</td></tr></table></div>`;
}

function tomorrowScreen(){
  return `<div class="eyebrow orange">Day 1 return</div><h1>Your build continues tomorrow.</h1><p class="lead">Instead of returning for an unrelated lesson, improve the artifact you already own.</p>
    <div class="tomorrow"><small>TOMORROW · ≈ 5 MIN</small><h2>Make ${esc(state.builder.name)} more reliable</h2><p>Learn structured outputs → upgrade yesterday’s assistant → move toward the next Builder level.</p></div>
    <div class="eyebrow">When should Unrot remind you?</div><div class="reminders">${['Morning','Afternoon','Evening'].map(x=>`<button class="reminder ${state.reminder===x?'selected':''}" data-reminder="${x}">${x}</button>`).join('')}</div>
    <div class="saved ${state.reminder?'show':''}">✓ Return intention saved for ${esc(state.reminder||'')}. Prototype only—no real notification is scheduled.</div>
    <div class="actions">${button('Replay prototype','reset','secondary')}</div>`;
}

function proofScreen(proof){
  return `<div class="proof-wrap"><span class="proof-badge">Prototype achievement record</span><h1>Build proof</h1><p class="lead">This shareable record is encoded in the URL so it can be viewed independently of the original browser’s local storage. It is not an accredited or cryptographically signed credential.</p>
  <div class="proof-table">
    <div class="proof-row"><span>Achievement</span><strong>${esc(proof.title)}</strong></div>
    <div class="proof-row"><span>Build</span><strong>${esc(proof.build)}</strong></div>
    <div class="proof-row"><span>Skill</span><strong>${esc(proof.skill||'Applied Prompt Engineering')}</strong></div>
    <div class="proof-row"><span>Track</span><strong>${esc(proof.track||'Build Mode')}</strong></div>
    ${proof.quizScore?`<div class="proof-row"><span>Knowledge check</span><strong>${esc(proof.quizScore)}</strong></div>`:''}
    <div class="proof-row"><span>Achievement ID</span><strong>${esc(proof.id)}</strong></div>
    <div class="proof-row"><span>Issued</span><strong>${esc(proof.issuedOn||'')}</strong></div>
    <div class="proof-row"><span>Status</span><strong>${esc(proof.status||'Prototype achievement record')}</strong></div>
  </div>
  ${button('Open Build Mode prototype','clear-proof','primary')}</div>`;
}

function render(){
  const proofToken=location.hash.startsWith('#proof=') ? location.hash.slice(7) : null;
  if(proofToken){ const proof=decodeProof(proofToken); progressBar.style.width='100%'; screen.innerHTML=proof?proofScreen(proof):`<h1>Invalid proof link</h1><p class="lead">This prototype link could not be decoded.</p>${button('Open prototype','clear-proof','primary')}`; bind(); return; }
  progressBar.style.width=`${progress()}%`;
  const views={lesson:lessonScreen,level:levelScreen,quiz:quizScreen,result:resultScreen,choose:chooseScreen,configure:configureScreen,test:testScreen,achievement:achievementScreen,tomorrow:tomorrowScreen};
  screen.innerHTML=(views[state.step]||lessonScreen)();
  bind();
}

function bind(){
  document.querySelectorAll('[data-action]').forEach(node=>node.addEventListener('click',async()=>{
    const a=node.dataset.action;
    if(a==='reset-home'||a==='reset') return reset();
    if(a==='start-guided') return patch({track:'guided',quiz:null,step:'choose'});
    if(a==='start-challenge') return patch({track:'challenge',step:'level'});
    if(a==='back-lesson') return go('lesson');
    if(a==='back-level') return go('level');
    if(a==='back-result') return go('result');
    if(a==='back-choose') return go('choose');
    if(a==='back-configure') return go('configure');
    if(a==='back-before-choose') return go(state.track==='challenge'?'result':'lesson');
    if(a==='choose-build'||a==='guided-build') return go('choose');
    if(a==='retry-quiz') return go('quiz');
    if(a==='claim'){ const achievement=makeAchievement(state); return patch({achievement,step:'achievement'}); }
    if(a==='tomorrow') return go('tomorrow');
    if(a==='toggle-board') return patch({leaderboardOpen:!state.leaderboardOpen});
    if(a==='clear-proof'){ history.replaceState(null,'',location.pathname); return reset(); }
    if(a==='copy-proof'){
      const p=sharePayload(state.achievement,location.origin+location.pathname); const status=document.getElementById('shareStatus');
      try{await navigator.clipboard.writeText(p.url);status.textContent='Proof link copied.';}catch{status.textContent=p.url;}
    }
    if(a==='native-share'){
      const p=sharePayload(state.achievement,location.origin+location.pathname); const status=document.getElementById('shareStatus');
      if(navigator.share){try{await navigator.share(p);}catch{}}else status.textContent='Native share is unavailable here. Use a platform button or Copy link.';
    }
    if(a==='download-card') downloadAchievementCard();
  }));

  document.querySelectorAll('[data-level]').forEach(node=>node.addEventListener('click',()=>patch({level:node.dataset.level,quiz:null,step:'quiz'})));
  document.querySelectorAll('[data-build]').forEach(node=>node.addEventListener('click',()=>patch({category:node.dataset.build,builder:{...BUILDS[node.dataset.build]},response:null,achievement:null,step:'configure'})));
  document.querySelectorAll('[data-reminder]').forEach(node=>node.addEventListener('click',()=>patch({reminder:node.dataset.reminder,step:'tomorrow'})));

  const quizForm=document.getElementById('quizForm');
  if(quizForm) quizForm.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(quizForm);const answers={};for(const [k,v] of fd.entries())answers[k]=v;patch({quiz:scoreQuiz(state.level,answers),step:'result'});});

  const builderForm=document.getElementById('builderForm');
  if(builderForm){
    const refreshMeter=()=>{const fd=new FormData(builderForm);const draft={role:fd.get('role'),context:fd.get('context'),task:fd.get('task')};const m=promptStrength(draft);document.getElementById('meterLabel').textContent=`${m.label} · ${m.percent}%`;document.getElementById('meterBar').style.width=`${m.percent}%`;};
    builderForm.addEventListener('input',refreshMeter);
    builderForm.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(builderForm);patch({builder:{...state.builder,role:fd.get('role'),context:fd.get('context'),task:fd.get('task')},response:null,step:'test'});});
  }

  const testForm=document.getElementById('testForm');
  if(testForm) testForm.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(testForm);patch({question:String(fd.get('question')||'').trim(),response:generatePrototypeResponse(state.builder),step:'test'});});
}

function downloadAchievementCard(){
  const a=state.achievement; if(!a) return;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" rx="44" fill="#171717"/><circle cx="1080" cy="70" r="180" fill="#f36b2c" opacity=".18"/><circle cx="72" cy="70" r="11" fill="#f36b2c"/><text x="96" y="80" fill="white" font-size="34" font-family="Arial" font-weight="700">unrot</text><text x="72" y="210" fill="#ff9b6c" font-size="28" font-family="Arial" font-weight="700">${escapeXml(a.title)}</text><text x="72" y="292" fill="white" font-size="54" font-family="Arial" font-weight="700">${escapeXml(a.build)}</text><text x="72" y="370" fill="#bdb9b1" font-size="24" font-family="Arial">Skill: ${escapeXml(a.skill)}</text><text x="72" y="418" fill="#bdb9b1" font-size="24" font-family="Arial">${escapeXml(a.id)} · ${escapeXml(a.issuedOn)}</text><text x="72" y="548" fill="#8c8880" font-size="20" font-family="Arial">Concept prototype · not an accredited credential</text></svg>`;
  const blob=new Blob([svg],{type:'image/svg+xml'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='unrot-build-achievement.svg';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function escapeXml(s=''){return String(s).replace(/[<>&'"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c]));}

window.addEventListener('hashchange',render);
render();

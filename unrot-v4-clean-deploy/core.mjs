export const QUIZZES = {
  beginner: [
    ['A good prompt usually improves most when it has…',['More emojis','Clear context and instructions','Maximum length','Hidden access'],1],
    ['If AI confidently gives a false fact, that is commonly called…',['Caching','Hallucination','Embedding','Tokenization'],1],
    ['Which prompt element tells AI who it should act as?',['Role','Latency','Database','Theme'],0],
    ['Why specify an output format?',['To make responses more predictable','To increase internet speed','To train the model','To encrypt the prompt'],0],
    ['With sensitive personal data, the safest default is…',['Paste everything','Share only what is necessary and permitted','Ignore privacy settings','Use every tool equally'],1]
  ],
  intermediate: [
    ['RAG adds what to an LLM workflow?',['External retrieved context','A larger monitor','Automatic fine-tuning','A new programming language'],0],
    ['Embeddings are mainly useful for…',['Semantic similarity and retrieval','Password encryption','Rendering CSS','Image compression'],0],
    ['Structured output such as JSON helps…',['Constrain machine-readable responses','Increase GPU memory','Remove all hallucinations','Hide prompts'],0],
    ['Tool/function calling lets a model…',['Invoke defined external operations','Rewrite training data','Access any API without permission','Bypass authentication'],0],
    ['Lower temperature generally makes generation…',['More deterministic','Always longer','Always more expensive','Connected to live data'],0]
  ],
  advanced: [
    ['A strong AI feature evaluation uses…',['One impressive demo','Defined test cases, metrics and human review where needed','Model confidence only','Longer prompts'],1],
    ['A common RAG failure is…',['Irrelevant or incomplete retrieved context','Minified CSS','HTTPS','A profile photo'],0],
    ['Constraining an agent’s tools primarily helps…',['Reduce unsafe or unintended actions','Make every answer creative','Remove authorization','Avoid logging'],0],
    ['For high-impact AI actions, a useful guardrail is…',['Human approval before external action','More animation','Higher temperature','Hidden errors'],0],
    ['Tracking model/version and prompt changes helps…',['Attribute regressions','Guarantee perfect outputs','Avoid testing','Eliminate latency'],0]
  ]
};

export const BUILDS = {
  study:{name:'Study Assistant',icon:'🎓',role:'You are a focused AI study assistant.',context:'I am learning a technical topic and want concise guidance.',task:'Explain the next concept, then give one short practice task and a 3-bullet recap.'},
  career:{name:'Job Search Assistant',icon:'💼',role:'You are an AI career assistant.',context:'I am looking for Applied AI internships.',task:'Suggest the 3 most important skills I should improve, with one practical action for each.'},
  marketing:{name:'Content Assistant',icon:'✦',role:'You are an AI content assistant.',context:'I create educational content for working professionals.',task:'Turn one idea into 3 concise content angles, each with a clear audience benefit.'},
  custom:{name:'My AI Assistant',icon:'＋',role:'You are a helpful AI assistant.',context:'Help me with a practical task I care about.',task:'Give me a clear, useful output in a concise format.'}
};

export function restorePrototypeState(saved, defaults){
  const base={...defaults,builder:{...defaults.builder}};
  if(!saved || typeof saved!=='object' || Array.isArray(saved)) return base;
  const savedBuilder=saved.builder && typeof saved.builder==='object' && !Array.isArray(saved.builder) ? saved.builder : {};
  return {...base,...saved,builder:{...base.builder,...savedBuilder}};
}

export function builderTier(score=0){
  if(score===5) return {level:3,label:'Independent Builder',mode:'Advanced challenge'};
  if(score>=3) return {level:2,label:'Applied Builder',mode:'Standard challenge'};
  return {level:1,label:'Guided Builder',mode:'Guided build'};
}

export function scoreQuiz(level, answers={}){
  const quiz=QUIZZES[level] || QUIZZES.beginner;
  let score=0;
  quiz.forEach((q,i)=>{ if(Number(answers[`q${i}`])===q[2]) score++; });
  return {score,total:quiz.length,tier:builderTier(score)};
}

export function promptStrength(builder={}){
  const parts=[builder.role,builder.context,builder.task].map(v=>String(v||'').trim());
  const filled=parts.filter(Boolean).length;
  const usefulLength=parts.reduce((n,v)=>n+Math.min(v.length,90),0);
  const percent=Math.max(18,Math.min(100,Math.round((filled/3)*55 + usefulLength/270*45)));
  const label=percent>=68?'Strong structure':percent>=48?'Good start':'Needs detail';
  return {percent,label};
}

export function generatePrototypeResponse(builder={}){
  const text=`${builder.name||''} ${builder.context||''} ${builder.task||''}`.toLowerCase();
  if(text.includes('career')||text.includes('intern')) return ['Ship one applied LLM product','Strengthen backend/API fundamentals','Practice systematic AI evaluation'];
  if(text.includes('study')||text.includes('learn')) return ['Explain the concept back in your own words','Apply it to one tiny example','Write one question you still cannot answer'];
  if(text.includes('content')||text.includes('marketing')) return ['Lead with the audience problem','Show one concrete before/after','End with one small action'];
  return ['Define the outcome clearly','Add only necessary context','Specify the output format'];
}

export function makeAchievement(state, now=new Date()){
  const level=state.quiz?.tier?.level || 1;
  const build=state.builder?.name || 'AI Assistant';
  const seed=`${build}|${level}|${now.toISOString().slice(0,10)}`;
  let hash=0; for(const ch of seed) hash=(hash*31+ch.charCodeAt(0))>>>0;
  return {
    id:`UNROT-AIB-${hash.toString(36).toUpperCase().slice(-6).padStart(6,'0')}`,
    title:`AI Builder · Level ${level}`,
    build,
    skill:'Applied Prompt Engineering',
    issuedOn:now.toISOString().slice(0,10),
    track:state.track==='challenge'?'Builder Challenge':'Guided Build',
    quizScore:state.track==='challenge' && state.quiz ? `${state.quiz.score}/${state.quiz.total}` : null,
    status:'Prototype achievement record'
  };
}

function b64urlEncode(str){
  if(typeof Buffer!=='undefined') return Buffer.from(str,'utf8').toString('base64url');
  const bytes=new TextEncoder().encode(str); let bin=''; bytes.forEach(b=>bin+=String.fromCharCode(b));
  return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function b64urlDecode(str){
  if(typeof Buffer!=='undefined') return Buffer.from(str,'base64url').toString('utf8');
  const pad=str.replace(/-/g,'+').replace(/_/g,'/')+'==='.slice((str.length+3)%4);
  const bin=atob(pad); const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeProof(achievement){ return b64urlEncode(JSON.stringify(achievement)); }
export function decodeProof(token){
  try{ const value=JSON.parse(b64urlDecode(token));
    if(!value || typeof value!=='object' || !value.id || !value.build || !value.title) return null;
    return value;
  }catch{return null;}
}

export function sharePayload(achievement, origin){
  const token=encodeProof(achievement);
  const url=`${origin.replace(/#.*$/,'')}#proof=${token}`;
  const text=`I built ${achievement.build} and earned ${achievement.title} in this Unrot Build Mode concept prototype.`;
  return {title:achievement.title,text,url};
}

export function platformShareUrls(payload){
  const u=encodeURIComponent(payload.url), t=encodeURIComponent(payload.text);
  return {
    linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    x:`https://twitter.com/intent/tweet?text=${t}&url=${u}`,
    whatsapp:`https://wa.me/?text=${encodeURIComponent(`${payload.text} ${payload.url}`)}`
  };
}

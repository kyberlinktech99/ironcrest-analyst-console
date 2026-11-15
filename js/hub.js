(() => {
  const U=window.IRONCREST_UNIT1,S=window.IRONCREST_SITE;
  const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch{return null}};
  const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let last=null;
  const studio=(n,v)=>`academy/#unit/${n}${v?'/'+v:''}`;
  const link=(href,icon,title,text,small,ext)=>`<a class="hub-resource-link" href="${href}"><span class="hub-resource-icon">${icon}</span><div><h3>${title}</h3><p>${text}</p>${small?`<small>${small}</small>`:''}</div><b>${ext?'↗':'→'}</b></a>`;

  function home(){
    const cur=S.currentUnit,u=S.units[cur];
    return `
    <section class="hub-section hub-howto" aria-labelledby="howtoTitle"><div class="hub-heading"><div><p class="hub-kicker">START HERE</p><h2 id="howtoTitle">How this console works</h2><p>Everything is organized by AP unit. Open your unit, then work through three steps.</p></div></div>
      <ol class="hub-steps">
        <li><b>1 · Learn</b><span>Guided demos and flashcards introduce each topic.</span></li>
        <li><b>2 · Practice</b><span>Skills practice, simulations and MCQ/FRQ drills build the skill.</span></li>
        <li><b>3 · Investigate</b><span>Cases and the Evidence Lab: find what the evidence proves, then explain it.</span></li>
      </ol>
      <p class="hub-note">Your work saves in this browser. Choose a profile (top bar) on a shared device, and download your work when an activity asks you to hand it in.</p>
    </section>

    <section class="hub-feature hub-current" aria-labelledby="curTitle"><div class="hub-feature-copy"><p class="hub-kicker">THIS UNIT <span>UNIT ${cur}</span></p><h1 id="curTitle">${E(u.title)}</h1><p>${u.topics.map(t=>`<b>${t[0]}</b> ${E(t[1])}`).join(' · ')}</p><a class="hub-primary" href="${studio(cur)}">Open Unit ${cur} <span>→</span></a><small><a href="${studio(cur,'sims')}">Simulations</a> · <a href="${studio(cur,'resources')}">Trusted resources</a></small></div></section>

    <section id="units" class="hub-section" aria-labelledby="unitsTitle"><div class="hub-heading"><div><p class="hub-kicker">AP CYBERSECURITY</p><h2 id="unitsTitle">Units</h2><p>Each unit page has demos, skills practice, simulations, an investigation, flashcards, MCQ and FRQ practice, and trusted outside resources.</p></div><span class="hub-count">5 UNITS</span></div>
      <div class="hub-units">${[1,2,3,4,5].map(n=>{const x=S.units[n];return `<a class="hub-unit${n===cur?' current':''}" href="${studio(n)}"${n===cur?' aria-current="true"':''}><span class="hub-unit-n">UNIT ${n}${n===cur?' · NOW':''}</span><h3>${E(x.title)}</h3><p>${x.topics.map(t=>t[0]).join(' · ')}</p></a>`}).join('')}</div>
    </section>

    <section class="hub-section" aria-labelledby="toolsTitle"><div class="hub-heading"><div><p class="hub-kicker">TOOLS ACROSS UNITS</p><h2 id="toolsTitle">Analyst tools</h2><p>Use these when your teacher assigns them, or to go further.</p></div></div>
      ${link('evidence-lab/','LOG','Evidence Lab','Your own case file of log evidence. Enter the access code your teacher gives you.','CASE S01 · AP 4.2 · 4.4')}
      ${link('cti/','CTI','Threat Intelligence Desk','Connect real threat-actor reporting to AP concepts and reconstruct attacks.','AP 1.3 · REPORTS & POSTERS')}
      ${link('projects/','R&amp;D','Research projects','Choose a yearly cybersecurity project, scope it safely, and write your proposal.','24 IDEAS · 8 DOMAINS')}
      <p class="hub-note">Also: <a href="unit-simulations/">full simulation library</a> · <a href="resources/">trusted resources for every unit</a></p>
    </section>
    <footer class="hub-footer">IRONCREST CYBER PARTNERS <span>Training environment · Fictional cases, real analytical thinking.</span></footer>`;
  }

  function unit1Cases(){
    const topics={'U1-001':'1.2','U1-002':'1.3','U1-003':'1.1','U1-004':'1.4','U1-005':'1.5'};
    const state=c=>{const d=read('ironcrest-frq-'+c.packet);return d?.recordedAt&&d.reviewed?'Recorded':d&&Object.values(d.answers||{}).some(x=>String(x).trim())?'In progress':read('ironcrest-'+c.id.toLowerCase())?'In progress':'Ready to start'};
    return `<p class="hub-crumbs"><a href="./">Home</a> / <a href="${studio(1)}">Unit 1</a> / Investigations</p>
    <section id="investigations" class="hub-section"><div class="hub-heading"><div><p class="hub-kicker">UNIT 1 / INVESTIGATION LIBRARY</p><h2>Case investigations</h2><p>Follow the evidence. Build your case. Defend your conclusion.</p></div><span class="hub-count">05 CASES</span></div><div class="hub-cases">${U.catalog.map(c=>{const s=state(c);return `<article class="hub-case"><div class="hub-case-top"><span>CASE ${c.icon} <b>AP ${topics[c.id]}</b></span><span class="hub-state ${s==='In progress'?'working':''}">${s}</span></div><p class="hub-theme">${c.theme}</p><h3>${c.name}</h3><p class="hub-description">${c.description}</p><div class="hub-case-bottom"><span>Guided investigation · Final FRQ</span><button data-start="${c.id}">${s==='Recorded'?'Review':s==='In progress'?'Continue':'Start investigation'} →</button><button class="hub-brief" data-brief="${c.id}">Open case briefing</button></div></article>`}).join('')}</div></section>
    <section class="hub-section"><div class="hub-heading"><div><p class="hub-kicker">MORE UNIT 1 PRACTICE</p><h2>Shorter cases</h2></div></div>
      ${link('simulations/quiet-inbox.html','06','The Quiet Inbox','Branching case: investigate suspicious mailbox rules, choose containment, and respond when new evidence arrives.','20–25 MIN · AP 1.1 · 1.2')}
      ${link('simulations/ai-soc-triage.html','AI','AI-Powered SOC Triage','Alert or act? Prioritize an AI-sorted queue and decide where human review is needed.','18 MIN · AP 1.5 · SHIFT REPORT')}
    </section>
    <footer class="hub-footer">IRONCREST CYBER PARTNERS <span>Progress is saved in this browser. Recorded completion is not an automatic score.</span></footer>`;
  }

  U.landing=(host,start)=>{
    last={host,start};
    host.innerHTML=location.hash==='#investigations'?unit1Cases():home();
    host.onclick=e=>{const b=e.target.closest('button');if(b?.dataset.start)start(b.dataset.start,false);if(b?.dataset.brief)start(b.dataset.brief,true)};
    if(location.hash==='#units')host.querySelector('#units')?.scrollIntoView();
  };
  addEventListener('hashchange',()=>{if(!last||last.host.classList.contains('hidden'))return;if(['#investigations',''].includes(location.hash)||location.hash==='#units'){U.landing(last.host,last.start);if(location.hash!=='#units')scrollTo(0,0)}});
})();

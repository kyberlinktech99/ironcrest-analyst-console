/* Original classroom practice informed by the supplied 2026 AP exam excerpt. */
(() => {
  'use strict';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const verbs = {
    Identify: 'Give the requested concept, fact, or evidence.',
    Determine: 'Use the sources and appropriate criteria to reach a specific result.',
    Describe: 'Give relevant details about the process, pattern, or outcome.',
    Explain: 'Connect evidence to a reason: how or why does it support your conclusion?',
    Write: 'Provide a correctly formed command that produces the requested effect.'
  };
  const commandSource = device => ({id:'4',title:'Device configuration and command reference',lines:[
    `${device} runs Windows 11. This is a fictional, authorized remediation exercise.`,
    'Interface: Wi-Fi. Saved profiles: Bellweather-Guest; Bellweather_Guest.',
    'The device is disconnected. Remove only the saved near-match profile; retain the approved profile.',
    'Reference syntax: netsh wlan delete profile name="PROFILE_NAME" interface="INTERFACE_NAME"',
    'This command removes a stored wireless profile. It does not disable the access point or undo earlier credential exposure.'
  ],reference:true});
  const policySource = {id:'3',title:'Bellweather public-network policy — assessment scenario',lines:[
    'Employees may use a public guest network if its name looks familiar.',
    'Employees must use the corporate VPN when accessing internal business resources on public Wi-Fi.',
    'Sensitive customer records and work-account credentials require protection from unauthorized disclosure.',
    'This excerpt is an assessment stimulus: evaluate its rules; do not assume every rule is sufficient.'
  ]};
  function replayPacket(events) {
    return {
      id:'replay-v1',title:'Device Security Analysis · Public-network incident',
      intro:'Use the defender’s sources for BW-LT-22 to respond to Parts A–D. The attacker’s view and the employee’s form submission are not available as evidence in this task.',
      sources:[
        {id:'1',title:'Wireless and endpoint timeline · BW-LT-22',lines:events.filter(e=>e.kind==='wireless').map(e=>`${e.time} · ${e.source} · ${e.text}`)},
        {id:'2',title:'Identity timeline · employee account',lines:events.filter(e=>e.kind==='identity').map(e=>`${e.time} · ${e.text}`)},policySource,commandSource('BW-LT-22')
      ],
      parts:[
        {id:'A',title:'Detect the wireless attack',skill:'Detect Attacks',questions:[
          {id:'Ai',label:'A(i)',verb:'Determine',prompt:'the wireless attack best supported by Source 1.',criterion:'A defensible classification based on the wireless mechanism, rather than a list of possible attacks.'},
          {id:'Aii',label:'A(ii)',verb:'Describe',prompt:'two specific observations in Source 1 that indicate the attack named in A(i). Include source and line references.',criterion:'Two relevant observations are described accurately and tied to the classification; source lines are cited.'}
        ]},
        {id:'B',title:'Interpret identity evidence',skill:'Detect Attacks',questions:[
          {id:'Bi',label:'B(i)',verb:'Identify',prompt:'the unfamiliar source IP address recorded in Source 2.',criterion:'The requested address is identified precisely, without incorrectly identifying its owner.'},
          {id:'Bii',label:'B(ii)',verb:'Explain',prompt:'why Sources 1 and 2 do not establish that credentials were submitted to the portal or that the wireless event caused the later login. Cite evidence and identify one additional source you would need.',criterion:'The explanation distinguishes observed events from submission and causation, cites the sources, and names a relevant missing source.'}
        ]},
        {id:'C',title:'Improve the security policy',skill:'Mitigate Risk',questions:[
          {id:'Ci',label:'C(i)',verb:'Explain',prompt:'how you would modify the existing rule in Source 3, line 1 to reduce the risk illustrated by Source 1. Include a specific change and how it helps.',criterion:'A specific modification to the existing rule is connected to how it reduces the illustrated risk.'},
          {id:'Cii',label:'C(ii)',verb:'Describe',prompt:'what the VPN required by Source 3, line 2 protects and one limitation when an employee encounters a fraudulent credential portal.',criterion:'The response accurately describes the encrypted path and a relevant trust limitation.'}
        ]},
        {id:'D',title:'Apply a configuration change',skill:'Mitigate Risk',questions:[
          {id:'Di',label:'D(i)',verb:'Write',prompt:'one Windows command, using Source 4, that removes only the saved Bellweather_Guest profile from the Wi-Fi interface. Do not execute it.',command:true,criterion:'The command uses valid syntax and targets the requested profile and interface while preserving the approved profile.'},
          {id:'Dii',label:'D(ii)',verb:'Describe',prompt:'one effect of the change in D(i) on future connections and one risk from this incident that the change does not resolve.',criterion:'The response accurately describes a stored-profile effect and a remaining risk; it does not claim that deleting a profile disables an access point.'}
        ]}
      ],
      extension:{id:'E',title:'Risk-analysis extension',skill:'Analyze Risk · course extension',questions:[
        {id:'Ei',label:'E(i)',verb:'Identify',prompt:'one sensitive asset in Source 3 that could be affected by this incident.',criterion:'A specific asset is identified from the scenario.'},
        {id:'Eii',label:'E(ii)',verb:'Explain',prompt:'how the sensitivity of that asset should influence the decision to use public Wi-Fi. Distinguish potential harm from an observed outcome.',criterion:'The response connects sensitivity, exposure and potential impact without claiming unobserved harm.'}
      ]}
    };
  }
  function casePacket(c, state) {
    return {
      id:'signal-lost-v1',title:'Signal Lost · Source-based assessment',
      intro:'After investigating Signal Lost, complete Parts A–D as your final activity submission. Use the case sources and the evidence you unlocked. This investigation includes several devices and wireless observations; do not import events from the guided replay as if they were case evidence.',
      sources:[
        {id:'1',title:'Wireless Monitor · case records',lines:c.records.map(r=>`${r.id} · ${r.time} · ${r.user} · ${r.ip} · ${r.event} · ${r.resource} · ${r.details}`)},
        {id:'2',title:'Evidence Locker · only your unlocked sources',evidence:c.evidence.map((e,i)=>({...e,ref:'2.'+(i+1)})).filter(e=>state.unlocked.includes(e.id))},
        policySource,commandSource('BYOD-17 (hypothetical remediation snapshot; not an additional incident finding)')
      ],
      parts:[
        {id:'A',title:'Classify from the sources',skill:'Detect Attacks',questions:[
          {id:'Ai',label:'A(i)',verb:'Determine',prompt:'which wireless attack is best supported by records WLS-012 through WLS-015 in Source 1.',criterion:'The classification matches the mechanism shown by those records.'},
          {id:'Aii',label:'A(ii)',verb:'Describe',prompt:'two specific observations supporting A(i). Cite record IDs or unlocked evidence titles and explain what they show.',criterion:'Two relevant observations are described precisely and linked to the classification.'},
          {id:'Aiii',label:'A(iii)',verb:'Explain',prompt:'whether the records establish jamming, war driving, both, or neither. Distinguish what is supported from what you still need, using Source 1 and any relevant unlocked Source 2 evidence.',criterion:'RF disruption and reconnaissance are assessed separately with evidence; uncertainty and gaps match the sources actually available.'}
        ]},
        {id:'B',title:'Respect the evidence boundary',skill:'Detect Attacks',questions:[
          {id:'Bi',label:'B(i)',verb:'Identify',prompt:'the source address of the unfamiliar employee-portal login attempt in Source 1.',criterion:'The exact address is identified without asserting who owns it.'},
          {id:'Bii',label:'B(ii)',verb:'Explain',prompt:'what your available sources establish about credential exposure and later account activity. Include one specific evidence gap. Do not treat a login attempt as a successful login.',criterion:'The response uses the available evidence, separates exposure from use, and identifies a relevant missing source.'}
        ]},
        {id:'C',title:'Match protections to the threat',skill:'Mitigate Risk',questions:[
          {id:'Ci',label:'C(i)',verb:'Explain',prompt:'how to modify the existing rule in Source 3, line 1 to reduce the risk indicated in A(i). Include a specific example.',criterion:'A modification to the existing rule is tied to a relevant security benefit.'},
          {id:'Cii',label:'C(ii)',verb:'Describe',prompt:'one protection for users during a wireless availability disruption. Describe why a VPN does not prevent radio-frequency interference or make a fraudulent portal trustworthy.',criterion:'The protection addresses availability, and VPN limitations are accurately distinguished from confidentiality protection.'}
        ]},
        {id:'D',title:'Apply the hypothetical remediation',skill:'Mitigate Risk',questions:[
          {id:'Di',label:'D(i)',verb:'Write',prompt:'one command using Source 4 to remove only Bellweather_Guest from the Wi-Fi interface. This is a written configuration exercise; do not execute it.',command:true,criterion:'A valid command targets only the requested stored profile and interface.'},
          {id:'Dii',label:'D(ii)',verb:'Describe',prompt:'one consequence of D(i) for future connections and one reason the change is insufficient as a complete incident response.',criterion:'The stated consequence matches the command, and a remaining incident risk is accurately identified.'}
        ]}
      ],
      extension:{id:'E',title:'Risk-analysis extension',skill:'Analyze Risk · course extension',questions:[
        {id:'Ei',label:'E(i)',verb:'Determine',prompt:'what your available evidence supports about adversary skill or motivation. If evidence is insufficient, identify what you would request and why.',criterion:'The conclusion is appropriately limited by available evidence and avoids inferring capability or motive solely from disruption.'},
        {id:'Eii',label:'E(ii)',verb:'Explain',prompt:'which risk you would prioritize for Bellweather. Connect likelihood, asset sensitivity and potential impact to specific case observations.',criterion:'The prioritization connects evidence to likelihood and impact, while distinguishing potential harm from observed outcomes.'}
      ]}
    };
  }
  function mount(host, options) {
    const packet=options.packet, key='ironcrest-frq-'+packet.id;
    let draft,storageProblem=false;
    try {draft=JSON.parse(localStorage.getItem(key)||'null')} catch {storageProblem=true}
    if(!draft||typeof draft!=='object'||Array.isArray(draft))draft={};
    draft={answers:{},reviewed:false,recordedAt:null,...draft};
    if(!draft.answers||typeof draft.answers!=='object'||Array.isArray(draft.answers))draft.answers={};
    const questions=packet.parts.flatMap(p=>p.questions), all=[...questions,...packet.extension.questions];
    let recorded=!!draft.recordedAt && questions.every(q=>String(draft.answers[q.id]||'').trim()) && draft.reviewed===true;
    function sourceMarkup(source) {
      const body=source.evidence ? (source.evidence.length?source.evidence.map(e=>`<article class="frq-evidence"><h4>${escape(e.ref)} · ${escape(e.title)}</h4>${e.content}</article>`).join(''):'<p>No evidence unlocked yet. Return to the Evidence Locker to request evidence, or state the limitation in your response. This panel does not reveal locked evidence.</p>') : `<ol class="source-lines">${source.lines.map((line,i)=>`<li><span class="line-ref">${source.id}.${i+1}</span><span>${escape(line)}</span></li>`).join('')}</ol>`;
      return `<details class="frq-source" ${source.id==='1'?'open':''}><summary>Source ${source.id} · ${escape(source.title)}</summary>${body}${source.reference?'<p class="source-note">Use the command reference supplied above. Written response only; this page never executes commands.</p>':''}</details>`;
    }
    function partMarkup(part,optional=false) {
      return `<fieldset class="frq-part"><legend>Part ${part.id} · ${escape(part.title)}</legend><p class="skill-label">${escape(part.skill)}${optional?' · Optional; separate from core FRQ practice':''}</p>${part.questions.map(q=>`<div class="frq-question"><label for="${packet.id}-${q.id}"><span class="frq-part-number">${q.label}${optional?'':' · 1 practice point'}</span><strong>${q.verb}</strong> ${escape(q.prompt)}</label><p class="verb-cue" id="${packet.id}-${q.id}-cue">${escape(verbs[q.verb])}</p><textarea id="${packet.id}-${q.id}" data-frq-answer="${q.id}" rows="${q.command?3:q.verb==='Identify'||q.verb==='Determine'?3:5}" ${optional?'':'required'} ${q.command?'spellcheck="false" class="command-answer"':''} aria-describedby="${packet.id}-${q.id}-cue" placeholder="${q.command?'Enter the command as text…':'Respond in your own words…'}">${escape(draft.answers[q.id]||'')}</textarea></div>`).join('')}</fieldset>`;
    }
    host.innerHTML=`<div class="frq-workspace"><div class="frq-intro"><span class="frq-kicker">AP-STYLE FREE RESPONSE · ORIGINAL CLASSROOM PRACTICE</span><h2>${escape(packet.title)}</h2><p>${escape(packet.intro)}</p><p><strong>${questions.length} core practice points · Mitigate Risk + Detect Attacks.</strong> Answer each labeled subpart in your own words. Cite source/line numbers or record IDs when requested.</p><details class="frq-guide"><summary>Task verbs and exam alignment</summary><dl>${Object.entries(verbs).map(([v,d])=>`<dt>${v}</dt><dd>${d}</dd>`).join('')}</dl><p>The supplied 2026 exam information describes a 50-minute Device Security Analysis FRQ assessing Mitigate Risk and Detect Attacks. Analyze Risk is assessed elsewhere on the exam and is included here as a separate extension. This shorter topic practice is not an official exam question or a full-length mock exam.</p><p>Reference: AP Cybersecurity CED, printed pp. 147–148, 165–166 and 171–184. Practice criteria below are locally authored, not College Board scoring guidelines. A point requires the requested reasoning; naming a control is not the same as explaining how it works.</p></details></div><div class="frq-columns"><section class="frq-sources" aria-label="Assessment sources"><h3>Source packet</h3><p class="source-note">Use these defender-observable sources. Source 3 is a policy stimulus; Source 4 is a hypothetical configuration exercise.</p>${packet.sources.map(sourceMarkup).join('')}</section><form class="frq-form"><div class="frq-progress" role="status" aria-live="polite"></div>${packet.parts.map(p=>partMarkup(p)).join('')}<details class="frq-extension"><summary>Analyze Risk · optional extension</summary>${partMarkup(packet.extension,true)}</details><div class="frq-review"><h3>${options.finalActivity?'Finalize your activity':'Before you record'}</h3><p>PROVES / SUPPORTS / NEED: check the fact, qualify the inference, identify the gap.</p><label class="frq-check"><input type="checkbox" data-frq-review required ${draft.reviewed?'checked':''}><span>I checked that each response addresses its task verb, cites evidence where requested, and avoids claims the sources do not establish.</span></label><p class="frq-storage" role="status"></p><button type="submit" class="frq-primary">${options.finalActivity?'Record Final FRQ in this browser →':'Record written response →'}</button></div></form></div><section class="frq-recorded ${recorded?'':'hidden'}" aria-label="Recorded response"><h3>${options.finalActivity?'Final FRQ recorded · submit your copy to your teacher':'Response recorded · awaiting review'}</h3>${options.finalActivity?'<p>Your response is recorded locally. It has NOT been sent to your teacher. Copy or download it, upload or paste it into Schoology, and confirm submission there.</p>':''}<p>Completing the fields does not establish that an answer is correct. No automatic AP score has been assigned. A teacher should evaluate each subpart independently against the practice criteria.</p><div class="frq-recorded-content"></div><details class="frq-rubric"><summary>Practice review criteria · 0 or 1 point per core subpart</summary><p>These are evidence and reasoning criteria, not model answers. Assess each core subpart independently; do not automatically remove a later point solely because an earlier response was incorrect.</p>${questions.map(q=>`<p><strong>${q.label} · 1 point:</strong> ${escape(q.criterion)}</p>`).join('')}<p>The Analyze Risk extension is separate from the ${questions.length}-point core practice.</p></details><div class="frq-actions"><button type="button" data-frq-edit>Edit responses</button><button type="button" data-frq-copy>Copy response for teacher review</button><button type="button" data-frq-download>Download response (.txt)</button>${options.onContinue?'<button type="button" data-frq-continue class="frq-primary">Enter U1-002 · Signal Lost →</button>':''}</div><p class="frq-copy-status" role="status"></p>${options.caseId?window.IRONCREST_LEARNING.enrichment(options.caseId):''}</section>${options.legacy?`<details class="frq-legacy"><summary>Previously saved SOC assessment · preserved</summary><pre>${escape(options.legacy)}</pre></details>`:''}</div>`;
    const find=s=>host.querySelector(s), form=find('.frq-form');
    function save() {
      try {localStorage.setItem(key,JSON.stringify(draft));storageProblem=false} catch {storageProblem=true}
      find('.frq-storage').textContent=storageProblem?'Browser storage is unavailable. Keep this page open and copy your response before leaving.':'Draft saved in this browser. Recording does not send it to your teacher.';
    }
    function progress() {find('.frq-progress').textContent=`${questions.filter(q=>String(draft.answers[q.id]||'').trim()).length} of ${questions.length} core responses drafted · teacher review required`;}
    function reportText() {
      const sources=packet.sources.map(source=>{
        const lines=source.lines ? source.lines.map((line,i)=>`${source.id}.${i+1} ${line}`).join('\n') : source.evidence.length ? source.evidence.map(e=>{const text=document.createElement('div');text.innerHTML=e.content;return `${e.ref} ${e.title}\n${text.textContent}`}).join('\n\n') : 'No evidence unlocked at export.';
        return `Source ${source.id} — ${source.title}\n${lines}`;
      }).join('\n\n');
      return `${packet.title}\nOriginal classroom FRQ-style practice\nTeam: ${options.team||'Unassigned'}\nStatus: recorded locally, not scored; NOT submitted to teacher\nRecorded: ${draft.recordedAt}\n\n`+all.filter(q=>String(draft.answers[q.id]||'').trim()).map(q=>`${q.label} — ${q.verb} ${q.prompt}\n${draft.answers[q.id]}`).join('\n\n')+'\n\nSource packet at export\n'+sources+'\n\nCore practice criteria\n'+questions.map(q=>`${q.label}: ${q.criterion}`).join('\n');
    }
    function showRecorded() {
      form.classList.toggle('hidden',recorded);find('.frq-recorded').classList.toggle('hidden',!recorded);
      find('.frq-recorded-content').innerHTML=all.filter(q=>String(draft.answers[q.id]||'').trim()).map(q=>`<article><h4>${q.label} · ${q.verb}</h4><p>${escape(q.prompt)}</p><div class="frq-answer-text">${escape(draft.answers[q.id])}</div></article>`).join('');
      if(recorded&&storageProblem)find('.frq-copy-status').textContent='Browser storage is unavailable. Copy this response before leaving; it is only available in this open page.';
      window.IRONCREST_PROGRESS?.refresh();if(options.onStatus)options.onStatus(recorded);
    }
    form.addEventListener('input',e=>{
      if(e.target.dataset.frqAnswer){draft.answers[e.target.dataset.frqAnswer]=e.target.value;draft.reviewed=false;find('[data-frq-review]').checked=false;}
      if(e.target.matches('[data-frq-review]'))draft.reviewed=e.target.checked;
      draft.exportedRecord=null;draft.recordedAt=null;recorded=false;save();progress();window.IRONCREST_PROGRESS?.refresh();if(options.onStatus)options.onStatus(false);
    });
    form.addEventListener('submit',e=>{
      e.preventDefault();const missing=questions.find(q=>!String(draft.answers[q.id]||'').trim());
      if(missing){find(`[data-frq-answer="${missing.id}"]`).focus();find('.frq-progress').textContent='Respond to every core subpart before recording. Whitespace alone is not a response.';return;}
      if(!draft.reviewed){find('[data-frq-review]').focus();return;}
      draft.recordedAt=new Date().toISOString();recorded=true;save();showRecorded();find('.frq-recorded').scrollIntoView({block:'start',behavior:'smooth'});
    });
    find('[data-frq-edit]').onclick=()=>{recorded=false;draft.exportedRecord=null;draft.recordedAt=null;draft.reviewed=false;find('[data-frq-review]').checked=false;save();showRecorded();find('[data-frq-answer]').focus()};
    find('[data-frq-copy]').onclick=async()=>{
      try {await navigator.clipboard.writeText(reportText());draft.exportedRecord=draft.recordedAt;save();window.IRONCREST_PROGRESS?.refresh();find('.frq-copy-status').textContent='Copied. Paste into your class submission system for teacher review.'}
      catch {let area=find('.frq-copy-fallback');if(!area){area=document.createElement('textarea');area.className='frq-copy-fallback';area.setAttribute('aria-label','Response text to copy');find('.frq-recorded').appendChild(area)}area.value=reportText();area.focus();area.select();find('.frq-copy-status').textContent='Select and copy the response text below. Clipboard access was unavailable.'}
    };
    find('[data-frq-download]').onclick=()=>{if(!recorded)return;try{const blob=new Blob(['\ufeff'+reportText()],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=packet.id+'-'+(options.team||'team').replace(/[^a-z0-9-]/gi,'-')+'.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);draft.exportedRecord=draft.recordedAt;save();window.IRONCREST_PROGRESS?.refresh();find('.frq-copy-status').textContent='Download requested. Check your Downloads folder, then upload the file to Schoology and confirm submission there.'}catch{find('.frq-copy-status').textContent='Download could not start. Use Copy response instead.'}};
    if(options.onContinue)find('[data-frq-continue]').onclick=()=>{if(recorded)options.onContinue()};
    progress();showRecorded();find('.frq-storage').textContent=storageProblem?'Saved draft could not be read. Copy your work before leaving.':'Drafts stay in this browser; no response is sent automatically.';
  }
  window.IRONCREST_FRQ={mount,replayPacket,casePacket};
})();

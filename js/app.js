(()=>{const C=window.IRONCREST_CASE,$=s=>document.querySelector(s);let selected=null,pendingEvidence=null;
const defaults={credits:3,unlocked:[],timeline:[],notes:"",evidenceQuestions:{},evidenceAdded:[]};
const state=Object.assign(defaults,JSON.parse(localStorage.getItem("ironcrest-u1-001")||"{}"));const save=()=>localStorage.setItem("ironcrest-u1-001",JSON.stringify(state));
$("#acceptCase").onclick=()=>{$("#teamName").textContent=$("#roleSelect").value;$("#briefing").classList.add("hidden");$("#console").classList.remove("hidden");render()};
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{document.querySelectorAll("nav button,.view").forEach(x=>x.classList.remove("active"));b.classList.add("active");$("#"+b.dataset.view).classList.add("active");if(b.dataset.view==="assessment")renderAssessment()});
[...new Set(C.logs.map(x=>x.event))].sort().forEach(t=>$("#eventFilter").insertAdjacentHTML("beforeend","<option>"+t+"</option>"));
function renderLogs(){const q=$("#search").value.toLowerCase(),ef=$("#eventFilter").value,rf=$("#resultFilter").value;const rows=C.logs.filter(x=>(!q||Object.values(x).join(" ").toLowerCase().includes(q))&&(!ef||x.event===ef)&&(!rf||x.result===rf));$("#eventCount").textContent=rows.length+" events";$("#logRows").innerHTML=rows.map(x=>'<tr data-id="'+x.id+'"><td>'+x.time+'</td><td>'+x.user+'</td><td>'+x.ip+'</td><td>'+x.event+'</td><td class="result-'+x.result.toLowerCase()+'">'+x.result+'</td><td>'+x.resource+'</td></tr>').join("");document.querySelectorAll("#logRows tr").forEach(r=>r.onclick=()=>openEvent(r.dataset.id))}
["search","eventFilter","resultFilter"].forEach(id=>$("#"+id).addEventListener(id==="search"?"input":"change",renderLogs));$("#clearFilters").onclick=()=>{$("#search").value="";$("#eventFilter").value="";$("#resultFilter").value="";renderLogs()};
function openEvent(id){selected=C.logs.find(x=>x.id===id);$("#drawerTitle").textContent=selected.id+" // "+selected.event;$("#drawerBody").innerHTML=Object.entries(selected).map(([k,v])=>'<div class="detailrow"><span>'+k.toUpperCase()+'</span><span>'+v+'</span></div>').join("");$("#drawer").classList.remove("hidden")}
$("#closeDrawer").onclick=()=>$("#drawer").classList.add("hidden");
$("#pinEvent").onclick=()=>{if(!selected)return;showModal('<h2>Add '+selected.id+' to Case</h2><p><b>Why does this event matter?</b></p><p class="lead">Explain what you noticed or how it relates to your current hypothesis.</p><textarea id="eventReason" rows="4" placeholder="Analyst observation…" required oninput="document.getElementById('confirmPin').disabled=!this.value.trim()"></textarea><button type="button" id="confirmPin" class="primary modal-action" disabled onclick="window.ironcrestAddSelectedEvent()">ADD TO TIMELINE</button>');{const t=$("#eventReason"),b=$("#confirmPin");const validate=()=>{b.disabled=t.value.trim().length===0};t.addEventListener("input",validate);t.addEventListener("keyup",validate);t.addEventListener("change",validate);validate();b.onclick=()=>{if(!t.value.trim())return;state.timeline.push({type:"log",time:selected.time,title:selected.id+" — "+selected.event,source:selected.user+" · "+selected.ip+" · "+selected.resource,observation:t.value.trim()});save();renderTimeline();$("#modal").classList.add("hidden");$("#drawer").classList.add("hidden")}}};
function renderEvidence(){$("#creditDots").textContent=Array(state.credits).fill("●").join(" ")+" "+Array(3-state.credits).fill("○").join(" ");$("#evidenceCards").innerHTML=C.evidence.map(e=>{const u=state.unlocked.includes(e.id);return '<article class="ecard '+(u?"unlocked":"")+'"><small>'+(u?"UNLOCKED":"AVAILABLE // 1 CREDIT")+'</small><h3>'+e.title+'</h3><p>'+e.desc+'</p><button data-e="'+e.id+'">'+(u?"VIEW EVIDENCE":"REQUEST EVIDENCE")+'</button></article>'}).join("");document.querySelectorAll("[data-e]").forEach(b=>b.onclick=()=>requestEvidence(b.dataset.e))}
function requestEvidence(id){const e=C.evidence.find(x=>x.id===id);pendingEvidence=e;if(state.unlocked.includes(id))return showEvidence(e);if(state.credits<=0)return showModal("<h2>No credits remaining</h2><p>Work with the evidence your team has already collected.</p>");showModal('<h2>Evidence Request: '+e.title+'</h2><p>What investigative question are you trying to answer, and why would this source help?</p><textarea id="evidenceQuestion" rows="4" placeholder="Enter your investigative question…" required oninput="document.getElementById('confirmSpend').disabled=!this.value.trim()"></textarea><button type="button" id="confirmSpend" class="primary modal-action" disabled onclick="window.ironcrestSpendCredit()">SPEND 1 CREDIT & REVEAL</button>');{const t=$("#evidenceQuestion"),b=$("#confirmSpend");const validate=()=>{b.disabled=t.value.trim().length===0};t.addEventListener("input",validate);t.addEventListener("keyup",validate);t.addEventListener("change",validate);validate();b.onclick=()=>{if(!t.value.trim())return;state.credits--;state.unlocked.push(id);state.evidenceQuestions[id]=t.value.trim();save();renderEvidence();showEvidence(e)}}}
function showEvidence(e){const added=state.evidenceAdded.includes(e.id);showModal(e.content+'<div class="evidence-question"><small>YOUR INVESTIGATIVE QUESTION</small><p>'+esc(state.evidenceQuestions[e.id]||"Previously unlocked evidence")+'</p></div><button id="addEvidence" class="primary modal-action" '+(added?"disabled":"")+'>'+(added?"ADDED TO CASE":"ADD TO CASE")+'</button>');if(!added)$("#addEvidence").onclick=()=>{showModal(e.content+'<h3>Why does this evidence matter?</h3><p class="lead">Explain what it proves or supports in your investigation.</p><textarea id="evidenceReason" rows="4" placeholder="Analyst interpretation…" oninput="document.getElementById('confirmEvidence').disabled=!this.value.trim()"></textarea><button type="button" id="confirmEvidence" class="primary modal-action" disabled onclick="window.ironcrestAddEvidence()">ADD TO CASE FILE</button>');const t=$("#evidenceReason"),b=$("#confirmEvidence");const validate=()=>{b.disabled=t.value.trim().length===0};t.addEventListener("input",validate);t.addEventListener("keyup",validate);t.addEventListener("change",validate);validate();b.onclick=()=>{if(!t.value.trim())return;state.evidenceAdded.push(e.id);state.timeline.push({type:"evidence",time:"EVIDENCE",title:e.title,source:"Evidence Locker",observation:t.value.trim()});save();renderEvidence();renderTimeline();$("#modal").classList.add("hidden")}}}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function showModal(html){$("#modalBody").innerHTML=html;$("#modal").classList.remove("hidden")}$("#closeModal").onclick=()=>$("#modal").classList.add("hidden");
$("#timelineForm").onsubmit=e=>{e.preventDefault();if(!$("#timelineText").value.trim())return;state.timeline.push({type:"note",time:$("#timelineTime").value||"—",title:"Analyst Observation",source:"Manual entry",observation:$("#timelineText").value.trim()});$("#timelineTime").value=$("#timelineText").value="";save();renderTimeline()};
function sortTimeline(items){return items.map((x,i)=>({...x,_i:i})).sort((a,b)=>{const ta=/^\d\d:\d\d/.test(a.time)?a.time:"99:99:99",tb=/^\d\d:\d\d/.test(b.time)?b.time:"99:99:99";return ta.localeCompare(tb)})}
function renderTimeline(){const items=sortTimeline(state.timeline);$("#timelineList").innerHTML=items.length?items.map(x=>'<div class="entry '+x.type+'"><div class="entrytop"><span class="badge">'+x.type.toUpperCase()+'</span><b>'+esc(x.time)+'</b><button data-del="'+x._i+'" title="Remove finding">×</button></div><h3>'+esc(x.title)+'</h3><div class="entrysource">'+esc(x.source||"")+'</div><p><strong>Analyst observation:</strong> '+esc(x.observation)+'</p></div>').join(""):'<p class="hint">No findings in the case file yet.</p>';document.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{state.timeline.splice(+b.dataset.del,1);save();renderTimeline()});renderAssessment()}
$("#caseNotes").value=state.notes;$("#caseNotes").oninput=e=>{state.notes=e.target.value;save();$("#saveFlag").textContent="Saved.";renderAssessment()};
function renderAssessment(){if(!$("#statusTimeline"))return;$("#statusTimeline").textContent=state.timeline.length;$("#statusEvidence").textContent=state.unlocked.length+" / 3";$("#statusNotes").textContent=state.notes.trim()?"SAVED":"NONE";$("#assessmentFindings").innerHTML=state.timeline.length?'<small>CASE FILE FINDINGS</small>'+sortTimeline(state.timeline).map(x=>'<div class="mini-finding"><b>'+esc(x.time)+" · "+esc(x.title)+'</b><span>'+esc(x.observation)+'</span></div>').join(""):'<p class="hint">Your case file has no findings yet. Return to the investigation before making a disposition.</p>'}
$("#assessmentForm").onsubmit=e=>{e.preventDefault();state.assessment={disposition:$("#disposition").value,account:$("#account").value,happened:$("#happened").value,strongest:$("#strongest").value,proves:$("#proves").value,supports:$("#supports").value,need:$("#need").value,nextAction:$("#nextAction").value};save();$("#assessmentForm").classList.add("hidden");$("#submitted").classList.remove("hidden")};

// Explicit modal actions. These are exposed only as UI handlers; case state remains in this closure.
window.ironcrestAddSelectedEvent=()=>{
  const t=$("#eventReason"); if(!t||!t.value.trim()||!selected)return;
  state.timeline.push({type:"log",time:selected.time,title:selected.id+" — "+selected.event,source:selected.user+" · "+selected.ip+" · "+selected.resource,observation:t.value.trim()});
  save(); renderTimeline(); $("#modal").classList.add("hidden"); $("#drawer").classList.add("hidden");
};
window.ironcrestSpendCredit=()=>{
  const t=$("#evidenceQuestion"); if(!t||!t.value.trim()||!pendingEvidence||state.credits<=0)return;
  if(!state.unlocked.includes(pendingEvidence.id)){state.credits--;state.unlocked.push(pendingEvidence.id)}
  state.evidenceQuestions[pendingEvidence.id]=t.value.trim(); save(); renderEvidence(); showEvidence(pendingEvidence);
};
window.ironcrestAddEvidence=()=>{
  const t=$("#evidenceReason"); if(!t||!t.value.trim()||!pendingEvidence)return;
  if(!state.evidenceAdded.includes(pendingEvidence.id)){
    state.evidenceAdded.push(pendingEvidence.id);
    state.timeline.push({type:"evidence",time:"EVIDENCE",title:pendingEvidence.title,source:"Evidence Locker",observation:t.value.trim()});
  }
  save(); renderEvidence(); renderTimeline(); $("#modal").classList.add("hidden");
};

// Robust delegated handlers for dynamic modal controls.
// These run in capture phase so dynamically-created buttons work consistently
// across Chrome/Chromebook/Safari and do not depend on per-modal onclick binding.
document.addEventListener("input",e=>{
  const id=e.target&&e.target.id;
  if(id==="eventReason"){const b=$("#confirmPin");if(b)b.disabled=!e.target.value.trim()}
  if(id==="evidenceQuestion"){const b=$("#confirmSpend");if(b)b.disabled=!e.target.value.trim()}
  if(id==="evidenceReason"){const b=$("#confirmEvidence");if(b)b.disabled=!e.target.value.trim()}
},true);

document.addEventListener("click",e=>{
  const b=e.target&&e.target.closest?e.target.closest("button"):null;
  if(!b)return;
  if(b.id==="confirmPin"){
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    const t=$("#eventReason");if(!t||!t.value.trim()||!selected)return;
    state.timeline.push({type:"log",time:selected.time,title:selected.id+" — "+selected.event,source:selected.user+" · "+selected.ip+" · "+selected.resource,observation:t.value.trim()});
    save();renderTimeline();$("#modal").classList.add("hidden");$("#drawer").classList.add("hidden");return;
  }
  if(b.id==="confirmSpend"){
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    const t=$("#evidenceQuestion");if(!t||!t.value.trim()||!pendingEvidence||state.credits<=0)return;
    if(!state.unlocked.includes(pendingEvidence.id)){state.credits--;state.unlocked.push(pendingEvidence.id)}
    state.evidenceQuestions[pendingEvidence.id]=t.value.trim();save();renderEvidence();showEvidence(pendingEvidence);return;
  }
  if(b.id==="confirmEvidence"){
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    const t=$("#evidenceReason");if(!t||!t.value.trim()||!pendingEvidence)return;
    if(!state.evidenceAdded.includes(pendingEvidence.id)){
      state.evidenceAdded.push(pendingEvidence.id);
      state.timeline.push({type:"evidence",time:"EVIDENCE",title:pendingEvidence.title,source:"Evidence Locker",observation:t.value.trim()});
    }
    save();renderEvidence();renderTimeline();$("#modal").classList.add("hidden");return;
  }
},true);

function render(){renderLogs();renderEvidence();renderTimeline();renderAssessment()}render()})();
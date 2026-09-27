(()=>{const CASES=window.IRONCREST_CASES,$=s=>document.querySelector(s);let C=null,state=null,KEY="",selected=null,pendingEvidence=null,editingAssessment=false;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const showModal=html=>{$("#modalBody").innerHTML=html;$("#modal").classList.remove("hidden")},closeModal=()=>$("#modal").classList.add("hidden");
function defaults(c){return{credits:c.credits||3,unlocked:[],timeline:[],notes:"",evidenceQuestions:{},evidenceAdded:[],team:c.roles[0],assessment:null}}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function loadState(){KEY="ironcrest-"+C.id.toLowerCase();state=Object.assign(defaults(C),JSON.parse(localStorage.getItem(KEY)||"{}"));state.timeline=(state.timeline||[]).map(x=>x&&x.type?x:{type:"legacy",time:(x&&x.time)||"—",title:"Migrated Finding",source:"Legacy case file",observation:(x&&x.text)||"Imported finding."});save()}
function caseState(c){try{return JSON.parse(localStorage.getItem("ironcrest-"+c.id.toLowerCase())||"{}")}catch(e){return{}}}



const RANGE_STEPS=[
 {kicker:"08:38 // BELLWEATHER SATELLITE OFFICE",title:"Start with what normal looks like.",question:"What should you establish before deciding an observation is suspicious?",help:"Bellweather-Guest is the approved network. BW-LT-22 is connected normally. The SOC has no active alerts.",choices:[["baseline","The normal baseline"],["attack","The attack name"],["impact","The final impact"]],answer:"baseline",feedback:"Correct. A baseline gives you something defensible to compare later observations against."},
 {kicker:"08:39 // ATTACKER PERSPECTIVE",title:"The attacker looks before acting.",question:"What can the attacker learn from wireless observations?",help:"Watch the attacker workstation. This view is for learning the attack—not evidence the SOC automatically possesses.",choices:[["ssid","Network names, signal, channels and identifiers"],["passwords","Everyone's Wi-Fi passwords"],["files","Files stored on employee laptops"]],answer:"ssid",feedback:"Correct. Wireless reconnaissance can reveal network identifiers and characteristics. It does not magically reveal passwords or endpoint files."},
 {kicker:"08:40 // EMPLOYEE PERSPECTIVE",title:"A familiar-looking network appears.",question:"What is the most important difference between the two Bellweather network names?",help:"Look closely. Attackers benefit when people recognize the brand or general name and stop checking the exact identifier.",choices:[["dash","Bellweather-Guest uses a dash; Bellweather_Guest uses an underscore"],["signal","Only the signal strength matters"],["none","They are the same network"]],answer:"dash",feedback:"Exactly. The near-match SSID is designed to look familiar. Similarity is suspicious; authorization and infrastructure evidence make the classification stronger."},
 {kicker:"08:41 // EMPLOYEE INTERACTION",title:"The network asks for something sensitive.",question:"If the employee submits this form, what does that establish?",help:"Use evidence discipline. Do not jump from credential exposure to account compromise.",choices:[["exposure","Credentials were exposed to the simulated portal"],["compromise","The corporate account was definitely compromised"],["malware","Malware was installed"]],answer:"exposure",feedback:"Correct. Submission establishes credential exposure in this simulation. It does not prove later use or account access."},
 {kicker:"08:48 // SOC PERSPECTIVE",title:"Now the identity system sees something.",question:"What does the later successful login allow the analyst to say?",help:"Correlate the wireless story with identity activity, but separate observation from causation.",choices:[["supports","It supports possible unauthorized access and deserves correlation"],["caused","It proves the evil twin caused the login"],["benign","A success after failures is automatically benign"]],answer:"supports",feedback:"Correct. The unfamiliar login sequence supports the unauthorized-access hypothesis. More evidence is needed before claiming exactly how the credential was obtained or who used it."},
 {kicker:"AP EXAM LENS // TOPIC 1.3",title:"Name the mechanism from the evidence.",question:"Which AP concept best describes the impersonating wireless network?",help:"Use the mechanism—not merely the fact that public Wi-Fi was involved.",choices:[["evil","Evil Twin"],["jam","Jamming"],["war","War Driving"]],answer:"evil",feedback:"Correct. The near-match SSID, unauthorized infrastructure, client association and portal interaction support an EVIL TWIN classification."},
 {kicker:"DEFENDER REPLAY",title:"Now remove the omniscient view.",question:"Reconstruct the incident using only defender-observable evidence.",help:"The attacker workstation and employee experience are hidden. This is the transition from learning the mechanism to doing SOC work.",choices:[],answer:"",feedback:""}
];
let rangeStep=0,portalSubmitted=false;
const SOC_EVENTS=[
 ["08:38:12","WAP","Bellweather-Guest healthy // approved BSSID A4:77:19:20:11:03"],
 ["08:40:36","WAP SENSOR","New SSID Bellweather_Guest observed // -42 dBm"],
 ["08:40:44","WAP SENSOR","BSSID AA:91:7C:22:4F:10 not in approved inventory"],
 ["08:41:03","CLIENT","BYOD-17 associated to Bellweather_Guest"],
 ["08:41:19","WEB","Captive portal observed on Bellweather_Guest"],
 ["08:47:21","IDENTITY","LOGIN_FAILURE // unfamiliar source 198.51.100.44"],
 ["08:47:39","IDENTITY","LOGIN_FAILURE // unfamiliar source 198.51.100.44"],
 ["08:48:06","IDENTITY","LOGIN_SUCCESS // unfamiliar source 198.51.100.44"]
];
function renderWorkspace(){renderRange()}

function applyPerspectiveFocus(){
 const deck=$("#screenDeck"),cue=$("#focusCue"),label=$("#focusLabel"),instruction=$("#focusInstruction");
 const modes=[
  ["overview","EMPLOYEE + SOC","Establish the normal baseline before the attack begins."],
  ["attacker","ATTACKER WORKSTATION","Watch what the simulated adversary can observe. This is a teaching view—not SOC evidence."],
  ["employee","EMPLOYEE LAPTOP","Look closely at the Wi-Fi list. The employee must decide which network to trust."],
  ["employee","EMPLOYEE LAPTOP","Stay with the employee. Complete the simulated captive-portal interaction."],
  ["soc","IRONCREST SOC","The omniscient view is over. Follow what the defender can actually observe."],
  ["ap","AP EXAM LENS","Translate the experience into the exact AP concept and evidence boundaries."],
  ["soc","DEFENDER REPLAY","Use only defender-observable evidence to reconstruct the incident."]
 ];
 const m=modes[rangeStep]||modes[0];
 deck.className="screen-deck focus-"+m[0]+(rangeStep===6?" defender-only":"");
 label.textContent=m[1];instruction.textContent=m[2];
 cue.className="focus-cue focus-"+m[0];
 document.querySelectorAll(".screen-window").forEach(w=>{
   const p=w.dataset.perspective;
   const focused=m[0]==="overview"?(p==="employee"||p==="soc"):p===m[0];
   w.classList.toggle("is-focused",focused);
   w.classList.toggle("is-context",!focused);
 });
 if(m[0]==="ap")cue.scrollIntoView({behavior:"smooth",block:"nearest"});
}

function rangeEventsForStep(){
 if(rangeStep===0)return SOC_EVENTS.slice(0,1);
 if(rangeStep===1)return SOC_EVENTS.slice(0,1);
 if(rangeStep===2)return SOC_EVENTS.slice(0,3);
 if(rangeStep===3)return SOC_EVENTS.slice(0,5);
 return SOC_EVENTS;
}
function renderRange(){
 const s=RANGE_STEPS[rangeStep];
 applyPerspectiveFocus();
 $("#stageKicker").textContent=s.kicker;$("#stageTitle").textContent=s.title;$("#decisionQuestion").textContent=s.question;$("#decisionHelp").textContent=s.help;
 document.querySelectorAll(".ribbon-step").forEach((x,i)=>{x.classList.toggle("active",i===rangeStep);x.classList.toggle("done",i<rangeStep)});
 $("#rangeBack").disabled=rangeStep===0;
 const interactionGate=(rangeStep===2||rangeStep===3&&!portalSubmitted);
 $("#rangeNext").disabled=rangeStep===RANGE_STEPS.length-1||interactionGate;
 $("#rangeNext").textContent=rangeStep===2?"SELECT A NETWORK ON THE EMPLOYEE LAPTOP":rangeStep===3&&!portalSubmitted?"USE THE CAPTIVE PORTAL":rangeStep===0?"BEGIN EXERCISE →":rangeStep===RANGE_STEPS.length-2?"DEFENDER REPLAY →":rangeStep===RANGE_STEPS.length-1?"REPLAY ACTIVE":"CONTINUE →";
 $("#decisionChoices").innerHTML=s.choices.map(c=>'<button data-range-choice="'+c[0]+'">'+esc(c[1])+'</button>').join("");
 $("#decisionFeedback").textContent="";$("#decisionFeedback").className="decision-feedback";
 $("#attackerState").textContent=rangeStep>=1?"ACTIVE":"STANDBY";
 $("#employeeState").textContent=rangeStep>=2?"NETWORK CHANGE":"CONNECTED";
 $("#socState").textContent=rangeStep>=4?"ALERTING":"MONITORING";
 $("#attackerTerminal").innerHTML=attackerView();
 $("#rogueNetwork").classList.toggle("hidden",rangeStep<2);
 $("#fakePortal").classList.toggle("hidden",rangeStep!==3||portalSubmitted);
 $("#connectedToast").classList.toggle("hidden",!(rangeStep===3&&portalSubmitted));
 $("#metricWireless").textContent=rangeStep>=2?"ROGUE AP?":"NORMAL";$("#metricIdentity").textContent=rangeStep>=4?"SUSPICIOUS":"NORMAL";$("#metricAlerts").textContent=rangeStep>=4?"3":rangeStep>=2?"2":"0";
 $("#liveSocLog").innerHTML=rangeEventsForStep().map((e,i)=>'<div class="live-row '+(i===rangeEventsForStep().length-1?"latest":"")+'"><span>'+e[0]+'</span><b>'+e[1]+'</b><p>'+esc(e[2])+'</p></div>').join("");
 $("#apReveal").classList.toggle("hidden",rangeStep<5);
 $("#replayPanel").classList.toggle("hidden",rangeStep<6);
 $(".screen-deck").classList.toggle("defender-only",rangeStep===6);
 $("#decisionPanel").classList.toggle("hidden",rangeStep===6);
 if(rangeStep===6)renderReplay();
}
function attackerView(){
 if(rangeStep===0)return '<div class="term-line muted">ironcrest-range:~$ <span>training console ready</span></div><div class="term-line">No simulated adversary activity.</div>';
 if(rangeStep===1)return '<div class="term-line muted">SIMULATED WIRELESS OBSERVATION</div><div class="scan-head">SSID                 BSSID               CH   SIGNAL</div><div class="scan-row">Bellweather-Guest    A4:77:19:20:11:03    6   -48</div><div class="scan-row">Bellweather-Staff    8C:21:70:44:09:12   44   -61</div><div class="scan-row">Cafe-Free-WiFi       71:09:55:18:30:22   11   -72</div><div class="term-line accent">Target-like guest SSID observed.</div>';
 if(rangeStep>=2)return '<div class="term-line muted">SIMULATED ROGUE ACCESS POINT</div><div class="term-line">SSID     <b>Bellweather_Guest</b></div><div class="term-line">BSSID    <b>AA:91:7C:22:4F:10</b></div><div class="term-line">STATUS   <b class="red">BROADCASTING</b></div><div class="term-line">PORTAL   <b>credential prompt enabled</b></div>'+(portalSubmitted?'<div class="capture-box"><small>SIMULATED FORM EVENT</small><b>FORM_SUBMISSION RECEIVED</b><span>Training credentials exposed to portal</span></div>':'');
 return "";
}
function chooseRange(answer){
 const s=RANGE_STEPS[rangeStep],box=$("#decisionFeedback");
 const ok=answer===s.answer;box.textContent=ok?s.feedback:"Not quite. Re-read what this perspective actually establishes, then try again.";box.className="decision-feedback "+(ok?"correct":"incorrect");
 if(ok&&rangeStep===3&&!portalSubmitted)box.textContent+=" Use SIGN IN & CONNECT in the employee window to complete the exposure event.";
}
function advanceRange(){if(rangeStep<RANGE_STEPS.length-1){rangeStep++;renderRange()}}
function resetRange(){rangeStep=0;portalSubmitted=false;renderRange()}
function submitPortal(){portalSubmitted=true;renderRange();$("#decisionFeedback").textContent="SIMULATION EVENT: The fictional training credentials were submitted. That establishes exposure in this exercise—not later account use.";$("#decisionFeedback").className="decision-feedback correct"}
function renderReplay(){
 $("#replayLogs").innerHTML=SOC_EVENTS.slice(1).map(e=>'<div class="live-row"><span>'+e[0]+'</span><b>'+e[1]+'</b><p>'+esc(e[2])+'</p></div>').join("");
}
function classifyReplay(a){
 const f=$("#classifyFeedback");
 if(a==="evil"){f.innerHTML="<b>CORRECT // EVIL TWIN</b><p>The near-match SSID, unapproved BSSID, client association, and captive portal collectively support the classification. The later identity activity should be correlated, but does not by itself prove the wireless interaction caused the login.</p>";f.className="correct";$("#openSignalLost").classList.remove("hidden")}
 else {f.innerHTML="<b>NOT SUPPORTED BY THIS EVIDENCE</b><p>Focus on the mechanism visible in the telemetry: an impersonating access point. Jamming requires RF-interference/availability evidence; war driving requires reconnaissance evidence.</p>";f.className="incorrect"}
}

function switchWorkspace(name){document.querySelectorAll(".workspace-tab").forEach(b=>b.classList.toggle("active",b.dataset.workspace===name));document.querySelectorAll(".workspace-panel").forEach(p=>p.classList.toggle("active",p.id==="workspace-"+name))}
function queue(){C=null;$("#console").classList.add("hidden");$("#briefing").classList.remove("hidden");$("#caseBrief").classList.add("hidden");$("#queueView").classList.remove("hidden");renderWorkspace()}
function openBrief(id){C=CASES[id];if(!C)return;loadState();$("#queueView").classList.add("hidden");$("#caseBrief").classList.remove("hidden");$("#briefId").textContent=C.id;$("#briefPriority").textContent="PRIORITY: "+C.priority;$("#briefTitle").textContent=C.title;$("#briefText").textContent=C.brief;$("#briefMission").textContent=C.mission;$("#briefResources").textContent=C.credits+" investigation credits. Additional evidence has a cost.";$("#briefStandard").textContent=C.standard;$("#roleSelect").innerHTML=C.roles.map(r=>'<option>'+esc(r)+'</option>').join("");$("#roleSelect").value=state.team||C.roles[0]}


$("#screenDeck").onclick=e=>{
 const w=e.target.closest(".screen-window.is-context");if(!w||rangeStep===6)return;
 const p=w.dataset.perspective;$("#screenDeck").className="screen-deck focus-"+p+" manual-focus";
 document.querySelectorAll(".screen-window").forEach(x=>{x.classList.toggle("is-focused",x===w);x.classList.toggle("is-context",x!==w)});
 $("#focusLabel").textContent=p==="attacker"?"ATTACKER WORKSTATION":p==="employee"?"EMPLOYEE LAPTOP":"IRONCREST SOC";
 $("#focusInstruction").textContent="Context view opened. Use CONTINUE or BACK to return to the guided perspective.";
};
$("#rangeReset").onclick=resetRange;
$("#rangeBack").onclick=()=>{if(rangeStep>0){rangeStep--;renderRange()}};
$("#rangeNext").onclick=advanceRange;
$("#decisionChoices").onclick=e=>{const b=e.target.closest("[data-range-choice]");if(b)chooseRange(b.dataset.rangeChoice)};
$("#wifiPanel").onclick=e=>{const b=e.target.closest("[data-network]");if(!b)return;if(b.dataset.network==="rogue"&&rangeStep>=2){rangeStep=Math.max(rangeStep,3);renderRange()}else if(b.dataset.network==="approved"){$("#decisionFeedback").textContent="The approved network is Bellweather-Guest. In this exercise the employee later chooses the stronger near-match network.";$("#decisionFeedback").className="decision-feedback correct"}};
$("#portalSubmit").onclick=submitPortal;
$("#replayPanel").onclick=e=>{const b=e.target.closest("[data-classify]");if(b)classifyReplay(b.dataset.classify)};
$("#openSignalLost").onclick=()=>openBrief("U1-002");


const intelContent={
 human:'<h2>IC-001 // Credential Harvesting Patterns</h2><p class="lead">Intelligence is context, not proof that a specific case matches a campaign.</p><div class="intel-brief"><b>OBSERVED PATTERNS</b><ul><li>Messages may combine authority or impersonation with urgency or threatened negative consequences.</li><li>Credential-harvesting pages imitate trusted services and request authentication information.</li><li>Credential exposure establishes that credentials were revealed; it does not by itself prove later account access.</li></ul><b>ANALYST QUESTIONS</b><ul><li>What exact language attempts to influence the target?</li><li>Did the user actually enter credentials?</li><li>What identity evidence exists after the exposure?</li></ul></div>',
 identity:'<h2>IC-002 // Suspicious Authentication Activity</h2><p class="lead">Correlate authentication events before deciding an account was compromised.</p><div class="intel-brief"><b>HIGH-VALUE OBSERVATIONS</b><ul><li>Many failed attempts in a short period.</li><li>Unusual sign-in time or unfamiliar device/source.</li><li>A success following failures.</li><li>MFA changes, new sessions, mailbox rules, or other post-login activity.</li></ul><b>CAUTION</b><p>A failed login is not successful access. An unfamiliar device is suspicious context, not automatic proof of malicious activity.</p></div>',
 wireless:'<h2>IC-003 // Public Network Threats</h2><p class="lead">Identify the mechanism from observable evidence.</p><div class="intel-brief"><b>EVIL TWIN</b><p>An adversary-operated access point imitates a legitimate SSID so users connect through it.</p><b>JAMMING</b><p>Radio-frequency interference prevents legitimate wireless communication and affects availability.</p><b>WAR DRIVING</b><p>Wireless reconnaissance gathers information about networks while moving through an area.</p><b>PROTECTION</b><p>Verify the exact SSID, consider data sensitivity before joining open Wi-Fi, and understand that a VPN protects traffic confidentiality but does not stop RF jamming.</p></div>'
};
document.querySelectorAll("[data-intel]").forEach(b=>b.onclick=()=>showModal(intelContent[b.dataset.intel]||"<p>No briefing available.</p>"));
const drillContent={
 psn:'<h2>DRILL 01 // Proves or Supports?</h2><p class="lead">An identity log shows 12 failed attempts from an unfamiliar source followed by one successful login. The user has not yet been interviewed.</p><p><b>Claim:</b> “The attacker stole the user’s password and used it to access the account.”</p><button class="drill-choice" data-answer="psn-proves">PROVES</button><button class="drill-choice" data-answer="psn-supports">SUPPORTS</button><button class="drill-choice" data-answer="psn-need">NEED MORE EVIDENCE</button><div id="drillFeedback" class="drill-feedback"></div>',
 auth:'<h2>DRILL 02 // Authentication Triage</h2><p class="lead">02:13 — four failed password attempts from an unknown browser. 02:14 — successful login from that browser. 02:17 — MFA settings changed.</p><p><b>Which observation most strongly strengthens the hypothesis of unauthorized post-login activity?</b></p><button class="drill-choice" data-answer="auth-fails">The failed attempts</button><button class="drill-choice" data-answer="auth-success">The successful login</button><button class="drill-choice" data-answer="auth-mfa">The MFA settings change</button><div id="drillFeedback" class="drill-feedback"></div>',
 wireless:'<h2>DRILL 03 // Name the Mechanism</h2><p class="lead">A venue advertises “HarborCenter-Guest.” A second access point named “HarborCenter_Guest” appears nearby and presents a sign-in portal.</p><p><b>Which mechanism is most directly supported?</b></p><button class="drill-choice" data-answer="wireless-evil">Evil twin</button><button class="drill-choice" data-answer="wireless-jam">Jamming</button><button class="drill-choice" data-answer="wireless-war">War driving</button><div id="drillFeedback" class="drill-feedback"></div>'
};
document.querySelectorAll("[data-drill]").forEach(b=>b.onclick=()=>showModal(drillContent[b.dataset.drill]));


document.querySelectorAll("[data-tool]").forEach(b=>b.onclick=()=>{
 const tool=b.dataset.tool;
 if(tool==="psn")showModal('<h2>Proves / Supports / Need</h2><p class="lead">Use this before making an incident claim.</p><div class="tool-modal-grid"><div><b>PROVES</b>What can you state directly as fact from the evidence?</div><div><b>SUPPORTS</b>What conclusion does the evidence suggest but not independently prove?</div><div><b>NEED</b>What additional evidence would strengthen, challenge, or resolve the conclusion?</div></div><p><b>Analyst rule:</b> If your sentence goes beyond the observable evidence, move it from PROVES to SUPPORTS—or identify what you NEED.</p>');
 if(tool==="auth")showModal('<h2>Authentication Analyzer</h2><p class="lead">Triage suspicious identity activity with the same routine every time.</p><ol class="tool-checklist"><li>Look for many failed attempts in a short period.</li><li>Compare login time with the user\'s normal pattern.</li><li>Identify unfamiliar devices, source addresses, or locations.</li><li>Look for a success after failures.</li><li>Correlate MFA changes, new sessions, mailbox rules, or other post-login activity.</li><li>Separate credential exposure from evidence of actual account access.</li></ol><p><b>Finish with:</b> What does this PROVE, SUPPORT, and what do you still NEED?</p>');
 if(tool==="ioc")showModal('<h2>IOC Workbench</h2><p class="lead">Classify the observable before assigning meaning.</p><div class="tool-modal-grid"><div><b>IDENTIFIER</b>IP address, domain, URL, hash, username, hostname, email address.</div><div><b>CONTEXT</b>Where was it observed? When? In which data source? What action occurred?</div><div><b>ASSESSMENT</b>Benign, suspicious, malicious, or unknown must be supported by evidence.</div></div><p><b>Analyst rule:</b> An unfamiliar artifact is not automatically malicious. Record the context that makes it relevant.</p>');
});
$("#consoleToolkit").onclick=()=>showModal('<h2>Analyst Toolkit</h2><p class="lead">Use these routines while the case is open. They guide reasoning; they do not grade the case.</p><div class="tool-modal-grid"><div><b>PROVES</b>Directly established by the evidence.</div><div><b>SUPPORTS</b>Suggested by correlation or context, but not independently proven.</div><div><b>NEED</b>Evidence that would strengthen, challenge, or resolve the conclusion.</div></div><h3>Authentication triage</h3><ol class="tool-checklist"><li>Failed-attempt pattern</li><li>Unusual time</li><li>Unknown device / source</li><li>Success after failures</li><li>Post-login changes or activity</li></ol><h3>Observable / IOC routine</h3><p>Classify the artifact first → record where and when it appeared → decide whether the context makes it benign, suspicious, malicious, or still unknown.</p>');
$("#backQueue").onclick=queue;$("#caseQueue").onclick=queue;
$("#acceptCase").onclick=()=>{state.team=$("#roleSelect").value;save();$("#briefing").classList.add("hidden");$("#console").classList.remove("hidden");configure();render()};
function configure(){$("#activeCaseId").textContent=C.id;$("#activeCaseTitle").textContent=C.title;$("#activePriority").textContent=C.priority;$("#telemetryNav").textContent=C.telemetryName;$("#telemetryKicker").textContent=C.telemetryKicker;$("#telemetryTitle").textContent=C.telemetryName;$("#objectiveText").textContent=C.objective;$("#objectiveSteps").innerHTML=C.objectiveSteps.map(x=>"<li>"+esc(x)+"</li>").join("");$("#drawerLabel").textContent=C.recordLabel;$("#search").placeholder="Search "+C.telemetryName.toLowerCase()+"…";$("#telemetryHeaders").innerHTML=C.columns.map(x=>"<th>"+esc(x.label)+"</th>").join("");$("#eventFilter").innerHTML='<option value="">All observation types</option>'+[...new Set(C.records.map(x=>x.event))].sort().map(x=>"<option>"+esc(x)+"</option>").join("");$("#resultFilter").innerHTML='<option value="">All statuses</option>'+[...new Set(C.records.map(x=>x.result))].sort().map(x=>"<option>"+esc(x)+"</option>").join("");buildCustomAssessment()}
function buildCustomAssessment(){const a=C.assessment||{fields:[]};$("#customAssessment").innerHTML=(a.fields||[]).map(f=>{const req=f.required?" required":"";if(f.type==="select")return '<label>'+esc(f.label)+'<select id="af_'+esc(f.id)+'"'+req+'><option value="">Select…</option>'+f.options.map(o=>"<option>"+esc(o)+"</option>").join("")+"</select></label>";if(f.type==="textarea")return '<label>'+esc(f.label)+'<textarea id="af_'+esc(f.id)+'" placeholder="'+esc(f.placeholder||"")+'"'+req+'></textarea></label>';return '<label>'+esc(f.label)+'<input id="af_'+esc(f.id)+'" placeholder="'+esc(f.placeholder||"")+'"'+req+'></label>'}).join("")}
$("#closeDrawer").onclick=()=>$("#drawer").classList.add("hidden");$("#closeModal").onclick=closeModal;
$("#resetCase").onclick=()=>showModal("<h2>Reset Case "+esc(C.id)+"?</h2><p>This clears this browser's case file, evidence requests, notes, and assessment for <b>"+esc(C.id)+"</b>. Other cases are not affected.</p><button type=\"button\" id=\"confirmReset\" class=\"danger modal-action\">RESET CASE</button>");
document.querySelectorAll("#console aside nav button").forEach(b=>b.onclick=()=>{document.querySelectorAll("#console aside nav button,.view").forEach(x=>x.classList.remove("active"));b.classList.add("active");$("#"+b.dataset.view).classList.add("active");if(b.dataset.view==="assessment")renderAssessment()});
function renderLogs(){const q=$("#search").value.toLowerCase(),ef=$("#eventFilter").value,rf=$("#resultFilter").value;const rows=C.records.filter(x=>(!q||Object.values(x).join(" ").toLowerCase().includes(q))&&(!ef||x.event===ef)&&(!rf||x.result===rf));$("#eventCount").textContent=rows.length+" records";$("#logRows").innerHTML=rows.map(x=>'<tr data-id="'+esc(x.id)+'">'+C.columns.map(col=>'<td class="'+(col.key==="result"?"result-"+String(x[col.key]).toLowerCase():"")+'">'+esc(x[col.key])+"</td>").join("")+"</tr>").join("")}
["search","eventFilter","resultFilter"].forEach(id=>$("#"+id).addEventListener(id==="search"?"input":"change",renderLogs));$("#clearFilters").onclick=()=>{$("#search").value="";$("#eventFilter").value="";$("#resultFilter").value="";renderLogs()};$("#logRows").onclick=e=>{const row=e.target.closest("tr[data-id]");if(row)openRecord(row.dataset.id)};
function openRecord(id){selected=C.records.find(x=>x.id===id);if(!selected)return;$("#drawerTitle").textContent=selected.id+" // "+selected.event;$("#drawerBody").innerHTML=Object.entries(selected).map(([k,v])=>'<div class="detailrow"><span>'+esc(k.toUpperCase())+'</span><span>'+esc(v)+"</span></div>").join("");$("#drawer").classList.remove("hidden")}
$("#pinEvent").onclick=()=>{if(!selected)return;showModal("<h2>Add "+esc(selected.id)+" to Case</h2><p><b>Why does this record matter?</b></p><p class=\"lead\">Explain what you noticed or how it relates to your current hypothesis.</p><textarea id=\"eventReason\" rows=\"4\" placeholder=\"Analyst observation…\" required></textarea><button type=\"button\" id=\"confirmPin\" class=\"primary modal-action\" disabled>ADD TO CASE FILE</button>")};
function renderEvidence(){const total=C.credits||3;$("#creditDots").textContent=Array(state.credits).fill("●").join(" ")+" "+Array(total-state.credits).fill("○").join(" ");$("#evidenceCards").innerHTML=C.evidence.map(ev=>{const u=state.unlocked.includes(ev.id);return '<article class="ecard '+(u?"unlocked":"")+'"><small>'+(u?"UNLOCKED":"AVAILABLE // 1 CREDIT")+"</small><h3>"+esc(ev.title)+"</h3><p>"+esc(ev.desc)+'</p><button data-e="'+esc(ev.id)+'">'+(u?"VIEW EVIDENCE":"REQUEST EVIDENCE")+"</button></article>"}).join("")}
$("#evidenceCards").onclick=e=>{const b=e.target.closest("[data-e]");if(b)requestEvidence(b.dataset.e)};
function requestEvidence(id){const ev=C.evidence.find(x=>x.id===id);if(!ev)return;pendingEvidence=ev;if(state.unlocked.includes(id))return showEvidence(ev);if(state.credits<=0)return showModal("<h2>No credits remaining</h2><p>Work with the evidence your team has already collected.</p>");showModal("<h2>Evidence Request: "+esc(ev.title)+"</h2><p>What investigative question are you trying to answer, and why would this source help?</p><textarea id=\"evidenceQuestion\" rows=\"4\" placeholder=\"Enter your investigative question…\" required></textarea><button type=\"button\" id=\"confirmSpend\" class=\"primary modal-action\" disabled>SPEND 1 CREDIT & REVEAL</button>")}
function showEvidence(ev){pendingEvidence=ev;const added=state.evidenceAdded.includes(ev.id);showModal(ev.content+'<div class="evidence-question"><small>YOUR INVESTIGATIVE QUESTION</small><p>'+esc(state.evidenceQuestions[ev.id]||"Previously unlocked evidence")+'</p></div><button id="addEvidence" class="primary modal-action" '+(added?"disabled":"")+">"+(added?"ADDED TO CASE":"ADD TO CASE")+"</button>")}
$("#timelineForm").onsubmit=e=>{e.preventDefault();const t=$("#timelineText").value.trim();if(!t)return;state.timeline.push({type:"note",time:$("#timelineTime").value||"—",title:"Analyst Observation",source:"Manual entry",observation:t});$("#timelineTime").value=$("#timelineText").value="";save();renderTimeline()};
function sortTimeline(items){return items.map((x,i)=>({...x,_i:i})).sort((a,b)=>{const ta=/^\d\d:\d\d/.test(a.time)?a.time:"99:99:99",tb=/^\d\d:\d\d/.test(b.time)?b.time:"99:99:99";return ta.localeCompare(tb)})}
function renderTimeline(){const items=sortTimeline(state.timeline);$("#timelineList").innerHTML=items.length?items.map(x=>'<div class="entry '+esc(x.type||"legacy")+'"><div class="entrytop"><span class="badge">'+esc(String(x.type||"legacy").toUpperCase())+"</span><b>"+esc(x.time||"—")+'</b><button type="button" data-del="'+x._i+'" title="Remove finding">×</button></div><h3>'+esc(x.title||"Finding")+'</h3><div class="entrysource">'+esc(x.source||"")+"</div><p><strong>Analyst observation:</strong> "+esc(x.observation||x.text||"")+"</p></div>").join(""):'<p class="hint">No findings in the case file yet.</p>';renderAssessment()}
$("#timelineList").onclick=e=>{const b=e.target.closest("[data-del]");if(!b)return;const i=Number(b.dataset.del);if(Number.isInteger(i)&&i>=0&&i<state.timeline.length){state.timeline.splice(i,1);save();renderTimeline()}};
$("#caseNotes").oninput=e=>{state.notes=e.target.value;save();$("#saveFlag").textContent="Saved.";renderAssessment()};
function customValues(){const vals={};(C.assessment.fields||[]).forEach(f=>{const el=$("#af_"+f.id);vals[f.id]=el?el.value.trim():""});return vals}
function populateAssessment(){const a=state.assessment||{};$("#disposition").value=a.disposition||"";$("#happened").value=a.happened||"";$("#proves").value=a.proves||"";$("#supports").value=a.supports||"";$("#need").value=a.need||"";$("#nextAction").value=a.nextAction||"";(C.assessment.fields||[]).forEach(f=>{const el=$("#af_"+f.id);if(el)el.value=(a.custom||{})[f.id]||""})}
function customReportHtml(a){const labels=C.assessment.reportLabels||{};return Object.entries(a.custom||{}).map(([k,v])=>'<div><small>'+esc(labels[k]||k.toUpperCase())+"</small><p>"+esc(v)+"</p></div>").join("")}
function reportText(){const a=state.assessment||{},labels=C.assessment.reportLabels||{};const custom=Object.entries(a.custom||{}).map(([k,v])=>"\n"+(labels[k]||k.toUpperCase())+"\n"+v).join("");const findings=sortTimeline(state.timeline).map(x=>"- "+(x.time||"—")+" | "+(x.title||"Finding")+": "+(x.observation||x.text||"")).join("\n");return "IRONCREST CYBER PARTNERS — SOC BRIEFING\nCase: "+C.id+" — "+C.title+"\nAnalyst Team: "+(state.team||"Unassigned")+"\n\nDISPOSITION\n"+(a.disposition||"")+custom+"\n\nINCIDENT ASSESSMENT\n"+(a.happened||"")+"\n\nPROVES\n"+(a.proves||"")+"\n\nSUPPORTS\n"+(a.supports||"")+"\n\nNEED\n"+(a.need||"")+"\n\nRECOMMENDED NEXT ACTION\n"+(a.nextAction||"")+"\n\nCASE FILE FINDINGS\n"+(findings||"No findings recorded.")}
function renderReport(){const a=state.assessment;if(!a)return;$("#reportDisposition").textContent=a.disposition;$("#reportBody").innerHTML='<div class="report-grid">'+customReportHtml(a)+'<div><small>ANALYST TEAM</small><p>'+esc(state.team)+'</p></div></div><section><small>INCIDENT ASSESSMENT</small><p>'+esc(a.happened)+'</p></section><div class="triple report-reasoning"><section><small>PROVES</small><p>'+esc(a.proves)+'</p></section><section><small>SUPPORTS</small><p>'+esc(a.supports)+'</p></section><section><small>NEED</small><p>'+esc(a.need)+'</p></section></div><section><small>RECOMMENDED NEXT ACTION</small><p>'+esc(a.nextAction)+'</p></section><section><small>CASE FILE FINDINGS</small>'+sortTimeline(state.timeline).map(x=>'<div class="report-finding"><b>'+esc(x.time)+" · "+esc(x.title)+"</b><span>"+esc(x.observation||x.text||"")+"</span></div>").join("")+"</section>"}
function renderAssessment(){if(!C||!state)return;$("#statusTimeline").textContent=state.timeline.length;$("#statusEvidence").textContent=state.unlocked.length+" / "+(C.credits||3);$("#statusNotes").textContent=state.notes.trim()?"SAVED":"NONE";$("#assessmentFindings").innerHTML=state.timeline.length?'<small>CASE FILE FINDINGS</small>'+sortTimeline(state.timeline).map(x=>'<div class="mini-finding"><b>'+esc(x.time)+" · "+esc(x.title)+"</b><span>"+esc(x.observation||x.text||"")+"</span></div>").join(""):'<p class="hint">Your case file has no findings yet. Return to the investigation before making a disposition.</p>';const done=!!state.assessment&&!editingAssessment;$("#assessmentForm").classList.toggle("hidden",done);$("#submitted").classList.toggle("hidden",!done);if(done)renderReport();else populateAssessment()}
$("#assessmentForm").onsubmit=e=>{e.preventDefault();state.assessment={disposition:$("#disposition").value,custom:customValues(),happened:$("#happened").value.trim(),proves:$("#proves").value.trim(),supports:$("#supports").value.trim(),need:$("#need").value.trim(),nextAction:$("#nextAction").value.trim()};editingAssessment=false;save();renderAssessment()};
$("#editAssessment").onclick=()=>{editingAssessment=true;renderAssessment();$("#assessmentForm").scrollIntoView({behavior:"smooth",block:"start"})};
$("#copyBriefing").onclick=async()=>{const t=reportText(),s=$("#copyStatus");try{await navigator.clipboard.writeText(t)}catch(e){const ta=document.createElement("textarea");ta.value=t;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove()}s.textContent="Copied — paste into Schoology.";setTimeout(()=>s.textContent="",3500)};
document.addEventListener("input",e=>{const id=e.target&&e.target.id;if(id==="eventReason"&&$("#confirmPin"))$("#confirmPin").disabled=!e.target.value.trim();if(id==="evidenceQuestion"&&$("#confirmSpend"))$("#confirmSpend").disabled=!e.target.value.trim();if(id==="evidenceReason"&&$("#confirmEvidence"))$("#confirmEvidence").disabled=!e.target.value.trim()},true);
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("button");if(!b)return;
if(b.classList.contains("drill-choice")){
 const f=$("#drillFeedback"),a=b.dataset.answer;
 const messages={
 "psn-proves":"Not yet. The log proves the failures and success occurred, but not how the credential was obtained or who used it.",
 "psn-supports":"The sequence supports suspicious or possibly unauthorized access, but the full claim goes beyond the evidence.",
 "psn-need":"Correct. You need additional evidence before claiming password theft and attacker use. Separate the observed login sequence from the cause.",
 "auth-fails":"Useful indicator, but failed attempts do not establish post-login activity.",
 "auth-success":"Stronger, but the question asks specifically for evidence of activity after access.",
 "auth-mfa":"Correct. The MFA change is post-login account activity and materially strengthens the unauthorized-access hypothesis.",
 "wireless-evil":"Correct. The near-match SSID plus sign-in portal directly supports an evil-twin / impersonating access-point hypothesis.",
 "wireless-jam":"Not from these observations. Jamming requires evidence of RF interference or availability disruption.",
 "wireless-war":"Not from these observations. War driving is reconnaissance; a nearby rogue SSID does not prove how it was discovered or deployed."
 };f.textContent=messages[a]||"";f.classList.add("show");return;
}
if(b.id==="confirmPin"){const t=$("#eventReason");if(!t||!t.value.trim()||!selected)return;state.timeline.push({type:"log",time:selected.time,title:selected.id+" — "+selected.event,source:C.columns.slice(1,3).map(x=>selected[x.key]).join(" · ")+" · "+selected.resource,observation:t.value.trim()});save();renderTimeline();closeModal();$("#drawer").classList.add("hidden")}else if(b.id==="confirmSpend"){const t=$("#evidenceQuestion");if(!t||!t.value.trim()||!pendingEvidence||state.credits<=0)return;if(!state.unlocked.includes(pendingEvidence.id)){state.credits--;state.unlocked.push(pendingEvidence.id)}state.evidenceQuestions[pendingEvidence.id]=t.value.trim();save();renderEvidence();showEvidence(pendingEvidence)}else if(b.id==="addEvidence"){if(b.disabled||!pendingEvidence)return;showModal(pendingEvidence.content+'<h3>Why does this evidence matter?</h3><p class="lead">Explain what it proves or supports in your investigation.</p><textarea id="evidenceReason" rows="4" placeholder="Analyst interpretation…"></textarea><button type="button" id="confirmEvidence" class="primary modal-action" disabled>ADD TO CASE FILE</button>')}else if(b.id==="confirmEvidence"){const t=$("#evidenceReason");if(!t||!t.value.trim()||!pendingEvidence)return;if(!state.evidenceAdded.includes(pendingEvidence.id)){state.evidenceAdded.push(pendingEvidence.id);state.timeline.push({type:"evidence",time:"EVIDENCE",title:pendingEvidence.title,source:"Evidence Locker",observation:t.value.trim()})}save();renderEvidence();renderTimeline();closeModal()}else if(b.id==="confirmReset"){const resetId=C.id;localStorage.removeItem(KEY);closeModal();openBrief(resetId)}},true);
function render(){$("#teamName").textContent=state.team;$("#caseNotes").value=state.notes;renderLogs();renderEvidence();renderTimeline();renderAssessment()}
queue()})();
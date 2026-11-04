/* Same-origin, browser-local profile and training record. No remote service. */
(() => {
'use strict';const KEY='ironcrest-training-v1',empty=()=>({format:'ironcrest-training',version:1,activeId:null,profiles:{}});let memory=empty(),persistent=true,callbacks=[];
try{const raw=JSON.parse(localStorage.getItem(KEY)||'null');if(raw?.version===1&&raw.profiles)memory=raw}catch{persistent=false}
const copy=x=>x==null?x:JSON.parse(JSON.stringify(x)),now=()=>new Date().toISOString();
function commit(){try{localStorage.setItem(KEY,JSON.stringify(memory));persistent=true}catch{persistent=false}window.dispatchEvent(new CustomEvent('ironcrest-training-save',{detail:{persistent}}));return persistent}
function profile(){return memory.profiles[memory.activeId]||null}
function read(k,f=null){const p=profile();return copy(p?.data?.[k]??f)}
function activity(id){return copy(profile()?.activities?.[id]||{})}
function mark(id,patch){const p=profile();if(!p)return false;p.revision=(p.revision||0)+1;p.activities[id]={...(p.activities[id]||{}),...copy(patch),updatedAt:now()};return commit()}
function write(k,v){const p=profile();if(!p)return false;const prev=p.data[k];if(JSON.stringify(prev)===JSON.stringify(v))return persistent;p.revision=(p.revision||0)+1;p.data[k]=copy(v);if(k==='course:u3-case'){
 const a=p.activities['case:guest-route']||{};p.activities['case:guest-route']={...a,startedAt:a.startedAt||now(),recorded:!!v.handoff,updatedAt:now()};
 if(v.decided&&!prev?.decided||v.handoff&&!prev?.handoff){p.history.push({at:now(),activity:'case:guest-route',kind:v.handoff?'handoff':'decision',snapshot:copy(v)});}
 }return commit()}
function create(alias,period=''){alias=String(alias).trim().slice(0,60);if(!alias)throw Error('Enter an analyst or team alias.');const id=crypto.randomUUID?crypto.randomUUID():'p-'+Date.now()+'-'+Math.random().toString(36).slice(2);memory.profiles[id]={id,alias,period:String(period).trim().slice(0,30),createdAt:now(),data:{},activities:{},history:[],exports:[],submission:null};memory.activeId=id;commit();flush();return copy(profile())}
function flush(){const f=callbacks;callbacks=[];T.wantsProfile=false;f.forEach(fn=>fn?.({name:profile().alias,period:profile().period}));window.dispatchEvent(new Event('ironcrest-profile-selected'))}
function activate(id){if(!memory.profiles[id])throw Error('Profile not found.');memory.activeId=id;commit();flush()}
function requestProfile(fn){if(fn)callbacks.push(fn);T.wantsProfile=true;window.dispatchEvent(new Event('ironcrest-profile-request'))}
function recordAttempt(attempt){const id='sim:'+attempt.unit+':'+attempt.sim,a=activity(id);mark(id,{startedAt:a.startedAt||attempt.started,attemptedAt:attempt.finished,lastAttemptId:attempt.id,score:attempt.score,max:attempt.max,pct:attempt.pct,reviewed:false})}
function start(id){const a=activity(id);if(!a.startedAt)mark(id,{startedAt:now()})}
function draft(k,v){return write('draft:'+k,v)}
function snapshot(){return copy(profile())}
function addHistory(activity,kind,value){const p=profile();if(!p)return;p.history.push({at:now(),activity,kind,snapshot:copy(value)});commit()}
function exportBackup(){return {format:'ironcrest-profile-backup',version:1,exportedAt:now(),profile:snapshot()}}
function restoreBackup(pkg){if(pkg?.format!=='ironcrest-profile-backup'||pkg.version!==1||!pkg.profile||typeof pkg.profile.alias!=='string'||!pkg.profile.data||!pkg.profile.activities)throw Error('Not a supported Ironcrest profile backup.');const p=copy(pkg.profile);if(p.alias.length>60)throw Error('Invalid profile alias.');p.id=crypto.randomUUID();p.createdAt=now();p.history=Array.isArray(p.history)?p.history:[];p.exports=Array.isArray(p.exports)?p.exports:[];memory.profiles[p.id]=p;memory.activeId=p.id;commit();flush();return p.id}
function exportEvent(id){const p=profile();if(!p)return;p.exports.push({id,revision:p.revision||0,preparedAt:now()});p.submission=null;commit()}
function confirmSubmission(reference){const p=profile();if(!p)return;if(!p.exports.length||p.exports.at(-1).revision!==(p.revision||0))throw Error('Prepare a fresh export after your latest edits.');p.submission={reportedAt:now(),reference:String(reference).trim().slice(0,250),exportId:p.exports.at(-1).id,kind:'student-reported'};commit()}
const T=window.IRONCREST_TRAINING={profile:()=>copy(profile()),profiles:()=>Object.values(memory.profiles).map(p=>({id:p.id,alias:p.alias,period:p.period})),read,write,activity,mark,start,recordAttempt,create,activate,requestProfile,draft,snapshot,addHistory,exportBackup,restoreBackup,exportEvent,confirmSubmission,persistent:()=>persistent,wantsProfile:false,signOut(){memory.activeId=null;commit()},download(name,text,type='application/json'){const u=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}};
window.addEventListener('storage',e=>{if(e.key!==KEY)return;try{const next=JSON.parse(e.newValue);if(next?.version!==1)return;const changed=next.activeId!==memory.activeId;memory=next;if(changed)location.reload();else window.dispatchEvent(new Event('ironcrest-training-external'))}catch{}});
})();

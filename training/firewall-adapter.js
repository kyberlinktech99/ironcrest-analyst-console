/* Resume exact pilot rules, locked outcomes, and navigation without re-awarding attempts. */
(() => {
const T=window.IRONCREST_TRAINING;if(!T)return;const ID='sim:3:fw';let restoring=false;
function capture(){if(!T.profile()||restoring)return;const screen=Number(document.querySelector('.screen.active')?.id.slice(1)||0);T.draft(ID,{screen,score,results,userRules,locked,changes:_chg})}
const originalGo=goTo,originalLock=lockIn,originalUpdate=updateRule,originalRestart=restart;
goTo=function(n){originalGo(n);capture()};updateRule=function(...args){originalUpdate(...args);capture()};lockIn=function(...args){originalLock(...args);capture()};
restart=function(){if(T.profile()){const old=T.read('draft:'+ID);if(old)T.addHistory(ID,'restart',old);T.write('draft:'+ID,null)}originalRestart();capture()};
function restore(){const d=T.read('draft:'+ID);if(!d||!Number.isInteger(d.screen)||d.screen<0||d.screen>4)return;restoring=true;score=0;results=[];userRules={};locked=[];_chg=[];
 for(let i=0;i<3;i++){if(!d.userRules?.[i])continue;buildScenario(i);for(const [ri,rule]of d.userRules[i].entries())for(const [field,value]of Object.entries(rule)){const el=document.getElementById(`sel-${i}-${ri}-${field}`);if(el&&[...el.options].some(o=>o.value===value)){el.value=value;originalUpdate(i,ri,field,value)}}if(d.locked?.[i])originalLock(i)}
 _chg=d.changes||[];
 document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById('s'+d.screen).classList.add('active');for(let i=0;i<=4;i++){const p=document.getElementById('p'+i);p?.classList.toggle('active',i===d.screen);p?.classList.toggle('done',i<d.screen)}
 if(d.screen===4){_apBuild();const note=document.createElement('div');note.className='u2-panel';note.innerHTML='<b>Saved attempt restored</b><p>Resume your feedback review in the Training Queue. Reopening this screen does not create another scored attempt.</p><a href="../training/review.html">Review practice & linked FRQ →</a>';document.getElementById('s4').append(note)}
 restoring=false;}
restore();window.addEventListener('ironcrest-save-exit',capture);window.addEventListener('beforeunload',capture);
})();

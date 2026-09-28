/* Progress records actions, not correctness or delivery to a teacher. */
(() => {
 const memory={};
 function read(key){try{return JSON.parse(localStorage.getItem(key)||'null')||{}}catch{return {}}}
 function flags(id){return {...read('ironcrest-progress-'+id),...memory[id]}}
 function mark(id,field,value=true){memory[id]={...flags(id),[field]:value};try{localStorage.setItem('ironcrest-progress-'+id,JSON.stringify(memory[id]))}catch{}refresh()}
 function reset(id){delete memory[id];try{localStorage.removeItem('ironcrest-progress-'+id)}catch{}refresh()}
 function status(id){const p=flags(id),item=window.IRONCREST_UNIT1.catalog.find(x=>x.id===id),c=read('ironcrest-'+id.toLowerCase()),d=read('ironcrest-frq-'+item.packet);const recorded=!!d.recordedAt&&d.reviewed===true;return [!!p.briefing,!!p.guided,!!c.acceptedAt,!!p.investigated,recorded,recorded&&d.exportedRecord===d.recordedAt]}
 const labels=['Briefing reviewed','Guided experience completed','Case accepted','Investigation reviewed','FRQ recorded','Copy / download prepared'];
 const hints=['Read the real-world briefing, then begin.','Complete the guided checkpoints, or return to them after your case.','Review the case briefing and accept your team assignment.','Inspect the records, document your findings, and mark your investigation reviewed.','Complete and review the Final FRQ, then record it.','Copy or download the recorded response, then upload or paste it into Schoology.'];
 function paint(host,id){const done=status(id),next=done.findIndex(x=>!x);host.className='activity-progress';host.dataset.progressCase=id;host.innerHTML='<h2>Your activity progress</h2><ol>'+labels.map((label,i)=>'<li class="'+(done[i]?'complete':'pending')+'">'+(done[i]?'✓':'○')+' '+label+'</li>').join('')+'</ol><p><strong>Next:</strong> '+(next<0?'Upload or paste your response into Schoology and confirm submission there.':hints[next])+'</p><p class="progress-note">This checklist tracks your actions, not answer quality. A copy or download is not a teacher submission. Earlier steps may be incomplete if you opened the case directly or used an older version.</p>'+(done[2]?'<button type="button" data-investigation-review>'+ (done[3]?'Reopen investigation review':'I reviewed my findings and evidence gaps')+'</button>':'');host.querySelector('button')?.addEventListener('click',()=>mark(id,'investigated',!done[3]));}
 function mount(host,id){paint(host,id)}
 function refresh(){if(typeof document!=='undefined')document.querySelectorAll('[data-progress-case]').forEach(h=>paint(h,h.dataset.progressCase))}
 window.IRONCREST_PROGRESS={mark,mount,refresh,reset,status};
})();

(() => {
function mount(){const root=document.documentElement,unit=Number(root.dataset.ironcrestUnit)||Number(new URLSearchParams(location.search).get('u'))||0,privateCopy=root.dataset.ironcrestAudience==='instructor';
const hubs=['sim_hub.html','sim2_hub.html','sim3_hub.html','sim4_hub.html','sim5_hub.html'];const names=['Foundations','Physical security','Networks','Devices','Apps & data'];
const skip=document.createElement('a');skip.className='ic-skip';skip.href='#ic-main';skip.textContent='Skip to activity';document.body.prepend(skip);
const bar=document.createElement('div');bar.className='ic-topbar';bar.innerHTML=`<a class="ic-brand" href="index.html"><svg class="ic-shield" viewBox="0 0 40 46" aria-hidden="true"><path d="M20 2L37 8V25Q34 37 20 44Q6 37 3 25V8Z" fill="none" stroke="var(--ic-mint)" stroke-width="2"/><path d="M12 15h16M15 15v16m10-16v16M12 31h16" stroke="var(--ic-mint)" stroke-width="2.5"/></svg><span><strong>IRONCREST</strong><small>CYBER PARTNERS / ANALYST TRAINING</small></span></a><span class="ic-status">${privateCopy?'INSTRUCTOR WORKSPACE':'SIMULATION LIBRARY'} · AP CYBERSECURITY</span>`;
const nav=document.createElement('nav');nav.className='ic-unitnav';nav.setAttribute('aria-label','Simulation units');nav.innerHTML=`<a href="index.html" ${unit===0?'aria-current="page"':''}>All units</a>`+hubs.map((href,i)=>`<a href="${href}" ${unit===i+1?'aria-current="page"':''}>${i+1} · ${names[i]}</a>`).join('');document.body.insertBefore(bar,skip.nextSibling);document.body.insertBefore(nav,bar.nextSibling);
const main=document.querySelector('.wrap')||document.querySelector('main');if(main){main.id='ic-main';main.setAttribute('tabindex','-1');const foot=document.createElement('footer');foot.className='ic-foot';foot.innerHTML='<span>IRONCREST CYBER PARTNERS</span><span>Training scenarios · Practice, explain, verify.</span>';main.append(foot)}
if(!document.title.includes('Ironcrest'))document.title='Ironcrest | '+document.title.replace(/ — AP Cybersecurity$/,'');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();

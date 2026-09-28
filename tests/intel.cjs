const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=__dirname+'/../',ctx={window:{scrollTo(){}}};vm.createContext(ctx);
for(const file of ['config','cases','learning','frq','unit1','story','ai','intel'])vm.runInContext(fs.readFileSync(root+'js/'+file+'.js','utf8'),ctx);
const w=ctx.window;w.IRONCREST_PROGRESS={mark(){},mount(){}};assert.equal(Object.keys(w.IRONCREST_INTEL.data).length,w.IRONCREST_UNIT1.catalog.length);
for(const item of w.IRONCREST_UNIT1.catalog){
 const d=w.IRONCREST_INTEL.data[item.id];for(const key of ['source','date','title','summary','connection','question','boundary'])assert(d[key]);assert(d.url.startsWith('https://'));
 let opened=0,returned=0;const host={innerHTML:'',querySelector(){return {}}};w.IRONCREST_INTEL.show(host,item.id,()=>opened++,()=>returned++);
 assert(host.innerHTML.includes('What happened?'));assert(host.innerHTML.includes('Before you begin'));assert(host.innerHTML.includes('Begin guided experience'));assert(host.innerHTML.includes('target="_blank"'));
 host.onclick({target:{closest:()=>({hasAttribute:a=>a==='data-intel-begin'})}});assert.equal(opened,1);
 host.onclick({target:{closest:()=>({hasAttribute:a=>a==='data-intel-home'})}});assert.equal(returned,1);
 w.IRONCREST_INTEL.show(host,item.id,()=>{},()=>{},true);assert(host.innerHTML.includes('Continue to case briefing'));
}
console.log('PASS: all five sourced opening briefings, context boundaries, guided entry, and direct-case entry.');

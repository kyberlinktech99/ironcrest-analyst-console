const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=__dirname+'/../',ctx={window:{}};vm.createContext(ctx);
for(const file of ['config','cases','learning','frq','unit1','story','ai'])vm.runInContext(fs.readFileSync(root+'js/'+file+'.js','utf8'),ctx);
const w=ctx.window;
assert.equal(w.IRONCREST_UNIT1.catalog.length,5);
for(const id of ['U1-004','U1-005']){
 const c=w.IRONCREST_CASES[id];assert(c.records.length>=12);assert.equal(c.evidence.length,6);
 assert.equal(new Set(c.records.map(r=>r.id)).size,c.records.length);
 assert.equal(new Set(c.evidence.map(r=>r.id)).size,c.evidence.length);
 for(const i of [0,1,2,3,4,6])assert(w.IRONCREST_STORY.render(id,i,false).includes('story-window'));
 assert(w.IRONCREST_STORY.render(id,3,false).includes('data-story-submit'));
 assert(!w.IRONCREST_STORY.render(id,3,true).includes('data-story-submit'));
 const packet=w.IRONCREST_UNIT1.packet(c,{unlocked:c.evidence.map(e=>e.id)});
 assert.equal(packet.sources[1].evidence.length,6);assert.equal(packet.parts.flatMap(p=>p.questions).length,8);
 assert(w.IRONCREST_LEARNING.lens(id).includes(id==='U1-004'?'1.4.A':'1.5.A'));
}
// Deterministic RNG makes this exhaustive position check reproducible, not flaky.
let seed=7823;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296};
const original=[{id:'right'},{id:'other'},{id:'third'}],positions=new Set();
for(let i=0;i<100;i++){const shuffled=w.IRONCREST_CONFIG.shuffle(original,random);assert.notEqual(shuffled,original);assert.equal(new Set(shuffled).size,3);positions.add(shuffled.findIndex(x=>x.id==='right'))}
assert.equal(positions.size,3);assert.equal(original[0].id,'right');
assert.equal(w.IRONCREST_CONFIG.shuffle([],random).length,0);
assert.equal(w.IRONCREST_CONFIG.shuffle(['only'],random)[0],'only');
// Exercise actual lesson rendering and navigation with a minimal host.
const host={innerHTML:'',querySelector:()=>({focus(){}}),querySelectorAll:()=>[]};ctx.window.scrollTo=()=>{};
w.IRONCREST_UNIT1.lesson(host,'U1-004',()=>{},()=>{});
const order=()=>[...host.innerHTML.matchAll(/data-answer="(\d)"/g)].map(m=>m[1]).join(',');const first=order();
function event(attr){return {target:{closest:()=>({disabled:false,hasAttribute:name=>name===attr})}}}
host.onclick(event('data-next'));host.onclick(event('data-back'));assert.equal(order(),first);
host.onclick(event('data-story-submit'));assert.equal(order(),first);
const html=fs.readFileSync(root+'index.html','utf8');assert(html.indexOf('js/ai.js')<html.indexOf('js/app.js'));
console.log('PASS: two complete AI activities, evidence boundaries, unique FRQs, all shuffle positions, immutable choices, and stable order on rerender/back.');

const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=__dirname+'/../',ctx={window:{}};vm.createContext(ctx);
for(const name of ['config','cases','learning','frq','unit1','story','ai'])vm.runInContext(fs.readFileSync(root+'js/'+name+'.js','utf8'),ctx);
const api=ctx.window.IRONCREST_UNIT1,cases=ctx.window.IRONCREST_CASES;
assert.equal(api.catalog.length,Object.keys(cases).length);
const keys=new Set();
for(const item of api.catalog){
 const c=cases[item.id],packet=item.id==='U1-002'?ctx.window.IRONCREST_FRQ.casePacket(c,{unlocked:[]}):api.packet(c,{unlocked:[]});
 assert(!keys.has(packet.id));keys.add(packet.id);assert.equal(item.packet,packet.id);
 assert.equal(packet.sources[0].lines.length,c.records.length);assert.equal(packet.sources[1].evidence.length,0);
 const questions=packet.parts.flatMap(p=>p.questions);
 assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
 assert.deepEqual(Array.from(new Set(questions.map(q=>q.verb))).sort(),['Describe','Determine','Explain','Identify','Write']);
 assert(packet.parts.every(p=>['Detect Attacks','Mitigate Risk'].includes(p.skill)));
 assert(packet.extension.skill.startsWith('Analyze Risk'));
 if(item.id!=='U1-002'){
  const u=api.packet(c,{unlocked:[c.evidence[1].id]});assert.equal(u.sources[1].evidence.length,1);assert.equal(u.sources[1].evidence[0].ref,'2.2');
  assert.equal(api.lessons[item.id].length,7);
  api.lessons[item.id].slice(0,6).forEach(s=>assert(s.choices[s.answer]&&s.feedback&&s.task&&s.look&&s.action));
 }
}
const app=fs.readFileSync(root+'js/app.js','utf8');new vm.Script(app);
assert(!app.includes('frqReplay'));assert(app.includes('finalActivity:true'));assert(app.includes("classList.add('active');$('#logs')"));
console.log('PASS: all five cases, unique drafts, source filtering, all task verbs, skill alignment, seven-stage lessons and final-only FRQ integration.');

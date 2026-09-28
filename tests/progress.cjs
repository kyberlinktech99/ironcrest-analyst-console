const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const data=new Map(),ctx={window:{},localStorage:{getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)},document:{querySelectorAll:()=>[]}};
vm.createContext(ctx);for(const f of ['config','cases','learning','frq','unit1','story','ai','progress'])vm.runInContext(fs.readFileSync(__dirname+'/../js/'+f+'.js','utf8'),ctx);
const p=ctx.window.IRONCREST_PROGRESS,put=(k,v)=>data.set(k,JSON.stringify(v));
for(const item of ctx.window.IRONCREST_UNIT1.catalog){
 const id=item.id,key='ironcrest-frq-'+item.packet;
 assert.deepEqual(Array.from(p.status(id)),[false,false,false,false,false,false]);
 p.mark(id,'briefing');p.mark(id,'guided');p.mark(id,'investigated');put('ironcrest-'+id.toLowerCase(),{acceptedAt:'2026-09-27'});
 put(key,{reviewed:true,recordedAt:'r1'});assert.deepEqual(Array.from(p.status(id)),[true,true,true,true,true,false]);
 put(key,{reviewed:true,recordedAt:'r1',exportedRecord:'r1'});assert.equal(p.status(id)[5],true);
 put(key,{reviewed:true,recordedAt:'r2',exportedRecord:'r1'});assert.equal(p.status(id)[5],false);
 put(key,{reviewed:false,recordedAt:null,exportedRecord:null});assert.equal(p.status(id)[4],false);
 p.reset(id);assert.equal(p.status(id)[0],false);assert.equal(p.status(id)[3],false);
}
ctx.localStorage.getItem=()=>{throw Error('storage blocked')};ctx.localStorage.setItem=()=>{throw Error('storage blocked')};
p.mark('U1-001','briefing');assert.equal(p.status('U1-001')[0],true);assert.equal(p.status('U1-002')[0],false);
console.log('PASS: per-case progress, legacy empty state, review/export invalidation, reset and blocked-storage fallback.');

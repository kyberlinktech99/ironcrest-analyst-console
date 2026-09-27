const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=__dirname+'/../',ctx={window:{}};vm.createContext(ctx);
for(const file of ['config','cases','learning','unit1','frq'])vm.runInContext(fs.readFileSync(root+'js/'+file+'.js','utf8'),ctx);
const {IRONCREST_CONFIG:config,IRONCREST_LEARNING:learning,IRONCREST_CASES:cases}=ctx.window;
assert.equal(config.teams.join('|'),'Team Alpha|Team Bravo|Team Charlie');
assert.equal(config.normalizeTeam('Threat Analysis Team'),'Team Bravo');
assert.equal(config.normalizeTeam('Analyst Charlie'),'Team Charlie');
assert.equal(config.normalizeTeam('Team Bravo'),'Team Bravo');
for(const id of Object.keys(cases)){
 assert.equal(cases[id].roles.join('|'),config.teams.join('|'));
 const lens=learning.lens(id);
 for(const heading of ['OBSERVED · PROVES','SUPPORTS','DOES NOT PROVE','NEED','PROTECTION','College Board curriculum connection','Lesson quick reference'])assert(lens.includes(heading));
 assert.equal(learning.data[id].cards.length,5);assert(learning.data[id].terms.length>=6);
 const more=learning.enrichment(id);assert(more.includes('https://www.netacad.com/'));assert(more.includes('https://cyber.org/'));assert(more.includes('Transfer challenge'));
}
assert.equal(learning.enrichment('unknown'),'');
console.log('PASS: shared AP structure, objective links, references, enrichment per case, standard teams and legacy team migration.');

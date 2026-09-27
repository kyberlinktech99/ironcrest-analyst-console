const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');const root=__dirname+'/../',ctx={window:{}};vm.createContext(ctx);
for(const file of ['config','cases','learning','unit1','story'])vm.runInContext(fs.readFileSync(root+'js/'+file+'.js','utf8'),ctx);
const story=ctx.window.IRONCREST_STORY;
for(const id of ['U1-001','U1-003']){assert(story.stories[id].intro);assert(story.stories[id].goal);for(const i of [0,1,2,3,4,6])assert(story.render(id,i,false).includes('story-window'));assert(story.render(id,3,false).includes('data-story-submit'));assert(!story.render(id,3,true).includes('data-story-submit'));assert(story.render(id,3,true).includes('Simulated submission recorded'));ctx.window.IRONCREST_UNIT1.lessons[id].slice(0,6).forEach(s=>assert(s.choices[s.answer]));}
assert(story.coverage.includes('1.4'));assert(story.coverage.includes('1.5'));assert(story.coverage.includes('No activity yet'));assert(!story.render('U1-003',0,false).includes('Lakeside'));
console.log('PASS: explicit situations, concrete screens, exposure reveal, checkpoints, and accurate coverage gaps.');

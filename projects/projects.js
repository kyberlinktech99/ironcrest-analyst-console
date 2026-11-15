/* Research projects page: idea filters and a locally saved proposal form.
   Content adapted from "Beyond the Flag" v1.0 by Abdullah Rehman, CC BY-SA 4.0. */
(() => {
  'use strict';
  const P = window.IRONCREST_PROJECTS, $ = s => document.querySelector(s);
  const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const KEY = 'ironcrest-project-proposal-v1';

  // ---------- idea bank ----------
  const all = P.domains.flatMap(d => d.ideas.map(i => ({ ...i, domain: d })));
  $('#fDomain').insertAdjacentHTML('beforeend', P.domains.map(d => `<option value="${E(d.n)}">${E(d.n)} · ${E(d.name)}</option>`).join(''));
  const topics = [...new Set(all.flatMap(i => i.ap))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  $('#fAp').insertAdjacentHTML('beforeend', topics.map(t => `<option>${E(t)}</option>`).join(''));

  function card(i) {
    return `<article class="pj-idea lvl-${i.level}">
      <div class="pj-idea-top"><span class="pj-id">${E(i.id)}</span><span class="pj-level">${E(i.levelName)}</span><span class="pj-setup ${E(i.setup)}">${i.setup === 'browser' ? 'Starts in a browser' : 'Needs a VM, install or code'}</span></div>
      <h4>${E(i.title)}</h4>
      <p>${E(i.question)}</p>
      <p class="pj-start"><b>Start here:</b> ${i.resources.map(r => `<a href="${E(r.url)}" target="_blank" rel="noopener noreferrer">${E(r.name)}</a>`).join(' · ')}</p>
      <div class="pj-idea-foot">${i.ap.length ? `<span class="muted">AP connection: ${i.ap.map(E).join(', ')}</span>` : '<span></span>'}<button type="button" data-use="${E(i.id)}">Use in my proposal</button></div>
    </article>`;
  }
  function renderIdeas() {
    const fd = $('#fDomain').value, fl = $('#fLevel').value, fs = $('#fSetup').value, fa = $('#fAp').value;
    const shown = all.filter(i => (!fd || i.domain.n === fd) && (!fl || String(i.level) === fl) && (!fs || i.setup === fs) && (!fa || i.ap.includes(fa)));
    $('#ideaCount').textContent = `Showing ${shown.length} of ${all.length} ideas.`;
    $('#ideaList').innerHTML = P.domains.map(d => {
      const ideas = shown.filter(i => i.domain === d);
      if (!ideas.length) return '';
      return `<section class="pj-domain"><h3><span>${E(d.n)}</span> ${E(d.name)}</h3><p class="muted">${E(d.blurb)}</p><div class="pj-ideas">${ideas.map(card).join('')}</div></section>`;
    }).join('') || '<p>No ideas match these filters.</p>';
  }
  ['#fDomain', '#fLevel', '#fSetup', '#fAp'].forEach(s => $(s).addEventListener('change', renderIdeas));
  renderIdeas();

  // ---------- proposal form ----------
  const FIELDS = [
    ['name', 'Name and class', 'input'],
    ['idea', 'Domain and idea number (for example 3.2), or “own idea”, and working title', 'input'],
    ['route', 'Route: investigation or design', 'select', ['', 'Investigation', 'Design']],
    ['question', 'Question or design goal', 'textarea'],
    ['why', 'Why this interests me', 'textarea'],
    ['concepts', 'Key cybersecurity concepts', 'textarea'],
    ['resources', 'Learning resources (exact links)', 'textarea'],
    ['activities', 'Practical activities', 'textarea'],
    ['contribution', 'My original contribution', 'textarea'],
    ['evidence', 'Expected evidence and final product', 'textarea'],
    ['tools', 'Tools, accounts and access needed', 'textarea'],
    ['scope', 'Authorised testing scope (what I will and will not test)', 'textarea'],
    ['timeline', 'Timeline', 'textarea'],
    ['sources', 'Initial sources', 'textarea']
  ];
  const form = $('#proposal');
  form.innerHTML = FIELDS.map(([id, label, type, opts]) => {
    const f = `pf_${id}`;
    if (type === 'select') return `<label for="${f}">${E(label)}<select id="${f}" name="${id}">${opts.map(o => `<option value="${E(o)}">${o ? E(o) : 'Select…'}</option>`).join('')}</select></label>`;
    if (type === 'textarea') return `<label for="${f}">${E(label)}<textarea id="${f}" name="${id}" rows="3"></textarea></label>`;
    return `<label for="${f}">${E(label)}<input id="${f}" name="${id}" autocomplete="off"></label>`;
  }).join('');

  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; } };
  const status = msg => { $('#propStatus').textContent = msg; };
  let canSave = true;
  function values() { const v = {}; FIELDS.forEach(([id]) => { v[id] = form.elements[id].value; }); return v; }
  function save() {
    if (!canSave) return;
    try { localStorage.setItem(KEY, JSON.stringify(values())); status('Saved in this browser.'); }
    catch { canSave = false; status('This browser is not saving. Download a copy before you leave.'); }
  }
  const saved = read();
  FIELDS.forEach(([id]) => { if (saved[id] != null) form.elements[id].value = saved[id]; });
  form.addEventListener('input', save);
  form.addEventListener('change', save);

  function asText() {
    const v = values();
    return 'IRONCREST RESEARCH PROJECT — PROPOSAL\n' + `Prepared ${new Date().toLocaleDateString()}\n\n` +
      FIELDS.map(([id, label]) => `${label.toUpperCase()}\n${v[id].trim() || '—'}`).join('\n\n') +
      '\n\nTemplate adapted from Beyond the Flag v1.0 by Abdullah Rehman, CC BY-SA 4.0 (doi.org/10.5281/zenodo.23341872).\n';
  }
  $('#propDownload').addEventListener('click', () => {
    const name = (form.elements.name.value.trim() || 'proposal').replace(/[^\w-]+/g, '-').slice(0, 40);
    const url = URL.createObjectURL(new Blob([asText()], { type: 'text/plain' }));
    const a = document.createElement('a'); a.href = url; a.download = `project-proposal-${name}.txt`; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000); status('Downloaded.');
  });
  $('#propCopy').addEventListener('click', async () => {
    const t = asText();
    try { await navigator.clipboard.writeText(t); }
    catch { const ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
    status('Copied. Paste it into your assignment.');
  });
  $('#propPrint').addEventListener('click', () => { document.body.classList.add('print-proposal'); window.print(); });
  window.addEventListener('afterprint', () => document.body.classList.remove('print-proposal'));
  $('#propClear').addEventListener('click', () => {
    if (!confirm('Clear every field in your proposal? Download a copy first if you need it.')) return;
    form.reset(); try { localStorage.removeItem(KEY); } catch {} status('Cleared.');
  });

  $('#ideaList').addEventListener('click', e => {
    const b = e.target.closest('[data-use]'); if (!b) return;
    const i = all.find(x => x.id === b.dataset.use); if (!i) return;
    form.elements.idea.value = `${i.id} ${i.title}`;
    if (!form.elements.resources.value.trim()) form.elements.resources.value = i.resources.map(r => `${r.name}: ${r.url}`).join('\n');
    save();
    const kit = $('#kit details'); kit.open = true;
    form.elements.idea.focus({ preventScroll: true });
    kit.scrollIntoView({ behavior: 'smooth', block: 'start' });
    status(`Added idea ${i.id} to your proposal.`);
  });
})();

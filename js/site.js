/* Ironcrest site settings and shared navigation.
   TEACHER SETTING: change CURRENT_UNIT when the class moves to a new unit. */
(() => {
  'use strict';
  const CURRENT_UNIT = 2;

  const script = document.currentScript;
  const base = script ? new URL('../', script.src).href : '/';
  const units = {
    1: { title: 'Introduction to Security', studio: 'Human factors & AI', topics: [['1.1', 'Social engineering'], ['1.2', 'Suspicious logins and password attacks'], ['1.3', 'Public networks and wireless threats'], ['1.4', 'AI-based attacks'], ['1.5', 'AI in cyber defense']] },
    2: { title: 'Securing Spaces', studio: 'Physical security', topics: [['2.1', 'Cyber foundations: CIA and risk'], ['2.2', 'Physical vulnerabilities'], ['2.3', 'Protecting physical spaces'], ['2.4', 'Detecting physical attacks']] },
    3: { title: 'Securing Networks', studio: 'Network security', topics: [['3.1', 'Network attacks'], ['3.2', 'Wireless controls'], ['3.3', 'Segmentation'], ['3.4', 'Firewalls'], ['3.5', 'Detecting network attacks']] },
    4: { title: 'Securing Devices', studio: 'Device security', topics: [['4.1', 'Device vulnerabilities and attacks'], ['4.2', 'Authentication'], ['4.3', 'Protecting devices'], ['4.4', 'Detecting attacks on devices']] },
    5: { title: 'Securing Applications and Data', studio: 'Applications & data', topics: [['5.1', 'Application vulnerabilities and attacks'], ['5.2', 'Access controls'], ['5.3', 'Symmetric cryptography'], ['5.4', 'Asymmetric cryptography'], ['5.5', 'Protecting applications'], ['5.6', 'Detecting attacks on applications and data']] }
  };
  const url = p => new URL(p, base).href;
  const unitUrl = (n, view) => url(`academy/#unit/${n}${view ? '/' + view : ''}`);
  window.IRONCREST_SITE = Object.freeze({ currentUnit: CURRENT_UNIT, units, base, url, unitUrl });

  const NAV = [['Home', '', ['']], ['Units', '#units', ['academy/', 'unit-simulations/', 'study/', 'training/']], ['Evidence Lab', 'evidence-lab/', ['evidence-lab/']], ['Intel', 'cti/', ['cti/']], ['Projects', 'projects/', ['projects/']], ['Resources', 'resources/', ['resources/']]];
  function mount() {
    if (document.querySelector('.ic-sitenav') || document.body.dataset.sitenav === 'off') return;
    const here = location.href.split('#')[0].split('?')[0];
    const rel = here.startsWith(base) ? here.slice(base.length).replace(/index\.html$/, '') : '';
    const active = NAV.findIndex(([, , match]) => match.some(m => m === '' ? rel === '' : rel.startsWith(m)));
    const style = document.createElement('style');
    style.textContent = `.ic-sitenav{position:relative;z-index:50;display:flex;align-items:center;gap:6px 18px;flex-wrap:wrap;padding:10px 20px;background:#07111a;border-bottom:1px solid #22394a;font:600 15px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif}
.ic-sitenav .ic-sn-brand{color:#edf5f8;text-decoration:none;letter-spacing:.14em;font-size:13px;margin-right:8px}
.ic-sitenav .ic-sn-brand span{color:#78e1bc}
.ic-sitenav a.ic-sn-link{color:#c6d6de;text-decoration:none;padding:6px 2px;border-bottom:2px solid transparent}
.ic-sitenav a.ic-sn-link:hover{color:#fff;border-bottom-color:#3d5a6a}
.ic-sitenav a.ic-sn-link[aria-current=page]{color:#78e1bc;border-bottom-color:#78e1bc}
.ic-sitenav .ic-sn-unit{margin-left:auto;font-weight:500;font-size:13px;color:#f6ce7c;text-decoration:none}
.ic-sitenav a:focus-visible{outline:2px solid #f6ce7c;outline-offset:2px}
@media(max-width:640px){.ic-sitenav{gap:4px 14px;padding:8px 14px;font-size:14px}.ic-sitenav .ic-sn-unit{margin-left:0;width:100%}}
@media print{.ic-sitenav{display:none}}`;
    const nav = document.createElement('nav');
    nav.className = 'ic-sitenav';
    nav.setAttribute('aria-label', 'Ironcrest site');
    const u = units[CURRENT_UNIT];
    nav.innerHTML = `<a class="ic-sn-brand" href="${url('')}">IRON<span>CREST</span></a>` +
      NAV.map(([label, href], i) => `<a class="ic-sn-link" href="${url(href)}"${i === active ? ' aria-current="page"' : ''}>${label}</a>`).join('') +
      `<a class="ic-sn-unit" href="${unitUrl(CURRENT_UNIT)}">This unit: ${CURRENT_UNIT} · ${u.title} →</a>`;
    document.head.append(style);
    document.body.prepend(nav);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();

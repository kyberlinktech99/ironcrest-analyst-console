/* ============================================================
   AP Cybersecurity Sim Lab — Student Record & Submission module
   Shared by every hub, every sim, the FRQ page and the teacher dashboard (Units 1-5).

   What it does
   - Asks the student for their name + class period once (stored on this device)
   - Records every completed attempt (score, time, per-question detail)
   - Lets the student submit: download a file, copy a code, or (optional) send to a URL
   - Signs the package so casual edits to the file are detectable by the teacher page

   Teacher setup (optional): set SUBMIT_ENDPOINT below to a Google Apps Script /
   form-handler URL and a "Send to teacher" button appears. Leave '' to disable.
   ============================================================ */
(function (global) {
  'use strict';

  var CONFIG = {
    SUBMIT_ENDPOINT: '',            // e.g. 'https://script.google.com/macros/s/XXXX/exec'
    COURSE: 'Ironcrest · AP Cybersecurity'
  };

  var STORE_KEY = 'apcyber_record_v2';
  var FRQ_KEY = 'apcyber_frq_v2';
  var FORMAT = 'ap-cyber';
  var SALT = 'ap-cyber-sim-lab::integrity::v2'; // deterrent against casual edits, not real security

  /* Every unit, hub and simulation. sim key + unit uniquely identifies a sim; frq = its FRQ id. */
  var UNITS = {
    1: { title: 'Introduction to Security', hub: 'sim_hub.html', order: ['cia', 'actors', 'phish', 'surface', 'risk', 'defense'], sims: {
      cia:     { n: '1.1', title: 'CIA Triad Lab',             file: 'sim_cia.html',              frq: 'frq1' },
      actors:  { n: '1.2', title: 'Threat Actor Profiler',     file: 'sim_threat_actors.html',    frq: 'frq2' },
      phish:   { n: '1.3', title: 'Spot the Phish',            file: 'phishing_simulation.html',  frq: 'frq3' },
      surface: { n: '1.4', title: 'Attack Surface Mapper',     file: 'sim_attack_surface.html',   frq: 'frq4' },
      risk:    { n: '1.5', title: 'Risk Matrix Lab',           file: 'sim_risk.html',             frq: 'frq5' },
      defense: { n: '1.6', title: 'Defense-in-Depth Builder',  file: 'sim_defense.html',          frq: 'frq6' } } },
    2: { title: 'Securing Spaces', hub: 'sim2_hub.html', order: ['pc', 'se', 'rfid', 'ac', 'audit'], sims: {
      pc:    { n: '2.1', title: 'Physical Controls Classifier', file: 'sim2_physical_controls.html',   frq: 'frq1' },
      se:    { n: '2.2', title: 'Social Engineering Response',  file: 'sim2_social_engineering.html',  frq: 'frq2' },
      rfid:  { n: '2.3', title: 'RFID Vulnerability Lab',       file: 'sim2_rfid.html',                frq: 'frq3' },
      ac:    { n: '2.4', title: 'Access Control Matrix Builder',file: 'sim2_access_control.html',      frq: 'frq4' },
      audit: { n: '2.5', title: 'Physical Security Audit',      file: 'sim2_security_audit.html',      frq: 'frq5' } } },
    3: { title: 'Securing Networks', hub: 'sim3_hub.html', order: ['fw', 'shark', 'topo', 'wifi', 'tl', 'vpn'], sims: {
      fw:    { n: '3.1', title: 'Firewall Rule Builder',        file: 'sim3_firewall.html',   frq: 'frq1' },
      shark: { n: '3.2', title: 'Wireshark Packet Analyzer',    file: 'sim3_wireshark.html',  frq: 'frq2' },
      topo:  { n: '3.3', title: 'Network Topology Defender',    file: 'sim3_topology.html',   frq: 'frq3' },
      wifi:  { n: '3.4', title: 'Wireless Attack Identifier',   file: 'sim3_wireless.html',   frq: 'frq4' },
      tl:    { n: '3.5', title: 'Network Attack Timeline',      file: 'sim3_timeline.html',   frq: 'frq5' },
      vpn:   { n: '3.6', title: 'VPN & Encryption Analyzer',    file: 'sim3_vpn.html',        frq: 'frq6' } } },
    4: { title: 'Securing Devices', hub: 'sim4_hub.html', order: ['mal', 'auth', 'logs', 'patch', 'ir'], sims: {
      mal:   { n: '4.1', title: 'Malware Taxonomy Lab',         file: 'sim4_malware.html',    frq: 'frq1' },
      auth:  { n: '4.2', title: 'Authentication Factor Builder',file: 'sim4_auth.html',       frq: 'frq2' },
      logs:  { n: '4.3', title: 'Log Analysis Detective',       file: 'sim4_logs.html',       frq: 'frq3' },
      patch: { n: '4.4', title: 'Patch Priority Ranker',        file: 'sim4_patch.html',      frq: 'frq4' },
      ir:    { n: '4.5', title: 'Incident Response Sequencer',  file: 'sim4_ir.html',         frq: 'frq5' } } },
    5: { title: 'Securing Apps & Data', hub: 'sim5_hub.html', order: ['enc', 'sqli', 'cert', 'dclass', 'siem'], sims: {
      enc:    { n: '5.1', title: 'Encryption Type Matcher',     file: 'sim5_encryption.html', frq: 'frq1' },
      sqli:   { n: '5.2', title: 'SQL Injection Detective',     file: 'sim5_sqli.html',       frq: 'frq2' },
      cert:   { n: '5.3', title: 'Certificate Trust Chain',     file: 'sim5_certs.html',      frq: 'frq3' },
      dclass: { n: '5.4', title: 'Data Classification Lab',     file: 'sim5_dataclass.html',  frq: 'frq4' },
      siem:   { n: '5.5', title: 'SIEM Alert Investigator',     file: 'sim5_siem.html',       frq: 'frq5' } } }
  };
  function U(unit) { return UNITS[unit]; }

  /* ---------- storage (localStorage with in-memory fallback) ---------- */
  var memStore = null;
  var persistent = true;

  function load() {
    if(global.IRONCREST_TRAINING){var t=global.IRONCREST_TRAINING,p=t.profile(),d=t.read('sim-record',{student:null,attempts:[]});d.student=p?{name:p.alias,period:p.period}:null;return d;}
    try {
      var raw = global.localStorage.getItem(STORE_KEY);
      if (raw) { var d = JSON.parse(raw); if (d && d.attempts) return d; }
    } catch (e) { persistent = false; }
    return memStore || { student: null, attempts: [] };
  }
  function save(d) {
    memStore = d;
    if(global.IRONCREST_TRAINING){persistent=global.IRONCREST_TRAINING.write('sim-record',d);return persistent;}
    try { global.localStorage.setItem(STORE_KEY, JSON.stringify(d)); persistent = true; return true; }
    catch (e) { persistent = false; return false; }
  }

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function hash(str) {
    // two independent FNV-1a passes -> 16 hex chars
    var h1 = 0x811c9dc5, h2 = 0x01000193 ^ 0xabcdef;
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      h1 ^= c; h1 = (h1 * 0x01000193) >>> 0;
      h2 ^= (c + i) & 0xff; h2 = (h2 * 0x85ebca6b) >>> 0;
    }
    return ('00000000' + h1.toString(16)).slice(-8) + ('00000000' + h2.toString(16)).slice(-8);
  }
  function sign(student, attempts) {
    return hash(SALT + JSON.stringify({ student: student, attempts: attempts }));
  }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function toB64(s) { return btoa(unescape(encodeURIComponent(s))); }
  function fromB64(s) { return decodeURIComponent(escape(atob(s))); }

  function buildPackage(unit) {
    var d = load();
    var student = d.student || { name: '', period: '' };
    var pkg = {
      format: FORMAT, v: 2,
      course: CONFIG.COURSE, unit: unit,
      exported: new Date().toISOString(),
      student: student,
      attempts: d.attempts.filter(function (a) { return a.unit === unit; })
    };
    pkg.sig = sign(pkg.student, pkg.attempts);
    return pkg;
  }
  function verify(pkg) {
    return !!(pkg && pkg.format === FORMAT && pkg.student && Array.isArray(pkg.attempts) &&
              pkg.sig === sign(pkg.student, pkg.attempts));
  }
  function encodeCode(pkg) { return 'AP' + pkg.unit + '-' + toB64(JSON.stringify(pkg)); }
  function decodeCode(code) {
    code = String(code).replace(/\s+/g, '');
    code = code.replace(/^AP\d-/, '');
    return JSON.parse(fromB64(code));
  }

  /* ---------- summaries ---------- */
  function bestBySim(attempts, unit) {
    var out = {};
    attempts.forEach(function (a) {
      if (unit != null && a.unit !== unit) return;
      var o = out[a.sim] || (out[a.sim] = { best: null, last: null, count: 0 });
      o.count++;
      if (!o.best || a.pct > o.best.pct) o.best = a;
      if (!o.last || a.finished > o.last.finished) o.last = a;
    });
    return out;
  }
  function overall(attempts, unit) {
    var b = bestBySim(attempts, unit), done = 0, sum = 0, order = U(unit).order;
    order.forEach(function (k) { if (b[k]) { done++; sum += b[k].best.pct; } });
    return { done: done, total: order.length, avg: done ? Math.round(sum / order.length) : 0 };
  }

  /* ---------- styles ---------- */
  function injectStyles() {
    if (document.getElementById('u2rec-style')) return;
    var st = document.createElement('style');
    st.id = 'u2rec-style';
    st.textContent = [
      '.u2-acc{--u2a:var(--acc,var(--P,#f97316));}',
      '.u2-chip{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono,monospace);font-size:11px;color:var(--text2,#8a9bc4);border:1px solid var(--border2,#2a3f6a);padding:5px 10px;margin-left:12px;white-space:nowrap;}',
      '.u2-chip b{color:var(--text,#e2eaf8);font-weight:400;}',
      '.u2-chip button{background:none;border:none;color:var(--acc,var(--P,#f97316));font-family:inherit;font-size:11px;cursor:pointer;text-decoration:underline;padding:0;}',
      '.u2-panel{background:var(--panel,#111827);border:1px solid var(--border2,#2a3f6a);border-top:3px solid var(--acc,var(--P,#f97316));padding:20px 22px;margin:26px 0 8px;}',
      '.u2-lbl{font-family:var(--mono,monospace);font-size:10px;letter-spacing:.2em;color:var(--acc,var(--P,#f97316));margin-bottom:8px;}',
      '.u2-h{font-family:var(--display,sans-serif);font-size:18px;font-weight:700;margin-bottom:6px;color:var(--text,#e2eaf8);}',
      '.u2-p{font-size:13px;color:var(--text2,#8a9bc4);line-height:1.6;margin-bottom:12px;}',
      '.u2-p b{color:var(--text,#e2eaf8);font-weight:500;}',
      '.u2-row{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0 4px;}',
      '.u2-btn{font-family:var(--mono,monospace);font-size:11px;letter-spacing:.08em;text-transform:uppercase;padding:10px 16px;cursor:pointer;border:1px solid var(--acc,var(--P,#f97316));background:transparent;color:var(--acc,var(--P,#f97316));transition:all .2s;}',
      '.u2-btn:hover{background:var(--hover,rgba(255,255,255,.06));}',
      '.u2-btn.primary{background:var(--acc,var(--P,#f97316));color:var(--on-acc,#000);font-weight:700;}',
      '.u2-btn.primary:hover{filter:brightness(1.1);}',
      '.u2-btn.quiet{border-color:var(--border2,#2a3f6a);color:var(--text2,#8a9bc4);}',
      '.u2-status{font-family:var(--mono,monospace);font-size:11px;min-height:16px;margin-top:8px;color:var(--ok,#22c55e);}',
      '.u2-status.err{color:var(--bad,#ff4757);}',
      '.u2-warn{border:1px solid var(--warn,#f59e0b);background:color-mix(in srgb,var(--warn,#f59e0b) 9%,transparent);color:var(--warn-text,#f5c15a);font-size:12px;line-height:1.5;padding:10px 12px;margin-bottom:12px;}',
      '.u2-code{width:100%;height:70px;margin-top:10px;background:var(--bg,#0a0e1a);color:var(--text2,#8a9bc4);border:1px solid var(--border,#1e2d4a);font-family:var(--mono,monospace);font-size:10px;padding:8px;resize:vertical;}',
      '.u2-tbl{width:100%;border-collapse:collapse;margin:10px 0 4px;font-size:12px;}',
      '.u2-tbl th{font-family:var(--mono,monospace);font-size:10px;letter-spacing:.1em;color:var(--text3,#4a5a82);text-align:left;padding:6px 8px;border-bottom:1px solid var(--border,#1e2d4a);font-weight:400;}',
      '.u2-tbl td{padding:8px;border-bottom:1px solid var(--border,#1e2d4a);color:var(--text2,#8a9bc4);vertical-align:middle;}',
      '.u2-tbl td a{color:var(--text,#e2eaf8);text-decoration:none;}',
      '.u2-tbl td a:hover{text-decoration:underline;}',
      '.u2-pct{font-family:var(--mono,monospace);color:var(--text,#e2eaf8);}',
      '.u2-pct.hi{color:var(--ok,#22c55e)}.u2-pct.mid{color:var(--warn,#f59e0b)}.u2-pct.lo{color:var(--bad,#ff4757)}',
      '.u2-modal{position:fixed;inset:0;background:var(--scrim,rgba(5,8,16,.88));z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;}',
      '.u2-card{background:var(--panel,#111827);border:1px solid var(--border2,#2a3f6a);border-top:3px solid var(--acc,var(--P,#f97316));max-width:420px;width:100%;padding:26px;}',
      '.u2-card label{display:block;font-family:var(--mono,monospace);font-size:10px;letter-spacing:.15em;color:var(--text3,#4a5a82);margin:14px 0 6px;}',
      '.u2-card input,.u2-card select{width:100%;padding:10px 12px;background:var(--bg,#0a0e1a);border:1px solid var(--border2,#2a3f6a);color:var(--text,#e2eaf8);font-family:var(--sans,sans-serif);font-size:14px;}',
      '.u2-card input:focus,.u2-card select:focus{outline:none;border-color:var(--acc,var(--P,#f97316));}',
      '@media(max-width:600px){.u2-chip{margin:8px 0 0;}.u2-tbl{font-size:11px;}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  /* ---------- student identity ---------- */
  function getStudent() { if(global.IRONCREST_TRAINING){var p=global.IRONCREST_TRAINING.profile();return p?{name:p.alias,period:p.period}:null;}return load().student; }

  function askStudent(onDone, opts) {
    if(global.IRONCREST_TRAINING){global.IRONCREST_TRAINING.requestProfile(onDone);return;}
    injectStyles();
    opts = opts || {};
    var cur = getStudent() || { name: '', period: '' };
    var m = document.createElement('div');
    m.className = 'u2-modal u2-acc';
    m.innerHTML =
      '<form class="u2-card" autocomplete="off">' +
      '<div class="u2-lbl">// IRONCREST ANALYST TRAINING</div>' +
      '<div class="u2-h">' + (opts.change ? 'Switch student' : 'Who is working today?') + '</div>' +
      '<div class="u2-p">Your name is saved on this device and attached to every result so your teacher can see your work.</div>' +
      '<label>FULL NAME</label><input id="u2n" required maxlength="60" placeholder="First Last" value="' + esc(cur.name) + '">' +
      '<label>CLASS / PERIOD</label><input id="u2p" maxlength="30" placeholder="e.g. Period 3" value="' + esc(cur.period) + '">' +
      '<div class="u2-row" style="margin-top:20px;"><button class="u2-btn primary" type="submit">Save &amp; continue</button>' +
      (opts.change ? '<button class="u2-btn quiet" type="button" id="u2x">Cancel</button>' : '') + '</div>' +
      '</form>';
    document.body.appendChild(m);
    var nameEl = m.querySelector('#u2n');
    setTimeout(function () { nameEl.focus(); }, 30);
    if (opts.change) m.querySelector('#u2x').onclick = function () { m.remove(); };
    m.querySelector('form').onsubmit = function (e) {
      e.preventDefault();
      var name = nameEl.value.trim();
      if (!name) return;
      var d = load();
      var changed = !d.student || d.student.name !== name;
      // switching to a different student starts a clean record on this device
      if (opts.change && changed && d.attempts.length && d.student) {
        if (!global.confirm('Switching students will clear the saved attempts on this device for ' + d.student.name + '. Submit them first if you haven\'t. Continue?')) return;
        d.attempts = [];
      }
      d.student = { name: name, period: m.querySelector('#u2p').value.trim() };
      save(d);
      m.remove();
      renderChips();
      document.dispatchEvent(new Event('apsim-student'));
      if (opts.change) global.location.reload();
      else if (onDone) onDone(d.student);
    };
  }

  function renderChips() {
    var s = getStudent();
    var hdr = document.querySelector('.hdr') || document.getElementById('u2-chip-host');
    if (!hdr) return;
    var chip = document.getElementById('u2-chip');
    if (!chip) {
      chip = document.createElement('div');
      chip.id = 'u2-chip';
      chip.className = 'u2-chip';
      // sit just before the score display so the score stays right-aligned
      var score = document.getElementById('score-disp');
      if (score) hdr.insertBefore(chip, score); else hdr.appendChild(chip);
    }
    chip.innerHTML = s
      ? '👤 <b>' + esc(s.name) + '</b>' + (s.period ? ' · ' + esc(s.period) : '') + ' <button type="button">change</button>'
      : '👤 <button type="button">Enter name</button>';
    chip.querySelector('button').onclick = function () { askStudent(null, { change: !!s }); };
  }

  /* ---------- recording ---------- */
  var runs = {}; // unit:sim -> start time
  function start(unit, sim) { if(global.IRONCREST_TRAINING)global.IRONCREST_TRAINING.start('sim:'+unit+':'+sim);runs[unit + ':' + sim] = Date.now(); }

  /* finish(): call once when the results screen is built.
     opts = { sim, screenId, score, max, items:[{label, result, pts, max, response?}] } */
  function finish(opts) {
    injectStyles();
    var d = load();
    var now = Date.now();
    var started = runs[opts.unit + ':' + opts.sim] || now;
    var score = Math.round(opts.score * 10) / 10;
    var pct = opts.max ? Math.round(score / opts.max * 100) : 0;
    var n = d.attempts.filter(function (a) { return a.unit === opts.unit && a.sim === opts.sim; }).length + 1;
    var attempt = {
      id: uid(), unit: opts.unit, sim: opts.sim, simTitle: U(opts.unit).sims[opts.sim].title, attempt: n,
      started: new Date(started).toISOString(), finished: new Date(now).toISOString(),
      seconds: Math.max(1, Math.round((now - started) / 1000)),
      score: score, max: opts.max, pct: pct, items: opts.items
    };
    d.attempts.push(attempt);
    if(global.IRONCREST_TRAINING)global.IRONCREST_TRAINING.recordAttempt(attempt);
    save(d);
    // next run (via "Run again") is timed from now
    runs[opts.unit + ':' + opts.sim] = now;

    var host = document.getElementById(opts.screenId);
    if (!host) return attempt;
    var old = host.querySelector('.u2-panel'); if (old) old.remove();
    var panel = document.createElement('div');
    panel.className = 'u2-panel u2-acc';
    host.insertBefore(panel, host.querySelector('.nav'));
    renderSubmitPanel(panel, attempt);
    if (!d.student) askStudent(function () { renderSubmitPanel(panel, attempt); });
    return attempt;
  }

  /* ---------- submission actions (all take the unit being submitted) ---------- */
  function flash(el, msg, err) {
    el.textContent = msg; el.className = 'u2-status' + (err ? ' err' : '');
  }
  function fileName(unit) {
    var s = getStudent() || { name: 'student' };
    var safe = s.name.trim().replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'student';
    return 'Unit' + unit + '_Submission_' + safe + '_' + new Date().toISOString().slice(0, 10) + '.json';
  }
  function downloadFile(unit, statusEl) {
    if (!getStudent()) return askStudent(function () { downloadFile(unit, statusEl); });
    var pkg = buildPackage(unit);
    var blob = new Blob([JSON.stringify(pkg, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = fileName(unit);
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    flash(statusEl, '✓ Downloaded ' + a.download + ' — upload it where your teacher asked.');
  }
  function copyCode(unit, statusEl, codeBox) {
    if (!getStudent()) return askStudent(function () { copyCode(unit, statusEl, codeBox); });
    var code = encodeCode(buildPackage(unit));
    codeBox.style.display = 'block'; codeBox.value = code;
    function fallback() {
      codeBox.focus(); codeBox.select();
      try { document.execCommand('copy'); flash(statusEl, '✓ Code copied — paste it where your teacher asked.'); }
      catch (e) { flash(statusEl, 'Select the code below and copy it (Ctrl/Cmd+C).', true); }
    }
    if (global.navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(function () {
        flash(statusEl, '✓ Code copied — paste it where your teacher asked.');
      }, fallback);
    } else fallback();
  }
  function sendToTeacher(unit, statusEl) {
    if (!getStudent()) return askStudent(function () { sendToTeacher(unit, statusEl); });
    flash(statusEl, 'Sending…');
    fetch(CONFIG.SUBMIT_ENDPOINT, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(buildPackage(unit))
    }).then(function () {
      flash(statusEl, '✓ Sent to your teacher at ' + new Date().toLocaleTimeString() + '. Also download a copy to be safe.');
    }, function () {
      flash(statusEl, 'Could not send (no connection?). Use Download file instead.', true);
    });
  }

  function actionsHTML() {
    return '<div class="u2-row">' +
      (CONFIG.SUBMIT_ENDPOINT ? '<button type="button" class="u2-btn primary" data-act="send">📤 Send to teacher</button>' : '') +
      '<button type="button" class="u2-btn' + (CONFIG.SUBMIT_ENDPOINT ? '' : ' primary') + '" data-act="file">⬇ Download submission file</button>' +
      '<button type="button" class="u2-btn" data-act="code">📋 Copy submission code</button>' +
      '</div><div class="u2-status" data-role="status"></div>' +
      '<textarea class="u2-code" data-role="code" readonly style="display:none" onclick="this.select()"></textarea>';
  }
  function wireActions(root, unit) {
    var st = root.querySelector('[data-role=status]');
    var cb = root.querySelector('[data-role=code]');
    root.addEventListener('click', function (e) {
      var act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
      if (act === 'file') downloadFile(unit, st);
      else if (act === 'code') copyCode(unit, st, cb);
      else if (act === 'send') sendToTeacher(unit, st);
    });
  }
  function storageWarn() {
    return persistent ? '' :
      '<div class="u2-warn">⚠ This browser is blocking saved data, so your results only last while this page stays open. <b>Download your submission file now</b> before closing the tab.</div>';
  }

  function renderSubmitPanel(panel, attempt) {
    var s = getStudent(), unit = attempt.unit;
    var tot = overall(load().attempts, unit);
    panel.innerHTML =
      '<div class="u2-lbl">// SUBMIT YOUR RESULTS</div>' +
      '<div class="u2-h">Attempt ' + attempt.attempt + ' recorded ✓</div>' +
      storageWarn() +
      '<div class="u2-p"><b>' + attempt.simTitle + '</b> — ' + attempt.score + ' / ' + attempt.max + ' pts (' + attempt.pct + '%) in ' + fmtTime(attempt.seconds) +
      '.<br>Student: <b>' + (s ? esc(s.name) + (s.period ? ' · ' + esc(s.period) : '') : 'not entered yet') + '</b> · Unit ' + unit + ' progress: <b>' + tot.done + ' of ' + tot.total + '</b> sims with recorded attempts.</div>' +
      '<div class="u2-p">Your submission file includes <b>every Unit ' + unit + ' attempt in this analyst profile</b>, so you can submit once after finishing all ' + tot.total + ' sims, or submit after each one.</div>' +
      actionsHTML() + frqBlock(unit, attempt.sim);
    wireActions(panel, unit);
  }

  /* FRQ launch block, shown at the bottom of the submit panel */
  function frqStatus(unit, frqId) {
    try {
      var d = JSON.parse(global.localStorage.getItem(FRQ_KEY) || '{}');
      return ['a', 'b', 'c'].filter(function (k) { return ((d['u' + unit + '_' + frqId + k] || '').trim().match(/\S+/g) || []).length >= 5; }).length;
    } catch (e) { return 0; }
  }
  function frqBlock(unit, sim) {
    var m = U(unit).sims[sim];
    if (!m || !m.frq) return '';
    var n = frqStatus(unit, m.frq);
    var label = n === 3 ? 'Review / copy your FRQ' : n > 0 ? 'Continue your FRQ' : 'Launch FRQ ' + m.n;
    return '<div style="border-top:1px solid var(--border,#1e2d4a);margin-top:18px;padding-top:16px;">' +
      '<div class="u2-lbl" style="color:var(--c-amber,#fbbf24);">// NEXT STEP — FREE RESPONSE</div>' +
      '<div class="u2-p">Now show what you learned in writing. Answer the short FRQ for <b>' + m.title + '</b>, then copy it into Schoology.' +
      (n ? ' <b>(' + n + ' of 3 parts drafted)</b>' : '') + '</div>' +
      '<div class="u2-row"><a class="u2-btn primary" style="background:var(--c-amber,#fbbf24);border-color:var(--c-amber,#fbbf24);color:var(--on-acc,#000);text-decoration:none;display:inline-block;" href="assessment.html?u=' + unit + '&frq=' + m.frq + '">' + label + ' →</a>' +
      '<a class="u2-btn quiet" style="text-decoration:none;display:inline-block;" href="' + U(unit).hub + '">Back to Unit ' + unit + ' hub</a></div></div>';
  }

  /* ---------- hub panel ---------- */
  function fmtTime(sec) {
    if (sec < 60) return sec + 's';
    return Math.floor(sec / 60) + 'm ' + (sec % 60 ? (sec % 60) + 's' : '');
  }
  function cls(p) { return p >= 80 ? 'hi' : p >= 50 ? 'mid' : 'lo'; }

  function renderHub(rootId, unit) {
    injectStyles();
    var root = document.getElementById(rootId);
    if (!root) return;
    renderChips();
    var d = load(), b = bestBySim(d.attempts, unit), tot = overall(d.attempts, unit), s = d.student, def = U(unit);
    var rows = def.order.map(function (k) {
      var o = b[k], m = def.sims[k];
      return '<tr><td><a href="' + m.file + '">' + m.n + ' · ' + m.title + '</a></td>' +
        '<td>' + (o ? '<span class="u2-pct ' + cls(o.best.pct) + '">' + o.best.pct + '%</span>' : '<span style="color:var(--text3,#4a5a82)">Not started</span>') + '</td>' +
        '<td>' + (o ? o.count : '—') + '</td>' +
        '<td>' + (o ? new Date(o.last.finished).toLocaleDateString() : '—') + '</td></tr>';
    }).join('');
    var mine = d.attempts.filter(function (a) { return a.unit === unit; }).length;
    root.className = 'u2-panel u2-acc';
    root.innerHTML =
      '<div class="u2-lbl">// MY UNIT ' + unit + ' RECORD &amp; SUBMISSION</div>' +
      '<div class="u2-h">' + (s ? esc(s.name) + (s.period ? ' · ' + esc(s.period) : '') : 'Enter your name to start recording') + '</div>' +
      storageWarn() +
      '<table class="u2-tbl"><thead><tr><th>SIMULATION</th><th>BEST</th><th>ATTEMPTS</th><th>LAST RUN</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      '<div class="u2-p" style="margin-top:10px;"><b>' + tot.done + ' of ' + tot.total + '</b> complete · unit average (best scores) <b>' + tot.avg + '%</b>. ' +
      'When you\'re done, submit the file or code below to your teacher.</div>' +
      actionsHTML() +
      (mine ? '<div class="u2-row"><button type="button" class="u2-btn quiet" data-act="reset">Clear my saved Unit ' + unit + ' record</button></div>' : '');
    wireActions(root, unit);
    var rb = root.querySelector('[data-act=reset]');
    if (rb) rb.onclick = function () {
      if (global.confirm('Delete all saved Unit ' + unit + ' attempts on this device? Submit them first if you still need to.')) {
        var dd = load(); dd.attempts = dd.attempts.filter(function (a) { return a.unit !== unit; }); save(dd); renderHub(rootId, unit);
      }
    };
  }

  /* ---------- boot: ask for name on first visit ---------- */
  function boot() {
    if (global.APSIM_NO_PROMPT) return;
    injectStyles();
    renderChips();
    if (!getStudent()) askStudent(null);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  global.APSim = {
    config: CONFIG, units: UNITS, frqKey: FRQ_KEY,
    start: start, finish: finish, renderHub: renderHub,
    getStudent: getStudent, load: load, buildPackage: buildPackage,
    verify: verify, decodeCode: decodeCode, bestBySim: bestBySim, overall: overall
  };
})(window);

/* Unit 2 Sim Lab — theme switcher. Load in <head> so the theme is set before first paint.
   Default is LIGHT. The choice is remembered on this device. */
(function () {
  'use strict';
  var KEY = 'ironcrest_unit_theme_v1';
  var root = document.documentElement;

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function remember(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.getElementById('u2-theme-toggle');
    if (btn) {
      var dark = theme === 'dark';
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.innerHTML = '<span class="ic" aria-hidden="true">' + (dark ? '☀' : '☾') + '</span><span class="tx">' + (dark ? 'Light mode' : 'Dark mode') + '</span>';
    }
  }

  var theme = stored() === 'light' ? 'light' : 'dark';
  apply(theme);

  function mount() {
    if (document.getElementById('u2-theme-toggle')) return;
    var b = document.createElement('button');
    b.id = 'u2-theme-toggle'; b.type = 'button'; b.className = 'u2-theme-toggle';
    b.onclick = function () {
      theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      remember(theme); apply(theme);
    };
    document.body.appendChild(b);
    apply(root.getAttribute('data-theme'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();

  // always print in light, then restore
  var before;
  window.addEventListener('beforeprint', function () { before = root.getAttribute('data-theme'); root.setAttribute('data-theme', 'light'); });
  window.addEventListener('afterprint', function () { if (before) root.setAttribute('data-theme', before); });
})();

/**
 * /for-hire/ Directory Private Access Gate
 * Password protected for Zach Heindel
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'for_hire_auth_v1';
  var TARGET_HASH = '8e5d6f910930041c2944d8ee3bde634f8e4cdf273c0575a43571d989756f6bbe';
  var FALLBACK_B64 = 'cHN5Y2hlSjIyIQ==';

  function isAuthorized() {
    try {
      return (
        sessionStorage.getItem(STORAGE_KEY) === 'granted' ||
        localStorage.getItem(STORAGE_KEY) === 'granted'
      );
    } catch (e) {
      return false;
    }
  }

  function grantAccess(persist) {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'granted');
      if (persist) {
        localStorage.setItem(STORAGE_KEY, 'granted');
      }
    } catch (e) {}

    document.documentElement.classList.add('auth-unlocked');
    document.body.classList.add('auth-unlocked');

    var overlay = document.getElementById('auth-gate-overlay');
    if (overlay) {
      overlay.classList.add('fade-out');
      setTimeout(function () {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 350);
    }
  }

  function lockPage() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    window.location.reload();
  }
  window.lockPage = lockPage;

  async function checkPassword(input) {
    if (!input) return false;
    if (window.crypto && crypto.subtle && window.TextEncoder) {
      try {
        var enc = new TextEncoder().encode(input);
        var buf = await crypto.subtle.digest('SHA-256', enc);
        var hex = Array.from(new Uint8Array(buf))
          .map(function (b) {
            return b.toString(16).padStart(2, '0');
          })
          .join('');
        if (hex === TARGET_HASH) return true;
      } catch (err) {}
    }
    try {
      return btoa(input) === FALLBACK_B64;
    } catch (e) {
      return false;
    }
  }

  function renderGate() {
    if (document.getElementById('auth-gate-overlay')) return;

    var overlay = document.createElement('div');
    overlay.id = 'auth-gate-overlay';
    overlay.innerHTML = [
      '<div class="auth-card" id="auth-card-box">',
      '  <div class="auth-icon-wrap" id="auth-icon-container">',
      '    <i id="auth-lock-icon" class="fa-solid fa-lock"></i>',
      '  </div>',
      '  <div class="auth-badge">',
      '    <span class="auth-badge-dot"></span>',
      '    <span>Restricted Access</span>',
      '  </div>',
      '  <h1 class="auth-title">Private Directory</h1>',
      '  <p class="auth-subtitle">This section (/for-hire/) is restricted to authorized administrative viewing. Please enter your password to unlock.</p>',
      '  <form class="auth-form" id="auth-gate-form" autocomplete="off">',
      '    <div class="auth-input-group">',
      '      <i class="fa-solid fa-key auth-input-icon"></i>',
      '      <input type="password" id="auth-pwd-input" class="auth-input" placeholder="Enter password..." autocomplete="current-password" autofocus required spellcheck="false" />',
      '      <button type="button" class="auth-eye-btn" id="auth-eye-btn" title="Toggle password visibility">',
      '        <i class="fa-solid fa-eye" id="auth-eye-icon"></i>',
      '      </button>',
      '    </div>',
      '    <label class="auth-options">',
      '      <input type="checkbox" id="auth-remember-check" />',
      '      <span>Remember this browser</span>',
      '    </label>',
      '    <div class="auth-error-msg" id="auth-error-box" style="display: none;">',
      '      <i class="fa-solid fa-triangle-exclamation"></i>',
      '      <span>Incorrect password. Access denied.</span>',
      '    </div>',
      '    <button type="submit" class="auth-submit-btn" id="auth-submit-button">',
      '      <i class="fa-solid fa-arrow-right-to-bracket"></i>',
      '      <span id="auth-submit-text">Unlock Access</span>',
      '    </button>',
      '  </form>',
      '  <div class="auth-footer">',
      '    <a href="../" class="auth-back-link"><i class="fa-solid fa-arrow-left"></i> Return to Projects</a>',
      '  </div>',
      '</div>'
    ].join('\n');

    document.body.prepend(overlay);

    var form = document.getElementById('auth-gate-form');
    var input = document.getElementById('auth-pwd-input');
    var card = document.getElementById('auth-card-box');
    var eyeBtn = document.getElementById('auth-eye-btn');
    var eyeIcon = document.getElementById('auth-eye-icon');
    var errorBox = document.getElementById('auth-error-box');
    var rememberCheck = document.getElementById('auth-remember-check');
    var iconContainer = document.getElementById('auth-icon-container');
    var lockIcon = document.getElementById('auth-lock-icon');
    var submitBtn = document.getElementById('auth-submit-button');
    var submitText = document.getElementById('auth-submit-text');

    if (input) {
      setTimeout(function () {
        input.focus();
      }, 100);
    }

    if (eyeBtn && input && eyeIcon) {
      eyeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (input.type === 'password') {
          input.type = 'text';
          eyeIcon.className = 'fa-solid fa-eye-slash';
        } else {
          input.type = 'password';
          eyeIcon.className = 'fa-solid fa-eye';
        }
      });
    }

    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        var val = input ? input.value : '';
        if (!val) return;

        submitBtn.disabled = true;
        submitText.textContent = 'Verifying...';

        var isValid = await checkPassword(val);

        if (isValid) {
          if (errorBox) errorBox.style.display = 'none';
          if (iconContainer) iconContainer.classList.add('success');
          if (lockIcon) lockIcon.className = 'fa-solid fa-lock-open';
          if (submitBtn) submitBtn.classList.add('success');
          submitText.textContent = 'Access Granted';

          setTimeout(function () {
            grantAccess(rememberCheck ? rememberCheck.checked : false);
          }, 400);
        } else {
          submitBtn.disabled = false;
          submitText.textContent = 'Unlock Access';
          if (errorBox) errorBox.style.display = 'flex';
          if (input) {
            input.classList.add('error');
            input.value = '';
            input.focus();
          }
          if (card) {
            card.classList.remove('shake');
            void card.offsetWidth; // trigger reflow
            card.classList.add('shake');
          }
        }
      });
    }

    if (input) {
      input.addEventListener('input', function () {
        input.classList.remove('error');
        if (errorBox) errorBox.style.display = 'none';
      });
    }
  }

  // Pre-check right when script runs
  if (isAuthorized()) {
    document.documentElement.classList.add('auth-unlocked');
    if (document.body) {
      document.body.classList.add('auth-unlocked');
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        document.body.classList.add('auth-unlocked');
      });
    }
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderGate);
    } else {
      renderGate();
    }
  }
})();

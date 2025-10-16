// public/js/ui.js
// Accessible confirm dialog with focus trap & return focus
(function(){
  const modal = document.getElementById('confirm-modal');
  if (!modal) return;
  const btnYes = document.getElementById('confirm-yes');
  const btnNo  = document.getElementById('confirm-no');
  const bodyEl = document.getElementById('confirm-desc');
  const titleEl= document.getElementById('confirm-title');
  let resolver = null, lastActive = null;

  function focusableInside(root){
    return Array.from(root.querySelectorAll('[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
  }


 function trap(e){
    if (e.key === 'Escape') { close(false); }
    if (e.key === 'Tab'){
      const els = focusableInside(modal);
      if (els.length === 0) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first){ last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last){ first.focus(); e.preventDefault(); }
    }
  }

  function open(opts){
    const { title = 'Confirm action', message = 'Are you sure?', confirmText = 'Yes', cancelText = 'No', danger = false } = opts || {};
    titleEl.textContent = title; bodyEl.textContent = message;
    btnYes.textContent = confirmText; btnNo.textContent = cancelText;
    btnYes.classList.toggle('btn-danger', !!danger);
    btnYes.classList.toggle('btn-primary', !danger);

    lastActive = document.activeElement;
    modal.classList.add('open');
    document.addEventListener('keydown', trap);
    btnNo.focus();
  }
 function close(result){
    modal.classList.remove('open');
    document.removeEventListener('keydown', trap);
    resolver && resolver(result);
    resolver = null;
    if (lastActive && lastActive.focus) lastActive.focus();
  }

  btnYes.addEventListener('click', () => close(true));
  btnNo.addEventListener('click', () => close(false));
  modal.querySelector('[data-close]')?.addEventListener('click', () => close(false));

  window.confirmDialog = function(opts){
    return new Promise((resolve)=>{ resolver = resolve; open(opts||{}); });
  }
})();

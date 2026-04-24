(function () {
  const status = document.getElementById('admin-status');
  const fallback = document.getElementById('admin-fallback');
  const root = document.getElementById('nc-root');

  function updateStatus(message, tone) {
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone || 'neutral';
  }

  function showFallback(message, tone) {
    updateStatus(message, tone);
    if (fallback) {
      fallback.hidden = false;
    }
  }

  function markReady() {
    document.body.classList.add('cms-ready');
    if (fallback) {
      fallback.hidden = true;
    }
  }

  function initCMS() {
    const init =
      window.initCMS ||
      (window.CMS && typeof window.CMS.init === 'function'
        ? window.CMS.init.bind(window.CMS)
        : null);

    if (!init) {
      showFallback(
        'The Decap CMS script did not load. Check your internet connection and refresh the page.',
        'error'
      );
      return;
    }

    try {
      init();
    } catch (error) {
      console.error(error);
      showFallback(
        'The CMS could not start correctly. Check the browser console for more details.',
        'error'
      );
      return;
    }

    window.setTimeout(function () {
      if (root && root.childElementCount > 0) {
        markReady();
        return;
      }

      showFallback(
        'The editor is taking longer than expected. If you are local, run npm run dev:cms and refresh.',
        'warning'
      );
    }, 2500);
  }

  window.addEventListener('load', initCMS);
})();

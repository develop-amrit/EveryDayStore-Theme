(() => {
  const header = document.querySelector('.qc-header');
  const update = () => {
    const height = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
    document.querySelectorAll('[data-category-sidebar]').forEach(sidebar => {
      sidebar.style.setProperty('--qc-sidebar-top', `${height + 12}px`);
    });
  };
  const mobile = matchMedia('(max-width:749px)');
  const setFilters = () => document.querySelectorAll('.qc-collection-filters').forEach(panel => panel.open = !mobile.matches);
  setFilters();
  mobile.addEventListener('change', setFilters);
  update();
  const revealCurrent = () => {
    document.querySelectorAll('[data-category-sidebar]').forEach(sidebar => {
      const current = sidebar.querySelector('[aria-current="page"]');
      if (!current) return;
      const item = current.getBoundingClientRect(), bounds = sidebar.getBoundingClientRect();
      if (item.bottom > bounds.bottom - 16 || item.top < bounds.top) {
        sidebar.scrollTop += item.top - bounds.top - sidebar.clientHeight / 3;
      }
    });
  };
  requestAnimationFrame(revealCurrent);
  if (header && 'ResizeObserver' in window) new ResizeObserver(update).observe(header);
  window.addEventListener('resize', update, {passive:true});
  document.addEventListener('shopify:section:load', () => {update();setFilters();requestAnimationFrame(revealCurrent);});
})();

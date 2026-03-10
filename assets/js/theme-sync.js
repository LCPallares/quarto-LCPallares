// Sincronizar theme de Quarto con CSS personalizado
(function() {
  function syncTheme() {
    const bootstrapLink = document.querySelector('#quarto-bootstrap[data-mode="dark"]');
    const isDark = bootstrapLink && bootstrapLink.classList.contains('quarto-color-alternate');
    
    if (isDark) {
      document.body.classList.add('quarto-dark');
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.body.classList.remove('quarto-dark');
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }

  // Ejecutar al inicio
  syncTheme();

  // Observar cambios en las hojas de estilo
  const observer = new MutationObserver(syncTheme);
  const link = document.querySelector('#quarto-bootstrap');
  if (link) {
    observer.observe(link, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
  }

  // También escuchar el evento de Quarto
  window.addEventListener('DOMContentLoaded', syncTheme);
})();

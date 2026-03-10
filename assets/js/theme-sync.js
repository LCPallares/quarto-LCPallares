(function() {
  function syncTheme() {
    // Detectar si el body tiene la clase de Quarto para modo oscuro
    // o si el link de bootstrap está en modo dark
    const bodyIsDark = document.body.classList.contains('quarto-dark');
    const bootstrapDark = document.querySelector('link#quarto-bootstrap[data-mode="dark"]:not([disabled])');
    
    // Si cualquiera de las dos condiciones se cumple, activamos nuestro CSS oscuro
    const isDark = bodyIsDark || bootstrapDark;
    
    if (isDark) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      document.body.classList.add('quarto-dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      document.body.classList.remove('quarto-dark');
    }
  }

  // Ejecutar inmediatamente
  syncTheme();

  // Observador para cambios dinámicos (cuando el usuario pulsa el botón)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes') {
        syncTheme();
      }
    });
  });

  // Observar tanto el body como el link de estilos
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  
  const bootstrapLink = document.querySelector('#quarto-bootstrap');
  if (bootstrapLink) {
    observer.observe(bootstrapLink, { attributes: true, attributeFilter: ['disabled', 'data-mode'] });
  }

  // Asegurar ejecución tras carga completa
  window.addEventListener('quarto-section-read', syncTheme);
  window.addEventListener('load', syncTheme);
})();
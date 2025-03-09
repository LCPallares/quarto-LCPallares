// Función para cargar y renderizar los proyectos o blogs
async function renderCards(jsonFile, containerId) {
  try {
    // 1. Determinar la ruta correcta al archivo JSON
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    const relativePath = isHomePage ? jsonFile : `../${jsonFile}`;

    // 2. Cargar el archivo JSON
    const response = await fetch(relativePath);
    if (!response.ok) {
      throw new Error(`Error al cargar ${jsonFile}: ${response.statusText}`);
    }
    const data = await response.json();

    // 3. Obtener el contenedor donde se mostrarán las tarjetas
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`No se encontró el contenedor con ID ${containerId}`);
    }

    // 4. Generar el HTML para cada tarjeta
    const cardsHTML = data.map(item => {
      // Asegurar que el enlace sea correcto
      const link = item.link.startsWith('/') ? item.link : `/${item.link}`;
      return `
        <div class="card">
          <img src="${item.image}" alt="${item.title}" class="card-image">
          <div class="card-content">
            <h3><a href="${link}">${item.title}</a></h3>
            <p>${item.description}</p>
          </div>
        </div>
      `;
    }).join('');

    // 5. Insertar las tarjetas en el contenedor
    container.innerHTML = cardsHTML;
  } catch (error) {
    console.error(error);
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `<p>Error loading content: ${error.message}</p>`;
    }
  }
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar proyectos si el contenedor existe
  const projectsContainer = document.getElementById('projects-container');
  if (projectsContainer) {
    renderCards('projects/projects.json', 'projects-container');
  }

  // Renderizar blogs si el contenedor existe
  const blogsContainer = document.getElementById('blogs-container');
  if (blogsContainer) {
    renderCards('posts/posts.json', 'blogs-container');
  }
});
// Función para cargar y renderizar los proyectos
async function renderProjects() {
  const response = await fetch('/projects/_metadata.yml');
  const metadata = await response.text();
  const config = jsyaml.load(metadata);

  const projectsResponse = await fetch('/projects/');
  const projectsData = await projectsResponse.json(); // Suponiendo que el servidor devuelve un JSON con los proyectos

  const container = document.getElementById(config.listing.id);
  container.innerHTML = projectsData.map(project => `
    <div class="listing">
      <div class="thumbnail">
        <a href="${project.url}">
          <img src="${project.image}" alt="${project.title}" class="thumbnail-image">
        </a>
      </div>
      <div class="body">
        <a href="${project.url}">
          <h3 class="listing-title">${project.title}</h3>
          <div class="listing-subtitle">${project.author}</div>
        </a>
        <div class="listing-categories">
          ${project.categories.map(cat => `<div class="listing-category">${cat}</div>`).join('')}
        </div>
        <a href="${project.url}">
          <div class="listing-description">
            <p>${project.description}</p>
          </div>
        </a>
      </div>
      <div class="metadata">
        <div class="listing-date">${project.date}</div>
        <div class="listing-author">${project.author}</div>
      </div>
    </div>
  `).join('');
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', renderProjects);
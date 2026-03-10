// render-cards.js
// Carga proyectos y blogs desde JSON y los renderiza como cards

async function loadCards(jsonPath, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const res  = await fetch(jsonPath);
    const data = await res.json();

    container.innerHTML = data.map(item => `
      <a class="project-card" href="${item.link}">
        ${item.image
          ? `<img class="project-card-img" src="${item.image}" alt="${item.title}" loading="lazy">`
          : `<div style="height:160px;background:#252840;display:flex;align-items:center;justify-content:center;">
               <span style="font-size:2rem;opacity:0.3">📊</span>
             </div>`
        }
        <div class="project-card-body">
          <div class="project-card-title">${item.title}</div>
          <div class="project-card-desc">${item.description}</div>
          <div class="project-card-footer">Ver proyecto</div>
        </div>
      </a>
    `).join("");

  } catch (err) {
    container.innerHTML = `
      <p style="color:var(--text-muted);font-size:0.9rem;padding:1rem 0">
        No se pudieron cargar los proyectos.
      </p>`;
    console.error(`Error cargando ${jsonPath}:`, err);
  }
}

loadCards("assets/data/projects.json", "projects-container");
loadCards("assets/data/blogs.json",    "blogs-container");

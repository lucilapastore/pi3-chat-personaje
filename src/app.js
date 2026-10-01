const app = document.getElementById('app');

// ---------- Vistas: cada una devuelve el HTML que va dentro de #app ----------
const homeView = () => `
  <section class="page">
    <h2>¡Bienvenida!</h2>
    <p>Acá vas a poder charlar con un personaje ficticio, impulsado por Google Gemini.</p>
    <a href="/chat" class="cta" data-link>Empezar a chatear</a>
  </section>
`;

const aboutView = () => `
  <section class="page">
    <h2>Acerca del proyecto</h2>
    <p>Proyecto Integrador 3 del bootcamp Full Stack de Henry, hecho en ComicSansCon.</p>
    <p>Es una SPA en JavaScript vanilla que se conecta a Gemini mediante una Serverless Function de Vercel, así la API key nunca queda expuesta en el navegador.</p>
  </section>
`;

// Mensajes de ejemplo para ver el diseño; en la tarea del chat los genera JS
const chatView = () => `
  <div class="chat" id="chat-messages" aria-live="polite">
    <div class="message message--character">
      <p>¡Hola! Preguntame lo que quieras.</p>
    </div>
    <div class="message message--user">
      <p>Hola, ¿cómo estás?</p>
    </div>
    <div class="message message--character message--typing" aria-label="El personaje está escribiendo">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>
    <div class="message message--error" role="alert">
      <p>No se pudo enviar el mensaje. Intentá de nuevo.</p>
    </div>
  </div>
  <form class="chat-form" id="chat-form">
    <label for="chat-input" class="visually-hidden">Escribí tu mensaje</label>
    <input
      type="text"
      id="chat-input"
      class="chat-input"
      placeholder="Escribí tu mensaje..."
      autocomplete="off"
      required
    />
    <button type="submit" class="chat-send" id="chat-send">Enviar</button>
  </form>
`;

const notFoundView = () => `
  <section class="page">
    <h2>404 - Página no encontrada</h2>
    <p>La dirección que buscás no existe.</p>
    <a href="/home" class="cta" data-link>Volver al inicio</a>
  </section>
`;

// ---------- Tabla de rutas: URL -> título + vista ----------
const routes = {
  '/home': { title: 'Inicio', render: homeView },
  '/chat': { title: 'Chat', render: chatView },
  '/about': { title: 'Acerca de', render: aboutView },
};
const notFoundRoute = { title: 'No encontrada', render: notFoundView };

// ---------- router(): lee la URL actual y dibuja la vista que corresponde ----------
function router() {
  let path = window.location.pathname;

  // Normaliza "/" a "/home" reemplazando la entrada actual (sin sumar otra al historial)
  if (path === '/') {
    history.replaceState(null, '', '/home');
    path = '/home';
  }

  const route = routes[path] ?? notFoundRoute;
  app.innerHTML = route.render();
  document.title = `${route.title} · Chat con personaje`;

  // Marca el link activo del nav
  document.querySelectorAll('.nav-link').forEach((link) => {
    const isActive = link.getAttribute('href') === path;
    link.classList.toggle('is-active', isActive);
    link.toggleAttribute('aria-current', isActive);
  });
}

// ---------- navigateTo(): cambia la URL sin recargar y dibuja la vista ----------
function navigateTo(path) {
  if (path === window.location.pathname) return;
  history.pushState(null, '', path);
  router(); // pushState NO dispara popstate, hay que llamar al router a mano
}

// Intercepta los clicks en links con data-link (delegación de eventos)
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-link]');
  if (!link) return;
  // Respeta ctrl/cmd/shift + click (abrir en pestaña nueva)
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
  event.preventDefault(); // evita la recarga completa
  navigateTo(link.getAttribute('href'));
});

// Back/Forward: el navegador cambia la URL solo, nosotros solo dibujamos
window.addEventListener('popstate', router);

// Primera carga: dibuja según la URL con la que entró el usuario
router();

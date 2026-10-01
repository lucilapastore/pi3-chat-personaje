# Proyecto Integrador 3: Chat con personaje ficticio (SPA + Gemini)

## Contexto
Soy desarrolladora frontend junior en **ComicSansCon**, una agencia digital de experiencias interactivas para fans. Estoy construyendo una prueba de concepto (POC): una **Single Page Application responsive** donde los usuarios chatean con un personaje ficticio usando **Google Gemini**, conectada de forma segura mediante **Vercel Serverless Functions** y desplegada en **Vercel**.

Es el Proyecto Integrador 3 del bootcamp Full Stack (Henry). Estoy aprendiendo mientras lo construyo.

## Cómo quiero que trabajes (importante)
- Trabajá **una tarea de la lista a la vez**.
- Cuando termines una tarea, **explicame qué hiciste y por qué**, en español rioplatense y con lenguaje simple, para que aprenda desarrollo full stack mientras armamos el entregable.
- No avances a la siguiente tarea hasta que yo lo pida.
- No instales dependencias innecesarias.
- Commits en formato convencional (`feat:`, `style:`, `docs:`, `test:`, `fix:`), chicos y descriptivos. Antes de commitear, proponeme el mensaje.

## Entorno
- Windows + PowerShell.
- Node.js, JavaScript vanilla (sin frameworks), HTML5, CSS.
- Git/GitHub. Despliegue en Vercel. Tests con Vitest.
- Nunca subir `.env` a GitHub; configurar `.gitignore` **antes del primer commit**.

## Objetivos de aprendizaje
- Interfaces responsive mobile-first con Flexbox/Grid y media queries; mensajes diferenciados y estados de carga/error.
- SPA con History API (vistas Home, Chat, About) sin recargas, incluyendo botones back/forward.
- Promises y async/await; Fetch API con manejo de errores y estados de carga.
- Separar responsabilidades: fetching, transformación/parseo y renderizado.
- Prompting efectivo y system prompts; conceptos de tokens, temperature y rate limiting.
- Por qué no exponer API keys en el frontend; Serverless Function como proxy seguro con variables de entorno.
- Unit tests con Vitest mockeando `fetch`; despliegue en Vercel desde GitHub.

## Requisitos funcionales
- Routing SPA con History API: Home, Chat y About.
- Chat con Gemini mediante una Vercel Serverless Function (la API key **nunca** en el cliente).
- Historial de conversación solo durante la sesión (se pierde al recargar).
- El system prompt define cómo habla el personaje, qué sabe, qué limitaciones tiene, y que responda corto (formato chat).
- Al menos **4 tests unitarios** con Vitest.
- Desplegado en Vercel con URL pública, incluyendo las serverless functions.
- Eliminar o comentar los `console.log` antes de desplegar.
- Probar en distintos tamaños con DevTools.

## Estructura del proyecto
```
project-root/
├── api/
│   └── functions.js      # Vercel Serverless Function (proxy a Gemini)
├── src/
│   ├── index.html
│   ├── styles.css
│   ├── app.js            # lógica principal, routing
│   ├── chat.js           # lógica específica del chat
│   └── utils.js          # transformación de datos
├── tests/
│   ├── utils.test.js
│   └── app.test.js
├── .env                  # local, NO se sube
├── .env.example          # variables sin valores reales
├── .gitignore
├── package.json
└── README.md
```

## Lista de tareas y estado
1. [x] Interfaz básica del chat (HTML + CSS mobile-first): `src/index.html` y `src/styles.css` creados. Incluye header con nav, área de mensajes, input, footer, mensajes de usuario/personaje diferenciados, indicador "escribiendo..." y estado de error. Los mensajes de ejemplo están escritos a mano en el HTML y hay que reemplazarlos por mensajes generados con JS.
2. [ ] Routing SPA con History API (Home, Chat, About) en `app.js`, con soporte de back/forward.
3. [ ] Vercel Serverless Function que llama a Gemini (`api/functions.js`), API key en variables de entorno, y `.env.example`.
4. [ ] Lógica del chat: fetch, historial en memoria, system prompt del personaje (`chat.js`, `utils.js`).
5. [ ] Tests unitarios con Vitest (mínimo 4), mockeando `fetch`.
6. [ ] README y deploy en Vercel.

## Decisiones tomadas
- Diseño base oscuro con variables CSS en `:root` (`--user-bg`, `--character-bg`, etc.), fácil de cambiar para el personaje.
- Layout con CSS Grid (`auto 1fr auto auto`) y `100dvh`; Flexbox para la lista de mensajes.
- Breakpoint de escritorio en `768px`.
- Convención de clases tipo BEM: `message--user`, `message--character`, `message--typing`, `message--error`.

## Pendiente de decidir
- **Personaje elegido**: todavía no está definido. En el HTML hay un placeholder ("Nombre del personaje"). Hay que decidirlo antes de la tarea 4 (system prompt). Conviene un personaje con personalidad distintiva.

## Entregables finales
- Código fuente con estructura clara y serverless functions funcionando.
- `.env.example` con las variables necesarias (sin valores reales).
- Al menos 4 tests con Vitest.
- URL pública en Vercel.
- README con: descripción del personaje, requisitos y pasos para correr local (instalar dependencias, configurar `.env`, `vercel dev`), cómo ejecutar tests, cómo desplegar a Vercel, capturas de pantalla, link a la app desplegada y **registro del uso de AI** en el proyecto (documentar prompts usados y cómo influyeron).
- Enlace al repositorio de GitHub (público).

## Extra credit (opcional)
Galería de personajes con al menos 3 personajes, cada uno con su propio system prompt y tarjetas visuales atractivas, y selección del personaje para chatear.

## Lecciones de proyectos anteriores
- Resolver los problemas de entorno al principio, antes de escribir código de la app.
- Configurar `.gitignore` antes del primer commit; si se sube `.env` por error, usar `git rm --cached .env`.
- Probar cada paso (endpoints, queries, funciones) antes de seguir con el siguiente.

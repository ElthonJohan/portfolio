# Portfolio — JoDevs

Portfolio personal de desarrollador e ingeniero de sistemas.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lenis

## Desarrollo

```bash
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm run lint
```

## Editar el contenido

Todo el texto vive en [`src/data/site.ts`](src/data/site.ts): perfil, contacto, redes, servicios, proceso y proyectos.
Busca los comentarios `TODO` para reemplazar el contenido de ejemplo.

- **Capturas de proyectos:** guarda la imagen en `public/projects/` y agrega `image: "/projects/archivo.jpg"` al proyecto.
  Sin imagen, se genera una portada con los colores de `palette`.
- **Cursor con texto:** cualquier elemento con `data-cursor="Texto"` muestra esa etiqueta en el cursor.

## Estructura

```
src/
├── app/                 # rutas: home, /proyectos/[slug], 404
├── components/
│   ├── layout/          # navbar, footer, preloader
│   ├── sections/        # hero, servicios, proyectos, proceso, sobre mí, contacto
│   └── ui/              # cursor, magnetic, reveal, smooth-link, iconos
├── data/site.ts         # contenido
└── lib/hooks.ts
```

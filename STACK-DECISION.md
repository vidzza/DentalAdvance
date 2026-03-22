# Stack Decision — Dental Advance
Fecha de decisión: 2026-03-21

---

## Stack Elegido

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Astro | 5.x |
| Estilos | Tailwind CSS | 3.x |
| Tipado | TypeScript | 5.x |
| Fuentes | Google Fonts (Playfair Display + DM Sans) | — |
| Email | Resend | latest |
| Validación | Zod | latest |
| Deploy | Vercel | — |
| API Functions | Vercel Native Functions (`/api/`) | — |
| Sitemap | @astrojs/sitemap | 3.x |

---

## Por qué Astro

**Decisión:** Astro SSG (Static Site Generation) con Vercel Native Functions para el endpoint de email.

**Razones:**
1. **Clínica dental local** — Sitio informacional sin e-commerce ni dashboard. SSG es óptimo.
2. **Performance máxima** — Genera HTML+CSS puro. Sin JavaScript innecesario. Lighthouse 95+.
3. **SEO local** — HTML pre-renderizado facilita el indexado de Google para keywords locales ("dentista Cuauhtémoc Chihuahua").
4. **Costo cero** — Deploy gratuito en Vercel, sin servidor que mantener.
5. **Tailwind + TypeScript** — Velocidad de desarrollo y código mantenible.

---

## Por qué NO Next.js

- El cliente no necesita SSR, ISR ni App Router.
- Next.js agregaría complejidad y bundle size innecesarios.
- Un sitio de clínica dental no requiere React para su funcionalidad.

---

## Por qué Vercel Native Functions (en lugar de @astrojs/vercel)

- El adaptador `@astrojs/vercel` v9.x tiene vulnerabilidades high en `path-to-regexp` (GHSA-9wv6-86v2-598j).
- Vercel detecta automáticamente la carpeta `/api/` y crea serverless functions.
- La función `/api/contact.ts` maneja el formulario con Resend sin necesidad del adapter.
- La build de Astro permanece 100% estática (`output: 'static'`).

---

## Por qué Resend

- API simple y confiable para email transaccional.
- Plan gratuito: 3,000 emails/mes (suficiente para una clínica pequeña).
- SDK oficial para Node.js/TypeScript.

---

## Tipografías

| Tipografía | Uso | Por qué |
|-----------|-----|---------|
| Playfair Display | Headings | Serifada elegante — transmite profesionalismo y lujo (acorde al brief: "moderno, elegante y lujoso") |
| DM Sans | Body / UI | Sans-serif geométrica — legible en todos los tamaños, moderna |

---

## Paleta de Colores

Extraída del logo del negocio (tonos dorados) y decisión de diseño de brand:

| Token | Hex | Uso |
|-------|-----|-----|
| `gold-500` | `#C8960C` | Color primario, CTAs, acentos |
| `gold-400` | `#D4A42E` | Hover states, gradientes |
| `dark-900` | `#0A0A0A` | Fondo hero y footer |
| `dark-800` | `#1A1A1A` | Texto principal |
| `white` | `#FFFFFF` | Fondos de secciones |

---

## Decisiones de arquitectura

- **`src/content/site.ts`** — Fuente única de verdad. Toda la info del negocio en un solo archivo.
- **Componentes separados** — Un archivo `.astro` por sección (Header, Hero, Services, etc.).
- **`/api/contact.ts`** — Endpoint serverless para el formulario con Resend + Zod + honeypot.
- **Sin base de datos** — No se requiere persistencia. El formulario envía email directamente.

---

## Stack descartado

| Opción | Razón de descarte |
|--------|-------------------|
| WordPress | Demasiado pesado para un sitio informacional; requiere hosting y mantenimiento |
| Webflow | Costo mensual; menos control sobre SEO técnico |
| Next.js | Sobre-ingeniería para este caso de uso |
| Nuxt/Vue | El equipo no tiene preferencia por Vue; Astro es más adecuado para SSG |
| Gatsby | Deprecated/en declive; Astro lo supera en casos de uso estáticos |

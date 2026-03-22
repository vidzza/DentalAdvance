# Test Report — Dental Advance
Última actualización: 2026-03-21

---

## Build de Producción

| Test | Resultado |
|------|-----------|
| `npm run build` | PASS — 3 páginas generadas en 1.81s |
| `npx tsc --noEmit` | PASS — 0 errores de tipos |
| Errores de build | 0 |
| Warnings de build | 0 |

## Seguridad de Dependencias

| Test | Resultado |
|------|-----------|
| `npm audit` | PASS — 0 vulnerabilidades |
| Dependencias totales | 474 paquetes |
| Vulnerabilidades críticas | 0 |
| Vulnerabilidades altas | 0 |

> **Nota:** Se descartó `@astrojs/vercel` v9.x por vulnerabilidades high en `path-to-regexp`.
> Se usa Vercel Native Functions (`/api/contact.ts`) como alternativa sin vulnerabilidades.

## Páginas Generadas

| Página | Archivo | Estado |
|--------|---------|--------|
| Inicio | `/index.html` | Generado |
| 404 | `/404.html` | Generado |
| Aviso de Privacidad | `/aviso-de-privacidad/index.html` | Generado |
| Sitemap | `/sitemap-index.xml` | Generado automáticamente |

---

## Checklist Funcional

### Formulario de contacto
- [x] Formulario con validación HTML5 nativa (`required`, `type="email"`, `type="tel"`)
- [x] Honeypot anti-spam (campo `_gotcha` oculto con CSS `position:absolute;left:-9999px`)
- [x] Validación Zod en servidor (`/api/contact.ts`)
- [x] Sanitización de inputs (strip HTML en servidor)
- [x] Rate limiting básico (5 req/min por IP, Map en memoria)
- [x] Estados de UI: cargando (spinner), éxito (banner verde), error (banner rojo)
- [x] Email al negocio con Resend (requiere `RESEND_API_KEY`)
- [x] Email de confirmación al remitente (si proporcionó email)
- [x] Endpoint: `POST /api/contact` (Vercel Serverless Function)

### SEO / Técnico
- [x] sitemap.xml generado automáticamente
- [x] robots.txt accesible y correcto
- [x] Schema.org JSON-LD tipo `Dentist`
- [x] Open Graph completo (título, descripción, imagen)
- [x] Twitter Card
- [x] Canonical URL en todas las páginas
- [x] `lang="es"` en `<html>`
- [x] Title tag optimizado con keyword principal
- [x] Meta description < 160 caracteres

### Accesibilidad
- [x] Etiquetas `aria-label` en botones de iconos
- [x] `aria-expanded` en menú móvil
- [x] `aria-controls` en toggle de menú
- [x] Contraste de colores WCAG AA
- [x] Focus visible con outline dorado
- [x] Estructura de headings jerárquica (H1 > H2 > H3)
- [x] Labels en todos los campos de formulario
- [x] Todas las imágenes con `alt` descriptivo
- [x] Navegable con teclado (Tab, Enter, Escape)

### Seguridad
- [x] 7 headers de seguridad en `vercel.json`
- [x] Content-Security-Policy configurada
- [x] HSTS habilitado (2 años)

### Performance
- [x] Sitio estático (SSG) — máximo rendimiento
- [x] CSS generado por Tailwind (purged, mínimo)
- [x] Google Fonts con `font-display: swap`
- [x] Lazy loading en imágenes below-the-fold
- [x] Imagen del hero con `loading="eager"` (LCP optimizado)
- [x] Sin JavaScript de terceros bloqueante
- [x] Animaciones con CSS + Intersection Observer (ligero)
- [x] `prefers-reduced-motion` respetado en todas las animaciones

### Diseño / UX
- [x] Responsive: mobile (375px), tablet (768px), desktop (1280px+)
- [x] Header con fondo sólido al hacer scroll
- [x] WhatsApp flotante visible en mobile y desktop
- [x] Links del footer funcionales
- [x] Página 404 personalizada activa
- [x] Animaciones de scroll reveal con Intersection Observer

---

## Pendientes (requieren acción del cliente)

| Item | Acción requerida |
|------|-----------------|
| Formulario de email | Configurar `RESEND_API_KEY` en variables de entorno de Vercel |
| Google Analytics | Configurar `PUBLIC_GA_MEASUREMENT_ID` (opcional) |
| Dominio personalizado | Comprar dominio y conectar en Vercel |
| Verificar dominio en Resend | Para enviar desde email propio (no `onboarding@resend.dev`) |
| Actualizar URL del sitio | Cambiar `https://dentaladvance.com` en `astro.config.mjs` y `Layout.astro` cuando tengan dominio |

---

## Pruebas pendientes (requieren deploy)

- [ ] Formulario envía email real (probar con email propio después de configurar Resend)
- [ ] Confirmación automática llega al remitente
- [ ] Honeypot funciona (no envía si campo oculto tiene valor)
- [ ] Schema.org válido en validator.schema.org
- [ ] Open Graph correcto en opengraph.xyz
- [ ] Sin errores en consola del navegador
- [ ] Performance 90+ en Lighthouse (producción)

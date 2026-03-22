# Dental Advance — Sitio Web Oficial

Sitio web profesional de **Dental Advance**, clínica dental de vanguardia ubicada en
Cd. Cuauhtémoc, Chihuahua, México.

**Stack:** Astro 5 · Tailwind CSS 3 · TypeScript · Resend · Vercel

---

## Descripción del negocio

- **Nombre:** Dental Advance
- **Giro:** Clínica dental (odontología general, ortodoncia, implantes, estética dental)
- **Ubicación:** José de San Martin 1634, Col. Progreso, 31550 Cuauhtémoc, Chih., México
- **Teléfono / WhatsApp:** 625 134 4627
- **Email:** dentaladvancegc@gmail.com
- **Horario:** Lunes–Viernes 9:00–14:00 y 16:00–19:00

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm (incluido con Node.js)
- Cuenta en [Vercel](https://vercel.com) para deploy
- Cuenta en [Resend](https://resend.com) para el formulario de contacto

---

## Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/dental-advance.git
cd dental-advance

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus valores reales (ver sección siguiente)

# 4. Iniciar servidor de desarrollo
npm run dev
```

El sitio estará en `http://localhost:4321`

> **Nota:** El formulario de contacto requiere `RESEND_API_KEY` para enviar emails.
> Sin la key, el formulario muestra éxito pero no envía (modo dev).

---

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

| Variable | Descripción | Dónde obtenerla |
|----------|-------------|-----------------|
| `RESEND_API_KEY` | API key para envío de emails | [resend.com](https://resend.com) → API Keys |
| `CONTACT_EMAIL` | Email donde llegan los contactos | El email del negocio |
| `BUSINESS_NAME` | Nombre del negocio (en emails) | `Dental Advance` |
| `FROM_EMAIL` | Email remitente de Resend | `onboarding@resend.dev` (pruebas) |
| `PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 (opcional) | [analytics.google.com](https://analytics.google.com) |
| `PUBLIC_GTM_ID` | Google Tag Manager (opcional) | [tagmanager.google.com](https://tagmanager.google.com) |

---

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo en `http://localhost:4321` |
| `npm run build` | Genera el sitio estático en `/dist` |
| `npm run preview` | Previsualiza el build de producción |
| `npm audit` | Revisa vulnerabilidades de dependencias |

---

## Deploy a producción

Ver [DEPLOY-INSTRUCTIONS.md](./DEPLOY-INSTRUCTIONS.md) para la guía paso a paso.

**Resumen rápido:**
1. Subir código a GitHub
2. Importar proyecto en [vercel.com](https://vercel.com)
3. Configurar variables de entorno en Vercel
4. Deploy automático ✓

---

## Actualizar contenido

### Datos del negocio (teléfono, email, dirección, horarios)

**Editar:** `src/content/site.ts`

Este es el archivo de fuente única de verdad. Modifica aquí y los cambios se reflejan en todo el sitio.

```typescript
// src/content/site.ts
export const site = {
  contact: {
    phoneLocal: '625 134 4627',  // ← Actualizar aquí
    email: 'dentaladvancegc@gmail.com',
    // ...
  },
  hours: {
    weekdays: { ... },
    // ...
  },
}
```

### Servicios

**Editar:** `src/content/site.ts` → `services[]`

### Testimonios

**Editar:** `src/components/Testimonials.astro` → array `testimonials`

### Preguntas frecuentes

**Editar:** `src/components/FAQ.astro` → array `faqs`

### Textos del Hero

**Editar:** `src/components/Hero.astro`

### Imágenes

Reemplazar en `public/images/`:
- `logo.png` — Logo del negocio
- `portada.jpg` — Imagen principal (Hero y About)

---

## Mapa de carpetas

```
dental-advance/
├── api/
│   └── contact.ts          ← Endpoint de email (Vercel Serverless Function)
├── public/
│   ├── images/
│   │   ├── logo.png         ← Logo
│   │   └── portada.jpg      ← Imagen principal
│   ├── manifest.json        ← PWA manifest
│   └── robots.txt           ← Reglas de indexación
├── src/
│   ├── components/
│   │   ├── Header.astro     ← Navegación + menú móvil
│   │   ├── Hero.astro       ← Sección principal
│   │   ├── Services.astro   ← Grid de servicios
│   │   ├── About.astro      ← Sobre nosotros
│   │   ├── WhyUs.astro      ← Por qué elegirnos
│   │   ├── Testimonials.astro ← Testimonios
│   │   ├── FAQ.astro        ← Preguntas frecuentes
│   │   ├── CTA.astro        ← Call to action
│   │   ├── Contact.astro    ← Formulario + mapa
│   │   ├── Footer.astro     ← Pie de página
│   │   └── WhatsAppButton.astro ← Botón flotante WhatsApp
│   ├── content/
│   │   └── site.ts          ← FUENTE ÚNICA DE VERDAD del negocio
│   ├── layouts/
│   │   └── Layout.astro     ← HTML base, meta tags, Schema.org
│   ├── pages/
│   │   ├── index.astro      ← Página principal
│   │   ├── 404.astro        ← Página de error 404
│   │   └── aviso-de-privacidad.astro
│   └── styles/
│       └── globals.css      ← Estilos globales + Tailwind
├── .env.example             ← Variables requeridas (sin valores)
├── .gitignore
├── astro.config.mjs
├── DEPLOY-INSTRUCTIONS.md   ← Guía de deploy
├── SECURITY-REPORT.md       ← Reporte de seguridad
├── STACK-DECISION.md        ← Decisiones tecnológicas
├── TEST-REPORT.md           ← Reporte de QA
├── research-dental-advance.md ← Investigación del negocio
├── tailwind.config.mjs
├── tsconfig.json
└── vercel.json              ← Headers de seguridad + config Vercel
```

---

## Secciones del sitio

| Sección | ID | Descripción |
|---------|-----|-------------|
| Hero | `#inicio` | Título principal, CTAs de cita y servicios |
| Servicios | `#servicios` | 8 cards de servicios dentales |
| Nosotros | `#nosotros` | Historia y valores de la clínica |
| Por qué elegirnos | — | 4 diferenciadores clave |
| Testimonios | `#testimonios` | 6 reseñas de pacientes |
| FAQ | `#faq` | 8 preguntas frecuentes (accordion) |
| CTA | — | Call to action con fondo dorado |
| Contacto | `#contacto` | Formulario + mapa + tarjetas de contacto |
| 404 | — | Página de error personalizada |

---

## SEO

- **Keyword principal:** "dentista Cuauhtémoc Chihuahua"
- Schema.org tipo `Dentist` con toda la información del negocio
- Open Graph completo para Facebook/WhatsApp sharing
- Sitemap generado automáticamente en `/sitemap-index.xml`
- `robots.txt` configurado para indexar el sitio
- Canonical URL en todas las páginas

---

## Performance

- Sitio 100% estático (SSG) — máximo rendimiento
- Sin JavaScript de terceros bloqueante
- Fuentes con `font-display: swap`
- Lazy loading en imágenes below-the-fold
- Animaciones con IntersectionObserver (ligero, sin dependencias)
- Respeta `prefers-reduced-motion` del sistema operativo

---

## Seguridad

Ver [SECURITY-REPORT.md](./SECURITY-REPORT.md) para detalles completos.

- 6 headers de seguridad configurados en Vercel
- Content-Security-Policy completa
- Formulario con honeypot, validación Zod, sanitización, rate limiting
- 0 vulnerabilidades en `npm audit`

---

## Documentación adicional

| Archivo | Contenido |
|---------|-----------|
| `research-dental-advance.md` | Investigación del negocio, competidores, precios |
| `STACK-DECISION.md` | Por qué se eligió Astro y decisiones técnicas |
| `SECURITY-REPORT.md` | Headers, formulario seguro, auditoría |
| `DEPLOY-INSTRUCTIONS.md` | Guía paso a paso para publicar |
| `TEST-REPORT.md` | Resultados de QA |

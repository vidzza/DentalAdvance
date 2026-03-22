# SKILL: DEPLOY
# Git, gitignore y configuracion de deploy

---

## INICIALIZACION DE GIT

```bash
git init
git branch -M main
```

---

## GITIGNORE COMPLETO

Crear en la raiz del proyecto antes del primer commit:

```
# Dependencias
node_modules/
.pnp
.pnp.js

# Variables de entorno -- NUNCA en git
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env*.local

# Build outputs
.next/
out/
dist/
build/
.astro/

# Cache y herramientas
.cache/
.turbo/
.vercel/
.netlify/
*.tsbuildinfo
next-env.d.ts

# Sistema operativo
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
desktop.ini

# Editores
.idea/
.vscode/
*.swp
*.swo
*~

# Logs
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*
lerna-debug.log*

# Testing y reportes
coverage/
.nyc_output/
playwright-report/
test-results/
lighthouse-report.html

# Archivos del proyecto (no van al repo del cliente)
/imagenes/
INSTRUCTIONS.md
requerimientos.txt
/skills/
RESEARCH.md
STACK-DECISION.md
SECURITY.md
TEST-REPORT.md
```

---

## PRIMER COMMIT

```bash
git add .
git commit -m "feat: initial project setup

Stack: {framework y librerias principales}
Features: {lista de funcionalidades principales}
Deploy target: {Vercel / GitHub Pages}
"
```

Convencion de commits para el resto del proyecto:

```
feat:     nueva funcionalidad
fix:      correccion de bug
style:    cambios visuales sin logica de negocio
refactor: refactorizacion
perf:     mejoras de rendimiento
seo:      cambios de SEO o metadata
a11y:     mejoras de accesibilidad
docs:     documentacion
chore:    dependencias, config, herramientas
```

---

## DEPLOY EN VERCEL -- NEXT.JS O ASTRO CON SSR

Crear vercel.json en la raiz:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options",          "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options",   "value": "nosniff" },
        { "key": "Referrer-Policy",          "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security","value": "max-age=63072000; includeSubDomains; preload" }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ]
}
```

Para Astro SSR: cambiar framework a "astro" y outputDirectory a "dist".

Crear DEPLOY-INSTRUCTIONS.md:

```
# Deploy en Vercel

Requisitos: Node.js 20+, cuenta en vercel.com

Pasos:
  npm install -g vercel
  vercel login
  vercel             (preview)
  vercel --prod      (produccion)

Variables de entorno (Vercel -> tu proyecto -> Settings -> Environment Variables):
  Agregar cada variable de .env.example con su valor real.
  Marcar como "Production", "Preview" y "Development" segun aplique.

Dominio personalizado:
  Vercel -> Settings -> Domains -> agregar tu dominio.
  Seguir instrucciones de DNS de Vercel. SSL automatico.

Preview deployments:
  Cada push a rama distinta de main genera preview URL automatico.
  Compartir con el cliente para revision antes de publicar.
```

---

## DEPLOY EN GITHUB PAGES -- ASTRO SSG O ESTATICO

Configurar astro.config.mjs:

```javascript
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  site: 'https://www.dominio-del-cliente.com',
  base: '/',
  output: 'static',
  integrations: [tailwind()],
})
```

Crear .github/workflows/deploy.yml:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          CONTACT_EMAIL: ${{ secrets.CONTACT_EMAIL }}
          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
          BUSINESS_NAME:  ${{ secrets.BUSINESS_NAME }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Crear DEPLOY-INSTRUCTIONS.md:

```
# Deploy en GitHub Pages

Pasos:
  git remote add origin https://github.com/{usuario}/{repo}.git
  git push -u origin main

  En GitHub: Settings -> Pages -> Source: GitHub Actions
  El deploy se ejecuta automaticamente en cada push a main.

Secretos de entorno (GitHub -> Settings -> Secrets -> Actions):
  RESEND_API_KEY
  CONTACT_EMAIL
  BUSINESS_NAME

Dominio personalizado:
  GitHub -> Settings -> Pages -> Custom domain -> escribe el dominio.
  En el proveedor DNS:
    CNAME apuntando a {usuario}.github.io
    O registros A de GitHub Pages:
      185.199.108.153
      185.199.109.153
      185.199.110.153
      185.199.111.153
  SSL via Let's Encrypt automatico. Puede tardar hasta 24 horas.
```

---

## README.md -- ESTRUCTURA OBLIGATORIA

```markdown
# {Nombre del negocio} -- Sitio Web

{2 oraciones sobre el negocio y el proposito del sitio}

Stack: {framework} + {librerias principales}

## Requisitos
- Node.js {version}+
- npm {version}+

## Instalacion
git clone {url}
cd {proyecto}
npm install
cp .env.example .env.local
# Editar .env.local con los valores reales (ver tabla abajo)
npm run dev

## Variables de entorno

| Variable                        | Descripcion                         | Donde obtenerla              |
|---------------------------------|-------------------------------------|------------------------------|
| RESEND_API_KEY                  | API key para emails                 | resend.com -> API Keys       |
| CONTACT_EMAIL                   | Email del negocio                   | El cliente define            |
| BUSINESS_NAME                   | Nombre del negocio                  | El cliente define            |
| NEXT_PUBLIC_SUPABASE_URL        | URL del proyecto Supabase           | supabase.com -> Settings     |
| NEXT_PUBLIC_SUPABASE_ANON_KEY   | Clave anonima de Supabase           | supabase.com -> Settings     |

## Deploy
Ver DEPLOY-INSTRUCTIONS.md para instrucciones paso a paso.

Resumen:
- Vercel:        vercel --prod
- GitHub Pages:  push a main activa el workflow

## Como actualizar contenido
Toda la informacion del negocio:  src/content/site.ts
Imagenes:                         public/images/
Textos de secciones:              src/components/sections/

## Estructura del proyecto
{mapa de carpetas de 10-15 lineas con comentarios breves}
```

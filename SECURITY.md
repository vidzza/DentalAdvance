# SKILL: SECURITY
# Seguridad desde el dia cero

Documenta todo lo implementado en SECURITY.md al finalizar.

---

## HEADERS HTTP

Next.js -- next.config.ts:

```typescript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',   value: 'on' },
  { key: 'Strict-Transport-Security',value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options',          value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',   value: 'nosniff' },
  { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',       value: 'camera=(), microphone=(), geolocation=(self)' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}
```

Astro / vercel.json:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options",         "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options",  "value": "nosniff" },
        { "key": "Referrer-Policy",         "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security","value": "max-age=63072000; includeSubDomains; preload" }
      ]
    }
  ]
}
```

---

## FORMULARIOS

Validacion:
  Zod en cliente Y en servidor. El servidor nunca confia en datos sin validar.

Sanitizacion:
  Strip de etiquetas HTML en todos los campos de texto libre:
  input.replace(/<[^>]*>/g, '').trim()

Honeypot:
  Input de texto con name="_honey".
  Ocultar con CSS: position: absolute; left: -9999px; opacity: 0;
  NUNCA con display: none (bots lo detectan y no lo llenan, revelando que son bots).
  Si el campo tiene valor en el request: responder 200 ok sin procesar.

Rate limiting:
  Max 5 requests por minuto por IP en endpoints de formulario.
  Opcion simple para proyectos pequenos: Map en memoria con timestamp.
  Opcion robusta: Upstash Rate Limit (upstash.com/docs/rl/overview).

---

## VARIABLES DE ENTORNO

.env.local:
  Contiene los valores reales. NUNCA en git. NUNCA en el codigo fuente.

.env.example:
  Documenta que variables se necesitan. Sin valores reales. SIEMPRE en git.

NEXT_PUBLIC_:
  Solo para variables que el navegador necesita ver (GTM ID, Maps key publica).
  Todas las API keys en servidor, nunca con NEXT_PUBLIC_.

.env.example minimo:

```
# Resend -- email transaccional (resend.com)
RESEND_API_KEY=

# Contacto del negocio
CONTACT_EMAIL=
BUSINESS_NAME=

# Supabase (si aplica)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe (si aplica)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Google (si aplica)
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_MAPS_API_KEY=

# Sanity CMS (si aplica)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
```

---

## DEPENDENCIAS

Antes del deploy final:

```bash
npm audit
npm audit fix
```

Resolver todas las critical y high. Documentar las moderate si no hay fix disponible.

---

## AUTENTICACION (si el proyecto tiene login)

Nunca implementar hashing o JWT personalizados desde cero.
Usar soluciones probadas:
  Next.js: Supabase Auth (preferido por integracion) o NextAuth.js
  Astro: Supabase Auth o Lucia Auth

Requerimientos minimos:
  Sesiones con expiracion (max 30 dias, 7 dias recomendado).
  Logout que invalida la sesion en el servidor, no solo borra la cookie.
  HTTPS siempre (Vercel y GitHub Pages lo manejan automaticamente).

---

## DOCUMENTAR EN SECURITY.md

```
# Security Implementation -- {Nombre del Negocio}

## Headers HTTP
{lista de headers implementados con sus valores}

## Formularios
Validacion Zod (cliente + servidor):  Si
Sanitizacion de inputs:               Si
Honeypot:                             Si
Rate limiting:                        {Si con {libreria} / No -- razon}

## Variables de entorno
.env.local excluido de git:           Si
.env.example en git:                  Si
API keys solo en servidor:            Si

## Dependencias
npm audit ejecutado:                  {fecha}
Vulnerabilidades encontradas:         {lista o "ninguna"}
Vulnerabilidades resueltas:           {lista o "N/A"}

## Autenticacion
{Si aplica: libreria usada y notas relevantes}
```

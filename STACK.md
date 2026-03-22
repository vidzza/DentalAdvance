# SKILL: STACK
# Seleccion de tecnologias -- 2025/2026

Usa este arbol de decision. Una vez elegido el stack, no lo cambies.
Documenta la decision en STACK-DECISION.md antes de continuar.

---

## ARBOL DE DECISION

```
El dueno necesita editar contenido sin programar?
  Mucho contenido dinamico (blog activo, catalogo grande, equipo grande)
    ->  Next.js 15 + Sanity CMS (Studio embebed en /studio)

  Algo simple (textos, precios, fotos ocasionales)
    ->  Astro 5 + TinaCMS (edicion visual directamente en el sitio)

  No necesita editar nada
    ->  siguiente pregunta

Necesita tienda con cobro en linea?
  Si
    ->  Next.js 15 + Stripe + Supabase (DB + Storage)

Necesita login, portal de clientes o logica compleja de servidor?
  Si
    ->  Next.js 15 + Supabase (Auth + DB + Storage)

El sitio es principalmente informativo, vitrina o portafolio con formulario?
  Si
    ->  Astro 5 + API routes (SSR parcial) + Resend para formulario

El sitio es completamente estatico (sin formularios, sin DB)?
  Si
    ->  Astro 5 SSG puro (maximo rendimiento, minimo JS)

Tiene blog o contenido que cambia con frecuencia?
  Si en Next.js  ->  ISR con revalidacion por tiempo o por tag
  Si en Astro    ->  Content Collections con MDX
```

---

## TOOLING BASE -- INCLUIDO SIEMPRE

Sin importar el stack elegido, siempre incluir:

```
TypeScript                strict mode, exactOptionalPropertyTypes: true
Tailwind CSS v4           utility-first, sin configuracion extra para colores basicos
ESLint                    con @typescript-eslint, eslint-plugin-jsx-a11y
Prettier                  con prettier-plugin-tailwindcss para ordenar clases
Husky                     pre-commit hook que corre lint y type-check
lint-staged               solo en los archivos del commit actual
Zod                       validacion de schemas en cliente Y servidor
```

## LIBRERIAS DE ESTADO (segun necesidad)

```
useState / useReducer     suficiente para la mayoria de casos simples
Zustand                   si hay estado global compartido entre multiples componentes
                          (carrito, sesion de usuario, filtros de catalogo)
                          Es el estandar de facto en React 2025
TanStack Query            si hay multiples fetches de datos del servidor,
                          paginacion, o necesidad de cache y revalidacion
```

No instales librerias de estado sin necesidad demostrada. El over-engineering
es el error mas comun en proyectos que "deberan crecer".

## EMAIL TRANSACCIONAL -- SIEMPRE

```
Resend                    resend.com, gratis hasta 3,000 emails por mes
                          npm install resend
                          Variables: RESEND_API_KEY, CONTACT_EMAIL, BUSINESS_NAME
```

## FUENTE DE VERDAD DEL NEGOCIO -- SIEMPRE

```
src/content/site.ts       Un objeto exportado con toda la informacion del negocio:
                          nombre, telefono, whatsapp, email, direccion, coordenadas,
                          horarios, redes sociales, servicios principales.
                          Nunca repitas strings del negocio en componentes.
```

---

## DOCUMENTAR EN STACK-DECISION.md

```
# Stack Decision -- {Nombre del Negocio}

Stack elegido: {nombre completo}
Frameworks y librerias: {lista}

Razon de la eleccion:
{2-3 oraciones: por que este stack es el correcto para este proyecto especifico}

Funcionalidades cubiertas:
{lista de lo que el stack maneja}

Servicios externos:
- Email:      Resend
- Base datos: {Supabase / ninguna}
- CMS:        {Sanity / TinaCMS / ninguno}
- Pagos:      {Stripe / MercadoPago / ninguno}
- Auth:       {Supabase Auth / NextAuth / ninguna}

Variables de entorno requeridas:
{lista -- se documenta tambien en .env.example}
```

---

## NEXT.JS 15 -- DECISIONES DE ARQUITECTURA

Turbopack:
  Es el bundler por defecto en Next.js 15. No instalar Webpack manualmente.

React Server Components (RSC):
  Por defecto todos los componentes en /app son Server Components.
  Agregar "use client" solo cuando el componente necesita:
  - useState, useEffect, useRef, useContext
  - Event handlers (onClick, onChange, etc.)
  - Acceso a APIs del navegador (localStorage, window, etc.)
  - Librerias de animacion que manipulan el DOM (Motion, GSAP)
  No agregar "use client" por defecto ni por precaucion.

Rendering por ruta:
  Paginas estaticas (home, about, servicios): export const dynamic = 'force-static'
  Paginas con datos que cambian: ISR con revalidate
  Paginas en tiempo real: SSR con cache: 'no-store'

Server Actions:
  Usar para formularios en lugar de API routes cuando sea posible.
  Simplifican el codigo y manejan CSRF automaticamente.

poweredByHeader:
  Siempre false en next.config.ts (no revelar el framework).

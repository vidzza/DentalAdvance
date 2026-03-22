# INSTRUCTIONS.md
# Master Build Guide -- Web Development Agency

Para Claude Code. Lee completo antes de escribir codigo.
No preguntes. Investiga, decide y construye.
Con informacion minima entrega maxima calidad.

---

## PASO -1 -- DIAGNOSTICO DE ESTADO DEL PROYECTO

Ejecuta esto antes que cualquier otra cosa. No omitas este paso.

Revisa la carpeta raiz del proyecto y determina en que estado esta:

```
Existe src/ o app/ con componentes escritos?        -> proyecto iniciado
Existe STACK-DECISION.md?                           -> stack ya elegido
Existe RESEARCH.md?                                 -> investigacion completada
Existe TEST-REPORT.md?                              -> QA completado
Existe el sitio publicado (vercel.json o workflows)?-> deploy configurado
```

CASO A -- No existe nada mas que estos archivos del kit:
  Proyecto nuevo. Continua desde PASO 0.

CASO B -- Existe RESEARCH.md pero no src/:
  Investigacion hecha. Salta a PASO 2 (inferencia) y continua en orden.

CASO C -- Existe src/ con codigo pero proyecto incompleto:
  1. Lee RESEARCH.md y STACK-DECISION.md para entender el contexto.
  2. Audita el codigo existente:
     - Corre npm run build. Anota errores.
     - Corre npx tsc --noEmit. Anota errores de tipos.
     - Revisa visualmente que secciones estan construidas y cuales faltan.
  3. Genera un STATUS-REPORT breve en consola:
     Completado: {lista de secciones/pasos terminados}
     Pendiente:  {lista de lo que falta}
     Errores:    {lista de errores encontrados}
  4. Continua desde el primer paso pendiente sin reescribir lo que ya funciona.

CASO D -- Proyecto aparentemente completo:
  1. Ejecuta el checklist de PASO 13 completo.
  2. Reporta que pasa y que falla.
  3. Corrige solo lo que falla.

---

## SISTEMA DE SKILLS

Este proyecto usa skills especializados en /skills/.
Lee solo el que necesitas, en el momento exacto que lo necesitas.

| Skill                  | Cuando leerlo                                     |
|------------------------|---------------------------------------------------|
| skills/RESEARCH.md     | Paso 1 -- antes de investigar el negocio          |
| skills/STACK.md        | Paso 3 -- al elegir tecnologias                   |
| skills/DESIGN.md       | Paso 5 -- antes de escribir cualquier CSS         |
| skills/ANIMATIONS.md   | Paso 6 -- al implementar movimiento e interaccion |
| skills/COMPONENTS.md   | Paso 7 -- al construir cada componente o seccion  |
| skills/SEO.md          | Paso 8 -- al configurar metadata y schema         |
| skills/SECURITY.md     | Paso 9 -- al configurar headers y formularios     |
| skills/DEPLOY.md       | Paso 10 -- al preparar git y configurar deploy    |

---

## PASO 0 -- LECTURA INICIAL

1. Lee requerimientos.txt. Extrae cada valor respondido.
2. Cataloga archivos en /imagenes (logos, fotos, iconos).
3. Clasifica nivel de informacion disponible:
   - ALTO (nombre, giro, contacto, redes): investigacion completa.
   - MEDIO (nombre y giro): investiga y rellena con inferencia.
   - MINIMO (casi nada): negocio nuevo, genera todo desde cero.

---

## PASO 1 -- INVESTIGACION

Lee skills/RESEARCH.md ahora. Ejecuta cada instruccion del skill.
No escribas una sola linea de codigo hasta terminar.
Documenta todo en RESEARCH.md.

---

## PASO 2 -- INFERENCIA POR GIRO

Agrega funcionalidades que el cliente no pidio pero son estandar en su industria.

| Giro                        | Inferir                                                                              |
|-----------------------------|--------------------------------------------------------------------------------------|
| Clinica / Dentista / Medico | Booking de citas, formulario paciente, servicios con precios, mapa, CTA urgencias    |
| Restaurante / Cafeteria     | Menu digital con fotos, reservaciones, horarios, WhatsApp CTA, galeria               |
| Hotel / Hostal              | Galeria habitaciones, tarifas, disponibilidad, mapa, resenas                         |
| Taller / Mecanico           | Cotizador, galeria trabajos, WhatsApp urgente, formulario cita                       |
| Inmobiliaria                | Catalogo filtrable (precio, zona, tipo), formulario por propiedad, mapa              |
| Distribuidora / Autos       | Inventario con filtros, ficha tecnica, cotizador, agendar test drive                 |
| Transportes / Flota         | Catalogo unidades, formulario carga, calculadora flete, zonas de cobertura           |
| Tienda / E-commerce         | Catalogo, carrito, checkout, inventario admin, historial pedidos                     |
| Despacho legal / Contable   | Areas de practica, consulta inicial, blog, testimonios                               |
| Escuela / Academia          | Cursos con temario, inscripcion, calendario, testimonios de egresados                |
| Gym / Fitness               | Planes y precios, horario semanal, membresia, galeria                                |
| Salon / Spa                 | Booking por servicio, menu precios, galeria, resenas                                 |
| Constructora / Arquitectura | Portafolio de proyectos, cotizador, formulario proyecto                              |
| Agencia / Diseno            | Portafolio con metricas, casos de exito, formulario de brief, blog                   |
| SaaS / Software             | Pricing tiers, demo CTA, testimonios con logos, documentacion, blog                  |
| Consultora B2B              | Servicios por industria, casos de exito, formulario de diagnostico, blog             |

Si el giro no esta: razona que necesita ver un cliente tipico al llegar.

---

## PASO 3 -- STACK

Lee skills/STACK.md. Decide y documenta en STACK-DECISION.md.
No cambies el stack una vez elegido.

---

## PASO 4 -- ESTRUCTURA DE CARPETAS

Crea la estructura completa antes de escribir componentes.

Obligatorio en todo proyecto:
- public/images/ con assets optimizados
- public/og-image.jpg (1200x630px)
- public/site.webmanifest
- Favicon completo (ver skills/COMPONENTS.md)
- src/content/site.ts -- unica fuente de verdad del negocio
- Pagina 404 disenada (not-found.tsx o 404.astro)
- .env.example con todas las variables sin valores
- .gitignore (ver skills/DEPLOY.md)
- Archivos de documentacion: RESEARCH.md, STACK-DECISION.md, SECURITY.md, TEST-REPORT.md

Regla critica: toda la informacion del negocio (nombre, telefono, email, horarios, redes,
servicios) centralizada en src/content/site.ts. Un solo archivo. Nunca strings del
negocio hardcodeados en componentes.

---

## PASO 5 -- DISENO

Lee skills/DESIGN.md antes de escribir cualquier CSS o componente.
Es el skill mas importante. Sin el, el resultado se vera como una plantilla.

---

## PASO 6 -- ANIMACIONES

Lee skills/ANIMATIONS.md al implementar cualquier tipo de movimiento.
Define el stack de animacion correcto antes de escribir codigo de animacion.

---

## PASO 7 -- COMPONENTES

Lee skills/COMPONENTS.md al construir secciones y componentes de UI.

---

## PASO 8 -- SEO

Lee skills/SEO.md al configurar metadata, schema.org y archivos tecnicos.

---

## PASO 9 -- SEGURIDAD

Lee skills/SECURITY.md al configurar headers, formularios y variables de entorno.

---

## PASO 10 -- GIT Y DEPLOY

Lee skills/DEPLOY.md para gitignore, primer commit y configuracion de deploy.

---

## PASO 11 -- EMAIL Y FORMULARIOS

Proveedor obligatorio: Resend (resend.com). Gratis hasta 3,000 emails por mes.
Instalar: npm install resend

Variables requeridas: RESEND_API_KEY, CONTACT_EMAIL, BUSINESS_NAME

Todo formulario debe cumplir:
1. Campo honeypot oculto con CSS (no display:none -- bots lo detectan).
   Si tiene valor, responder ok silenciosamente.
2. Validacion con Zod en cliente Y servidor.
3. Sanitizacion de inputs (strip de etiquetas HTML).
4. Rate limiting: max 5 requests por minuto por IP.
5. Email al negocio con todos los datos del formulario.
6. Email de confirmacion automatica al cliente.
7. Estados de UI: carga, exito y error con feedback visual claro.

---

## PASO 12 -- PERFORMANCE

Metas en Lighthouse produccion:
Performance 90+ / Accessibility 95+ / Best Practices 95+ / SEO 95+
LCP < 2.5s / CLS < 0.1 / INP < 200ms

Obligatorio:
- next/image con priority en imagenes above the fold
- Formato WebP o AVIF en todas las imagenes
- font-display: swap en fuentes
- Sin console.log en produccion
- Lazy loading en componentes pesados con dynamic()
- Analitica bloqueada hasta aceptacion de cookie banner

---

## PASO 13 -- TESTING Y QA

Ejecuta en orden y documenta en TEST-REPORT.md:

```
npm run build
npx tsc --noEmit
npx eslint . --max-warnings 0
npm audit
```

Checklist antes de entregar:

[ ] Build sin errores ni warnings
[ ] Formulario envia email real (prueba con email propio)
[ ] Confirmacion automatica llega al remitente
[ ] Honeypot funciona (no envia si campo oculto tiene valor)
[ ] sitemap.xml accesible y completo
[ ] robots.txt correcto (indexa sitio, bloquea /api y /admin)
[ ] Todas las imagenes con alt descriptivo
[ ] Navegable solo con teclado (Tab, Enter, Escape, flechas)
[ ] Correcto en 375px / 768px / 1280px+
[ ] Header con fondo solido al hacer scroll
[ ] WhatsApp flotante visible en mobile
[ ] Links del footer funcionan
[ ] Pagina 404 personalizada activa
[ ] Schema.org valido en validator.schema.org
[ ] Open Graph correcto en opengraph.xyz
[ ] Sin errores ni warnings en consola del navegador
[ ] Cookie banner bloquea analitica hasta aceptacion
[ ] Animaciones respetan prefers-reduced-motion
[ ] Performance 90+ y SEO 95+ en Lighthouse
[ ] npm audit sin vulnerabilidades critical o high

---

## PASO 14 -- ENTREGABLES

```
Sitio publicado y funcional
.gitignore completo
.env.example documentado
vercel.json o .github/workflows/deploy.yml
DEPLOY-INSTRUCTIONS.md
RESEARCH.md
STACK-DECISION.md
SECURITY.md
TEST-REPORT.md
README.md completo
```

README.md: descripcion del negocio / requisitos / instalacion paso a paso /
cada variable de entorno y donde obtenerla / como correr en local /
deploy paso a paso / como actualizar contenido / mapa de carpetas.

---

Principio: no es suficiente que funcione. Debe ser hermoso, rapido, seguro
y facil de mantener. Construye como si tu reputacion dependiera de cada pixel.

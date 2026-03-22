# SKILL: COMPONENTS
# Estandares de componentes y ecosistema de librerias

Lee al construir cada seccion o componente de UI.
El nivel de calidad esperado es el de un producto comercial, no una plantilla.

---

## ECOSISTEMA DE LIBRERIAS -- DECISION POR CASO DE USO

### Base accesible (siempre disponible)

shadcn/ui (https://ui.shadcn.com)
  Copy-paste en tu codebase. Basado en Radix UI + Tailwind.
  Usar como base para: Dialog, Dropdown, Select, Toast, Tooltip, Popover, Tabs.
  SIEMPRE personalizar el estilo para que no se vea al default de shadcn.
  Instalacion: npx shadcn@latest add {component}

### Componentes animados premium

21st.dev (https://21st.dev)
  El "npm para componentes shadcn". Curado por design engineers.
  Consultar para: navbars avanzados, hero sections, cards con efectos,
  pricing tables, contact forms, feature sections.
  Instalacion via CLI: npx shadcn@latest add "https://21st.dev/r/{component}"
  O copiar el codigo directamente desde el sitio.

Magic UI (https://magicui.design)
  150+ componentes animados construidos sobre shadcn + Motion.
  Usar para: bento grids, marquee (logos o testimonios en scroll infinito),
  number ticker (contadores animados), shimmer buttons, animated beam,
  dot pattern backgrounds, grid pattern backgrounds, word rotate, text reveal.
  Instalacion: npx shadcn@latest add "https://magicui.design/r/{component}"

Aceternity UI (https://ui.aceternity.com)
  Efectos premium con Tailwind + Motion.
  Usar para: card hover con 3D tilt, spotlight effect, moving border,
  background beams, wavy lines, parallax scroll cards, glowing stars.
  Copiar el codigo directamente desde el sitio.

Motion Primitives (https://motion-primitives.com)
  Componentes centrados en animacion de texto y transiciones.
  Usar para: text effects, blur fade, in-view animations, progressive blur.

### Regla de uso

Estos recursos son REFERENCIA e INSPIRACION, no plantillas.
Toma el componente, adapta los colores a --color-brand y --color-accent,
cambia la tipografia a --font-display y --font-body, ajusta el espaciado.
El resultado debe verse como diseno a medida, no una instalacion por defecto.

---

## ESTANDAR POR COMPONENTE

### HERO SECTION

Titulo (H1):
  Minimo --text-6xl en desktop. Idealmente --text-7xl si el texto es corto (1-5 palabras).
  La keyword SEO principal incluida de forma natural.
  Correcto: "La mejor clinica dental en Monterrey"
  Incorrecto: "Tu sonrisa es nuestra prioridad" (sin keyword)

Subtitulo:
  Maximo 2 lineas en desktop. --text-lg o --text-xl. Propuesta de valor en una oracion.

CTA principal:
  Texto especifico con beneficio. Padding minimo 14px vertical, 28px horizontal.
  Correcto: "Agendar cita gratis" / "Ver inventario" / "Solicitar cotizacion gratis"
  Incorrecto: "Contactar" / "Saber mas" / "Empezar" / "Click aqui"

CTA secundario:
  Ghost button o link con flecha. Menor jerarquia visual.
  "Ver servicios" / "Conocer el equipo" / "Ver portafolio"

Imagen:
  Real del negocio si existe. Stock de alta calidad si no hay.
  next/image con priority={true} (es el LCP de la pagina).
  Nunca placeholder gris.

Indicador de scroll:
  Chevron o flecha con bounce animation al fondo del hero.
  Se oculta al hacer scroll (IntersectionObserver).

### HEADER Y NAVEGACION

Estructura:
  Desktop: logo izquierda / links centro / CTA derecha.
  Mobile: logo izquierda / hamburger derecha.
  El CTA del header es el mismo que el del hero (consistencia).

Comportamiento en scroll:
  position: fixed, z-index: 50.
  Estado inicial: transparente o color muy sutil, sin sombra.
  Al scroll 80px+: fondo solido con backdrop-blur-sm + --shadow-sm.
  Transition en background y box-shadow: 300ms ease.

Mobile menu:
  Panel lateral desde la derecha o fullscreen overlay.
  Animacion: slide + fade, 250ms.
  Overlay oscuro de fondo que cierra el menu al hacer click.
  Links grandes (minimo 18px), espacio generoso entre cada uno.
  Boton de cierre visible en la esquina.

### SERVICIOS O PRODUCTOS

Nunca usar: tres cards identicas con icono + titulo + parrafo, mismo padding, mismo radio.

Alternativas de alta calidad:

Opcion A -- Cards con numero de orden:
  Numero grande (01, 02, 03) en --color-brand-light como decoracion de fondo (opacity: 0.12).
  Titulo del servicio, descripcion breve, CTA inline o precio.
  Hover: translateY(-8px) + --shadow-lg + borde superior 2px en --color-accent.

Opcion B -- Layout alternado horizontal:
  Servicio 1: imagen derecha 60%, texto izquierda 40%.
  Servicio 2: imagen izquierda 60%, texto derecha 40%.
  Sin cards. Linea divisoria entre cada servicio.

Opcion C -- Bento grid:
  Card principal del servicio estrella: ocupa 2 columnas, fondo --color-brand, texto blanco.
  Servicios secundarios: cards regulares alrededor.
  Mezclar fondos: blanco, gris claro, de marca.

### TESTIMONIOS

Estructura por testimonio:
  Avatar: foto (56px, border-radius: 50%) o inicial generada con CSS y color aleatorio.
  Nombre completo + cargo o contexto ("Maria G. -- Paciente desde 2019").
  Calificacion: 5 estrellas SVG en #F59E0B dorado.
  Cita: entre comillas tipograficas curvas, font-style: italic, tamaño un paso mayor al cuerpo.
  Si es de Google: badge pequeno con logo de Google al lado de las estrellas.

Nunca usar texto inventado. Solo resenas obtenidas en la investigacion o
placeholders claros para que el cliente complete.

Layout recomendado:
  Carrusel con autoplay a 5 segundos + pause on hover + controles accesibles.
  O Marquee de Magic UI para scroll infinito horizontal.
  O grid 2 o 3 columnas en desktop, stack en mobile.

### LOGOS DE CLIENTES O PARTNERS

Si el negocio tiene clientes reconocibles, mostrar sus logos.
Usar el componente Marquee de Magic UI para scroll infinito.
Logos en escala de grises con hover en color.

### FORMULARIO DE CONTACTO

Campos minimos: Nombre, Email, Telefono (opcional), Mensaje.
Agregar campos especificos segun el giro (servicio de interes, fecha, etc.)

Estados por campo:
  Default: borde --color-border, background --color-bg.
  Focus: borde --color-brand + glow (ver skills/ANIMATIONS.md).
  Error: borde rojo + mensaje de error debajo en rojo + icono.
  Valid: checkmark verde sutil.

Boton de envio:
  Texto especifico: "Enviar mensaje" / "Solicitar informacion" / "Agendar cita".
  Loading: spinner + "Enviando..." con el boton deshabilitado.
  Exito: mensaje de confirmacion visible, formulario reseteado.
  Error: mensaje de error claro, datos del usuario preservados.

Honeypot (obligatorio):
  input de texto, name="_honey", oculto con CSS position absolute opacity 0.
  NUNCA display none.

### SECCION DE CONTACTO COMPLETA

Dividir en dos columnas (desktop):
  Izquierda: informacion de contacto, mapa embed, horarios.
  Derecha: formulario.

Mapa:
  Google Maps iframe con la direccion exacta.
  loading="lazy" obligatorio.
  referrerpolicy="no-referrer-when-downgrade"

WhatsApp en la seccion de contacto:
  Boton con icono de WhatsApp + "Chatea con nosotros" + numero.
  Abre wa.me con mensaje predefinido.

### FOOTER

Estructura:
  Col 1: Logo + descripcion de 2-3 lineas + redes sociales (iconos SVG inline).
  Col 2: Links del sitio.
  Col 3: Informacion de contacto (tel, email, direccion, horario).
  Col 4 (opcional): Newsletter o links adicionales.

Bottom bar:
  Copyright con ano dinamico: {new Date().getFullYear()}
  Links: Aviso de Privacidad | Terminos | Politica de Cookies

Iconos de redes: SVG inline (no icon fonts).
  Hover: --color-accent o color de la red social.
  Area de toque: minimo 44x44px.

### WHATSAPP FLOTANTE

Solo en mobile (display: none en desktop).
Position: fixed, bottom: 24px, right: 24px, z-index: 40.
Boton circular 56x56px, background: #25D366, border-radius: 50%.
Icono SVG de WhatsApp en blanco.
Animacion: pulse sutil en el box-shadow.

```
const url = `https://wa.me/${phone.replace(/\D/g,'')}?text=${
  encodeURIComponent('Hola, me interesa informacion sobre sus servicios')
}`
```

### PAGINA 404

Obligatorio disenada. Nunca la default del framework.

Elementos:
  Numero "404" en --text-8xl, color --color-brand-light.
  Titulo claro: "Pagina no encontrada"
  Descripcion amable: "La pagina que buscas no existe o fue movida."
  Boton primario: "Volver al inicio"
  2-3 links a secciones populares del sitio.

### COOKIE CONSENT BANNER

Position: fixed, bottom 0, left 0, right 0, z-index: 100.
Fondo: --color-bg-alt + borde superior 1px --color-border.
Texto: breve descripcion de uso de cookies.
Botones: "Aceptar todo" (primary) y "Solo esenciales" (ghost).
Guardar en localStorage ('cookie-consent': 'all' | 'essential').
Si 'all': cargar GTM. Si 'essential': no cargar analitica.
Respetar la preferencia en visitas futuras.

### FAVICON COMPLETO

Generar y colocar en /public:

```
favicon.ico                   32x32
favicon-16x16.png             16x16
favicon-32x32.png             32x32
apple-touch-icon.png          180x180
android-chrome-192x192.png    192x192
android-chrome-512x512.png    512x512
og-image.jpg                  1200x630 (imagen para redes sociales)
site.webmanifest
```

En el head:
```html
<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="{--color-brand hex}" />
```

---

## ACCESIBILIDAD -- WCAG 2.1 AA

Contraste minimo:
  Texto normal (< 18px): ratio 4.5:1 con el fondo.
  Texto grande (>= 18px): ratio 3:1 con el fondo.
  Verificar en: webaim.org/resources/contrastchecker

Navegacion por teclado:
  Todos los elementos interactivos alcanzables con Tab, orden logico.
  Focus visible siempre (nunca outline: none sin reemplazo).
  Modales y menus: focus trapped mientras estan abiertos.
  Escape cierra modales y menus.

Semantica HTML:
  Un solo H1 por pagina. Jerarquia sin saltar niveles (H1 -> H2 -> H3).
  Botones son button. Links son a con href real. No div como boton.
  label asociado a cada input. Imagenes con alt descriptivo o alt="" si decorativas.
  Listas son ul o ol.

ARIA:
  aria-label en botones que solo tienen icono.
  aria-expanded en botones que abren/cierran paneles.
  role="navigation" y aria-label en cada nav.
  aria-live="polite" en mensajes de estado del formulario.

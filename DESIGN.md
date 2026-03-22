# SKILL: DESIGN
# Inteligencia de diseno UI/UX -- 2025/2026

Lee completo antes de escribir cualquier CSS, componente o layout.
El diseno es lo que diferencia un sitio memorable de uno que se olvida.
Sin este skill el resultado se vera como una plantilla generica.

---

## FILOSOFIA DE DISENO

Cada proyecto es un encargo unico. El giro, la ciudad, el publico objetivo y la
personalidad del negocio determinan cada decision visual. Nunca apliques la misma
estetica a dos proyectos distintos.

La mediocridad viene de no comprometerse. Una vez que eliges una direccion estetica,
ejecutala con precision hasta el ultimo detalle. El punto medio sin intencion
es el origen de los sitios genericos.

---

## BRIEF DE DISENO OBLIGATORIO

Antes de abrir el editor responde estas 4 preguntas y documenta en STACK-DECISION.md.

1. Que emocion siente el visitante en los primeros 3 segundos?
   Confianza / Sofisticacion / Energia / Calidez / Exclusividad / Innovacion

2. Cual es el elemento visual que diferencia este sitio de sus competidores?
   Comprometete con uno y ejecutalo con precision:
   - Tipografia de gran escala en el hero (titulo como elemento grafico)
   - Layout asimetrico con jerarquia visual clara
   - Fotografia con tratamiento de color consistente en todas las imagenes
   - Composicion con espacio negativo generoso y precision en cada detalle
   - Bento grid con cards de tamanos variables para metricas o servicios
   - Glassmorphism selectivo en header o cards sobre imagenes

3. Que NO debe parecer este sitio?
   Define esto primero. Luego evitalo activamente.

4. Referente: busca en awwwards.com, dribbble.com, y en las URLs que el cliente
   proporciono. Analiza que hace que el referente funcione. Toma lo que funciona.
   No copies la estetica, toma el principio.

---

## PROHIBICIONES ABSOLUTAS

Si cualquiera de estos aparece en el resultado, el diseno ha fallado:

- Gradiente purpura o blue-to-purple sobre fondo blanco
- Hero: imagen a la derecha, H1 + parrafo + boton centrados a la izquierda
- Tres cards identicas en fila: icono + titulo + parrafo, mismo padding, mismo radio
- Fuentes display: Inter, Roboto, Arial, Helvetica, system-ui como protagonista visual
- Secciones apiladas con el mismo padding sin ninguna ruptura o variacion de ritmo
- Stock photo de personas sonriendo frente a computadoras en reunion de oficina
- Boton azul que dice "Contactar" o "Saber mas" o "Empezar"
- Footer de cuatro columnas identicas sin jerarquia visual
- Paleta completamente muted y neutral sin un punto de tension cromatica

---

## PATRONES VISUALES PROFESIONALES 2025

Estos patrones son efectivos en sitios de negocios. Elegir los que encajan
con el giro y la personalidad de la marca. No aplicar todos a la vez.

### Tipografia de escala variable
- Titulo hero en --text-5xl o --text-6xl en desktop, bold pero no agresivo
- Mix de peso: heading en SemiBold (600) con cuerpo en Regular (400)
- Subtitulo en --text-xl con line-height amplio para respiro visual
- Jerarquia clara: H1 domina, H2 acompana, body es legible sin esfuerzo

### Bento Grid
Alternativa moderna a tres cards identicas en fila:
- Grid de cards de tamanos variables (2-col, 4-col, 6-col en un grid de 12)
- Cada card tiene un proposito: metrica clave, servicio, testimonio, imagen
- Fondo diferente por card (clara, oscura, de marca) para crear ritmo visual
- Adoptado por Vercel, Linear, Stripe en sus landing pages de producto

### Glassmorphism selectivo
Usar con moderacion, solo donde agrega profundidad real:
- Header con backdrop-filter: blur(12px) al hacer scroll sobre imagen de hero
- Cards flotando sobre imagen de fondo con fondo semi-transparente
- Modales y drawers con backdrop-blur sobre el contenido

### Color con proposito
- Fondo principal: nunca blanco puro (#FFF), usar #FAFAFA o #F8F9FA
- Un color de marca solido y definido, no generico
- Acento reservado exclusivamente para CTAs y elementos interactivos clave
- Maximo 3 valores de color con saturacion en toda la pagina

---

## SISTEMA DE DISENO

Define primero en globals.css como CSS custom properties.
No uses valores magicos en componentes -- siempre usa estas variables.

```css
:root {
  /* Escala cromatica */
  --color-brand:         ;  /* color principal del negocio */
  --color-brand-dark:    ;  /* 15-20% mas oscuro para hover */
  --color-brand-light:   ;  /* 15-20% mas claro para fondos sutiles */
  --color-accent:        ;  /* color de acento alto contraste -- solo CTAs */
  --color-text:          ;  /* texto principal -- nunca negro puro */
  --color-text-muted:    ;  /* texto secundario */
  --color-bg:            ;  /* fondo principal -- nunca blanco puro */
  --color-bg-alt:        ;  /* fondo alternativo para secciones */
  --color-bg-dark:       ;  /* fondo oscuro para secciones de quiebre */
  --color-border:        ;  /* bordes y divisores */

  /* Tipografia */
  --font-display: 'NombreFuente', serif;    /* headings y titulos */
  --font-body:    'NombreFuente', sans-serif; /* parrafos y UI */

  /* Escala de texto -- usa estas, no valores arbitrarios */
  --text-xs:   0.75rem;   --text-sm:   0.875rem;  --text-base: 1rem;
  --text-lg:   1.125rem;  --text-xl:   1.25rem;   --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;  --text-4xl:  2.25rem;   --text-5xl:  3rem;
  --text-6xl:  3.75rem;   --text-7xl:  4.5rem;    --text-8xl:  6rem;

  /* Espaciado modular */
  --space-1: 0.25rem;   --space-2: 0.5rem;   --space-3: 0.75rem;
  --space-4: 1rem;      --space-6: 1.5rem;   --space-8: 2rem;
  --space-12: 3rem;     --space-16: 4rem;    --space-24: 6rem;
  --space-32: 8rem;

  /* Radios -- elige un perfil y mantente consistente */
  --radius-sm:   4px;   --radius-md:   8px;
  --radius-lg:   16px;  --radius-xl:   24px;  --radius-full: 9999px;

  /* Sombras */
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.08);
  --shadow-md:  0 4px 16px rgba(0,0,0,0.10);
  --shadow-lg:  0 20px 60px rgba(0,0,0,0.14);
  --shadow-xl:  0 40px 80px rgba(0,0,0,0.18);

  /* Easings de animacion */
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Transiciones */
  --transition-fast:   150ms ease;
  --transition-base:   300ms var(--ease-in-out);
  --transition-slow:   600ms var(--ease-out-expo);
  --transition-spring: 500ms var(--ease-spring);
}
```

---

## TIPOGRAFIA -- PERFILES POR PERSONALIDAD

Regla: maximo 2 familias. Display tiene personalidad. Cuerpo tiene legibilidad.
Nunca uses como display: Inter, Roboto, Arial, Helvetica, system fonts.

| Personalidad              | Display                                       | Cuerpo                        |
|---------------------------|-----------------------------------------------|-------------------------------|
| Lujo / Premium / Spa      | Playfair Display, Cormorant Garamond          | Jost, DM Sans                 |
| Moderno / Tech / SaaS     | Syne, Epilogue, Cabinet Grotesk               | Manrope, Outfit               |
| Agencia / Diseno          | Clash Display, Plus Jakarta Sans              | IBM Plex Sans, DM Sans        |
| Artesanal / Organico      | Fraunces, Lora, Bitter                        | Karla, Cabin, Nunito          |
| Clinico / Confiable       | DM Serif Display, Libre Baskerville           | DM Sans, Manrope              |
| Amigable / Local / Retail | Nunito, Quicksand, Plus Jakarta Sans          | Source Sans 3, Mulish         |
| Corporativo / Legal       | Libre Baskerville, Playfair Display           | Inter, Lato                   |

---

## PALETA CROMATICA POR GIRO

Para clientes sin colores de marca. Desarrolla la paleta completa, no solo apliques plano.

| Giro                    | Brand                        | Accent               | Bg             |
|-------------------------|------------------------------|----------------------|----------------|
| Salud / Medico          | #1B3A6B azul profundo        | #2ECC9A verde menta  | #F8FAFB        |
| Restaurante premium     | #1A1A1A negro carbon         | #C9A84C dorado       | #FAF6EF crema  |
| Cafeteria artesanal     | #4A2C17 marron tostado       | #C96A3A terracota    | #F5EFE6 beige  |
| Tech / SaaS             | #0F172A azul noche           | #6366F1 indigo       | #FFFFFF         |
| Fitness / Gym           | #111111 negro                | #F5C400 amarillo     | #F2F2F2        |
| Legal / Corporativo     | #1E3A5F azul marino          | #C9A84C dorado       | #F8F9FA        |
| Belleza / Spa           | #C4956A cobre rosado         | #8B5E3C marron suave | #FAF8F5 marfil |
| Construccion            | #2D3436 gris antracita       | #E67E22 naranja      | #FFFFFF         |
| Inmobiliaria premium    | #1C1C1E negro suave          | #C9B07A champagne    | #F5F5F3        |
| Agencia / Diseno        | #111111 negro grafito            | #2563EB azul electrico | #FAFAFA        |

Proporcion 60-30-10:
60% color de fondo neutro / 30% color de marca / 10% color de acento.
El acento aparece SOLO en: CTAs, hover states, elementos interactivos, underlines.
Nunca lo uses como fondo de secciones enteras.

---

## LAYOUT Y COMPOSICION

Al menos 3 de estos patrones deben aparecer en cada proyecto.
Elegir los que encajan con el giro y el nivel de formalidad del negocio.

Full-bleed con overlay de color:
  Imagen ocupa 100% del viewport.
  Overlay del color de marca al 55-65% de opacidad.
  Texto en contraste alto sobre el overlay.

Layout asimetrico:
  Nunca 50/50 cuando hay texto + imagen.
  Preferir 38/62 o 35/65. El elemento mas importante gana mas espacio.

Bento grid:
  Cards de tamanos variables (ver seccion Patrones Visuales).
  Mezclar fondos: claro, oscuro, de marca.

Numeros o estadisticas como protagonistas:
  Ano de fundacion, numero de clientes, calificacion Google.
  El numero en --text-5xl o --text-6xl. El label en --text-sm.

Quiebre cromatico entre secciones:
  Una seccion (CTA o testimonios) con fondo --color-bg-dark o --color-brand.
  Texto claro sobre fondo oscuro. Rompe el ritmo y genera jerarquia.

Galeria con variacion de tamanos:
  Nunca grid uniforme de 3 columnas iguales.
  Mezclar orientaciones y proporciones para que se vea curado, no generado.

Separador con forma:
  SVG con clip-path diagonal o curvo entre secciones.
  Alternativa a la linea horizontal plana que se ve como plantilla.

---

## MODO OSCURO

Implementar si el giro lo justifica:
  Justificado: tech, software, agencias creativas, fitness, entretenimiento, gaming
  No implementar: salud, legal, alimentacion infantil, sectores conservadores

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:          #0A0A0A;
    --color-bg-alt:      #141414;
    --color-bg-dark:     #1A1A1A;
    --color-text:        #F2F2F2;
    --color-text-muted:  #888888;
    --color-border:      #242424;
    /* Ajustar brand y accent si es necesario para mantener contraste WCAG AA */
  }
}
```

---

## FOTOGRAFIA Y ASSETS

Si hay imagenes en /imagenes:
- Procesar a WebP o AVIF en el build
- Generar versiones responsive (640, 1024, 1920px)
- Extraer colores dominantes para validar/complementar la paleta
- Si la calidad es inconsistente, aplicar filtro CSS uniforme para cohesion

```css
/* Para dar cohesion a fotos inconsistentes */
.photo-treated {
  filter: contrast(1.04) saturate(0.92);
}
/* Para hero con overlay de marca */
.hero-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--color-brand) 62%, transparent);
}
```

Si no hay imagenes del cliente:
- Descargar de Unsplash o Pexels. Minimo 8 fotos de alta resolucion.
- Preferir fotos con personas reales en contexto del giro, no objetos solos.
- Mantener consistencia de paleta cromatica entre las fotos elegidas.

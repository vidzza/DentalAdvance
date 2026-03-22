# SKILL: ANIMATIONS
# Movimiento e interaccion para sitios de negocios

Lee este skill al implementar cualquier animacion o transicion.
El movimiento debe reforzar la credibilidad del negocio, no distraer.
Las animaciones de negocios son sutiles, rapidas y con proposito claro.
Nunca deben llamar mas atencion que el contenido.

---

## DECISION: MOTION VS GSAP

Basado en benchmarks de produccion 2025 (motion.dev vs gsap.com):

```
El proyecto es React o Next.js?
  Si
    Animaciones de UI: componentes, reveals, micro-interacciones, layout
      ->  Motion (Framer Motion) -- 2.5x mas rapido, bundle mas pequeno, MIT license
          npm install motion
          import { motion, AnimatePresence } from 'motion/react'

    Animaciones scroll complejas: pinning, scrub, path animations, timelines multi-capa
      ->  GSAP + ScrollTrigger -- mayor control sobre secuencias complejas
          npm install gsap
          import { gsap } from 'gsap'
          import { ScrollTrigger } from 'gsap/ScrollTrigger'
          NOTA: GSAP es propiedad de Webflow. Para proyectos que podrian competir
          con Webflow, revisar los terminos de la licencia antes de usar.

    Combinar ambos es valido y comun:
      Motion para componentes y micro-interacciones
      GSAP para secuencias scroll complejas de la landing

El proyecto es Astro (no React)?
  ->  CSS @keyframes + animation + scroll-driven animations (nativo CSS)
      Para secuencias complejas: GSAP es mejor opcion que Motion aqui
```

---

## MOTION (FRAMER MOTION) -- PATRONES OBLIGATORIOS

### Reveal al entrar en viewport

Aplica a: secciones, titulos, cards, parrafos, cualquier contenido que entra al scroll.

```tsx
import { motion } from 'motion/react'

// Variantes base -- reutilizar en todo el proyecto
export const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
  }
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
}

export const staggerContainer = {
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
}

// Uso en seccion:
<motion.section
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-60px" }}
>
  <motion.h2 variants={fadeUp}>Titulo</motion.h2>
  <motion.p variants={fadeUp}>Descripcion</motion.p>
</motion.section>
```

### Stagger en listas de cards

```tsx
// Grid de servicios, testimonios, equipo, etc.
<motion.ul variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {items.map((item) => (
    <motion.li key={item.id} variants={fadeUp}>
      <ServiceCard {...item} />
    </motion.li>
  ))}
</motion.ul>
```

### Transiciones de pagina (Next.js App Router)

```tsx
// Envolver el contenido de cada page.tsx
'use client'
import { motion } from 'motion/react'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  )
}
```

### AnimatePresence para modales y menus

```tsx
import { AnimatePresence, motion } from 'motion/react'

<AnimatePresence>
  {isOpen && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* contenido del modal */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## MICRO-INTERACCIONES -- OBLIGATORIO EN CADA COMPONENTE

Implementar en todos los elementos interactivos. No son opcionales.

### Botones

```tsx
<motion.button
  whileHover={{ scale: 1.02, y: -1 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.15 }}
>
  Agendar cita
</motion.button>
```

O en CSS puro (alternativa valida y de mejor rendimiento para botones simples):

```css
.btn {
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
}
.btn:hover  { transform: translateY(-1px); box-shadow: var(--shadow-md); }
.btn:active { transform: scale(0.97); box-shadow: var(--shadow-sm); }
.btn:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
```

### Cards con elevacion

```tsx
<motion.article
  whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
```

O en CSS:

```css
.card {
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}
.card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
```

### Links de navegacion con underline animado

```css
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 2px;
  background: var(--color-accent);
  transition: width var(--transition-base);
}
.nav-link:hover::after,
.nav-link[aria-current="page"]::after { width: 100%; }
```

### Imagenes con zoom sutil

```css
.image-wrapper { overflow: hidden; }
.image-wrapper img {
  transition: transform 700ms var(--ease-out-expo);
}
.image-wrapper:hover img { transform: scale(1.04); }
```

### Inputs con glow en focus

```css
.input {
  border: 1.5px solid var(--color-border);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}
.input:focus {
  border-color: var(--color-brand);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand) 15%, transparent);
  outline: none;
}
```

### Header con glass effect en scroll

```tsx
'use client'
import { motion, useScroll, useTransform } from 'motion/react'

export function Header() {
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.95)']
  )
  const boxShadow = useTransform(
    scrollY,
    [0, 80],
    ['none', '0 1px 20px rgba(0,0,0,0.08)']
  )
  return (
    <motion.header style={{ backgroundColor, boxShadow }}
      className="fixed top-0 w-full z-50 backdrop-blur-sm">
      {/* nav content */}
    </motion.header>
  )
}
```

---

## GSAP + SCROLLTRIGGER -- PARA SECUENCIAS COMPLEJAS

Usar cuando Motion no es suficiente: pinning de secciones, path animations,
timelines multi-capa, secuencias cinematograficas tipo Apple.

### Setup en React (Next.js)

```tsx
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })
    }, sectionRef)

    // Cleanup obligatorio para evitar memory leaks
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef}>
      <img ref={imageRef} src="..." alt="..." />
    </section>
  )
}
```

---

## CSS SCROLL-DRIVEN ANIMATIONS (Astro / sin librerias)

Soporte nativo en Chrome/Edge 115+. Fallback: animations normales en browsers no compatibles.

```css
/* Reveal al scroll -- sin JavaScript */
.reveal {
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-timeline: view();
  animation-range: entry 0% entry 35%;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Parallax sutil en hero -- sin JavaScript */
.hero-image {
  animation: parallax linear both;
  animation-timeline: scroll(root);
  animation-range: 0 500px;
}

@keyframes parallax {
  from { transform: translateY(0); }
  to   { transform: translateY(-80px); }
}
```

---

## REGLA DE ORO: PREFERS-REDUCED-MOTION

Obligatorio en TODOS los proyectos. Sin excepcion.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

En Motion, usar el hook:

```tsx
import { useReducedMotion } from 'motion/react'

export function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    />
  )
}
```

---

## QUE NO ANIMAR

- Texto que ya es visible al cargar (above the fold sin scroll)
- Elementos que se repiten muchas veces (items de un menu de 50 entradas)
- Animaciones que retrasan el acceso a informacion critica
- Layout properties (width, height, top, left) -- usar transform en su lugar
- Animaciones de mas de 800ms que no son scroll-driven -- se sienten lentas

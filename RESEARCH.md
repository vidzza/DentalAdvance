# SKILL: RESEARCH
# Inteligencia de negocio autonoma

Ejecuta todo este skill antes de escribir codigo.
Con informacion minima en el cuestionario este skill llena los huecos.
Si el negocio no tiene presencia online genera todo por inferencia de industria.

---

## FUENTES EN ORDEN DE PRIORIDAD

### 1. Sitio web actual
Si hay URL en requerimientos.txt: visitalo.
Extrae: servicios, precios, textos, colores, tipografia, tono de voz.
Identifica fallas: lento, no mobile, sin SEO, diseno pobre, contenido desactualizado.
Lista exactamente que mejora la nueva version.

### 2. Google Business Profile
Busca: "{nombre negocio}" "{ciudad}" y "{nombre negocio}" site:maps.google.com

Extrae todo lo disponible publicamente:
- Calificacion (X.X/5) y numero total de resenas
- Direccion exacta y coordenadas GPS (lat, lng)
- Horarios por dia de la semana
- Fotos del negocio (propias y de clientes)
- Las 5 mejores resenas (usarlas como testimonios reales en el sitio)
- Categoria exacta (confirma el giro)
- Preguntas y respuestas frecuentes (revelan dudas comunes de clientes)

### 3. Redes sociales

Instagram y TikTok:
- Bio completa y link en bio
- Hashtags frecuentes (revelan palabras clave del negocio)
- Los 10 posts con mas engagement (revelan servicios estrella)
- Tono de comunicacion: formal, casual, tecnico, divertido, aspiracional

Facebook:
- Descripcion completa de la pagina
- Seccion de Servicios si esta habilitada
- Resenas de clientes (fuente adicional de testimonios)
- Telefono, email, horario si estan visibles

LinkedIn:
- About de la empresa
- Tamano del equipo y especialidades
- Logros, premios, clientes mencionados
- Principalmente relevante para B2B

YouTube:
- Descripcion del canal
- Videos con mas vistas (revelan que le importa mostrar)

### 4. Directorios verticales por giro
Salud:          Doctoralia, ZocDoc, Alma
Restaurantes:   Yelp, Tripadvisor, Google Food
Hospedaje:      Booking, TripAdvisor, Airbnb
Construccion:   Homify, Houzz, Habitissimo
Agencias:       Clutch, GoodFirms, DesignRush
General:        Seccion Amarilla, Paginas Amarillas, directorios de la ciudad

Extrae: lista de servicios, precios si aparecen, resenas adicionales.

### 5. Analisis competitivo local
Busca "{giro} {ciudad}" y analiza los primeros 5 resultados organicos:
- Que secciones tienen sus paginas
- Que palabras clave usan en titulos y meta descriptions
- Que les falta (esa es la oportunidad del cliente)
- Estandar visual del sector en esa zona
- Quien tiene el mejor diseno y por que funciona

---

## CUANDO NO HAY PRESENCIA ONLINE

No te detengas. Usa inferencia de industria:
- Genera textos profesionales y creibles segun el giro y ciudad
- Usa rangos de precio tipicos de la industria en esa zona geografica
- Descarga imagenes de alta calidad de Unsplash (unsplash.com) o Pexels (pexels.com)
  Buscar en ingles: "{industry} {city}" o "{service type} professional"
  Descargar minimo 8 imagenes relevantes, variadas, de alta resolucion
- Disenha identidad visual coherente desde cero segun el giro

---

## EXTRACCION DE IDENTIDAD VISUAL

Si hay logo o imagenes en /imagenes o en redes sociales:
- Extrae los colores dominantes exactos en hex
- Identifica el estilo tipografico: serifado, sans-serif, geometrico, humanista
- Detecta el tono visual: formal, casual, energetico, calido, frio, lujoso

Si no hay identidad visual definida:
- Propone paleta segun el giro (ver skills/DESIGN.md)
- Anota la propuesta en RESEARCH.md para validarla antes de usarla

---

## DOCUMENTA EN RESEARCH.md

```
# Research Report -- {Nombre del Negocio}
Generado: {fecha}

## Fuentes consultadas
Sitio web actual:    {url o "no tiene"}
Google Business:     {url o "no encontrado"}
Instagram:           {url o "no tiene"}
Facebook:            {url o "no tiene"}
LinkedIn:            {url o "no tiene"}
Directorios:         {lista o "no encontrado en directorios verticales"}

## Datos verificados
Calificacion Google: {X.X / 5 -- N resenas}
Direccion:           {calle, colonia, ciudad, estado, CP}
Coordenadas:         {lat}, {lng}
Telefono:            {numero con codigo de pais}
Email:               {email}
Horarios:            {por dia}

## Identidad visual detectada
Colores primarios:   {hex codes}
Colores secundarios: {hex codes}
Tono visual:         {descripcion}
Fuentes detectadas:  {si son identificables}

## Servicios detectados
{lista numerada con precios si aplican}

## Testimonios reales para usar en el sitio
{lista: "Nombre Apellido -- comentario textual -- calificacion/5 -- fuente"}

## Analisis competitivo
Competidor 1: {nombre} | {url} | {que hace bien} | {que le falta}
Competidor 2: {nombre} | {url} | {que hace bien} | {que le falta}
Oportunidad detectada: {que puede hacer mejor el cliente}

## Inferencias aplicadas por giro
{lista de funcionalidades y contenido agregados automaticamente y razon}

## Campos vacios en requerimientos.txt y decision tomada
{campo}: {decision y razon}
```

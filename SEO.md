# SKILL: SEO
# Optimizacion para buscadores -- local y tecnico

---

## METADATA POR PAGINA

Next.js 15 (src/app/layout.tsx y cada page.tsx):

```typescript
export const metadata: Metadata = {
  title: '{Keyword principal} | {Nombre negocio} -- {Ciudad}',
  description: '{150-160 caracteres. Incluir keyword, ciudad, propuesta de valor clara.}',
  openGraph: {
    title: '{Mismo o variacion del title}',
    description: '{Mismo o ligeramente mas conversacional}',
    url: 'https://www.dominio.com',
    siteName: '{Nombre del negocio}',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: '{descripcion}' }],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '{title}',
    description: '{description}',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://www.dominio.com' },
  robots: { index: true, follow: true },
}
```

---

## SCHEMA.ORG JSON-LD

Colocar en el root layout. Elegir el @type correcto segun el giro.

| Giro                    | @type Schema.org                        |
|-------------------------|-----------------------------------------|
| Dentista                | Dentist                                 |
| Clinica medica          | MedicalClinic                           |
| Restaurante             | Restaurant                              |
| Hotel                   | Hotel o LodgingBusiness                 |
| Tienda                  | Store                                   |
| Abogado                 | Attorney o LegalService                 |
| Contador                | AccountingService                       |
| Gym                     | HealthClub o SportsActivityLocation     |
| Salon de belleza        | HairSalon o BeautySalon                 |
| Agencia de marketing    | MarketingAgency                         |
| Software / Tech         | SoftwareApplication o ProfessionalService |
| Constructora            | HomeAndConstructionBusiness             |
| Cualquier local         | LocalBusiness                           |

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "{tipo segun giro}",
  "name": "{nombre}",
  "description": "{descripcion}",
  "url": "{url}",
  "telephone": "{+52...}",
  "email": "{email}",
  "image": "/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{calle}",
    "addressLocality": "{ciudad}",
    "addressRegion": "{estado}",
    "postalCode": "{CP}",
    "addressCountry": "MX"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": {lat},
    "longitude": {lng}
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{de Google Business}",
    "reviewCount": "{de Google Business}",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": ["{instagram}", "{facebook}", "{linkedin}"],
  "priceRange": "{rango tipico del giro}"
}
</script>
```

Solo incluir campos con datos reales. No inventar calificaciones.

---

## ARCHIVOS TECNICOS

sitemap.xml (Next.js 15):

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
const base = 'https://www.dominio.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/servicios`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/nosotros`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/contacto`, changeFrequency: 'yearly', priority: 0.7 },
    // agregar todas las rutas del sitio
  ]
}
```

robots.txt:

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/

Sitemap: https://www.dominio.com/sitemap.xml
```

---

## SEO LOCAL

Textos:
  Ciudad y zona de servicio mencionadas naturalmente en H1, parrafos y alt de imagenes.
  Alt de imagen del local: "{tipo de negocio} en {ciudad}" no solo "{descripcion generica}".

Multiples zonas:
  Si el negocio atiende varias ciudades o colonias, crear paginas dedicadas por zona.
  Ejemplo: /monterrey, /san-pedro, /santa-catarina
  Cada pagina con su propio title, description y schema.

Google Maps embed:
  En la seccion de contacto.
  loading="lazy" referrerpolicy="no-referrer-when-downgrade"

Aviso de privacidad segun ley del pais:
  Mexico (LFPDPPP): identidad del responsable, datos recabados, finalidad,
  derechos ARCO, transferencias si aplican, cambios al aviso.
  USA (CCPA): tipos de datos, derechos del consumidor, opt-out.
  Europa (GDPR): base legal, retention, derechos del usuario.

---

## VERIFICAR ANTES DE ENTREGAR

- Schema.org valido: validator.schema.org
- Open Graph correcto: opengraph.xyz
- sitemap.xml accesible y con todas las rutas
- robots.txt correcto
- Title: 50-60 caracteres
- Description: 150-160 caracteres
- H1 unico por pagina con keyword principal
- Imagenes con alt descriptivo
- Sin titulo o description duplicados entre paginas

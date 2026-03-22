# Security Implementation — Dental Advance
Fecha: 2026-03-21

---

## Headers HTTP

Configurados en `vercel.json` (aplican a todas las rutas en producción):

| Header | Valor | Propósito |
|--------|-------|-----------|
| `X-Frame-Options` | `DENY` | Previene clickjacking |
| `X-Content-Type-Options` | `nosniff` | Previene MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controla información del referrer |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(self)` | Restringe APIs del navegador |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Fuerza HTTPS (2 años) |
| `X-DNS-Prefetch-Control` | `on` | Mejora performance de DNS |
| `Content-Security-Policy` | Ver abajo | Previene XSS e inyección de contenido |

### Content-Security-Policy completa

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com;
frame-src https://maps.google.com https://www.google.com;
media-src 'none';
object-src 'none';
base-uri 'self';
form-action 'self';
```

> **Nota:** `unsafe-inline` en scripts es necesario para el script de Intersection Observer y el FAQ accordion, que son inline. Si en el futuro se migran a archivos externos, se puede eliminar este permiso.

---

## Formulario de Contacto (`/api/contact.ts`)

| Medida | Implementada | Detalle |
|--------|-------------|---------|
| **Honeypot** | Sí | Campo `_gotcha` oculto con CSS (`position:absolute;left:-9999px`). Si tiene valor, responde 200 OK sin procesar. |
| **Validación Zod** | Sí | Validación en servidor: `name` (2-100 chars), `phone` (7-20 chars), `email` (email válido, opcional), `service` (max 50), `message` (max 1000) |
| **Sanitización** | Sí | Strip de etiquetas HTML en todos los campos: `str.replace(/<[^>]*>/g, '').trim()` |
| **Rate limiting** | Sí (básico) | Map en memoria: max 5 requests/minuto por IP. Retorna 429 si se supera. |
| **Confirmación al remitente** | Sí | Email automático si el usuario proporcionó email |

> **Limitación del rate limiter:** Por ser serverless (Vercel), el Map en memoria se reinicia por instancia. Para mayor robustez en producción, usar [Upstash Rate Limit](https://upstash.com/docs/rl/overview).

---

## Variables de Entorno

| Variable | Exposición | Seguridad |
|----------|-----------|-----------|
| `RESEND_API_KEY` | Solo servidor (`/api/`) | Nunca expuesta al cliente |
| `CONTACT_EMAIL` | Solo servidor | Nunca expuesta al cliente |
| `BUSINESS_NAME` | Solo servidor | Nunca expuesta al cliente |
| `FROM_EMAIL` | Solo servidor | Nunca expuesta al cliente |

- `.env.local` excluido de Git: **Sí** (`.gitignore`)
- `.env.example` documentado en Git: **Sí**
- API keys solo en servidor: **Sí**

---

## Dependencias

Auditoría ejecutada: 2026-03-21

```bash
npm audit
```

| Resultado | Detalle |
|-----------|---------|
| Vulnerabilidades críticas | 0 |
| Vulnerabilidades altas | 0 |
| Vulnerabilidades moderadas | 0 |
| Total paquetes | 474 |

> **Nota sobre @astrojs/vercel:** Se descartó este adapter (v9.x) por contener vulnerabilidades high en `path-to-regexp` (GHSA-9wv6-86v2-598j). Se reemplazó con Vercel Native Functions (`/api/contact.ts`), manteniendo 0 vulnerabilidades.

---

## Autenticación

No aplica. El sitio es de solo lectura (sin login, sin dashboard, sin área de clientes).

---

## HTTPS

Gestionado automáticamente por Vercel con Let's Encrypt. No requiere configuración manual.

---

## GDPR / LFPDPPP

- Aviso de privacidad disponible en `/aviso-de-privacidad` ✅
- El formulario de contacto no almacena datos en base de datos (envío directo por email) ✅
- Los datos recopilados (nombre, teléfono, email) solo se usan para responder la consulta ✅

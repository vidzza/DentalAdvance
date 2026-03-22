# Instrucciones de Deploy — Dental Advance

## Requisitos

- Cuenta en [Vercel](https://vercel.com) (gratuita)
- Cuenta en [GitHub](https://github.com) (gratuita)
- Cuenta en [Resend](https://resend.com) (gratuita)
- Node.js 18+ instalado localmente

---

## 1. Configurar Resend (email del formulario)

1. Ve a [resend.com](https://resend.com) → Crear cuenta gratuita
2. En el dashboard → **API Keys** → Crear nueva key
3. Guarda la key (empieza con `re_`)
4. **Opcional pero recomendado:** Agrega y verifica tu dominio en Resend → Domains
   - Si no tienes dominio, el formulario funciona en modo de prueba enviando solo a tu propia cuenta

---

## 2. Crear repositorio en GitHub

```bash
# En la carpeta del proyecto
git init
git add .
git commit -m "feat: sitio web Dental Advance v1.0"

# Crear repo en GitHub (sin README para evitar conflictos)
git remote add origin https://github.com/TU-USUARIO/dental-advance.git
git branch -M main
git push -u origin main
```

---

## 3. Deploy en Vercel

### 3a. Importar el proyecto

1. Ve a [vercel.com](https://vercel.com) → **Add New Project**
2. Conecta tu cuenta de GitHub si no lo has hecho
3. Selecciona el repositorio `dental-advance`
4. Vercel detectará automáticamente que es un proyecto Astro

### 3b. Configurar variables de entorno

En el paso de configuración (o en Settings → Environment Variables):

| Variable | Valor |
|----------|-------|
| `RESEND_API_KEY` | Tu API key de Resend (`re_...`) |
| `CONTACT_EMAIL` | `dentaladvancegc@gmail.com` |
| `BUSINESS_NAME` | `Dental Advance` |
| `FROM_EMAIL` | `onboarding@resend.dev` (prueba) o `noreply@tudominio.com` (producción) |

### 3c. Deploy

1. Click **Deploy**
2. Vercel ejecuta `npm run build` → genera `dist/`
3. El sitio queda publicado en `https://dental-advance-xxx.vercel.app`

---

## 4. Conectar dominio personalizado (cuando lo tengan)

1. Comprar dominio (recomendado: [Namecheap](https://namecheap.com) o [GoDaddy](https://godaddy.com))
   - Sugerencia: `dentaladvancecuauhtemoc.com` o `dentaladvance.mx`
2. En Vercel → Project → **Settings** → **Domains** → Add domain
3. Vercel mostrará los DNS records a configurar (A record y CNAME)
4. Configurar los DNS en tu proveedor de dominio
5. SSL se activa automáticamente (Let's Encrypt)

### Actualizar la URL del sitio

Cuando tengas dominio, actualiza estas líneas en `astro.config.mjs`:
```js
site: 'https://tudominio.com',
```

Y en `src/layouts/Layout.astro`:
```ts
const siteUrl = 'https://tudominio.com';
```

---

## 5. Deploy automático (CD)

Vercel hace deploy automático en cada push a `main`:
```bash
# Actualizar el sitio
git add .
git commit -m "fix: actualizar horarios"
git push
# Vercel detecta el push y hace deploy automáticamente (~1 minuto)
```

---

## 6. Prueba del formulario

1. Abre el sitio en producción
2. Llena el formulario de contacto con tu propio email
3. Verifica que llegue el email a `dentaladvancegc@gmail.com`
4. Verifica que llegue el email de confirmación al email que ingresaste

### Si el formulario no funciona

- Verifica que `RESEND_API_KEY` esté configurada en Vercel → Settings → Environment Variables
- Revisa los logs en Vercel → Project → **Functions** → Ver logs de `/api/contact`
- Con el plan gratuito de Resend (sin dominio verificado), solo puedes enviar al email registrado en Resend

---

## 7. Actualizaciones de contenido

| Qué cambiar | Dónde |
|-------------|-------|
| Teléfono, email, dirección, horarios | `src/content/site.ts` |
| Servicios | `src/content/site.ts` → `services[]` |
| Textos del Hero | `src/components/Hero.astro` |
| Testimonios | `src/components/Testimonials.astro` |
| Preguntas frecuentes | `src/components/FAQ.astro` |
| Logo / imagen de portada | `public/images/` |
| Colores | `tailwind.config.mjs` → `colors.gold` |

---

## 8. Monitoreo

- **Uptime**: Vercel notifica automáticamente si el sitio cae
- **Analytics** (opcional): Conectar Google Analytics 4 → agregar `PUBLIC_GA_MEASUREMENT_ID` en Vercel
- **Errores del formulario**: Revisar Vercel → Project → Functions → Logs

---

## Contacto técnico

Para dudas sobre el sitio, contactar al desarrollador que construyó este proyecto.

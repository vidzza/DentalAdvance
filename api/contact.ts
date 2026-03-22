import { Resend } from 'resend';
import { z } from 'zod';

/** Schema de validación del formulario */
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'Nombre demasiado largo'),
  phone: z
    .string()
    .min(7, 'Teléfono inválido')
    .max(20, 'Teléfono demasiado largo'),
  email: z
    .string()
    .email('Email inválido')
    .optional()
    .or(z.literal('')),
  service: z.string().max(50).optional().default(''),
  message: z.string().max(1000, 'Mensaje demasiado largo').optional().default(''),
  /** Campo honeypot — debe estar vacío */
  _gotcha: z.string().max(0).optional().default(''),
});

/** Elimina etiquetas HTML de un string */
function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim();
}

/** Rate limiter simple en memoria (max 5 req/min por IP) */
const rateMap = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 60_000;
  const max = 5;
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < window);
  hits.push(now);
  rateMap.set(ip, hits);
  return hits.length > max;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  /* ── Rate limiting ─────────────────────────────────────── */
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
    req.socket?.remoteAddress ??
    'unknown';

  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ error: 'Demasiadas solicitudes. Intenta en un minuto.' });
  }

  /* ── Parse body ────────────────────────────────────────── */
  const body = req.body ?? {};

  /* ── Validación con Zod ────────────────────────────────── */
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: result.error.flatten(),
    });
  }

  /* ── Honeypot ──────────────────────────────────────────── */
  if (result.data._gotcha) {
    // Responde OK silenciosamente para no revelar la trampa
    return res.status(200).json({ ok: true });
  }

  const { name, phone, email, service, message } = result.data;

  /* ── Sanitización ──────────────────────────────────────── */
  const safeName = sanitize(name);
  const safePhone = sanitize(phone);
  const safeService = sanitize(service ?? '');
  const safeMessage = sanitize(message ?? '');

  /* ── Variables de entorno ──────────────────────────────── */
  const resendKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL ?? 'dentaladvancegc@gmail.com';
  const businessName = process.env.BUSINESS_NAME ?? 'Dental Advance';
  const fromEmail = process.env.FROM_EMAIL ?? 'onboarding@resend.dev';

  /* ── Sin RESEND_API_KEY: modo desarrollo ───────────────── */
  if (!resendKey) {
    console.log('[contact] Modo dev — no hay RESEND_API_KEY:', {
      safeName,
      safePhone,
      email,
      safeService,
      safeMessage,
    });
    return res.status(200).json({ ok: true });
  }

  /* ── Envío con Resend ──────────────────────────────────── */
  const resend = new Resend(resendKey);

  try {
    // 1. Email al negocio
    await resend.emails.send({
      from: `${businessName} Web <${fromEmail}>`,
      to: [contactEmail],
      replyTo: email ? email : undefined,
      subject: `Nueva consulta de ${safeName} — ${businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C8960C; border-bottom: 2px solid #C8960C; padding-bottom: 8px;">
            Nueva solicitud de contacto
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #737373; width: 140px;"><strong>Nombre</strong></td>
              <td style="padding: 8px 0;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #737373;"><strong>Teléfono</strong></td>
              <td style="padding: 8px 0;"><a href="tel:${safePhone}">${safePhone}</a></td>
            </tr>
            ${
              email
                ? `<tr>
                <td style="padding: 8px 0; color: #737373;"><strong>Email</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>`
                : ''
            }
            ${
              safeService
                ? `<tr>
                <td style="padding: 8px 0; color: #737373;"><strong>Servicio</strong></td>
                <td style="padding: 8px 0;">${safeService}</td>
              </tr>`
                : ''
            }
            ${
              safeMessage
                ? `<tr>
                <td style="padding: 8px 0; color: #737373; vertical-align: top;"><strong>Mensaje</strong></td>
                <td style="padding: 8px 0;">${safeMessage}</td>
              </tr>`
                : ''
            }
          </table>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #E8E8E8;" />
          <p style="color: #A3A3A3; font-size: 12px;">
            Enviado desde el formulario de contacto de ${businessName}
          </p>
        </div>
      `,
    });

    // 2. Confirmación al cliente (solo si proporcionó email)
    if (email) {
      await resend.emails.send({
        from: `${businessName} <${fromEmail}>`,
        to: [email],
        subject: `Recibimos tu mensaje — ${businessName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #C8960C;">¡Hola, ${safeName}!</h2>
            <p>Hemos recibido tu mensaje y te contactaremos a la brevedad posible.</p>
            <p>
              Si tienes alguna urgencia, puedes contactarnos directamente por
              <a href="https://wa.me/526251344627" style="color: #C8960C;">WhatsApp</a>
              o llamarnos al <a href="tel:+526251344627" style="color: #C8960C;">625 134 4627</a>.
            </p>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #E8E8E8;" />
            <p style="color: #A3A3A3; font-size: 12px;">
              ${businessName} — José de San Martin 1634, Col. Progreso, Cuauhtémoc, Chih.
            </p>
          </div>
        `,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    return res.status(500).json({ error: 'Error al enviar el mensaje. Intenta por WhatsApp.' });
  }
}

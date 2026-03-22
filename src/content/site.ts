/**
 * FUENTE ÚNICA DE VERDAD — Dental Advance
 *
 * Toda la información del negocio centralizada aquí.
 * Para actualizar datos de contacto, horarios, servicios o redes sociales,
 * modifica SOLO este archivo. Nunca hardcodees strings del negocio en componentes.
 */

export const site = {
  name: 'Dental Advance',
  tagline: 'Tu Sonrisa, Nuestra Especialidad',
  description:
    'Clínica dental de vanguardia en Cd. Cuauhtémoc, Chihuahua. Servicios de odontología general, ortodoncia, implantes dentales, estética dental y más.',
  shortDescription:
    'Clínica dental de vanguardia en Cd. Cuauhtémoc, Chihuahua. Ortodoncia, implantes, estética dental y más. Agenda tu cita hoy.',
  url: 'https://dentaladvance.com',

  contact: {
    /** Número sin código de país, formato local */
    phoneLocal: '625 134 4627',
    /** E.164 para href="tel:" */
    phoneE164: '+526251344627',
    /** Para wa.me links */
    whatsappNumber: '526251344627',
    email: 'dentaladvancegc@gmail.com',
    address: {
      street: 'José de San Martin 1634',
      colony: 'Col. Progreso',
      city: 'Cuauhtémoc',
      state: 'Chihuahua',
      stateCode: 'Chih.',
      zip: '31550',
      country: 'Mexico',
      countryCode: 'MX',
      full: 'José de San Martin 1634, Col. Progreso, 31550 Cuauhtémoc, Chih., Mexico',
      short: 'José de San Martin 1634, Col. Progreso, 31550 Cuauhtémoc, Chih.',
    },
    coordinates: {
      lat: 28.405,
      lng: -106.866,
    },
    /** Embed de Google Maps (no requiere API key) */
    mapsEmbedUrl:
      'https://maps.google.com/maps?q=Jos%C3%A9+de+San+Martin+1634,+Progreso,+31550+Cuauht%C3%A9moc,+Chih.,+Mexico&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapsDirectionsUrl:
      'https://maps.google.com/?q=José+de+San+Martin+1634,+Progreso,+31550+Cuauhtémoc,+Chih.',
  },

  hours: {
    weekdays: {
      label: 'Lunes — Viernes',
      morning: '9:00 – 14:00',
      afternoon: '16:00 – 19:00',
      combined: '9:00 – 14:00 / 16:00 – 19:00',
    },
    saturday: { label: 'Sábado', status: 'Cerrado' as const },
    sunday: { label: 'Domingo', status: 'Cerrado' as const },
    /** Texto compacto para Hero/Header */
    compact: 'Lun–Vie 9:00–19:00',
    /** Schema.org opening hours specification */
    schema: [
      {
        '@type': 'OpeningHoursSpecification' as const,
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '14:00',
      },
      {
        '@type': 'OpeningHoursSpecification' as const,
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '16:00',
        closes: '19:00',
      },
    ],
  },

  social: {
    facebook: 'https://www.facebook.com/people/Dental-Advance-gc/100089930651975/',
    instagram: 'https://www.instagram.com/dentaladvance/',
  },

  seo: {
    title: 'Dentista en Cuauhtémoc Chihuahua | Dental Advance — Clínica Dental de Vanguardia',
    keywords:
      'dentista Cuauhtémoc Chihuahua, clínica dental Cuauhtémoc, ortodoncia Cuauhtémoc, implantes dentales Cuauhtémoc, blanqueamiento dental, Dental Advance, dentista cerca de mi, mejor dentista Cuauhtémoc',
    ogImage: '/images/portada.jpg',
    locale: 'es_MX',
  },

  /** Mensajes pre-escritos para WhatsApp (URL-encoded) */
  wa: {
    default: 'Hola%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20sus%20servicios%20dentales',
    agendarCita:
      'Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita%20en%20Dental%20Advance',
    servicios:
      'Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20sus%20servicios',
    valoracion:
      'Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita%20de%20valoraci%C3%B3n%20en%20Dental%20Advance',
    pregunta: 'Hola%2C%20tengo%20una%20pregunta%20sobre%20sus%20servicios',
    informacion:
      'Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20sus%20servicios',
  },

  services: [
    {
      id: 'odontologia-general',
      title: 'Odontología General',
      description:
        'Consultas, limpiezas profesionales, resinas y diagnóstico integral. Cuidamos tu salud bucal con revisiones completas y tratamientos preventivos.',
      icon: 'tooth',
    },
    {
      id: 'ortodoncia',
      title: 'Ortodoncia',
      description:
        'Brackets metálicos, estéticos, de zafiro y alineadores invisibles. Corregimos tu sonrisa con las técnicas más avanzadas.',
      icon: 'braces',
    },
    {
      id: 'implantes-dentales',
      title: 'Implantes Dentales',
      description:
        'Reemplazamos piezas perdidas con implantes de titanio de alta calidad. Recupera la función y estética de tu sonrisa.',
      icon: 'implant',
    },
    {
      id: 'estetica-dental',
      title: 'Estética Dental',
      description:
        'Blanqueamiento, carillas de porcelana y diseño de sonrisa. Transforma tu imagen con tratamientos cosméticos de última generación.',
      icon: 'sparkle',
    },
    {
      id: 'endodoncia',
      title: 'Endodoncia',
      description:
        'Tratamientos de conductos con tecnología especializada. Salvamos tus dientes naturales eliminando infecciones de raíz.',
      icon: 'root',
    },
    {
      id: 'odontopediatria',
      title: 'Odontopediatría',
      description:
        'Atención dental especial para los más pequeños en un ambiente amigable y de confianza. Cuidamos sus sonrisas desde el inicio.',
      icon: 'child',
    },
    {
      id: 'cirugia-oral',
      title: 'Cirugía Oral',
      description:
        'Extracciones, muelas del juicio y procedimientos quirúrgicos con técnicas mínimamente invasivas para tu comodidad.',
      icon: 'surgery',
    },
    {
      id: 'periodoncia',
      title: 'Periodoncia',
      description:
        'Tratamiento de encías, limpiezas profundas y cirugía periodontal. Mantenemos la base de tu sonrisa sana y fuerte.',
      icon: 'shield',
    },
  ],

  /** Opciones del select de servicios en el formulario */
  serviceOptions: [
    { value: 'consulta-general', label: 'Consulta General' },
    { value: 'limpieza', label: 'Limpieza Dental' },
    { value: 'ortodoncia', label: 'Ortodoncia' },
    { value: 'implantes', label: 'Implantes Dentales' },
    { value: 'estetica', label: 'Estética Dental' },
    { value: 'endodoncia', label: 'Endodoncia' },
    { value: 'cirugia', label: 'Cirugía Oral' },
    { value: 'odontopediatria', label: 'Odontopediatría' },
    { value: 'urgencia', label: 'Urgencia Dental' },
    { value: 'otro', label: 'Otro' },
  ],
} as const;

export type Site = typeof site;

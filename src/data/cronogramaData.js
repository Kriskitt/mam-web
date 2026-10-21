export const CRONOGRAMA_DAYS = [
  { id: '2025-10-02', label: 'Miércoles, 02 Octubre', shortDate: 'Miércoles 02\nOctubre' },
  { id: '2025-10-03', label: 'Jueves, 03 Octubre', shortDate: 'Jueves 03\nOctubre' },
  { id: '2025-10-04', label: 'Viernes, 04 Octubre', shortDate: 'Viernes 04\nOctubre' },
];

export const CRONOGRAMA_EVENTS = [
  {
    id: 'manifesto-para-la-ciudad',
    slug: 'manifesto-para-la-ciudad',
    dayId: '2025-10-02',
    time: '11:00 a.m.',
    category: 'EDUCACIÓN',
    categoryTag: '11:00 a.m. - EDUCACIÓN',
    title: 'Manifesto para la ciudad. Presentación del Taller Gerardo Chávez',
    room: 'Taller de Arte / Sala Monumental',
    image: '/assets/cronograma_image_25.png',
    dateLabel: '02 de Octubre',
    scheduleTime: '11:00 ↗ 12:30 hrs',
    registrationEmail: 'info@mamtrujillo.pe',
    registrationPhone: '(+51) 949 736 458',
    curatorialText: [
      'Un encuentro pedagógico y ciudadano organizado en colaboración con el Taller Gerardo Chávez, centrado en el rol del arte como herramienta de transformación y descentralización cultural en el norte del Perú.',
      'Los participantes explorarán el archivo vivo del maestro, dialogando sobre los procesos de creación matérica y las metodologías educativas que han nutrido las colecciones del MAM a lo largo de más de cuatro décadas.',
      'La sesión culminará con una presentación abierta y una lectura colectiva en el patio de esculturas, invitando a la comunidad estudiantil y general a sumarse a los programas formativos del museo.'
    ]
  },
  {
    id: 'visitas-guiadas-mediaciones',
    slug: 'visitas-guiadas-mediaciones',
    dayId: '2025-10-02',
    time: '04:10 p.m.',
    category: 'EDUCACIÓN',
    categoryTag: '04:10 p.m. - EDUCACIÓN',
    title: 'Visitas guiadas: Mediaciones en el desierto, por Daniel Rodríguez. Un recorrido por la Sala Temporal.',
    room: 'Sala Temporal',
    image: '/assets/cronograma_image_24.png',
    dateLabel: '02 de Octubre',
    scheduleTime: '16:10 ↗ 17:30 hrs',
    registrationEmail: 'info@mamtrujillo.pe',
    registrationPhone: '(+51) 949 736 458',
    curatorialText: [
      'Recorrido mediado por el curador Daniel Rodríguez a través de las obras que componen la muestra de la Sala Temporal, analizando las tensiones entre paisaje árido, cosmogonías costeñas y abstracción moderna.',
      'A través de preguntas orientadoras y diálogo participativo, el público recorrerá piezas clave que resignifican el imaginario desértico y su vigencia en la plástica contemporánea del país.',
      'Capacidad limitada para garantizar una experiencia cercana e inmersiva. Se recomienda confirmar asistencia con anticipación.'
    ]
  },
  {
    id: 'inauguracion-dioses-bravos',
    slug: 'inauguracion-dioses-bravos',
    dayId: '2025-10-02',
    time: '05:00 p.m.',
    category: 'EXHIBICIONES',
    categoryTag: '05:00 p.m. - EXHIBICIONES',
    title: 'Inauguración: Dioses Bravos, por Miguel Garutti. Sala de Proyectos',
    room: 'Sala de Proyectos',
    image: '/assets/cronograma_img.png',
    dateLabel: '02 de Octubre',
    scheduleTime: '17:00 ↗ 19:30 hrs',
    registrationEmail: 'info@mamtrujillo.pe',
    registrationPhone: '(+51) 949 736 458',
    curatorialText: [
      'Apertura oficial de la exhibición temporal "Dioses Bravos", curada por Miguel Garutti en el espacio experimental de la Sala de Proyectos.',
      'La propuesta reúne piezas escultóricas e intervenciones gráficas que interpelan la iconografía de deidades precolombinas norteñas desde una estética contemporánea de choque y ritualidad.',
      'Brindis de honor con la presencia del equipo curatorial y artistas invitados. Ingreso libre con aforo controlado.'
    ]
  },
  {
    id: 'conferencia-iconografia-moche',
    slug: 'conferencia-iconografia-moche',
    dayId: '2025-10-03',
    time: '11:00 a.m.',
    category: 'EDUCACIÓN',
    categoryTag: '11:00 a.m. - EDUCACIÓN',
    title: 'Mesa redonda: Simbología Moche y continuidad estilística en el arte trujillano',
    room: 'Pabellón Precolombino',
    image: '/assets/precolombino_huaco_1.png',
    dateLabel: '03 de Octubre',
    scheduleTime: '11:00 ↗ 13:00 hrs',
    registrationEmail: 'info@mamtrujillo.pe',
    registrationPhone: '(+51) 949 736 458',
    curatorialText: [
      'Investigadores y arqueólogos dialogan sobre las 28 piezas maestras del Pabellón Precolombino, su conservación y su influencia directa en la vanguardia pictórica del siglo XX.'
    ]
  },
  {
    id: 'dialogo-sala-angel-chavez',
    slug: 'dialogo-sala-angel-chavez',
    dayId: '2025-10-03',
    time: '04:30 p.m.',
    category: 'EXHIBICIONES',
    categoryTag: '04:30 p.m. - EXHIBICIONES',
    title: 'Conversatorio curatorial: El legado de Ángel Chávez y la Escuela de Trujillo',
    room: 'Sala Ángel Chávez',
    image: '/assets/angel-chavez.png',
    dateLabel: '03 de Octubre',
    scheduleTime: '16:30 ↗ 18:00 hrs',
    registrationEmail: 'info@mamtrujillo.pe',
    registrationPhone: '(+51) 949 736 458',
    curatorialText: [
      'Una revisión retrospectiva del trazo expresionista y el cromatismo vibrante de Ángel Chávez a través de sus lienzos conservados en la sala permanente del MAM.'
    ]
  }
];

export function getEventBySlug(slug) {
  return CRONOGRAMA_EVENTS.find(e => e.slug === slug);
}

export function getRelatedEvents(currentSlug) {
  return CRONOGRAMA_EVENTS.filter(e => e.slug !== currentSlug).slice(0, 3);
}

export function getEventsByDay(dayId) {
  return CRONOGRAMA_EVENTS.filter(e => e.dayId === dayId);
}

/**
 * MAM TRUX — Dataset Oficial de Salas y Exhibiciones (Rediseño v2)
 * Grounded 1:1 en Figma MAM TRUX (Canvas MAM - Desktop #0:1, Nodos #4262:609 y #4203:239).
 */

export const ROOMS_V2_DATA = {
  monumental: {
    id: 'monumental',
    slug: 'monumental',
    name: 'SALA MONUMENTAL',
    themeColor: '#D4B87C',
    exhibitionTitle: 'Poéticas del barro: Obra monumental de Gerardo Chávez',
    category: 'Colección Permanente',
    dates: 'Colección permanente',
    artist: 'Gerardo Chávez (1937–2025)',
    curator: 'Fundación Gerardo Chávez',
    location: 'Ala Norte — Planta Principal',
    worksCount: '28 obras monumentales',
    coverImage: '/assets/v2/exhibicion_6.png',
    curatorialIntro: 'La obra monumental de Gerardo Chávez representa la culminación de su búsqueda estética y la consagración de su genio creativo. Aunque trabajó el gran formato desde antes, fue a fines de los años 80 en Lima cuando incorporó por primera vez tierra natural como recurso material y cromático en El otro Ekeko (1990). Con esta innovación estableció un puente entre historia e identidad cultural, articulando una visión crítica y sensorial del modernismo y de la pintura latinoamericana. En ese contexto nace su obra maestra, La Procesión de la papa (1995), ícono del arte peruano y actualmente en proceso de reconocimiento como Patrimonio Cultural de la Nación.',
    curatorialParagraphs: [
      'Espacio de gran escala que alberga lienzos de dimensiones extraordinarias, esculturas de metal y materia orgánica que consagran el universo surrealista de Gerardo Chávez. La sala articula un recorrido que permite apreciar la transformación matérica de su pintura, desde los primeros empastes de arcilla hasta la monumentalidad escultórica de los bronces.',
      'Gerardo Chávez (Trujillo, 1937–2025), maestro indiscutible de la pintura peruana y latinoamericana, consolidó a lo largo de seis décadas una poética que entrelaza la memoria mítica del desierto norteño con la libertad formal de las vanguardias europeas.'
    ],
    artworks: [
      {
        title: 'La Procesión de la papa',
        medium: 'Óleo y tierra sobre lienzo monumental',
        dimensions: '300 × 500 cm',
        year: '1995',
        image: '/assets/v2/exhibicion_1.png',
      },
      {
        title: 'El otro Ekeko',
        medium: 'Tierra natural, pigmentos y mixta sobre lienzo',
        dimensions: '210 × 180 cm',
        year: '1990',
        image: '/assets/diablo_con_gerardo.png',
      },
      {
        title: 'Mitos de la tierra',
        medium: 'Óleo sobre yute y pigmentos minerales',
        dimensions: '240 × 320 cm',
        year: '1993',
        image: '/assets/card-monumental.png',
      },
      {
        title: 'Caballos de paso y quimeras',
        medium: 'Escultura en bronce fundido y ensamblaje',
        dimensions: '185 × 140 × 90 cm',
        year: '1998',
        image: '/assets/v2/exhibicion_4.png',
      },
      {
        title: 'El festín de los sueños',
        medium: 'Óleo sobre lienzo',
        dimensions: '200 × 280 cm',
        year: '2001',
        image: '/assets/v2/home_hero_slide.png',
      },
    ],
  },

  precolombino: {
    id: 'precolombino',
    slug: 'precolombino',
    name: 'PABELLÓN PRECOLOMBINO',
    themeColor: '#3D2716',
    exhibitionTitle: 'Eternidad en Terracota y Oro',
    category: 'Patrimonio Milenario',
    dates: 'Colección permanente',
    artist: 'Culturas del Antiguo Perú',
    curator: 'Curaduría Arqueológica MAM',
    location: 'Espiral Central — Recorrido Inmersivo',
    worksCount: 'Más de 5,000 piezas arqueológicas',
    coverImage: '/assets/v2/exhibicion_2.png',
    curatorialIntro: 'Esta colección posee más de 5000 piezas moche, chimú y otras culturas del Perú antiguo. El recorrido en espiral del museo ofrece una experiencia inmersiva a través de expresiones creativas y ceremoniales del antiguo Perú, reuniendo objetos cerámicos, textiles y orfebrería de doce civilizaciones del norte y centro andino.',
    curatorialParagraphs: [
      'El pabellón reúne piezas maestras de las culturas Moche, Chimú, Cupisnique, Salinar, Vicús, Recuay, Nazca, Paracas, Cajamarca, Chachapoyas, Chavín, Tiahuanaco, Huari y Chancay, permitiendo comprender la sofisticación tecnológica y ceremonial de nuestros ancestros.',
      'Un legado vivo que custodia el vínculo irrenunciable entre el pasado prehispánico y la memoria identitaria de la región La Libertad.'
    ],
    artworks: [
      {
        title: 'Huaco Retrato Mochica',
        medium: 'Cerámica escultórica con engobe bícromo',
        dimensions: '28 × 20 cm',
        year: 'Siglos II–VII d.C.',
        image: '/assets/v2/exhibicion_2.png',
      },
      {
        title: 'Cántaro Escultórico Chimú',
        medium: 'Cerámica negra azabache cocida en atmósfera reductora',
        dimensions: '24 × 18 cm',
        year: 'Siglos XII–XV d.C.',
        image: '/assets/precolombino_huaco_1.png',
      },
      {
        title: 'Botella Asa Estribo Cupisnique',
        medium: 'Cerámica escultórica incisa pulida',
        dimensions: '22 × 16 cm',
        year: '1200–500 a.C.',
        image: '/assets/v2/home_hero_slide.png',
      },
    ],
  },

  'angel-chavez': {
    id: 'angel-chavez',
    slug: 'angel-chavez',
    name: 'SALA ÁNGEL CHÁVEZ',
    themeColor: '#D9A07E',
    exhibitionTitle: 'La fuerza telúrica del norte',
    category: 'Pintura & Dibujo',
    dates: 'Del 16 de Noviembre 2025 al 28 de Febrero 2026',
    artist: 'Ángel Chávez (1928–1995)',
    curator: 'Fundación Gerardo Chávez',
    location: 'Ala Sur — Primer Nivel',
    worksCount: '32 pinturas al óleo y bocetos',
    coverImage: '/assets/v2/exhibicion_4.png',
    curatorialIntro: 'Esta sala está dedicada a Ángel Chávez (1928–1995), pintor trujillano cuya obra exploró con maestría la identidad regional y las tensiones míticas de la costa norte peruana mediante contrastes figurativos e intensidad cromática.',
    curatorialParagraphs: [
      'Representó la vida y tradiciones de Trujillo en el siglo XX, transitando de la figuración a la abstracción con un trazo enérgico y una paleta marcada por rojos y marrones que evocan paisajes costeros y rurales.',
      'Su producción artística plasma con vigor las jornadas de pesca en Huanchaco, los ritos campesinos y la presencia telúrica de las huacas milenarias.'
    ],
    artworks: [
      {
        title: 'Pescadores de Huanchaco',
        medium: 'Óleo sobre lienzo',
        dimensions: '150 × 200 cm',
        year: '1968',
        image: '/assets/v2/exhibicion_3.png',
      },
      {
        title: 'Maternidad norteña',
        medium: 'Óleo y temple sobre tabla',
        dimensions: '120 × 90 cm',
        year: '1974',
        image: '/assets/angel-chavez.png',
      },
      {
        title: 'Caballitos de totora al atardecer',
        medium: 'Óleo sobre lienzo',
        dimensions: '140 × 180 cm',
        year: '1981',
        image: '/assets/angel_slide_img.png',
      },
      {
        title: 'Tierra brava',
        medium: 'Boceto preliminar al pastel y grafito',
        dimensions: '85 × 110 cm',
        year: '1970',
        image: '/assets/angel_image_2.png',
      },
    ],
  },

  temporal: {
    id: 'temporal',
    slug: 'temporal',
    name: 'SALA TEMPORAL',
    themeColor: '#C5B49D',
    exhibitionTitle: 'Paijáàäâãåąæāªn',
    category: 'Arte Contemporáneo',
    dates: 'Del 16 de Noviembre 2025 al 28 de Febrero 2026',
    artist: 'Plataforma Paiján & Artistas en Residencia',
    curator: 'Curaduría Independiente Paiján',
    location: 'Pabellón Poniente — Nivel 2',
    worksCount: '14 instalaciones y derivas',
    coverImage: '/assets/v2/exhibicion_3.png',
    curatorialIntro: 'La sala de exhibiciones temporales del Museo de Arte Moderno es un espacio dedicado a acoger exposiciones monográficas y colectivas que amplían los discursos del arte contemporáneo. Su propósito es narrar, interrogar y producir conocimiento a través de la diversidad de lenguajes y generaciones.',
    curatorialParagraphs: [
      'La plataforma de investigación artística Paijáàäâãåąæāªn desarrolla proyectos expositivos de contexto específico, construyendo puentes que otros llaman arte. Su método es simple: invitar a un artista a emprender una deriva hacia un paisaje cultural particular. En una casona republicana de la calle Independencia 705 se dan lugar investigaciones, happenings, teorías relacionales, mitos y conjuros.',
      'Las obras reunidas exploran tensiones entre pasado y presente, misticismo y política, lo ancestral y lo contemporáneo. Desde el desierto se reactivan narrativas ocultas y se expanden los límites entre lo mágico y lo real.'
    ],
    artworks: [
      {
        title: 'Deriva Paiján I: Huaca Prieta',
        medium: 'Registro fotográfico e instalación',
        dimensions: 'Dimensiones variables',
        year: '2025',
        image: '/assets/v2/exhibicion_4.png',
      },
      {
        title: 'Mitos y conjuros del desierto',
        medium: 'Cerámica de alta temperatura, sonido y salmuera',
        dimensions: 'Instalación espacial',
        year: '2025',
        image: '/assets/temporal_image_center.png',
      },
      {
        title: 'Happenings en Independencia 705',
        medium: 'Archivo documental y textil teñido con añil',
        dimensions: '180 × 240 cm',
        year: '2025',
        image: '/assets/temporal_image_3.png',
      },
      {
        title: 'Cartografía del curandero',
        medium: 'Dibujo sobre papel de corteza y pigmentos',
        dimensions: '90 × 130 cm',
        year: '2024',
        image: '/assets/temporal_image_4.png',
      },
    ],
  },

  coleccion: {
    id: 'coleccion',
    slug: 'coleccion',
    name: 'SALA COLECCIÓN',
    themeColor: '#B8D8C4',
    exhibitionTitle: 'Imaginarios convividos',
    category: 'Maestros Latinoamericanos',
    dates: 'Colección permanente',
    artist: '38 Maestros del Arte Latinoamericano (Szyszlo, Tilsa, Matta, Lam)',
    curator: 'Fundación Gerardo Chávez',
    location: 'Ala Este — Planta Principal',
    worksCount: '45 piezas seleccionadas',
    coverImage: '/assets/v2/exhibicion_5.png',
    curatorialIntro: 'Esta sala presenta una revisión temporal de obras y objetos que conforman el imaginario creativo de Gerardo Chávez. La selección funciona como un testamento íntimo de sus afectos y de su trayectoria, revelando las búsquedas estéticas que marcaron su obra.',
    curatorialParagraphs: [
      'El conjunto, integrado por piezas de arte y objetos de distintas tradiciones culturales, influyó en su universo pictórico y dialogó con el modernismo del siglo XX y con las corrientes surrealistas que enriquecieron su lenguaje visual.',
      'Reúne obras icónicas de Fernando de Szyszlo, Tilsa Tsuchiya, Roberto Matta, Wifredo Lam, José Sabogal, Rufino Tamayo y Marina Núñez del Prado.'
    ],
    artworks: [
      {
        title: 'Fernando de Szyszlo — Mar de Lurín',
        medium: 'Óleo y técnica mixta sobre madera',
        dimensions: '150 × 150 cm',
        year: '1989',
        image: '/assets/v2/exhibicion_5.png',
      },
      {
        title: 'Tilsa Tsuchiya — Mito del guerrero',
        medium: 'Óleo sobre lienzo',
        dimensions: '100 × 80 cm',
        year: '1976',
        image: '/assets/coleccion_img_1.png',
      },
      {
        title: 'Roberto Matta — Morfología cósmica',
        medium: 'Litografía intervenida',
        dimensions: '75 × 105 cm',
        year: '1965',
        image: '/assets/coleccion_img_2.png',
      },
      {
        title: 'Wifredo Lam — La jungla de las sombras',
        medium: 'Grabado al aguafuerte',
        dimensions: '80 × 60 cm',
        year: '1971',
        image: '/assets/coleccion_img_3.png',
      },
    ],
  },

  proyectos: {
    id: 'proyectos',
    slug: 'proyectos',
    name: 'SALA DE PROYECTOS',
    themeColor: '#8E9FA4',
    exhibitionTitle: 'Dioses Bravos',
    category: 'Laboratorio Experimental',
    dates: 'Temporada 2025–2026',
    artist: 'Laboratorio Experimental MAM & Residencia Paiján',
    curator: 'MAM Laboratorio Contemporáneo',
    location: 'Espacio Bóveda — Planta Sótano',
    worksCount: 'Instalación cinética & site-specific',
    coverImage: '/assets/v2/exhibicion_2.png',
    curatorialIntro: 'La sala de proyectos del Museo de Arte Moderno de Trujillo entiende la modernidad como un proceso en transformación, donde el arte experimental reinterpreta el pasado y lo proyecta hacia el futuro. La experimentación es formal, conceptual y política, convirtiendo al museo en un espacio crítico de creación.',
    curatorialParagraphs: [
      'Un ensamble automatizado de piezas inspiradas en el universo Moche (siglos II–VII d.C.) articula sonido, imagen y materia, desplegando un paisaje inmersivo que dialoga con la memoria ancestral y las posibilidades tecnológicas contemporáneas.',
      'Una pirámide que tiembla, un dintel cerámico atravesado por atmósferas digitales y paneles lumínicos reactivos que combinan tecnología, sonido, materia y gesto ritual en un entorno que vibra entre lo ancestral y lo contemporáneo.'
    ],
    artworks: [
      {
        title: 'Pirámide que tiembla',
        medium: 'Dispositivo cinético de resonancia acústica',
        dimensions: '220 × 220 × 160 cm',
        year: '2024',
        image: '/assets/v2/exhibicion_6.png',
      },
      {
        title: 'Dintel de obsidiana digital',
        medium: 'Proyección volumétrica sobre cerámica modelada',
        dimensions: '140 × 80 cm',
        year: '2025',
        image: '/assets/proyectos_image_5.png',
      },
      {
        title: 'Serpientes del tiempo mítico',
        medium: 'Ensamble mecánico articulado en cobre y sensores',
        dimensions: 'Longitud 350 cm',
        year: '2025',
        image: '/assets/proyectos_image_6.png',
      },
      {
        title: 'Paisaje ritual inmersivo',
        medium: 'Escultura lumínica reactiva a la presencia',
        dimensions: 'Instalación inmersiva',
        year: '2025',
        image: '/assets/dioses-bravos.png',
      },
    ],
  },

  centro: {
    id: 'centro',
    slug: 'centro',
    name: 'SALA CENTRO',
    themeColor: '#C8A97E',
    exhibitionTitle: 'TRUX LOVE',
    category: 'Muestra contemporánea',
    dates: 'Temporada 2025–2026',
    artist: 'Artistas Emergentes de Trujillo',
    curator: 'Curaduría Joven MAM',
    location: 'Patio Central — Ala Poniente',
    worksCount: '18 piezas contemporáneas',
    coverImage: '/assets/v2/exhibicion_1.png',
    curatorialIntro: 'Espacio dedicado a las nuevas voces de la escena visual contemporánea trujillana y del norte peruano, articulando diálogos directos entre la vanguardia urbana, la gráfica callejera y las tradiciones pictóricas del valle de Moche.',
    curatorialParagraphs: [
      'TRUX LOVE reúne instalaciones, fotografía y pintura en gran formato creadas en residencias artísticas locales, celebrando la vibrante identidad contemporánea de la ciudad.',
      'Un puente dinámico entre las colecciones permanentes del museo y las nuevas generaciones de creadores.'
    ],
    artworks: [
      {
        title: 'TRUX LOVE I',
        medium: 'Técnica mixta y serigrafía sobre muro',
        dimensions: '240 × 360 cm',
        year: '2025',
        image: '/assets/v2/exhibicion_1.png',
      },
    ],
  },
};

export const ROOMS_LIST_V2 = [
  ROOMS_V2_DATA.monumental,
  ROOMS_V2_DATA.coleccion,
  ROOMS_V2_DATA['angel-chavez'],
  ROOMS_V2_DATA.temporal,
  ROOMS_V2_DATA.proyectos,
  ROOMS_V2_DATA.centro,
];

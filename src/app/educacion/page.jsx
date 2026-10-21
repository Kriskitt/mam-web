import React from 'react';
import HeaderV2 from '../../components/v2/HeaderV2';
import FooterV2 from '../../components/v2/FooterV2';
import AmigosBadge from '../../components/v2/AmigosBadge';
import EditorialSplitLayout from '../../components/v2/editorial/EditorialSplitLayout';

export const metadata = {
  title: 'Educación & Mediación Cultural | MAM Trujillo',
  description: 'Programas pedagógicos, mediación escolar, talleres de arcilla y formación artística en el Museo de Arte Moderno y Precolombino de Trujillo.',
};

const EDUCACION_MEDIA = [
  {
    src: '/assets/educacion_1.png',
    alt: 'Estudiantes en visita mediada en el MAM',
  },
  {
    src: '/assets/educacion_2.png',
    alt: 'Taller de modelado en barro y cerámica',
  },
  {
    src: '/assets/v2/nosotros_gallery_gerardo.png',
    alt: 'Docentes y mediadores en seminario de arte',
  },
  {
    src: '/assets/educacion_1.png',
    alt: 'Programas comunitarios en el Valle de Moche',
  },
];

const EDUCACION_SECTIONS = [
  {
    title: 'Exposición de arte colectivo a cargo de los alumnos de primaria',
    subtitle: 'Colegio San José Obrero Marianistas',
    date: 'Octubre, 2025',
    paragraphs: [
      'El departamento de educación del MAM concibe el museo no como un archivo silencioso, sino como un territorio de mediación sensible, diálogo intergeneracional y experimentación creativa con las comunidades de Trujillo y el valle de Moche.',
      'Mediación Escolar & Visitas Dialógicas: Recorridos diseñados especialmente para colegios y universidades donde las piezas de arte monumental y las huacas prehispánicas detonan preguntas vivas sobre identidad, territorio y estética.',
    ],
  },
  {
    title: 'Exposición de arte colectivo a cargo de los alumnos de primaria',
    subtitle: 'Colegio San José Obrero Marianistas',
    date: 'Octubre, 2025',
    paragraphs: [
      'Talleres de modelado, arcilla y técnicas ancestrales moche donde niñas y niños experimentan con la memoria viva de la materia y el barro tradicional.',
      'Encuentros de diálogo crítico y creación compartida que conectan las colecciones milenarias del museo con los procesos pedagógicos de las aulas.',
    ],
  },
  {
    title: 'Exposición de arte colectivo a cargo de los alumnos de primaria',
    subtitle: 'Colegio San José Obrero Marianistas',
    date: 'Octubre, 2025',
    paragraphs: [
      'Seminarios de formación docente y mediación cultural para profesores de la región La Libertad, profundizando en el arte moderno peruano y el pensamiento de Gerardo Chávez.',
      'Metodologías activas de apreciación estética que transforman la visita al museo en una experiencia transformadora e investigativa.',
    ],
  },
  {
    title: 'Exposición de arte colectivo a cargo de los alumnos de primaria',
    subtitle: 'Colegio San José Obrero Marianistas',
    date: 'Octubre, 2025',
    paragraphs: [
      'Proyectos de vinculación comunitaria en el Valle de Moche y Huanchaco, extendiendo el alcance pedagógico del MAM hacia los espacios barriales y centros educativos.',
      'Muestras colectivas de cierre donde la comunidad escolar expone sus propias creaciones dentro de los espacios arquitectónicos del museo.',
    ],
  },
];

/**
 * EducacionPage — Vista de Educación V2 (Figma #4248:423 & #4259:550)
 * Dual scroll: mouse sobre imágenes hace scroll de imágenes; mouse sobre texto hace scroll de texto.
 * Footer oficial a ancho completo al final de la página.
 */
export default function EducacionPage() {
  return (
    <div style={{ backgroundColor: '#F9F6F3', minHeight: '100vh' }}>
      <HeaderV2 isDark={false} activePage="educacion" />
      <main id="main-content">
        <EditorialSplitLayout
          sections={EDUCACION_SECTIONS}
          mediaItems={EDUCACION_MEDIA}
        />
      </main>
      <AmigosBadge />
      <FooterV2 />
    </div>
  );
}

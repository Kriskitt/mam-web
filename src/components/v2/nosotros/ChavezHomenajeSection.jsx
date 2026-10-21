import React from 'react';
import HorizontalGallery from '../salas/HorizontalGallery';
import styles from './ChavezHomenajeSection.module.css';

const NOSOTROS_GALLERY_PHOTOS = [
  {
    src: '/assets/v2/nosotros_gallery_gerardo.png',
    alt: 'Gerardo Chávez en su taller de fundición',
  },
  {
    src: '/assets/v2/nosotros_gallery_center.png',
    alt: 'Escultura y patio en el MAM',
  },
  {
    src: '/assets/nosotros_hero.png',
    alt: 'Museo de Arte Moderno y Precolombino',
  },
];

/**
 * ChavezHomenajeSection — Vista Nosotros y Fundación Gerardo Chávez V2
 * Fiel 1:1 a los nodos oficiales de Figma MAM TRUX:
 * - Frame Nosotros: #4248:282 (1920x2140px, fondo #F9F6F3)
 * - Galería tríptico continua: #4248:324 (2810x800px, 3 fotos de 930x800px con border-radius 6px)
 * - Cita célebre de Gerardo Chávez: #4262:720 (Anko 45px / 50px, #452B10)
 * - Autoría: #4262:722 ("Gerardo Chávez (1937-2025).")
 * - Bloque Fundación: #4271:806 (Logo centrado 278.8x191px + Texto Monument Grotesk 26px en 2 párrafos)
 * 
 * Regla Estricta: CERO texto inventado, CERO cards, CERO mejoras visuales no presentes en Figma.
 */
export default function ChavezHomenajeSection() {
  return (
    <section className={styles.section} aria-label="Nosotros — Fundación Gerardo Chávez">
      {/* 1. Galería Monumental Continua (#4248:324) */}
      <HorizontalGallery
        photos={NOSOTROS_GALLERY_PHOTOS}
        roomName="Nosotros y Fundación Gerardo Chávez"
      />

      {/* Contenedor central con margen 20px (1880px en canvas 1920px) */}
      <div className={styles.contentContainer}>
        {/* 2. Cita Célebre de Gerardo Chávez (#4262:720) */}
        <blockquote className={styles.quoteText}>
          “Lo que busco con este museo es descentralizar la cultura, integrarla a otras
          ciudades del país; darle un nuevo empuje cultural al norte. Pienso que la cultura,
          por ende, la educación, es lo que nos sacará adelante como país.”
        </blockquote>

        {/* 3. Atribución / Autoría (#4262:722) */}
        <p className={styles.authorText}>
          Gerardo Chávez (1937-2025).
        </p>

        {/* 4. Bloque Fundación Gerardo Chávez (#4271:806) */}
        <div className={styles.fundacionBlock}>
          {/* Logo Fundación Centrado (#4271:839) */}
          <div className={styles.fundacionLogoWrapper}>
            <img
              src="/assets/fundacion-logo-dark.svg"
              alt="Fundación Gerardo Chávez"
              className={styles.fundacionLogoImg}
            />
          </div>

          {/* Texto Institucional en Monument Grotesk 26px (#4271:838) */}
          <div className={styles.fundacionText}>
            <p className={styles.fundacionParagraph}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit taciti sed habitasse
              vulputate duis lobortis torquent dapibus, eros vehicula consequat etiam curae
              tellus quis rutrum et feugiat semper fusce urna lacus. Primis suspendisse
              fusce natoque venenatis ullamcorper sed eget molestie eu, congue torquent
              massa morbi quam aliquam viverra penatibus, sociis risus platea montes
              sociosqu cras pellentesque lacus. Dictum tellus risus natoque iaculis
              pellentesque justo nunc, torquent dui congue sapien gravida a laoreet integer,
              morbi dis eu fames vel sociis.
            </p>
            <p className={styles.fundacionParagraph}>
              Fames magna eu justo feugiat tellus non scelerisque himenaeos, sem ac parturient
              donec facilisis habitasse posuere sociis, duis per nam laoreet rhoncus
              sollicitudin phasellus. Vel fermentum luctus platea pharetra integer donec
              sodales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

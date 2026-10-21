import React from 'react';
import Link from 'next/link';
import styles from './ExhibicionesSection.module.css';
import { publicAsset } from '../../../lib/sitePaths.mjs';

/**
 * Las 6 Salas Curatoriaes Reales de Figma (#4022:155, 1920x1457px)
 */
const EXHIBITIONS_CARDS = [
  {
    id: 'monumental',
    slug: 'monumental',
    salaTitle: 'SALA MONUMENTAL',
    workTitle: 'Poéticas del Barro: Obra monumental de Gerardo Chávez',
    meta: 'Colección permanente',
    image: '/assets/v2/exhibicion_6.png',
    themeColor: '#D6C080',
  },
  {
    id: 'coleccion',
    slug: 'coleccion',
    salaTitle: 'SALA COLECCIÓN',
    workTitle: 'IMAGINARIOS CONVIVIDOS',
    meta: 'Colección permanente',
    image: '/assets/v2/exhibicion_5.png',
    themeColor: '#B9DEBF',
  },
  {
    id: 'angel-chavez',
    slug: 'angel-chavez',
    salaTitle: 'SALA ÁNGEL CHÁVEZ',
    workTitle: 'los petreos',
    meta: 'Retrospectiva',
    image: '/assets/v2/exhibicion_4.png',
    themeColor: '#BFC4BF',
  },
  {
    id: 'temporal',
    slug: 'temporal',
    salaTitle: 'SALA TEMPORAL',
    workTitle: 'Paijaaaaan',
    meta: '16 Marzo - 29 Julio 2026',
    image: '/assets/v2/exhibicion_3.png',
    themeColor: '#B3A3CC',
  },
  {
    id: 'proyectos',
    slug: 'proyectos',
    salaTitle: 'SALA DE PROYECTOS',
    workTitle: 'siempre ganará el peor',
    meta: 'Instalación',
    image: '/assets/v2/exhibicion_2.png',
    themeColor: '#E5B09E',
  },
  {
    id: 'centro',
    slug: 'centro',
    salaTitle: 'SALA CENTRO',
    workTitle: 'TRUX LOVE',
    meta: 'Muestra contemporánea',
    image: '/assets/v2/exhibicion_1.png',
    themeColor: '#CECDBA',
  },
];

/**
 * ExhibicionesSection — Las 6 Salas en Grilla 3x2 Fiel 1:1 a Figma MAM TRUX
 * Satisface el nodo de Figma #4022:155 (1920x1457px).
 */
export default function ExhibicionesSection() {
  return (
    <section className={styles.section} aria-label="Circuito de Exhibiciones">
      <div className={styles.inner}>
        {/* Encabezado de Sección (#4022:187 y #4223:392) */}
        <div className={styles.headerRow}>
          <h2 className={styles.sectionTitle}>EXHIBICIONES</h2>
          <Link
            href="/exhibiciones"
            className={styles.headerArrowLink}
            aria-label="Ver circuito completo de exhibiciones"
          >
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Grilla 3x2 de 6 Tarjetas (640px x 667px cada una) */}
        <div className={styles.grid}>
          {EXHIBITIONS_CARDS.map((card, index) => (
            <Link
              key={card.id}
              href={`/salas/${card.slug}`}
              className={styles.card}
              style={{ '--card-gradient': card.themeColor }}
              aria-label={`${card.workTitle} — ${card.salaTitle} — ${card.meta}`}
              data-card-index={index}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={publicAsset(card.image)}
                  alt={`${card.salaTitle} — ${card.workTitle}`}
                  className={styles.cardImage}
                  loading="eager"
                />
              </div>

              <div className={styles.roomName}>{card.salaTitle}</div>

              <div className={styles.cardOverlay} aria-hidden="true">
                <span className={styles.workTitleText}>{card.workTitle}</span>
                <span className={styles.salaHeading}>{card.salaTitle}</span>
                <span className={styles.metaText}>{card.meta}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

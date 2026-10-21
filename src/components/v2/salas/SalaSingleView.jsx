import React from 'react';
import Link from 'next/link';
import HeaderV2 from '../HeaderV2';
import FooterV2 from '../FooterV2';
import AmigosBadge from '../AmigosBadge';
import HorizontalGallery from './HorizontalGallery';
import NewsletterSection from '../home/NewsletterSection';
import styles from './SalaSingleView.module.css';
import { publicAsset } from '../../../lib/sitePaths.mjs';
import { ROOMS_V2_DATA } from '../../../data/v2/roomsV2Data';

/**
 * SalaSingleView — Vista Monumental de Sala Individual MAM TRUX
 * Fiel 1:1 a la estructura del lienzo oficial de Figma exhibicion_sala (Nodo #4203:239):
 * 1. HeaderV2 institucional oscuro.
 * 2. Portada Monumental Hero limpia (lienzo de obra puro, sin texto superpuesto).
 * 3. Dossier Editorial y Navegación (Fondo #F9F6F3):
 *    - Columna Izquierda: Retorno ← EXHIBICIONES + Silueta escultórica del danzante Chávez.
 *    - Columna Derecha: Título SALA MONUMENTAL + Kicker + Colección permanente + Ensayo + Ficha al pie.
 * 4. Tira Fotográfica Horizontal continua (tríptico 2810x800px idéntico a Nosotros).
 * 5. NewsletterSection oficial (escultura ecuestre roja + marca de agua).
 * 6. FooterV2 institucional.
 *
 * @param {Object} props
 * @param {Object} [props.sala] - Datos de la sala
 */
export default function SalaSingleView({ sala = ROOMS_V2_DATA.monumental }) {
  const currentSala = sala || ROOMS_V2_DATA.monumental;

  return (
    <div className={styles.pageWrapper}>
      {/* 1. Header Bimodal MAM */}
      <HeaderV2 isDark={true} activePage="exhibiciones" />

      <main id="main-content">
        {/* 2. Portada Monumental Hero Limpia (Lienzo de la obra a pantalla completa) */}
        <section className={styles.coverHero} aria-label={`Portada de ${currentSala.name}`}>
          <img
            src={publicAsset(currentSala.coverImage)}
            alt={currentSala.name}
            className={styles.coverImage}
            loading="eager"
          />
        </section>

        {/* 3. Dossier Editorial y Navegación (Fondo Arena / Lino #F9F6F3) */}
        <section className={styles.editorialSection} aria-label="Texto Curatorial y Ficha de Sala">
          <div className={styles.editorialContainer}>
            {/* Columna Izquierda: Retorno a Exhibiciones y Silueta del Danzante */}
            <aside className={styles.leftCol}>
              <Link
                href="/exhibiciones"
                className={styles.backLink}
                aria-label="Volver a Exhibiciones"
              >
                <span>←</span>
                <span>EXHIBICIONES</span>
              </Link>

              <div className={styles.silhouetteWrapper}>
                <img
                  src={publicAsset('/assets/v2/dancer_silhouette.png')}
                  alt="Silueta escultórica de Gerardo Chávez"
                  className={styles.dancerSilhouette}
                />
              </div>
            </aside>

            {/* Columna Derecha: Título, Kicker, Ensayo Curatorial y Ficha Institucional */}
            <article className={styles.rightCol}>
              <h1 className={styles.roomTitle}>{currentSala.name}</h1>

              <div className={styles.subheadBlock}>
                <p className={styles.exhibitionKicker}>
                  {currentSala.exhibitionTitle
                    ? currentSala.exhibitionTitle.toUpperCase()
                    : 'POÉTICAS DEL BARRO: OBRA MONUMENTAL DE GERARDO CHÁVEZ'}
                </p>
                <p className={styles.datesStatus}>
                  {currentSala.dates || 'Colección permanente'}
                </p>
              </div>

              <div className={styles.curatorialBody}>
                {currentSala.curatorialIntro && (
                  <p className={styles.paragraph}>{currentSala.curatorialIntro}</p>
                )}

                {Array.isArray(currentSala.curatorialParagraphs) &&
                  currentSala.curatorialParagraphs.map((par, i) => (
                    <p key={i} className={styles.paragraph}>
                      {par}
                    </p>
                  ))}
              </div>

              {/* Ficha Institucional al Pie del Ensayo */}
              <div className={styles.metaFooterBlock}>
                <p className={styles.metaLine}>
                  {currentSala.location || 'SALA 01 Pabellón de Arte Moderno (MAM)'}
                </p>
                <p className={styles.metaLine}>Museo de Arte Moderno de Trujillo (MAM)</p>
                <p className={styles.metaLine}>Fundación Gerardo Chávez</p>
              </div>
            </article>
          </div>
        </section>

        {/* 4. Tira Fotográfica Monumental Continua (Tríptico 2810x800px idéntico a Nosotros) */}
        <HorizontalGallery roomName={currentSala.name} />

        {/* 5. Newsletter MAM 1:1 Fiel a Figma */}
        <NewsletterSection />
      </main>

      {/* Floating Action Badge & Footer Unificado */}
      <AmigosBadge />
      <FooterV2 />
    </div>
  );
}

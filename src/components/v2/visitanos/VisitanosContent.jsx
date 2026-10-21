import React from 'react';
import styles from './VisitanosContent.module.css';
import { publicAsset } from '../../../lib/sitePaths.mjs';

/**
 * VisitanosContent — Vista Visítanos Fiel 1:1 a Figma MAM TRUX
 * Satisface los nodos de Figma:
 * - Frame Visítanos: #4271:908 (1920x2140px, fondo #F9F6F3)
 * - Mapeo Satelital Google Maps: #4271:1049 (Dark map banner, 1920x760px)
 * - Contenido Editorial de Sedes: #4271:950 (Museo de Arte Moderno & Sala Centro con Museo CaféBar)
 * 
 * Regla Estricta: CERO cards, CERO botones sintéticos, CERO textos inventados.
 */
export default function VisitanosContent() {
  return (
    <section className={styles.section} aria-label="Visítanos — Sedes y Ubicación">
      {/* 1. Mapeo Satelital Google Maps (#4271:1049) — Banner Completo */}
      <div className={styles.mapBannerContainer}>
        <iframe
          src="https://www.google.com/maps?q=-8.1096274%2C-78.9951053&z=17&output=embed"
          data-map-provider="maps.google.com"
          data-location-url="https://maps.app.goo.gl/GrpEDJRvGdPDVzAX7"
          title="Mapa de Museo de Arte Moderno de Trujillo, Perú"
          className={styles.mapBannerFrame}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* 2. Contenido Editorial de Sedes (#4271:950) */}
      <div className={styles.contentContainer}>
        {/* Sede 1: Museo de Arte Moderno de Trujillo */}
        <div className={styles.sedeRow}>
          <div className={styles.sedeTitleCol}>
            <h2 className={styles.sedeTitle}>
              MUSEO DE ARTE MODERNO DE TRUJILLO
            </h2>
          </div>
          <div className={styles.sedeInfoCol}>
            <p className={styles.addressText}>
              Prolongación Federico Villareal (km 3.5 vía Laredo)<br />
              Barraza, Trujillo
            </p>
            <div className={styles.contactBlock}>
              <a href="mailto:info@fundaciongerardochavez.com" className={styles.contactLink}>
                info@fundaciongerardochavez.com
              </a>
              <a href="tel:+51949736543" className={styles.contactLink}>
                +51 949736543
              </a>
            </div>
          </div>
        </div>

        {/* Sede 2: Sala Centro & Museo CaféBar */}
        <div className={styles.sedeRow}>
          <div className={styles.sedeTitleCol}>
            <h2 className={styles.sedeTitle}>
              SALA CENTRO
            </h2>
          </div>
          <div className={styles.sedeInfoCol}>
            <p className={styles.addressText}>
              Jr. Independencia 701<br />
              Centro Histórico de Trujillo
            </p>
            <div className={styles.contactBlock}>
              <a href="mailto:info@fundaciongerardochavez.com" className={styles.contactLink}>
                info@fundaciongerardochavez.com
              </a>
              <a href="tel:+51949736543" className={styles.contactLink}>
                +51 949736543
              </a>
            </div>

            {/* Logo Museo CaféBar (#4271:823) */}
            <div className={styles.cafeBarWrapper}>
              <img
                src={publicAsset('/assets/v2/museo_cafe_bar.png')}
                alt="Museo CaféBar"
                className={styles.cafeBarLogo}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

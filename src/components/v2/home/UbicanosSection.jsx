import React from 'react';
import styles from './UbicanosSection.module.css';

/**
 * UbicanosSection — Ubicación Satelital Fiel 1:1 a Figma MAM TRUX
 * Satisface el nodo de Figma #4077:159 (1920x931px).
 * 
 * Composición oficial del diseño Figma:
 * - Titular Izquierdo (#4077:156, x: 16px): "UBÍCANOS" en Monument Grotesk Medium 29.2px.
 * - Dirección Derecha (#4077:155, x: 960px): "Prolongación Federico Villareal (km 3.5 vía Laredo) Trujillo" en 18px.
 * - Mapa Satelital a Pantalla Completa (#4084:163): 1920x760px con imagen Google maps.
 */
export default function UbicanosSection() {
  return (
    <section className={styles.section} aria-label="Ubicación del Museo MAM">
      <div className={styles.topBar}>
        <div className={styles.titleBlock}>
          <h2 className={styles.sectionTitle}>UBÍCANOS</h2>
        </div>
        <div className={styles.addressBlock}>
          <p className={styles.addressText}>
            Prolongación Federico Villareal (km 3.5 vía Laredo)<br />
            Trujillo
          </p>
        </div>
      </div>

      <div className={styles.mapWrapper}>
        <iframe
          src="https://www.google.com/maps?q=-8.1096274%2C-78.9951053&z=17&output=embed"
          data-map-provider="maps.google.com"
          data-location-url="https://maps.app.goo.gl/kZfy7yuLBm4732As6"
          title="Mapa de Museo de Arte Moderno de Trujillo, Perú"
          className={styles.mapFrame}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

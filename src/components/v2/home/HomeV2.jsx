'use client';

import React from 'react';
import HeaderV2 from '../HeaderV2';
import FooterV2 from '../FooterV2';
import AmigosBadge from '../AmigosBadge';
import HeroSlider from './HeroSlider';
import BienvenidaSection from './BienvenidaSection';
import ExhibicionesSection from './ExhibicionesSection';
import PrecolombinoTeaser from './PrecolombinoTeaser';
import UbicanosSection from './UbicanosSection';
import NewsletterSection from './NewsletterSection';
import styles from './HomeV2.module.css';

/**
 * HomeV2 — Portada Oficial de MAM TRUX
 * Satisface el nodo de Figma #4022:66 (1920x5897, Fondo #EAE9E0).
 */
export default function HomeV2() {
  return (
    <div className={styles.homeCanvas}>
      {/* 1. Header Bimodal con sensor de scroll */}
      <HeaderV2 isDark={false} activePage="home" />

      <main>
        {/* 2. Hero Slider Monumental (#4022:191) */}
        <HeroSlider />

        {/* 3. Sección Bienvenida e Identidad (#4022:188) */}
        <BienvenidaSection />

        {/* 4. Exhibiciones y Salas Destacadas (#4022:155) */}
        <ExhibicionesSection />

        {/* 5. Pabellón Precolombino Teaser (#4022:156) */}
        <PrecolombinoTeaser />

        {/* 6. Newsletter y Archivo Cultural (#4022:116) */}
        <NewsletterSection />

        {/* 7. Ubícanos con Mapa Satelital (#4077:159) */}
        <UbicanosSection />
      </main>

      {/* 8. Botón Flotante Amigos MAM (#4032:66) con PopUp integrado (#4271:1089) */}
      <AmigosBadge enableDrag />

      {/* 9. Footer Modular 1920x174 (#4120:62) */}
      <FooterV2 homeVariant />
    </div>
  );
}

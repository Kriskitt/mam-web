'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './HeroSlider.module.css';
import { publicAsset } from '../../../lib/sitePaths.mjs';

export const HOME_HERO_SLIDES = [
  { image: '/assets/angel_slide_img.png', title: 'EXHIBICIONES / ÁNGEL CHÁVEZ', href: '/salas/angel-chavez', alt: 'Sala Ángel Chávez' },
  { image: '/assets/sala-monumental.png', title: 'EXHIBICIONES / SALA MONUMENTAL', href: '/salas/monumental', alt: 'Sala Monumental' },
  { image: '/assets/paijan.png', title: 'EXHIBICIONES / SALA TEMPORAL', href: '/salas/temporal', alt: 'Sala Temporal' },
  { image: '/assets/sala-coleccion.png', title: 'EXHIBICIONES / SALA COLECCIÓN', href: '/salas/coleccion', alt: 'Sala Colección' },
  { image: '/assets/dioses-bravos.png', title: 'EXHIBICIONES / SALA DE PROYECTOS', href: '/salas/proyectos', alt: 'Sala de Proyectos' },
  { image: '/assets/precolombino-banner.png', title: 'PABELLÓN PRECOLOMBINO', href: '/precolombino', alt: 'Pabellón Precolombino' },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener?.('change', updatePreference);
    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % HOME_HERO_SLIDES.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [currentIndex, reducedMotion]);

  const activeSlide = HOME_HERO_SLIDES[currentIndex];

  return (
    <section
      className={styles.heroContainer}
      aria-label="Portada de exhibiciones"
      aria-roledescription="carousel"
      data-autoplay-ms="3500"
    >
      <div className={styles.bgImageWrapper}>
        {HOME_HERO_SLIDES.map((slide, index) => (
          <img
            key={slide.image}
            src={publicAsset(slide.image)}
            alt={slide.alt}
            className={`${styles.bgImage} ${index === currentIndex ? styles.activeImage : ''}`}
            aria-hidden={index !== currentIndex}
            data-slide-index={index}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = publicAsset('/assets/v2/home_hero_slide.png');
            }}
          />
        ))}
        <div className={styles.topGradient} />
      </div>

      <div className={styles.overlayContent}>
        <div className={styles.metaRow} aria-live="polite">
          <span className={styles.slideCounter} data-counter={`${String(currentIndex + 1).padStart(2, '0')} / ${String(HOME_HERO_SLIDES.length).padStart(2, '0')}`} aria-label={`Diapositiva ${currentIndex + 1} de ${HOME_HERO_SLIDES.length}`}>
            {String(currentIndex + 1).padStart(2, '0')} / {String(HOME_HERO_SLIDES.length).padStart(2, '0')}
          </span>
          <Link href={activeSlide.href} className={styles.slideTitleLink}>
            {activeSlide.title}
          </Link>
        </div>

        <div className={styles.navigationLines} role="group" aria-label="Navegación del carrusel">
          {HOME_HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={`${styles.navigationLine} ${index === currentIndex ? styles.navigationLineActive : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Mostrar diapositiva ${index + 1} de ${HOME_HERO_SLIDES.length}`}
              aria-current={index === currentIndex ? 'true' : undefined}
              data-slide-nav={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './PrecolombinoTeaser.module.css';

const PAVILION_IMAGES = [
  '/assets/home/precolombino_1.png',
  '/assets/home/precolombino_2.png',
  '/assets/home/precolombino_3.png',
];

const PAVILION_ALT_TEXT = [
  'Vasija moche con figura felina',
  'Vasija precolombina de cerámica clara',
  'Vasija precolombina con figura de felino',
];

export default function PrecolombinoTeaser() {
  const [activeImage, setActiveImage] = useState(0);
  const [isPointerOver, setIsPointerOver] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener?.('change', updatePreference);
    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  useEffect(() => {
    if (!isPointerOver || reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setActiveImage((index) => (index + 1) % PAVILION_IMAGES.length);
    }, 950);
    return () => window.clearInterval(timer);
  }, [isPointerOver, reducedMotion]);

  return (
    <section className={styles.section} aria-label="Pabellón Precolombino">
      <div className={styles.inner}>
        <div className={styles.splitGrid}>
          <div className={styles.leftCol}>
            <Link href="/precolombino" className={styles.textLink}>
              <span className={styles.sectionHeading}>PABELLÓN PRECOLOMBINO</span>
            </Link>
            <Link href="/precolombino" className={styles.textLink}>
              <p className={styles.headlineText}>
                Esta colección posee más de 5000 piezas moche, chimú y otras culturas del Perú antiguo
              </p>
            </Link>
          </div>

          <div className={styles.rightCol}>
            <Link
              href="/precolombino"
              className={styles.imageContainer}
              aria-label="Visitar el Pabellón Precolombino"
              onPointerEnter={() => setIsPointerOver(true)}
              onPointerLeave={() => {
                setIsPointerOver(false);
                setActiveImage(0);
              }}
              onFocus={() => setIsPointerOver(true)}
              onBlur={() => {
                setIsPointerOver(false);
                setActiveImage(0);
              }}
            >
              {PAVILION_IMAGES.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={PAVILION_ALT_TEXT[index]}
                  aria-hidden={index !== activeImage}
                  className={`${styles.showcaseImage} ${index === activeImage ? styles.activeImage : ''}`}
                  data-sequence-index={index}
                />
              ))}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

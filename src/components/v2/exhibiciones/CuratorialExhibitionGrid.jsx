'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './CuratorialExhibitionGrid.module.css';
import { ROOMS_LIST_V2 } from '../../../data/v2/roomsV2Data';
import { publicAsset } from '../../../lib/sitePaths.mjs';

/**
 * CuratorialExhibitionGrid — Exhibiciones MAM TRUX sobre Lienzo Oscuro (#452B10)
 * Grounded 1:1 en Figma MAM TRUX (Canvas MAM - Desktop #0:1, Nodos #4262:609, #4262:649 y #4262:610).
 *
 * Especificaciones de Figma:
 * - Esquina superior izquierda (#4262:649): Dos pequeños subtítulos "AHORA" y "ARCHIVO".
 * - Cero tarjetas (cards): Todo va integrado limpiamente en el lienzo (#452B10) sin bordes de tarjeta ni fondos.
 * - Por cada sala, únicamente:
 *     1. Imagen completa sobre el lienzo.
 *     2. Nombre de la sala (ej. "SALA MONUMENTAL")
 *     3. Título de la exhibición (ej. "Poéticas del barro: Obra monumental de Gerardo Chávez")
 *     4. Categoría / vigencia (ej. "Colección permanente")
 * - Cero párrafos introductorios inventados, cero contadores ni botones redundantes ("Explorar Sala").
 *
 * @param {Object} props
 * @param {Array} [props.rooms] - Colección de salas (con fallback a ROOMS_LIST_V2)
 */
export default function CuratorialExhibitionGrid({ rooms = ROOMS_LIST_V2 }) {
  const [activeTab, setActiveTab] = useState('ahora');

  return (
    <section className={styles.section} aria-label="Exhibiciones MAM">
      <div className={styles.inner}>
        {/* Esquina Superior Izquierda: Encabezado EXHIBICIONES y Subtítulos AHORA / ARCHIVO (#4262:649) */}
        <header className={styles.navBlock}>
          <h1 className={styles.sectionTitle}>EXHIBICIONES</h1>
          <nav className={styles.subnavBlock} role="tablist" aria-label="Filtro de exhibiciones">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'ahora'}
              className={`${styles.subnavBtn} ${activeTab === 'ahora' ? styles.subnavBtnActive : ''}`}
              onClick={() => setActiveTab('ahora')}
            >
              AHORA
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'archivo'}
              className={`${styles.subnavBtn} ${activeTab === 'archivo' ? styles.subnavBtnActive : ''}`}
              onClick={() => setActiveTab('archivo')}
            >
              ARCHIVO
            </button>
          </nav>
        </header>

        {/* Lienzo Curatorial de Salas (#4262:610) */}
        <div className={styles.grid} role="list" aria-label="Salas del Museo MAM">
          {rooms.map((room, index) => {
            const isFullWidth = index < 0; // Las primeras 2 salas son a ancho completo en el lienzo
            const targetHref =
              room.slug === 'precolombino'
                ? '/precolombino'
                : `/salas/${room.slug}`;

            const itemClass = isFullWidth
              ? `${styles.canvasItem} ${styles.canvasItemFull}`
              : `${styles.canvasItem} ${styles.canvasItemHalf}`;

            const mediaFrameClass = isFullWidth
              ? `${styles.mediaFrame} ${styles.mediaFrameFull}`
              : `${styles.mediaFrame} ${styles.mediaFrameHalf}`;

            return (
              <article key={room.id} className={itemClass} role="listitem">
                <Link
                  href={targetHref}
                  className={styles.itemLink}
                  style={{
                    '--room-frame-bg': room.themeColor || '#2E1B0A',
                  }}
                  aria-label={`${room.name}: ${room.exhibitionTitle}`}
                >
                  {/* Imagen completa en el lienzo */}
                  <div className={mediaFrameClass}>
                    <img
                      src={publicAsset(room.coverImage)}
                      alt={room.name}
                      className={styles.itemImage}
                      loading={index < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                
                  {/* Bloque curatorial */}
                  <div className={styles.itemBody}>
                    <h2 className={styles.roomName}>{room.name}</h2>
                    <p className={styles.exhibitionTitle}>
                      {room.exhibitionTitle}
                    </p>
                    <span className={styles.categoryTag}>
                      {room.dates || room.category || 'Colección permanente'}
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import HeaderV2 from '../HeaderV2';
import DockScrubber from './DockScrubber';
import styles from './PrecolombinoViewer.module.css';
import { publicAsset } from '../../../lib/sitePaths.mjs';

const TEMPORARY_PRECOLOMBINO_IMAGES = [
  '/assets/precolombino-gallery/precolombino_1.png',
  '/assets/precolombino-gallery/precolombino_2.png',
  '/assets/precolombino-gallery/precolombino_3.png',
];

const PIECE_TITLES = [
  'Pieza precolombina 1',
  'Pieza precolombina 2',
  'Pieza precolombina 3',
];

/**
 * Matriz temporal de 22 posiciones. Las referencias se repiten hasta que
 * WordPress reemplace este contenido de preproducción.
 */
export const FIGMA_PRECOLOMBINO_PIECES = Array.from({ length: 22 }, (_, index) => {
  const imageIndex = index % TEMPORARY_PRECOLOMBINO_IMAGES.length;
  const position = index + 1;

  return {
    id: `pieza-${position}`,
    title: `${PIECE_TITLES[imageIndex]} — posición ${position}`,
    image: TEMPORARY_PRECOLOMBINO_IMAGES[imageIndex],
    thumbnail: TEMPORARY_PRECOLOMBINO_IMAGES[imageIndex],
    alt: `${PIECE_TITLES[imageIndex]} — posición ${position} de 22`,
  };
});

const WHEEL_THRESHOLD = 24;
const WHEEL_LOCK_MS = 450;
const SWIPE_THRESHOLD = 44;

/** Galería fullscreen con un estado compartido para todos los métodos de entrada. */
export default function PrecolombinoViewer({ pieces = FIGMA_PRECOLOMBINO_PIECES }) {
  const galleryPieces = pieces.length > 0 ? pieces : FIGMA_PRECOLOMBINO_PIECES;
  const totalPieces = galleryPieces.length;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cursor, setCursor] = useState(null);
  const [supportsCustomCursor, setSupportsCustomCursor] = useState(false);

  const artworkCanvasRef = useRef(null);
  const wheelStateRef = useRef({ accumulatedDelta: 0, lastStepAt: 0 });
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const pointerMovedRef = useRef(false);
  const suppressClickUntilRef = useRef(0);

  const selectIndex = useCallback((nextIndex) => {
    setSelectedIndex(((nextIndex % totalPieces) + totalPieces) % totalPieces);
  }, [totalPieces]);

  const goToNext = useCallback(() => {
    setSelectedIndex((currentIndex) => (currentIndex + 1) % totalPieces);
  }, [totalPieces]);
  const goToPrev = useCallback(() => {
    setSelectedIndex((currentIndex) => (currentIndex - 1 + totalPieces) % totalPieces);
  }, [totalPieces]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateCursorSupport = () => setSupportsCustomCursor(mediaQuery.matches);

    updateCursorSupport();
    mediaQuery.addEventListener?.('change', updateCursorSupport);
    return () => mediaQuery.removeEventListener?.('change', updateCursorSupport);
  }, []);

  // Mantener la imagen actual y sus vecinas listas para cambios fluidos.
  useEffect(() => {
    [-1, 0, 1].forEach((offset) => {
      const index = (selectedIndex + offset + totalPieces) % totalPieces;
      const image = new window.Image();
      image.src = publicAsset(galleryPieces[index].image || galleryPieces[index].thumbnail);
    });
  }, [galleryPieces, selectedIndex, totalPieces]);

  const handleGalleryWheel = useCallback((event) => {
    const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;

    if (!dominantDelta) return;
    event.preventDefault();
    event.stopPropagation();

    const now = performance.now();
    const wheelState = wheelStateRef.current;

    if (now - wheelState.lastStepAt < WHEEL_LOCK_MS) {
      wheelState.accumulatedDelta = 0;
      return;
    }

    wheelState.accumulatedDelta += dominantDelta;
    if (Math.abs(wheelState.accumulatedDelta) < WHEEL_THRESHOLD) return;

    const direction = wheelState.accumulatedDelta > 0 ? 1 : -1;
    wheelState.accumulatedDelta = 0;
    wheelState.lastStepAt = now;

    if (direction > 0) goToNext();
    else goToPrev();
  }, [goToNext, goToPrev]);

  // La obra y el dock consumen el mismo gesto para evitar desplazamiento de página.
  useEffect(() => {
    const artworkCanvas = artworkCanvasRef.current;
    if (!artworkCanvas) return undefined;

    artworkCanvas.addEventListener('wheel', handleGalleryWheel, { passive: false });
    return () => artworkCanvas.removeEventListener('wheel', handleGalleryWheel);
  }, [handleGalleryWheel]);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault();
      goToNext();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      goToPrev();
    } else if (event.key === 'Home') {
      event.preventDefault();
      selectIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      selectIndex(totalPieces - 1);
    }
  };

  const handlePointerDown = (event) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    pointerMovedRef.current = false;

    if (event.pointerType === 'touch') {
      try {
        event.currentTarget.setPointerCapture?.(event.pointerId);
      } catch {
        // La captura puede no estar disponible en eventos táctiles cancelados.
      }
    }
  };

  const handlePointerMove = (event) => {
    const dx = event.clientX - pointerStartRef.current.x;
    const dy = event.clientY - pointerStartRef.current.y;
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) pointerMovedRef.current = true;

    if (!supportsCustomCursor || event.pointerType !== 'mouse') return;

    setCursor({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handlePointerUp = (event) => {
    const dx = event.clientX - pointerStartRef.current.x;
    const dy = event.clientY - pointerStartRef.current.y;
    const dominantDelta = Math.abs(dx) > Math.abs(dy) ? dx : dy;

    if (event.pointerType === 'touch' && Math.abs(dominantDelta) >= SWIPE_THRESHOLD) {
      suppressClickUntilRef.current = performance.now() + 400;
      if (dominantDelta < 0) goToNext();
      else goToPrev();
    }

    try {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    } catch {
      // El navegador puede liberar la captura antes del evento final.
    }
  };

  const handleCanvasClick = (event) => {
    if (!supportsCustomCursor || performance.now() < suppressClickUntilRef.current) return;
    if (pointerMovedRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX - bounds.left < bounds.width / 2) goToPrev();
    else goToNext();
  };

  return (
    <div
      className={styles.sanctuaryContainer}
      tabIndex={0}
      role="region"
      aria-label="Pabellón de Colección Precolombina — Galería Inmersiva"
      onKeyDown={handleKeyDown}
    >
      <HeaderV2 isDark transparent activePage="precolombino" />

      <div className={styles.topGradient} aria-hidden="true" />
      <div className={styles.bottomGradient} aria-hidden="true" />

      <div
        ref={artworkCanvasRef}
        id="precolombino-artwork"
        className={styles.artworkCanvas}
        onClick={handleCanvasClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => setCursor(null)}
        role="group"
        aria-label="Área de navegación de imágenes"
        data-wheel-surface="gallery"
      >
        {galleryPieces.map((piece, index) => {
          const imageSrc = piece.image || piece.thumbnail;
          const isActive = index === selectedIndex;

          return (
            <img
              key={piece.id || index}
              src={publicAsset(imageSrc)}
              alt={isActive ? piece.alt || piece.title || `Pieza precolombina ${index + 1}` : ''}
              className={`${styles.mainArtworkImg} ${isActive ? styles.mainArtworkImgActive : styles.mainArtworkImgHidden}`}
              draggable="false"
              onDragStart={(event) => event.preventDefault()}
              loading={index < 3 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              aria-hidden={!isActive}
              data-gallery-index={index}
            />
          );
        })}
      </div>

      {supportsCustomCursor && cursor && (
        <span
          className={`${styles.directionCursor} ${styles.directionCursorDouble}`}
          style={{ left: cursor.x, top: cursor.y }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 48 24" role="presentation" focusable="false">
            <path d="M2 12h44M2 12l7-7M2 12l7 7M46 12l-7-7M46 12l-7 7" />
          </svg>
        </span>
      )}

      <DockScrubber
        pieces={galleryPieces}
        selectedIndex={selectedIndex}
        onSelect={selectIndex}
        onWheel={handleGalleryWheel}
      />

      <div className={styles.srOnly} aria-live="polite">
        Exhibiendo pieza {selectedIndex + 1} de {totalPieces}
      </div>
    </div>
  );
}

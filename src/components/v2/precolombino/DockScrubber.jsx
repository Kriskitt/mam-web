'use client';

import React, { useEffect, useRef } from 'react';
import styles from './DockScrubber.module.css';
import { publicAsset } from '../../../lib/sitePaths.mjs';

/**
 * @param {{ pieces?: Array<{ id?: string, title?: string, image?: string, thumbnail?: string }>, selectedIndex?: number, onSelect?: (index: number) => void, onWheel?: (event: WheelEvent) => void }} props
 */
export default function DockScrubber({ pieces = [], selectedIndex = 0, onSelect = () => {}, onWheel = null }) {
  const containerRef = useRef(null);
  const thumbRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const activeThumb = thumbRefs.current[selectedIndex];
    if (!container || !activeThumb) return;

    const targetScrollLeft = activeThumb.offsetLeft
      - ((container.clientWidth - activeThumb.clientWidth) / 2);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [selectedIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !onWheel) return undefined;

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  const handleKeyDown = (event, index) => {
    let nextIndex = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = (index + 1) % pieces.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      nextIndex = (index - 1 + pieces.length) % pieces.length;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = pieces.length - 1;
    }

    if (nextIndex !== index) onSelect(nextIndex);
  };

  return (
    <nav
      ref={containerRef}
      className={styles.dockContainer}
      aria-label="Navegador de 22 piezas arqueológicas precolombinas"
      data-thumbnail-navigator
      data-wheel-surface="gallery"
    >
      <div className={styles.dockTrack} role="tablist" aria-orientation="horizontal">
        {pieces.map((piece, index) => {
          const isSelected = index === selectedIndex;
          const imageSrc = piece.thumbnail || piece.image;

          return (
            <button
              key={piece.id || index}
              ref={(element) => {
                thumbRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-label={`Pieza arqueológica ${index + 1} de ${pieces.length}: ${piece.title || 'Pieza precolombina'}`}
              tabIndex={isSelected ? 0 : -1}
              className={`${styles.thumbBtn} ${isSelected ? styles.thumbBtnSelected : ''}`}
              onClick={() => onSelect(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <img
                src={publicAsset(imageSrc)}
                alt=""
                className={styles.thumbImg}
                draggable="false"
                onDragStart={(event) => event.preventDefault()}
                loading={index < 3 ? 'eager' : 'lazy'}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

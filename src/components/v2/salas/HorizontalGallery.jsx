'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './HorizontalGallery.module.css';
import { publicAsset } from '../../../lib/sitePaths.mjs';

const GALLERY_SIZE = 6;

export const DEFAULT_GALLERY_PHOTOS = [
  {
    src: '/assets/v2/nosotros_gallery_left.png',
    alt: 'Instalación de sala y esculturas en el MAM',
  },
  {
    src: '/assets/v2/nosotros_gallery_center.png',
    alt: 'Escultura y patio en el MAM',
  },
  {
    src: '/assets/v2/nosotros_gallery_right.png',
    alt: 'Jardín y arquitectura del MAM',
  },
  {
    src: '/assets/precolombino_huaco_1.png',
    alt: 'Pieza precolombina del MAM',
  },
  {
    src: '/assets/precolombino_huaco_2.png',
    alt: 'Pieza precolombina del MAM',
  },
  {
    src: '/assets/precolombino_huaco_3.png',
    alt: 'Pieza precolombina del MAM',
  },
];

function toGalleryItem(item, roomName) {
  if (typeof item === 'string') {
    return { src: item, alt: roomName };
  }

  if (!item) return null;

  const src = item.src || item.image;
  if (!src) return null;

  return {
    src,
    alt: item.alt || item.title || roomName,
  };
}

function normalizePhotos(photos, artworks, roomName) {
  const source =
    photos && photos.length > 0
      ? photos
      : artworks && artworks.length > 0
        ? artworks
        : DEFAULT_GALLERY_PHOTOS;

  const validPhotos = source
    .map((item) => toGalleryItem(item, roomName))
    .filter(Boolean);

  const fallback = DEFAULT_GALLERY_PHOTOS.map((item) => ({ ...item }));
  const availablePhotos = validPhotos.length > 0 ? validPhotos : fallback;

  return Array.from({ length: GALLERY_SIZE }, (_, index) => ({
    ...availablePhotos[index % availablePhotos.length],
  }));
}

/**
 * HorizontalGallery — carrusel fotográfico centrado para la vista de sala.
 *
 * El carrusel mantiene seis posiciones de contenido y usa una copia a cada
 * extremo para que el loop nativo pueda continuar en ambas direcciones sin
 * dejar espacios vacíos. Las copias son sólo una implementación visual: las
 * posiciones accesibles y el contenido siguen siendo seis.
 */
export default function HorizontalGallery({
  photos = [],
  artworks = [],
  roomName = 'SALA',
}) {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const settleTimeoutRef = useRef(null);
  const currentRenderedIndexRef = useRef(1);
  const isInitializedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStateRef = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  const displayList = normalizePhotos(photos, artworks, roomName);
  const renderedList = [
    { ...displayList[GALLERY_SIZE - 1], clone: true, sourceIndex: GALLERY_SIZE - 1 },
    ...displayList.map((item, sourceIndex) => ({ ...item, sourceIndex })),
    { ...displayList[0], clone: true, sourceIndex: 0 },
  ];

  const getNearestRenderedIndex = () => {
    const container = containerRef.current;
    const slides = slidesRef.current.filter(Boolean);
    if (!container || slides.length === 0) return currentRenderedIndexRef.current;

    return slides.reduce(
      (nearestIndex, slide, index) => {
        const nearestSlide = slides[nearestIndex];
        const distance = Math.abs(getSlideScrollLeft(slide) - container.scrollLeft);
        const nearestDistance = Math.abs(
          getSlideScrollLeft(nearestSlide) - container.scrollLeft
        );
        return distance < nearestDistance ? index : nearestIndex;
      },
      0
    );
  };

  const getSlideScrollLeft = (slide) =>
    Math.max(0, slide.offsetLeft - (containerRef.current.clientWidth - slide.offsetWidth) / 2);

  const getScrollBehavior = (requestedBehavior) => {
    if (requestedBehavior === 'auto' || typeof window === 'undefined') {
      return requestedBehavior;
    }

    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : requestedBehavior;
  };

  const scrollToRenderedIndex = (renderedIndex, behavior = 'smooth') => {
    const container = containerRef.current;
    const slide = slidesRef.current[renderedIndex];
    if (!container || !slide) return;

    currentRenderedIndexRef.current = renderedIndex;
    if (behavior === 'auto') {
      container.scrollLeft = getSlideScrollLeft(slide);
      return;
    }

    container.scrollTo({
      left: getSlideScrollLeft(slide),
      behavior: getScrollBehavior(behavior),
    });
  };

  const normalizeLoopPosition = (renderedIndex) => {
    if (renderedIndex === 0) {
      scrollToRenderedIndex(GALLERY_SIZE, 'auto');
      return GALLERY_SIZE;
    }

    if (renderedIndex === GALLERY_SIZE + 1) {
      scrollToRenderedIndex(1, 'auto');
      return 1;
    }

    return renderedIndex;
  };

  const getLogicalIndex = (renderedIndex) =>
    (renderedIndex - 1 + GALLERY_SIZE) % GALLERY_SIZE;

  const updateActivePosition = () => {
    const nearestIndex = getNearestRenderedIndex();
    currentRenderedIndexRef.current = nearestIndex;
    setActiveIndex(getLogicalIndex(nearestIndex));
  };

  const settleToNearestSlide = () => {
    const nearestIndex = getNearestRenderedIndex();
    const normalizedIndex = normalizeLoopPosition(nearestIndex);
    currentRenderedIndexRef.current = normalizedIndex;
    setActiveIndex(getLogicalIndex(normalizedIndex));

    if (normalizedIndex === nearestIndex) {
      scrollToRenderedIndex(normalizedIndex, 'smooth');
    }
  };

  const scheduleSettle = () => {
    window.clearTimeout(settleTimeoutRef.current);
    settleTimeoutRef.current = window.setTimeout(settleToNearestSlide, 160);
  };

  const goToNext = () => {
    const currentIndex = normalizeLoopPosition(getNearestRenderedIndex());
    scrollToRenderedIndex(Math.min(currentIndex + 1, GALLERY_SIZE + 1));
  };

  const goToPrevious = () => {
    const currentIndex = normalizeLoopPosition(getNearestRenderedIndex());
    scrollToRenderedIndex(Math.max(currentIndex - 1, 0));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    }
  };

  const handlePointerDown = (event) => {
    const container = containerRef.current;
    if (!container || (event.pointerType === 'mouse' && event.button !== 0)) return;

    container.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
    dragStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: container.scrollLeft,
      hasMoved: false,
    };
  };

  const handlePointerMove = (event) => {
    const container = containerRef.current;
    if (!isDragging || !container) return;

    const deltaX = event.clientX - dragStateRef.current.startX;
    const deltaY = event.clientY - dragStateRef.current.startY;
    const isHorizontalGesture = Math.abs(deltaX) > Math.abs(deltaY);

    if (!isHorizontalGesture || Math.abs(deltaX) <= 5) return;

    event.preventDefault();
    dragStateRef.current.hasMoved = true;
    container.scrollLeft = dragStateRef.current.scrollLeft - deltaX * 1.15;
  };

  const handlePointerUp = (event) => {
    const container = containerRef.current;
    if (container?.hasPointerCapture?.(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
    if (dragStateRef.current.hasMoved) {
      settleToNearestSlide();
    }
  };

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      scrollToRenderedIndex(1, 'auto');
      setActiveIndex(0);
      isInitializedRef.current = true;
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(settleTimeoutRef.current);
    };
  }, []);

  return (
    <section
      className={styles.galleryFrame}
      aria-label={`Galería fotográfica de ${roomName}`}
    >
      <div
        className={styles.galleryContainer}
        role="region"
        aria-roledescription="carrusel"
        aria-label={`Galería fotográfica de ${roomName}`}
        aria-live="polite"
        data-active-index={activeIndex}
        tabIndex={0}
        ref={containerRef}
        onScroll={() => {
          if (!isInitializedRef.current) return;
          updateActivePosition();
          scheduleSettle();
        }}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className={`${styles.galleryTrack} ${isDragging ? styles.isDragging : ''}`}
          role="list"
        >
          {renderedList.map((item, renderedIndex) => {
            const isClone = item.clone === true;
            const sourceIndex = item.sourceIndex;

            return (
              <div
                key={isClone ? `clone-${renderedIndex}` : `slide-${sourceIndex}`}
                ref={(element) => {
                  slidesRef.current[renderedIndex] = element;
                }}
                className={styles.imageCard}
                role="listitem"
                aria-hidden={isClone ? 'true' : undefined}
                aria-label={
                  isClone
                    ? undefined
                    : `${item.alt || roomName} (${sourceIndex + 1} de ${GALLERY_SIZE})`
                }
                data-gallery-clone={isClone ? 'true' : undefined}
                data-gallery-source={isClone ? undefined : 'true'}
                data-gallery-position={isClone ? undefined : sourceIndex}
              >
                <img
                  src={publicAsset(item.src)}
                  alt={isClone ? '' : item.alt || `Registro fotográfico de ${roomName}`}
                  className={styles.galleryImage}
                  loading={!isClone && sourceIndex === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                  onDragStart={(event) => event.preventDefault()}
                />
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className={`${styles.navigationButton} ${styles.previousButton}`}
        aria-label="Imagen anterior"
        data-gallery-navigation="previous"
        onClick={goToPrevious}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor">
          <path d="m14.5 5-7 7 7 7" />
        </svg>
      </button>

      <button
        type="button"
        className={`${styles.navigationButton} ${styles.nextButton}`}
        aria-label="Imagen siguiente"
        data-gallery-navigation="next"
        onClick={goToNext}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor">
          <path d="m9.5 5 7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './AmigosBadge.module.css';
import AmigosMAMModal from './modals/AmigosMAMModal';

/**
 * AmigosBadge — Botón flotante distintivo de Amigos del MAM
 * Satisface los nodos de Figma #4032:66 y #4271:1016.
 * Utiliza la figura orgánica oficial amigos_mam (sin contenedor cuadrado)
 * y acciona el modal AmigosMAMModal (#4271:1089).
 * 
 * @param {Object} props
 * @param {Function} [props.onClick] - Callback personalizado al hacer click
 * @param {boolean} [props.isOpen] - Control externo de apertura
 * @param {Function} [props.onOpenChange] - Notificación de cambio de estado
 */
export default function AmigosBadge({ onClick, isOpen: controlledIsOpen, onOpenChange, enableDrag = false }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  useEffect(() => {
    if (!enableDrag) return undefined;

    const clampPosition = () => {
      setPosition((currentPosition) => {
        if (!currentPosition || !containerRef.current) return currentPosition;

        const bounds = containerRef.current.getBoundingClientRect();
        const viewportPadding = 8;
        const maxLeft = Math.max(viewportPadding, window.innerWidth - bounds.width - viewportPadding);
        const maxTop = Math.max(viewportPadding, window.innerHeight - bounds.height - viewportPadding);

        return {
          left: Math.min(maxLeft, Math.max(viewportPadding, currentPosition.left)),
          top: Math.min(maxTop, Math.max(viewportPadding, currentPosition.top)),
        };
      });
    };

    window.addEventListener('resize', clampPosition);
    return () => window.removeEventListener('resize', clampPosition);
  }, [enableDrag]);

  const handleClose = () => {
    if (onOpenChange) onOpenChange(false);
    setInternalIsOpen(false);
  };

  const handleClick = (e) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      e.preventDefault();
      return;
    }

    if (onClick) {
      onClick(e);
    } else {
      if (onOpenChange) onOpenChange(true);
      setInternalIsOpen(true);
    }
  };

  const handlePointerDown = (event) => {
    if (!enableDrag || !containerRef.current) return;

    const bounds = containerRef.current.getBoundingClientRect();
    dragRef.current = {
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top,
      startX: event.clientX,
      startY: event.clientY,
      pointerId: event.pointerId,
    };
    setIsDragging(false);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!enableDrag || !dragRef.current || !containerRef.current) return;

    const drag = dragRef.current;
    const moved = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 4;
    if (!moved) return;

    suppressClickRef.current = true;
    setIsDragging(true);
    event.preventDefault();

    const bounds = containerRef.current.getBoundingClientRect();
    const viewportPadding = 8;
    const maxLeft = Math.max(viewportPadding, window.innerWidth - bounds.width - viewportPadding);
    const maxTop = Math.max(viewportPadding, window.innerHeight - bounds.height - viewportPadding);
    setPosition({
      left: Math.min(maxLeft, Math.max(viewportPadding, event.clientX - drag.offsetX)),
      top: Math.min(maxTop, Math.max(viewportPadding, event.clientY - drag.offsetY)),
    });
  };

  const handlePointerUp = (event) => {
    if (!dragRef.current) return;
    event.currentTarget.releasePointerCapture?.(dragRef.current.pointerId);
    dragRef.current = null;
    setIsDragging(false);
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  };

  const handlePointerCancel = (event) => {
    if (!dragRef.current) return;
    event.currentTarget.releasePointerCapture?.(dragRef.current.pointerId);
    dragRef.current = null;
    setIsDragging(false);
    suppressClickRef.current = false;
  };

  const positionStyle = position
    ? { left: `${position.left}px`, top: `${position.top}px`, right: 'auto', bottom: 'auto' }
    : undefined;

  return (
    <>
      <aside
        ref={containerRef}
        className={`${styles.badgeContainer} ${enableDrag ? styles.dragEnabled : ''} ${isDragging ? styles.dragging : ''}`}
        style={positionStyle}
        data-drag-enabled={enableDrag ? 'true' : undefined}
        aria-label="Acceso a membresía Amigos MAM"
      >
        <button
          type="button"
          className={styles.badgeBtn}
          onClick={handleClick}
          onPointerDown={enableDrag ? handlePointerDown : undefined}
          onPointerMove={enableDrag ? handlePointerMove : undefined}
          onPointerUp={enableDrag ? handlePointerUp : undefined}
          onPointerCancel={enableDrag ? handlePointerCancel : undefined}
          aria-label="Abrir inscripción al programa Amigos del MAM"
        >
          <img
            src="/assets/v2/amigos_mam_figura.png"
            alt="AMIGOS MAM"
            className={styles.badgeImage}
          />
        </button>
      </aside>

      <AmigosMAMModal
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </>
  );
}

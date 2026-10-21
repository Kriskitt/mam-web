'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './AmigosMAMModal.module.css';
import { publicAsset } from '../../../lib/sitePaths.mjs';

/**
 * AmigosMAMModal — Diálogo Modal del Programa Amigos MAM
 * Satisface fielmente el nodo de Figma #4271:1089 (PopUp - Amigos_MAM, 1920x1080).
 * Integra la figura icónica oficial de Amigos MAM (#4271:1099, 239x140px).
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Visibilidad del modal
 * @param {() => void} props.onClose - Callback de cierre
 */
export default function AmigosMAMModal({ isOpen = false, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [showPreviewNotice, setShowPreviewNotice] = useState(false);
  const cardRef = useRef(null);

  // Escuchar tecla Escape, foco inicial y trampa de foco accesible (A11y WAI-ARIA)
  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement;

    // Foco inicial en el primer elemento interactivo
    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = cardRef.current?.querySelectorAll(focusableSelector);
    if (focusables && focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Trampa de foco accesible dentro del diálogo modal
      if (e.key === 'Tab') {
        if (!cardRef.current) return;
        const currentFocusables = cardRef.current.querySelectorAll(focusableSelector);
        if (currentFocusables.length === 0) return;

        const firstEl = currentFocusables[0];
        const lastEl = currentFocusables[currentFocusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    setShowPreviewNotice(true);
  };

  const handleBackdropClick = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Amigos MAM"
    >
      <div className={styles.modalCard} ref={cardRef}>
        {/* Botón de Cierre Accesible (#4271:1140) */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Cerrar modal Amigos MAM"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Figura de Identidad Oficial Amigos MAM (#4271:1099, 239x140px) */}
        <div className={styles.figureWrapper}>
          <img
            src={publicAsset('/assets/v2/amigos_mam_figura.png')}
            alt="AMIGOS MAM ✦"
            className={styles.amigosHeroFigure}
          />
        </div>

        {/* Declaración de Valor (#4271:1109) */}
        <p className={styles.modalDescription}>
          Sé parte activa de la comunidad protectora del patrimonio y el arte contemporáneo en
          Trujillo. Disfruta de acceso libre ilimitado a todas las salas, invitaciones a
          inauguraciones exclusivas con curadores, visitas guiadas privadas y descuentos en talleres.
        </p>

        {/* Enlace WhatsApp Directo (#4271:1115) */}
        <a
          href="https://wa.me/51944888999?text=Hola,%20deseo%20unirme%20al%20programa%20Amigos%20MAM"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappBtn}
          aria-label="Contactar al museo vía WhatsApp para unirse a Amigos MAM"
        >
          <span>VÍA WHATSAPP</span>
          <span aria-hidden="true">↗</span>
        </a>

        {/* Divisor (#4271:1131) */}
        <div className={styles.dividerRow} aria-hidden="true">
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>O</span>
          <span className={styles.dividerLine} />
        </div>

        {/* Formulario de Registro (#4271:1130) */}
        {showPreviewNotice ? (
          <div className={styles.successMessage} role="status">
            <strong>Inscripción no disponible en esta vista previa.</strong>
            <p style={{ margin: '6px 0 0', opacity: 0.9 }}>
              Tu solicitud no se ha enviado ni guardado. Para unirte, escríbenos por WhatsApp.
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nombres y Apellidos"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={styles.formInput}
              aria-label="Nombres y Apellidos"
            />

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={styles.formInput}
              aria-label="Correo electrónico"
            />

            <button type="submit" className={styles.submitBtn}>
              Enviar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

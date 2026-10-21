'use client';

import React, { useState } from 'react';
import styles from './NewsletterSection.module.css';
import { savePreproductionSubmission } from '../../../lib/preproductionForms';

/**
 * NewsletterSection — Boletín Cultural Fiel 1:1 a Figma MAM TRUX (#4022:116)
 * Basado en la referencia oficial:
 * - Fondo Dorado (#D7C180) con marca de agua perimetral MAM.
 * - A la izquierda: Silueta roja del jinete monumental de Gerardo Chávez con "NEWSLETTER" (#4096:63).
 * - A la derecha:
 *     * Titular: "¡Recibe en tu mail todas las novedades!"
 *     * Bajada: "Artículos, ofertas, campañas y actualizaciones sobre el Museo de Arte Moderno Trujillo"
 *     * Input: Correo electrónico con línea inferior fina.
 *     * Botón: "Suscribirse" sólido en marrón oscuro (#3C2415) con texto en blanco.
 */
export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !e.currentTarget.reportValidity() || honeypot) return;

    setStatus('loading');
    setFeedback('');

    try {
      savePreproductionSubmission('mam-newsletter-preview', { email: email.trim() });
      setStatus('success');
      setFeedback('Registro guardado solo en este navegador (preproducción). Aún no estás suscrito al boletín.');
      setEmail('');
    } catch {
      setStatus('error');
      setFeedback('No se pudo guardar el registro local. Intenta nuevamente.');
    }
  };

  return (
    <section className={styles.section} aria-label="Boletín Cultural MAM">
      {/* Marca de agua perimetral MAM de fondo (#4096:62) */}
      <div className={styles.watermarkBg} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Bloque Izquierdo: Silueta Roja del Jinete de Gerardo Chávez (#4096:63) */}
        <div className={styles.sculptureCol}>
          <figure className={styles.sculptureWrap} data-fill-to-stroke="true">
            <svg
              className={styles.sculptureSvg}
              viewBox="0 0 599.2 513.4"
              role="img"
              aria-label="NEWSLETTER — Gerardo Chávez"
              data-fill-to-stroke="true"
            >
              <use href="/assets/home/newsletter.svg#Layer_1" />
            </svg>
            <span className={styles.sculptureLabel}>NEWSLETTER</span>
          </figure>
        </div>

        {/* Bloque Derecho: Formulario Oficial (#4096:68) */}
        <div className={styles.formCol}>
          <h2 className={styles.headline}>¡Recibe en tu mail todas las novedades!</h2>
          <p className={styles.subheadline}>
            Artículos, ofertas, campañas y actualizaciones sobre el Museo de Arte Moderno Trujillo
          </p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* Campo Honeypot Oculto */}
            <input
              type="text"
              name="b_field_guard"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className={styles.honeypot}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className={styles.inputGroup}>
              <label htmlFor="newsletter-email" className={styles.visuallyHidden}>
                Correo electrónico
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
                className={styles.input}
                disabled={status === 'loading'}
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Enviando...' : 'Suscribirse'}
            </button>

            {feedback && (
              <div
                className={`${styles.feedback} ${status === 'success' ? styles.feedbackSuccess : styles.feedbackError}`}
                role="status"
              >
                {feedback}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState, useRef } from 'react';
import styles from './EditorialSplitLayout.module.css';
import { publicAsset } from '../../../lib/sitePaths.mjs';

/**
 * EditorialSplitLayout — Layout Editorial Dividido 50/50 con Scroll Independiente
 *
 * Especificaciones de Interacción:
 * - Cuando el mouse está sobre las imágenes (izquierda): el scroll desplaza las imágenes verticalmente.
 * - Cuando el mouse está sobre el texto (derecha): el scroll desplaza el texto narrativo verticalmente.
 * - En desktop (>= 1024px): La columna de imágenes es sticky con su propio scroller interno de imágenes (overscroll-behavior: contain).
 * - La columna de texto desplaza con el flujo de la página permitiendo alcanzar el footer institucional al final.
 * - Puntitos indicadores dentro de la imagen al lado derecho sincronizados con el visor de imágenes.
 * - Cero líneas divisorias y cero texto superpuesto a las fotografías.
 */
/**
 * @typedef {Object} MediaItem
 * @property {string} src
 * @property {string} [alt]
 * @property {string} [caption]
 */

/**
 * @typedef {Object} Chapter
 * @property {string} [number]
 * @property {string} [title]
 * @property {string} [subtitle]
 * @property {string} [date]
 * @property {string} [description]
 * @property {string} [image]
 */

/**
 * @typedef {Object} SectionItem
 * @property {string} title
 * @property {string} [subtitle]
 * @property {string} [date]
 * @property {string} [description]
 * @property {string} [statement]
 * @property {string[]} [paragraphs]
 */

/**
 * @param {Object} props
 * @param {string} [props.title]
 * @param {string} [props.subtitle]
 * @param {string} [props.date]
 * @param {string} [props.description]
 * @param {string} [props.statement]
 * @param {Chapter[]} [props.chapters]
 * @param {string[]} [props.paragraphs]
 * @param {SectionItem[]} [props.sections]
 * @param {MediaItem[]} [props.mediaItems]
 * @param {boolean} [props.showContactForm]
 */
export default function EditorialSplitLayout({
  title = 'Educación, Comunidad & Mediación Cultural',
  subtitle = 'Colegio San José Obrero Marianistas',
  date = 'Octubre, 2025',
  description = 'El departamento de educación del MAM concibe el museo no como un archivo silencioso, sino como un territorio de mediación sensible, diálogo intergeneracional y experimentación creativa con las comunidades de Trujillo y el valle de Moche.',
  statement = null,
  chapters = [],
  paragraphs = [],
  sections = null,
  mediaItems = [],
  showContactForm = true,
}) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [formData, setFormData] = useState({ email: '', institucion: '' });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const scrollerRef = useRef(null);
  const mediaItemRefs = useRef([]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;

    setFeedbackMessage('Vista previa: tu mensaje no se ha enviado al museo ni se ha guardado.');
  };

  const currentMedia = mediaItems[activeMediaIndex] || mediaItems[0] || {
    src: '/assets/educacion_1.png',
    alt: 'Actividad educativa MAM',
  };

  const activeChapter = chapters && chapters[activeMediaIndex] ? chapters[activeMediaIndex] : null;

  const displayTitle = title || activeChapter?.title || 'Educación, Comunidad & Mediación Cultural';
  const displaySubtitle = activeChapter?.subtitle || subtitle;
  const displayDate = activeChapter?.date || date;
  const displayDescription = description || statement || activeChapter?.description;

  // Desplazar suavemente el scroller de imágenes al índice solicitado
  const scrollToMediaIndex = (idx) => {
    setActiveMediaIndex(idx);
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const targetEl = mediaItemRefs.current[idx];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      const h = scroller.clientHeight || 600;
      scroller.scrollTo({ top: idx * h, behavior: 'smooth' });
    }
  };

  // Manejar scroll en la columna izquierda para actualizar los dots indicadores
  const handleMediaScroll = (e) => {
    const scroller = e.currentTarget;
    const h = scroller.clientHeight;
    if (!h) return;

    const newIndex = Math.round(scroller.scrollTop / h);
    if (newIndex >= 0 && newIndex < mediaItems.length && newIndex !== activeMediaIndex) {
      setActiveMediaIndex(newIndex);
    }
  };

  const handleTitleClick = () => {
    if (mediaItems && mediaItems.length > 1) {
      const nextIdx = (activeMediaIndex + 1) % mediaItems.length;
      scrollToMediaIndex(nextIdx);
    }
  };

  const handleSectionClick = (idx) => {
    if (mediaItems && mediaItems.length > 0) {
      scrollToMediaIndex(idx % mediaItems.length);
    }
  };

  return (
    <section className={styles.splitSection} aria-label={displayTitle}>
      <div className={styles.splitContainer}>
        {/* Panel Izquierdo: Galería visual de imágenes sticky con scroller vertical independiente */}
        <aside className={styles.stickyMediaCol} aria-label="Galería visual de procesos">
          <div
            ref={scrollerRef}
            className={styles.mediaScroller}
            onScroll={handleMediaScroll}
          >
            {mediaItems && mediaItems.length > 0 ? (
              mediaItems.map((item, idx) => (
                <figure
                  key={idx}
                  ref={(el) => {
                    mediaItemRefs.current[idx] = el;
                  }}
                  className={styles.mediaItemWrap}
                >
                  <img
                    src={publicAsset(item.src)}
                    alt={item.alt || `Registro educativo ${idx + 1}`}
                    className={styles.mediaImage}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </figure>
              ))
            ) : (
              <figure className={styles.mediaItemWrap}>
                <img
                  src={publicAsset(currentMedia.src)}
                  alt={currentMedia.alt || 'Registro educativo'}
                  className={styles.mediaImage}
                  loading="eager"
                />
              </figure>
            )}
          </div>

          {/* Puntitos dentro de la imagen al lado derecho (flotantes sobre la columna izquierda) */}
          {mediaItems.length > 1 && (
            <div
              className={styles.mediaNavButtons}
              role="tablist"
              aria-label="Controles de imagen"
            >
              {mediaItems.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={activeMediaIndex === idx}
                  aria-label={`Ver imagen ${idx + 1} de ${mediaItems.length}`}
                  className={`${styles.carouselDot} ${
                    activeMediaIndex === idx ? styles.carouselDotActive : ''
                  }`}
                  onClick={() => scrollToMediaIndex(idx)}
                />
              ))}
            </div>
          )}
        </aside>

        {/* Panel Derecho: Contenedor narrativo */}
        <div className={styles.narrativeCol}>
          {sections && sections.length > 0 ? (
            sections.map((sec, idx) => (
              <article key={idx} className={styles.narrativeRow} aria-label={sec.title}>
                {/* Columna 1: EL TÍTULO, SUBTÍTULO Y FECHA */}
                <div className={styles.titleColumn}>
                  {sec.title && (
                    <h2
                      className={`${styles.sectionTitle} ${
                        mediaItems && mediaItems.length > 0 ? styles.sectionTitleInteractive : ''
                      }`}
                      onClick={() => handleSectionClick(idx)}
                      role={mediaItems && mediaItems.length > 0 ? 'button' : undefined}
                      tabIndex={mediaItems && mediaItems.length > 0 ? 0 : undefined}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSectionClick(idx);
                        }
                      }}
                      title={`Ver fotografía ${idx + 1}`}
                    >
                      {sec.title}
                    </h2>
                  )}
                  {sec.subtitle && <h3 className={styles.sectionSubtitle}>{sec.subtitle}</h3>}
                  {sec.date && <time className={styles.sectionDate}>{sec.date}</time>}
                </div>

                {/* Columna 2: DESCRIPCIÓN (El texto) */}
                <div className={styles.textColumn}>
                  {sec.description && (
                    <p className={styles.statementLead}>{sec.description}</p>
                  )}
                  {sec.statement && sec.statement !== sec.description && (
                    <p className={styles.statementLead}>{sec.statement}</p>
                  )}
                  {sec.paragraphs && sec.paragraphs.length > 0 && (
                    <div className={styles.paragraphsFlow}>
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className={styles.paragraphText}>{p}</p>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className={styles.narrativeRow}>
              {/* Columna 1: EL TÍTULO, SUBTÍTULO Y FECHA */}
              <div className={styles.titleColumn}>
                {displayTitle && (
                  <h1
                    className={`${styles.sectionTitle} ${
                      mediaItems && mediaItems.length > 0 ? styles.sectionTitleInteractive : ''
                    }`}
                    onClick={handleTitleClick}
                    role={mediaItems && mediaItems.length > 0 ? 'button' : undefined}
                    tabIndex={mediaItems && mediaItems.length > 0 ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleTitleClick();
                      }
                    }}
                    title="Ver fotografía de educación"
                  >
                    {displayTitle}
                  </h1>
                )}
                {displaySubtitle && <h2 className={styles.sectionSubtitle}>{displaySubtitle}</h2>}
                {displayDate && <time className={styles.sectionDate}>{displayDate}</time>}
              </div>

              {/* Columna 2: DESCRIPCIÓN (El texto) */}
              <div className={styles.textColumn}>
                {displayDescription && (
                  <p className={styles.statementLead}>{displayDescription}</p>
                )}

                {chapters && chapters.length > 0 && (
                  <div className={styles.chaptersFlow}>
                    {chapters.map((ch, idx) => (
                      <div
                        key={idx}
                        className={`${styles.chapterBlock} ${
                          idx === activeMediaIndex ? styles.chapterBlockActive : ''
                        }`}
                      >
                        <h3 className={styles.chapterBlockTitle}>{ch.title}</h3>
                        <p className={styles.chapterBlockText}>{ch.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {paragraphs && paragraphs.length > 0 && (
                  <div className={styles.paragraphsFlow}>
                    {paragraphs.map((p, idx) => (
                      <p key={idx} className={styles.paragraphText}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Cuadro de Contacto para Instituciones Educativas (Figma MAM TRUX / educacion_mam_interesados.png) */}
          {showContactForm && (
            <section
              className={styles.contactSection}
              aria-labelledby="educacion-contact-heading"
            >
              <div className={styles.contactContainer}>
                <h2
                  id="educacion-contact-heading"
                  className={styles.contactTitle}
                >
                  ¿Interesados en el programa educativo del MAM? Escríbenos
                </h2>

                <form
                  className={styles.contactForm}
                  onSubmit={handleContactSubmit}
                >
                  <div className={styles.formField}>
                    <label htmlFor="educacion-email" className={styles.formLabel}>
                      Correo electrónico
                    </label>
                    <input
                      id="educacion-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      required
                      className={styles.formUnderlineInput}
                      autoComplete="email"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="educacion-institucion" className={styles.formLabel}>
                      Institución educativa
                    </label>
                    <input
                      id="educacion-institucion"
                      type="text"
                      name="institucion"
                      value={formData.institucion}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, institucion: e.target.value }))
                      }
                      required
                      className={styles.formUnderlineInput}
                      autoComplete="organization"
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.formSubmitButton}
                  >
                    Enviar
                  </button>

                  {feedbackMessage && (
                    <p className={styles.formFeedbackSuccess} role="status">
                      {feedbackMessage}
                    </p>
                  )}
                </form>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}

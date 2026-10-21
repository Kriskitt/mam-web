'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import TicketModal from '../../../components/TicketModal';
import './CronogramaPost.css';

export default function CronogramaPostClient({ event, relatedEvents }) {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  return (
    <div className="cronograma-post-shell">
      {/* Header Institucional con Gradiente Verde Musgo a Lavanda (#268:1064) */}
      <Header 
        activePage="cronograma" 
        variant="cronograma" 
        onOpenTickets={() => setIsTicketModalOpen(true)}
      />

      <main className="cronograma-post-main">
        {/* Retorno contextual (#230:1253) */}
        <div className="cronograma-post-top-nav">
          <Link href="/cronograma" className="cronograma-post-back-link">
            ← CRONOGRAMA
          </Link>
        </div>

        {/* Hero Banner del Evento (#230:1176) */}
        <section className="cronograma-post-hero">
          <div className="cronograma-post-hero-info">
            <span className="cronograma-post-category-tag">
              {event.category}
            </span>
            <h1 className="cronograma-post-hero-title">
              {event.title}
            </h1>
            <p className="cronograma-post-hero-room">
              {event.room}
            </p>
          </div>

          <figure className="cronograma-post-hero-figure">
            <img 
              src={event.image} 
              alt={event.title}
              className="cronograma-post-hero-img"
            />
          </figure>
        </section>

        {/* Cuerpo Editorial Asimétrico (Sidebar + Texto Curatorial) */}
        <div className="cronograma-post-content-layout">
          {/* Barra Lateral de Metadatos y Registro (#230:1250) */}
          <aside className="cronograma-post-sidebar">
            <div className="cronograma-post-meta-group">
              <h2 className="cronograma-post-meta-label">Fecha y hora:</h2>
              <p className="cronograma-post-meta-value">{event.dateLabel}</p>
              <p className="cronograma-post-meta-value">{event.scheduleTime}</p>
            </div>

            <div className="cronograma-post-meta-group">
              <h2 className="cronograma-post-meta-label">Registro:</h2>
              <p className="cronograma-post-meta-value">
                <a href={`mailto:${event.registrationEmail}`} className="cronograma-post-meta-link">
                  {event.registrationEmail}
                </a>
              </p>
              <p className="cronograma-post-meta-value">
                <a href={`tel:${event.registrationPhone.replace(/\D/g, '')}`} className="cronograma-post-meta-link">
                  {event.registrationPhone}
                </a>
              </p>
            </div>

            <div className="cronograma-post-cta-wrap">
              <button 
                type="button"
                className="cronograma-post-register-btn"
                onClick={() => setIsTicketModalOpen(true)}
              >
                RESERVAR CUPO
              </button>
            </div>
          </aside>

          {/* Texto Curatorial Principal (#230:1199) */}
          <article className="cronograma-post-curatorial-body">
            {event.curatorialText.map((paragraph, index) => (
              <p key={index} className="cronograma-post-paragraph">
                {paragraph}
              </p>
            ))}
          </article>
        </div>

        {/* Sección Eventos Relacionados (#230:1327 y #230:1255) */}
        <section className="cronograma-post-related-section">
          <h2 className="cronograma-post-related-heading">
            EVENTOS RELACIONADOS
          </h2>

          <div className="cronograma-post-related-grid">
            {relatedEvents.map((item) => (
              <article key={item.id} className="cronograma-post-related-card">
                <Link href={`/cronograma/${item.slug}`} className="cronograma-post-related-link">
                  <figure className="cronograma-post-related-figure">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="cronograma-post-related-img"
                    />
                  </figure>
                  <div className="cronograma-post-related-info">
                    <span className="cronograma-post-related-tag">
                      {item.categoryTag}
                    </span>
                    <h3 className="cronograma-post-related-title">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Institucional con Gradiente Lavanda a Verde (#268:1080) */}
      <Footer variant="cronograma" />

      {/* Modal de Entradas / Reserva */}
      {isTicketModalOpen && (
        <TicketModal isOpen onClose={() => setIsTicketModalOpen(false)} />
      )}
    </div>
  );
}

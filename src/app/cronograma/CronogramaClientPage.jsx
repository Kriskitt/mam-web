'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TicketModal from '../../components/TicketModal';
import './CronogramaPage.css';

export default function CronogramaClientPage({ initialEvents = [], initialDays = [] }) {
  const [selectedDayId, setSelectedDayId] = useState(
    initialDays.length > 0 ? initialDays[0].id : '2025-10-02'
  );
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isDayMenuOpen, setIsDayMenuOpen] = useState(false);

  const days = initialDays.length > 0 ? initialDays : [
    { id: '2025-10-02', label: 'Miércoles, 02 Octubre', shortDate: 'Miércoles 02\nOctubre' }
  ];

  const currentDay = days.find(d => d.id === selectedDayId) || days[0];

  // Filtrar eventos por el día seleccionado
  const events = initialEvents.filter(event => event.dayId === selectedDayId);

  return (
    <div className="cronograma-page-shell">
      {/* Header Institucional con Gradiente Verde Musgo a Lavanda (#268:948) */}
      <Header 
        activePage="cronograma" 
        variant="cronograma" 
        onOpenTickets={() => setIsTicketModalOpen(true)}
      />

      <main className="cronograma-page-main">
        {/* Retorno contextual */}
        <div className="cronograma-page-top-nav">
          <Link href="/" className="cronograma-page-back-link">
            ← INICIO
          </Link>
        </div>

        {/* Título Central (#228:888) */}
        <h1 className="cronograma-page-title">
          CRONOGRAMA
        </h1>

        {/* Selector de Fecha Interactivo (#230:1031) */}
        <div className="cronograma-page-date-selector-wrapper">
          <button 
            type="button"
            className="cronograma-page-date-btn"
            onClick={() => setIsDayMenuOpen(!isDayMenuOpen)}
            aria-expanded={isDayMenuOpen}
            aria-label="Seleccionar fecha del cronograma"
          >
            <span>{currentDay.label}</span>
            <span className="cronograma-page-dropdown-arrow">▾</span>
          </button>

          {isDayMenuOpen && (
            <div className="cronograma-page-days-dropdown">
              {days.map(day => (
                <button
                  key={day.id}
                  type="button"
                  className={`cronograma-page-dropdown-item ${day.id === selectedDayId ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedDayId(day.id);
                    setIsDayMenuOpen(false);
                  }}
                >
                  {day.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bloque Principal del Día (#230:955) */}
        <section className="cronograma-page-day-section">
          {/* Columna Izquierda: Fecha (#230:965) */}
          <div className="cronograma-page-day-label-col">
            <h2 className="cronograma-page-day-heading">
              {currentDay.shortDate ? (
                currentDay.shortDate.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
              ) : (
                currentDay.label
              )}
            </h2>
          </div>

          {/* Columna Derecha: Lista de Eventos */}
          <div className="cronograma-page-events-list">
            {events.length === 0 ? (
              <p className="cronograma-page-no-events">
                No hay eventos programados para esta fecha.
              </p>
            ) : (
              events.map((event) => (
                <article key={event.id} className="cronograma-page-event-item">
                  <div className="cronograma-page-event-info">
                    <span className="cronograma-page-event-tag">
                      {event.categoryTag}
                    </span>
                    <h3 className="cronograma-page-event-title">
                      <Link href={`/cronograma/${event.slug}`} className="cronograma-page-event-link">
                        {event.title}
                      </Link>
                    </h3>
                  </div>

                  <Link href={`/cronograma/${event.slug}`} className="cronograma-page-thumbnail-link">
                    <figure className="cronograma-page-thumbnail-figure">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="cronograma-page-thumbnail-img"
                      />
                    </figure>
                  </Link>
                </article>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Footer Institucional con Gradiente Lavanda a Verde (#268:1014) */}
      <Footer variant="cronograma" />

      {/* Modal de Entradas */}
      {isTicketModalOpen && (
        <TicketModal isOpen onClose={() => setIsTicketModalOpen(false)} />
      )}
    </div>
  );
}

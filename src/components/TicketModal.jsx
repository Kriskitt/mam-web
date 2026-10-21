import React, { useState } from 'react';
import { X, Check, Calendar, CreditCard } from 'lucide-react';
import { MUSEUM_INFO } from '../data/museumInfo';
import './TicketModal.css';

export default function TicketModal({ isOpen, onClose }) {
  const [generalCount, setGeneralCount] = useState(1);
  const [studentCount, setStudentCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toLocaleDateString('en-CA'));
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const total = (generalCount * 20) + (studentCount * 10);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (total === 0) return;
    setConfirmed(true);
  };

  return (
    <div className="mam-ticket-backdrop" onClick={onClose}>
      <div className="mam-ticket-card" onClick={(e) => e.stopPropagation()}>
        <button className="mam-modal-close" onClick={onClose} aria-label="Cerrar">
          <X size={20} />
        </button>

        {!confirmed ? (
          <div>
            <div className="mam-ticket-header">
              <span className="label-caps" style={{ color: 'var(--color-gold-hover)' }}>
                BOLETERÍA DIGITAL
              </span>
              <h2 className="mam-ticket-title">Reserva de Entradas</h2>
              <p className="mam-ticket-subtitle">{MUSEUM_INFO.name}</p>
            </div>

            <form onSubmit={handleCheckout} className="mam-ticket-form">
              {/* Fecha */}
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={16} />
                  <span>Fecha de Visita</span>
                </label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={selectedDate}
                  min={new Date().toLocaleDateString('en-CA')}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>

              {/* Cantidades */}
              <div className="ticket-counter-group">
                <div className="ticket-counter-row">
                  <div>
                    <strong>Entrada General</strong>
                    <span className="price-tag">S/. 20.00 c/u</span>
                  </div>
                  <div className="counter-controls">
                    <button 
                      type="button" 
                      className="counter-btn"
                      onClick={() => setGeneralCount(Math.max(0, generalCount - 1))}
                    >-</button>
                    <span className="counter-val">{generalCount}</span>
                    <button 
                      type="button" 
                      className="counter-btn"
                      onClick={() => setGeneralCount(generalCount + 1)}
                    >+</button>
                  </div>
                </div>

                <div className="ticket-counter-row">
                  <div>
                    <strong>Estudiantes / Docentes</strong>
                    <span className="price-tag">S/. 10.00 c/u</span>
                  </div>
                  <div className="counter-controls">
                    <button 
                      type="button" 
                      className="counter-btn"
                      onClick={() => setStudentCount(Math.max(0, studentCount - 1))}
                    >-</button>
                    <span className="counter-val">{studentCount}</span>
                    <button 
                      type="button" 
                      className="counter-btn"
                      onClick={() => setStudentCount(studentCount + 1)}
                    >+</button>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="ticket-total-bar">
                <span>Total a pagar:</span>
                <strong className="total-amount">S/. {total}.00</strong>
              </div>

              <button 
                type="submit" 
                className="btn btn-gold" 
                style={{ width: '100%' }}
                disabled={total === 0}
              >
                <CreditCard size={18} />
                <span>VER RESUMEN</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="ticket-confirmation">
            <div className="confirm-icon-wrapper">
              <Check size={36} />
            </div>
            <h3 className="confirm-title">Vista previa de reserva</h3>
            <p className="confirm-msg">
              Esta simulación no reserva ni cobra entradas. Consulta disponibilidad directamente con el museo para el <strong>{selectedDate}</strong>.
            </p>
            <div className="confirm-summary">
              <div>Resumen estimado</div>
              <strong>{generalCount + studentCount} personas — Total S/. {total}.00</strong>
            </div>
            <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '1.5rem', width: '100%' }}>
              <span>LISTO, CERRAR</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

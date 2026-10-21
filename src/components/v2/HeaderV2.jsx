'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeaderV2.module.css';

/**
 * HeaderV2 — Componente de Encabezado Fiel 1:1 a Figma MAM TRUX
 * Satisface los nodos de Figma:
 * - #4153:112 (Header_whenscrolling, 1920x30px)
 * - #4243:109 (Header)
 * - #4248:243 (Header en lienzo Precolombino)
 * 
 * Distribución estricta según coordenadas de Figma:
 * - IZQUIERDA (x: 20px, y: 9px, w: 474px): 5 enlaces de navegación (EXHIBICIONES, PRECOLOMBINO, EDUCACIÓN, NOSOTROS, VISÍTANOS).
 * - CENTRO (x: 790px, y: 0px, w: 339.45px): Logotipo MAM SVG (125.45x30px) + "MUSEO DE ARTE MODERNO TRUJILLO" (11.6px).
 * - DERECHA (x: 1670px, y: 9px, w: 235px): Horario unificado oficial "Martes - Domingo | 09:00 a.m. - 06:00 p.m.".
 * 
 * @param {Object} props
 * @param {boolean} [props.isDark=false] - Tema curatorial oscuro (#452B10) para Exhibiciones/Precolombino
 * @param {boolean} [props.transparent=false] - Fondo 100% transparente para vistas inmersivas (Precolombino)
 * @param {string} [props.activePage=''] - Slug de página activa para subrayado indicador
 * @param {boolean} [props.forceScrolled=false] - Forzar estado compacto
 */
export default function HeaderV2({ isDark = false, transparent = false, activePage = '', forceScrolled = false }) {
  const [isScrolled, setIsScrolled] = useState(forceScrolled);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (forceScrolled) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [forceScrolled]);

  const headerClassNames = [
    styles.header,
    isDark ? styles.headerDark : '',
    transparent ? styles.headerTransparent : '',
    isScrolled ? styles.scrolled : '',
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClassNames} role="banner">
      <div className={styles.inner}>
        {/* COLUMNA IZQUIERDA: Navegación (#4153:101, x: 20px, y: 9px, w: 474px) */}
        <nav className={styles.navCol} aria-label="Navegación principal">
          <Link
            href="/exhibiciones"
            className={`${styles.navLink} ${activePage === 'exhibiciones' ? styles.activeLink : ''}`}
          >
            EXHIBICIONES
          </Link>
          <Link
            href="/precolombino"
            className={`${styles.navLink} ${activePage === 'precolombino' ? styles.activeLink : ''}`}
          >
            PRECOLOMBINO
          </Link>
          <Link
            href="/educacion"
            className={`${styles.navLink} ${activePage === 'educacion' ? styles.activeLink : ''}`}
          >
            EDUCACIÓN
          </Link>
          <Link
            href="/nosotros"
            className={`${styles.navLink} ${activePage === 'nosotros' ? styles.activeLink : ''}`}
          >
            NOSOTROS
          </Link>
          <Link
            href="/visitanos"
            className={`${styles.navLink} ${activePage === 'visitanos' ? styles.activeLink : ''}`}
          >
            VISÍTANOS
          </Link>
        </nav>

        {/* COLUMNA CENTRAL: Identidad Institucional MAM (#4153:107, x: 790px, w: 339.45px) */}
        <div className={styles.brandCenter}>
          <Link href="/" className={styles.brandLink} aria-label="MAM Trujillo — Inicio">
            {/* Isotipo SVG Oficial MAM (#4153:109, 125.45px x 30px) */}
            <svg
              className={styles.brandLogoSvg}
              viewBox="0 0 260 63"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M241.838 32.4807L232.406 44.1625C232.252 44.3565 231.945 44.2487 231.945 44.0116V0.387958C231.945 0.237085 231.835 0.129319 231.682 0.129319H214.068L177.94 44.4642C177.831 44.5936 177.633 44.5289 177.633 44.3565V0.387958C177.633 0.237085 177.523 0.129319 177.37 0.129319H159.536L123.672 44.5074C123.562 44.6367 123.365 44.572 123.365 44.3996V0.258638C123.365 0.107766 123.255 0 123.102 0L105.356 0.129319L69.2285 44.8522C69.1189 44.9815 68.9214 44.9169 68.9214 44.7444V0.387958C68.9214 0.237085 68.8118 0.129319 68.6582 0.129319H51.3512C51.1538 0.129319 50.9564 0.215532 50.8467 0.366404L0.0443709 62.7198C-0.0433706 62.8276 0.0443709 63 0.175983 63H17.5927C17.7901 63 17.9875 62.9138 18.0972 62.7629C18.0972 62.7629 32.5087 45.2617 37.2468 39.4424C41.5022 34.1834 54.0931 18.4064 54.0931 18.4064C54.2467 18.2125 54.5538 18.3202 54.5538 18.5573V62.3534C54.5538 62.7198 54.8389 63 55.2118 63H71.8169C72.3433 63 72.8698 62.7629 73.1988 62.3534C73.1988 62.3534 87.2594 45.1755 91.8658 39.4424C96.0555 34.248 108.405 18.622 108.405 18.622C108.515 18.4926 108.712 18.5573 108.712 18.7297V62.375C108.712 62.7414 108.997 63.0216 109.37 63.0216H125.997C126.524 63.0216 127.028 62.7845 127.379 62.375L162.52 18.8375C162.629 18.7082 162.827 18.7728 162.827 18.9453V62.375C162.827 62.7414 163.112 63.0216 163.485 63.0216H179.651C180.463 63.0216 181.209 62.6551 181.713 62.0517C181.713 62.0517 195.686 45.1108 200.27 39.4639C204.482 34.2911 216.876 18.7297 216.876 18.7297C216.985 18.6004 217.183 18.6651 217.183 18.8375V63.0431H234.007C234.819 63.0431 235.564 62.6767 236.069 62.0732L259.847 32.6315C260.198 32.2005 259.891 31.5754 259.342 31.5754L243.9 31.5539C243.11 31.5108 242.343 31.8556 241.838 32.4807Z"
                fill="currentColor"
              />
            </svg>
            <span className={styles.museumTitle}>
              MUSEO DE ARTE MODERNO TRUJILLO
            </span>
          </Link>
        </div>

        {/* COLUMNA DERECHA: Horario Oficial Unificado (#4153:100, x: 1670px, y: 9px, w: 235px) */}
        <div className={styles.scheduleCol} aria-label="Horario del Museo">
          <span>Martes - Domingo | 09:00 a.m. - 06:00 p.m.</span>
        </div>

        {/* Botón Móvil Accesible */}
        <button
          type="button"
          className={styles.mobileMenuToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-modal="true">
          <nav className={styles.mobileNavLinks}>
            <Link
              href="/exhibiciones"
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              EXHIBICIONES
            </Link>
            <Link
              href="/precolombino"
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              PRECOLOMBINO
            </Link>
            <Link
              href="/educacion"
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              EDUCACIÓN
            </Link>
            <Link
              href="/nosotros"
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              NOSOTROS
            </Link>
            <Link
              href="/visitanos"
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              VISÍTANOS
            </Link>
          </nav>
          <div className={styles.mobileSchedule}>
            <span>Martes - Domingo | 09:00 a.m. - 06:00 p.m.</span>
          </div>
        </div>
      )}
    </header>
  );
}

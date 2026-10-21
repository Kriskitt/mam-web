import React from 'react';
import Link from 'next/link';
import { publicAsset } from '../lib/sitePaths.mjs';
import './Footer.css';

export default function Footer({ isDark = false, variant = 'default' }) {
  return (
    <footer id="visitanos" className={`figma-footer ${isDark ? 'figma-footer-dark' : ''} ${variant === 'monumental' ? 'figma-footer-monumental' : ''} ${variant === 'nosotros' ? 'figma-footer-nosotros' : ''} ${variant === 'educacion' ? 'figma-footer-educacion' : ''} ${variant === 'visitanos' ? 'figma-footer-visitanos' : ''} ${variant === 'cronograma' ? 'figma-footer-cronograma' : ''}`}>
      {/* Background Gradient #148:140, monumental #265:279, nosotros #268:899, educacion #408:64, visitanos #265:148, or cronograma #268:1014 */}
      <div className={`figma-footer-gradient ${isDark ? 'gradient-dark' : ''} ${variant === 'monumental' ? 'gradient-monumental' : ''} ${variant === 'nosotros' ? 'gradient-nosotros' : ''} ${variant === 'educacion' ? 'gradient-educacion' : ''} ${variant === 'visitanos' ? 'gradient-visitanos' : ''} ${variant === 'cronograma' ? 'gradient-cronograma' : ''}`} />

      <div className="figma-footer-inner">
        {/* Column 1: Logo & Socials (x=33) */}
        <div className="footer-col-brand">
          <Link href="/" aria-label="MAM Trujillo">
            <img 
              src={publicAsset('/assets/mam-logo.svg')}
              alt="MAM - Museo de Arte Moderno Trujillo" 
              className="footer-logo-svg"
            />
          </Link>
          <img 
            src={publicAsset('/assets/social-icons.svg')}
            alt="Redes Sociales MAM" 
            className="footer-social-svg"
          />
        </div>

        {/* Column 2: Information (x=426) */}
        <div className="footer-col-info">
          <h4 className="footer-info-heading">
            MUSEO DE ARTE MODERNO TRUJILLO
          </h4>
          <div className="footer-info-details">
            <p><strong>Dirección:</strong><br />Prolongación Federico Villareal (km 3.5 vía Laredo)</p>
            <p><strong>Horarios:</strong><br />Martes ↗ Domingo<br />09:00 a.m. ↗ 06:00 p.m.</p>
            <p><strong>Contacto:</strong><br />info@mamtrujillo.pe<br />(+51) 941 709 300</p>
          </div>
        </div>

        {/* Column 3: Vertical Navbar (x=817) */}
        <nav className="footer-col-navbar" aria-label="Navegación pie de página">
          <Link href="/exhibiciones" className="footer-nav-link">EXHIBICIONES</Link>
          <Link href="/nosotros" className="footer-nav-link">NOSOTROS</Link>
          <Link href="/precolombino" className="footer-nav-link">PRECOLOMBINO</Link>
          <Link href="/cronograma" className="footer-nav-link">CRONOGRAMA</Link>
          <Link href="/educacion" className="footer-nav-link">EDUCACIÓN</Link>
          <Link href="/visitanos" className="footer-nav-link">VISÍTANOS</Link>
        </nav>

        {/* Column 4: Fundación Gerardo Chávez (x=1094) */}
        <div className="footer-col-fundacion">
          <p className="fundacion-banner-text">
            EL MUSEO DE ARTE MODERNO TRUJILLO ES UN PROYECTO DE:
          </p>
          <img 
            src={publicAsset('/assets/fundacion-logo.svg')}
            alt="Fundación Gerardo Chávez" 
            className="fundacion-logo-svg"
          />
        </div>
      </div>
    </footer>
  );
}

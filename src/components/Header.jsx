import React from 'react';
import Link from 'next/link';
import { publicAsset } from '../lib/sitePaths.mjs';
import './Header.css';

export default function Header({ isDark = false, activePage = '', variant = 'default' }) {
  return (
    <header className={`figma-header ${isDark ? 'figma-header-dark' : ''} ${variant === 'monumental' ? 'figma-header-monumental' : ''} ${variant === 'nosotros' ? 'figma-header-nosotros' : ''} ${variant === 'educacion' ? 'figma-header-educacion' : ''} ${variant === 'visitanos' ? 'figma-header-visitanos' : ''} ${variant === 'cronograma' ? 'figma-header-cronograma' : ''}`}>
      {/* Figma Gradient Background: default #1:3, or dark #164:222, monumental #204:27, nosotros #268:782, educacion #408:62, visitanos #265:212, cronograma #268:948 */}
      <div className={`figma-header-gradient ${isDark ? 'gradient-dark' : ''} ${variant === 'monumental' ? 'gradient-monumental' : ''} ${variant === 'nosotros' ? 'gradient-nosotros' : ''} ${variant === 'educacion' ? 'gradient-educacion' : ''} ${variant === 'visitanos' ? 'gradient-visitanos' : ''} ${variant === 'cronograma' ? 'gradient-cronograma' : ''}`} />

      <div className="figma-header-content">
        {/* Real Figma SVG Logo #8:39 */}
        <div className="figma-header-logo-block">
          <Link href="/" aria-label="MAM Trujillo">
            <img 
              src={publicAsset('/assets/mam-logo.svg')}
              alt="MAM - Museo de Arte Moderno Trujillo" 
              className="figma-logo-img"
            />
          </Link>
          <span className="figma-header-title">
            MUSEO DE ARTE MODERNO TRUJILLO
          </span>
        </div>

        {/* Schedule metadata #75:4 */}
        <div className="figma-header-schedule">
          <span>Martes ↗ Domingo</span>
          <span>09:00 a.m. ↗ 06:00 p.m.</span>
        </div>

        {/* 3-column x 2-row Navbar #117:378 */}
        <nav className="figma-header-navbar" aria-label="Navegación principal">
          <div className="navbar-col">
            <Link 
              href="/exhibiciones" 
              className={`navbar-link ${activePage === 'exhibiciones' ? 'active-gold' : ''}`}
            >
              EXHIBICIONES
            </Link>
            <Link 
              href="/nosotros" 
              className={`navbar-link ${activePage === 'nosotros' ? 'active-gold' : ''}`}
            >
              NOSOTROS
            </Link>
          </div>
          <div className="navbar-col">
            <Link 
              href="/precolombino" 
              className={`navbar-link ${activePage === 'precolombino' ? 'active-gold' : ''}`}
            >
              PRECOLOMBINO
            </Link>
            <Link 
              href="/cronograma" 
              className={`navbar-link ${activePage === 'cronograma' ? 'active-gold' : ''}`}
            >
              CRONOGRAMA
            </Link>
          </div>
          <div className="navbar-col">
            <Link 
              href="/educacion" 
              className={`navbar-link ${activePage === 'educacion' ? 'active-gold' : ''}`}
            >
              EDUCACIÓN
            </Link>
            <Link 
              href="/visitanos" 
              className={`navbar-link ${activePage === 'visitanos' ? 'active-gold' : ''}`}
            >
              VISÍTANOS
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

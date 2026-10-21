import React from 'react';
import HomeV2 from '../components/v2/home/HomeV2';


export const metadata = {
  title: 'MAM — Museo de Arte Moderno y Precolombino de Trujillo | Fundación Gerardo Chávez',
  description: 'Primer museo descentralizado de arte contemporáneo y colecciones precolombinas del norte peruano. Fundado por el maestro Gerardo Chávez en Huanchaco, Trujillo.',
};

/**
 * Página Principal del Museo MAM (Rediseño v2)
 * Grounded en el lienzo oficial de Figma MAM TRUX (wFrnaKfyEl6fDL6yIFEuiB, #4022:66).
 */
export default function HomePage() {
  return <HomeV2 />;
}

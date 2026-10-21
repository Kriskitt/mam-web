import React from 'react';
import PrecolombinoViewer from '../../components/v2/precolombino/PrecolombinoViewer';


export const metadata = {
  title: 'Pabellón Precolombino | MAM — Museo de Arte Moderno y Precolombino de Trujillo',
  description: 'Colección milenaria de más de 5000 piezas arqueológicas moche, chimú, cupisnique y chancay. Fundación Gerardo Chávez, Trujillo, Perú.',
};

/**
 * Vista Inmersiva del Pabellón Precolombino (Rediseño v2)
 * Grounded en el nodo oficial de Figma MAM TRUX (wFrnaKfyEl6fDL6yIFEuiB, #4248:222).
 */
export default function PrecolombinoPage() {
  return <PrecolombinoViewer />;
}

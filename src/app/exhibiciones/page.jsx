import React from 'react';
import HeaderV2 from '../../components/v2/HeaderV2';
import FooterV2 from '../../components/v2/FooterV2';
import AmigosBadge from '../../components/v2/AmigosBadge';
import CuratorialExhibitionGrid from '../../components/v2/exhibiciones/CuratorialExhibitionGrid';
import { ROOMS_LIST_V2 } from '../../data/v2/roomsV2Data';

export const metadata = {
  title: 'Circuito de Exhibiciones | MAM — Museo de Arte Moderno y Precolombino',
  description: 'Explora el circuito curatorial de salas permanentes, contemporáneas y arqueológicas del Museo de Arte Moderno de Trujillo — Fundación Gerardo Chávez.',
};

/**
 * ExhibicionesPage — Vista General de Exhibiciones V2 (Figma #4262:609, 1920x3873)
 */
export default function ExhibicionesPage() {
  return (
    <div style={{ backgroundColor: '#452B10', minHeight: '100vh' }}>
      <HeaderV2 isDark={true} activePage="exhibiciones" />
      <main id="main-content">
        <CuratorialExhibitionGrid rooms={ROOMS_LIST_V2} />
      </main>
      <AmigosBadge />
      <FooterV2 />
    </div>
  );
}

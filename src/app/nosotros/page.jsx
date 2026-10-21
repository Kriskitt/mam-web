import React from 'react';
import HeaderV2 from '../../components/v2/HeaderV2';
import FooterV2 from '../../components/v2/FooterV2';
import AmigosBadge from '../../components/v2/AmigosBadge';
import ChavezHomenajeSection from '../../components/v2/nosotros/ChavezHomenajeSection';


export const metadata = {
  title: 'Nosotros & Fundación Gerardo Chávez | MAM Trujillo',
  description: 'Conoce la historia del Museo de Arte Moderno y Precolombino de Trujillo y el legado fundacional del maestro Gerardo Chávez (1937–2025).',
};

/**
 * NosotrosPage — Vista de Nosotros y Fundación Gerardo Chávez V2 (Figma #4248:282)
 */
export default function NosotrosPage() {
  return (
    <div style={{ backgroundColor: 'var(--mam2-bg-light, #F9F6F3)', minHeight: '100vh' }}>
      <HeaderV2 isDark={false} activePage="nosotros" />
      <main id="main-content">
        <ChavezHomenajeSection />
      </main>
      <AmigosBadge />
      <FooterV2 />
    </div>
  );
}

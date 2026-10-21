import React from 'react';
import HeaderV2 from '../../components/v2/HeaderV2';
import FooterV2 from '../../components/v2/FooterV2';
import AmigosBadge from '../../components/v2/AmigosBadge';
import VisitanosContent from '../../components/v2/visitanos/VisitanosContent';


export const metadata = {
  title: 'Visítanos, Horarios & Tarifas | MAM Trujillo',
  description: 'Planifica tu visita al Museo de Arte Moderno y Precolombino de Trujillo. Horarios oficiales, tarifas de admisión, mapa y servicios.',
};

/**
 * VisitanosPage — Vista Oficial de Visítanos V2 (Figma #4271:908)
 */
export default function VisitanosPage() {
  return (
    <div style={{ backgroundColor: 'var(--mam2-bg-light, #F9F6F3)', minHeight: '100vh' }}>
      <HeaderV2 isDark={false} activePage="visitanos" />
      <main id="main-content">
        <VisitanosContent />
      </main>
      <AmigosBadge />
      <FooterV2 />
    </div>
  );
}

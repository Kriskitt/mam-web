import React from 'react';
import { notFound } from 'next/navigation';
import SalaSingleView from '../../../components/v2/salas/SalaSingleView';
import { ROOMS_V2_DATA } from '../../../data/v2/roomsV2Data';
export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(ROOMS_V2_DATA)
    .filter((slug) => slug !== 'precolombino')
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseRoom = ROOMS_V2_DATA[slug];

  if (!baseRoom) {
    return {
      title: 'Sala no encontrada | MAM Trujillo',
    };
  }

  return {
    title: `${baseRoom.name} — ${baseRoom.exhibitionTitle} | MAM Trujillo`,
    description: baseRoom.curatorialIntro,
  };
}

/**
 * SalaSlugPage — Página Dinámica de Sala Individual V2 (Figma #4203:239)
 */
export default async function SalaSlugPage({ params }) {
  const { slug } = await params;
  const baseRoom = ROOMS_V2_DATA[slug];

  if (!baseRoom) {
    notFound();
  }

  return <SalaSingleView sala={baseRoom} />;
}

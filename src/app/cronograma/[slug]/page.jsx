import React from 'react';
import { notFound } from 'next/navigation';
import { CRONOGRAMA_EVENTS, getEventBySlug, getRelatedEvents } from '../../../data/cronogramaData';
import CronogramaPostClient from './CronogramaPostClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  return CRONOGRAMA_EVENTS.map(event => ({
    slug: event.slug
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: 'Evento no encontrado | MAM'
    };
  }

  return {
    title: `${event.title} | Cronograma MAM`,
    description: event.curatorialText?.[0] || 'Evento del Museo de Arte Moderno de Trujillo.'
  };
}

export default async function CronogramaPostPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const relatedEvents = getRelatedEvents(event.slug);

  return (
    <CronogramaPostClient event={event} relatedEvents={relatedEvents} />
  );
}

import React from 'react';
import { CRONOGRAMA_EVENTS, CRONOGRAMA_DAYS } from '../../data/cronogramaData';
import CronogramaClientPage from './CronogramaClientPage';

export const metadata = {
  title: 'Cronograma | MAM — Museo de Arte Moderno de Trujillo',
  description: 'Explora la programación de actividades, conferencias, talleres y recorridos mediados en el MAM.'
};

export default function CronogramaPage() {
  return (
    <CronogramaClientPage 
      initialEvents={CRONOGRAMA_EVENTS}
      initialDays={CRONOGRAMA_DAYS}
    />
  );
}

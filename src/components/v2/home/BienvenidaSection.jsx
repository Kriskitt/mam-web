import React from 'react';
import styles from './BienvenidaSection.module.css';

/**
 * BienvenidaSection — Declaración Editorial Monumental Fiel 1:1 a Figma MAM TRUX
 * Satisface el nodo de Figma #4022:188 (1887x295px, tipografía Anko Trial 45px).
 * 
 * Texto curatorial oficial e inmutable del diseño Figma:
 * "Les damos la bienvenida al Museo de Arte Moderno de Trujillo (MAM) proyecto central dentro del conglomerado cultural que articula la Fundación Gerardo Chávez. Desde la creación de la primera Bienal de Arte de Trujillo en 1983, Chávez buscó brindar a su tierra de nacimiento un espacio donde su misión de vida por perseguir la belleza se expandiera por fuera de los límites de sus obras plásticas y se encaminara en el desarrollo de una propuesta cultural a favor de la descentralización del arte en el Perú."
 */
export default function BienvenidaSection() {
  return (
    <section className={styles.section} aria-label="Bienvenida al Museo de Arte Moderno">
      <div className={styles.inner}>
        <p className={styles.statementText}>
          Les damos la bienvenida al Museo de Arte Moderno de Trujillo (MAM) proyecto central dentro del conglomerado cultural que articula la Fundación Gerardo Chávez. Desde la creación de la primera Bienal de Arte de Trujillo en 1983, Chávez buscó brindar a su tierra de nacimiento un espacio donde su misión de vida por perseguir la belleza se expandiera por fuera de los límites de sus obras plásticas y se encaminara en el desarrollo de una propuesta cultural a favor de la descentralización del arte en el Perú.
        </p>
      </div>
    </section>
  );
}

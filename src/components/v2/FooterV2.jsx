import React from 'react';
import Link from 'next/link';
import { publicAsset } from '../../lib/sitePaths.mjs';
import styles from './FooterV2.module.css';

/**
 * FooterV2 — Pie de Página Curatorial Fiel 1:1 a Figma MAM TRUX
 * Satisface el nodo de Figma #4120:62 (1920x174px, fondo #452B10, texto #F9F6F3).
 * 
 * Distribución oficial de 4 columnas en 1920px:
 * - Col 1 (x: 20px, y: 71px): Dirección física "Prolongación Federico Villareal (km 3.5 vía Laredo)"
 * - Col 2 (x: 398px, y: 71px): Contacto institucional "info@mamtrujillo.pe / (+51) 941 709 300"
 * - Col 3 (x: 830px, y: 33px): Isotipo MAM + "MUSEO DE ARTE MODERNO TRUJILLO" + Redes Sociales SVG
 * - Col 4 (x: 1419px, y: 29px): "EL MUSEO DE ARTE MODERNO TRUJILLO ES UN PROYECTO DE:" + Logo Fundación Gerardo Chávez
 */
export default function FooterV2({ homeVariant = false }) {
  return (
    <footer
      className={`${styles.footer} ${homeVariant ? styles.homeFooter : ''}`}
      data-home-variant={homeVariant ? 'true' : undefined}
      role="contentinfo"
    >
      <div className={styles.inner}>
        {/* Col 1: Dirección Física (#4120:110) */}
        <div className={styles.addressCol}>
          <p className={styles.footerText}>
            Prolongación Federico Villareal<br />
            (km 3.5 vía Laredo)
          </p>
        </div>

        {/* Col 2: Correo y Teléfono Institucional (#4179:193) */}
        <div className={styles.contactCol}>
          <p className={styles.footerText}>
            <a href="mailto:info@mamtrujillo.pe" className={styles.footerLink}>
              info@mamtrujillo.pe
            </a>
            <br />
            <a href="tel:+51941709300" className={styles.footerLink}>
              (+51) 941 709 300
            </a>
          </p>
        </div>

        {/* Col 3: Identidad Institucional Central + Redes (#4120:93, #4120:108, #4120:102) */}
        <div className={styles.brandCenterCol}>
          <Link href="/" className={styles.logoLink} aria-label="MAM Trujillo — Inicio">
            <svg
              className={styles.mamLogoSvg}
              viewBox="0 0 260 63"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M241.838 32.4807L232.406 44.1625C232.252 44.3565 231.945 44.2487 231.945 44.0116V0.387958C231.945 0.237085 231.835 0.129319 231.682 0.129319H214.068L177.94 44.4642C177.831 44.5936 177.633 44.5289 177.633 44.3565V0.387958C177.633 0.237085 177.523 0.129319 177.37 0.129319H159.536L123.672 44.5074C123.562 44.6367 123.365 44.572 123.365 44.3996V0.258638C123.365 0.107766 123.255 0 123.102 0L105.356 0.129319L69.2285 44.8522C69.1189 44.9815 68.9214 44.9169 68.9214 44.7444V0.387958C68.9214 0.237085 68.8118 0.129319 68.6582 0.129319H51.3512C51.1538 0.129319 50.9564 0.215532 50.8467 0.366404L0.0443709 62.7198C-0.0433706 62.8276 0.0443709 63 0.175983 63H17.5927C17.7901 63 17.9875 62.9138 18.0972 62.7629C18.0972 62.7629 32.5087 45.2617 37.2468 39.4424C41.5022 34.1834 54.0931 18.4064 54.0931 18.4064C54.2467 18.2125 54.5538 18.3202 54.5538 18.5573V62.3534C54.5538 62.7198 54.8389 63 55.2118 63H71.8169C72.3433 63 72.8698 62.7629 73.1988 62.3534C73.1988 62.3534 87.2594 45.1755 91.8658 39.4424C96.0555 34.248 108.405 18.622 108.405 18.622C108.515 18.4926 108.712 18.5573 108.712 18.7297V62.375C108.712 62.7414 108.997 63.0216 109.37 63.0216H125.997C126.524 63.0216 127.028 62.7845 127.379 62.375L162.52 18.8375C162.629 18.7082 162.827 18.7728 162.827 18.9453V62.375C162.827 62.7414 163.112 63.0216 163.485 63.0216H179.651C180.463 63.0216 181.209 62.6551 181.713 62.0517C181.713 62.0517 195.686 45.1108 200.27 39.4639C204.482 34.2911 216.876 18.7297 216.876 18.7297C216.985 18.6004 217.183 18.6651 217.183 18.8375V63.0431H234.007C234.819 63.0431 235.564 62.6767 236.069 62.0732L259.847 32.6315C260.198 32.2005 259.891 31.5754 259.342 31.5754L243.9 31.5539C243.11 31.5108 242.343 31.8556 241.838 32.4807Z"
                fill="#F9F6F3"
              />
            </svg>
            <span className={styles.brandTitleText}>
              MUSEO DE ARTE MODERNO TRUJILLO
            </span>
          </Link>
          <div className={styles.socialWrapper}>
            <img
              src={publicAsset('/assets/social-icons.svg')}
              alt="Redes Sociales MAM"
              className={styles.socialIconsImg}
            />
          </div>
        </div>

        {/* Col 4: Fundación Gerardo Chávez (#4177:138) */}
        <div className={styles.fundacionCol}>
          <p className={styles.projectNotice}>
            EL MUSEO DE ARTE MODERNO TRUJILLO ES UN PROYECTO DE:
          </p>
        </div>

        {/* Col 5: Fundación Gerardo Chávez (#4177:138) */}
        <div className={styles.fundacionCol}>
          <div className={styles.fundacionLogoWrapper}>
            <img
              src={publicAsset('/assets/fundacion-logo.svg')}
              alt="Fundación Gerardo Chávez"
              className={styles.fundacionLogoImg}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

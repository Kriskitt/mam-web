import './globals.css';
import ScrollToTop from '../components/ScrollToTop';

export const metadata = {
  title: 'MAM — Museo de Arte Moderno de Trujillo | Fundación Gerardo Chávez',
  description: 'Portal oficial del Museo de Arte Moderno de Trujillo (MAM). Exhibiciones permanentes, temporales y Pabellón Precolombino.',
  keywords: 'MAM Trujillo, Museo Arte Moderno Trujillo, Gerardo Chávez, Pabellón Precolombino, arte contemporáneo Perú',
  openGraph: {
    title: 'MAM — Museo de Arte Moderno de Trujillo',
    description: 'Portal oficial del Museo de Arte Moderno de Trujillo (MAM). Exhibiciones permanentes, temporales y Pabellón Precolombino.',
    type: 'website',
    locale: 'es_PE'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}

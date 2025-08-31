import { useState, useEffect } from 'react';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import LocomotiveScrollProvider from '../components/providers/locomotive-scroll-provider';
import ProperPageTransition from '../components/ProperPageTransition';
import PageTransition from '../components/PageTransition';
import ContactModal from '../components/models/ContactModal';
import MenuModal from '../components/models/menu';
import { ContactModalProvider, useContactModal } from '../contexts/ContactModalContext';
import { MouseFollowerProvider } from '../contexts/MouseFollowerContext';
import '../app/globals.css';

function AppContent({ Component, pageProps }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isContactOpen, closeContactModal } = useContactModal();

  // Prevent scrolling ONLY when contact modal is open (not menu)
  useEffect(() => {
    if (isContactOpen && !menuOpen) {
      // Disable scrolling on html and body
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
    } else if (!isContactOpen) {
      // Re-enable scrolling only if contact modal is closed
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
    }

    return () => {
      if (!menuOpen) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.documentElement.style.height = '';
        document.body.style.height = '';
      }
    };
  }, [isContactOpen, menuOpen]);

  return (
    <>
      <PageTransition>
        <ProperPageTransition>
          {/* Main wrapper with push effect matching modal width */}
          <div className={`transition-transform duration-700 ease-in-out ${
            isContactOpen ? 'transform -translate-x-full md:-translate-x-[480px] lg:-translate-x-[550px]' : 'transform translate-x-0'
          }`}>
            {/* Dark overlay with smooth fade in/out */}
            <div 
              className={`fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-700 ${
                isContactOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            />
            
            {/* Navbar inside transform so it moves with the page */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200 }}>
              <Navbar onMenuToggle={setMenuOpen} isMenuOpen={menuOpen} setIsMenuOpen={setMenuOpen} />
            </div>

            {/* Main content */}
            <LocomotiveScrollProvider>
              <Component {...pageProps} />
              <Footer />
            </LocomotiveScrollProvider>
          </div>
        </ProperPageTransition>
      </PageTransition>

      {/* Menu Modal - outside transform so it doesn't move */}
      <MenuModal isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={closeContactModal} 
      />
    </>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <ContactModalProvider>
      <MouseFollowerProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </MouseFollowerProvider>
    </ContactModalProvider>
  );
}
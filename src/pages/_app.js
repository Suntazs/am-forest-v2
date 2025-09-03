import { useState, useEffect } from 'react';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import LocomotiveScrollProvider from '../components/providers/locomotive-scroll-provider';
import SimplePageTransition from '../components/SimplePageTransition';
import PageTransition from '../components/PageTransition';
import ContactModal from '../components/models/ContactModal';
import MenuModal from '../components/models/menu';
import { ContactModalProvider, useContactModal } from '../contexts/ContactModalContext';
import { MouseFollowerProvider } from '../contexts/MouseFollowerContext';
import { PageTransitionProvider } from '../contexts/PageTransitionContext';
import '../app/globals.css';

function AppContent({ Component, pageProps }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isContactOpen, closeContactModal } = useContactModal();

  // Prevent scrolling ONLY when contact modal is open (not menu)
  useEffect(() => {
    if (isContactOpen && !menuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Disable scrolling without moving the body
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'relative';
      
      // Store scroll position
      document.body.dataset.modalScrollY = scrollY;
    } else if (!isContactOpen) {
      // Re-enable scrolling only if contact modal is closed
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      
      // Restore scroll if needed
      const savedScrollY = document.body.dataset.modalScrollY;
      if (savedScrollY) {
        window.scrollTo(0, parseInt(savedScrollY));
        delete document.body.dataset.modalScrollY;
      }
    }

    return () => {
      if (!menuOpen) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
      }
    };
  }, [isContactOpen, menuOpen]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <PageTransition>
        <SimplePageTransition>
          {/* Main wrapper with push effect matching modal width */}
          <div className={`relative transition-transform duration-700 ease-in-out bg-[#faf6ed] ${
            isContactOpen ? 'transform -translate-x-full md:-translate-x-[480px] lg:-translate-x-[550px]' : 'transform translate-x-0'
          }`}>
            {/* Navbar inside transform so it moves with the page */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200 }}>
              <Navbar onMenuToggle={setMenuOpen} isMenuOpen={menuOpen} setIsMenuOpen={setMenuOpen} />
            </div>

            {/* Main content */}
            <LocomotiveScrollProvider>
              <Component {...pageProps} />
              <Footer />
            </LocomotiveScrollProvider>
            
            {/* Dark overlay that slides with the page */}
            <div 
              className={`fixed inset-0 bg-black/50 z-[100] pointer-events-none ${
                isContactOpen ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transition: isContactOpen ? 'opacity 700ms 200ms' : 'opacity 700ms',
              }}
            />
          </div>
        </SimplePageTransition>
      </PageTransition>

      {/* Menu Modal - outside transform so it doesn't move */}
      <MenuModal isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={closeContactModal} 
      />
    </div>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <PageTransitionProvider>
      <ContactModalProvider>
        <MouseFollowerProvider>
          <AppContent Component={Component} pageProps={pageProps} />
        </MouseFollowerProvider>
      </ContactModalProvider>
    </PageTransitionProvider>
  );
}
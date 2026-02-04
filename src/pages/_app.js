import { useState, useEffect, useLayoutEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
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
  const [shouldApplyTransform, setShouldApplyTransform] = useState(false);
  const { isContactOpen, closeContactModal } = useContactModal();

  // Disable browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Handle transform application - sync with contact modal
  // useLayoutEffect ensures transform is applied BEFORE browser paint (same frame as modal)
  useLayoutEffect(() => {
    if (isContactOpen) {
      // Immediately apply transform when opening - same frame as modal
      setShouldApplyTransform(true);
    }
  }, [isContactOpen]);

  // Handle cleanup after close animation (can use regular useEffect)
  useEffect(() => {
    if (!isContactOpen && shouldApplyTransform) {
      // Keep transform during close animation, then remove after 700ms
      const timer = setTimeout(() => {
        setShouldApplyTransform(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isContactOpen, shouldApplyTransform]);

  // Calculate transform value based on screen size
  const getTransformValue = () => {
    if (typeof window === 'undefined') return 'translateX(-100%)';
    const width = window.innerWidth;
    if (width >= 1024) return 'translateX(-550px)';
    if (width >= 768) return 'translateX(-480px)';
    return 'translateX(-100%)';
  };

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

  // Determine styles - only apply transform when needed
  const getWrapperStyle = () => {
    if (!shouldApplyTransform) {
      // No transform at all - fixes mobile navbar fixed positioning
      return undefined;
    }
    
    // Apply transform with transition - exact same as ContactModal
    return {
      transform: isContactOpen ? getTransformValue() : 'translateX(0)',
      transition: 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#faf6ed' }}>
      <PageTransition>
        <SimplePageTransition>
          {/* Main wrapper with push effect matching modal width */}
          {/* CRITICAL: Only apply transform when contact modal is OPEN or CLOSING */}
          {/* When fully closed, NO transform = navbar fixed positioning works on mobile */}
          <div 
            className="relative bg-[#faf6ed]"
            style={getWrapperStyle()}
          >
            {/* Navbar inside - slides with page when contact modal opens */}
            <Navbar onMenuToggle={setMenuOpen} isMenuOpen={menuOpen} setIsMenuOpen={setMenuOpen} />

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
                transition: 'opacity 700ms cubic-bezier(0.4, 0, 0.2, 1)',
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

function MyApp({ Component, pageProps }) {
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

export default appWithTranslation(MyApp);
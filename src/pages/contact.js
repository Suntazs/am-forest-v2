import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useContactModal } from '../contexts/ContactModalContext';
import { usePageTransition } from '../contexts/PageTransitionContext';
import { useEffect, useRef } from 'react';

export default function ContactPage() {
  const { t } = useTranslation('common');
  const { openContactModal } = useContactModal();
  const { animationsEnabled } = usePageTransition();
  const iframeRef = useRef(null);

  return (
    <div className="h-screen w-screen bg-[#faf6ed] flex pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-[calc(100vh-5rem)]">
          {/* Left side - Google Maps */}
          <div className="w-full h-full">
            <iframe
              ref={iframeRef}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2178.5!2d21.9667!3d56.9667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fa4dce1b8b6f2d%3A0x0!2sĒdoles%20iela%2056%2C%20Kuldīga%2C%20LV-3301!5e0!3m2!1sen!2slv!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, opacity: animationsEnabled ? 1 : 0, transition: 'opacity 0.6s ease-out' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Right side - Company Info */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-0">
            <div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#243c36] mb-8">
                SIA "AM FOREST"
              </h1>
              
              <div className="space-y-3 text-lg lg:text-xl text-[#243c36]/80">
                <p>
                  <span className="font-semibold">{t('contact.pvnLabel')}</span> LV40103347835
                </p>
                <p>
                  <span className="font-semibold">{t('contact.addressLabel')}</span> Ēdoles iela 56, Kuldīga, LV-3301
                </p>
                <p>
                  <span className="font-semibold">{t('contact.codeLabel')}</span> NDEALV2X
                </p>
                <p>
                  <span className="font-semibold">{t('contact.accountLabel')}</span> LV55 NDEA 0000 0833 9152 9
                </p>
                <div className="pt-4 space-y-2">
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:info@amforest.lv" className="hover:text-[#243c36] transition-colors">
                      info@amforest.lv
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+37125622269" className="hover:text-[#243c36] transition-colors">
                      +371 25622269
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-xl lg:text-2xl text-[#243c36]/70 mb-8 leading-relaxed">
                {t('contact.description')}
              </p>
              
              <button
                onClick={openContactModal}
                className="inline-block px-10 py-5 bg-[#243c36] text-white rounded-full font-medium text-lg lg:text-xl hover:bg-[#1e3029] transition-all duration-300 transform hover:scale-105"
              >
                {t('contact.button')}
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
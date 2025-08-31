'use client';
import React, { createContext, useContext, useState } from 'react';

const ContactModalContext = createContext();

export function ContactModalProvider({ children }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContactModal = () => setIsContactOpen(true);
  const closeContactModal = () => setIsContactOpen(false);

  return (
    <ContactModalContext.Provider value={{ 
      isContactOpen, 
      openContactModal, 
      closeContactModal 
    }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal must be used within ContactModalProvider');
  }
  return context;
}
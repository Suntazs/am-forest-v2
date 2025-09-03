import { createContext, useContext, useState, useEffect } from 'react';

const PageTransitionContext = createContext({
  isTransitioning: false,
  animationsEnabled: true,
  setIsTransitioning: () => {},
  setAnimationsEnabled: () => {},
});

export function PageTransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    if (isTransitioning) {
      setAnimationsEnabled(false);
    }
  }, [isTransitioning]);

  return (
    <PageTransitionContext.Provider 
      value={{ 
        isTransitioning, 
        animationsEnabled,
        setIsTransitioning,
        setAnimationsEnabled
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  return context;
}
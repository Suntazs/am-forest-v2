import { createContext, useContext, useState, useEffect } from 'react';

const PageTransitionContext = createContext({
  isTransitioning: false,
  animationsEnabled: true,
  transitionComplete: false,
  setIsTransitioning: () => {},
  setAnimationsEnabled: () => {},
  setTransitionComplete: () => {},
});

export function PageTransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  // Check if we've already seen the intro animation
  const hasVisited = typeof window !== 'undefined' && sessionStorage.getItem('hasVisited');
  const [transitionComplete, setTransitionComplete] = useState(!!hasVisited); // Start as true if already visited

  useEffect(() => {
    if (isTransitioning) {
      setAnimationsEnabled(false);
      setTransitionComplete(false);
    }
  }, [isTransitioning]);

  return (
    <PageTransitionContext.Provider 
      value={{ 
        isTransitioning, 
        animationsEnabled,
        transitionComplete,
        setIsTransitioning,
        setAnimationsEnabled,
        setTransitionComplete
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
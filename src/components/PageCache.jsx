"use client";
import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';

const PageCacheContext = createContext({});

export function PageCacheProvider({ children }) {
  const [cache, setCache] = useState({});
  const pathname = usePathname();
  
  return (
    <PageCacheContext.Provider value={{ cache, setCache, pathname }}>
      {children}
    </PageCacheContext.Provider>
  );
}

export function usePageCache() {
  return useContext(PageCacheContext);
}

export function CachedPage({ children }) {
  const { cache, setCache, pathname } = usePageCache();
  const contentRef = useRef(null);
  const [isActive, setIsActive] = useState(true);
  
  useEffect(() => {
    // Store the current page in cache
    if (contentRef.current && isActive) {
      setCache(prev => ({
        ...prev,
        [pathname]: {
          content: contentRef.current,
          timestamp: Date.now()
        }
      }));
    }
  }, [pathname, isActive, setCache]);
  
  useEffect(() => {
    // Check if this is the active page
    setIsActive(true);
    return () => setIsActive(false);
  }, [pathname]);
  
  return (
    <div ref={contentRef} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
}
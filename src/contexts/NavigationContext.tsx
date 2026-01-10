import { createContext, useContext, useState, ReactNode } from 'react';

type PageRoute = '/' | '/chat' | '/features' | '/downloads' | '/docs' | '/pricing' | '/about' | '/agreement' | '/training' | '/configuration' | '/mission' | '/qrcodehub';

interface NavigationContextType {
  currentPage: PageRoute;
  navigate: (path: PageRoute) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageRoute>('/');

  const navigate = (path: PageRoute) => {
    setCurrentPage(path);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}

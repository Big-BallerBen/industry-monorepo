import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type ThemeMode = 'dark' | 'light';
type UserRole = 'staff' | 'venue' | 'promoter';

interface ThemeContextType {
  mode: ThemeMode;
  role: UserRole;
  toggleMode: () => void;
  setRole: (role: UserRole) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeWrapper');
  }
  return context;
};

export const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [role, setRole] = useState<UserRole>('staff');

  useEffect(() => {
    if (location.pathname.startsWith('/venue')) {
      setRole('venue');
    } else if (location.pathname.startsWith('/staff')) {
      setRole('staff');
    } else if (location.pathname.startsWith('/promoter')) {
      setRole('promoter');
    }
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.remove(
      'theme-staff-dark', 'theme-staff-light',
      'theme-venue-dark', 'theme-venue-light'
    );
    
    // Promoter shares venue colors (blue)
    const themeRole = role === 'promoter' ? 'venue' : role;
    const themeClass = `theme-${themeRole}-${mode}`;
    
    document.body.classList.add(themeClass);
    
    // Also toggle standard tailwind 'dark' class
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode, role]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ mode, role, toggleMode, setRole }}>
      {children}
    </ThemeContext.Provider>
  );
};
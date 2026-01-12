import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  // Simplified theme context - now just provides consistent context structure
  // All styling is handled through CSS variables
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = {};

  return (
    <ThemeContext.Provider value={value}>
      <div className="portfolio-theme">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
// ThemeContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  const [theme, setTheme] = useState(getPreferredTheme());

useEffect(() => {
  document.body.setAttribute('color-theme', theme);
  localStorage.setItem('theme', theme);
}, [theme]);
const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  console.log('Toggling theme from', theme, 'to', newTheme);
  setTheme(newTheme);
};

  // Log specific state and function
  console.log('ThemeProvider:', { theme, toggleTheme });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ThemeToggleButton.js
import React from 'react';
import { IonToggle } from '@ionic/react';
import { useTheme } from './ThemeContext'; // Adjust path as needed

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Get the current theme and the toggle function

  const handleToggleChange = (event: CustomEvent) => {
    toggleTheme(); // Call the toggleTheme function from context
  };

  return (
    <IonToggle
      aria-label="Dark toggle"
      color="primary"
      checked={theme === 'dark'} // Set checked based on the current theme
      onIonChange={handleToggleChange} // Call the handler on change
    />
  );
};

export default ThemeToggleButton;

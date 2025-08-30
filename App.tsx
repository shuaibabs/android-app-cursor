/**
 * Urban Company App Clone
 * React Native App with Navigation
 * Based on the official Urban Company (formerly UrbanClap) app
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';

// Theme context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: {
    backgroundColor: string;
    cardBackground: string;
    textPrimary: string;
    textSecondary: string;
    primaryColor: string;
    borderColor: string;
    shadowColor: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

function App() {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme configuration
  const theme = {
    backgroundColor: isDarkMode ? '#1C1C1E' : '#F8F9FA',
    cardBackground: isDarkMode ? '#2C2C2E' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1C1C1E',
    textSecondary: isDarkMode ? '#8E8E93' : '#8E8E93',
    primaryColor: '#FF6B35',
    borderColor: isDarkMode ? '#3A3A3C' : '#E5E5EA',
    shadowColor: isDarkMode ? '#000000' : '#000000',
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeContextValue: ThemeContextType = {
    isDarkMode,
    toggleDarkMode,
    theme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <SafeAreaProvider>
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
          backgroundColor={isDarkMode ? '#1C1C1E' : '#FFFFFF'}
        />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}

export default App;

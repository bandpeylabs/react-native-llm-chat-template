import { useColorScheme, Platform } from 'react-native';
import { lightTheme, darkTheme, Theme } from '../constants/theme';

export function useTheme(): Theme {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}

export function useIsDarkMode(): boolean {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark';
}

// Helper function to create web-safe elevation styles
export function getWebSafeElevation(elevation: any) {
  if (Platform.OS === 'web') {
    // On web, only use basic shadow properties
    return {
      shadowColor: elevation.shadowColor,
      shadowOffset: elevation.shadowOffset,
      shadowOpacity: elevation.shadowOpacity,
      shadowRadius: elevation.shadowRadius,
    };
  }
  return elevation;
}

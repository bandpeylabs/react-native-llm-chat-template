import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, Theme } from '../constants/theme';

export function useTheme(): Theme {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}

export function useIsDarkMode(): boolean {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark';
}

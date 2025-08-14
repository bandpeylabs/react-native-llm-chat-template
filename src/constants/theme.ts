// Material Design Theme System
export const palette = {
  primary: {
    lighter: '#CCF4FE',
    light: '#68CDF9',
    main: '#078DEE',
    dark: '#0351AB',
    darker: '#012972',
  },
  secondary: {
    lighter: '#EFD6FF',
    light: '#C684FF',
    main: '#8E33FF',
    dark: '#5119B7',
    darker: '#27097A',
  },
  info: {
    lighter: '#CAFDF5',
    light: '#61F3F3',
    main: '#00B8D9',
    dark: '#006C9C',
    darker: '#003768',
    contrastText: '#FFFFFF',
  },
  success: {
    lighter: '#D3FCD2',
    light: '#77ED8B',
    main: '#22C55E',
    dark: '#118D57',
    darker: '#065E49',
  },
  warning: {
    lighter: '#FFF5CC',
    light: '#FFD666',
    main: '#FFAB00',
    dark: '#B76E00',
    darker: '#7A4100',
  },
  error: {
    lighter: '#FFE9D5',
    light: '#FFAC82',
    main: '#FF5630',
    dark: '#B71D18',
    darker: '#7A0916',
  },
  grey: {
    50: '#FCFDFD',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#1C252E',
    900: '#141A21',
  },
};

// Material Design spacing system (8px base unit)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Material Design border radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Material Design elevation (shadows) - Web compatible
export const elevation = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Typography scale (Material Design) - Web compatible
export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: '600' as const,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '500' as const,
    lineHeight: 28,
  },
  h5: {
    fontSize: 18,
    fontWeight: '500' as const,
    lineHeight: 24,
  },
  h6: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
};

// Light theme
export const lightTheme = {
  colors: {
    primary: palette.primary.main,
    primaryLight: palette.primary.light,
    primaryDark: palette.primary.dark,
    secondary: palette.secondary.main,
    secondaryLight: palette.secondary.light,
    secondaryDark: palette.secondary.dark,
    background: palette.grey[50],
    surface: '#FFFFFF',
    surfaceVariant: palette.grey[100],
    text: {
      primary: palette.grey[800],
      secondary: palette.grey[600],
      disabled: palette.grey[500],
      inverse: '#FFFFFF',
    },
    border: palette.grey[300],
    divider: palette.grey[200],
    error: palette.error.main,
    success: palette.success.main,
    warning: palette.warning.main,
    info: palette.info.main,
  },
  spacing,
  borderRadius,
  elevation,
  typography,
};

// Dark theme
export const darkTheme = {
  colors: {
    primary: palette.primary.light,
    primaryLight: palette.primary.lighter,
    primaryDark: palette.primary.main,
    secondary: palette.secondary.light,
    secondaryLight: palette.secondary.lighter,
    secondaryDark: palette.secondary.main,
    background: palette.grey[900],
    surface: palette.grey[800],
    surfaceVariant: palette.grey[700],
    text: {
      primary: palette.grey[100],
      secondary: palette.grey[400],
      disabled: palette.grey[600],
      inverse: palette.grey[900],
    },
    border: palette.grey[700],
    divider: palette.grey[600],
    error: palette.error.light,
    success: palette.success.light,
    warning: palette.warning.light,
    info: palette.info.light,
  },
  spacing,
  borderRadius,
  elevation,
  typography,
};

export type Theme = typeof lightTheme;

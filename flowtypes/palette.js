type Palette = {
  dark: string,
  light: string,
  main: string,
  contrastText: string
};

export type Theme = {
  breakpoints: {},
  mixins: {},
  overides: {},
  props: {},
  palette: {
    primary: Palette,
    secondary: Palette
  },
  shadows: {},
  spacing: { unit: number },
  transitions: {},
  typography: {},
  zIndex: {}
};

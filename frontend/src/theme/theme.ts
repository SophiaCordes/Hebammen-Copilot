import { Palettes, ThemeName } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { Sizes } from '../constants/sizes';
import { getFontSize, Typography } from '../constants/typography';

// Create a mapping of themes
export const themes = {
  classicViolet: {
    colors: Palettes.classicViolet,
    spacing: Spacing,
    sizes: Sizes,
    getFontSize,
    typography: Typography,
  },
  warmSage: {
    colors: Palettes.warmSage,
    spacing: Spacing,
    sizes: Sizes,
    getFontSize,
    typography: Typography,
  },
  oceanBreeze: {
    colors: Palettes.oceanBreeze,
    spacing: Spacing,
    sizes: Sizes,
    getFontSize,
    typography: Typography,
  },
  slateDark: {
    colors: Palettes.slateDark,
    spacing: Spacing,
    sizes: Sizes,
    getFontSize,
    typography: Typography,
  },
  blossomPink: {
    colors: Palettes.blossomPink,
    spacing: Spacing,
    sizes: Sizes,
    getFontSize,
    typography: Typography,
  },
  vibrantPink: {
    colors: Palettes.vibrantPink,
    spacing: Spacing,
    sizes: Sizes,
    getFontSize,
    typography: Typography,
  },
  softTurquoise: {
    colors: Palettes.softTurquoise,
    spacing: Spacing,
    sizes: Sizes,
    getFontSize,
    typography: Typography,
  },
};

// Default theme for static types and initial values
export const theme = themes.classicViolet;

export type ThemeType = typeof theme;
export default theme;

import { Dimensions, Platform } from 'react-native';

export const getFontSize = (
  type: 'title' | 'big' | 'section' | 'body' | 'small',
  customWidth?: number
): number => {
  const width = customWidth ?? Dimensions.get('window').width;
  const isMobile = width <= 600;
  
  switch (type) {
    case 'title':
      return isMobile ? 20 : 26;
    case 'big':
      return isMobile ? 18 : 20;
    case 'section':
      return isMobile ? 15 : 17;
    case 'body':
      return isMobile ? 16 : 18;
    case 'small':
      return isMobile ? 13.5 : 15;
    default:
      return isMobile ? 16 : 18;
  }
};

export const FontFamilies = {
  PlusJakartaSans: {
    web: 'Plus Jakarta Sans',
    default: 'System',
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  },
  Outfit: {
    web: 'Outfit',
    default: 'System',
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap',
  },
  Inter: {
    web: 'Inter',
    default: 'System',
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  },
  Rubik: {
    web: 'Rubik',
    default: 'System',
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap',
  },
};

export type FontFamilyKey = keyof typeof FontFamilies;

export const Typography = {
  fontFamily: Platform.select({
    web: 'Plus Jakarta Sans',
    default: 'System',
  })!,
  letterSpacing: {
    title: -0.02, // tighter letter-spacing looks more premium on modern geometric fonts
    section: 0,
    body: 0,
    small: 0,
  },
  lineHeight: 1.5,
};

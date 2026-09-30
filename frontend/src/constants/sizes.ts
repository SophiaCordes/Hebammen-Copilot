import { Platform } from 'react-native';

export const Sizes = {
  radius: 16,
  radiusSm: 10,
  
  // React Native shadows mapping
  shadow: Platform.select({
    ios: {
      shadowColor: '#1A1A2E',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow: '0 1px 3px rgba(26, 26, 46, 0.06), 0 4px 16px rgba(26, 26, 46, 0.07)',
    },
  }),
  
  shadowRaised: Platform.select({
    ios: {
      shadowColor: '#1A1A2E',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
    },
    android: {
      elevation: 8,
    },
    web: {
      boxShadow: '0 4px 12px rgba(26, 26, 46, 0.10), 0 12px 32px rgba(26, 26, 46, 0.12)',
    },
  }),
};

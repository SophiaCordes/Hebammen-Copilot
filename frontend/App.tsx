import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Platform } from 'react-native';
import { themes } from './src/theme/theme';
import { useAppStore } from './src/store/store';
import { FontFamilies } from './src/constants/typography';
import RootNavigator from './src/navigation/RootNavigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const themeName = useAppStore((state) => state.themeName);
  const fontFamilyKey = useAppStore((state) => state.fontFamilyKey);

  React.useEffect(() => {
    if (Platform.OS === 'web' && fontFamilyKey) {
      const activeFont = FontFamilies[fontFamilyKey];
      if (activeFont && activeFont.googleFontUrl) {
        const linkId = `google-font-${fontFamilyKey}`;
        if (!document.getElementById(linkId)) {
          const link = document.createElement('link');
          link.id = linkId;
          link.rel = 'stylesheet';
          link.href = activeFont.googleFontUrl;
          document.head.appendChild(link);
        }
      }
    }
  }, [fontFamilyKey]);

  React.useEffect(() => {
    if (Platform.OS === 'web') {
      const activeThemeColors = currentTheme.colors;
      const styleId = 'midwife-app-dynamic-styles';
      let styleElement = document.getElementById(styleId) as HTMLStyleElement;
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }
      
      styleElement.innerHTML = `
        /* Interactive Cards */
        [data-class="interactive-card"] {
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        [data-class="interactive-card"]:hover {
          transform: translateY(-2px) !important;
          border-color: ${activeThemeColors.lineStrong} !important;
          box-shadow: 0px 8px 24px rgba(26, 26, 46, 0.08) !important;
        }

        /* Buttons */
        [data-class^="premium-btn"] {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        [data-class^="premium-btn"]:hover {
          transform: translateY(-1px) !important;
        }
        [data-class="premium-btn-primary"]:hover {
          background-color: ${activeThemeColors.accentPress} !important;
          box-shadow: 0px 4px 12px ${activeThemeColors.accentSoft} !important;
        }
        [data-class="premium-btn-secondary"]:hover {
          background-color: ${activeThemeColors.accentSoft} !important;
        }
        [data-class="premium-btn-danger"]:hover {
          opacity: 0.95 !important;
          box-shadow: 0px 4px 12px ${activeThemeColors.redSoft} !important;
        }
        [data-class="premium-btn-ghost"]:hover {
          background-color: ${activeThemeColors.accentSoft} !important;
        }
        [data-class^="premium-btn"]:active {
          transform: translateY(0px) scale(0.98) !important;
        }

        /* Input Focus Glows */
        [data-class="input-wrapper-glow"] {
          transition: all 0.2s ease-in-out !important;
        }
        [data-class="input-wrapper-glow"][data-focused="true"]:not([data-error="true"]) {
          box-shadow: 0px 0px 0px 3px ${activeThemeColors.accentSoft} !important;
          border-color: ${activeThemeColors.accent} !important;
        }
        [data-class="input-wrapper-glow"][data-focused="true"][data-error="true"] {
          box-shadow: 0px 0px 0px 3px ${activeThemeColors.redSoft} !important;
          border-color: ${activeThemeColors.red} !important;
        }

        /* Banners Slide Down */
        [data-class="banner-container"] {
          animation: bannerSlideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
        }
        @keyframes bannerSlideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Theme Toggle Circles */
        [data-class="theme-toggle-circle"] {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        [data-class="theme-toggle-circle"]:hover {
          transform: scale(1.15) !important;
        }
        [data-class="theme-toggle-circle"]:active {
          transform: scale(0.95) !important;
        }

        /* Lang Toggle Buttons */
        [data-class^="lang-toggle-btn"] {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        [data-class^="lang-toggle-btn"]:hover:not([data-class$="-active"]) {
          background-color: rgba(0, 0, 0, 0.04) !important;
        }
        [data-class^="lang-toggle-btn"]:active {
          transform: scale(0.96) !important;
        }

      `;
    }
  }, [themeName, fontFamilyKey]);

  const themeTemplate = themes[themeName] || themes.classicViolet;
  const activeFontFamily = Platform.select({
    web: FontFamilies[fontFamilyKey]?.web || 'Plus Jakarta Sans',
    default: 'System',
  })!;

  const currentTheme = {
    ...themeTemplate,
    typography: {
      ...themeTemplate.typography,
      fontFamily: activeFontFamily,
    },
  };
  const statusBarStyle = themeName === 'slateDark' ? 'light' : 'dark';

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={currentTheme}>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style={statusBarStyle} />
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

import React from 'react';
import styled from 'styled-components/native';
import { useAppStore } from '../../store/store';
import { ThemeName } from '../../constants/colors';

export const ThemeToggle: React.FC = () => {
  const themeName = useAppStore((state) => state.themeName);
  const setThemeName = useAppStore((state) => state.setThemeName);

  const themeOptions: Array<{ name: ThemeName; color: string; label: string }> = [
    { name: 'classicViolet', color: '#5B4FD6', label: 'Violet' },
    { name: 'warmSage', color: '#1E6B65', label: 'Sage' },
    { name: 'oceanBreeze', color: '#0E7490', label: 'Ocean' },
    { name: 'slateDark', color: '#9F92EC', label: 'Dark' },
    { name: 'blossomPink', color: '#C86984', label: 'Blossom' },
    { name: 'vibrantPink', color: '#FF6BB5', label: 'Vibrant' },
    { name: 'softTurquoise', color: '#4BC3C6', label: 'Turquoise' },
  ];

  return (
    <Container>
      {themeOptions.map((opt) => (
        <ThemeCircle
          key={opt.name}
          color={opt.color}
          active={themeName === opt.name}
          onPress={() => setThemeName(opt.name)}
          accessibilityRole="button"
          accessibilityLabel={`Switch to ${opt.label} theme`}
          {...({ dataSet: { class: 'theme-toggle-circle' } } as any)}
        >
          {themeName === opt.name && <InnerDot color={opt.name === 'slateDark' ? '#12121E' : '#FFFFFF'} />}
        </ThemeCircle>
      ))}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => props.theme.colors.accentSoft};
  padding: 4px 8px;
  border-radius: 999px;
`;

interface ThemeCircleProps {
  color: string;
  active: boolean;
}

const ThemeCircle = styled.TouchableOpacity<ThemeCircleProps>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${(props) => props.color};
  align-items: center;
  justify-content: center;
  border-width: ${(props) => (props.active ? '2px' : '0px')};
  border-color: ${(props) => (props.active ? props.theme.colors.card : 'transparent')};
  shadow-color: '#000';
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 1.5px;
  elevation: 2;
`;

const InnerDot = styled.View<{ color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${(props) => props.color};
`;

export default ThemeToggle;

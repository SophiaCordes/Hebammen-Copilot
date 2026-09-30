import React from 'react';
import styled from 'styled-components/native';
import { useAppStore } from '../../store/store';
import { FontFamilyKey } from '../../constants/typography';

export const FontToggle: React.FC = () => {
  const fontFamilyKey = useAppStore((state) => state.fontFamilyKey);
  const setFontFamilyKey = useAppStore((state) => state.setFontFamilyKey);

  const fontOptions: Array<{ key: FontFamilyKey; label: string }> = [
    { key: 'PlusJakartaSans', label: 'Jakarta' },
    { key: 'Outfit', label: 'Outfit' },
    { key: 'Inter', label: 'Inter' },
    { key: 'Rubik', label: 'Rubik' },
  ];

  const handleToggle = () => {
    const currentIndex = fontOptions.findIndex(f => f.key === fontFamilyKey);
    const nextIndex = (currentIndex + 1) % fontOptions.length;
    setFontFamilyKey(fontOptions[nextIndex].key);
  };

  const currentLabel = fontOptions.find(f => f.key === fontFamilyKey)?.label || 'Jakarta';

  return (
    <Container onPress={handleToggle} activeOpacity={0.75} accessibilityRole="button" accessibilityLabel={`Change font style, current is ${currentLabel}`}>
      <AaText>Aa</AaText>
      <FontNameText>{currentLabel}</FontNameText>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  background-color: ${(props) => props.theme.colors.accentSoft};
  padding: 4px 10px;
  border-radius: 999px;
  height: 32px;
`;

const AaText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 13px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.accent};
`;

const FontNameText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.inkSoft};
`;

export default FontToggle;

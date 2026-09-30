import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from '../../hooks/useTranslation';

interface LangToggleProps {
  style?: any;
}

export const LangToggle: React.FC<LangToggleProps> = ({ style }) => {
  const { language, setLanguage } = useTranslation();

  return (
    <Container style={style} accessibilityRole="tablist" accessibilityLabel="Language Switcher">
      <LangButton
        active={language === 'de'}
        onPress={() => setLanguage('de')}
        accessibilityRole="tab"
        accessibilityState={{ selected: language === 'de' }}
        accessibilityLabel="Deutsch"
        {...({ dataSet: { class: `lang-toggle-btn ${language === 'de' ? 'lang-toggle-btn-active' : ''}` } } as any)}
      >
        <LangButtonText active={language === 'de'}>DE</LangButtonText>
      </LangButton>
      <LangButton
        active={language === 'en'}
        onPress={() => setLanguage('en')}
        accessibilityRole="tab"
        accessibilityState={{ selected: language === 'en' }}
        accessibilityLabel="English"
        {...({ dataSet: { class: `lang-toggle-btn ${language === 'en' ? 'lang-toggle-btn-active' : ''}` } } as any)}
      >
        <LangButtonText active={language === 'en'}>EN</LangButtonText>
      </LangButton>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.line};
  border-radius: 999px;
  padding: 2px;
  align-self: center;
`;

interface LangButtonProps {
  active: boolean;
}

const LangButton = styled.TouchableOpacity<LangButtonProps>`
  min-width: 38px;
  height: 30px;
  padding-horizontal: 11px;
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  
  ${(props) => {
    if (props.active) {
      return `
        background-color: ${props.theme.colors.card};
        shadow-color: '#1A1A2E';
        shadow-offset: 0px 1px;
        shadow-opacity: 0.18;
        shadow-radius: 2px;
        elevation: 1;
      `;
    }
    return 'background-color: transparent;';
  }}
`;

interface LangButtonTextProps {
  active: boolean;
}

const LangButtonText = styled.Text<LangButtonTextProps>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.26px;
  
  ${(props) => {
    if (props.active) {
      return `color: ${props.theme.colors.accent};`;
    }
    return `color: ${props.theme.colors.inkSoft};`;
  }}
`;
export default LangToggle;

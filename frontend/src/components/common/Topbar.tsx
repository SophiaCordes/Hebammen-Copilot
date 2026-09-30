import React from 'react';
import { Image, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';
import { useAppStore } from '../../store/store';
import { useTranslation } from '../../hooks/useTranslation';
import LangToggle from './LangToggle';
import ThemeToggle from './ThemeToggle';
import FontToggle from './FontToggle';
import Svg, { Path, Line } from 'react-native-svg';

const APP_LOGO = require('../../../assets/logo.png');

interface TopbarProps {
  style?: any;
}

export const Topbar: React.FC<TopbarProps> = ({ style }) => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 540;
  const currentTheme = useTheme();

  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const { t } = useTranslation();

  return (
    <Container style={style}>
      <BrandContainer>
        <Image
          source={APP_LOGO}
          style={{ width: isMobile ? 30 : 34, height: isMobile ? 26 : 29 }}
          resizeMode="contain"
        />
        {!isMobile && <BrandName>Midwife App</BrandName>}
      </BrandContainer>

      <RightControls>
        <LangToggle />

        {user && (
          <>
            <Separator />
            <LogoutButton
              onPress={logout}
              accessibilityRole="button"
              accessibilityLabel={t('app.logout')}
            >
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                  stroke={currentTheme.colors.inkSoft}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M16 17l5-5-5-5"
                  stroke={currentTheme.colors.inkSoft}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Line
                  x1="21"
                  y1="12"
                  x2="9"
                  y2="12"
                  stroke={currentTheme.colors.inkSoft}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Svg>
              {!isMobile && <LogoutText>{t('common.logout')}</LogoutText>}
            </LogoutButton>

            <AvatarButton
              accessibilityRole="button"
              accessibilityLabel={t('app.profileAria')}
            >
              <AvatarText>{user.initials}</AvatarText>
            </AvatarButton>
          </>
        )}
      </RightControls>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-vertical: 0px;
  height: 60px;
  padding-horizontal: 20px;
  background-color: ${(props) => props.theme.colors.card};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.line};
  z-index: 50;
`;

const BrandContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const BrandName = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 19px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.accent};
  letter-spacing: -0.19px;
`;

const RightControls = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Separator = styled.View`
  width: 1px;
  height: 24px;
  background-color: ${(props) => props.theme.colors.line};
  margin-horizontal: 2px;
`;

const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding-horizontal: 10px;
  border-radius: 8px;
`;

const LogoutText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.inkSoft};
`;

const AvatarButton = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.accent};
  background-color: ${(props) => props.theme.colors.accentSoft};
  align-items: center;
  justify-content: center;
`;

const AvatarText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.accent};
`;

export default Topbar;

import React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useTranslation } from '../../hooks/useTranslation';
import { useAppStore } from '../../store/store';
import { Routes } from '../../constants/routes';
import Banner from '../../components/common/Banner';
import Svg, { Path, Circle } from 'react-native-svg';

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t, language } = useTranslation();
  const { width } = useWindowDimensions();
  const isMobile = width <= 600;
  const isTablet = width > 600 && width <= 960;
  const currentTheme = useTheme();

  const appState = useAppStore((state) => state.appState);
  const user = useAppStore((state) => state.user);
  const patients = useAppStore((state) => state.patients);
  const setActivePatient = useAppStore((state) => state.setActivePatient);
  const offlineQueueCount = useAppStore((state) => state.offlineQueueCount);

  const midwifeName = user?.fullName || 'Demo User';
  const midwifeInitials = user?.username || 'demo';

  const activeCount = patients.filter((p) => p.status === 'running' || p.status === 'open').length;
  const completedCount = patients.filter((p) => p.status === 'closed').length;

  const currentDateString = new Date().toLocaleDateString(
    language === 'de' ? 'de-DE' : 'en-US',
    { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  );

  return (
    <Container>
      {appState === 'offline' && (
        <OfflineBanner
          variant="offline"
          message={`${t('banner.offline')} ${t('banner.offlineQueue').replace('3', String(offlineQueueCount))}`}
          icon={
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <Path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12M5 12a10.94 10.94 0 0 1 2.28-.94M8.54 8.54A7 7 0 0 1 12 8a7 7 0 0 1 3.46.54M12 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" stroke="#B26A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          }
        />
      )}

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        <MainContainer isMobile={isMobile}>

          {/* Welcome Header */}
          <HeaderRow>
            <GreetingSection>
              <GreetingText isMobile={isMobile}>
                {language === 'de' ? `Hallo, ${midwifeName}` : `Hello, ${midwifeName}`}
              </GreetingText>
              <DateText>{currentDateString}</DateText>
            </GreetingSection>

            <CredentialBadge>
              <BadgeDot />
              <BadgeText>{midwifeInitials.toUpperCase()}</BadgeText>
            </CredentialBadge>
          </HeaderRow>

          {/* Summary Cards Row */}
          <SummaryGrid isMobile={isMobile}>
            {/* Active Cases */}
            <SummaryCard isMobile={isMobile} isTablet={isTablet} borderColor="#E0DBFC" shadowColor="#5B4FD6">
              <SummaryDecorCircle bg="#5B4FD6" />
              <SummaryIconWrapper bg="#5B4FD6">
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <Circle cx="12" cy="8" r="4" stroke="#FFFFFF" strokeWidth="2" />
                  <Path d="M4 21a8 8 0 0 1 16 0" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                </Svg>
              </SummaryIconWrapper>
              <SummaryBody>
                <SummaryValue isMobile={isMobile}>{activeCount}</SummaryValue>
                <SummaryLabel>{language === 'de' ? 'Aktive Fälle' : 'Active Cases'}</SummaryLabel>
              </SummaryBody>
            </SummaryCard>

            {/* Completed Cases */}
            <SummaryCard isMobile={isMobile} isTablet={isTablet} borderColor="#D1FAE5" shadowColor="#2ECC71">
              <SummaryDecorCircle bg="#2ECC71" />
              <SummaryIconWrapper bg="#2ECC71">
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <Circle cx="12" cy="8" r="4" stroke="#FFFFFF" strokeWidth="2" />
                  <Path d="M4 21a8 8 0 0 1 16 0" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  <Path d="M7 12l3 3 5-5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </SummaryIconWrapper>
              <SummaryBody>
                <SummaryValue isMobile={isMobile}>{completedCount}</SummaryValue>
                <SummaryLabel>{language === 'de' ? 'Abgeschlossene Fälle' : 'Completed Cases'}</SummaryLabel>
              </SummaryBody>
            </SummaryCard>
          </SummaryGrid>

          {/* Primary Action Cards Container */}
          <SectionLabel>{language === 'de' ? 'Aktionen' : 'Actions'}</SectionLabel>
          <ActionsGrid isMobile={isMobile}>
            {/* Start Dictation */}
            <ActionCard
              onPress={() => navigation.navigate(Routes.SELECT_PATIENT, { returnTo: Routes.HOME })}
              activeOpacity={0.85}
              isMobile={isMobile}
              bg="#F5F3FF"
              borderColor="#E0DBFC"
              shadowColor="#5B4FD6"
            >
              <CornerDecorCircle bg="#5B4FD6" />
              <ActionIconWrapper bg={currentTheme.colors.accent}>
                <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <Path d="M12 2a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" fill="#FFFFFF" />
                  <Path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </ActionIconWrapper>
              <ActionTextContainer>
                <ActionTitle isMobile={isMobile}>
                  {language === 'de' ? 'Diktat starten' : 'Start Dictation'}
                </ActionTitle>
                <ActionSubtitle isMobile={isMobile}>
                  {language === 'de' ? 'Aufnahme für eine Patientin beginnen' : 'Begin a recording for a patient'}
                </ActionSubtitle>
              </ActionTextContainer>
            </ActionCard>

            {/* Documentation */}
            <ActionCard
              onPress={() => {
                // Auto-select the first patient before navigating
                const firstPatient = patients[0];
                if (firstPatient) setActivePatient(firstPatient);
                navigation.navigate(Routes.HOME);
              }}
              activeOpacity={0.85}
              isMobile={isMobile}
              bg="#F0FDF4"
              borderColor="#D1FAE5"
              shadowColor="#2ECC71"
            >
              <CornerDecorCircle bg="#2ECC71" />
              <ActionIconWrapper bg="#2ECC71">
                <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <Path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <Path d="M13 3h-2a1 1 0 0 0-1 1v1h4V4a1 1 0 0 0-1-1z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <Path d="M9 12h6M9 16h4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                </Svg>
              </ActionIconWrapper>
              <ActionTextContainer>
                <ActionTitle isMobile={isMobile}>
                  {language === 'de' ? 'Dokumentation' : 'Documentation'}
                </ActionTitle>
                <ActionSubtitle isMobile={isMobile}>
                  {language === 'de' ? 'Fall anzeigen' : 'View case'}
                </ActionSubtitle>
              </ActionTextContainer>
            </ActionCard>
          </ActionsGrid>




        </MainContainer>
      </ScrollView>
    </Container>
  );
};

/* ─── Styled Components ─────────────────────────────────────────────────── */

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg};
`;

const OfflineBanner = styled(Banner)`
  border-radius: 0px;
`;

const MainContainer = styled.View<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin-horizontal: auto;
  padding-vertical: 28px;
  padding-horizontal: ${(props) => (props.isMobile ? '16px' : '24px')};
  gap: 28px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const GreetingSection = styled.View`
  flex-direction: column;
  gap: 4px;
`;

const GreetingText = styled.Text<{ isMobile?: boolean }>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => (props.isMobile ? '20px' : '28px')};
  font-weight: 800;
  color: ${(props) => props.theme.colors.ink};
  letter-spacing: -0.5px;
`;

const DateText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.inkSoft};
`;

const CredentialBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => props.theme.colors.card};
  border-width: 1.5px;
  border-color: ${(props) => props.theme.colors.line};
  border-radius: 999px;
  padding-vertical: 6px;
  padding-horizontal: 14px;
`;

const BadgeDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.accent};
`;

const BadgeText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 13.5px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.ink};
  letter-spacing: 0.5px;
`;

const SummaryGrid = styled.View<{ isMobile: boolean }>`
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  gap: 16px;
  width: 100%;
`;

const SummaryCard = styled.View<{ isMobile: boolean; isTablet: boolean; borderColor: string; shadowColor: string }>`
  flex: ${(props) => (props.isMobile ? 'none' : '1')};
  width: ${(props) => (props.isMobile ? '100%' : 'auto')};
  flex-direction: row;
  align-items: center;
  gap: 18px;
  background-color: #FFFFFF;
  border-width: 1.5px;
  border-color: ${(props) => props.borderColor};
  border-radius: 16px;
  padding: ${(props) => (props.isMobile ? '20px 18px' : '24px 22px')};
  shadow-color: ${(props) => props.shadowColor};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 10px;
  elevation: 2;
  position: relative;
  overflow: hidden;
`;

const SummaryDecorCircle = styled.View<{ bg: string }>`
  position: absolute;
  top: -25px;
  right: -25px;
  width: 90px;
  height: 90px;
  border-radius: 45px;
  background-color: ${(props) => props.bg};
  opacity: 0.05;
  z-index: 1;
`;

const SummaryIconWrapper = styled.View<{ bg: string }>`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background-color: ${(props) => props.bg};
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 5;
`;

const SummaryBody = styled.View`
  flex-direction: column;
  gap: 2px;
  z-index: 5;
`;

const SummaryValue = styled.Text<{ isMobile?: boolean }>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => (props.isMobile ? '26px' : '32px')};
  font-weight: 800;
  color: #1A1A2E;
`;

const SummaryLabel = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 13.5px;
  font-weight: 600;
  color: #6B6B80;
`;

const ActionsGrid = styled.View<{ isMobile: boolean }>`
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  gap: 16px;
  width: 100%;
`;

const SectionLabel = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.inkSoft};
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-bottom: 4px;
`;

const ActionCard = styled.TouchableOpacity<{ isMobile: boolean; bg: string; borderColor: string; shadowColor: string }>`
  flex: ${(props) => (props.isMobile ? 'none' : '1')};
  width: ${(props) => (props.isMobile ? '100%' : 'auto')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  background-color: ${(props) => props.bg};
  border-width: 1.5px;
  border-color: ${(props) => props.borderColor};
  border-radius: ${(props) => props.theme.sizes.radius + 6}px;
  padding: ${(props) => (props.isMobile ? '28px 16px' : '40px 24px')};
  shadow-color: ${(props) => props.shadowColor};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.07;
  shadow-radius: 12px;
  elevation: 3;
  position: relative;
  overflow: hidden;
`;

const CornerDecorCircle = styled.View<{ bg: string }>`
  position: absolute;
  top: -45px;
  right: -45px;
  width: 140px;
  height: 140px;
  border-radius: 70px;
  background-color: ${(props) => props.bg};
  opacity: 0.08;
`;


const ActionIconWrapper = styled.View<{ bg: string }>`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background-color: ${(props) => props.bg};
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 4px;
`;

const ActionTextContainer = styled.View`
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const ActionTitle = styled.Text<{ isMobile?: boolean }>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => (props.isMobile ? '16px' : '18px')};
  font-weight: 800;
  color: ${(props) => props.theme.colors.ink};
  text-align: center;
`;

const ActionSubtitle = styled.Text<{ isMobile?: boolean }>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => (props.isMobile ? '13px' : '14px')};
  font-weight: 600;
  color: ${(props) => props.theme.colors.inkSoft};
  text-align: center;
  line-height: 18px;
`;

export default HomeScreen;


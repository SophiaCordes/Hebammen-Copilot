import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { ChevronLeftIcon } from '../../../assets/icons';

interface SubbarProps {
  title: string;
  subtitle?: string;
  onBackPress: () => void;
  rightElement?: React.ReactNode;
  style?: any;
}

export const Subbar: React.FC<SubbarProps> = ({
  title,
  subtitle,
  onBackPress,
  rightElement,
  style,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 600;
  const currentTheme = useTheme();

  return (
    <Container style={style} isMobile={isMobile}>
      <BackTapButton onPress={onBackPress} accessibilityRole="button" accessibilityLabel="Back">
        <ChevronLeftIcon width={20} height={20} color={currentTheme.colors.ink} />
      </BackTapButton>
      
      <TitleContainer>
        <TitleText isMobile={isMobile} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </TitleText>
        {subtitle && (
          <SubtitleText numberOfLines={1} ellipsizeMode="tail">
            {subtitle}
          </SubtitleText>
        )}
      </TitleContainer>

      {rightElement && (
        <RightContainer isMobile={isMobile}>
          {rightElement}
        </RightContainer>
      )}
    </Container>
  );
};

const Container = styled.View<{ isMobile: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 14px;
  padding-top: 24px;
  padding-bottom: 8px;
  padding-horizontal: ${(props) => (props.isMobile ? '14px' : '20px')};
  background-color: transparent;
  z-index: 50;
  max-width: 1000px;
  width: 100%;
  margin-horizontal: auto;
`;

const BackTapButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const TitleContainer = styled.View`
  flex: 1;
  min-width: 0;
`;

interface TitleTextProps {
  isMobile: boolean;
}

const TitleText = styled.Text<TitleTextProps>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => (props.isMobile ? 18 : 22)}px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.ink};
  letter-spacing: -0.21px;
`;

const SubtitleText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.inkSoft};
  margin-top: 1px;
`;

interface RightContainerProps {
  isMobile: boolean;
}

const RightContainer = styled.View<RightContainerProps>`
  flex-direction: row;
  align-items: center;
  gap: ${(props) => (props.isMobile ? 8 : 12)}px;
  flex-shrink: 0;
`;

export default Subbar;

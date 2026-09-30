import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  icon,
  style,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 540;
  const height = isMobile ? 52 : 56;

  return (
    <Container
      onPress={onPress}
      disabled={disabled}
      variant={variant}
      height={height}
      style={style}
      activeOpacity={0.85}
      {...({ dataSet: { class: `premium-btn premium-btn-${variant}` } } as any)}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <ButtonText variant={variant} disabled={disabled}>
        {title}
      </ButtonText>
    </Container>
  );
};

interface ContainerProps {
  variant: ButtonVariant;
  height: number;
  disabled: boolean;
}

const Container = styled.TouchableOpacity<ContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: ${(props) => props.height}px;
  padding-horizontal: 28px;
  border-radius: ${(props) => props.theme.sizes.radiusSm}px;
  margin-vertical: 4px;
  
  ${(props) => {
    if (props.disabled) {
      return `
        background-color: ${props.theme.colors.line};
        border-width: 0px;
      `;
    }

    switch (props.variant) {
      case 'secondary':
        return `
          background-color: ${props.theme.colors.card};
          border-width: 2px;
          border-color: ${props.theme.colors.accent};
        `;
      case 'danger':
        return `
          background-color: ${props.theme.colors.red};
          border-width: 0px;
        `;
      case 'ghost':
        return `
          background-color: transparent;
          border-width: 0px;
        `;
      case 'primary':
      default:
        return `
          background-color: ${props.theme.colors.accent};
          border-width: 0px;
        `;
    }
  }}
`;

interface TextProps {
  variant: ButtonVariant;
  disabled: boolean;
}

const ButtonText = styled.Text<TextProps>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  
  ${(props) => {
    if (props.disabled) {
      return `color: ${props.theme.colors.inkSoft};`;
    }

    switch (props.variant) {
      case 'secondary':
      case 'ghost':
        return `color: ${props.theme.colors.accent};`;
      case 'danger':
      case 'primary':
      default:
        return 'color: #FFFFFF;';
    }
  }}
`;

const IconWrapper = styled.View`
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`;
export default Button;

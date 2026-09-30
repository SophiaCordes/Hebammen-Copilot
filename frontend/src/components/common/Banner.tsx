import React from 'react';
import styled from 'styled-components/native';

export type BannerVariant = 'offline' | 'amber' | 'error';

interface BannerProps {
  message: string;
  variant?: BannerVariant;
  icon?: React.ReactNode;
  style?: any;
}

export const Banner: React.FC<BannerProps> = ({
  message,
  variant = 'offline',
  icon,
  style,
}) => {
  return (
    <Container variant={variant} style={style} {...({ dataSet: { class: 'banner-container' } } as any)}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <BannerText variant={variant}>{message}</BannerText>
    </Container>
  );
};

interface ContainerProps {
  variant: BannerVariant;
}

const Container = styled.View<ContainerProps>`
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  padding-vertical: 14px;
  padding-horizontal: 18px;
  border-radius: ${(props) => props.theme.sizes.radiusSm}px;
  width: 100%;
  
  ${(props) => {
    switch (props.variant) {
      case 'amber':
        return `background-color: ${props.theme.colors.amberSoft};`;
      case 'error':
        return `background-color: ${props.theme.colors.redSoft};`;
      case 'offline':
      default:
        return 'background-color: #EFEFF6;';
    }
  }}
`;

interface TextProps {
  variant: BannerVariant;
}

const BannerText = styled.Text<TextProps>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.getFontSize('body')}px;
  font-weight: 500;
  line-height: 22px;
  flex: 1;
  
  ${(props) => {
    switch (props.variant) {
      case 'amber':
        return `color: ${props.theme.colors.amber};`;
      case 'error':
        return `color: ${props.theme.colors.red};`;
      case 'offline':
      default:
        return `color: ${props.theme.colors.ink};`;
    }
  }}
`;

const IconWrapper = styled.View`
  margin-top: 2px;
  align-items: center;
  justify-content: center;
`;
export default Banner;

import React from 'react';
import styled from 'styled-components/native';

export type ChipVariant = 'amber' | 'red' | 'green' | 'violet' | 'neutral';

interface ChipProps {
  label: string;
  variant?: ChipVariant;
  icon?: React.ReactNode;
  style?: any;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'neutral',
  icon,
  style,
}) => {
  return (
    <Container variant={variant} style={style}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <ChipText variant={variant}>{label}</ChipText>
    </Container>
  );
};

interface ContainerProps {
  variant: ChipVariant;
}

const Container = styled.View<ContainerProps>`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  gap: 5px;
  padding-vertical: 3px;
  padding-horizontal: 11px;
  border-radius: 999px;
  
  ${(props) => {
    switch (props.variant) {
      case 'amber':
        return `background-color: ${props.theme.colors.amberSoft};`;
      case 'red':
        return `background-color: ${props.theme.colors.redSoft};`;
      case 'green':
        return `background-color: ${props.theme.colors.greenSoft};`;
      case 'violet':
        return `background-color: ${props.theme.colors.accentSoft};`;
      case 'neutral':
      default:
        return 'background-color: #EFEFF6;';
    }
  }}
`;

interface TextProps {
  variant: ChipVariant;
}

const ChipText = styled.Text<TextProps>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 13px;
  font-weight: 600;
  
  ${(props) => {
    switch (props.variant) {
      case 'amber':
        return `color: ${props.theme.colors.amber};`;
      case 'red':
        return `color: ${props.theme.colors.red};`;
      case 'green':
        return `color: ${props.theme.colors.green};`;
      case 'violet':
        return `color: ${props.theme.colors.accent};`;
      case 'neutral':
      default:
        return `color: ${props.theme.colors.inkSoft};`;
    }
  }}
`;

const IconWrapper = styled.View`
  margin-right: 2px;
  align-items: center;
  justify-content: center;
`;
export default Chip;

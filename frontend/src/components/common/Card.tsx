import React from 'react';
import styled from 'styled-components/native';

interface CardProps {
  children: React.ReactNode;
  raised?: boolean;
  style?: any;
}

export const Card: React.FC<CardProps> = ({ children, raised = false, style }) => {
  return (
    <CardContainer raised={raised} style={style} {...({ dataSet: { class: 'interactive-card' } } as any)}>
      {children}
    </CardContainer>
  );
};

interface CardContainerProps {
  raised: boolean;
}

const CardContainer = styled.View<CardContainerProps>`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.sizes.radius}px;
  border-width: 1px;
  border-color: rgba(26, 26, 46, 0.04);
  padding: 16px;
  
  // Apply standard shadows using constants config
  ${(props) => {
    const shadowObj = props.raised 
      ? props.theme.sizes.shadowRaised 
      : props.theme.sizes.shadow;
    
    if (!shadowObj) return '';
    
    // Convert shadow style object into css variables for styled-components
    return Object.entries(shadowObj)
      .map(([key, val]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        if (typeof val === 'object') {
          return `${cssKey}-width: ${val.width}px;\n${cssKey}-height: ${val.height}px;`;
        }
        return `${cssKey}: ${val};`;
      })
      .join('\n');
  }}
`;
export default Card;

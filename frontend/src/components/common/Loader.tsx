import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

interface LoaderProps {
  message?: string;
  style?: any;
}

export const Loader: React.FC<LoaderProps> = ({ message, style }) => {
  return (
    <Container style={style}>
      <ActivityIndicator size="large" color="#5B4FD6" />
      {message && <MessageText>{message}</MessageText>}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const MessageText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.getFontSize('body')}px;
  color: ${(props) => props.theme.colors.inkSoft};
  margin-top: 16px;
  font-weight: 500;
  text-align: center;
`;

export default Loader;

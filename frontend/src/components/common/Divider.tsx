import styled from 'styled-components/native';

export const Divider = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.colors.line};
  width: 100%;
  margin-vertical: 12px;
`;

export default Divider;

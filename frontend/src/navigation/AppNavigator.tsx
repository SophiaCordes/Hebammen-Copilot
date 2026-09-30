import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { Routes } from '../constants/routes';
import HomeScreen from '../screens/app/HomeScreen';
import SelectPatientScreen from '../screens/app/SelectPatientScreen';
import Topbar from '../components/common/Topbar';

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <Container>
      <Topbar />
      <Content>
        <Stack.Navigator
          initialRouteName={Routes.HOME}
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name={Routes.HOME} component={HomeScreen} />
          <Stack.Screen name={Routes.SELECT_PATIENT} component={SelectPatientScreen} />
        </Stack.Navigator>
      </Content>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg};
`;

const Content = styled.View`
  flex: 1;
`;

export default AppNavigator;

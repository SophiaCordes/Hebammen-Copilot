import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/routes';
import LoginScreen from '../screens/auth/LoginScreen';
import TwoFactorScreen from '../screens/auth/TwoFactorScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/auth/NewPasswordScreen';
import PinResetScreen from '../screens/auth/PinResetScreen';
import FirstLoginScreen from '../screens/auth/FirstLoginScreen';

const Stack = createNativeStackNavigator();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.LOGIN}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Routes.TWO_FACTOR} component={TwoFactorScreen} />
      <Stack.Screen name={Routes.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
      <Stack.Screen name={Routes.NEW_PASSWORD} component={NewPasswordScreen} />
      <Stack.Screen name={Routes.PIN_RESET} component={PinResetScreen} />
      <Stack.Screen name={Routes.FIRST_LOGIN} component={FirstLoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

import React from 'react';
import { useAppStore } from '../store/store';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

export const RootNavigator: React.FC = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
};

export default RootNavigator;

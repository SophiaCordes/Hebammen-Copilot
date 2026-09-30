export const Routes = {
  // Auth Stack
  AUTH_STACK: 'AuthStack',
  LOGIN: 'Login',
  TWO_FACTOR: 'TwoFactor',
  FORGOT_PASSWORD: 'ForgotPassword',
  NEW_PASSWORD: 'NewPassword',
  PIN_RESET: 'PinReset',
  FIRST_LOGIN: 'FirstLogin',
  
  // App Stack / Main Navigator
  APP_STACK: 'AppStack',
  HOME: 'Home',
  SELECT_PATIENT: 'SelectPatient',
  
  // Reference / Foundations Screen
  STYLE_FOUNDATIONS: 'StyleFoundations',
} as const;

export type RouteType = typeof Routes[keyof typeof Routes];

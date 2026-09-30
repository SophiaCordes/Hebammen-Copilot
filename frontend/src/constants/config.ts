import { Platform } from 'react-native';

const getApiUrl = (): string => {
  const envUrl = process.env.EXPO_PUBLIC_API_URL || process.env.API_URL;
  if (envUrl) {
    return envUrl;
  }
  
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8000/api';
    }
    return 'http://localhost:8000/api';
  }
  
  return 'https://api.example.com/api';
};

export const Config = {
  apiUrl: getApiUrl(),
  timeout: 10000,
  syncInterval: 30000, // 30s for offline sync checks
};

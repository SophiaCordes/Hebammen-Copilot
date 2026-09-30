import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions, Image } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from '../../hooks/useTranslation';
import { useAppStore } from '../../store/store';
import { Routes } from '../../constants/routes';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Topbar from '../../components/common/Topbar';

interface LoginFormInputs {
  email: string;
  pass: string;
}

const APP_LOGO = require('../../../assets/logo.png');

export const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const login = useAppStore((state) => state.login);
  const { width } = useWindowDimensions();
  const isMobile = width <= 540;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      pass: '',
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    if (data.email && data.pass) {
      login(data.email);
      navigation.navigate(Routes.TWO_FACTOR);
    }
  };

  return (
    <KeyboardAvoidingContainer behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Topbar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <PageContent isMobile={isMobile}>
          <LoginCard raised isMobile={isMobile}>
            <LogoSection>
              <LogoContainer>
                <Image
                  source={APP_LOGO}
                  style={{ width: 52, height: 52 }}
                  resizeMode="contain"
                />
              </LogoContainer>
              <BrandText>Midwife App</BrandText>
            </LogoSection>

            <TitleSection>
              <TitleText>{t('login.subtitle')}</TitleText>
            </TitleSection>

            <Controller
              control={control}
              name="email"
              rules={{
                required: t('error.emailRequired') || 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: t('error.emailInvalid') || 'Enter a valid email address',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t('login.email')}
                  placeholder="example@gmail.com"
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message}
                  keyboardType="email-address"
                />
              )}
            />

            <Controller
              control={control}
              name="pass"
              rules={{
                required: t('error.passwordRequired') || 'Password is required',
                minLength: {
                  value: 4,
                  message: t('error.passwordLength') || 'Password must be at least 4 characters',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t('login.password')}
                  placeholder="••••••••"
                  value={value}
                  onChangeText={onChange}
                  error={errors.pass?.message}
                  secureTextEntry
                />
              )}
            />

            <Button
              title={t('common.login')}
              onPress={handleSubmit(onSubmit)}
              style={{ marginTop: 16 }}
            />
          </LoginCard>
        </PageContent>
      </ScrollView>
    </KeyboardAvoidingContainer>
  );
};

const KeyboardAvoidingContainer = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg};
  
  /* Web background gradient for premium aesthetic */
  ${Platform.select({
    web: `background-image: linear-gradient(135deg, #EEEDFA 0%, #FBFBFD 50%, #EEEDFA 100%);`,
    default: '',
  })}
`;

interface PageContentProps {
  isMobile: boolean;
}

const PageContent = styled.View<PageContentProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${(props) => (props.isMobile ? '16px' : '24px')};
  width: 100%;
`;

const LoginCard = styled(Card)<{ isMobile: boolean }>`
  width: 100%;
  max-width: 440px;
  padding: ${(props) => (props.isMobile ? '24px' : '40px')};
  background-color: #FFFFFF;
  border-radius: 20px;
  border-width: 1px;
  border-color: #E5E5F0;
  
  /* Drop shadow */
  shadow-color: #1A1A2E;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.08;
  shadow-radius: 24px;
  elevation: 8;
`;

const LogoSection = styled.View`
  align-items: center;
  margin-bottom: 24px;
  gap: 10px;
`;

const LogoContainer = styled.View`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  background-color: ${(props) => props.theme.colors.accentSoft};
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.line};
`;

const BrandText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 14px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.accent};
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const TitleSection = styled.View`
  margin-bottom: 28px;
  align-items: center;
`;

const TitleText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.ink};
  letter-spacing: -0.5px;
  text-align: center;
`;

export default LoginScreen;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from '../../hooks/useTranslation';
import { useAppStore } from '../../store/store';
import { Routes } from '../../constants/routes';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Topbar from '../../components/common/Topbar';

interface TwoFactorFormInputs {
  code: string;
}

export const TwoFactorScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const login = useAppStore((state) => state.login);
  const user = useAppStore((state) => state.user);
  const { width } = useWindowDimensions();
  const isMobile = width <= 540;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TwoFactorFormInputs>({
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = (data: TwoFactorFormInputs) => {
    if (data.code.length === 6) {
      // Complete login state setup and let RootNavigator switch routes automatically
      if (user?.username) {
        login(user.username);
      } else {
        login('demo@example.com');
      }
    }
  };

  return (
    <KeyboardAvoidingContainer behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Topbar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <PageContent isMobile={isMobile}>
          <LoginCard raised>
            <TitleSection>
              <TitleText>{t('twofactor.title')}</TitleText>
              <SubtitleText>{t('twofactor.subtitle')}</SubtitleText>
            </TitleSection>

            <DescriptionText>{t('twofactor.body')}</DescriptionText>

            <Controller
              control={control}
              name="code"
              rules={{
                required: t('error.codeRequired') || 'Verification code is required',
                minLength: {
                  value: 6,
                  message: t('error.codeLength') || 'Code must be exactly 6 digits',
                },
                maxLength: {
                  value: 6,
                  message: t('error.codeLength') || 'Code must be exactly 6 digits',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: t('error.codeNumeric') || 'Code must contain digits only',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t('twofactor.code')}
                  placeholder="000 000"
                  value={value}
                  onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
                  error={errors.code?.message}
                  keyboardType="number-pad"
                  maxLength={6}
                />
              )}
            />

            <Button
              title={t('twofactor.verify')}
              onPress={handleSubmit(onSubmit)}
              style={{ marginTop: 16 }}
            />

            <BackToLoginLink onPress={() => navigation.navigate(Routes.LOGIN)}>
              <BackToLoginText>{t('auth.backToLogin')}</BackToLoginText>
            </BackToLoginLink>

            <DemoHelpContainer>
              <DemoHelpText>{t('twofactor.help')}</DemoHelpText>
            </DemoHelpContainer>
          </LoginCard>
        </PageContent>
      </ScrollView>
    </KeyboardAvoidingContainer>
  );
};

const KeyboardAvoidingContainer = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg};
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

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 440px;
  padding: 32px;
`;

const TitleSection = styled.View`
  margin-bottom: 16px;
  align-items: flex-start;
`;

const TitleText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.getFontSize('title')}px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.accent};
  letter-spacing: -0.26px;
`;

const SubtitleText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.getFontSize('small')}px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.inkSoft};
  margin-top: 6px;
`;

const DescriptionText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.getFontSize('body')}px;
  color: ${(props) => props.theme.colors.inkSoft};
  line-height: 22px;
  margin-bottom: 20px;
`;

const BackToLoginLink = styled.TouchableOpacity`
  align-self: center;
  margin-top: 20px;
`;

const BackToLoginText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.getFontSize('body')}px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.accent};
`;

const DemoHelpContainer = styled.View`
  margin-top: 24px;
  background-color: ${(props) => props.theme.colors.accentSoft};
  border-radius: ${(props) => props.theme.sizes.radiusSm}px;
  padding-vertical: 10px;
  padding-horizontal: 14px;
`;

const DemoHelpText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.getFontSize('small')}px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.accent};
  text-align: center;
`;
export default TwoFactorScreen;

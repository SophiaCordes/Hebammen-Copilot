import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from '../../hooks/useTranslation';
import { Routes } from '../../constants/routes';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Topbar from '../../components/common/Topbar';
import Banner from '../../components/common/Banner';

interface NewPasswordInputs {
  pass: string;
  confirmPass: string;
}

export const NewPasswordScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const [isSaved, setIsSaved] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width <= 540;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPasswordInputs>({
    defaultValues: {
      pass: '',
      confirmPass: '',
    },
  });

  const password = watch('pass', '');

  // Live rules evaluation
  const hasMinLength = password.length >= 8;
  const hasUpperAndNumber = /[A-Z]/.test(password) && /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  const onSubmit = (data: NewPasswordInputs) => {
    if (hasMinLength && hasUpperAndNumber && hasSpecialChar && data.pass === data.confirmPass) {
      setIsSaved(true);
      // Automatically route back to Login after 2 seconds
      setTimeout(() => {
        setIsSaved(false);
        navigation.navigate(Routes.LOGIN);
      }, 2000);
    }
  };

  return (
    <KeyboardAvoidingContainer behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Topbar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <PageContent isMobile={isMobile}>
          <LoginCard raised>
            <TitleSection>
              <TitleText>{t('pwd.title')}</TitleText>
              <SubtitleText>{t('pwd.subtitle')}</SubtitleText>
            </TitleSection>

            {isSaved ? (
              <SuccessBanner
                variant="offline"
                message={t('pwd.success')}
              />
            ) : (
              <>
                <DescriptionText>{t('pwd.body')}</DescriptionText>

                <Controller
                  control={control}
                  name="pass"
                  rules={{
                    required: t('error.passwordRequired') || 'Password is required',
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label={t('pwd.new')}
                      placeholder="••••••••"
                      value={value}
                      onChangeText={onChange}
                      error={errors.pass?.message}
                      secureTextEntry
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPass"
                  rules={{
                    required: t('error.passwordRequired') || 'Password confirmation is required',
                    validate: (value) =>
                      value === password || (t('error.passwordsMustMatch') || 'Passwords must match'),
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label={t('pwd.confirm')}
                      placeholder="••••••••"
                      value={value}
                      onChangeText={onChange}
                      error={errors.confirmPass?.message}
                      secureTextEntry
                    />
                  )}
                />

                {/* Live password rules container */}
                <RulesContainer>
                  <RuleItem valid={hasMinLength}>
                    <RuleIcon valid={hasMinLength}>{hasMinLength ? '✓' : '•'}</RuleIcon>
                    <RuleText valid={hasMinLength}>{t('pwd.rule8')}</RuleText>
                  </RuleItem>
                  <RuleItem valid={hasUpperAndNumber}>
                    <RuleIcon valid={hasUpperAndNumber}>{hasUpperAndNumber ? '✓' : '•'}</RuleIcon>
                    <RuleText valid={hasUpperAndNumber}>{t('pwd.ruleUpper')}</RuleText>
                  </RuleItem>
                  <RuleItem valid={hasSpecialChar}>
                    <RuleIcon valid={hasSpecialChar}>{hasSpecialChar ? '✓' : '•'}</RuleIcon>
                    <RuleText valid={hasSpecialChar}>{t('pwd.ruleSpecial')}</RuleText>
                  </RuleItem>
                </RulesContainer>

                <Button
                  title={t('pwd.save')}
                  onPress={handleSubmit(onSubmit)}
                  disabled={!(hasMinLength && hasUpperAndNumber && hasSpecialChar)}
                  style={{ marginTop: 16 }}
                />
              </>
            )}

            <BackToLoginLink onPress={() => navigation.navigate(Routes.LOGIN)}>
              <BackToLoginText>{t('auth.backToLogin')}</BackToLoginText>
            </BackToLoginLink>
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
  margin-bottom: 16px;
`;

const SuccessBanner = styled(Banner)`
  margin-bottom: 20px;
`;

const RulesContainer = styled.View`
  margin-vertical: 12px;
  gap: 6px;
`;

interface RuleProps {
  valid: boolean;
}

const RuleItem = styled.View<RuleProps>`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const RuleIcon = styled.Text<RuleProps>`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => (props.valid ? props.theme.colors.green : props.theme.colors.inkSoft)};
  width: 14px;
  text-align: center;
`;

const RuleText = styled.Text<RuleProps>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.getFontSize('small')}px;
  font-weight: 500;
  color: ${(props) => (props.valid ? props.theme.colors.green : props.theme.colors.inkSoft)};
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
export default NewPasswordScreen;

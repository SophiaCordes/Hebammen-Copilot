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

interface PinResetInputs {
  pin: string;
  confirmPin: string;
}

export const PinResetScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const [isSaved, setIsSaved] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width <= 540;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PinResetInputs>({
    defaultValues: {
      pin: '',
      confirmPin: '',
    },
  });

  const pin = watch('pin', '');

  const onSubmit = (data: PinResetInputs) => {
    if (data.pin.length === 6 && data.pin === data.confirmPin) {
      setIsSaved(true);
      // Route back to Login after 2 seconds
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
              <TitleText>{t('pin.title')}</TitleText>
              <SubtitleText>{t('pin.subtitle')}</SubtitleText>
            </TitleSection>

            {isSaved ? (
              <SuccessBanner
                variant="offline"
                message={t('pin.success')}
              />
            ) : (
              <>
                <DescriptionText>{t('pin.body')}</DescriptionText>

                <Controller
                  control={control}
                  name="pin"
                  rules={{
                    required: t('error.pinRequired') || 'PIN is required',
                    minLength: {
                      value: 6,
                      message: t('error.pinLength') || 'PIN must be exactly 6 digits',
                    },
                    maxLength: {
                      value: 6,
                      message: t('error.pinLength') || 'PIN must be exactly 6 digits',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: t('error.pinNumeric') || 'PIN must contain digits only',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label={t('pin.new')}
                      placeholder="••••••"
                      value={value}
                      onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
                      error={errors.pin?.message}
                      secureTextEntry
                      keyboardType="number-pad"
                      maxLength={6}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPin"
                  rules={{
                    required: t('error.pinRequired') || 'PIN confirmation is required',
                    validate: (value) =>
                      value === pin || (t('error.pinsMustMatch') || 'PINs must match'),
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label={t('pin.confirm')}
                      placeholder="••••••"
                      value={value}
                      onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
                      error={errors.confirmPin?.message}
                      secureTextEntry
                      keyboardType="number-pad"
                      maxLength={6}
                    />
                  )}
                />

                <Button
                  title={t('pin.save')}
                  onPress={handleSubmit(onSubmit)}
                  style={{ marginTop: 16 }}
                />
              </>
            )}

            <BackToLoginLink onPress={() => navigation.navigate(Routes.LOGIN)}>
              <BackToLoginText>{t('auth.backToLogin')}</BackToLoginText>
            </BackToLoginLink>

            <DemoHelpContainer>
              <DemoHelpText>{t('pin.help')}</DemoHelpText>
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

const SuccessBanner = styled(Banner)`
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
export default PinResetScreen;

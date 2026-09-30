import React, { useState } from 'react';
import { TextInputProps, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from '../../hooks/useTranslation';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  secureTextEntry = false,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  ...rest
}) => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width <= 540;
  const height = isMobile ? 48 : 56;

  return (
    <FieldContainer>
      {label && <LabelText>{label}</LabelText>}
      <InputWrapper
        height={height}
        isFocused={isFocused}
        hasError={!!error}
        {...({ dataSet: { class: 'input-wrapper-glow', focused: isFocused ? 'true' : 'false', error: error ? 'true' : 'false' } } as any)}
      >
        <InputInnerContainer>
          <StyledTextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#8585A0"
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
            style={[{ outlineStyle: 'none' } as any, rest.style]}
          />
          {secureTextEntry && (
            <ToggleShowButton onPress={() => setIsPasswordVisible(!isPasswordVisible)} activeOpacity={0.75}>
              <ToggleShowText>{isPasswordVisible ? t('login.hide') : t('login.show')}</ToggleShowText>
            </ToggleShowButton>
          )}
        </InputInnerContainer>
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </FieldContainer>
  );
};

const FieldContainer = styled.View`
  flex-direction: column;
  gap: 8px;
  margin-vertical: 8px;
  width: 100%;
`;

const LabelText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.getFontSize('section')}px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.ink};
`;

interface InputWrapperProps {
  height: number;
  isFocused: boolean;
  hasError: boolean;
}

const InputWrapper = styled.View<InputWrapperProps>`
  min-height: ${(props) => props.height}px;
  background-color: ${(props) => props.theme.colors.card};
  border-width: 2px;
  border-color: ${(props) => {
    if (props.hasError) return props.theme.colors.red;
    if (props.isFocused) return props.theme.colors.accent;
    return props.theme.colors.lineStrong;
  }};
  border-radius: ${(props) => props.theme.sizes.radiusSm}px;
  width: 100%;
  padding-horizontal: 16px;
  justify-content: center;
`;

const StyledTextInput = styled.TextInput`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.getFontSize('body')}px;
  color: ${(props) => props.theme.colors.ink};
  flex: 1;
  padding: 0;
  height: 100%;
  outline-style: none;
  &:focus {
    outline: none;
  }
`;

const InputInnerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ToggleShowButton = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  padding-left: 12px;
`;

const ToggleShowText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.accent};
`;

const ErrorText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.getFontSize('small')}px;
  color: ${(props) => props.theme.colors.red};
  font-weight: 500;
  margin-top: 2px;
`;
export default Input;

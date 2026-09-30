import React, { useState } from 'react';
import { ScrollView, Platform, StyleSheet } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import Svg, { Path } from 'react-native-svg';

export interface DropdownOption {
  value: string;
  label: string;
  subtitle?: string;
  badge?: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  label?: string;
  placeholder?: string;
  style?: any;
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  label,
  placeholder,
  style
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <Container style={style}>
      {label && <DropdownLabel>{label}</DropdownLabel>}
      
      <DropdownTrigger
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.9}
        isOpen={isOpen}
      >
        <TriggerContent>
          {selectedOption ? (
            <SelectedInfoRow>
              <OptionLabelText>{selectedOption.label}</OptionLabelText>
              
              {selectedOption.badge && (
                <>
                  <DotDivider>·</DotDivider>
                  <OptionBadge>{selectedOption.badge}</OptionBadge>
                </>
              )}
              
              {selectedOption.subtitle && (
                <>
                  <DotDivider>·</DotDivider>
                  <OptionSubtitleText>{selectedOption.subtitle}</OptionSubtitleText>
                </>
              )}
            </SelectedInfoRow>
          ) : (
            <PlaceholderText>
              {placeholder || 'Select option'}
            </PlaceholderText>
          )}
        </TriggerContent>

        <ChevronWrapper isOpen={isOpen}>
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <Path d="M6 9l6 6 6-6" stroke="#5B4FD6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </ChevronWrapper>
      </DropdownTrigger>

      {isOpen && (
        <DropdownMenuContainer style={styles.menuShadow}>
          <ScrollView
            nestedScrollEnabled={true}
            style={{ maxHeight: 220 }}
            contentContainerStyle={{ paddingVertical: 6 }}
          >
            {options.length === 0 ? (
              <NoOptionsRow>
                <NoOptionsText>No options available</NoOptionsText>
              </NoOptionsRow>
            ) : (
              options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <MenuItem
                    key={opt.value}
                    onPress={() => handleSelect(opt.value)}
                    isSelected={isSelected}
                    activeOpacity={0.7}
                  >
                    <MenuItemContent>
                      <MenuOptionLabel isSelected={isSelected}>{opt.label}</MenuOptionLabel>
                      {(opt.badge || opt.subtitle) && (
                        <MenuOptionMeta>
                          {opt.badge ? `${opt.badge} ` : ''}
                          {opt.badge && opt.subtitle ? '· ' : ''}
                          {opt.subtitle || ''}
                        </MenuOptionMeta>
                      )}
                    </MenuItemContent>
                    
                    {isSelected && (
                      <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <Path d="M20 6L9 17l-5-5" stroke="#5B4FD6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </Svg>
                    )}
                  </MenuItem>
                );
              })
            )}
          </ScrollView>
        </DropdownMenuContainer>
      )}
    </Container>
  );
};

/* ─── Styles & Styled Components ────────────────────────────────────────── */

const styles = StyleSheet.create({
  menuShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#1A1A2E',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 8px 24px rgba(26, 26, 46, 0.12)',
      }
    })
  }
});

const Container = styled.View`
  position: relative;
  width: 100%;
  z-index: 1000;
`;

const DropdownLabel = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 14.5px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.inkSoft};
  margin-bottom: 8px;
`;

const DropdownTrigger = styled.TouchableOpacity<{ isOpen: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 52px;
  background-color: #FFFFFF;
  border-width: 2px;
  border-color: ${(props) => (props.isOpen ? '#5B4FD6' : '#C9C9DC')};
  border-radius: 12px;
  padding-horizontal: 16px;
  width: 100%;
`;

const TriggerContent = styled.View`
  flex: 1;
  justify-content: center;
`;

const SelectedInfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const OptionLabelText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 16.5px;
  font-weight: 800;
  color: #1A1A2E;
`;

const OptionBadge = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 14.5px;
  font-weight: 700;
  color: #5B4FD6;
  background-color: #EEEDFA;
  padding-vertical: 2px;
  padding-horizontal: 8px;
  border-radius: 4px;
  overflow: hidden;
`;

const OptionSubtitleText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 14.5px;
  font-weight: 600;
  color: #6B6B80;
`;

const DotDivider = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 14.5px;
  font-weight: 600;
  color: #A3A3C2;
  margin-horizontal: 8px;
`;

const PlaceholderText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 16.5px;
  font-weight: 600;
  color: #8E8EAF;
`;

const ChevronWrapper = styled.View<{ isOpen: boolean }>`
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

/* Floating Menu Overlay */
const DropdownMenuContainer = styled.View`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background-color: #FFFFFF;
  border-width: 2px;
  border-color: #5B4FD6;
  border-radius: 12px;
  overflow: hidden;
  z-index: 9999;
`;

const MenuItem = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 12px;
  padding-horizontal: 16px;
  background-color: ${(props) => (props.isSelected ? '#EEEDFA' : '#FFFFFF')};
  border-bottom-width: 1px;
  border-bottom-color: #F3F3F9;
`;

const MenuItemContent = styled.View`
  flex-direction: column;
  gap: 2px;
`;

const MenuOptionLabel = styled.Text<{ isSelected: boolean }>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 15.5px;
  font-weight: ${(props) => (props.isSelected ? '800' : '700')};
  color: ${(props) => (props.isSelected ? '#5B4FD6' : '#1A1A2E')};
`;

const MenuOptionMeta = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 13.5px;
  font-weight: 600;
  color: #6B6B80;
`;

const NoOptionsRow = styled.View`
  padding: 16px;
  align-items: center;
`;

const NoOptionsText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 14.5px;
  color: #8E8EAF;
  font-weight: 600;
`;

export default Dropdown;

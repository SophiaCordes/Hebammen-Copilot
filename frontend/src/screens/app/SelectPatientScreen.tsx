import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, useWindowDimensions, Modal, Platform } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from '../../hooks/useTranslation';
import { useAppStore, Patient } from '../../store/store';
import { Routes } from '../../constants/routes';
import Subbar from '../../components/common/Subbar';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Chip from '../../components/common/Chip';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface CreatePatientInputs {
  firstName: string;
  lastName: string;
  room: string;
  time: string;
  num: string;
}

// Custom select component for Web, falling back to basic view/input on native
const RoomSelect = ({ value, onChange, label, error }: { value: string; onChange: (v: string) => void; label: string; error?: string }) => {
  return (
    <FieldContainer>
      <LabelText>{label}</LabelText>
      {Platform.OS === 'web' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            height: 56,
            paddingLeft: 16,
            paddingRight: 44,
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontSize: 18,
            color: '#1A1A2E',
            backgroundColor: '#FFFFFF',
            border: error ? '2px solid #C0392B' : '2px solid #C9C9DC',
            borderRadius: 10,
            width: '100%',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%234A4A63' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 14px center',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        >
          <option value="1">Room 1</option>
          <option value="2">Room 2</option>
          <option value="3">Room 3</option>
          <option value="4">Room 4</option>
        </select>
      ) : (
        <Input
          placeholder="e.g. 1"
          value={value}
          onChangeText={onChange}
          keyboardType="numeric"
          error={error}
        />
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </FieldContainer>
  );
};

// Custom time component for Web
const TimeInput = ({ value, onChange, label, error }: { value: string; onChange: (v: string) => void; label: string; error?: string }) => {
  return (
    <FieldContainer>
      <LabelText>{label}</LabelText>
      {Platform.OS === 'web' ? (
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            height: 56,
            paddingLeft: 16,
            paddingRight: 16,
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontSize: 18,
            color: '#1A1A2E',
            backgroundColor: '#FFFFFF',
            border: error ? '2px solid #C0392B' : '2px solid #C9C9DC',
            borderRadius: 10,
            width: '100%',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      ) : (
        <Input
          placeholder="e.g. 09:30"
          value={value}
          onChangeText={onChange}
          error={error}
        />
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </FieldContainer>
  );
};

export const SelectPatientScreen: React.FC<{ navigation: any; route?: any }> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isMobile = width <= 600;
  const isTablet = width > 600 && width <= 960;
  const isDesktop = width > 960;

  const returnTo: string = route?.params?.returnTo || Routes.HOME;

  const navigateNext = () => {
    navigation.navigate(returnTo);
  };

  const patients = useAppStore((state) => state.patients);
  const activePatient = useAppStore((state) => state.activePatient);
  const setActivePatient = useAppStore((state) => state.setActivePatient);
  const addPatient = useAppStore((state) => state.addPatient);

  // Component local state
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'active' | 'closed'>('active');
  const [sortMode, setSortMode] = useState<'recent' | 'admission' | 'az'>('recent');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePatientInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      room: '1',
      time: '',
      num: '',
    },
  });

  const onSubmitNewCase = (data: CreatePatientInputs) => {
    const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`;
    const formattedRoom = `Room ${data.room}`;

    let timeStr = data.time;
    if (!timeStr) {
      const now = new Date();
      timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }

    addPatient({
      name: fullName,
      room: formattedRoom,
      time: timeStr,
      id: data.num || ''
    });

    reset();
    setIsModalVisible(false);
    navigation.navigate(returnTo);
  };

  // Filter patients based on tab selection and search query
  const filteredPatients = patients.filter((p) => {
    // Filter by tab status
    const matchesTab = activeTab === 'active'
      ? (p.status === 'running' || p.status === 'open')
      : p.status === 'closed';

    // Filter by search query
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.includes(searchTerm);

    return matchesTab && matchesSearch;
  });

  // Dynamic count calculation
  const activeCount = patients.filter(p => p.status === 'running' || p.status === 'open').length;
  const closedCount = patients.filter(p => p.status === 'closed').length;

  // Sorting calculation
  const getPatientSortValues = (p: Patient) => {
    if (p.id === '100201') return { recent: 100, adm: 850 };
    if (p.id === '100176') return { recent: 60, adm: 708 };
    if (p.id === '100193') return { recent: 75, adm: 435 };
    if (p.id === '100132') return { recent: 45, adm: 980 };
    if (p.id === '100119') return { recent: 35, adm: 540 };
    if (p.id === '100098') return { recent: 25, adm: 1290 };

    let admMin = 0;
    if (p.time && p.time.includes(':')) {
      const parts = p.time.split(':');
      admMin = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return { recent: 999, adm: admMin };
  };

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (sortMode === 'az') {
      return a.name.localeCompare(b.name, 'de');
    }
    const aVals = getPatientSortValues(a);
    const bVals = getPatientSortValues(b);
    if (sortMode === 'admission') {
      return aVals.adm - bVals.adm;
    }
    return bVals.recent - aVals.recent;
  });

  return (
    <Container>
      <Subbar
        title={t('patient.title')}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}>
        <MainContent isMobile={isMobile}>
          {/* List Header: My cases title + segmented filter tabs with counts */}
          <ListHeadRow isMobile={isMobile}>
            <ListHeadEyebrow>{t('patient.myCases')}</ListHeadEyebrow>
            <TabBar>
              <TabBtn
                active={activeTab === 'active'}
                onPress={() => setActiveTab('active')}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeTab === 'active' }}
              >
                <TabText active={activeTab === 'active'}>
                  {t('filter.active')}
                  <CountBadge active={activeTab === 'active'}>{activeCount}</CountBadge>
                </TabText>
              </TabBtn>
              <TabBtn
                active={activeTab === 'closed'}
                onPress={() => setActiveTab('closed')}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeTab === 'closed' }}
              >
                <TabText active={activeTab === 'closed'}>
                  {t('filter.closed')}
                  <CountBadge active={activeTab === 'closed'}>{closedCount}</CountBadge>
                </TabText>
              </TabBtn>
            </TabBar>
          </ListHeadRow>

          {/* Search Input Toolbar */}
          <SearchWrapper>
            <SearchIcon>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <Circle cx="11" cy="11" r="7" stroke="#4A4A63" strokeWidth="2" />
                <Path d="M20 20l-3.2-3.2" stroke="#4A4A63" strokeWidth="2" strokeLinecap="round" />
              </Svg>
            </SearchIcon>
            <SearchInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder={t('patient.search')}
              placeholderTextColor="#8585A0"
            />
            {searchTerm.length > 0 && (
              <ClearBtn onPress={() => setSearchTerm('')}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <Path d="M6 6l12 12M18 6L6 18" stroke="#4A4A63" strokeWidth="2" strokeLinecap="round" />
                </Svg>
              </ClearBtn>
            )}
          </SearchWrapper>

          {/* Sorting controls and New Case button row */}
          <ToolbarRow isMobile={isMobile}>
            <SortControlGroup>
              <SortLabel>{t('sort.label')}</SortLabel>
              <SegmentedControl>
                <SortBtn active={sortMode === 'recent'} onPress={() => setSortMode('recent')}>
                  <SortBtnText active={sortMode === 'recent'}>{t('sort.recent')}</SortBtnText>
                </SortBtn>
                <SortBtn active={sortMode === 'admission'} onPress={() => setSortMode('admission')}>
                  <SortBtnText active={sortMode === 'admission'}>{t('sort.admission')}</SortBtnText>
                </SortBtn>
                <SortBtn active={sortMode === 'az'} onPress={() => setSortMode('az')}>
                  <SortBtnText active={sortMode === 'az'}>{t('sort.az')}</SortBtnText>
                </SortBtn>
              </SegmentedControl>
            </SortControlGroup>
            <Button
              title={t('patient.newCase')}
              onPress={() => setIsModalVisible(true)}
              variant="secondary"
              style={{ minHeight: 48, paddingHorizontal: 20 }}
              icon={
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <Path d="M12 5v14M5 12h14" stroke="#5B4FD6" strokeWidth="2.2" strokeLinecap="round" />
                </Svg>
              }
            />
          </ToolbarRow>

          {/* Patients Grid/List */}
          {sortedPatients.length === 0 ? (
            <EmptyView>
              {searchTerm !== '' ? (
                <>
                  <EmptyTitle>{t('patient.noResultsPre')} „{searchTerm}“</EmptyTitle>
                </>
              ) : (
                <>
                  <Svg width="84" height="84" viewBox="0 0 24 24" fill="none">
                    <Circle cx="12" cy="8" r="4" stroke="#5B4FD6" strokeWidth="2" />
                    <Path d="M4 21a8 8 0 0 1 16 0" stroke="#5B4FD6" strokeWidth="2" strokeLinecap="round" />
                  </Svg>
                  <EmptyTitle>{activeTab === 'closed' ? t('patient.noClosed') : t('patient.emptyTitle')}</EmptyTitle>
                  <EmptyText>{t('patient.emptyBody')}</EmptyText>
                  <Button
                    title={t('patient.newCase')}
                    onPress={() => setIsModalVisible(true)}
                    variant="primary"
                    style={{ marginTop: 6 }}
                    icon={
                      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <Path d="M12 5v14M5 12h14" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                      </Svg>
                    }
                  />
                </>
              )}
            </EmptyView>
          ) : (
            <PatientsGrid isMobile={isMobile} isTablet={isTablet}>
              {sortedPatients.map((p) => {
                const isActive = activePatient?.id === p.id;
                let chipColor: any = 'neutral';
                let chipLabel = t('status.open');

                if (p.status === 'running') {
                  chipColor = 'violet';
                  chipLabel = t('status.running');
                } else if (p.status === 'closed') {
                  chipColor = 'green';
                  chipLabel = t('status.done');
                }

                return (
                  <PatientCard
                    key={p.id}
                    isActive={isActive}
                    isClosed={p.status === 'closed'}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  >
                    {isActive && (
                      <ActiveLabel>
                        <Dot />
                        <ActiveText>{t('patient.newTag')}</ActiveText>
                      </ActiveLabel>
                    )}
                    <CardHeader>
                      <MonogramWrapper isClosed={p.status === 'closed'}>
                        <MonogramText isClosed={p.status === 'closed'}>
                          {p.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </MonogramText>
                      </MonogramWrapper>
                      <MetaWrapper>
                        <PatientName>{p.name}</PatientName>
                        <PatientMeta>
                          {t('create.num')} {p.id} · {p.room} · {p.status === 'closed' ? t('patient.closedOn') : t('patient.adm')} {p.time}
                        </PatientMeta>
                      </MetaWrapper>
                    </CardHeader>
                    <StatusRow>
                      {p.status === 'running' ? (
                        <Chip
                          label={chipLabel}
                          variant={chipColor}
                          icon={<BlinkingDot />}
                        />
                      ) : p.status === 'closed' ? (
                        <Chip
                          label={chipLabel}
                          variant={chipColor}
                          icon={
                            <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <Path d="M5 12l4 4 10-10" stroke="#1E7B45" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                          }
                        />
                      ) : (
                        <Chip label={chipLabel} variant={chipColor} />
                      )}
                    </StatusRow>

                    {/* Exactly one Action button depending on status */}
                    <CardActionRow>
                      {p.status === 'open' && (
                        <Button
                          title={t('action.start')}
                          onPress={() => {
                            setActivePatient(p);
                            navigateNext();
                          }}
                          variant="primary"
                          style={{ flex: 1, minHeight: 52 }}
                          icon={
                            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <Path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" fill="#FFFFFF" />
                              <Path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v3M8 21h8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                          }
                        />
                      )}
                      {p.status === 'running' && (
                        <Button
                          title={t('action.resume')}
                          onPress={() => {
                            setActivePatient(p);
                            navigateNext();
                          }}
                          variant="secondary"
                          style={{ flex: 1, minHeight: 52, backgroundColor: '#EEEDFA', borderColor: 'transparent' }}
                          icon={
                            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <Path d="M8 5v14l11-7-11-7z" fill="#5B4FD6" />
                            </Svg>
                          }
                        />
                      )}
                      {p.status === 'closed' && (
                        <Button
                          title={t('action.view')}
                          onPress={() => {
                            setActivePatient(p);
                            navigation.navigate(Routes.HOME);
                          }}
                          variant="secondary"
                          style={{ flex: 1, minHeight: 52, backgroundColor: '#EFEFF6', borderColor: 'transparent', color: '#1A1A2E' }}
                          icon={
                            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <Path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" stroke="#4A4A63" strokeWidth="2" strokeLinejoin="round" />
                              <Circle cx="12" cy="12" r="3" stroke="#4A4A63" strokeWidth="2" />
                            </Svg>
                          }
                        />
                      )}
                    </CardActionRow>
                  </PatientCard>
                );
              })}
            </PatientsGrid>
          )}
        </MainContent>
      </ScrollView>

      {/* Create Case Modal Form */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <ModalScrim>
          <ModalCard isMobile={isMobile}>
            <ModalHeader>
              <ModalTitle>{t('create.title')}</ModalTitle>
              <ModalSubtitle>{t('create.subtitle')}</ModalSubtitle>
            </ModalHeader>

            <ScrollView style={{ flexGrow: 0, flexShrink: 1 }} contentContainerStyle={{ gap: 18, paddingVertical: 4 }}>
              <FormGrid>
                <FormRow isMobile={isMobile}>
                  <Controller
                    control={control}
                    name="firstName"
                    rules={{ required: t('create.first') + ' is required' }}
                    render={({ field: { onChange, value } }) => (
                      <InputWrapperField isMobile={isMobile}>
                        <Input
                          label={t('create.first')}
                          placeholder="e.g. Klara"
                          value={value}
                          onChangeText={onChange}
                          error={errors.firstName?.message}
                        />
                      </InputWrapperField>
                    )}
                  />
                  <Controller
                    control={control}
                    name="lastName"
                    rules={{ required: t('create.last') + ' is required' }}
                    render={({ field: { onChange, value } }) => (
                      <InputWrapperField isMobile={isMobile}>
                        <Input
                          label={t('create.last')}
                          placeholder="e.g. Smith"
                          value={value}
                          onChangeText={onChange}
                          error={errors.lastName?.message}
                        />
                      </InputWrapperField>
                    )}
                  />
                </FormRow>

                <FormRow isMobile={isMobile}>
                  <Controller
                    control={control}
                    name="num"
                    rules={{ required: t('create.num') + ' is required' }}
                    render={({ field: { onChange, value } }) => (
                      <InputWrapperField isMobile={isMobile}>
                        <Input
                          label={t('create.num')}
                          placeholder="100000"
                          value={value}
                          onChangeText={onChange}
                          keyboardType="numeric"
                          error={errors.num?.message}
                        />
                      </InputWrapperField>
                    )}
                  />

                  <Controller
                    control={control}
                    name="room"
                    render={({ field: { onChange, value } }) => (
                      <InputWrapperField isMobile={isMobile}>
                        <RoomSelect
                          label={t('create.ks')}
                          value={value}
                          onChange={onChange}
                          error={errors.room?.message}
                        />
                      </InputWrapperField>
                    )}
                  />
                </FormRow>

                <Controller
                  control={control}
                  name="time"
                  render={({ field: { onChange, value } }) => (
                    <TimeInput
                      label={t('create.admTime')}
                      value={value}
                      onChange={onChange}
                      error={errors.time?.message}
                    />
                  )}
                />
              </FormGrid>

              {/* Lock privacy warning banner */}
              <PrivacyWarning>
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginTop: 1, marginRight: 8, flexShrink: 0 }}>
                  <Rect x="4" y="10" width="16" height="11" rx="2.5" stroke="#5B4FD6" strokeWidth="2" />
                  <Path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#5B4FD6" strokeWidth="2" strokeLinecap="round" />
                </Svg>
                <PrivacyText>{t('create.privacy')}</PrivacyText>
              </PrivacyWarning>
            </ScrollView>

            <ModalActions>
              <Button
                title={t('common.cancel')}
                onPress={() => {
                  reset();
                  setIsModalVisible(false);
                }}
                variant="ghost"
                style={{ flex: 1, minHeight: 52 }}
              />
              <Button
                title={t('create.submit')}
                onPress={handleSubmit(onSubmitNewCase)}
                variant="primary"
                style={{ flex: 1, minHeight: 52 }}
              />
            </ModalActions>
          </ModalCard>
        </ModalScrim>
      </Modal>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg};
`;

interface MainContentProps {
  isMobile: boolean;
}

const MainContent = styled.View<MainContentProps>`
  max-width: 1000px;
  width: 100%;
  margin-horizontal: auto;
  padding-vertical: 24px;
  padding-horizontal: ${(props) => (props.isMobile ? '14px' : '20px')};
  gap: 20px;
`;

const ListHeadRow = styled.View<{ isMobile: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const ListHeadEyebrow = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.inkSoft};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TabBar = styled.View`
  flex-direction: row;
  background-color: #EEEEF4;
  border-radius: 999px;
  padding: 4px;
  gap: 2px;
`;

interface TabBtnProps {
  active: boolean;
}

const TabBtn = styled.TouchableOpacity<TabBtnProps>`
  min-height: 42px;
  padding-horizontal: 18px;
  border-radius: 999px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? props.theme.colors.card : 'transparent')};
  
  ${(props) =>
    props.active &&
    `
    shadow-color: '#1A1A2E';
    shadow-offset: 0px 1px;
    shadow-opacity: 0.18;
    shadow-radius: 2px;
    elevation: 1;
  `}
`;

const TabText = styled.Text<TabBtnProps>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => (props.active ? props.theme.colors.accent : props.theme.colors.inkSoft)};
  flex-direction: row;
  align-items: center;
`;

const CountBadge = styled.Text<{ active: boolean }>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 12.5px;
  font-weight: 800;
  background-color: ${(props) => (props.active ? props.theme.colors.accentSoft : 'rgba(26,26,46,0.08)')};
  color: ${(props) => (props.active ? props.theme.colors.accent : props.theme.colors.inkSoft)};
  border-radius: 999px;
  padding-horizontal: 8px;
  padding-vertical: 1px;
  margin-left: 8px;
`;

const SearchWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.card};
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.lineStrong};
  border-radius: ${(props) => props.theme.sizes.radiusSm}px;
  padding-horizontal: 16px;
  height: 52px;
  width: 100%;
`;

const SearchIcon = styled.View`
  margin-right: 12px;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.TextInput`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 16px;
  color: ${(props) => props.theme.colors.ink};
  flex: 1;
  height: 100%;
`;

const ClearBtn = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const ToolbarRow = styled.View<{ isMobile: boolean }>`
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  align-items: ${(props) => (props.isMobile ? 'stretch' : 'center')};
  justify-content: space-between;
  gap: 14px;
  width: 100%;
`;

const SortControlGroup = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const SortLabel = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.inkSoft};
`;

const SegmentedControl = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #EEEEF4;
  border-radius: 999px;
  padding: 3px;
`;

const SortBtn = styled.TouchableOpacity<{ active: boolean }>`
  min-height: 38px;
  padding-horizontal: 16px;
  border-radius: 999px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? props.theme.colors.card : 'transparent')};
  
  ${(props) =>
    props.active &&
    `
    shadow-color: '#1A1A2E';
    shadow-offset: 0px 1px;
    shadow-opacity: 0.18;
    shadow-radius: 2px;
    elevation: 1;
  `}
`;

const SortBtnText = styled.Text<{ active: boolean }>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => (props.active ? props.theme.colors.accent : props.theme.colors.inkSoft)};
`;

const PatientsGrid = styled.View<{ isMobile: boolean; isTablet: boolean }>`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
`;

interface PatientCardProps {
  isActive: boolean;
  isClosed: boolean;
}

const PatientCard = styled.View<PatientCardProps & { isMobile: boolean; isTablet: boolean }>`
  width: ${(props) => (props.isMobile ? '100%' : props.isTablet ? 'calc(50% - 8px)' : 'calc(33.33% - 11px)')};
  background-color: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.sizes.radius}px;
  border-width: 1.5px;
  border-color: ${(props) => (props.isActive ? props.theme.colors.accent : 'rgba(26, 26, 46, 0.04)')};
  padding: 22px;
  gap: 18px;
  shadow-color: '#1A1A2E';
  shadow-offset: 0px 2px;
  shadow-opacity: 0.06;
  shadow-radius: 8px;
  elevation: 2;
  
  ${(props) =>
    props.isActive &&
    `
    shadow-color: '#5B4FD6';
    shadow-offset: 0px 8px;
    shadow-opacity: 0.15;
    shadow-radius: 16px;
  `}
  
  ${(props) =>
    props.isClosed &&
    `
    opacity: 0.85;
  `}
`;

const CardActionRow = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 4px;
`;

const ActiveLabel = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 7px;
  align-self: flex-start;
  background-color: ${(props) => props.theme.colors.accent};
  border-radius: 999px;
  padding-vertical: 6px;
  padding-horizontal: 13px;
`;

const Dot = styled.View`
  width: 7px;
  height: 7px;
  border-radius: 3.5px;
  background-color: #FFFFFF;
`;

const ActiveText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 13px;
  font-weight: 700;
  color: #FFFFFF;
`;

const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 14px;
`;

const MonogramWrapper = styled.View<{ isClosed: boolean }>`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  background-color: ${(props) => (props.isClosed ? '#EFEFF6' : props.theme.colors.accentSoft)};
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${(props) => (props.isClosed ? 'rgba(26,26,46,0.08)' : 'rgba(91,79,214,0.16)')};
`;

const MonogramText = styled.Text<{ isClosed: boolean }>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 19px;
  font-weight: 700;
  color: ${(props) => (props.isClosed ? props.theme.colors.inkSoft : props.theme.colors.accent)};
  letter-spacing: 0.5px;
`;

const MetaWrapper = styled.View`
  flex: 1;
`;

const PatientName = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.ink};
  letter-spacing: -0.2px;
`;

const PatientMeta = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 14px;
  color: ${(props) => props.theme.colors.inkSoft};
  font-weight: 500;
  margin-top: 3px;
`;

const StatusRow = styled.View`
  flex-direction: row;
`;

const BlinkingDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #5B4FD6;
  
  ${Platform.OS === 'web' && `
    animation: livepulse 1.6s ease-in-out infinite;
    @keyframes livepulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.45; transform: scale(0.78); }
    }
  `}
`;

const EmptyView = styled.View`
  align-items: center;
  justify-content: center;
  padding: 56px 24px;
  gap: 16px;
  width: 100%;
`;

const EmptyTitle = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 22px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.ink};
`;

const EmptyText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 17px;
  color: ${(props) => props.theme.colors.inkSoft};
  text-align: center;
  line-height: 24px;
  max-width: 420px;
`;

// Modal styles
const ModalScrim = styled.View`
  flex: 1;
  background-color: rgba(26, 26, 46, 0.42);
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalCard = styled(Card) <{ isMobile: boolean }>`
  width: 100%;
  max-width: ${(props) => (props.isMobile ? '92%' : '480px')};
  max-height: 85%;
  padding: ${(props) => (props.isMobile ? '20px' : '26px 26px 24px')};
  gap: 18px;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.View`
  margin-bottom: 4px;
`;

const ModalTitle = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 26px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.accent};
  letter-spacing: -0.3px;
`;

const ModalSubtitle = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 15px;
  color: ${(props) => props.theme.colors.inkSoft};
  font-weight: 500;
  margin-top: 4px;
`;

const FormGrid = styled.View`
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const FormRow = styled.View<{ isMobile: boolean }>`
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  gap: 14px;
  width: 100%;
`;

const InputWrapperField = styled.View<{ isMobile?: boolean }>`
  flex: ${(props) => (props.isMobile ? 'none' : '1')};
  width: ${(props) => (props.isMobile ? '100%' : 'auto')};
`;

const FieldContainer = styled.View`
  flex-direction: column;
  gap: 8px;
  margin-vertical: 8px;
  width: 100%;
`;

const LabelText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 17px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.ink};
`;

const ErrorText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 14px;
  color: ${(props) => props.theme.colors.red};
  font-weight: 500;
  margin-top: 2px;
`;

const PrivacyWarning = styled.View`
  flex-direction: row;
  align-items: flex-start;
  background-color: ${(props) => props.theme.colors.accentSoft};
  border-radius: ${(props) => props.theme.sizes.radiusSm}px;
  padding: 12px 14px;
  width: 100%;
`;

const PrivacyText = styled.Text`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.accent};
  line-height: 20px;
  flex: 1;
`;

const ModalActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  width: 100%;
`;

export default SelectPatientScreen;

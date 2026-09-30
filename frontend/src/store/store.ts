import { create } from 'zustand';
import { ThemeName } from '../constants/colors';
import { FontFamilyKey } from '../constants/typography';

export interface Patient {
  id: string;
  name: string;
  room: string;
  status: 'running' | 'open' | 'closed';
  time: string; // admission time or close date
}

export interface User {
  username: string;
  initials: string;
  fullName: string;
  pinSet: boolean;
}


interface AppStore {
  // Localization
  language: 'de' | 'en';
  setLanguage: (lang: 'de' | 'en') => void;
  themeName: ThemeName;
  setThemeName: (theme: ThemeName) => void;
  fontFamilyKey: FontFamilyKey;
  setFontFamilyKey: (font: FontFamilyKey) => void;
 
  // Connection / App Status
  appState: 'idle' | 'recording' | 'offline';
  setAppState: (state: 'idle' | 'recording' | 'offline') => void;
  isNewCase: boolean;
  setIsNewCase: (val: boolean) => void;

  // Auth state
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
  setPinSet: (val: boolean) => void;

  // Patients state
  patients: Patient[];
  activePatient: Patient | null;
  setActivePatient: (patient: Patient | null) => void;
  addPatient: (patient: Omit<Patient, 'status'>) => void;

  // Offline Sync Queue
  offlineQueueCount: number;
  incrementOfflineQueue: () => void;
  clearOfflineQueue: () => void;

}

const initialPatients: Patient[] = [
  { id: '1001', name: 'Demo Patient A', room: 'Room 1', status: 'running', time: '14:10' },
  { id: '1002', name: 'Demo Patient B', room: 'Room 2', status: 'open', time: '11:48' },
  { id: '1003', name: 'Demo Patient C', room: 'Room 3', status: 'closed', time: '10.06.' }
];

export const useAppStore = create<AppStore>((set, get) => ({
  // Language: default English, persisted in localStorage
  language: (() => {
    try { return (localStorage.getItem('midwife_lang') as 'de' | 'en') || 'en'; } catch { return 'en'; }
  })() as 'de' | 'en',
  setLanguage: (lang) => {
    try { localStorage.setItem('midwife_lang', lang); } catch {}
    set({ language: lang });
  },
  themeName: 'classicViolet',
  setThemeName: (theme) => set({ themeName: theme }),
  fontFamilyKey: 'Outfit',
  setFontFamilyKey: (font) => set({ fontFamilyKey: font }),

  appState: 'idle',
  setAppState: (state) => set({ appState: state }),
  isNewCase: true,
  setIsNewCase: (val) => set({ isNewCase: val }),

  isAuthenticated: false,
  user: null,
  login: (username) => set({
    isAuthenticated: true,
    user: {
      username,
      initials: 'M',
      fullName: 'Midwife',
      pinSet: true
    }
  }),
  logout: () => set({ isAuthenticated: false, user: null }),
  setPinSet: (val) => set((state) => ({
    user: state.user ? { ...state.user, pinSet: val } : null
  })),

  patients: initialPatients,
  activePatient: initialPatients[0],
  setActivePatient: (patient) => set({ activePatient: patient }),
  addPatient: (p) => set((state) => {
    const newPatient: Patient = {
      ...p,
      id: p.id || String(100000 + Math.floor(Math.random() * 900000)),
      status: 'open'
    };
    return {
      patients: [newPatient, ...state.patients],
      activePatient: newPatient,
      isNewCase: true
    };
  }),

  offlineQueueCount: 3, // Defaults to 3 to mirror the prototype state
  incrementOfflineQueue: () => set((state) => ({ offlineQueueCount: state.offlineQueueCount + 1 })),
  clearOfflineQueue: () => set({ offlineQueueCount: 0 }),

}));

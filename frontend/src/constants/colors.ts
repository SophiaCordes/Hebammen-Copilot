export const Palettes = {
  classicViolet: {
    bg: '#FBFBFD',
    ink: '#1A1A2E',
    accent: '#5B4FD6',
    accentPress: '#4A3FBE',
    accentSoft: '#EEEDFA',
    amber: '#B26A00',
    amberSoft: '#FCF3E3',
    red: '#C0392B',
    redSoft: '#FAEBE9',
    green: '#1E7B45',
    greenSoft: '#E7F4EC',
    card: '#FFFFFF',
    line: '#E5E5F0',
    lineStrong: '#C9C9DC',
    inkSoft: '#4A4A63',
  },
  warmSage: {
    bg: '#FCFAF7',          // warm cream
    ink: '#142E2B',         // deep teal-ink
    accent: '#1E6B65',      // sage accent
    accentPress: '#144B47',
    accentSoft: '#EAF2F1',  // mint soft
    amber: '#B26A00',
    amberSoft: '#FCF3E3',
    red: '#C0392B',
    redSoft: '#FAEBE9',
    green: '#1E7B45',
    greenSoft: '#E7F4EC',
    card: '#FFFFFF',
    line: '#ECE6DC',        // warm line
    lineStrong: '#C5BEB4',
    inkSoft: '#3D5250',
  },
  oceanBreeze: {
    bg: '#F8FAFC',          // cool slate-white
    ink: '#0F172A',         // slate-900
    accent: '#0E7490',      // ocean accent
    accentPress: '#0891B2',
    accentSoft: '#ECFEFF',  // soft sky cyan
    amber: '#B45309',
    amberSoft: '#FEF3C7',
    red: '#B91C1C',
    redSoft: '#FEE2E2',
    green: '#15803D',
    greenSoft: '#DCFCE7',
    card: '#FFFFFF',
    line: '#E2E8F0',
    lineStrong: '#CBD5E1',
    inkSoft: '#475569',
  },
  slateDark: {
    bg: '#12121E',          // dark background
    ink: '#F8FAFC',         // bright text
    accent: '#9F92EC',      // soft periwinkle/lavender
    accentPress: '#B1A7F0',
    accentSoft: '#2E2E44',  // dark surface chip
    amber: '#F59E0B',
    amberSoft: '#452A0A',
    red: '#EF4444',
    redSoft: '#471414',
    green: '#10B981',
    greenSoft: '#0A3B25',
    card: '#1A1A2E',        // card surface
    line: '#2E2E44',        // dark line border
    lineStrong: '#4A4A63',
    inkSoft: '#94A3B8',     // secondary text
  },
  blossomPink: {
    bg: '#FDFBFB',          // soft warm pearl
    ink: '#301820',         // deep aubergine
    accent: '#C86984',      // blossom accent
    accentPress: '#A8506B',
    accentSoft: '#FAF0F2',  // rose-water surface
    amber: '#B26A00',
    amberSoft: '#FCF3E3',
    red: '#C0392B',
    redSoft: '#FAEBE9',
    green: '#1E7B45',
    greenSoft: '#E7F4EC',
    card: '#FFFFFF',
    line: '#F5ECEE',        // soft rose line
    lineStrong: '#E5D6DA',
    inkSoft: '#5A3D46',
  },
  vibrantPink: {
    bg: '#FFF8FB',          // warm white with pink undertone
    ink: '#2D1220',         // deep plum/aubergine
    accent: '#FF6BB5',      // vibrant pink accent
    accentPress: '#E0509B',
    accentSoft: '#FFEBF4',  // soft pink tint surface
    amber: '#B26A00',
    amberSoft: '#FCF3E3',
    red: '#C0392B',
    redSoft: '#FAEBE9',
    green: '#1E7B45',
    greenSoft: '#E7F4EC',
    card: '#FFFFFF',
    line: '#FCE5F0',        // pink hairline
    lineStrong: '#F7C5DE',
    inkSoft: '#5A374A',
  },
  softTurquoise: {
    bg: '#F5FBFB',          // clean white with soft blue undertone
    ink: '#102B2C',         // deep teal-ink
    accent: '#4BC3C6',      // soft turquoise accent
    accentPress: '#3AA5A8',
    accentSoft: '#EBF7F7',  // soft turquoise tint surface
    amber: '#B26A00',
    amberSoft: '#FCF3E3',
    red: '#C0392B',
    redSoft: '#FAEBE9',
    green: '#1E7B45',
    greenSoft: '#E7F4EC',
    card: '#FFFFFF',
    line: '#E2F2F2',        // light turquoise hairline
    lineStrong: '#C9E6E6',
    inkSoft: '#3D5C5D',
  },
};

export const Colors = Palettes.classicViolet;
export type ColorKeys = keyof typeof Palettes.classicViolet;
export type ThemeName = keyof typeof Palettes;

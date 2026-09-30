import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

export const WarningIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M12 3.5L21.5 20H2.5L12 3.5z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 10v4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Circle cx="12" cy="17" r="1.1" fill={color} />
  </Svg>
);

export const CheckIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CloseIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M9 5l7 7-7 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const PlayIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#FFFFFF', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M8 5v14l11-7-11-7z" fill={color} />
  </Svg>
);

export const PauseIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#FFFFFF', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill={color} />
  </Svg>
);

export const StopIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#FFFFFF', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Rect x="6" y="6" width="12" height="12" rx="2.5" fill={color} />
  </Svg>
);

export const MicIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#FFFFFF', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M12 3a3.2 3.2 0 0 0-3.2 3.2v5.2a3.2 3.2 0 0 0 6.4 0V6.2A3.2 3.2 0 0 0 12 3z" fill={color} />
    <Path d="M5.5 11.2v0.6a6.5 6.5 0 0 0 13 0v-0.6M12 18.3V21M8.5 21h7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DeviceIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Rect x="6" y="3" width="12" height="18" rx="3" stroke={color} strokeWidth="1.8" />
    <Path d="M10.5 18.5h3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export const EditIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <Path d="M13.5 6.5l3 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const SaveIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#FFFFFF', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M17 21v-8H7v8M7 3v5h8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ClockIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <Path d="M12 7.5V12l3 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M15 19l-7-7 7-7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const LockIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Rect x="5" y="8" width="14" height="11" rx="3" stroke={color} strokeWidth="2" />
    <Path d="M12 8V4M9 4h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="9.5" cy="13" r="1.2" fill={color} />
    <Circle cx="14.5" cy="13" r="1.2" fill={color} />
  </Svg>
);

export const InfoIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path d="M12 8v4M12 16h.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const InfoSmallIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <Path d="M12 11v5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="12" cy="8" r="1.2" fill={color} />
  </Svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M21.5 2v6h-6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const ClockIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" />
    <path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="1.5" fill={color} />
  </svg>
);

export const AllInclusiveIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={color} fillOpacity="0.15" />
    <path d="M8 12h8M12 8v8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M5 5l2 2M17 5l-2 2M5 19l2-2M17 19l-2-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const WinterSunIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="10" r="4" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
    <path d="M12 2v2M12 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 10h2M20 10h2M4.93 15.07l1.41-1.41M17.66 2.34l1.41-1.41" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M6 20c0-2 2-4 6-4s6 2 6 4" stroke={color} strokeWidth="2" strokeLinecap="round" fill={color} fillOpacity="0.1" />
  </svg>
);

export const AdultsOnlyIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={color} fillOpacity="0.15" />
    <path d="M9 9c0-1.66 1.34-3 3-3s3 1.34 3 3v1H9V9z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
    <path d="M7 18c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="17" cy="8" r="2" fill={color} />
  </svg>
);

export const DealsIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <circle cx="7" cy="7" r="1.5" fill={color} />
    <path d="M14 14l-4-4" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const BeachIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 20h20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M4 20c2-2 4-3 8-3s6 1 8 3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
    <path d="M12 4v8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 4l6 5H6l6-5z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="18" cy="6" r="2.5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const SchoolHolsIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3L2 9l10 6 10-6-10-6z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M5 12v5c0 2 3.13 4 7 4s7-2 7-4v-5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M21 9v6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="21" cy="16" r="1" fill={color} />
  </svg>
);

export const SoloIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="4" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
    <path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="19" cy="6" r="2" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1" />
  </svg>
);

export const FamilyIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="7" r="3" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
    <circle cx="17" cy="8" r="2.5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
    <path d="M3 19c0-2.76 2.69-5 6-5s6 2.24 6 5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M15 19c0-2.21 1.79-4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 12l-1 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="6" cy="11" r="1.5" fill={color} fillOpacity="0.4" />
  </svg>
);

export const LgbtqIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="4" width="18" height="16" rx="3" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5" />
    <path d="M7 8h4v2H7zM7 12h4v2H7zM7 16h4v2H7z" fill={color} fillOpacity="0.3" />
    <path d="M14 9c1 1 1 3 0 4M16 8c2 2 2 6 0 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const CityBreakIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="6" width="8" height="14" rx="1" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
    <rect x="14" y="2" width="8" height="18" rx="1" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
    <rect x="4" y="8" width="2" height="2" rx="0.5" fill={color} fillOpacity="0.5" />
    <rect x="4" y="12" width="2" height="2" rx="0.5" fill={color} fillOpacity="0.5" />
    <rect x="4" y="16" width="2" height="2" rx="0.5" fill={color} fillOpacity="0.5" />
    <rect x="16" y="4" width="2" height="2" rx="0.5" fill={color} fillOpacity="0.5" />
    <rect x="16" y="8" width="2" height="2" rx="0.5" fill={color} fillOpacity="0.5" />
    <rect x="16" y="12" width="2" height="2" rx="0.5" fill={color} fillOpacity="0.5" />
    <rect x="18" y="6" width="2" height="2" rx="0.5" fill={color} fillOpacity="0.5" />
    <rect x="18" y="10" width="2" height="2" rx="0.5" fill={color} fillOpacity="0.5" />
  </svg>
);

export const TrendingIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 20l6-6 4 4 8-12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 6h6v6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="4" cy="18" r="2" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
    <circle cx="10" cy="12" r="2" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
    <circle cx="14" cy="16" r="2" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const RomanticIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 21C12 21 3 13.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 12 5C12.09 3.81 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 13.5 12 21 12 21Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 9l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MountainIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 20L9 6l4 6 3-4 6 12H2z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M7 14l2-3 2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 12l1.5-2L18 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 6l1-2 1 2" fill={color} fillOpacity="0.4" />
  </svg>
);

export const GroupIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="8" cy="7" r="3" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
    <circle cx="16" cy="7" r="3" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
    <path d="M2 19c0-2.76 2.69-5 6-5s6 2.24 6 5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M14 19c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 12l-1 3M14 12l1 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const FanFavesIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 13l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GolfIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="14" r="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
    <path d="M12 2v12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 2l5 3-5 3" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6 20h12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 22h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const NightlifeIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={color} fillOpacity="0.1" />
    <path d="M9 8l2 4-2 4M15 8l-2 4 2 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.5" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const GymIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="10" width="4" height="4" rx="1" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
    <rect x="18" y="10" width="4" height="4" rx="1" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
    <path d="M6 12h12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <rect x="4" y="8" width="2" height="8" rx="1" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1" />
    <rect x="18" y="8" width="2" height="8" rx="1" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1" />
  </svg>
);

export const StudentIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3L2 9l10 6 10-6-10-6z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 9v6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="20" cy="16" r="1.5" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" />
    <path d="M8 14l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ActiveIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 6l-2 4h4l-2 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WellnessIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 22C12 22 4 16 4 10C4 6 7 3 12 3s8 3 8 7c0 6-8 12-8 12z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2" />
    <path d="M12 3c0 4-3 6-3 10s3 6 3 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 3c0 4 3 6 3 10s-3 6-3 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="10" r="2" fill={color} fillOpacity="0.4" />
  </svg>
);

export const FoodieIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 12h18c0 4.42-4.03 8-9 8s-9-3.58-9-8z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2" />
    <path d="M8 12V4M8 4c0 2 2 3 4 3M16 12V6M16 6c0 2-2 3-4 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12c0-4 4-7 9-7s9 3 9 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const GreenFlagsIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 21V4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M4 4c3 0 5 2 8 2s5-2 8-2v10c-3 0-5 2-8 2s-5-2-8-2" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BoysTripsIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="7" cy="7" r="3" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
    <circle cx="17" cy="7" r="3" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
    <path d="M1 19c0-2.76 2.69-5 6-5s6 2.24 6 5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M13 19c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 5l1 1M19 5l-1 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 16l-1 2M15 16l1 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

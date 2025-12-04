import React from 'react';

export const SelectionIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="selectionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="28" fill="url(#selectionGrad)" opacity="0.1" />
    
    {/* TV Screen */}
    <rect x="14" y="18" width="36" height="24" rx="3" fill="url(#selectionGrad)" />
    <rect x="16" y="20" width="32" height="20" rx="2" fill="white" opacity="0.2" />
    
    {/* Grid pattern inside screen */}
    <rect x="18" y="22" width="8" height="6" rx="1" fill="white" opacity="0.9" />
    <rect x="28" y="22" width="8" height="6" rx="1" fill="white" opacity="0.9" />
    <rect x="38" y="22" width="8" height="6" rx="1" fill="white" opacity="0.9" />
    <rect x="18" y="30" width="8" height="6" rx="1" fill="white" opacity="0.7" />
    <rect x="28" y="30" width="8" height="6" rx="1" fill="white" opacity="0.7" />
    <rect x="38" y="30" width="8" height="6" rx="1" fill="white" opacity="0.7" />
    
    {/* Stand */}
    <rect x="28" y="42" width="8" height="2" rx="1" fill="url(#selectionGrad)" />
    <rect x="24" y="44" width="16" height="2" rx="1" fill="url(#selectionGrad)" opacity="0.6" />
  </svg>
);

export const QualityIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="qualityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="28" fill="url(#qualityGrad)" opacity="0.1" />
    
    {/* Play button circle */}
    <circle cx="32" cy="32" r="20" fill="url(#qualityGrad)" />
    <circle cx="32" cy="32" r="18" fill="url(#qualityGrad)" opacity="0.8" />
    
    {/* Play triangle */}
    <path d="M28 24L28 40L42 32L28 24Z" fill="white" />
    
    {/* 4K Badge */}
    <rect x="38" y="12" width="18" height="10" rx="5" fill="url(#qualityGrad)" />
    <text x="47" y="19" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">4K</text>
    
    {/* Quality bars */}
    <rect x="10" y="44" width="3" height="8" rx="1.5" fill="url(#qualityGrad)" opacity="0.4" />
    <rect x="15" y="40" width="3" height="12" rx="1.5" fill="url(#qualityGrad)" opacity="0.6" />
    <rect x="20" y="36" width="3" height="16" rx="1.5" fill="url(#qualityGrad)" opacity="0.8" />
  </svg>
);

export const SecurityIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="securityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="28" fill="url(#securityGrad)" opacity="0.1" />
    
    {/* Shield shape */}
    <path d="M32 10C32 10 16 16 16 28C16 44 32 54 32 54C32 54 48 44 48 28C48 16 32 10 32 10Z" 
          fill="url(#securityGrad)" />
    <path d="M32 12C32 12 18 17 18 28C18 42 32 51 32 51C32 51 46 42 46 28C46 17 32 12 32 12Z" 
          fill="white" opacity="0.15" />
    
    {/* Checkmark */}
    <path d="M24 30L29 36L40 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Decorative dots */}
    <circle cx="52" cy="16" r="2.5" fill="url(#securityGrad)" opacity="0.6" />
    <circle cx="12" cy="20" r="2" fill="url(#securityGrad)" opacity="0.4" />
  </svg>
);

export const GlobalIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="globalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="28" fill="url(#globalGrad)" opacity="0.1" />
    
    {/* Globe */}
    <circle cx="32" cy="32" r="20" fill="url(#globalGrad)" />
    <circle cx="32" cy="32" r="18" fill="url(#globalGrad)" opacity="0.8" />
    
    {/* Latitude lines */}
    <ellipse cx="32" cy="32" rx="18" ry="6" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" />
    <line x1="14" y1="32" x2="50" y2="32" stroke="white" strokeWidth="1.5" opacity="0.6" />
    
    {/* Longitude lines */}
    <ellipse cx="32" cy="32" rx="6" ry="18" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" />
    <line x1="32" y1="14" x2="32" y2="50" stroke="white" strokeWidth="1.5" opacity="0.6" />
    
    {/* Connection points */}
    <circle cx="32" cy="14" r="2" fill="white" />
    <circle cx="50" cy="32" r="2" fill="white" />
    <circle cx="32" cy="50" r="2" fill="white" />
    <circle cx="14" cy="32" r="2" fill="white" />
    
    {/* Signal waves */}
    <path d="M54 12C54 12 56 14 56 16C56 18 54 20 54 20" stroke="url(#globalGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <path d="M52 14C52 14 53 15 53 16C53 17 52 18 52 18" stroke="url(#globalGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export const DevicesIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="devicesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="28" fill="url(#devicesGrad)" opacity="0.1" />
    
    {/* Desktop monitor */}
    <rect x="10" y="16" width="32" height="22" rx="2" fill="url(#devicesGrad)" />
    <rect x="12" y="18" width="28" height="18" rx="1" fill="white" opacity="0.2" />
    <rect x="24" y="38" width="8" height="2" rx="1" fill="url(#devicesGrad)" />
    <rect x="20" y="40" width="16" height="2" rx="1" fill="url(#devicesGrad)" opacity="0.6" />
    
    {/* Tablet */}
    <rect x="36" y="22" width="18" height="26" rx="2" fill="url(#devicesGrad)" opacity="0.8" />
    <rect x="38" y="24" width="14" height="20" rx="1" fill="white" opacity="0.2" />
    <circle cx="45" cy="46" r="1.5" fill="white" opacity="0.5" />
    
    {/* Smartphone */}
    <rect x="44" y="34" width="12" height="20" rx="2" fill="url(#devicesGrad)" />
    <rect x="46" y="36" width="8" height="16" rx="1" fill="white" opacity="0.2" />
    <circle cx="50" cy="52" r="1" fill="white" opacity="0.5" />
  </svg>
);

export const SetupIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="setupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="28" fill="url(#setupGrad)" opacity="0.1" />
    
    {/* Rocket body */}
    <path d="M32 10L38 28L32 52L26 28L32 10Z" fill="url(#setupGrad)" />
    <path d="M32 12L36 28L32 48L28 28L32 12Z" fill="white" opacity="0.2" />
    
    {/* Rocket window */}
    <circle cx="32" cy="22" r="4" fill="white" opacity="0.9" />
    <circle cx="32" cy="22" r="2.5" fill="url(#setupGrad)" opacity="0.3" />
    
    {/* Rocket fins */}
    <path d="M26 28L20 38L26 36Z" fill="url(#setupGrad)" opacity="0.8" />
    <path d="M38 28L44 38L38 36Z" fill="url(#setupGrad)" opacity="0.8" />
    
    {/* Flame */}
    <ellipse cx="32" cy="52" rx="6" ry="8" fill="#FCD34D" opacity="0.6" />
    <ellipse cx="32" cy="52" rx="4" ry="6" fill="#FCA5A5" opacity="0.8" />
    
    {/* Stars */}
    <circle cx="14" cy="18" r="2" fill="url(#setupGrad)" opacity="0.5" />
    <circle cx="50" cy="24" r="2.5" fill="url(#setupGrad)" opacity="0.6" />
    <circle cx="48" cy="44" r="1.5" fill="url(#setupGrad)" opacity="0.4" />
    <circle cx="16" cy="40" r="2" fill="url(#setupGrad)" opacity="0.5" />
  </svg>
);

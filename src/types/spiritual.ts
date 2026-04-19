// Spiritual Energy System - Type Definitions & Constants

export interface SpiritualStats {
  dust: number;          // Purity & Clarity (0-100)
  energy: number;        // Power Surge (0-100)
  pulse: number;         // Rapid Timing (0-100)
  fusion: number;        // Core Concentration (0-100)
  drive: number;         // Hyper Intensity (0-100)
}

export interface StatModifier {
  stat: keyof SpiritualStats;
  amount: number;
  reason: string;
}

export interface ResonanceState {
  level: 0 | 1 | 2 | 3; // 0=none, 1=harmony, 2=sync, 3=transcendence
  activeStats: (keyof SpiritualStats)[];
  activatedAt?: number; // timestamp
}

export type DhikrType = 'subhan' | 'alhamdulillah' | 'akbar' | 'astaghfirullah';

export interface DhikrEvent {
  type: DhikrType;
  arabic: string;
  transliteration: string;
  meaning: string;
  emotion: string;
}

// Dhikr Confirmations & Meanings
export const DHIKRS: Record<DhikrType, DhikrEvent> = {
  subhan: {
    type: 'subhan',
    arabic: 'سبحان الله',
    transliteration: 'Subhan\'Allah',
    meaning: 'Glory be to Allah',
    emotion: 'Clarity & Purity'
  },
  alhamdulillah: {
    type: 'alhamdulillah',
    arabic: 'الحمد لله',
    transliteration: 'Alhamdulillah',
    meaning: 'Praise be to Allah',
    emotion: 'Gratitude & Recognition'
  },
  akbar: {
    type: 'akbar',
    arabic: 'الله أكبر',
    transliteration: 'Allahu Akbar',
    meaning: 'Allah is Greatest',
    emotion: 'Victory & Triumph'
  },
  astaghfirullah: {
    type: 'astaghfirullah',
    arabic: 'أستغفر الله وأتوب إليه',
    transliteration: 'Astaghfirullah wa atubu ilaih',
    meaning: 'I seek forgiveness from Allah',
    emotion: 'Humility & Renewal'
  }
};

// Stat Colors & Visual identity
export const STAT_COLORS = {
  dust: {
    primary: '#d4af37',      // Gold
    secondary: '#f0e68c',    // Light gold
    glow: 'rgba(212, 175, 55, 0.4)',
    particle: '✨'
  },
  energy: {
    primary: '#a855f7',      // Violet
    secondary: '#d946ef',    // Magenta
    glow: 'rgba(168, 85, 247, 0.4)',
    particle: '⚡'
  },
  pulse: {
    primary: '#3b82f6',      // Blue
    secondary: '#f472b6',    // Rose
    glow: 'rgba(59, 130, 246, 0.4)',
    particle: '💓'
  },
  fusion: {
    primary: '#06b6d4',      // Cyan
    secondary: '#10b981',    // Green
    glow: 'rgba(6, 182, 212, 0.4)',
    particle: '🔮'
  },
  drive: {
    primary: '#f97316',      // Orange
    secondary: '#dc2626',    // Red
    glow: 'rgba(249, 115, 22, 0.4)',
    particle: '🚀'
  }
};

// Stat Gain Rules
export const STAT_GAIN_RULES = {
  dust: {
    baseGain: 1,
    triggers: [
      { event: 'perfectClickSeries', points: 1, consecutive: 3 },
      { event: 'levelComplete', points: 2, efficiency: 0.8 },
      { event: 'threeConsecutiveWins', points: 1, times: 1 },
      { event: 'highEfficiency', points: 1, efficiency: 0.9, chance: 0.15 }
    ],
    maxPerSession: 15
  },
  energy: {
    baseGain: 1,
    triggers: [
      { event: 'everyClickCount', points: 1, every: 5 },
      { event: 'clickerLevelComplete', points: 5 },
      { event: 'comboAchieved', points: 3, comboSize: 5 }
    ],
    maxPerSession: 20
  },
  pulse: {
    baseGain: 2,
    triggers: [
      { event: 'speedLevelClick', points: 2 },
      { event: 'speedLevelNoTimeout', points: 10 },
      { event: 'timeout', points: -5 },
      { event: 'perfectTiming', points: 5, window: 0.2 }
    ],
    maxPerSession: 25
  },
  fusion: {
    baseGain: 3,
    triggers: [
      { event: 'comboAchieved', points: 3, comboSize: 5 },
      { event: 'findOrMovingLevelComplete', points: 8 },
      { event: 'levelFail', points: -2 },
      { event: 'timeout', points: -2 }
    ],
    maxPerSession: 20
  },
  drive: {
    baseGain: 1,
    triggers: [
      { event: 'everyClickCount', points: 1, every: 10 },
      { event: 'hardestLevelComplete', points: 15 },
      { event: 'levelFail', points: -10 },
      { event: 'criticalHit', points: 5 }
    ],
    maxPerSession: 15,
    dangerous: true
  }
};

// Stat Effect Thresholds & Benefits
export const STAT_EFFECTS = {
  dust: {
    25: { name: 'Clarity Glimpse', effect: 'Targets in Find mode glow briefly before moving (0.2s)' },
    50: { name: 'Pure Focus', effect: 'Missed clicks no longer count against you' },
    75: { name: 'Crystal Path', effect: 'Moving targets slow by 10%' },
    100: { name: 'Perfect Clarity', effect: 'Unlocks Combo Base Multiplier synergy' }
  },
  energy: {
    25: { name: 'First Surge', effect: 'All clicks worth 1.05x their value' },
    50: { name: 'Power Awakens', effect: 'All clicks worth 1.15x their value' },
    75: { name: 'Overcharge', effect: 'All clicks worth 1.25x their value' },
    100: { name: 'Critical Burst', effect: 'All clicks worth 1.5x their value + visual lightning effect' }
  },
  pulse: {
    25: { name: 'Rhythm Detection', effect: '+0.5s bonus time on speed levels' },
    50: { name: 'Heartbeat Sync', effect: '+1.5s bonus time on speed levels' },
    75: { name: 'Perfect Timing', effect: '+2.5s bonus time on speed levels' },
    100: { name: 'Zone Mode', effect: 'Time visible + 10% slower visual effect during gameplay' }
  },
  fusion: {
    25: { name: 'Focus Begins', effect: 'Combo multiplicator starts at 2x instead of 1x' },
    50: { name: 'Convergence', effect: 'Combo multiplicator starts at 3x' },
    75: { name: 'Harmonic Resonance', effect: 'Each combo hit adds +10% to multiplier (was +5%)' },
    100: { name: 'Infinite Confluence', effect: 'Combo never expires for 10 seconds (constant buff)' }
  },
  drive: {
    25: { name: 'Chaos Touch', effect: 'Random 10% of clicks grant 2x points' },
    50: { name: 'Overdrive Engaged', effect: 'Random 25% of clicks grant 2x points, 5% grant 3x' },
    75: { name: 'Extreme Acceleration', effect: 'Random 40% grant 2x, 15% grant 3x' },
    100: { name: '★ OVERDRIVE ★', effect: 'All clicks worth 1.5x-3.5x randomly (chaotic power)' }
  }
};

// Resonance Tiers
export const RESONANCE_TIERS = {
  1: {
    level: 1,
    name: 'Harmony',
    requirement: '2+ stats > 50%',
    effects: [
      '+10% to both active stat generation rates',
      'Slight golden connection visible between stats',
      '40% chance of Alhamdulillah Dhikr'
    ]
  },
  2: {
    level: 2,
    name: 'Synchronization',
    requirement: '3+ stats > 60%',
    effects: [
      '+20% stat generation rate',
      'Unlimited combo for 5 seconds every 30 seconds',
      'Visual rainbow aura connecting all stats',
      '60% chance of harmony-related Dhikr'
    ]
  },
  3: {
    level: 3,
    name: 'Transcendence',
    requirement: 'All 5 stats > 75%',
    effects: [
      '2x all stat generation',
      'All combos with 2x multiplier',
      'All clicks worth 1.5x their value',
      'Guaranteed Allahu Akbar Dhikr',
      'Screen fills with golden light',
      'Lasts 10 seconds (cooldown: 60 sec)'
    ]
  }
};

// Dhikr Trigger Conditions
export const DHIKR_TRIGGERS = {
  subhan: {
    triggers: [
      { event: 'dustReaches25', chance: 1.0, cooldown: 300000 },
      { event: 'threeConsecutiveWins', chance: 1.0, cooldown: 300000 },
      { event: 'highEfficiency', chance: 0.15, efficiency: 0.9, cooldown: 120000 },
      { event: 'clarityMoment', chance: 0.5, cooldown: 300000 }
    ],
    maxPerSession: 2
  },
  alhamdulillah: {
    triggers: [
      { event: 'levelComplete', chance: 1.0 },
      { event: 'newLevelUnlocked', chance: 1.0, cooldown: 300000 },
      { event: 'resonanceAchieved', chance: 0.4, cooldown: 300000 },
      { event: 'personalRecord', chance: 0.6, cooldown: 300000 }
    ],
    maxPerSession: 4
  },
  akbar: {
    triggers: [
      { event: 'hardestMissionComplete', chance: 1.0, levelId: 6, cooldown: 600000 },
      { event: 'personalBestScore', chance: 1.0, cooldown: 600000 },
      { event: 'hyperDrive100', chance: 1.0, cooldown: 600000 },
      { event: 'transcendenceModeActivated', chance: 1.0, cooldown: 600000 }
    ],
    maxPerSession: 2
  },
  astaghfirullah: {
    triggers: [
      { event: 'consecutiveFails', chance: 1.0, times: 2, cooldown: 180000 },
      { event: 'timeoutThreeTimes', chance: 1.0, times: 3, cooldown: 180000 },
      { event: 'retryAfterHardLevel', chance: 0.8, cooldown: 300000 },
      { event: 'humilityMoment', chance: 0.4, cooldown: 300000 }
    ],
    maxPerSession: 2
  }
};

// Stat Colors for dynamic UI rendering
export const getStatColor = (stat: keyof SpiritualStats): string => {
  return STAT_COLORS[stat].primary;
};

export const getStatEmoji = (stat: keyof SpiritualStats): string => {
  const emoji = {
    dust: '✨',
    energy: '⚡',
    pulse: '💓',
    fusion: '🔮',
    drive: '🚀'
  };
  return emoji[stat];
};

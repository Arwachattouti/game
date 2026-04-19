// Spiritual Energy Management System

import {
  SpiritualStats,
  StatModifier,
  ResonanceState,
  DhikrType,
  STAT_COLORS,
  DHIKR_TRIGGERS,
  RESONANCE_TIERS
} from '../types/spiritual';

export class SpiritualEnergyManager {
  private stats: SpiritualStats = {
    dust: 0,
    energy: 0,
    pulse: 0,
    fusion: 0,
    drive: 0
  };

  private lastDhikrTime: Record<DhikrType, number> = {
    subhan: 0,
    alhamdulillah: 0,
    akbar: 0,
    astaghfirullah: 0
  };

  private dhikrCountSession: Record<DhikrType, number> = {
    subhan: 0,
    alhamdulillah: 0,
    akbar: 0,
    astaghfirullah: 0
  };

  private resonanceState: ResonanceState = {
    level: 0,
    activeStats: []
  };

  private sessionStartTime: number = Date.now();

  constructor() {
    this.loadStats();
  }

  // ===================
  // STAT MANAGEMENT
  // ===================

  loadStats() {
    const saved = localStorage.getItem('nightMission_stats');
    if (saved) {
      try {
        this.stats = JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to load stats:', e);
      }
    }
  }

  saveStats() {
    localStorage.setItem('nightMission_stats', JSON.stringify(this.stats));
  }

  getStats(): SpiritualStats {
    return { ...this.stats };
  }

  addStat(stat: keyof SpiritualStats, amount: number, reason?: string) {
    const before = this.stats[stat];
    this.stats[stat] = Math.max(0, Math.min(100, this.stats[stat] + amount));
    const after = this.stats[stat];

    if (reason && amount > 0) {
      console.log(`[${stat}] +${amount} ${reason}: ${before} → ${after}`);
    }

    this.saveStats();
    return {
      stat,
      amount: after - before,
      reason: reason || 'unknown'
    };
  }

  // Check for stat milestones (25%, 50%, 75%, 100%)
  getStatMilestones(stat: keyof SpiritualStats): number[] {
    const value = this.stats[stat];
    const milestones: number[] = [];

    if (value >= 25) milestones.push(25);
    if (value >= 50) milestones.push(50);
    if (value >= 75) milestones.push(75);
    if (value >= 100) milestones.push(100);

    return milestones;
  }

  // ===================
  // EFFECT CALCULATION
  // ===================

  getClickMultiplier(): number {
    let multiplier = 1;

    // Energy multiplier
    if (this.stats.energy >= 100) multiplier *= 1.5;
    else if (this.stats.energy >= 75) multiplier *= 1.25;
    else if (this.stats.energy >= 50) multiplier *= 1.15;
    else if (this.stats.energy >= 25) multiplier *= 1.05;

    // Drive provides random crit multiplier
    if (this.stats.drive >= 100) {
      const roll = Math.random();
      if (roll < 0.4) multiplier *= 2;
      if (roll < 0.15) multiplier *= 3.5;
      if (roll < 0.4) multiplier *= 1.5;
    } else if (this.stats.drive >= 75) {
      const roll = Math.random();
      if (roll < 0.4) multiplier *= 2;
      if (roll < 0.15) multiplier *= 3;
    } else if (this.stats.drive >= 50) {
      const roll = Math.random();
      if (roll < 0.25) multiplier *= 2;
      if (roll < 0.05) multiplier *= 3;
    } else if (this.stats.drive >= 25) {
      if (Math.random() < 0.1) multiplier *= 2;
    }

    // Resonance boost
    if (this.resonanceState.level === 3) {
      multiplier *= 1.5;
    }

    return multiplier;
  }

  getSpeedBonus(): number {
    // Pulse gives time bonuses on speed levels
    if (this.stats.pulse >= 100) return 2.5;
    if (this.stats.pulse >= 75) return 2.5;
    if (this.stats.pulse >= 50) return 1.5;
    if (this.stats.pulse >= 25) return 0.5;
    return 0;
  }

  getComboMultiplier(baseMultiplier: number): number {
    // Fusion affects combo behavior
    if (this.stats.fusion >= 100) return baseMultiplier * 2;
    if (this.stats.fusion >= 75) return baseMultiplier * 1.5;
    if (this.stats.fusion >= 50) return baseMultiplier;
    if (this.stats.fusion >= 25) return Math.max(2, baseMultiplier);
    return baseMultiplier;
  }

  getDustClarityBonus(): { targetGlow: boolean; slowMoving: boolean; missMissed: boolean } {
    return {
      targetGlow: this.stats.dust >= 25,
      slowMoving: this.stats.dust >= 75,
      missMissed: this.stats.dust >= 50
    };
  }

  // ===================
  // RESONANCE TIERS
  // ===================

  calculateResonance(): ResonanceState {
    const statsOver50 = Object.entries(this.stats)
      .filter(([_, val]) => val > 50)
      .map(([key]) => key as keyof SpiritualStats);

    const statsOver60 = Object.entries(this.stats)
      .filter(([_, val]) => val > 60)
      .map(([key]) => key as keyof SpiritualStats);

    const statsOver75 = Object.entries(this.stats)
      .filter(([_, val]) => val > 75)
      .map(([key]) => key as keyof SpiritualStats);

    let level: 0 | 1 | 2 | 3 = 0;
    let activeStats: (keyof SpiritualStats)[] = [];

    if (statsOver75.length === 5) {
      level = 3;
      activeStats = statsOver75;
    } else if (statsOver60.length >= 3) {
      level = 2;
      activeStats = statsOver60;
    } else if (statsOver50.length >= 2) {
      level = 1;
      activeStats = statsOver50;
    }

    this.resonanceState = {
      level,
      activeStats,
      activatedAt: level > 0 ? Date.now() : undefined
    };

    return this.resonanceState;
  }

  getResonanceState(): ResonanceState {
    return { ...this.resonanceState };
  }

  isTranscendenceActive(): boolean {
    if (this.resonanceState.level !== 3 || !this.resonanceState.activatedAt) {
      return false;
    }

    const elapsed = Date.now() - this.resonanceState.activatedAt;
    return elapsed < 10000; // 10 second duration
  }

  // ===================
  // DHIKR SYSTEM
  // ===================

  canTriggerDhikr(dhikrType: DhikrType, reason: string): boolean {
    const now = Date.now();
    const lastTime = this.lastDhikrTime[dhikrType];
    const config = DHIKR_TRIGGERS[dhikrType];

    // Check cooldown (minimum 2 minutes between same dhikrs)
    if (now - lastTime < 120000) {
      return false;
    }

    // Check session limit
    if (this.dhikrCountSession[dhikrType] >= config.maxPerSession) {
      return false;
    }

    return true;
  }

  triggerDhikr(dhikrType: DhikrType): boolean {
    if (!this.canTriggerDhikr(dhikrType, 'system')) {
      return false;
    }

    this.lastDhikrTime[dhikrType] = Date.now();
    this.dhikrCountSession[dhikrType]++;

    return true;
  }

  resetSessionDhikrs() {
    this.dhikrCountSession = {
      subhan: 0,
      alhamdulillah: 0,
      akbar: 0,
      astaghfirullah: 0
    };
    this.lastDhikrTime = {
      subhan: 0,
      alhamdulillah: 0,
      akbar: 0,
      astaghfirullah: 0
    };
  }

  // ===================
  // SESSION RESET
  // ===================

  resetSession() {
    this.sessionStartTime = Date.now();
    this.resetSessionDhikrs();
  }

  resetAllStats() {
    this.stats = {
      dust: 0,
      energy: 0,
      pulse: 0,
      fusion: 0,
      drive: 0
    };
    this.resonanceState = {
      level: 0,
      activeStats: []
    };
    this.saveStats();
  }
}

// Singleton instance
export const spiritualEnergyManager = new SpiritualEnergyManager();

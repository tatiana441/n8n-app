import { LEVELS, type GamificationData } from '@/types';
import { getGamification, setGamification, getDefaultGamification } from './storage';

// Get today's date in YYYY-MM-DD format
function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

// Check if two dates are consecutive
function areConsecutiveDays(date1: string, date2: string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

// Check if date is today
function isToday(date: string): boolean {
  return date === getTodayDate();
}

// Calculate level based on streak
export function calculateLevel(streak: number): { level: number; levelName: string } {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (streak >= LEVELS[i].requiredStreak) {
      return { level: LEVELS[i].level, levelName: LEVELS[i].name };
    }
  }
  return { level: 1, levelName: 'Curiosa' };
}

// Get unlocked features for a level
export function getUnlockedFeatures(level: number): string[] {
  const features: string[] = [];
  for (const lvl of LEVELS) {
    if (lvl.level <= level) {
      features.push(...lvl.unlocks);
    }
  }
  return features;
}

// Get progress to next level
export function getProgressToNextLevel(streak: number): {
  currentLevel: number;
  nextLevel: number | null;
  progress: number;
  daysToNext: number;
} {
  const { level } = calculateLevel(streak);
  const nextLevelData = LEVELS.find(l => l.level === level + 1);

  if (!nextLevelData) {
    return { currentLevel: level, nextLevel: null, progress: 100, daysToNext: 0 };
  }

  const currentLevelData = LEVELS.find(l => l.level === level)!;
  const streakInLevel = streak - currentLevelData.requiredStreak;
  const streakNeeded = nextLevelData.requiredStreak - currentLevelData.requiredStreak;
  const progress = Math.min((streakInLevel / streakNeeded) * 100, 100);
  const daysToNext = nextLevelData.requiredStreak - streak;

  return {
    currentLevel: level,
    nextLevel: nextLevelData.level,
    progress,
    daysToNext
  };
}

// Record activity (called when user sends a message)
export function recordActivity(): GamificationData {
  const data = getGamification();
  const today = getTodayDate();

  // Increment total messages
  data.totalMessages += 1;

  // Handle streak
  if (!data.lastActiveDate) {
    // First activity ever
    data.streak = 1;
  } else if (isToday(data.lastActiveDate)) {
    // Already active today, no streak change
  } else if (areConsecutiveDays(data.lastActiveDate, today)) {
    // Consecutive day, increment streak
    data.streak += 1;
  } else {
    // Streak broken, reset to 1
    data.streak = 1;
  }

  data.lastActiveDate = today;

  // Recalculate level
  const { level, levelName } = calculateLevel(data.streak);
  const previousLevel = data.level;
  data.level = level;
  data.levelName = levelName;
  data.unlockedFeatures = getUnlockedFeatures(level);

  // Check for level up
  if (level > previousLevel) {
    // Could trigger achievement/toast here
    console.log(`Level up! Now level ${level}: ${levelName}`);
  }

  setGamification(data);
  return data;
}

// Check and update streak on app load
export function checkStreak(): GamificationData {
  const data = getGamification();
  const today = getTodayDate();

  if (!data.lastActiveDate) {
    return data;
  }

  // If last active was not today and not yesterday, reset streak
  if (!isToday(data.lastActiveDate) && !areConsecutiveDays(data.lastActiveDate, today)) {
    data.streak = 0;
    const { level, levelName } = calculateLevel(data.streak);
    data.level = level;
    data.levelName = levelName;
    data.unlockedFeatures = getUnlockedFeatures(level);
    setGamification(data);
  }

  return data;
}

// Initialize gamification for new user
export function initializeGamification(): GamificationData {
  const data = getDefaultGamification();
  setGamification(data);
  return data;
}

// Get level info by level number
export function getLevelInfo(level: number) {
  return LEVELS.find(l => l.level === level) || LEVELS[0];
}

// Check if feature is unlocked
export function isFeatureUnlocked(feature: string, unlockedFeatures: string[]): boolean {
  return unlockedFeatures.includes(feature);
}

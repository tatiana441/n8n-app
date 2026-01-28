import type { UserData, GamificationData, ChatHistory, Message, DailyUsage } from '@/types';
import { FREE_DAILY_LIMIT } from '@/types';

const STORAGE_KEYS = {
  USER: 'keimi_user',
  GAMIFICATION: 'keimi_gamification',
  CHAT_HISTORY: 'keimi_chat_history',
  ONBOARDING_COMPLETE: 'keimi_onboarding_complete',
  DAILY_USAGE: 'keimi_daily_usage',
} as const;

// User data
export function getUser(): UserData | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
}

export function setUser(user: UserData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function clearUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.USER);
}

// Gamification data
export function getGamification(): GamificationData {
  if (typeof window === 'undefined') {
    return getDefaultGamification();
  }
  const data = localStorage.getItem(STORAGE_KEYS.GAMIFICATION);
  return data ? JSON.parse(data) : getDefaultGamification();
}

export function setGamification(data: GamificationData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.GAMIFICATION, JSON.stringify(data));
}

export function getDefaultGamification(): GamificationData {
  return {
    level: 1,
    levelName: 'Curiosa',
    totalMessages: 0,
    streak: 0,
    lastActiveDate: '',
    achievements: [],
    unlockedFeatures: ['chat'],
  };
}

// Chat history
export function getChatHistory(): ChatHistory {
  if (typeof window === 'undefined') {
    return { messages: [], savedRoutines: [] };
  }
  const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
  if (!data) return { messages: [], savedRoutines: [] };

  const parsed = JSON.parse(data);
  // Convert timestamp strings back to Date objects
  parsed.messages = parsed.messages.map((msg: Message & { timestamp: string }) => ({
    ...msg,
    timestamp: new Date(msg.timestamp),
  }));
  return parsed;
}

export function setChatHistory(history: ChatHistory): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(history));
}

export function addMessage(message: Message): void {
  const history = getChatHistory();
  history.messages.push(message);
  setChatHistory(history);
}

export function clearChatHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
}

// Onboarding
export function isOnboardingComplete(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === 'true';
}

export function setOnboardingComplete(complete: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, String(complete));
}

// Clear all data
export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Daily usage tracking
function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function getDailyUsage(): DailyUsage {
  if (typeof window === 'undefined') {
    return { date: getTodayDate(), messageCount: 0 };
  }

  const data = localStorage.getItem(STORAGE_KEYS.DAILY_USAGE);
  if (!data) {
    return { date: getTodayDate(), messageCount: 0 };
  }

  const usage: DailyUsage = JSON.parse(data);

  // Reset if it's a new day
  if (usage.date !== getTodayDate()) {
    return { date: getTodayDate(), messageCount: 0 };
  }

  return usage;
}

export function incrementDailyUsage(): DailyUsage {
  const usage = getDailyUsage();
  usage.messageCount += 1;

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.DAILY_USAGE, JSON.stringify(usage));
  }

  return usage;
}

export function canSendMessage(): boolean {
  const usage = getDailyUsage();
  return usage.messageCount < FREE_DAILY_LIMIT;
}

export function getRemainingMessages(): number {
  const usage = getDailyUsage();
  return Math.max(0, FREE_DAILY_LIMIT - usage.messageCount);
}

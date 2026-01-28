// User types
export interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  skinType: SkinType;
  concern: SkinConcern;
  experience: ExperienceLevel;
  createdAt: string;
  shopUrl?: string;
}

export type SkinType = 'dry' | 'oily' | 'combination' | 'sensitive';
export type SkinConcern = 'spots' | 'acne' | 'wrinkles' | 'pores' | 'hydration';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

// Gamification types
export interface GamificationData {
  level: number;
  levelName: string;
  totalMessages: number;
  streak: number;
  lastActiveDate: string;
  achievements: Achievement[];
  unlockedFeatures: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export const LEVELS = [
  { level: 1, name: 'Curiosa', requiredStreak: 0, unlocks: ['chat'] },
  { level: 2, name: 'Aprendiz', requiredStreak: 3, unlocks: ['tips'] },
  { level: 3, name: 'Entusiasta', requiredStreak: 7, unlocks: ['history'] },
  { level: 4, name: 'Devota', requiredStreak: 14, unlocks: ['community'] },
  { level: 5, name: 'Experta K-Beauty', requiredStreak: 30, unlocks: ['discounts'] },
] as const;

// Chat types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatHistory {
  messages: Message[];
  savedRoutines: Routine[];
}

export interface Routine {
  id: string;
  name: string;
  steps: RoutineStep[];
  createdAt: string;
  type: 'morning' | 'evening';
}

export interface RoutineStep {
  order: number;
  product: string;
  description: string;
}

// API types
export interface WebhookResponse {
  success: boolean;
  response: string;
  timestamp: string;
}

// Onboarding types
export interface OnboardingStep {
  id: string;
  question: string;
  options: OnboardingOption[];
}

export interface OnboardingOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

// Daily tip type
export interface DailyTip {
  id: string;
  title: string;
  content: string;
  category: 'routine' | 'ingredient' | 'technique' | 'myth';
}

// Usage limits
export interface DailyUsage {
  date: string; // YYYY-MM-DD format
  messageCount: number;
}

export const FREE_DAILY_LIMIT = 10; // Messages per day for free users
export const PREMIUM_DAILY_LIMIT = 999; // Basically unlimited for premium

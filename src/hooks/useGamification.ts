"use client";

import { useState, useEffect, useCallback } from "react";
import type { GamificationData } from "@/types";
import { getGamification } from "@/lib/storage";
import {
  checkStreak,
  getProgressToNextLevel,
  recordActivity,
  getLevelInfo,
} from "@/lib/gamification";

export function useGamification() {
  const [data, setData] = useState<GamificationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load and check streak on mount
  useEffect(() => {
    const gamificationData = checkStreak();
    setData(gamificationData);
    setIsLoading(false);
  }, []);

  // Refresh data
  const refresh = useCallback(() => {
    const gamificationData = getGamification();
    setData(gamificationData);
  }, []);

  // Record activity (external use)
  const logActivity = useCallback(() => {
    const updatedData = recordActivity();
    setData(updatedData);
    return updatedData;
  }, []);

  // Get progress info
  const progress = data
    ? getProgressToNextLevel(data.streak)
    : { currentLevel: 1, nextLevel: 2, progress: 0, daysToNext: 3 };

  // Get current level info
  const levelInfo = data ? getLevelInfo(data.level) : getLevelInfo(1);

  // Check if feature is unlocked
  const hasFeature = useCallback(
    (feature: string): boolean => {
      return data?.unlockedFeatures.includes(feature) ?? false;
    },
    [data]
  );

  return {
    data,
    isLoading,
    progress,
    levelInfo,
    hasFeature,
    refresh,
    logActivity,
  };
}

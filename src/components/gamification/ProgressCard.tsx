"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import StreakCounter from "./StreakCounter";
import LevelBadge from "./LevelBadge";
import { LEVELS } from "@/types";

interface ProgressCardProps {
  level: number;
  levelName: string;
  streak: number;
  totalMessages: number;
  progress: number;
  daysToNext: number;
}

export default function ProgressCard({
  level,
  levelName,
  streak,
  totalMessages,
  progress,
  daysToNext,
}: ProgressCardProps) {
  const nextLevel = LEVELS.find((l) => l.level === level + 1);

  return (
    <Card variant="elevated" className="space-y-4">
      {/* Level and Streak */}
      <div className="flex items-center justify-between">
        <LevelBadge level={level} levelName={levelName} />
        <StreakCounter streak={streak} />
      </div>

      {/* Progress bar */}
      {nextLevel && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Progreso al siguiente nivel</span>
            <span>{daysToNext} dias restantes</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-keimi-teal to-keimi-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-gray-400">
            Siguiente: <span className="font-medium text-keimi-primary">{nextLevel.name}</span>
          </p>
        </div>
      )}

      {level === 5 && (
        <div className="text-center py-2">
          <p className="text-sm text-keimi-primary font-medium">
            Has alcanzado el nivel maximo
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
        <div className="text-center">
          <p className="text-2xl font-bold text-keimi-dark">{totalMessages}</p>
          <p className="text-xs text-gray-500">Consultas totales</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-keimi-dark">{streak}</p>
          <p className="text-xs text-gray-500">Dias de racha</p>
        </div>
      </div>
    </Card>
  );
}

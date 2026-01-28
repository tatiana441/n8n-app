"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface LevelBadgeProps {
  level: number;
  levelName: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

export default function LevelBadge({
  level,
  levelName,
  size = "md",
  showName = true,
}: LevelBadgeProps) {
  const sizes = {
    sm: { badge: "px-2 py-0.5 text-xs", icon: "w-3 h-3" },
    md: { badge: "px-3 py-1 text-sm", icon: "w-4 h-4" },
    lg: { badge: "px-4 py-1.5 text-base", icon: "w-5 h-5" },
  };

  const levelStyles = {
    1: "bg-gray-100 text-gray-600",
    2: "bg-keimi-mint text-keimi-dark",
    3: "bg-keimi-teal text-keimi-dark",
    4: "bg-keimi-primary text-white",
    5: "bg-gradient-to-r from-keimi-primary to-keimi-teal text-white",
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizes[size].badge} ${levelStyles[level as keyof typeof levelStyles] || levelStyles[1]}`}
    >
      <Star className={sizes[size].icon} fill="currentColor" />
      {showName ? (
        <span>{levelName}</span>
      ) : (
        <span>Nv. {level}</span>
      )}
    </motion.div>
  );
}

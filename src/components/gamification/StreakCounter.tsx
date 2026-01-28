"use client";

import { Flame } from "lucide-react";
import { motion } from "framer-motion";

interface StreakCounterProps {
  streak: number;
  size?: "sm" | "md" | "lg";
}

export default function StreakCounter({ streak, size = "md" }: StreakCounterProps) {
  const sizes = {
    sm: { icon: "w-4 h-4", text: "text-sm", container: "gap-1" },
    md: { icon: "w-5 h-5", text: "text-base", container: "gap-1.5" },
    lg: { icon: "w-6 h-6", text: "text-lg", container: "gap-2" },
  };

  const isActive = streak > 0;

  return (
    <motion.div
      className={`flex items-center ${sizes[size].container}`}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={isActive ? "streak-fire" : ""}>
        <Flame
          className={`${sizes[size].icon} ${
            isActive ? "text-orange-500" : "text-gray-300"
          }`}
          fill={isActive ? "currentColor" : "none"}
        />
      </div>
      <span
        className={`font-semibold ${sizes[size].text} ${
          isActive ? "text-keimi-dark" : "text-gray-400"
        }`}
      >
        {streak}
      </span>
    </motion.div>
  );
}

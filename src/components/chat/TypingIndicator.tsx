"use client";

import { motion } from "framer-motion";
import Avatar from "@/components/ui/Avatar";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3"
    >
      <div className="flex-shrink-0">
        <Avatar size="sm" isKeimi />
      </div>
      <div className="message-assistant px-4 py-3">
        <div className="flex gap-1.5">
          <span className="loading-dot" />
          <span className="loading-dot" />
          <span className="loading-dot" />
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import Avatar from "@/components/ui/Avatar";
import type { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
}

export default function MessageBubble({ message, showAvatar = true }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {showAvatar && (
        <div className="flex-shrink-0">
          {isUser ? (
            <Avatar size="sm" name="Usuario" />
          ) : (
            <Avatar size="sm" isKeimi />
          )}
        </div>
      )}

      <div
        className={`max-w-[80%] ${
          isUser ? "message-user" : "message-assistant"
        } px-4 py-3`}
      >
        <p className="text-sm whitespace-pre-wrap leading-relaxed">
          {message.content}
        </p>
        <span
          className={`text-[10px] mt-1 block ${
            isUser ? "text-white/70 text-right" : "text-gray-400"
          }`}
        >
          {message.timestamp.toLocaleTimeString("es", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </motion.div>
  );
}

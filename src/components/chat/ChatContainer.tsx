"use client";

import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Clock } from "lucide-react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { useChat } from "@/hooks/useChat";

export default function ChatContainer() {
  const {
    messages,
    isLoading,
    sendMessage,
    remainingMessages,
    isLimitReached,
    dailyLimit,
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              showAvatar={
                index === 0 ||
                messages[index - 1]?.role !== message.role
              }
            />
          ))}

          <AnimatePresence>
            {isLoading && <TypingIndicator />}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Limit reached banner */}
      <AnimatePresence>
        {isLimitReached && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="shrink-0 bg-gradient-to-r from-keimi-primary to-keimi-teal text-white px-4 py-3"
          >
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Clock className="w-5 h-5 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm">Limite diario alcanzado</p>
                <p className="text-xs text-white/80">
                  Has usado tus {dailyLimit} mensajes de hoy. Vuelve manana para seguir conversando.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area - fixed at bottom with proper z-index */}
      <div className="shrink-0 glass border-t border-keimi-cream/50 px-4 py-4 mb-16 md:mb-0 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Remaining messages indicator */}
          {!isLimitReached && (
            <div className="flex items-center justify-end gap-1.5 mb-2 text-xs text-gray-500">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{remainingMessages} mensajes restantes hoy</span>
            </div>
          )}
          <MessageInput
            onSend={sendMessage}
            isLoading={isLoading}
            disabled={isLimitReached}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import type { Message, WebhookResponse } from "@/types";
import { FREE_DAILY_LIMIT } from "@/types";
import {
  getChatHistory,
  setChatHistory,
  generateId,
  canSendMessage,
  incrementDailyUsage,
  getRemainingMessages,
  getUser,
} from "@/lib/storage";
import { recordActivity } from "@/lib/gamification";

const WEBHOOK_URL =
  "https://n8n.srv1122579.hstgr.cloud/webhook/0a9f80ce-a76b-4965-a737-50fe442bec4b";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingMessages, setRemainingMessages] = useState(FREE_DAILY_LIMIT);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // Load chat history and check daily limit on mount
  useEffect(() => {
    const history = getChatHistory();
    if (history.messages.length > 0) {
      setMessages(history.messages);
    } else {
      // Add welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content:
          "Hola, soy Keimi, tu asistente de skincare coreano. Estoy aqui para ayudarte a crear una rutina personalizada para tu tipo de piel latina. ¿En que puedo ayudarte hoy?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }

    // Check daily usage
    const remaining = getRemainingMessages();
    setRemainingMessages(remaining);
    setIsLimitReached(remaining <= 0);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      const history = getChatHistory();
      history.messages = messages;
      setChatHistory(history);
    }
  }, [messages]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Check daily limit
    if (!canSendMessage()) {
      setIsLimitReached(true);
      setError("Has alcanzado el limite de mensajes de hoy. Vuelve manana para seguir conversando con Keimi.");
      return;
    }

    setError(null);
    setIsLoading(true);

    // Increment daily usage
    const usage = incrementDailyUsage();
    setRemainingMessages(FREE_DAILY_LIMIT - usage.messageCount);
    if (usage.messageCount >= FREE_DAILY_LIMIT) {
      setIsLimitReached(true);
    }

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Record activity for gamification
    recordActivity();

    try {
      // Get user data to include in request
      const user = getUser();

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content.trim(),
          userProfile: user ? {
            name: user.name,
            skinType: user.skinType,
            concern: user.concern,
            experience: user.experience,
          } : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data: WebhookResponse = await response.json();

      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: data.response || "Lo siento, no pude procesar tu mensaje.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setError("Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.");

      const errorMessage: Message = {
        id: generateId(),
        role: "assistant",
        content:
          "Lo siento, hubo un problema de conexion. Por favor, intenta de nuevo en unos momentos.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      role: "assistant",
      content:
        "Hola, soy Keimi, tu asistente de skincare coreano. Estoy aqui para ayudarte a crear una rutina personalizada para tu tipo de piel latina. ¿En que puedo ayudarte hoy?",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    remainingMessages,
    isLimitReached,
    dailyLimit: FREE_DAILY_LIMIT,
  };
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export default function MessageInput({
  onSend,
  isLoading = false,
  placeholder = "Escribe tu mensaje...",
  disabled = false,
}: MessageInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !disabled) {
      onSend(input);
      setInput("");
    }
  };

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={disabled ? "Limite alcanzado por hoy" : placeholder}
          disabled={isLoading || disabled}
          className="input flex-1"
          autoComplete="off"
        />
        <motion.button
          type="submit"
          disabled={isLoading || disabled || !input.trim()}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          <span className="sr-only">Enviar</span>
        </motion.button>
      </div>
    </form>
  );
}

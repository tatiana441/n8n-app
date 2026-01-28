"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-keimi-cream flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-keimi-teal to-keimi-primary flex items-center justify-center"
        >
          <span className="text-white font-display font-bold text-4xl">K</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-display text-3xl font-bold text-keimi-dark mb-3"
        >
          Keimi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-keimi-primary font-medium mb-6"
        >
          Korean Beauty Secret
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          Tu asistente personal de skincare coreano,
          especializado en pieles latinas. Descubre rutinas
          personalizadas con productos 100% coreanos y veganos.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {["Rutinas personalizadas", "Tips diarios", "Productos veganos"].map(
            (feature) => (
              <span
                key={feature}
                className="px-3 py-1 bg-keimi-mint/50 text-keimi-dark text-sm rounded-full"
              >
                {feature}
              </span>
            )
          )}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="w-full max-w-xs"
            rightIcon={<Sparkles className="w-5 h-5" />}
          >
            Comenzar mi viaje K-Beauty
          </Button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-gray-400 mt-6"
        >
          Solo tomara 1 minuto configurar tu perfil
        </motion.p>
      </motion.div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, ExternalLink, ShoppingBag } from "lucide-react";
import Card from "@/components/ui/Card";
import ProgressCard from "@/components/gamification/ProgressCard";

const DAILY_TIPS = [
  "La doble limpieza es el secreto de la piel coreana perfecta",
  "Aplica tus productos de mas ligero a mas denso",
  "El protector solar es el mejor antiedad que existe",
  "Da palmaditas suaves para que el serum penetre mejor",
  "Hidrata incluso si tienes piel grasa",
  "Usa agua tibia, nunca caliente, para limpiar tu rostro",
  "Espera 30 segundos entre cada capa de producto",
  "El contorno de ojos necesita un producto especifico",
  "Exfolia solo 1-2 veces por semana",
  "La consistencia es mas importante que los productos caros",
];

interface DesktopSidebarProps {
  level: number;
  levelName: string;
  streak: number;
  totalMessages: number;
  progress: number;
  daysToNext: number;
  shopUrl?: string;
}

export default function DesktopSidebar({
  level,
  levelName,
  streak,
  totalMessages,
  progress,
  daysToNext,
  shopUrl,
}: DesktopSidebarProps) {
  const [tip, setTip] = useState("");

  // Get random tip on mount (client-side only)
  useEffect(() => {
    const randomTip = DAILY_TIPS[Math.floor(Math.random() * DAILY_TIPS.length)];
    setTip(randomTip);
  }, []);

  return (
    <aside className="hidden lg:block w-80 shrink-0 p-4 space-y-4 overflow-y-auto">
      {/* Progress Card */}
      <ProgressCard
        level={level}
        levelName={levelName}
        streak={streak}
        totalMessages={totalMessages}
        progress={progress}
        daysToNext={daysToNext}
      />

      {/* Daily Tip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-keimi-mint/30 to-keimi-cream">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-keimi-teal/20 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-keimi-primary" />
            </div>
            <div>
              <h3 className="font-medium text-keimi-dark text-sm mb-1">
                Tip del dia
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {tip || "Cargando..."}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Shop CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-keimi-primary to-keimi-teal text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Productos KEIMI</h3>
              <p className="text-xs text-white/80">100% coreanos y veganos</p>
            </div>
          </div>
          {shopUrl ? (
            <a
              href={shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
            >
              Explorar tienda
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="text-center py-2 text-xs text-white/60">
              Proximamente disponible
            </div>
          )}
        </Card>
      </motion.div>

      {/* Level unlocks preview */}
      {level < 5 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="outlined" className="text-center">
            <p className="text-xs text-gray-500 mb-2">Proximo desbloqueo</p>
            <p className="text-sm font-medium text-keimi-primary">
              {level === 1 && "Tips diarios personalizados"}
              {level === 2 && "Historial completo de chats"}
              {level === 3 && "Acceso a la comunidad"}
              {level === 4 && "Descuentos exclusivos"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {daysToNext} dias para desbloquear
            </p>
          </Card>
        </motion.div>
      )}
    </aside>
  );
}

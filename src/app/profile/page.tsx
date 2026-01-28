"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, LogOut, Trash2, Mail, Phone } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ProgressCard from "@/components/gamification/ProgressCard";
import { useGamification } from "@/hooks/useGamification";
import { getUser, isOnboardingComplete, clearAllData } from "@/lib/storage";
import type { UserData } from "@/types";

const SKIN_TYPE_LABELS: Record<string, string> = {
  dry: "Seca",
  oily: "Grasa",
  combination: "Mixta",
  sensitive: "Sensible",
};

const CONCERN_LABELS: Record<string, string> = {
  spots: "Manchas",
  acne: "Acne",
  wrinkles: "Arrugas",
  pores: "Poros",
  hydration: "Hidratacion",
};

const EXPERIENCE_LABELS: Record<string, string> = {
  beginner: "Novata",
  intermediate: "Intermedia",
  advanced: "Avanzada",
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const { data: gamification, progress, levelInfo } = useGamification();

  useEffect(() => {
    if (!isOnboardingComplete()) {
      router.replace("/");
      return;
    }
    const userData = getUser();
    setUser(userData);
    setIsLoading(false);
  }, [router]);

  const handleResetData = () => {
    clearAllData();
    router.replace("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-keimi-cream flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-keimi-teal to-keimi-primary flex items-center justify-center animate-pulse">
          <span className="text-white font-display font-bold text-2xl">K</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-keimi-cream pb-24 md:pb-6">
      {/* Header */}
      <header className="sticky top-0 z-10 glass border-b border-keimi-cream/50 px-4 py-3 safe-top">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link
            href="/chat"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-keimi-mint/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-keimi-dark" />
          </Link>
          <h1 className="font-display font-semibold text-keimi-dark">
            Mi Perfil
          </h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-keimi-teal to-keimi-primary flex items-center justify-center mb-4">
              <span className="text-white font-display font-bold text-3xl">
                {user?.name?.charAt(0).toUpperCase() || "K"}
              </span>
            </div>
            <h2 className="font-display text-xl font-bold text-keimi-dark mb-1">
              {user?.name || "Usuario"}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Miembro desde {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("es-ES", { month: "long", year: "numeric" }) : "hoy"}
            </p>

            {/* Contact info */}
            <div className="border-t border-gray-100 pt-4 space-y-2">
              {user?.email && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-keimi-teal" />
                  <span>{user.email}</span>
                </div>
              )}
              {user?.phone && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-keimi-teal" />
                  <span>{user.phone}</span>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-medium text-keimi-dark mb-3">Tu Progreso</h3>
          <ProgressCard
            level={gamification?.level ?? 1}
            levelName={levelInfo?.name ?? "Curiosa"}
            streak={gamification?.streak ?? 0}
            totalMessages={gamification?.totalMessages ?? 0}
            progress={progress.progress}
            daysToNext={progress.daysToNext}
          />
        </motion.div>

        {/* Skin Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-medium text-keimi-dark mb-3">Tu Perfil de Piel</h3>
          <Card>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 mb-1">Tipo de piel</p>
                <p className="font-medium text-keimi-dark">
                  {user?.skinType ? SKIN_TYPE_LABELS[user.skinType] : "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Preocupacion</p>
                <p className="font-medium text-keimi-dark">
                  {user?.concern ? CONCERN_LABELS[user.concern] : "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Experiencia</p>
                <p className="font-medium text-keimi-dark">
                  {user?.experience ? EXPERIENCE_LABELS[user.experience] : "-"}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Unlocked Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-medium text-keimi-dark mb-3">Funciones Desbloqueadas</h3>
          <Card>
            <div className="space-y-2">
              {gamification?.unlockedFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-keimi-teal" />
                  <span className="text-keimi-dark capitalize">
                    {feature === "chat" && "Chat con Keimi"}
                    {feature === "tips" && "Tips diarios personalizados"}
                    {feature === "history" && "Historial completo"}
                    {feature === "community" && "Acceso a comunidad"}
                    {feature === "discounts" && "Descuentos exclusivos"}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="outlined" className="border-red-200">
            <h3 className="font-medium text-red-600 mb-3">Zona de Peligro</h3>
            {!showConfirmReset ? (
              <Button
                variant="ghost"
                onClick={() => setShowConfirmReset(true)}
                leftIcon={<Trash2 className="w-4 h-4" />}
                className="text-red-500 hover:bg-red-50"
              >
                Borrar todos mis datos
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Esto borrara tu perfil, historial de chat y progreso. Esta accion no se puede deshacer.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setShowConfirmReset(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleResetData}
                    leftIcon={<LogOut className="w-4 h-4" />}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowLeft, Mail, KeyRound, Loader2 } from "lucide-react";
import { sendVerificationCode, verifyCode } from "@/lib/api";

const KEIMI_LOGO = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop,q=95/mnl3K9jZa0cGy7xQ/logo-12-m7Vw70X24qI7DNgg.png";

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: (email: string) => void;
}

type LoginStep = "email" | "code";

export default function LoginScreen({ onBack, onLoginSuccess }: LoginScreenProps) {
  const [step, setStep] = useState<LoginStep>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  const handleSendCode = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Por favor ingresa un email valido");
      return;
    }

    setIsLoading(true);
    setError("");

    const result = await sendVerificationCode(email);

    setIsLoading(false);

    if (result.success) {
      setStep("code");
      startCountdown();
    } else {
      setError(result.error || "Error al enviar el codigo");
    }
  };

  const handleVerifyCode = async () => {
    if (!code || code.length !== 6) {
      setError("El codigo debe tener 6 digitos");
      return;
    }

    setIsLoading(true);
    setError("");

    const result = await verifyCode(email, code);

    setIsLoading(false);

    if (result.success && result.verified) {
      onLoginSuccess(email);
    } else {
      setError(result.error || "Codigo invalido o expirado");
    }
  };

  const startCountdown = () => {
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    await handleSendCode();
  };

  return (
    <div className="min-h-screen bg-keimi-cream flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-keimi-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Logo */}
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <Image
              src={KEIMI_LOGO}
              alt="KEIMI"
              fill
              className="object-contain"
            />
          </div>

          <h1 className="text-2xl font-display font-bold text-keimi-dark text-center mb-2">
            Bienvenida de vuelta
          </h1>
          <p className="text-gray-500 text-center mb-8">
            {step === "email"
              ? "Ingresa tu email para continuar"
              : `Enviamos un codigo a ${email}`}
          </p>

          {step === "email" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-keimi-primary focus:outline-none transition-colors text-lg"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button
                onClick={handleSendCode}
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Enviar codigo"
                )}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-keimi-primary focus:outline-none transition-colors text-lg text-center tracking-[0.5em] font-mono"
                  maxLength={6}
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button
                onClick={handleVerifyCode}
                size="lg"
                className="w-full"
                disabled={isLoading || code.length !== 6}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Verificar codigo"
                )}
              </Button>

              <div className="text-center">
                <button
                  onClick={handleResendCode}
                  disabled={countdown > 0}
                  className={`text-sm ${
                    countdown > 0
                      ? "text-gray-400"
                      : "text-keimi-primary hover:underline"
                  }`}
                >
                  {countdown > 0
                    ? `Reenviar codigo en ${countdown}s`
                    : "Reenviar codigo"}
                </button>
              </div>

              <button
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setError("");
                }}
                className="w-full text-sm text-gray-500 hover:text-keimi-primary"
              >
                Cambiar email
              </button>
            </motion.div>
          )}
        </div>

        {/* Help text */}
        <p className="text-center text-sm text-gray-400 mt-6">
          El codigo expira en 5 minutos
        </p>
      </motion.div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowLeft, Mail, KeyRound, Loader2, Sparkles } from "lucide-react";
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
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Decorative background blobs */}
      <div className="decorative-blob blob-teal w-64 h-64 -top-20 -right-20 animate-float" />
      <div className="decorative-blob blob-mint w-80 h-80 -bottom-32 -left-32 animate-float-delayed" />
      <div className="decorative-blob blob-lavender w-48 h-48 top-1/4 -left-16 animate-float" style={{ animationDelay: '1s' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-keimi-primary transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver</span>
        </motion.button>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft-lg p-8 border border-white/50"
        >
          {/* Logo with glow */}
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-keimi-teal/30 to-keimi-mint/30 rounded-full blur-xl animate-pulse-soft" />
            <Image
              src={KEIMI_LOGO}
              alt="KEIMI"
              fill
              className="object-contain relative z-10 drop-shadow-lg"
            />
          </div>

          <h1 className="text-2xl font-display font-bold gradient-text text-center mb-2">
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
              className="space-y-5"
            >
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-keimi-teal transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-white/80 focus:border-keimi-teal focus:bg-white focus:outline-none focus:ring-4 focus:ring-keimi-teal/10 transition-all duration-300 text-lg"
                  autoFocus
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm text-center bg-red-50 rounded-xl py-2 px-4"
                >
                  {error}
                </motion.p>
              )}

              <Button
                onClick={handleSendCode}
                size="lg"
                className="w-full"
                disabled={isLoading}
                rightIcon={!isLoading && <Sparkles className="w-5 h-5" />}
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
              className="space-y-5"
            >
              <div className="relative group">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-keimi-teal transition-colors" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-white/80 focus:border-keimi-teal focus:bg-white focus:outline-none focus:ring-4 focus:ring-keimi-teal/10 transition-all duration-300 text-xl text-center tracking-[0.5em] font-mono"
                  maxLength={6}
                  autoFocus
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm text-center bg-red-50 rounded-xl py-2 px-4"
                >
                  {error}
                </motion.p>
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

              <div className="text-center space-y-3">
                <button
                  onClick={handleResendCode}
                  disabled={countdown > 0}
                  className={`text-sm font-medium transition-all duration-300 ${
                    countdown > 0
                      ? "text-gray-400"
                      : "text-keimi-primary hover:text-keimi-teal hover:underline"
                  }`}
                >
                  {countdown > 0
                    ? `Reenviar codigo en ${countdown}s`
                    : "Reenviar codigo"}
                </button>

                <button
                  onClick={() => {
                    setStep("email");
                    setCode("");
                    setError("");
                  }}
                  className="block w-full text-sm text-gray-500 hover:text-keimi-primary transition-colors"
                >
                  Cambiar email
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Help text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-gray-400 mt-6"
        >
          El codigo expira en 5 minutos
        </motion.p>
      </motion.div>
    </div>
  );
}

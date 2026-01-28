"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ChevronRight, ChevronLeft, Droplets, Sun, Sparkles, Target, AlertCircle } from "lucide-react";
import type { SkinType, SkinConcern, ExperienceLevel } from "@/types";

// Validation functions
const validateName = (name: string): string | null => {
  if (!name.trim()) return "El nombre es requerido";
  if (name.trim().length < 2) return "El nombre debe tener al menos 2 caracteres";
  if (name.trim().length > 50) return "El nombre es demasiado largo";
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(name.trim())) {
    return "El nombre solo puede contener letras";
  }
  return null;
};

const validateEmail = (email: string): string | null => {
  if (!email.trim()) return "El correo es requerido";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return "Ingresa un correo valido (ej: tu@email.com)";
  }
  return null;
};

const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return null; // Optional field
  // Remove spaces, dashes, parentheses for validation
  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, "");
  // Allow + at start, then 8-15 digits
  if (!/^\+?\d{8,15}$/.test(cleanPhone)) {
    return "Ingresa un telefono valido (ej: +52 55 1234 5678)";
  }
  return null;
};

interface SkinQuizProps {
  onComplete: (data: {
    name: string;
    email: string;
    phone?: string;
    skinType: SkinType;
    concern: SkinConcern;
    experience: ExperienceLevel;
  }) => void;
  onBack: () => void;
}

const QUESTIONS = [
  {
    id: "name",
    question: "Como te llamas?",
    type: "text" as const,
    placeholder: "Tu nombre",
    inputType: "text" as const,
  },
  {
    id: "email",
    question: "Cual es tu correo electronico?",
    type: "text" as const,
    placeholder: "tu@email.com",
    inputType: "email" as const,
  },
  {
    id: "phone",
    question: "Tu numero de telefono (opcional)",
    type: "text" as const,
    placeholder: "+52 55 1234 5678",
    inputType: "tel" as const,
    optional: true,
  },
  {
    id: "skinType",
    question: "Como describirias tu tipo de piel?",
    type: "options" as const,
    options: [
      { value: "dry", label: "Seca", description: "Tirante, escamosa, poco brillo", icon: Droplets },
      { value: "oily", label: "Grasa", description: "Brillante, poros visibles", icon: Sun },
      { value: "combination", label: "Mixta", description: "Grasa en zona T, seca en mejillas", icon: Sparkles },
      { value: "sensitive", label: "Sensible", description: "Reactiva, rojeces frecuentes", icon: Target },
    ],
  },
  {
    id: "concern",
    question: "Cual es tu principal preocupacion?",
    type: "options" as const,
    options: [
      { value: "spots", label: "Manchas", description: "Hiperpigmentacion, melasma" },
      { value: "acne", label: "Acne", description: "Granitos, espinillas" },
      { value: "wrinkles", label: "Arrugas", description: "Lineas finas, perdida de firmeza" },
      { value: "pores", label: "Poros", description: "Poros dilatados, textura irregular" },
      { value: "hydration", label: "Hidratacion", description: "Piel apagada, deshidratada" },
    ],
  },
  {
    id: "experience",
    question: "Cual es tu experiencia con K-Beauty?",
    type: "options" as const,
    options: [
      { value: "beginner", label: "Novata", description: "Recien empiezo a explorar" },
      { value: "intermediate", label: "Intermedia", description: "Conozco algunos productos" },
      { value: "advanced", label: "Avanzada", description: "Ya tengo rutina establecida" },
    ],
  },
];

export default function SkinQuiz({ onComplete, onBack }: SkinQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const currentQuestion = QUESTIONS[step];
  const isLastStep = step === QUESTIONS.length - 1;
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  // Validation for current field
  const validationError = useMemo(() => {
    const value = answers[currentQuestion.id] || "";
    switch (currentQuestion.id) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "phone":
        return validatePhone(value);
      default:
        return null;
    }
  }, [answers, currentQuestion.id]);

  const handleNext = () => {
    // Mark as touched to show validation error
    setTouched((prev) => ({ ...prev, [currentQuestion.id]: true }));

    // Don't proceed if there's a validation error (unless optional and empty)
    const isOptional = "optional" in currentQuestion && currentQuestion.optional;
    const value = answers[currentQuestion.id] || "";

    if (!isOptional && validationError) {
      return;
    }

    // For optional fields, only validate if there's a value
    if (isOptional && value.trim() && validationError) {
      return;
    }

    if (isLastStep) {
      onComplete({
        name: answers.name?.trim() || "Usuario",
        email: answers.email?.trim() || "",
        phone: answers.phone?.trim() || undefined,
        skinType: answers.skinType as SkinType,
        concern: answers.concern as SkinConcern,
        experience: answers.experience as ExperienceLevel,
      });
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step === 0) {
      onBack();
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    // Mark as touched when user starts typing
    if (value) {
      setTouched((prev) => ({ ...prev, [currentQuestion.id]: true }));
    }
  };

  const isOptional = "optional" in currentQuestion && currentQuestion.optional;
  const value = answers[currentQuestion.id] || "";
  const showError = touched[currentQuestion.id] && validationError && (!isOptional || value.trim());

  // Can proceed if: valid (no error) OR (optional AND empty)
  const canProceed = currentQuestion.type === "options"
    ? !!value
    : (!validationError || (isOptional && !value.trim()));

  return (
    <div className="min-h-screen bg-keimi-cream flex flex-col p-6">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Paso {step + 1} de {QUESTIONS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-keimi-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-display text-2xl font-bold text-keimi-dark mb-6 text-center">
              {currentQuestion.question}
            </h2>

            {currentQuestion.type === "text" ? (
              <div className="space-y-2">
                <input
                  type={"inputType" in currentQuestion ? currentQuestion.inputType : "text"}
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, [currentQuestion.id]: true }))}
                  placeholder={currentQuestion.placeholder}
                  className={`input text-center text-lg ${
                    showError ? "border-red-400 focus:ring-red-400" : ""
                  }`}
                  autoFocus
                />
                {showError && (
                  <div className="flex items-center justify-center gap-1.5 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{validationError}</span>
                  </div>
                )}
                {isOptional && !showError && (
                  <p className="text-xs text-gray-400 text-center">
                    Puedes omitir este paso
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => {
                  const Icon = "icon" in option ? option.icon : undefined;
                  const isSelected = answers[currentQuestion.id] === option.value;

                  return (
                    <Card
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? "ring-2 ring-keimi-primary bg-keimi-mint/20"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && (
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isSelected ? "bg-keimi-primary text-white" : "bg-keimi-mint text-keimi-dark"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-keimi-dark">{option.label}</p>
                          <p className="text-sm text-gray-500">{option.description}</p>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-keimi-primary flex items-center justify-center"
                          >
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <Button variant="ghost" onClick={handleBack} leftIcon={<ChevronLeft className="w-5 h-5" />}>
          Atras
        </Button>
        <Button
          className="flex-1"
          onClick={handleNext}
          disabled={!canProceed}
          rightIcon={<ChevronRight className="w-5 h-5" />}
        >
          {isLastStep ? "Finalizar" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
}

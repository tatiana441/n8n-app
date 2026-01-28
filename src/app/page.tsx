"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import WelcomeScreen from "@/components/onboarding/WelcomeScreen";
import SkinQuiz from "@/components/onboarding/SkinQuiz";
import { isOnboardingComplete, setOnboardingComplete, setUser, generateId } from "@/lib/storage";
import { sendUserRegistration } from "@/lib/api";
import { initializeGamification } from "@/lib/gamification";
import type { SkinType, SkinConcern, ExperienceLevel } from "@/types";

type OnboardingStep = "welcome" | "quiz" | "complete";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if onboarding is already complete
    if (isOnboardingComplete()) {
      router.replace("/chat");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleStartQuiz = () => {
    setStep("quiz");
  };

  const handleQuizComplete = async (data: {
    name: string;
    email: string;
    phone?: string;
    skinType: SkinType;
    concern: SkinConcern;
    experience: ExperienceLevel;
  }) => {
    // Create user data
    const userData = {
      id: generateId(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      skinType: data.skinType,
      concern: data.concern,
      experience: data.experience,
      createdAt: new Date().toISOString(),
    };

    // Save user data locally
    setUser(userData);

    // Send to n8n webhook (async, don't block user)
    sendUserRegistration(userData).catch(console.error);

    // Initialize gamification
    initializeGamification();

    // Mark onboarding as complete
    setOnboardingComplete(true);

    // Redirect to chat
    router.push("/chat");
  };

  const handleBackToWelcome = () => {
    setStep("welcome");
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
    <>
      {step === "welcome" && <WelcomeScreen onStart={handleStartQuiz} />}
      {step === "quiz" && (
        <SkinQuiz onComplete={handleQuizComplete} onBack={handleBackToWelcome} />
      )}
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import WelcomeScreen from "@/components/onboarding/WelcomeScreen";
import SkinQuiz from "@/components/onboarding/SkinQuiz";
import LoginScreen from "@/components/onboarding/LoginScreen";
import { isOnboardingComplete, setOnboardingComplete, setUser, getUser, generateId } from "@/lib/storage";
import { sendUserRegistration } from "@/lib/api";
import { initializeGamification } from "@/lib/gamification";
import type { SkinType, SkinConcern, ExperienceLevel } from "@/types";

type OnboardingStep = "welcome" | "quiz" | "login" | "complete";

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

  const handleLogin = () => {
    setStep("login");
  };

  const handleLoginSuccess = (email: string) => {
    // Check if we have existing user data for this email
    const existingUser = getUser();

    if (existingUser && existingUser.email === email) {
      // User data exists, go to chat
      setOnboardingComplete(true);
      router.push("/chat");
    } else {
      // User verified but no local data, create minimal profile
      const userData = {
        id: generateId(),
        name: email.split("@")[0],
        email: email,
        skinType: "normal" as SkinType,
        concern: "hydration" as SkinConcern,
        experience: "beginner" as ExperienceLevel,
        createdAt: new Date().toISOString(),
      };

      setUser(userData);
      initializeGamification();
      setOnboardingComplete(true);
      router.push("/chat");
    }
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
      {step === "welcome" && (
        <WelcomeScreen onStart={handleStartQuiz} onLogin={handleLogin} />
      )}
      {step === "quiz" && (
        <SkinQuiz onComplete={handleQuizComplete} onBack={handleBackToWelcome} />
      )}
      {step === "login" && (
        <LoginScreen onBack={handleBackToWelcome} onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

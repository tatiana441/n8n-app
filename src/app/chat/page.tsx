"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatContainer from "@/components/chat/ChatContainer";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import DesktopSidebar from "@/components/layout/DesktopSidebar";
import { useGamification } from "@/hooks/useGamification";
import { getUser, isOnboardingComplete } from "@/lib/storage";
import type { UserData } from "@/types";

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: gamification, progress, levelInfo } = useGamification();

  // Check onboarding and load user data
  useEffect(() => {
    if (!isOnboardingComplete()) {
      router.replace("/");
      return;
    }
    const userData = getUser();
    setUser(userData);
    setIsLoading(false);
  }, [router]);

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
    <div className="h-screen flex flex-col bg-keimi-cream">
      {/* Header */}
      <Header
        level={gamification?.level ?? 1}
        levelName={levelInfo?.name ?? "Curiosa"}
        streak={gamification?.streak ?? 0}
        userName={user?.name}
      />

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat area */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-hidden">
            <ChatContainer />
          </div>
        </main>

        {/* Desktop Sidebar */}
        <DesktopSidebar
          level={gamification?.level ?? 1}
          levelName={levelInfo?.name ?? "Curiosa"}
          streak={gamification?.streak ?? 0}
          totalMessages={gamification?.totalMessages ?? 0}
          progress={progress.progress}
          daysToNext={progress.daysToNext}
          shopUrl={undefined}
        />
      </div>

      {/* Mobile Navigation */}
      <MobileNav shopUrl={undefined} />
    </div>
  );
}

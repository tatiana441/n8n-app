"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import LevelBadge from "@/components/gamification/LevelBadge";
import StreakCounter from "@/components/gamification/StreakCounter";

const KEIMI_LOGO = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop,q=95/mnl3K9jZa0cGy7xQ/logo-12-m7Vw70X24qI7DNgg.png";

interface HeaderProps {
  level: number;
  levelName: string;
  streak: number;
  userName?: string;
}

export default function Header({ level, levelName, streak, userName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-keimi-cream/50 safe-top">
      <div className="px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/chat" className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <Image
                src={KEIMI_LOGO}
                alt="KEIMI"
                fill
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-semibold text-keimi-dark leading-tight">
                Keimi
              </h1>
              <p className="text-xs text-keimi-primary">
                Tu secreto K-Beauty
              </p>
            </div>
          </Link>

          {/* Center - Level Badge (tablet+) */}
          <div className="hidden md:flex items-center gap-4">
            <LevelBadge level={level} levelName={levelName} />
            <StreakCounter streak={streak} />
          </div>

          {/* Right - Mobile: Level mini, Desktop: Profile */}
          <div className="flex items-center gap-3">
            {/* Mobile level indicator */}
            <div className="md:hidden">
              <LevelBadge level={level} levelName={levelName} size="sm" />
            </div>

            {/* Profile button */}
            <Link
              href="/profile"
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-keimi-mint/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-keimi-mint flex items-center justify-center">
                {userName ? (
                  <span className="text-keimi-primary font-medium text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User className="w-4 h-4 text-keimi-primary" />
                )}
              </div>
              <span className="hidden lg:block text-sm font-medium text-keimi-dark">
                {userName || "Perfil"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Sparkles, LogIn, Heart, Leaf, Star } from "lucide-react";

const KEIMI_LOGO = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop,q=95/mnl3K9jZa0cGy7xQ/logo-12-m7Vw70X24qI7DNgg.png";
const INSTAGRAM_URL = "https://www.instagram.com/keimi_kbs/";
const TIKTOK_URL = "https://www.tiktok.com/@keimikbs";

interface WelcomeScreenProps {
  onStart: () => void;
  onLogin: () => void;
}

export default function WelcomeScreen({ onStart, onLogin }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Decorative background blobs */}
      <div className="decorative-blob blob-teal w-72 h-72 -top-20 -right-20 animate-float" />
      <div className="decorative-blob blob-mint w-96 h-96 -bottom-32 -left-32 animate-float-delayed" />
      <div className="decorative-blob blob-lavender w-64 h-64 top-1/3 -left-20 animate-float" style={{ animationDelay: '1s' }} />
      <div className="decorative-blob blob-teal w-48 h-48 bottom-1/4 -right-10 animate-float-delayed" />

      {/* Floating decorative icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 1 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <Star className="absolute w-8 h-8 text-keimi-teal top-20 left-[15%] animate-float" style={{ animationDelay: '0.5s' }} />
        <Heart className="absolute w-6 h-6 text-keimi-rose top-32 right-[20%] animate-float-delayed" />
        <Leaf className="absolute w-7 h-7 text-keimi-mint bottom-40 left-[25%] animate-float" style={{ animationDelay: '1.5s' }} />
        <Star className="absolute w-5 h-5 text-keimi-lavender bottom-32 right-[15%] animate-float-delayed" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md relative z-10"
      >
        {/* Logo with glow effect */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-36 h-36 mx-auto mb-6 relative"
        >
          {/* Glow ring behind logo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-keimi-teal/30 to-keimi-mint/30 blur-xl animate-pulse-soft" />
          <div className="relative w-full h-full pulse-ring rounded-full">
            <Image
              src={KEIMI_LOGO}
              alt="KEIMI Korean Beauty"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-display font-bold gradient-text mb-3"
        >
          Tu secreto K-Beauty
        </motion.h2>

        {/* Description - card style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 mb-6 shadow-soft border border-white/50"
        >
          <p className="text-gray-600 leading-relaxed">
            Tu asistente personal de skincare coreano,
            especializado en <span className="text-keimi-primary font-medium">pieles latinas</span>. Descubre rutinas
            personalizadas con productos 100% coreanos y veganos.
          </p>
        </motion.div>

        {/* Features - enhanced chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {[
            { text: "Rutinas personalizadas", icon: Star },
            { text: "Tips diarios", icon: Heart },
            { text: "Productos veganos", icon: Leaf }
          ].map(({ text, icon: Icon }, index) => (
            <motion.span
              key={text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-keimi-mint/60 to-keimi-teal/30 text-keimi-dark text-sm rounded-full border border-white/50 shadow-sm"
            >
              <Icon className="w-3.5 h-3.5" />
              {text}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-3"
        >
          <Button
            onClick={onStart}
            size="lg"
            className="w-full max-w-xs glow-on-hover"
            rightIcon={<Sparkles className="w-5 h-5" />}
          >
            Comenzar mi viaje K-Beauty
          </Button>

          <Button
            onClick={onLogin}
            variant="ghost"
            size="md"
            className="w-full max-w-xs"
            leftIcon={<LogIn className="w-4 h-4" />}
          >
            Ya tengo cuenta
          </Button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-gray-400 mt-4"
        >
          Solo tomara 1 minuto configurar tu perfil
        </motion.p>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex justify-center gap-3 mt-6"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-soft hover:shadow-soft-lg transition-all duration-300 text-sm text-gray-600 hover:text-keimi-primary hover:-translate-y-0.5 border border-white/50"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-soft hover:shadow-soft-lg transition-all duration-300 text-sm text-gray-600 hover:text-keimi-primary hover:-translate-y-0.5 border border-white/50"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
            </svg>
            TikTok
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

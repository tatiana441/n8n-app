"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "elevated" | "outlined";
  animate?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  variant = "default",
  animate = false,
  onClick,
}: CardProps) {
  const variants = {
    default: "bg-white border border-keimi-cream shadow-sm",
    glass: "bg-white/70 backdrop-blur-md border border-white/20",
    elevated: "bg-white shadow-lg border-0",
    outlined: "bg-transparent border border-gray-200",
  };

  const Component = animate ? motion.div : "div";
  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      }
    : {};

  return (
    <Component
      className={`rounded-2xl p-4 ${variants[variant]} ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""} ${className}`}
      onClick={onClick}
      {...animationProps}
    >
      {children}
    </Component>
  );
}

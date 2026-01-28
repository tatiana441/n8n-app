"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      onClick,
      type = "button",
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-keimi-teal focus-visible:ring-offset-2";

    const variants = {
      primary: "bg-keimi-primary text-white hover:bg-keimi-dark active:scale-95 disabled:opacity-50",
      secondary: "bg-keimi-teal text-keimi-dark hover:bg-keimi-mint active:scale-95 disabled:opacity-50",
      ghost: "bg-transparent text-keimi-primary hover:bg-keimi-mint/30 active:scale-95 disabled:opacity-50",
      outline: "bg-transparent border-2 border-keimi-primary text-keimi-primary hover:bg-keimi-primary hover:text-white active:scale-95 disabled:opacity-50",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        onClick={onClick}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Cargando...</span>
          </span>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;

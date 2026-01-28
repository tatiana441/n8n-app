"use client";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  isKeimi?: boolean;
  className?: string;
}

export default function Avatar({
  src,
  name = "",
  size = "md",
  isKeimi = false,
  className = "",
}: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-14 h-14 text-xl",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isKeimi) {
    return (
      <div
        className={`${sizes[size]} rounded-full bg-gradient-to-br from-keimi-teal to-keimi-primary flex items-center justify-center ${className}`}
      >
        <span className="text-white font-display font-bold">K</span>
      </div>
    );
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size]} rounded-full bg-keimi-mint flex items-center justify-center ${className}`}
    >
      <span className="text-keimi-dark font-medium">
        {getInitials(name) || "U"}
      </span>
    </div>
  );
}

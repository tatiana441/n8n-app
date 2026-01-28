"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, BarChart3, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  {
    href: "/chat",
    label: "Chat",
    icon: MessageCircle,
  },
  {
    href: "/profile",
    label: "Progreso",
    icon: BarChart3,
  },
  {
    href: "/shop",
    label: "Tienda",
    icon: ShoppingBag,
    external: true,
  },
  {
    href: "/profile",
    label: "Perfil",
    icon: User,
  },
];

interface MobileNavProps {
  shopUrl?: string;
}

export default function MobileNav({ shopUrl }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-keimi-cream/50 safe-bottom">
      <div className="flex items-center justify-around py-2 px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          // Handle external shop link
          if (item.external && shopUrl) {
            return (
              <a
                key={item.label}
                href={shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors text-gray-400 hover:text-keimi-primary"
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </a>
            );
          }

          // Skip shop if no URL
          if (item.external && !shopUrl) {
            return (
              <button
                key={item.label}
                disabled
                className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-gray-300 cursor-not-allowed"
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors ${
                isActive
                  ? "text-keimi-primary"
                  : "text-gray-400 hover:text-keimi-primary"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-keimi-mint/40 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="text-xs font-medium relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

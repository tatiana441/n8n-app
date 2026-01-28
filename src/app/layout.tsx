import type { Metadata, Viewport } from "next";
import { Inter, Comfortaa } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KEIMI - Korean Beauty Secret",
  description: "Tu asistente personal de skincare coreano para pieles latinas. Productos 100% coreanos y veganos.",
  keywords: ["skincare", "k-beauty", "coreano", "pieles latinas", "rutina", "cuidado facial"],
  authors: [{ name: "KEIMI" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "KEIMI",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#016A70",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${comfortaa.variable}`}>
      <body className="font-body antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}

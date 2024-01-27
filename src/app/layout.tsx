import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Starter",
  description: "Template for Next.js from Levi Hessmann Development Resources",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={`de`} className={`w-full h-full`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

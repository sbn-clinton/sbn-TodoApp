import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SBN Todo App",
  description: "SBN Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-[#1253AA] to-[#05243E] text-white`}
    >
      <div className="flex flex-col justify-between min-h-screen gap-5">
        <div className="flex-1 mb-24 md:mb-32">{children}</div>
        <Navbar />
      </div>
    </div>
  );
}

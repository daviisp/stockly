import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarMobile } from "./_components/sidebar-mobile";
import { Sidebar } from "./_components/sidebar";
import { auth } from "@/services/auth";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stockly",
  description:
    "Esse é o Stockly, plataforma útil para controlar produtos, vendas e estoques.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} antialiased min-h-screen bg-[#F8FAFC]`}
      >
        {session && <SidebarMobile user={session.user} />}
        <div className="flex min-h-screen">
          {session && <Sidebar user={session.user} />}
          <main className="flex-1 p-5 sm:p-8">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

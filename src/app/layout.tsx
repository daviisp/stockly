import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarMobile } from "./_components/sidebar-mobile";
import { Sidebar } from "./_components/sidebar";
import { auth } from "@/services/auth";

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
      <body className={`${inter.variable} antialiased h-screen bg-[#F8FAFC]`}>
        {session && <SidebarMobile user={session.user} />}
        <div className="flex h-screen">
          {session && <Sidebar user={session.user} />}
          <main className="flex-1 overflow-auto p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}

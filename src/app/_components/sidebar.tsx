"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return href === pathname;
  };

  return (
    <aside className="hidden sm:block bg-white min-w-72 max-w-72 h-full">
      <div className="py-6 pl-8">
        <Image
          src="/logo.svg"
          width={116}
          height={34}
          alt="Logo do site Stockly"
        />
      </div>
      <nav className="flex flex-col gap-2 py-3 px-2">
        <Button
          asChild
          variant="ghost"
          className={`${
            isActive("/dashboard")
              ? "bg-[#EBFAF7] hover:bg-[#EBFAF7]"
              : "hover:bg-transparent"
          } justify-start px-6`}
        >
          <Link href="/dashboard">
            <LayoutGridIcon />
            Dashboard
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className={`${
            isActive("/products")
              ? "bg-[#EBFAF7] hover:bg-[#EBFAF7]"
              : "hover:bg-transparent"
          } justify-start px-6`}
        >
          <Link href="/products">
            <PackageIcon />
            Produtos
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className={`${
            isActive("/sales")
              ? "bg-[#EBFAF7] hover:bg-[#EBFAF7]"
              : "hover:bg-transparent"
          } justify-start px-6`}
        >
          <Link href="/sales">
            <ShoppingBasketIcon />
            Vendas
          </Link>
        </Button>
      </nav>
    </aside>
  );
};

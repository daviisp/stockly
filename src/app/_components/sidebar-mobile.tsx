"use client";

import { useState } from "react";
import {
  XIcon,
  Menu,
  LayoutGridIcon,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const SidebarMobile = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    return href === pathname;
  };

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="block sm:hidden">
      <div className="px-8 py-4">
        <Button className="bg-gray-200" onClick={toggleSidebar} variant="ghost">
          <Menu />
        </Button>
      </div>

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        <Image
          src="/logo.svg"
          width={120}
          height={32}
          alt="Logo da Stockly"
          className="absolute top-4 left-4 p-4"
        />
        <Button
          className="absolute top-4 right-4 mt-2 p-2.5"
          onClick={toggleSidebar}
        >
          <XIcon />
        </Button>
        <nav className="mt-16 flex flex-col gap-4 p-4">
          <Button
            asChild
            variant="ghost"
            className={`${
              isActive("/dashboard")
                ? "bg-[#EBFAF7] hover:bg-[#EBFAF7]"
                : "hover:bg-transparent"
            } justify-start`}
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
            } justify-start`}
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
            } justify-start`}
          >
            <Link href="/sales">
              <ShoppingBasketIcon />
              Vendas
            </Link>
          </Button>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

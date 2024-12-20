import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LockClosedIcon,
  MixerVerticalIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

type UserDropdownProps = {
  user: Session["user"];
};

export const UserDropdown = ({ user }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={user?.image as string}
          width={45}
          height={45}
          alt={user?.name as string}
          className="rounded-full mt-5"
          unoptimized
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-3">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem className="items-center gap-2">
            <PersonIcon />
            Perfil
          </DropdownMenuItem>
        </Link>
        <Link href="/settings">
          <DropdownMenuItem className="items-center gap-2">
            <MixerVerticalIcon />
            Configurações
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="items-center gap-2"
          onClick={() => signOut()}
        >
          <LockClosedIcon />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

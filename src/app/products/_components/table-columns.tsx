"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductsDto } from "../_data-access/get-products";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  CircleIcon,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontal,
  TrashIcon,
} from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UpsertProductDialogContent } from "./upsert-dialog-content";
import { useState } from "react";
import { formatPrice } from "@/services/format-price";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DeleteProductAlertDialogContent } from "./delete-alert-dialog-content";

export const productTableColumns: ColumnDef<ProductsDto>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: ({ row }) => {
      return formatPrice(row.original.price);
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      if (row.original.stock > 0) {
        return (
          <div className="flex items-center gap-1.5 bg-[#EBFAF7] w-fit rounded-xl text-xs text-emerald-500 font-semibold py-0.5 px-2">
            <CircleIcon fill="#00A180" size={8} className="stroke-none" />
            Disponível
          </div>
        );
      }

      return (
        <div className="flex items-center gap-1.5 bg-[#fb8484] w-fit rounded-xl text-xs text-red-700 font-semibold py-0.5 px-2">
          <CircleIcon fill="#fd0000" size={8} className="stroke-none" />
          Esgotado
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const [modalIsOpen, setModalIsOpen] = useState(false);

      return (
        <AlertDialog>
          <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(row.original.id)}
                >
                  <ClipboardCopyIcon />
                  Copiar ID
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <EditIcon />
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem>
                    <TrashIcon />
                    Deletar
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <UpsertProductDialogContent
              closeModal={() => setModalIsOpen(false)}
              defaultValues={{
                ...row.original,
              }}
            />
          </Dialog>
          <DeleteProductAlertDialogContent id={row.original.id} />
        </AlertDialog>
      );
    },
  },
];

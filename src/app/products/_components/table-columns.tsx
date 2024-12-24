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
        return "Em estoque";
      }

      return "Esgotado";
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

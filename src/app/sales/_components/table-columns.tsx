"use client";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatPrice } from "@/services/format-price";
import { ColumnDef } from "@tanstack/react-table";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontal,
  TrashIcon,
} from "lucide-react";
import { DeleteSaleAlertDialogContent } from "./delete-alert-dialog-content";
import { EditSaleDialogContent } from "./edit-dialog-content";
import { useState } from "react";
import { SalesDto } from "../_data-access/get-sales";

export const saleTableColumns: ColumnDef<SalesDto>[] = [
  {
    accessorKey: "productName",
    header: "Produto",
  },
  {
    accessorKey: "productQuantity",
    header: "Quantidade de produtos",
  },
  {
    accessorKey: "amountTotal",
    header: "Valor total",
    cell: ({ row }) => {
      return formatPrice(
        Number(row.original.unitPrice) * row.original.productQuantity
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString("pt-BR");
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
                <MoreHorizontal />
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
            <EditSaleDialogContent
              defaultValues={{
                id: row.original.id,
                productId: row.original.productId,
                productName: row.original.productName,
                productQuantity: row.original.productQuantity,
              }}
              onSuccess={() => setModalIsOpen(false)}
            />
          </Dialog>
          <DeleteSaleAlertDialogContent id={row.original.id} />
        </AlertDialog>
      );
    },
  },
];

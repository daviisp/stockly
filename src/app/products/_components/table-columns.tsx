"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
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
];

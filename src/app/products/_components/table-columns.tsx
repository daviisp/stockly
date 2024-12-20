"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductsDto } from "../_data-access/get-products";

export const productTableColumns: ColumnDef<ProductsDto>[] = [
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

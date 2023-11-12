"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "@/components/shared/cell-action";

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    id: "id",
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} type="categories" />,
  },
];

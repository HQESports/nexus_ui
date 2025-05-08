import { Entity } from "@/app/actions/entities";
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Entity>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "active",
        header: "Active",
    },
    {
        accessorKey: "created_at",
        header: "Created",
    },
]
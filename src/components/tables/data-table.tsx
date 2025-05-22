"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown ,ChevronsDown , ArrowUp, ArrowDown, ArrowUpDown} from "lucide-react";
import { IconBrandWordpress } from "@tabler/icons-react";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import Pagination from "../ui/Pagination";

// Data Type
export type Article = {
  id: string;
  amount: number;
  status: string;
  email: string;
  article: string;
  keyword: string;
  traffic: number;
  words: number;
  createdOn: string;
  action: string;
  publish: boolean;
};

// Columns Configuration
export const columns: ColumnDef<Article>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("status")}</div>
  //   ),
  // },
  {
    accessorKey: "article",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Article Title
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("article")}</div>
    ),
  },
  {
    accessorKey: "keyword",
    header: ({ column }) => {
      const sorted = column.getIsSorted(); // <-- This was missing in your code
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sorted === "asc")}
          className="flex items-center gap-2"
        >
 Keyword [Traffic]
          {sorted === "asc" ? (
            <ArrowUp size={20} />
          ) : sorted === "desc" ? (
            <ArrowDown size={20} />
          ) : (
            <ArrowUpDown size={20} />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("keyword")}</div>
    ),
  },
  {
    accessorKey: "words",
    header: ({ column }) => {
      const sorted = column.getIsSorted(); // <-- This was missing in your code
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sorted === "asc")}
          className="flex items-center gap-2"
        >
  Words
          {sorted === "asc" ? (
            <ArrowUp size={20} />
          ) : sorted === "desc" ? (
            <ArrowDown size={20} />
          ) : (
            <ArrowUpDown size={20} />
          )}
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("words")}</div>,
  },


// Inside your column definition
{
  accessorKey: "createdOn",
  header: ({ column }) => {
    const sorted = column.getIsSorted(); // <-- This was missing in your code
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(sorted === "asc")}
        className="flex items-center gap-2"
      >
        Created On
        {sorted === "asc" ? (
          <ArrowUp size={20} />
        ) : sorted === "desc" ? (
          <ArrowDown size={20} />
        ) : (
          <ArrowUpDown size={20} />
        )}
      </Button>
    );
  },
  cell: ({ row }) => <div>{row.getValue("createdOn")}</div>,
}
,
  {
    accessorKey: "action",
    enableHiding: false,
    cell: ({ row }) => {
      const action = row.getValue("action");

      const getActionStyles = (action: string) => {
        switch (action?.toLowerCase()) {
          case "view":
            return "bg-green-100 text-green-600";
          case "edit":
            return "bg-yellow-100 text-yellow-600";
          case "delete":
            return "bg-red-100 text-red-600";
          default:
            return "bg-gray-100 text-gray-600";
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Button variant="outline" className={`capitalize `}>
                {action}
              </Button>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "Publish",
    enableHiding: false,
    cell: ({}) => (
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-2 focus:outline-none  pl-4">
          <IconBrandWordpress stroke={1.4} color="#2563eb" />
            <ChevronDown size={20} />
     
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Generate</DropdownMenuItem>
          <DropdownMenuItem>Publish</DropdownMenuItem>
          <DropdownMenuItem>Schedule</DropdownMenuItem>
          <DropdownMenuItem>Archive</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// Main Component
export function DataTableDemo({ data }: { data: any[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full overflow-x-auto ">
      <div className="flex items-center py-4 gap-6">
        <Input
          placeholder="Search for Title & Keyword..."
          value={(table.getColumn("article")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("article")?.setFilterValue(event.target.value)
          }
          className="max-w-sm font-semibold"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 transition">
              Columns
              <ChevronsDown size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" >
            {table.getAllColumns().filter((col) => col.getCanHide()).map((col) => (
              <DropdownMenuCheckboxItem
                key={col.id}
                className="capitalize"
                checked={col.getIsVisible()}
                onCheckedChange={(value) => col.toggleVisibility(!!value)}
              >
                {col.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border overflow-x-auto  md:pr-5  custom-scrollbar">
        <Table  className=" overflow-x-auto md:mr-28 custom-scrollbar">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow >
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-wrap items-center gap-4 md:gap-6 py-4 pr-4 md:pr-20">
  <p className="min-w-[150px]">
    Total <span className="font-bold">{table.getFilteredRowModel().rows.length}</span> Articles title
  </p>
  <div className="text-sm text-muted-foreground min-w-[180px]">
    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
  </div>
  <div className="flex-1 min-w-[200px] md:min-w-auto">
    <Pagination totalItems={9} />
  </div>
</div>

    </div>
  );
}

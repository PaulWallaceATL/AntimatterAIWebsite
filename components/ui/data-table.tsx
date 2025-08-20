"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/Button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterPlaceholder?: string
}

export function DataTable<TData, TValue>({ columns, data, filterPlaceholder = "Filter..." }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const globalFilter = table.getState().globalFilter as string | undefined

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          className="h-10 w-full max-w-md rounded-md border border-[#1c1c1c] bg-[#0a0a0a] px-3 text-sm text-white placeholder-[#7a7a7a] focus:outline-none focus:ring-2 focus:ring-[#696aac]"
          placeholder={filterPlaceholder}
          value={globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
        />
        <Button variant="secondary" size="md" onClick={() => {
          table.resetSorting()
          table.setGlobalFilter("")
          table.resetColumnFilters()
        }}>Reset</Button>
      </div>
      <div className="rounded-xl">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="select-none">
                    {header.isPlaceholder ? null : (
                      <div
                        className="inline-flex items-center gap-2 cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{ asc: "▲", desc: "▼" }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}



import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";

interface DataTableProps<T> {
  tableInstance: TanstackTable<T>;
  handleClick: (row: T) => void;
}

export default function DataTable<T>({
  tableInstance,
  handleClick,
}: DataTableProps<T>) {
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }
                  >
                    <div
                      className="flex items-center gap-2"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <span className="inline-flex items-center">
                          {{
                            asc: <ArrowUp className="h-4 w-4" />,
                            desc: <ArrowDown className="h-4 w-4" />,
                          }[header.column.getIsSorted() as string] ?? (
                            <ArrowUpDown className="text-muted-foreground h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tableInstance.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={
                    tableInstance.getHeaderGroups()[0]?.headers.length || 1
                  }
                  className="text-muted-foreground h-24 text-center"
                >
                  No patients found
                </TableCell>
              </TableRow>
            ) : (
              tableInstance.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-muted-foreground text-sm">
          Showing{" "}
          {tableInstance.getState().pagination.pageIndex *
            tableInstance.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (tableInstance.getState().pagination.pageIndex + 1) *
              tableInstance.getState().pagination.pageSize,
            tableInstance.getFilteredRowModel().rows.length
          )}{" "}
          of {tableInstance.getFilteredRowModel().rows.length} patients
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableInstance.previousPage()}
            disabled={!tableInstance.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-muted-foreground text-sm">
            Page {tableInstance.getState().pagination.pageIndex + 1} of{" "}
            {tableInstance.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

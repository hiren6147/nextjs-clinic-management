"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { apiService, type Invoice } from "@/lib/api";
import { useAppDispatch } from "@/store/hooks";
import { openTab } from "@/store/slices/tabSlice";
import { Eye, DollarSign, Search } from "lucide-react";
import DataTable from "../shared/DataTable";
import { useQuery } from "@tanstack/react-query";
import { getStatusVariant, formatCurrency } from "@/lib/utils";
import Loader from "@/components/shared/Loader";
import ErrorComp from "@/components/shared/ErrorComp";

const columnHelper = createColumnHelper<Invoice>();

/**
 * InvoicesTab Component
 * Data table with global search, sorting, and pagination using TanStack Table
 * Only visible to Manager role
 */
export default function InvoicesTab() {
  const LIMIT = 100;
  const OFFSET = 0;
  const {
    data: invoices,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["invoices", LIMIT, OFFSET],
    queryFn: () =>
      apiService.getInvoices(LIMIT, OFFSET).then((res) => res.invoices),
  });

  const dispatch = useAppDispatch();
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Handle invoice click - open detail tab
  const handleInvoiceClick = (invoice: Invoice) => {
    dispatch(
      openTab({
        type: "invoice-detail",
        id: invoice.id,
        title: `Invoice: ${invoice.invoiceNumber}`,
        data: invoice,
      })
    );
  };

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("invoiceNumber", {
        header: "Invoice Number",
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
        enableSorting: true,
      }),
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => {
          const invoice = info.row.original;
          return (
            <div className="max-w-[300px]">
              <div className="truncate font-medium">{info.getValue()}</div>
              <div className="text-muted-foreground line-clamp-1 text-xs">
                {invoice.description}
              </div>
            </div>
          );
        },
        enableSorting: true,
      }),
      columnHelper.accessor("date", {
        header: "Date",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("patientId", {
        header: "Patient ID",
        cell: (info) => {
          const patientId = info.getValue();
          return patientId ? (
            <span className="text-muted-foreground">#{patientId}</span>
          ) : (
            <span className="text-muted-foreground">-</span>
          );
        },
        enableSorting: true,
      }),
      columnHelper.accessor("amount", {
        header: () => <div className="text-right">Amount</div>,
        cell: (info) => (
          <div className="flex items-center justify-end gap-1 font-semibold text-green-600">
            <DollarSign className="h-4 w-4" />
            {formatCurrency(info.getValue())}
          </div>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <Badge variant={getStatusVariant(info.getValue())}>
            {info.getValue()}
          </Badge>
        ),
        enableSorting: true,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: () => (
          <div className="text-muted-foreground hover:text-foreground flex items-center">
            <Eye className="h-4 w-4" />
          </div>
        ),
        enableSorting: false,
      }),
    ],
    []
  );

  // Create table instance
  const tableInstance = useReactTable({
    data: invoices || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <ErrorComp
        message={error instanceof Error ? error.message : "An error occurred"}
      />
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">
            Total: {tableInstance.getFilteredRowModel().rows.length} invoices
            {globalFilter && ` (filtered from ${invoices?.length || 0})`}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Invoice List</CardTitle>
              <CardDescription>
                Click on a row to view invoice details
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                <Input
                  placeholder="Search invoices..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="w-[300px] pl-8"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            tableInstance={tableInstance}
            handleClick={handleInvoiceClick}
          />
        </CardContent>
      </Card>
    </div>
  );
}

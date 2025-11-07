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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { apiService, type Patient } from "@/lib/api";
import { useAppDispatch } from "@/store/hooks";
import { openTab } from "@/store/slices/tabSlice";
import { Eye, Search } from "lucide-react";
import DataTable from "@/components/shared/DataTable";
import { useQuery } from "@tanstack/react-query";
import ErrorComp from "@/components/shared/ErrorComp";
import Loader from "@/components/shared/Loader";
import { getInitialsFromName } from "@/lib/utils";

const columnHelper = createColumnHelper<Patient>();

/**
 * PatientsTab Component
 * Data table with global search, sorting, and pagination using TanStack Table
 */
export default function PatientsTab() {
  const LIMIT = 100;
  const OFFSET = 0;

  const {
    data: patients,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["patients", LIMIT, OFFSET],
    queryFn: () =>
      apiService.getPatients(LIMIT, OFFSET).then((res) => res.users),
  });

  const dispatch = useAppDispatch();

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Handle patient click - open detail tab
  const handlePatientClick = (patient: Patient) => {
    dispatch(
      openTab({
        type: "patient-detail",
        id: patient.id,
        title: `Patient: ${patient.firstName} ${patient.lastName}`,
        data: patient,
      })
    );
  };

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
        enableSorting: true,
      }),
      columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
        id: "patient",
        header: "Patient",
        cell: (info) => {
          const patient = info.row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {getInitialsFromName(patient.firstName, patient.lastName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">
                  {patient.firstName} {patient.lastName}
                </div>
                <div className="text-muted-foreground text-xs">
                  {(patient as { username?: string }).username || ""}
                </div>
              </div>
            </div>
          );
        },
        enableSorting: true,
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("phone", {
        header: "Phone",
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("gender", {
        header: "Gender",
        cell: (info) => {
          const gender = info.getValue();
          return gender ? (
            <Badge variant="outline">{String(gender)}</Badge>
          ) : (
            <span className="text-muted-foreground">-</span>
          );
        },
        enableSorting: true,
      }),
      columnHelper.accessor(
        (row) => {
          const address = (
            row as { address?: { city?: string; state?: string } }
          ).address;
          return address ? `${address.city}, ${address.state}` : "";
        },
        {
          id: "address",
          header: "Address",
          cell: (info) => {
            const address = info.getValue();
            return address ? (
              <div className="text-sm">{address}</div>
            ) : (
              <span className="text-muted-foreground">-</span>
            );
          },
          enableSorting: true,
        }
      ),
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
    data: patients || [],
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

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
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
          <h1 className="text-3xl font-bold">Patients</h1>
          <p className="text-muted-foreground">
            Total: {tableInstance.getFilteredRowModel().rows.length} patients
            {globalFilter && ` (filtered from ${patients?.length || 0})`}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Patient List</CardTitle>
              <CardDescription>
                Click on a row to view patient details
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                <Input
                  placeholder="Search patients..."
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
            handleClick={handlePatientClick}
          />
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { apiService } from "@/lib/api";
import { useAppSelector } from "@/store/hooks";
import { FileText, DollarSign, Calendar, User } from "lucide-react";
import { getStatusVariant, ROLES } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/shared/Loader";
import ErrorComp from "@/components/shared/ErrorComp";

export default function InvoiceDetailTab({ data: initialData }) {
  const {
    data: invoice,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["invoice", initialData.id],
    queryFn: () => apiService.getInvoice(initialData.id),
  });

  const role = useAppSelector((state) => state.auth.role);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !invoice) {
    return <ErrorComp message={error} />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Invoice Details</h1>
        <p className="text-muted-foreground">
          View and manage invoice information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Invoice Info Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  {invoice.invoiceNumber}
                </CardTitle>
                <CardDescription>Invoice ID: #{invoice.id}</CardDescription>
              </div>
              <Badge
                variant={getStatusVariant(invoice.status)}
                className="px-3 py-1 text-lg"
              >
                {invoice.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold">{invoice.title}</h3>
              <p className="text-muted-foreground">{invoice.description}</p>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">Date</p>
                  <p className="font-medium">{invoice.date}</p>
                </div>
              </div>

              {invoice.patientId && (
                <div className="flex items-center gap-2">
                  <User className="text-muted-foreground h-4 w-4" />
                  <div>
                    <p className="text-muted-foreground text-sm">Patient ID</p>
                    <p className="font-medium">#{invoice.patientId}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <FileText className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">
                    Invoice Number
                  </p>
                  <p className="font-medium">{invoice.invoiceNumber}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="bg-muted flex items-center justify-between rounded-lg p-4">
              <div>
                <p className="text-muted-foreground text-sm">Total Amount</p>
                <p className="flex items-center gap-2 text-3xl font-bold">
                  <DollarSign className="h-8 w-8" />
                  {invoice.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Card */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {role === ROLES.MANAGER && (
              <>
                <Button className="w-full" variant="default">
                  Edit Invoice
                </Button>
                <Button className="w-full" variant="outline">
                  Print Invoice
                </Button>
                <Button className="w-full" variant="outline">
                  Send Email
                </Button>
                {invoice.status === "Pending" && (
                  <Button className="w-full" variant="outline">
                    Mark as Paid
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Invoice Information */}
      {invoice.tags && invoice.tags.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {invoice.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

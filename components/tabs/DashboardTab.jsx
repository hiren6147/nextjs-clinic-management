"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiService } from "@/lib/api";
import { Users, FileText, Clock, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/shared/Loader";
import ErrorComp from "@/components/shared/ErrorComp";

/**
 * DashboardTab Component
 * Displays overview statistics and metrics
 * Includes loading state and error handling
 */
export default function DashboardTab() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => apiService.getDashboardStats(),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComp message={error} />;
  }

  const statCards = [
    {
      title: "Total Patients",
      value: stats?.totalPatients || 0,
      icon: Users,
      description: "Registered patients",
      color: "text-blue-600",
    },
    {
      title: "Total Invoices",
      value: stats?.totalInvoices || 0,
      icon: FileText,
      description: "All invoices",
      color: "text-green-600",
    },
    {
      title: "Pending Invoices",
      value: stats?.pendingInvoices || 0,
      icon: Clock,
      description: "Awaiting payment",
      color: "text-orange-600",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      description: "Total income",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your clinic management
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <CardDescription className="mt-1">
                  {stat.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Dashboard Content */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Activity feed will be displayed here
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Quick action buttons will be displayed here
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

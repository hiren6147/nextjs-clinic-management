"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiService } from "@/lib/api";
import { useAppSelector } from "@/store/hooks";
import { MapPin, Phone, Mail, User } from "lucide-react";
import { getInitialsFromName, ROLES } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/shared/Loader";
import ErrorComp from "@/components/shared/ErrorComp";

export default function PatientDetailTab({ data: initialData }) {
  const {
    data: patient,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["patient", initialData.id],
    queryFn: () => apiService.getPatient(initialData.id),
  });

  const role = useAppSelector((state) => state.auth.role);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComp message={error} />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Patient Details</h1>
        <p className="text-muted-foreground">
          View and manage patient information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Patient Info Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>
                  {getInitialsFromName(patient.firstName, patient.lastName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">
                  {patient.firstName} {patient.lastName}
                </CardTitle>
                <CardDescription>Patient ID: #{patient.id}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Mail className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">Email</p>
                  <p className="font-medium">{patient.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">Phone</p>
                  <p className="font-medium">{patient.phone}</p>
                </div>
              </div>

              {patient.gender && (
                <div className="flex items-center gap-2">
                  <User className="text-muted-foreground h-4 w-4" />
                  <div>
                    <p className="text-muted-foreground text-sm">Gender</p>
                    <Badge variant="outline">{patient.gender}</Badge>
                  </div>
                </div>
              )}

              {patient.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="text-muted-foreground h-4 w-4" />
                  <div>
                    <p className="text-muted-foreground text-sm">Address</p>
                    <p className="font-medium">
                      {patient.address.address}, {patient.address.city}
                    </p>
                  </div>
                </div>
              )}
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
                  Edit Patient
                </Button>
                <Button className="w-full" variant="outline">
                  View History
                </Button>
                <Button className="w-full" variant="outline">
                  Create Invoice
                </Button>
              </>
            )}
            {role === ROLES.CLINICIAN && (
              <Button className="w-full" variant="outline">
                View History
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Patient Information */}
      {patient.birthDate && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-muted-foreground text-sm">Date of Birth</p>
                <p className="font-medium">
                  {patient.birthDate
                    ? new Date(patient.birthDate).toISOString().split("T")[0]
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Age</p>
                <p className="font-medium">{patient.age}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Blood Group</p>
                <p className="font-medium">{patient.bloodGroup}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Occupation</p>
                <p className="font-medium">{patient.company?.title || "N/A"}</p>
              </div>
              {patient.height && (
                <div>
                  <p className="text-muted-foreground text-sm">Height</p>
                  <p className="font-medium">{patient.height} cm</p>
                </div>
              )}
              {patient.weight && (
                <div>
                  <p className="text-muted-foreground text-sm">Weight</p>
                  <p className="font-medium">{patient.weight} kg</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Enum for roles
export const ROLES = Object.freeze({
  MANAGER: "Manager",
  CLINICIAN: "Clinician",
} as const);

export type Role = (typeof ROLES)[keyof typeof ROLES];

// Get status badge variant
export const getStatusVariant = (
  status: string
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Paid":
      return "default";
    case "Pending":
      return "secondary";
    case "Overdue":
      return "destructive";
    default:
      return "outline";
  }
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Get user initials for avatar
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

//  Get user initials for avatar from first and last name
export const getInitialsFromName = (
  firstName?: string,
  lastName?: string
): string => {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
};

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Enum for roles
const ROLES = Object.freeze({
  MANAGER: "Manager",
  CLINICIAN: "Clinician",
});

// Get status badge variant
const getStatusVariant = (status) => {
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
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Get user initials for avatar
const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

//  Get user initials for avatar from first and last name
const getInitialsFromName = (firstName, lastName) => {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
};

export {
  getStatusVariant,
  formatCurrency,
  getInitials,
  getInitialsFromName,
  ROLES,
};

"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Menu, User } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setRole } from "@/store/slices/authSlice";
import { resetTabsToDashboard } from "@/store/slices/tabSlice";
import { toast } from "sonner";
import ThemeToggle from "./ThemeToggle";
import { getInitials, ROLES } from "@/lib/utils";

interface NavbarProps {
  onSidebarToggle: () => void;
  isSidebarOpen?: boolean;
}

/**
 * Navbar Component
 * Top navigation bar with sidebar toggle button and user info
 */
export default function Navbar({ onSidebarToggle }: NavbarProps) {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.auth.role);
  const user = useAppSelector((state) => state.auth.user);

  // Toggle user role (for demo purposes)
  const handleRoleToggle = () => {
    const newRole = role === ROLES.MANAGER ? ROLES.CLINICIAN : ROLES.MANAGER;

    // Reset all tabs to only dashboard (different roles have different tab permissions)
    dispatch(resetTabsToDashboard());

    // Update role
    dispatch(setRole(newRole));

    // Show toast notification
    toast.success(`Role switched to ${newRole}`, {
      description:
        "All tabs have been reset. Some tabs may not be available for this role.",
      duration: 3000,
    });
  };

  return (
    <nav className="bg-background flex h-16 items-center justify-between border-b px-4 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* App Title */}
        <h1 className="text-xl font-semibold">AuraHear Clinic Management</h1>
      </div>

      {/* User Info and Role Toggle */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <Badge variant={role === "Manager" ? "default" : "secondary"}>
              {role}
            </Badge>
          </div>
        </div>

        {/* Role Toggle Button (for demo) */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleRoleToggle}
          title="Toggle role (Demo)"
        >
          <User className="mr-2 h-4 w-4" />
          Switch Role
        </Button>
      </div>
    </nav>
  );
}

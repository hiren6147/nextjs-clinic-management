"use client";

import { Button } from "@/components/ui/button";
import { Home, Users, FileText } from "lucide-react";
import { cn, ROLES } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { openTab } from "@/store/slices/tabSlice";

export default function Sidebar({ isOpen }) {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.auth.role);

  // Navigation items configuration
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      visible: true, // Always visible
    },
    {
      id: "patients",
      label: "Patients",
      icon: Users,
      visible: true, // Always visible
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: FileText,
      visible: role === ROLES.MANAGER, // Only visible to Manager
    },
  ];

  // Handle navigation item click
  const handleNavClick = (itemId) => {
    const titles = {
      dashboard: "Dashboard",
      patients: "Patients",
      invoices: "Invoices",
    };

    dispatch(
      openTab({
        type: itemId,
        title: titles[itemId],
      })
    );
  };

  // Filter visible items based on role
  const visibleItems = navItems.filter((item) => item.visible);

  return (
    <aside
      className={cn(
        "bg-background fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 border-r shadow-lg transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <nav className="flex flex-col gap-2 p-4">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className="justify-start"
              onClick={() => handleNavClick(item.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      {/* Role Info Footer */}
      <div className="bg-muted absolute right-4 bottom-4 left-4 rounded-lg p-3">
        <p className="text-muted-foreground text-xs">
          Current Role: <span className="font-semibold">{role}</span>
        </p>
        {role === ROLES.CLINICIAN && (
          <p className="text-muted-foreground mt-1 text-xs">
            Invoices tab is hidden for this role
          </p>
        )}
      </div>
    </aside>
  );
}

"use client";

import { useAppSelector } from "@/store/hooks";
import DashboardTab from "@/components/tabs/DashboardTab";
import PatientsTab from "@/components/tabs/PatientsTab";
import PatientDetailTab from "@/components/tabs/PatientDetailTab";
import InvoicesTab from "@/components/tabs/InvoicesTab";
import InvoiceDetailTab from "@/components/tabs/InvoiceDetailTab";
import { Tab } from "@/store/slices/tabSlice";
import { Invoice, Patient } from "@/lib/api";

/**
 * MainContent Component
 * Renders the active tab content based on tab type
 * All tab components are reusable and can be rendered dynamically
 */
export default function MainContent() {
  const openTabs = useAppSelector((state) => state.tabs.openTabs);
  const activeTabId = useAppSelector((state) => state.tabs.activeTabId);

  // Find the active tab
  const activeTab = openTabs.find((tab: Tab) => tab.id === activeTabId);

  if (!activeTab) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No tab selected</p>
      </div>
    );
  }

  // Render content based on tab type
  const renderTabContent = () => {
    switch (activeTab.type) {
      case "dashboard":
        return <DashboardTab />;

      case "patients":
        return <PatientsTab />;

      case "patient-detail":
        return <PatientDetailTab data={activeTab.data as Patient} />;

      case "invoices":
        return <InvoicesTab />;

      case "invoice-detail":
        return <InvoiceDetailTab data={activeTab.data as Invoice} />;

      default:
        return (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Unknown tab type</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-background scrollbar-hidden h-full overflow-auto">
      {renderTabContent()}
    </div>
  );
}

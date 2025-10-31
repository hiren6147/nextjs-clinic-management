"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import TabBar from "@/components/layout/TabBar";
import MainContent from "@/components/layout/MainContent";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Toggle sidebar visibility
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Top Navbar */}
      <Navbar
        onSidebarToggle={handleSidebarToggle}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="relative flex flex-1 overflow-hidden">
        {/* Sidebar Navigation - Fixed positioning, slides in/out */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main Content Area - Adjusts margin when sidebar is open */}
        <div
          className={`flex flex-1 flex-col transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
          style={{ minWidth: 0 }}
        >
          {/* Tab Bar */}
          <TabBar />

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  );
}

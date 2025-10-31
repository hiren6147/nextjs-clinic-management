"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeTab, setActiveTab } from "@/store/slices/tabSlice";

/**
 * TabBar Component
 * Displays all open tabs with ability to close and switch between them
 * Prevents duplicate tabs by focusing existing tab if already open
 */
export default function TabBar() {
  const dispatch = useAppDispatch();
  const openTabs = useAppSelector((state) => state.tabs.openTabs);
  const activeTabId = useAppSelector((state) => state.tabs.activeTabId);

  // Handle tab click - set active tab
  const handleTabClick = (tabId) => {
    dispatch(setActiveTab(tabId));
  };

  // Handle tab close
  const handleTabClose = (e, tabId) => {
    e.stopPropagation(); // Prevent tab activation when clicking close
    dispatch(closeTab(tabId));
  };

  return (
    <div className="bg-background border-b">
      <div
        className="w-full overflow-x-auto overflow-y-hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex min-w-max">
          {openTabs.map((tab) => {
            const isActive = tab.id === activeTabId;

            return (
              <div
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={cn(
                  "group relative flex shrink-0 cursor-pointer items-center gap-2 border-r px-4 py-2 text-sm whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                    : "bg-background text-foreground hover:bg-muted/50"
                )}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" && !e.shiftKey) || e.key === " ") {
                    e.preventDefault();
                    handleTabClick(tab.id);
                  }
                }}
              >
                <span className="max-w-[200px] truncate">{tab.title}</span>

                {/* Close Button */}
                {openTabs.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-4 w-4 shrink-0 rounded-sm",
                      isActive
                        ? "text-primary-foreground hover:bg-primary-foreground/20 opacity-80 hover:opacity-100"
                        : "text-foreground hover:bg-muted opacity-70 hover:opacity-100"
                    )}
                    onClick={(e) => handleTabClose(e, tab.id)}
                    aria-label={`Close ${tab.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleTabClose(e, tab.id);
                      }
                    }}
                    tabIndex={0}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { createSlice } from "@reduxjs/toolkit";

// Tab types and their unique identifiers
const createTabId = (type, id = null) => {
  return id ? `${type}-${id}` : type;
};

const initialState = {
  openTabs: [
    {
      id: "dashboard",
      type: "dashboard",
      title: "Dashboard",
      data: null,
    },
  ],
  activeTabId: "dashboard",
};

const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    // Open a new tab or focus existing if already open
    openTab: (state, action) => {
      const { type, title, data, id } = action.payload;
      const tabId = createTabId(type, id);

      // Check if tab already exists
      const existingTab = state.openTabs.find((tab) => tab.id === tabId);

      if (existingTab) {
        // Tab already exists, just make it active
        state.activeTabId = tabId;
      } else {
        // Create new tab
        const newTab = {
          id: tabId,
          type,
          title,
          data: data || null,
        };
        state.openTabs.push(newTab);
        state.activeTabId = tabId;
      }
    },

    // Close a tab
    closeTab: (state, action) => {
      const tabId = action.payload;

      // Don't allow closing the last tab
      if (state.openTabs.length === 1) {
        return;
      }

      // Find the index of the tab to close
      const tabIndex = state.openTabs.findIndex((tab) => tab.id === tabId);

      if (tabIndex !== -1) {
        state.openTabs.splice(tabIndex, 1);

        // If the closed tab was active, switch to another tab
        if (state.activeTabId === tabId) {
          // Switch to the tab that was before it, or the first tab
          if (tabIndex > 0) {
            state.activeTabId = state.openTabs[tabIndex - 1].id;
          } else {
            state.activeTabId = state.openTabs[0].id;
          }
        }
      }
    },

    // Set active tab
    setActiveTab: (state, action) => {
      const tabId = action.payload;
      const tabExists = state.openTabs.find((tab) => tab.id === tabId);
      if (tabExists) {
        state.activeTabId = tabId;
      }
    },

    // Hydrate tabs from localStorage (client-side only)
    hydrateTabs: (state, action) => {
      const { openTabs, activeTabId } = action.payload;
      if (openTabs && Array.isArray(openTabs) && openTabs.length > 0) {
        state.openTabs = openTabs;
        state.activeTabId = activeTabId || openTabs[0].id;
      }
    },

    // Reset tabs to only dashboard (used when role changes)
    resetTabsToDashboard: (state) => {
      state.openTabs = [
        {
          id: "dashboard",
          type: "dashboard",
          title: "Dashboard",
          data: null,
        },
      ];
      state.activeTabId = "dashboard";
    },
  },
});

export const {
  openTab,
  closeTab,
  setActiveTab,
  hydrateTabs,
  resetTabsToDashboard,
} = tabSlice.actions;
export default tabSlice.reducer;

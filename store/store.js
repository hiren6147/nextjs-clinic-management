import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./slices/tabSlice";
import authReducer from "./slices/authSlice";

// Load initial state from localStorage if available
const loadState = () => {
  try {
    // Only access localStorage in browser environment
    if (typeof window === "undefined") {
      return undefined;
    }

    const serializedState = localStorage.getItem("clinicAppState");
    if (serializedState === null) {
      return undefined;
    }

    const parsedState = JSON.parse(serializedState);

    // Validate structure - ensure tabs array exists and has at least one tab
    if (
      parsedState?.tabs?.openTabs &&
      Array.isArray(parsedState.tabs.openTabs)
    ) {
      if (parsedState.tabs.openTabs.length === 0) {
        // If no tabs, add default dashboard tab
        parsedState.tabs.openTabs = [
          {
            id: "dashboard",
            type: "dashboard",
            title: "Dashboard",
            data: null,
          },
        ];
        parsedState.tabs.activeTabId = "dashboard";
      }
      return parsedState;
    }

    return undefined;
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

// Save state to localStorage whenever it changes
const saveState = (state) => {
  try {
    // Only access localStorage in browser environment
    if (typeof window === "undefined") {
      return;
    }

    const serializedState = JSON.stringify({
      tabs: state.tabs,
      auth: state.auth,
    });
    localStorage.setItem("clinicAppState", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

// Initialize store with default state (no localStorage preload to avoid hydration mismatch)
// State will be loaded client-side after hydration via Providers component
export const store = configureStore({
  reducer: {
    tabs: tabReducer,
    auth: authReducer,
  },
  // Don't preload from localStorage during SSR - this causes hydration mismatches
  // State will be hydrated client-side in Providers component
  preloadedState: undefined,
});

// Subscribe to store changes to persist state (only on client)
if (typeof window !== "undefined") {
  store.subscribe(() => {
    saveState(store.getState());
  });
}

export { loadState };

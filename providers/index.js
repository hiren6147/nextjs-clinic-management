"use client";

import { Provider, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { ThemeProvider } from "next-themes";
import { store, loadState } from "@/store/store";
import { hydrateTabs } from "@/store/slices/tabSlice";
import { hydrateAuth } from "@/store/slices/authSlice";
import TanstackQueryProvider from "./TanstackQueryProvider";

/**
 * Client-side hydration component
 * Loads state from localStorage after mount to avoid hydration mismatches
 */
function StoreHydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Hydrate store from localStorage after client-side mount
    const savedState = loadState();
    if (savedState) {
      // Restore tabs (replace default with saved tabs)
      if (
        savedState.tabs?.openTabs &&
        Array.isArray(savedState.tabs.openTabs)
      ) {
        if (savedState.tabs.openTabs.length > 0) {
          dispatch(
            hydrateTabs({
              openTabs: savedState.tabs.openTabs,
              activeTabId: savedState.tabs.activeTabId,
            })
          );
        }
      }

      // Restore auth state
      if (savedState.auth) {
        dispatch(hydrateAuth(savedState.auth));
      }
    }
  }, [dispatch]);

  return null;
}

/**
 * Redux Provider Component
 * Wraps the app with Redux store provider
 * Hydrates store from localStorage after mount to avoid hydration mismatches
 */
export function Providers({ children }) {
  // Ensure store is created client-side only
  const storeInstance = useMemo(() => store, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TanstackQueryProvider>
        <Provider store={storeInstance}>
          <StoreHydrator />
          {children}
        </Provider>
      </TanstackQueryProvider>
    </ThemeProvider>
  );
}

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ColumnVisibilityState {
  visibility: Record<string, Record<string, boolean>>; // { tableKey: { columnId: boolean } }
  setVisibility: (
    tableKey: string,
    visibilityState: Record<string, boolean>
  ) => void;
  getVisibility: (tableKey: string) => Record<string, boolean> | undefined;
}

export const useColumnVisibilityStore = create(
  persist<ColumnVisibilityState>(
    (set, get) => ({
      visibility: {},

      // Set visibility for a specific table
      setVisibility: (tableKey, visibilityState) =>
        set((state) => ({
          visibility: {
            ...state.visibility,
            [tableKey]: visibilityState,
          },
        })),

      // Get visibility for a specific table
      getVisibility: (tableKey) => get().visibility[tableKey],
    }),
    {
      name: "column-visibility-storage", // Key for localStorage
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);

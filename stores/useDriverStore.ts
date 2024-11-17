// stores/useDriverStore.ts
import create from "zustand";

interface DriverStore {
  selectedDriver: any | null;
  setSelectedDriver: (driver: any) => void;
}

export const useDriverStore = create<DriverStore>((set) => ({
  selectedDriver: null,
  setSelectedDriver: (driver) => set({ selectedDriver: driver }),
}));

// stores/useDriverStore.ts
import create from "zustand";

interface TruckState {
  selectedTruck: any; // Define the structure of the truck data here
  setSelectedTruck: (truck: any) => void;
}

export const useTruckStore = create<TruckState>((set) => ({
  selectedTruck: null, // Initial state
  setSelectedTruck: (truck) => set({ selectedTruck: truck }),
}));
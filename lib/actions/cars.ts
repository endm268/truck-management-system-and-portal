import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Base URL for the API, allowing easy modification
const BASE_URL = "https://10.10.17.102:7256/api/Cars";

// Define types for car data
interface Car {
  id?: number;
  workId: number;
  boardNumber: string;
  trailerNumber: string;
  typee: number;
  color: number;
  placeId: number;
  driverId: number;
  userInsert: number;
  userUpdate: number;
  transActionDate: string;
}

// Fetch all cars
export function useFetchCars() {
  return useQuery<Car[]>(["cars"], async () => {
    const response = await axios.get(`${BASE_URL}/Display-Cars`);
    return response.data;
  });
}

// Add a new car
export function useAddCar() {
  const queryClient = useQueryClient();

  return useMutation(
    async (newCar: Omit<Car, "id">) => {
      const response = await axios.post(`${BASE_URL}/New-Car`, newCar);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cars"]); // Refresh car data after adding
      },
    }
  );
}

// Update an existing car
export function useUpdateCar() {
  const queryClient = useQueryClient();

  return useMutation(
    async (updatedCar: Car) => {
      const response = await axios.put(`${BASE_URL}/Update-Car`, updatedCar);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cars"]); // Refresh car data after updating
      },
    }
  );
}

// Delete a car by ID
export function useDeleteCar() {
  const queryClient = useQueryClient();

  return useMutation(
    async (carId: number) => {
      const response = await axios.delete(`${BASE_URL}/Delete-Car/${carId}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cars"]); // Refresh car data after deletion
      },
    }
  );
}

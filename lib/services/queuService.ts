"use server";

import { getAuthHeaders } from "../helper";

const BASE_URL = "http://10.10.10.74:2001/api/Waitting";

// Fetch all queued cars
export async function getQueuedCars(searchTerm: string = "") {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${BASE_URL}/Display-Waitting-Cars`, {
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error fetching queued cars: ${response.status} ${response.statusText}`
      );
      console.error(`Response body: ${errorText}`);
      throw new Error(
        `Failed to fetch queued cars: ${response.status} ${response.statusText}`
      );
    }

    const cars = await response.json();
    if (searchTerm) {
      return cars.filter((car: any) =>
        car.carName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return cars;
  } catch (error) {
    console.error("Error fetching queued cars:", error);
    throw new Error("Failed to fetch queued cars");
  }
}

// Add a car to the queue
export async function addCarToQueue(
  carWorkId: number,
  numberOfTimeItCanEnter: number = 1
) {
  try {
    const headers = await getAuthHeaders();

    const body = {
      carWorkId,
      numberOfTimeItCanEnter,
    };

    const response = await fetch(`${BASE_URL}/Add-Car-To-Waitting-Area`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error adding car to queue: ${errorText}`);
      throw new Error(`Failed to add car. Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error("Error adding car to queue:", error);
    throw new Error("Failed to add car to queue");
  }
}

// Remove a car from the queue
export async function removeCarFromQueue(
  carId: number
): Promise<{ message: string }> {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${BASE_URL}/Remove-Car-From-Area/${carId}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error removing car from queue: ${response.status} ${response.statusText} - ${errorText}`
      );
      throw new Error(`Failed to remove car. Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return { message: data.message || "Car removed successfully." };
    } else {
      const text = await response.text();
      return { message: text || "Car removed successfully." };
    }
  } catch (error: any) {
    console.error(`Error removing car with ID ${carId}:`, error);
    throw new Error(error.message || "Failed to remove car from queue.");
  }
}

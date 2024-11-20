"use server";

import { getAuthHeaders } from "../helper";

const BASE_URL = "http://10.10.10.74:2001/api/Cars";

// Fetch all cars
export async function getCars(searchTerm: string = "") {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${BASE_URL}/Display-Cars`, {
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error fetching cars: ${response.status} ${response.statusText}`
      );
      console.error(`Response body: ${errorText}`);
      throw new Error(
        `Failed to fetch cars: ${response.status} ${response.statusText}`
      );
    }

    const cars = await response.json();

    if (searchTerm) {
      return cars.filter((car: any) =>
        car.driverName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return cars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw new Error("Failed to fetch cars");
  }
}

// Add a new car
export async function addCar(carData: any) {
  try {
    const headers = await getAuthHeaders();

    console.log("Request Data:", carData);

    const response = await fetch(`${BASE_URL}/New-Car`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error adding car: ${errorText}`);
      throw new Error(
        `Failed to add car. Status: ${response.status}. Details: ${errorText}`
      );
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error("Error adding car:", error);
    throw new Error("Failed to add car");
  }
}

// Update an existing car
export async function updateCar(id: number, carData: any) {
  try {
    const headers = await getAuthHeaders();

    const dataToSend = {
      id: id,
      workId: carData.workId,
      boardNumber: carData.boardNumber,
      trailerNumber: carData.trailerNumber,
      typee: carData.typee,
      color: carData.color,
      driverId: carData.driverId,
    };

    console.log("Request Payload:", dataToSend);

    const response = await fetch(`${BASE_URL}/Update-Car`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    const contentType = response.headers.get("content-type");

    let responseBody: any;
    if (contentType && contentType.includes("application/json")) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text();
    }

    if (!response.ok) {
      console.error(
        `Error updating car: Status ${response.status} ${response.statusText} - ${responseBody}`
      );
      throw new Error(
        `Failed to update car. Status: ${response.status} - ${response.statusText}`
      );
    }

    console.log("Car updated successfully:", responseBody);
    return responseBody;
  } catch (error) {
    console.error(`Error updating car with ID ${id}:`, error);
    throw new Error("Failed to update car");
  }
}

// Delete a car by ID
export async function deleteCar(id: number): Promise<{ message: string }> {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${BASE_URL}/Delete-Car/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error deleting car: ${response.status} ${response.statusText} - ${errorText}`
      );
      throw new Error(`Failed to delete car. Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return { message: data.message || "Car deleted successfully." };
    } else {
      const text = await response.text();
      return { message: text || "Car deleted successfully." };
    }
  } catch (error: any) {
    console.error(`Error deleting car with ID ${id}:`, error);
    throw new Error(error.message || "Failed to delete car.");
  }
}

// change Car Owner a car by ID
export async function changeCarOwner(
  carId: number,
  newOwnerId: number
): Promise<{ message: string }> {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(
      `${BASE_URL}/ChangeCarOwner/${carId}/${newOwnerId}`,
      {
        method: "PUT",
        headers,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error changing car owner: ${response.status} ${response.statusText} - ${errorText}`
      );
      throw new Error(
        `Failed to change car owner. Status: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return { message: data.message || "Car owner changed successfully." };
    } else {
      const text = await response.text();
      return { message: text || "Car owner changed successfully." };
    }
  } catch (error: any) {
    console.error(`Error changing owner for car ID ${carId}:`, error);
    throw new Error(error.message || "Failed to change car owner.");
  }
}
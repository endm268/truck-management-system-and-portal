"use server";

import { getAuthHeaders } from "../helper";

const BASE_URL = "http://10.10.10.74:2001/api/Drivers";



// Fetch all drivers
export async function getDrivers(searchTerm: string = "") {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${BASE_URL}/Display-Drivers`, {
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error fetching drivers: ${response.status} ${response.statusText}`
      );
      console.error(`Response body: ${errorText}`);
      throw new Error(
        `Failed to fetch drivers: ${response.status} ${response.statusText}`
      );
    }

    const drivers = await response.json();
    if (searchTerm) {
      return drivers.filter((driver: any) =>
        driver.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return drivers;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    throw new Error("Failed to fetch drivers");
  }
}


// Fetch a single driver by ID
export async function getDriverById(id: number) {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${BASE_URL}/Display-Drivers/${id}`, {
      cache: "no-store",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch driver with ID ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching driver with ID ${id}:`, error);
    throw new Error("Failed to fetch driver");
  }
}

// Add a new driver
export async function addDriver(driverData: any) {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${BASE_URL}/New-Driver`, {
      method: "POST",
      headers,
      body: JSON.stringify(driverData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error adding driver: ${errorText}`);
      throw new Error(`Failed to add driver. Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error("Error adding driver:", error);
    throw new Error("Failed to add driver");
  }
}


// Update an existing driver
export async function updateDriver(id: string, driverData: any) {
  try {
    const headers = await getAuthHeaders();

    // Convert 'id' and 'liveIn' to numbers
    const dataToSend = {
      id: parseInt(id, 10),
      ...driverData,
      liveIn: parseInt(driverData.liveIn, 10), // Ensure 'liveIn' is a number
    };

    console.log("here 1 ");
    console.log("data", driverData);
    console.log("id", id);
    console.log("headers", headers);
    console.log("dataToSend", dataToSend);

    const response = await fetch(`${BASE_URL}/Update-Driver`, {
      // Corrected endpoint
      method: "PUT",
      headers,
      body: JSON.stringify(dataToSend),
    });

    // Get the Content-Type header
    const contentType = response.headers.get("content-type");

    // Read the response based on Content-Type
    let responseBody: any;
    if (contentType && contentType.includes("application/json")) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text();
    }

    if (!response.ok) {
      console.error(
        `Error updating driver: Status ${response.status} ${response.statusText} - ${responseBody}`
      );
      throw new Error(
        `Failed to update driver. Status: ${response.status} - ${response.statusText}`
      );
    }

    console.log("Driver updated successfully:", responseBody);
    return responseBody;
  } catch (error) {
    console.error(`Error updating driver with ID ${id}:`, error);
    throw new Error("Failed to update driver");
  }
}

// Delete a driver by ID
export async function deleteDriver(id: number): Promise<{ message: string }> {
  try {
    const headers = await getAuthHeaders();
    console.log("here 2 ");
    console.log("id", id);
    console.log("headers", headers);
    
    const response = await fetch(`${BASE_URL}/Delete-Driver/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error deleting driver: ${response.status} ${response.statusText} - ${errorText}`
      );
      throw new Error(`Failed to delete driver. Status: ${response.status}`);
    }

    // Assuming the server returns a JSON response on successful deletion
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return { message: data.message || "Driver deleted successfully." };
    } else {
      // Handle plain text responses
      const text = await response.text();
      return { message: text || "Driver deleted successfully." };
    }
  } catch (error: any) {
    console.error(`Error deleting driver with ID ${id}:`, error);
    throw new Error(error.message || "Failed to delete driver.");
  }
}

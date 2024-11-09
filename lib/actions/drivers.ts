// lib/actions/drivers.ts

const BASE_URL = "https://10.10.17.102:7256/api/Drivers";

// Define the Driver data type
interface Driver {
  id: number;
  fullName: string;
  phoneNumber: string;
  cardId: string;
  driverCardId: string;
  nearestFraindName: string;
  nearestFraindPhone: string;
  liveIn: number;
}

// Server-side API calls as async functions
export async function fetchDrivers(): Promise<Driver[]> {
  const response =  await fetch(
    `https://10.10.17.102:7256/api/Drivers/Display-Drivers`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch drivers");
  }
  return response.json();
}

export async function addDriver(
  driverData: Omit<Driver, "id">
): Promise<Driver> {
  const response = await fetch(`${BASE_URL}/New-Driver`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(driverData),
  });
  if (!response.ok) {
    throw new Error("Failed to add driver");
  }
  return response.json();
}

export async function updateDriver(driverData: Driver): Promise<Driver> {
  const response = await fetch(`${BASE_URL}/Update-Driver`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(driverData),
  });
  if (!response.ok) {
    throw new Error("Failed to update driver");
  }
  return response.json();
}

export async function deleteDriver(driverId: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/Delete-Driver/${driverId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete driver");
  }
}

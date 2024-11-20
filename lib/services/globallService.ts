"use server";

import { getAuthHeaders } from "../helper";

const BASE_URL = "http://10.10.10.74:2001/api/Globall";

// Fetch data from a given endpoint
async function fetchData(endpoint: string) {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching data from ${endpoint}: ${response.status}`);
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in fetchData for ${endpoint}:`, error);
    throw new Error(`Error fetching data from ${endpoint}`);
  }
}

// Fetch areas
export async function getAreas() {
  return await fetchData("Display-Area");
}

// Fetch colors
export async function getColors() {
  return await fetchData("Display-Color");
}

// Fetch car types
export async function getCarTypes() {
  return await fetchData("Display-CarType");
}

// Fetch cities
export async function getCities() {
  return await fetchData("Display-Cities");
}

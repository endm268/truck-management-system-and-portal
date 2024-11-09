"use server";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

// Fetch all users with optional search
export const getUsers = async (searchTerm: string = "") => {
  try {
    const response = await fetch(BASE_URL);
    const users = await response.json();

    if (searchTerm) {
      return users.filter(
        (user: any) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

// Fetch a single user by ID
export const getUserById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw new Error("Failed to fetch user");
  }
};

// Create a new user
export const createUser = async (userData: any) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

// Update an existing user
export const updateUser = async (id: number, userData: any) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw new Error("Failed to update user");
  }
};

// Delete a user by ID
export const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw new Error("Failed to delete user");
  }
};

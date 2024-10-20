import axios from "axios";

// Base URL of the API
const BASE_URL = "https://ubuntu-portal.onrender.com/api/orders/";

// Create order
export const createOrder = async (orderData: any) => {
  try {
    const response = await axios.post(BASE_URL, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// List orders
export const listOrders = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.results; // Assuming you want the order list
  } catch (error) {
    console.error("Error listing orders:", error);
    throw error;
  }
};

// Read order by ID
export const readOrder = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error reading order ${id}:`, error);
    throw error;
  }
};

// Update order by ID (full update)
export const updateOrder = async (id: string, orderData: any) => {
  try {
    const response = await axios.put(`${BASE_URL}${id}/`, orderData);
    return response.data;
  } catch (error) {
    console.error(`Error updating order ${id}:`, error);
    throw error;
  }
};

// Partial update order by ID
export const partialUpdateOrder = async (id: string, orderData: any) => {
  try {
    const response = await axios.patch(`${BASE_URL}${id}/`, orderData);
    return response.data;
  } catch (error) {
    console.error(`Error partially updating order ${id}:`, error);
    throw error;
  }
};

// Delete order by ID
export const deleteOrder = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting order ${id}:`, error);
    throw error;
  }
};

// Get order history
export const orderHistory = async () => {
  try {
    const response = await axios.get(`${BASE_URL}history/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};

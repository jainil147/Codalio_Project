import axios from 'axios';

// You can use environment variables for different environments (e.g., production, development)
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";  // Defaulting to localhost for development

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, { name, email, password });
    return response.data;
  } catch (error) {
    // Optionally, you can log the error for debugging purposes
    console.error("Error during registration:", error.response || error.message);
    throw error;  // Rethrow to be handled by the calling component
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { email, password });
    return response.data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during login:", error.response || error.message);
    throw error;  // Rethrow to be handled by the calling component
  }
};

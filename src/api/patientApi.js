// src/api/patientApi.js
import axios from "axios";

// Add a function to check auth status
export const checkAuthStatus = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/auth/check-session", {
      withCredentials: true
    });
    console.log("Auth status:", response.data);
    return response.data;
  } catch (error) {
    console.error("Auth check failed:", error);
    return null;
  }
};

export const checkPatientExists = async (patientId) => {
  try {
    const authStatus = await checkAuthStatus();
    if (!authStatus) {
      throw new Error("Not authenticated");
    }

    const response = await axios.get(`http://localhost:8080/api/patients/${patientId}`, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error checking patient:', error);
    throw error;
  }
};

// Function to create a new patient
export const createPatient = async (patientInfo) => {
  try {
    const response = await axios.post("http://localhost:8080/api/patients", patientInfo, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
};
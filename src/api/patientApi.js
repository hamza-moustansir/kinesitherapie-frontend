// src/api/patientApi.js
import axios from "axios";

// Function to check if a patient exists
export const checkPatientExists = (patientId) => {
  return axios.get(`http://localhost:8080/patients/${patientId}`); // Adjust URL as needed
};

// Function to create a new patient
export const createPatient = (patientInfo) => {
  return axios.post("http://localhost:8080/api/patients", patientInfo); // Adjust URL as needed
};

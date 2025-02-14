import axios from "axios";

export const createRendezVous = async (appointmentData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/rendez-vous",
      appointmentData,
      { withCredentials: true }
    );
    return response.data; // The response from the server
  } catch (error) {
    console.error("Error creating rendez-vous:", error);
  }
};
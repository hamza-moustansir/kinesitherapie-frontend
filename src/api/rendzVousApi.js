import axios from "axios";

export const createRendezVous = async (appointmentData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/rendezvous",
      appointmentData
    );
    return response.data; // The response from the server
  } catch (error) {
    console.error("Error creating rendez-vous:", error);
  }
};

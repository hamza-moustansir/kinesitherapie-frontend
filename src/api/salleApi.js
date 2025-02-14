import axios from "axios";

export const getSalles = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/salles/available"
    );
    return response.data;

    // The list of salles
  } catch (error) {
    console.error("Error fetching salles:", error);
  }
};

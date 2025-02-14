export default async function getPrestations() {
  try {
    const response = await fetch("http://localhost:8080/api/prestations");

    if (!response.ok) {
      // Handle error if the response isn't OK
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("API Response for Prestations:", data);
    return data;
  } catch (error) {
    console.error("Error fetching prestations:", error);
    return []; // Return an empty array if the fetch fails
  }
}

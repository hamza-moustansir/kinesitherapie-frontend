import api from '../../utils/api';

const API_URL = '/salles';

const SalleService = {
  getAllSalles: async (page = 0, size = 10) => {
    const response = await api.get(`${API_URL}?page=${page}&size=${size}`);
    return response.data.content || []; // ✅ Retourne un tableau
  },

  createSalle: async (salleData) => {
    console.log("Données envoyées :", salleData); // Vérification avant envoi
    const response = await api.post(API_URL, salleData);
    console.log("Salle créée (API response) :", response.data); // 🔍 Vérifie si l'API retourne bien la salle complète
    return response.data;
  },
  
  
  

  updateSalle: async (id, salleData) => {
    const response = await api.put(`${API_URL}/${id}`, salleData);
    return response.data;
  },

  deleteSalle: async (id) => {
    await api.delete(`${API_URL}/${id}`);
  },
};

export default SalleService;

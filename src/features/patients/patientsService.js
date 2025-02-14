import api from '../../utils/api'; 

const API_URL = '/patients'; 

const PatientService = {
  createPatient: async (patientData) => {
    const response = await api.post(API_URL, patientData); 
    return response.data;
  },

  updatePatient: async (id, patientData) => {
    const response = await api.put(`${API_URL}/update/${id}`, patientData);
    return response.data;
  },

  getPatientById: async (id) => {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  },

  getAllPatients: async (page = 0, size = 10) => {
    const response = await api.get(`${API_URL}?page=${page}&size=${size}`);
    return response.data;
  },

  deletePatient: async (id) => {
    await api.delete(`${API_URL}/delete/${id}`);
  },
};

export default PatientService;
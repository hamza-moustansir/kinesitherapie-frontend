import api from '../../utils/api';

const PatientService = {
  createPatient: async (patientData) => {
    const response = await api.post('/api/patients', patientData);
    return response.data;
  },

  updatePatient: async (id, patientData) => {
    const response = await api.put(`/api/patients/update/${id}`, patientData);
    return response.data;
  },

  getPatientById: async (id) => {
    const response = await api.get(`/api/patients/${id}`);
    return response.data;
  },

  getAllPatients: async (page = 0, size = 10) => {
    const response = await api.get(`/api/patients?page=${page}&size=${size}`);
    return response.data;
  },

  deletePatient: async (id) => {
    await api.delete(`/api/patients/delete/${id}`);
  }
};

export default PatientService;
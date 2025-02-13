import api from '../../utils/api';

const API_URL = '/utilisateurs'; 
const API_AUTH_URL = 'http://localhost:8080/api/auth/';

const UserService = {
  getAllUsers: async (page = 0, size = 10) => {
    const response = await api.get(`${API_URL}?page=${page}&size=${size}`);
    return response.data.content || [];
  },

  createUser: async (userData) => {
    try {
      const response = await api.post(API_AUTH_URL + 'register', userData);
      const newUser = {
        id: response.data.id,
        email: response.data.email,
        role: response.data.role,
        token: response.data.token, 
        loggedIn: false,
      };
      return newUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'User creation failed');
    }
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`${API_URL}/update/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    await api.delete(`${API_URL}/delete/${id}`);
  },
};

export default UserService;

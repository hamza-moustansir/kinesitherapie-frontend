import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const authService = {
  register: async (registerData) => {
    try {
      const response = await axios.post(API_URL + 'register', registerData);
      return {
        id: response.data.id, // Ajout de l'ID
        email: response.data.email,
        role: response.data.role,
        token: response.data.token, // Ajout du token
        loggedIn: false,
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  login: async (loginData) => {
    try {
      const response = await axios.post(API_URL + 'login', loginData, {
        withCredentials: true,
      });

      localStorage.setItem('user', JSON.stringify({
        id: response.data.id, // Ajout de l'ID
        email: response.data.email,
        role: response.data.role,
        token: response.data.token, // Ajout du token
        loggedIn: true,
      }));

      return {
        id: response.data.id,
        email: response.data.email,
        role: response.data.role,
        token: response.data.token,
        loggedIn: true,
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  logout: async () => {
    try {
      await axios.post(API_URL + 'logout', {}, { withCredentials: true });
    } finally {
      localStorage.removeItem('user');
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
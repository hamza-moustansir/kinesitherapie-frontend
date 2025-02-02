import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const authService = {
  register: async (registerData) => {
    try {
      const response = await axios.post(API_URL + 'register', registerData);
      return {
        email: response.data.email,
        role: response.data.role,
        loggedIn: false
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  login: async (loginData) => {
    try {
      const response = await axios.post(API_URL + 'login', loginData, {
        withCredentials: true
      });
      
      localStorage.setItem('user', JSON.stringify({
        email: response.data.email,
        role: response.data.role,
        loggedIn: true
      }));
      
      return {
        email: response.data.email,
        role: response.data.role,
        loggedIn: true
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;
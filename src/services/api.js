const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  getCurrentUser: async () => {
    return apiRequest('/auth/me');
  }
};

// Events API
export const eventsAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);

    const queryString = queryParams.toString();
    return apiRequest(`/events${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id) => {
    return apiRequest(`/events/${id}`);
  },

  create: async (eventData) => {
    return apiRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  },

  update: async (id, eventData) => {
    return apiRequest(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData)
    });
  },

  delete: async (id) => {
    return apiRequest(`/events/${id}`, {
      method: 'DELETE'
    });
  },

  register: async (id) => {
    return apiRequest(`/events/${id}/register`, {
      method: 'POST'
    });
  },

  cancelRegistration: async (id) => {
    return apiRequest(`/events/${id}/register`, {
      method: 'DELETE'
    });
  },

  getRegistrations: async (id) => {
    return apiRequest(`/events/${id}/registrations`);
  }
};

// Admin API
export const adminAPI = {
  getStats: async () => {
    return apiRequest('/admin/stats');
  },

  getUsers: async (page = 1, limit = 20) => {
    return apiRequest(`/admin/users?page=${page}&limit=${limit}`);
  },

  updateUserRole: async (userId, role) => {
    return apiRequest(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role })
    });
  },

  deleteUser: async (userId) => {
    return apiRequest(`/admin/users/${userId}`, {
      method: 'DELETE'
    });
  }
};

export default {
  authAPI,
  eventsAPI,
  adminAPI
};


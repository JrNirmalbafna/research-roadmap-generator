import { API_CONFIG } from '../config/api.config';

class ApiService {
  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
  }

  // Get auth token from Auth0
  async getAuthToken() {
    try {
      const token = await window.auth0.getTokenSilently();
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      throw error;
    }
  }

  // Generic API call method with authentication
  async fetchWithAuth(endpoint, options = {}) {
    try {
      const token = await this.getAuthToken();
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      };

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }

  // AI Service Methods
  async generateRoadmap(researchTopic, preferences) {
    return this.fetchWithAuth(API_CONFIG.endpoints.ai.generateRoadmap, {
      method: 'POST',
      body: JSON.stringify({
        topic: researchTopic,
        preferences,
      }),
    });
  }

  async analyzeResearch(content) {
    return this.fetchWithAuth(API_CONFIG.endpoints.ai.analyze, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  async getSuggestions(context) {
    return this.fetchWithAuth(API_CONFIG.endpoints.ai.suggest, {
      method: 'POST',
      body: JSON.stringify({ context }),
    });
  }

  // Auth Methods
  async verifyToken() {
    return this.fetchWithAuth(API_CONFIG.endpoints.auth.verify);
  }

  async getUserProfile() {
    return this.fetchWithAuth(API_CONFIG.endpoints.auth.profile);
  }
}

export const apiService = new ApiService(); 
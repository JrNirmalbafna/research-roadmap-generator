export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
  endpoints: {
    ai: {
      generateRoadmap: '/api/ai/generate-roadmap',
      analyze: '/api/ai/analyze',
      suggest: '/api/ai/suggest'
    },
    auth: {
      verify: '/api/auth/verify',
      profile: '/api/auth/profile'
    }
  }
};

export const AI_SERVICES = {
  models: {
    roadmap: 'gpt-4',
    analysis: 'gpt-4',
    suggestions: 'gpt-3.5-turbo'
  },
  maxTokens: {
    roadmap: 2000,
    analysis: 1000,
    suggestions: 500
  }
}; 
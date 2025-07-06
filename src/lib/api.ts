import { Click, Install, ApiResponse, StatsResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, `API request failed: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // Get all clicks
  async getClicks(): Promise<ApiResponse<Click[]>> {
    return fetchApi<ApiResponse<Click[]>>('/track/clicks');
  },

  // Get all installs
  async getInstalls(): Promise<ApiResponse<Install[]>> {
    return fetchApi<ApiResponse<Install[]>>('/track/installs');
  },

  // Get stats (counts and conversion rate)
  async getStats(): Promise<StatsResponse> {
    return fetchApi<StatsResponse>('/track/stats');
  },

  // Test connection
  async testConnection() {
    return fetchApi('/track/test-connection');
  },
}; 
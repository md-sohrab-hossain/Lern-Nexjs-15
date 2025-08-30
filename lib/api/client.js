/**
 * Base API Client
 * Handles all HTTP operations
 */

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://lern-nexjs-15-git-89-eventry-project-sajal-khans-projects.vercel.app"
    : "http://localhost:3000";

class ApiClient {
  constructor(baseURL = BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}/api${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add body only for methods that support it
    if (options.body && typeof options.body === "object") {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);

      // Handle different response types
      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(
          data?.error || data || `HTTP Error: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      // Error handled silently
      throw error;
    }
  }

  // GET method
  async get(endpoint, params = {}, options = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `${endpoint}?${queryParams}` : endpoint;

    return this.request(url, {
      method: "GET",
      cache: options.cache || "no-store",
      ...options,
    });
  }

  // POST method
  async post(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: data,
      ...options,
    });
  }

  // PUT method
  async put(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: data,
      ...options,
    });
  }

  // PATCH method
  async patch(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: "PATCH",
      body: data,
      ...options,
    });
  }

  // DELETE method
  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: "DELETE",
      ...options,
    });
  }
}

// Create singleton instance
export const apiClient = new ApiClient();
export default apiClient;

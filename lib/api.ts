const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

class ApiClient {
  private getToken(): string | null {
    if (typeof window === "undefined") return null
    const storage = localStorage.getItem("auth-storage")
    if (!storage) return null
    const { state } = JSON.parse(storage)
    return state?.token || null
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const token = this.getToken()
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Erro desconhecido" }))
      throw new Error(error.error || "Erro na requisição")
    }

    return response.json()
  }

  // Auth
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(name: string, email: string, password: string) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    })
  }

  // Events
  async getEvents(params?: string) {
    const query = params ? `?${params}` : ""
    return this.request(`/events${query}`)
  }

  async getEvent(id: string) {
    return this.request(`/events/${id}`)
  }

  async createEvent(data: any) {
    return this.request("/events", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateEvent(id: string, data: any) {
    return this.request(`/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteEvent(id: string) {
    return this.request(`/events/${id}`, {
      method: "DELETE",
    })
  }

  // Cities
  async getCities() {
    return this.request("/cities")
  }

  async getCity(id: string) {
    return this.request(`/cities/${id}`)
  }

  async createCity(data: { name: string; state: string }) {
    return this.request("/cities", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Users
  async getUser(id: string) {
    return this.request(`/users/${id}`)
  }
}

export const api = new ApiClient()

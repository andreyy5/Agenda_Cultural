"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { api } from "./api"

interface User {
  id: number
  name: string
  email: string
  isAdmin: boolean
}

interface AuthState {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User, token: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        const data = await api.login(email, password)
        set({ user: data.user, token: data.token })
      },
      register: async (name, email, password) => {
        const data = await api.register(name, email, password)
        set({ user: data.user, token: data.token })
      },
      logout: () => {
        set({ user: null, token: null })
      },
      setUser: (user, token) => {
        set({ user, token })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)

interface Event {
  id: number
  title: string
  description: string
  date: string
  location: string
  category: string
  imageUrl?: string
  price: number
  capacity?: number
  city: {
    id: number
    name: string
    state: string
  }
  user: {
    id: number
    name: string
  }
}

interface EventState {
  events: Event[]
  loading: boolean
  fetchEvents: (params?: string) => Promise<void>
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  loading: false,
  fetchEvents: async (params) => {
    set({ loading: true })
    try {
      const events = await api.getEvents(params)
      set({ events, loading: false })
    } catch (error) {
      console.error("Erro ao buscar eventos:", error)
      set({ loading: false })
    }
  },
}))

interface City {
  id: number
  name: string
  state: string
  _count?: {
    events: number
  }
}

interface CityState {
  cities: City[]
  loading: boolean
  fetchCities: () => Promise<void>
}

export const useCityStore = create<CityState>((set) => ({
  cities: [],
  loading: false,
  fetchCities: async () => {
    set({ loading: true })
    try {
      const cities = await api.getCities()
      set({ cities, loading: false })
    } catch (error) {
      console.error("Erro ao buscar cidades:", error)
      set({ loading: false })
    }
  },
}))

import { create } from 'zustand'

const useUserStore = create((set) => ({
  clients: null,
  user: null,
  token: null,
  isAuthenticated: false,
  email: null,
  setClients: (clients) => set({ clients }),
  setUser: (userData, token) =>
    set({ user: userData, token: token, isAuthenticated: true }),
  clearUser: () => set({ user: null, token: null, isAuthenticated: false }),
  setEmail: (email) => set({ email: email }),
  clearEmail: () => set({ email: null }),
}))

export default useUserStore

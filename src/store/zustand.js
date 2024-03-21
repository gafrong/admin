import { create } from 'zustand'

const useUserStore = create((set) => ({
  clients: null,
  email: null,
  isAuthenticated: false,
  orderItems: [],
  token: null,
  user: null,
  clearEmail: () => set({ email: null }),
  clearUser: () => set({ user: null, token: null, isAuthenticated: false }),
  setClients: (clients) => set({ clients }),
  setEmail: (email) => set({ email: email }),
  setStoreOrderItems: (items) => set({ orderItems: items }),
  setUser: (userData, token) =>
    set({ user: userData, token: token, isAuthenticated: true }),
}))

export default useUserStore

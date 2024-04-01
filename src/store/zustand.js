import { create } from 'zustand'

const useUserStore = create((set) => ({
  clients: null,
  email: null,
  isAuthenticated: false,
  clearEmail: () => set({ email: null }),
  setClients: (clients) => set({ clients }),
  setEmail: (email) => set({ email: email }),
}))

export default useUserStore

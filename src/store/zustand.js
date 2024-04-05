import { create } from 'zustand'

const useUserStore = create((set) => ({
  email: null,
  isAuthenticated: false,
  clearEmail: () => set({ email: null }),
  setEmail: (email) => set({ email: email }),
}))

export default useUserStore

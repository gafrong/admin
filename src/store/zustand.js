import { create } from 'zustand'

const useUserStore = create((set) => ({
  cacheBuster: Date.now(),
  email: null,
  isAuthenticated: false,
  clearEmail: () => set({ email: null }),
  setCacheBuster: () => set({ cacheBuster: Date.now() }),
  setEmail: (email) => set({ email: email }),
}))

export default useUserStore

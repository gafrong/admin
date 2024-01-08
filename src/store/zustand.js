import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (userData, token) =>
    set({ user: userData, token: token, isAuthenticated: true }),
  clearUser: () => set({ user: null, token: null, isAuthenticated: false }),
}))

export default useUserStore

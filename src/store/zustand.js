import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  email: null,
  setUser: (userData, token) =>
    set({ user: userData, token: token, isAuthenticated: true }),
  clearUser: () => set({ user: null, token: null, isAuthenticated: false }),
  setEmail: (email) => 
    set({ email:email}),
  clearEmail: () => set({ email: null}),
}))

export default useUserStore

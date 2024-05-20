'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const usePersistedStore = create(
  persist(
    (set) => ({
      imageUrl: '',
      setImageUrl: (url) => set({ imageUrl: url }),
    }),
    {
      name: 'persisted-store', // unique name
    },
  ),
)

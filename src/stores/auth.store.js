import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const authStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      hasHydrated: false,

      // Authenticate user: returns true if credentials match
      authenticateUser: (username, password) => {
        const valid = username === 'admin@august99.com' && password === 'password';
        set({ isAuthenticated: valid });
        return valid;
      },

      // Optional: logout helper
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', 
      onRehydrateStorage: () => (state) => {
        state.hasHydrated = true
      }
    }
  )
);
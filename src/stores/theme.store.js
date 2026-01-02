import { create } from 'zustand'; 
import { persist } from 'zustand/middleware';

export const themeStore = create(
  persist(
    (set) => ({
      // Theme State
      theme: 'light',
      hasHydrated: false,
      
      // Update State
      updateTheme: (theme) => set({ theme }),
    }), 
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        state.hasHydrated = true;
      },
    }
  )
);
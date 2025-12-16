import { create } from 'zustand'; 
import { persist } from 'zustand/middleware';

export const themeStore = create(
    persist(
        (set) => ({
            // Theme State
            theme: 'dark',
            
            // Update State
            updateTheme: (updatedTheme) => set({
                theme: updatedTheme
            })
        }), 
        {
            name: 'theme-storage'
        }
    )
);
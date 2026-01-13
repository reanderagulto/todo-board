import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@utils/supabase'

export const authStore = create(
  persist(
    (set, get) => ({
      user: null, 
      session: null, 
      isAuthenticated: false, 
      hasHydrated: false, 
      loading: false, 
      error: null, 

      // Initialize Supabase auth
      initialize: async () => {
        const { data } = await supabase.auth.getSession(); 

        set({
          session: data.session, 
          user: data.session?.user ?? null, 
          isAuthenticated: !!data.session
        });

        supabase.auth.onAuthStateChange((_event, session) => {
          set({
            session,
            user: session?.user ?? null,
            isAuthenticated: !!session,
          })
        });
      },

      authenticateUser: async (email, password) => {
        set({ loading: true, error: null });

        const { data, error } = await supabase.auth.signInWithPassword({
            email, 
            password,
          });
        
        if(error) {
          set({ loading: false, error: error.message });
          return false;
        }

        set({
          user: data.user, 
          session: data.session,
          isAuthenticated: true, 
          loading: false,
        });

        return true;
      }, 

      registerUser: async (email, password) => {
        set({ loading: true, error: null });

        const { data, error } = await supabase.auth.signUp({
          email, 
          password,
        });

        if(error) {
          set({ loading: false, error: error.message });
          return false;
        }

        set({
          user: data.user, 
          session: data.session,
          isAuthenticated: !!data.session,
          loading: false,
        });
        
        return true;
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({
          user: null, 
          session: null, 
          isAuthenticated: false,
        });
      }
    }),
    {
      name: 'auth-storage',

      partialize: (state) => ({
        user: state.user, 
        session: state.session,
        isAuthenticated: state.isAuthenticated
      }),
      
      onRehydrateStorage: () => (state) => {
        state.hasHydrated = true;
      }
    }
  )
);
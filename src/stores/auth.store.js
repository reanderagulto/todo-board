import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@utils/supabase';

let authListener = null;

export const authStore = create(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      hasHydrated: false,
      loading: false,
      error: null,
    
      initialize: async () => {
        if (authListener) return;
    
        const { data } = await supabase.auth.getSession();
    
        set({
          session: data.session,
          user: data.session?.user ?? null,
          isAuthenticated: !!data.session,
          hasHydrated: true
        });
    
        authListener = supabase.auth.onAuthStateChange(
          (_event, session) => {
            set({
              session,
              user: session?.user ?? null,
              isAuthenticated: !!session,
              hasHydrated: true
            });
          }
        );
      },
    
      authenticateUser: async (email, password) => {
        set({ loading: true, error: null });
    
        const { data, error } =
          await supabase.auth.signInWithPassword({ email, password });
    
        if (error) {
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
    
        if (error) {
          set({ loading: false, error: error.message });
          return false;
        }
    
        // If email confirmation is enabled
        if (!data.session) {
          set({
            loading: false,
            error: 'Please check your email to confirm your account.',
          });
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
    
      logout: async () => {
        await supabase.auth.signOut();
        set({
          user: null,
          session: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    
      // Do NOT persist session/user
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    
      onRehydrateStorage: () => (set) => {
        set({ hasHydrated: true });
      },
    }
  )
);

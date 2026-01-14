import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@utils/supabase';

let authListenerUnsubscribe = null;

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
								// Prevent multiple listeners
								if (authListenerUnsubscribe) return;

								// Fetch current session
								const { data } = await supabase.auth.getSession();

								set({
										session: data.session,
										user: data.session?.user ?? null,
										isAuthenticated: !!data.session,
										hasHydrated: true, // critical
								});

								// Subscribe to auth changes
								const { subscription } = supabase.auth.onAuthStateChange(
										(_event, session) => {
												set({
														session,
														user: session?.user ?? null,
														isAuthenticated: !!session,
														hasHydrated: true,
												});
										}
								);

								authListenerUnsubscribe = () => subscription.unsubscribe();
						},

						// Optional: cleanup listener
						cleanup: () => {
								if (authListenerUnsubscribe) {
										authListenerUnsubscribe();
										authListenerUnsubscribe = null;
								}
						},

						authenticateUser: async (email, password) => {
								set({ loading: true, error: null });

								const { data, error } = await supabase.auth.signInWithPassword({ email, password });

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

						registerUser: async (userData) => {
								set({ loading: true, error: null });

								const { data, error } = await supabase.auth.signUp(
										{
												email: userData.email,
												password: userData.password.trim(),
												options: {
														data: {
																first_name: userData.first_name	,
																last_name: userData.last_name
														}
												}
										}
								);

								if (error) {
										set({ loading: false, error: error.message });
										return false;
								}

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
						partialize: (state) => ({
								isAuthenticated: state.isAuthenticated,
						}),
						onRehydrateStorage: () => (set) => {
								// don't touch hasHydrated here
								// we set it in initialize()
						},
				}
		)
);

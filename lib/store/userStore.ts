/** @format */

// import { create } from 'zustand';

// type User = {
//   _id: string;
//   firstName: string;
//   lastName:string;
//   email: string;
//   // add any other fields you expect
// };

// type UserState = {
//   user: User | null;
//   setUser: (user: User) => void;
//   clearUser: () => void;
// };

// export const useUserStore = create<UserState>((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
//   clearUser: () => set({ user: null }),
// }));

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type User = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	avatar?: string;
	role?: string;
	createdAt?: string;
	updatedAt?: string;
};

type UserState = {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
};

type UserActions = {
	setUser: (user: User) => void;
	clearUser: () => void;
	setLoading: (loading: boolean) => void;
	updateUser: (updates: Partial<User>) => void;
};

export type UserStore = UserState & UserActions;

const cookieStorage = {
	getItem: (name: string): string | null => {
		if (typeof document === 'undefined') return null;
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) {
			const cookieValue = parts.pop()?.split(';').shift();
			return cookieValue ? decodeURIComponent(cookieValue) : null;
		}
		return null;
	},
	setItem: (name: string, value: string): void => {
		if (typeof document === 'undefined') return;
		const expires = new Date();
		expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
		document.cookie = `${name}=${encodeURIComponent(
			value
		)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
	},
	removeItem: (name: string): void => {
		if (typeof document === 'undefined') return;
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	},
};

export const useUserStore = create<UserStore>()(
	persist(
		(set, get) => ({
			// State
			user: null,
			isAuthenticated: false,
			isLoading: false,

			// Actions
			setUser: (user: User) =>
				set({
					user,
					isAuthenticated: true,
					isLoading: false,
				}),

			clearUser: () =>
				set({
					user: null,
					isAuthenticated: false,
					isLoading: false,
				}),

			setLoading: (isLoading: boolean) => set({ isLoading }),

			updateUser: (updates: Partial<User>) => {
				const currentUser = get().user;
				if (currentUser) {
					set({
						user: { ...currentUser, ...updates },
					});
				}
			},
		}),
		{
			name: 'user-storage',
			storage: createJSONStorage(() => cookieStorage),
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);

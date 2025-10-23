/** @format */

// /** @format */
// 'use client';
// import { LogOut, Settings } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// // import Image from 'next/image';
// import { useUserStore } from '../../../lib/store/userStore';
// import Modalbox from './modalbox';
// interface WorkspaceDropdownProps {
// 	trigger: React.ReactNode;
// }

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
// export function WorkspaceDropdown({ trigger }: WorkspaceDropdownProps) {
// 	const [isOpen, setIsOpen] = useState(false);
// 	// const [user, setUser] = useState<UserProfile | null>(null);
// 	const [isModalOpen, setIsModalOpen] = useState(false);
// 	const [shareLink, setShareLink] = useState('');
// 	const [loadingLogout, setLoadingLogout] = useState(false);
// 	const [logoutError, setLogoutError] = useState<string | null>(null);
// 	const router = useRouter();
// 	const [userid, setuserid] = useState<string | null>(null);
// 	const toggleDropdown = () => setIsOpen((o) => !o);
// 	const closeDropdown = (e: React.MouseEvent) => {
// 		e.stopPropagation();
// 		setIsOpen(false);
// 	};
// 	// Use Zustand store: destructure user and setUser, clearUser actions
// 	const user = useUserStore((state) => state.user);
// 	//   const setUser = useUserStore((state) => state.setUser);
// 	const clearUser = useUserStore((state) => state.clearUser);
// 	const fetchUserProfile = async () => {
// 		try {
// 			// console.log("enter to function ");
// 			// const loginuser = JSON.parse(localStorage.getItem('user') || '{}');
// 			// console.log(loginuser.user);
// 			// setUser(loginuser.user)
// 			// console.log(user);
// 			// const tokenCookie = document.cookie
// 			//  .split('; ')
// 			//  .find((row) => row.startsWith('token='));
// 			// if (!tokenCookie){
// 			//  console.log("not token");
// 			//   return;
// 			//  }
// 			//  if (!tokenCookie) {
// 			//     window.location.href = '/login';
// 			//  }
// 			// const token = tokenCookie.split('=')[1];
// 			// const [, payload] = token.split('.');
// 			// const decoded = JSON.parse(atob(payload));
// 			// const userId = decoded._id as string;
// 			// console.log("enter to function");
// 			// if (!userId)
// 			//  { console.log("not userid");
// 			//      return;}
// 			// const res = await fetch(`${API_BASE}/api/auth/users/${loginuser._id}`, {
// 			//  method: 'GET',
// 			//  credentials: 'include',
// 			//  headers: { 'Content-Type': 'application/json' },
// 			// });
// 			// if (!res.ok) throw new Error('Failed to fetch profile');
// 			// const { user } = await res.json();
// 			// setUser(user);
// 			// console.log('Loaded user:', user);
// 		} catch (err) {
// 			console.error('Error fetching profile:', err);
// 		}
// 	};

// 	useEffect(() => {
// 		if (isOpen) {
// 			console.log('profiledropdownpage');

// 			// const userId = Cookies.get('userId');
// 			// if (userId) {
// 			//        fetchUserProfile();
// 			//    }
// 			fetchUserProfile();
// 			if (typeof window !== 'undefined') {
// 				setShareLink(window.location.href);
// 			}
// 		}
// 	}, [isOpen]);
// 	const handleLogout = async () => {
// 		setLoadingLogout(true);
// 		setLogoutError(null);
// 		localStorage.clear();
// 		try {
// 			// const res = await fetch(`${API_BASE}/logout`, {
// 			const res = await fetch(`${API_BASE}/api/auth/logout`, {
// 				method: 'POST',
// 				credentials: 'include',
// 				headers: { 'Content-Type': 'application/json' },
// 			});
// 			// const res = await fetch('/logout', {
// 			// method: 'POST',
// 			// credentials: 'include',
// 			// headers: { 'Content-Type': 'application/json' },
// 			// });
// 			if (!res.ok) {
// 				const body = await res.json();
// 				throw new Error(body.message || 'Logout failed');
// 			}
// 			setIsOpen(false);
// 			// router.push('/login');
// 			clearUser();
// 			router.push('/account/login');
// 		} catch (err: unknown) {
// 			console.error('Logout error:', err);
// 			if (err instanceof Error) {
// 				setLogoutError(err.message);
// 			} else {
// 				setLogoutError('An unknown error occurred');
// 			}
// 		} finally {
// 			setLoadingLogout(false);
// 		}
// 	};
// 	return (
// 		<div className='relative'>
// 			{/* Trigger element */}
// 			<div onClick={toggleDropdown}>{trigger}</div>
// 			{isOpen && (
// 				<>
// 					<div
// 						className='fixed inset-0 z-40'
// 						onClick={closeDropdown}
// 					/>
// 					<div
// 						className='absolute left-0 top-full mt-1 w-56 rounded-md border border-purple-200 bg-white shadow-lg z-50'
// 						onClick={(e) => e.stopPropagation()}>
// 						{/* Profile header */}
// 						<div className='flex flex-col items-center py-4'>
// 							<div className='h-12 w-12 rounded-full bg-purple-500 mb-2 flex items-center justify-center text-white font-bold text-lg'>
// 								{/* {user
//                                     ? user.name
//                                             .split(' ')
//                                             .map((w) => w[0].toUpperCase())
//                                             .join('')
//                                     : ''} */}
// 								{user
// 									? `${user.firstName?.[0]?.toUpperCase() || ''}${
// 											user.lastName?.[0]?.toUpperCase() || ''
// 									  }`
// 									: ''}
// 							</div>
// 							<div className='text-center'>
// 								<p className='font-medium'>
// 									{user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
// 								</p>
// 								<p className='text-sm text-gray-500'>
// 									{user?.email || 'Loading...'}
// 								</p>
// 							</div>
// 						</div>
// 						<div className='h-px bg-gray-200 mx-1' />
// 						{/* Actions */}
// 						{/* Actions */}
// 						<div className='py-1'>
// 							<button
// 								className='flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50'
// 								onClick={() => (window.location.href = '/settings')}>
// 								{' '}
// 								<Settings className='mr-2 h-4 w-4' />
// 								<span>Setting</span>
// 							</button>

// 							<button className='flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50'>
// 								<span>Manage plans</span>
// 							</button>
// 							<button
// 								className='flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50'
// 								onClick={() => setIsModalOpen(true)}>
// 								<span>Share Neurtask...</span>
// 							</button>
// 						</div>
// 						<div className='h-px bg-gray-200 mx-1' />
// 						{/* Logout */}
// 						<div className='py-1'>
// 							<button
// 								onClick={handleLogout}
// 								disabled={loadingLogout}
// 								className='flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-50 disabled:opacity-50'>
// 								<LogOut className='mr-2 h-4 w-4' />
// 								{loadingLogout ? 'Logging out…' : 'Logout'}
// 							</button>
// 							{logoutError && (
// 								<p className='px-4 mt-1 text-xs text-red-600'>{logoutError}</p>
// 							)}
// 						</div>
// 					</div>
// 					{/* Share modal */}
// 					<Modalbox
// 						isOpen={isModalOpen}
// 						onClose={() => setIsModalOpen(false)}
// 						link={shareLink}
// 						isLoading={false}
// 					/>
// 				</>
// 			)}
// 		</div>
// 	);
// }
'use client';

import { useUserStore } from '@/lib/store/userStore';
import { LogOut, Settings, Share } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';

interface WorkspaceDropdownProps {
	trigger: React.ReactNode;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export function WorkspaceDropdown({ trigger }: WorkspaceDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);
	const [loadingLogout, setLoadingLogout] = useState(false);
	const [logoutError, setLogoutError] = useState<string | null>(null);

	const router = useRouter();
	const { user, clearUser } = useUserStore();

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	const closeDropdown = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsOpen(false);
	};

	const handleLogout = async () => {
		setLoadingLogout(true);
		setLogoutError(null);

		try {
			document.cookie =
				'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

			const res = await fetch(`${API_BASE}/api/auth/logout`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
			});

			if (!res.ok) {
				const body = await res.json();
				throw new Error(body.message || 'Logout failed');
			}

			clearUser();
			setIsOpen(false);
			router.push('/account/login');
		} catch (err: unknown) {
			console.error('Logout error:', err);
			setLogoutError(
				err instanceof Error ? err.message : 'An unknown error occurred'
			);
		} finally {
			setLoadingLogout(false);
		}
	};

	const handleNavigation = (path: string) => {
		setIsOpen(false);
		router.push(path);
	};

	const handleShare = () => {
		setIsShareModalOpen(true);
		setIsOpen(false);
	};

	const getUserInitials = () => {
		if (!user) return '';
		const firstInitial = user.firstName?.[0]?.toUpperCase() || '';
		const lastInitial = user.lastName?.[0]?.toUpperCase() || '';
		return `${firstInitial}${lastInitial}`;
	};

	const getUserFullName = () => {
		if (!user) return 'Loading...';
		return `${user.firstName || ''} ${user.lastName || ''}`.trim();
	};

	return (
		<div className='relative'>
			{/* Trigger element */}
			<div
				onClick={toggleDropdown}
				className='cursor-pointer'
				role='button'
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						toggleDropdown();
					}
				}}
				aria-expanded={isOpen}
				aria-haspopup='menu'>
				{trigger}
			</div>

			{isOpen && (
				<>
					{/* Backdrop */}
					<div
						className='fixed inset-0 z-40'
						onClick={closeDropdown}
						aria-hidden='true'
					/>

					{/* Dropdown menu */}
					<div
						className='absolute left-0 top-full mt-2 w-64 rounded-lg border border-border bg-background shadow-lg z-50'
						role='menu'
						aria-orientation='vertical'
						onClick={(e) => e.stopPropagation()}>
						{/* Profile header */}
						<div className='flex flex-col items-center py-6 px-4'>
							<div className='h-14 w-14 rounded-full bg-primary mb-3 flex items-center justify-center text-primary-foreground font-semibold text-lg'>
								{getUserInitials()}
							</div>
							<div className='text-center'>
								<p className='font-semibold text-foreground text-sm'>
									{getUserFullName()}
								</p>
								<p className='text-xs text-muted-foreground mt-1'>
									{user?.email || 'Loading...'}
								</p>
							</div>
						</div>

						<div className='h-px bg-border mx-2' />

						{/* Menu items */}
						<div className='py-2'>
							<button
								className='flex items-center w-full px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
								onClick={() => handleNavigation('/settings')}
								role='menuitem'>
								<Settings className='mr-3 h-4 w-4' />
								<span>Settings</span>
							</button>

							{/* <button
								className='flex items-center w-full px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
								onClick={() => handleNavigation('/billing')}
								role='menuitem'>
								<CreditCard className='mr-3 h-4 w-4' />
								<span>Manage Plans</span>
							</button> */}

							<button
								className='flex items-center w-full px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
								onClick={handleShare}
								role='menuitem'>
								<Share className='mr-3 h-4 w-4' />
								<span>Share Workspace</span>
							</button>
						</div>

						<div className='h-px bg-border mx-2' />

						{/* Logout section */}
						<div className='py-2'>
							<button
								onClick={handleLogout}
								disabled={loadingLogout}
								className='flex items-center w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
								role='menuitem'>
								<LogOut className='mr-3 h-4 w-4' />
								<span>{loadingLogout ? 'Logging out...' : 'Logout'}</span>
							</button>

							{logoutError && (
								<div className='px-4 py-2'>
									<p className='text-xs text-destructive'>{logoutError}</p>
								</div>
							)}
						</div>
					</div>

					{/* Share Modal - Simple implementation */}
					{isShareModalOpen && (
						<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
							<div className='bg-background rounded-lg p-6 w-full max-w-md mx-4'>
								<h3 className='text-lg font-semibold mb-4'>Share Workspace</h3>
								<div className='flex items-center gap-2 p-3 bg-muted rounded-md'>
									<input
										type='text'
										value={
											typeof window !== 'undefined' ? window.location.href : ''
										}
										readOnly
										className='flex-1 bg-transparent text-sm'
									/>
									<button
										onClick={() => {
											if (typeof window !== 'undefined') {
												navigator.clipboard.writeText(window.location.href);
											}
										}}
										className='px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors'>
										Copy
									</button>
								</div>
								<div className='flex justify-end mt-4'>
									<button
										onClick={() => setIsShareModalOpen(false)}
										className='px-4 py-2 text-sm hover:bg-accent rounded transition-colors'>
										Close
									</button>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}

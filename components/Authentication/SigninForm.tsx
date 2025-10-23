'use client';

import { toast } from '@/hooks/use-toast';
import { useUserStore } from '@/lib/store/userStore';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import type React from 'react';
import { useRef, useState } from 'react';
import { z } from 'zod';
import { Button } from '../ui/button';

interface LoginFormProps {
	onSuccess?: () => void;
}

export type LoginCredentials = {
	email: string;
	password: string;
};

export class AuthError extends Error {
	constructor(message: string, public statusCode?: number) {
		super(message);
		this.name = 'AuthError';
	}
}

	const loginSchema = z.object({
		email: z
			.string()
			.email('Please enter a valid email address')
			.max(255, 'Email must be less than 255 characters'),
		password: z
			.string()
			.min(1, 'Password is required')
			.max(128, 'Password must be less than 128 characters'),
	});

export default function LoginForm({ onSuccess }: LoginFormProps) {
	const [data, setData] = useState<LoginCredentials>({
		email: '',
		password: '',
	});
	const [formErrors, setFormErrors] = useState<Partial<LoginCredentials>>({});
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const searchParams = useSearchParams();
	const redirectUrl = searchParams.get('redirectUrl') || '/dashboard';
	const router = useRouter();

	const { setUser, setLoading: setUserLoading } = useUserStore();

	const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
	const BACKEND_ORIGIN = (() => {
		try {
		return new URL(API_BASE).origin;
		} catch {
		return API_BASE;
		}
	})();

	const saveTokenBoth = (token: string | null) => {
		if (!token) return;
		try {
		localStorage.setItem('token', token);
		} catch { }
		try {
		const expires = new Date();
		expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
		document.cookie = `auth-token=${encodeURIComponent(
			token
		)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
		} catch { }
	};

	const login = async (credentials: LoginCredentials) => {
		const response = await fetch(`${API_BASE}/api/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
		credentials: 'include',
		});

		const data = await response.json();

		if (!response.ok) {
		throw new AuthError(data.message || 'Login failed', response.status);
		}

		if (data.token) {
		saveTokenBoth(data.token);
		}

		return data;
	};

	const validateForm = (): boolean => {
		try {
		loginSchema.parse(data);
		setFormErrors({});
		return true;
		} catch (error) {
		if (error instanceof z.ZodError) {
			const newErrors: Partial<LoginCredentials> = {};
			error.errors.forEach((err) => {
			if (err.path[0]) {
				newErrors[err.path[0] as keyof LoginCredentials] = err.message;
			}
			});
			setFormErrors(newErrors);

			const firstErrorField = Object.keys(newErrors)[0] as keyof LoginCredentials;
			const refs = { email: emailRef, password: passwordRef };
			refs[firstErrorField]?.current?.focus();
		}
		return false;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
		const firstError = Object.values(formErrors)[0];
		if (firstError) {
			toast({
			variant: 'error',
			title: 'Validation Error',
			description: firstError,
			});
		}
		return;
		}

		setLoading(true);
		setUserLoading(true);

		try {
		const response = await login(data);

		setUser(response.user);

		toast({
			variant: 'success',
			title: 'Welcome back!',
			description: `Hi ${response.user.firstName}, you're successfully logged in.`,
		});

		onSuccess?.();
		router.push(redirectUrl || 'dashboard');
		} catch (error) {
		console.error('Login error:', error);

		const errorMessage =
			error instanceof AuthError
			? error.message
			: 'Something went wrong. Please try again.';

		toast({
			variant: 'error',
			title: 'Login Failed',
			description: errorMessage,
		});
		} finally {
		setLoading(false);
		setUserLoading(false);
		}
	};

  // Google Login with Popup
	const handleGoogleLogin = () => {
		const authUrl = `${API_BASE}/api/auth/google`;
		let popup: Window | null = null;
		let popupPoll: number | null = null;
		let messageReceived = false;
		let authSuccessful = false;

		const cleanUp = () => {
		try {
			if (popupPoll) {
			window.clearInterval(popupPoll);
			popupPoll = null;
			}
			window.removeEventListener('message', onMessage);
			if (popup && !popup.closed) {
			popup.close();
			}
			popup = null;
		} catch (err) {
			console.log(err)
		}
    };

    const tryFetchCurrentUser = async (token: string | null, emailFallback?: string) => {
		saveTokenBoth(token);

		try {
			const res = await fetch(`${API_BASE}/api/auth/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			credentials: 'include',
			});
			
			if (res.ok) {
			const json = await res.json();
			if (json?.user) {
				setUser(json.user);
				toast({
				variant: 'success',
				title: 'Signed in',
				description: `Welcome back, ${json.user.firstName || json.user.email}!`,
				});
				onSuccess?.();
				router.push(redirectUrl);
				return;
			}
			}
		} catch (err) {
			console.warn('Failed to fetch /api/auth/me', err);
		}

		// Fallback
		if (emailFallback) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			setUser({ email: emailFallback } as any);
			toast({
			variant: 'success',
			title: 'Signed in',
			description: `Welcome, ${emailFallback}!`,
			});
			onSuccess?.();
			router.push(redirectUrl);
		}
    };

    // Message listener
    const onMessage = async (e: MessageEvent) => {
		try {
			const allowedOrigins = [BACKEND_ORIGIN, window.location.origin].filter(Boolean);
			if (!allowedOrigins.includes(e.origin)) {
			return;
			}
			
			const payload = e.data;
			if (!payload || payload.type !== 'google-auth') return;

			messageReceived = true;

			if (payload.success) {
			authSuccessful = true;
			const token = payload.token ?? null;
			const email = payload.email ?? null;
			cleanUp();
			await tryFetchCurrentUser(token, email);
			} else {
			cleanUp();
			toast({
				variant: 'error',
				title: 'Google sign-in failed',
				description: payload?.message || 'Authentication cancelled or failed',
			});
			}
		} catch (err) {
			console.warn('onMessage handler error', err);
			cleanUp();
		}
		};

		// Open popup
		const width = 600;
		const height = 700;
		const left = window.screenX + (window.innerWidth - width) / 2;
		const top = window.screenY + (window.innerHeight - height) / 2;
		
		popup = window.open(
		authUrl,
		'googleAuth',
		`width=${width},height=${height},left=${left},top=${top}`
		);

		if (!popup) {
		toast({
			variant: 'error',
			title: 'Popup blocked',
			description: 'Please allow popups for this site and try again.',
		});
		return;
		}

		window.addEventListener('message', onMessage, false);

		// Polling - check if popup closed
		let pollCount = 0;
		const MAX_POLLS = 240; // 2 minutes max

		popupPoll = window.setInterval(() => {
		pollCount++;
		
		try {
			// Check if popup is closed
			if (!popup || popup.closed) {
			cleanUp();
			
			// Only show error if auth wasn't successful
			if (!authSuccessful && !messageReceived) {
				toast({
				variant: 'error',
				title: 'Sign-in cancelled',
				description: 'The Google sign-in window was closed.',
				});
			}
			return;
			}
			
			// Timeout after max polls
			if (pollCount >= MAX_POLLS) {
			cleanUp();
			toast({
				variant: 'error',
				title: 'Sign-in timeout',
				description: 'Google sign-in took too long. Please try again.',
			});
			}
		} catch (err) {
			console.log(err)
		}
		}, 500);
	};

	return (
		<div className='w-full max-w-md mx-auto'>
		<form onSubmit={handleSubmit} className='space-y-6'>
			{/* Email Field */}
			<div>
			<label htmlFor='email' className='block text-sm font-medium text-foreground mb-1'>
				Email address
			</label>
			<input
				id='email'
				type='email'
				value={data.email}
				onChange={(e) =>
				setData((prev) => ({
					...prev,
					email: e.target.value.trim().toLowerCase(),
				}))
				}
				className='w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
				placeholder='john@example.com'
				ref={emailRef}
				aria-invalid={!!formErrors.email}
				aria-describedby={formErrors.email ? 'email-error' : undefined}
			/>
			{formErrors.email && (
				<p id='email-error' className='mt-1 text-xs text-destructive'>
				{formErrors.email}
				</p>
			)}
			</div>

			{/* Password Field */}
			<div>
			<label htmlFor='password' className='block text-sm font-medium text-foreground mb-1'>
				Password
			</label>
			<div className='relative'>
				<input
				id='password'
				type={showPassword ? 'text' : 'password'}
				value={data.password}
				onChange={(e) =>
					setData((prev) => ({ ...prev, password: e.target.value }))
				}
				className='w-full px-3 py-2 pr-10 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
				placeholder='••••••••'
				ref={passwordRef}
				aria-invalid={!!formErrors.password}
				aria-describedby={formErrors.password ? 'password-error' : undefined}
				/>
				<button
				type='button'
				className='absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground'
				onClick={() => setShowPassword((prev) => !prev)}
				aria-label={showPassword ? 'Hide password' : 'Show password'}>
				{showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
				</button>
			</div>
			{formErrors.password && (
				<p id='password-error' className='mt-1 text-xs text-destructive'>
				{formErrors.password}
				</p>
			)}

			<div className='text-right mt-2'>
				<Link
				href='/account/forgot-password'
				className='text-sm text-primary hover:text-primary/80 hover:underline'>
				Forgot password?
				</Link>
			</div>
			</div>

			{/* Submit Button */}
			<Button type='submit' className='w-full' disabled={loading} size='lg'>
			{loading ? 'Signing in...' : 'Sign in'}
			</Button>
		</form>

		{/* Divider */}
		<div className='mt-6 flex items-center'>
			<div className='flex-1 border-t border-border' />
			<span className='px-4 text-sm text-muted-foreground'>or</span>
			<div className='flex-1 border-t border-border' />
		</div>

		{/* Google Login */}
		<Button
			type='button'
			variant='outline'
			className='w-full mt-4 bg-transparent'
			onClick={handleGoogleLogin}
			disabled={loading}
			size='lg'>
			<svg className='w-4 h-4 mr-2' viewBox='0 0 24 24'>
			<path
				fill='#4285F4'
				d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
			/>
			<path
				fill='#34A853'
				d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
			/>
			<path
				fill='#FBBC05'
				d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
			/>
			<path
				fill='#EA4335'
				d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
			/>
			</svg>
			Continue with Google
		</Button>
		</div>
	);
}
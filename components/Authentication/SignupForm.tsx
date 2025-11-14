/** @format */

// /** @format */

// 'use client';

// import { toast } from '@/hooks/use-toast';
// import { ArrowRight, Eye, EyeOff } from 'lucide-react';
// import React, { useEffect, useRef, useState } from 'react';
// import { z } from 'zod';
// import { Button } from '../ui/button';

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

// interface SignupData {
// 	firstName: string;
// 	lastName: string;
// 	email: string;
// 	password: string;
// }

// interface SignupFormProps {
// 	onSuccess?: () => void;
// }

// export default function SignupForm({ onSuccess }: SignupFormProps) {
// 	const [data, setData] = useState<SignupData>({
// 		firstName: '',
// 		lastName: '',
// 		email: '',
// 		password: '',
// 	});
// 	const [formErrors, setFormErrors] = useState<
// 		Partial<Record<keyof SignupData, string>>
// 	>({});
// 	const [showPassword, setShowPassword] = useState(false);
// 	const [loading, setLoading] = useState(false);
// 	const [strengthScore, setStrengthScore] = useState(0);

// 	const firstNameRef = useRef<HTMLInputElement>(null);
// 	const lastNameRef = useRef<HTMLInputElement>(null);
// 	const emailRef = useRef<HTMLInputElement>(null);
// 	const passwordRef = useRef<HTMLInputElement>(null);

// 	const schema = z.object({
// 		firstName: z.string().min(1, { message: 'First name is required' }),
// 		lastName: z.string().min(1, { message: 'Last name is required' }),
// 		email: z.string().email({ message: 'Invalid email address' }),
// 		password: z
// 			.string()
// 			.min(8, { message: 'Password must be at least 8 characters long' }),
// 	});

// 	const calculatePasswordStrength = (pw: string) => {
// 		let score = 0;
// 		if (pw.length >= 8) score += 25;
// 		if (/[A-Z]/.test(pw)) score += 25;
// 		if (/[0-9]/.test(pw)) score += 25;
// 		if (/[^A-Za-z0-9]/.test(pw)) score += 25;
// 		return score;
// 	};

// 	const getStrengthTier = (score: number) => {
// 		if (score < 50) return { label: 'Weak', color: 'bg-red-500' };
// 		if (score < 75) return { label: 'Medium', color: 'bg-yellow-500' };
// 		return { label: 'Strong', color: 'bg-green-500' };
// 	};

// 	useEffect(() => {
// 		setStrengthScore(calculatePasswordStrength(data.password));
// 	}, [data.password]);

// 	const handleValidation = () => {
// 		const result = schema.safeParse(data);
// 		if (result.success) {
// 			setFormErrors({});
// 			return true;
// 		}
// 		const { fieldErrors } = result.error.flatten();
// 		const newErrors = Object.fromEntries(
// 			Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0] ?? 'Invalid'])
// 		) as Partial<Record<keyof SignupData, string>>;
// 		setFormErrors(newErrors);
// 		const firstMsg = Object.values(fieldErrors)[0]?.[0];
// 		if (firstMsg) {
// 			toast({
// 				variant: 'error',
// 				title: 'Validation Error',
// 				description: firstMsg,
// 			});
// 		}
// 		return false;
// 	};

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();

// 		if (!data.firstName.trim()) {
// 			firstNameRef.current?.focus();
// 			return;
// 		}
// 		if (!data.lastName.trim()) {
// 			lastNameRef.current?.focus();
// 			return;
// 		}
// 		if (!data.email.trim()) {
// 			emailRef.current?.focus();
// 			return;
// 		}
// 		if (!data.password) {
// 			passwordRef.current?.focus();
// 			return;
// 		}

// 		if (!handleValidation()) return;

// 		setLoading(true);
// 		try {
// 			const regRes = await fetch(`${API_BASE}/api/auth/signup`, {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify({
// 					// name: `${data.firstName} ${data.lastName}`,
// 					firstName: data.firstName,
// 					lastName: data.lastName,
// 					email: data.email,
// 					password: data.password,
// 				}),
// 			});
// 			const regBody = await regRes.json();
// 			if (!regRes.ok) throw new Error(regBody.message || 'Registration failed');

// 			const loginRes = await fetch(`${API_BASE}/api/auth/login`, {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				// credentials: 'include',
// 				body: JSON.stringify({
// 					email: data.email,
// 					password: data.password,
// 				}),
// 			});
// 			const loginBody = await loginRes.json();
// 			if (!loginRes.ok) throw new Error(loginBody.message || 'Login failed');

// 			// saving token to local storage:
// 			localStorage.setItem('token', loginBody.token);

// 			// Debug log token
// 			//   console.log('Login successful. Token:', loginBody.token);

// 			toast({
// 				variant: 'success',
// 				title: 'Welcome aboard!',
// 				description: `Hi ${data.firstName}, you’re all set!`,
// 			});
// 			onSuccess?.();
// 		} catch (err) {
// 			toast({
// 				variant: 'error',
// 				title: 'Error',
// 				description:
// 					err instanceof Error ? err.message : 'Something went wrong',
// 			});
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const handleGoogle = () => {
// 		window.location.href = `${API_BASE}/api/auth/google`;
// 	};

// 	const { label: strengthLabel, color: strengthColor } =
// 		getStrengthTier(strengthScore);

// 	return (
// 		<div className='w-full'>
// 			<form
// 				onSubmit={handleSubmit}
// 				className='space-y-6'>
// 				{/* First & Last Name Field */}
// 				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
// 					<div>
// 						<label
// 							htmlFor='firstName'
// 							className='block text-sm font-medium'>
// 							First name
// 						</label>
// 						<input
// 							id='firstName'
// 							type='text'
// 							value={data.firstName}
// 							onChange={(e) =>
// 								setData((d) => ({ ...d, firstName: e.target.value }))
// 							}
// 							className='w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-200'
// 							ref={firstNameRef}
// 						/>
// 						{formErrors.firstName && (
// 							<p className='mt-1 text-xs text-red-600'>
// 								{formErrors.firstName}
// 							</p>
// 						)}
// 					</div>
// 					<div>
// 						<label
// 							htmlFor='lastName'
// 							className='block text-sm font-medium'>
// 							Last name
// 						</label>
// 						<input
// 							id='lastName'
// 							type='text'
// 							value={data.lastName}
// 							onChange={(e) =>
// 								setData((d) => ({ ...d, lastName: e.target.value }))
// 							}
// 							className='w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-200'
// 							ref={lastNameRef}
// 						/>
// 						{formErrors.lastName && (
// 							<p className='mt-1 text-xs text-red-600'>{formErrors.lastName}</p>
// 						)}
// 					</div>
// 				</div>

// 				{/* Email Field*/}
// 				<div>
// 					<label
// 						htmlFor='email'
// 						className='block text-sm font-medium'>
// 						Email
// 					</label>
// 					<input
// 						id='email'
// 						type='email'
// 						value={data.email}
// 						onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
// 						className='w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-200'
// 						ref={emailRef}
// 					/>
// 					{formErrors.email && (
// 						<p className='mt-1 text-xs text-red-600'>{formErrors.email}</p>
// 					)}
// 				</div>

// 				{/* Password Section & Password Strength Bar */}
// 				<div>
// 					<label
// 						htmlFor='password'
// 						className='block text-sm font-medium'>
// 						Password
// 					</label>
// 					<div className='relative'>
// 						<input
// 							id='password'
// 							type={showPassword ? 'text' : 'password'}
// 							value={data.password}
// 							onChange={(e) =>
// 								setData((d) => ({ ...d, password: e.target.value }))
// 							}
// 							className='w-full px-3 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-gray-200'
// 							required
// 							ref={passwordRef}
// 						/>
// 						<button
// 							type='button'
// 							className='absolute inset-y-0 right-0 pr-3 flex items-center'
// 							onClick={() => setShowPassword((v) => !v)}>
// 							{showPassword ? (
// 								<EyeOff className='w-5 h-5' />
// 							) : (
// 								<Eye className='w-5 h-5' />
// 							)}
// 						</button>
// 					</div>

// 					{data.password.length > 0 && (
// 						<div className='mt-1 flex items-center space-x-2'>
// 							<div className='w-1/2 h-1 bg-gray-200 rounded'>
// 								<div className={`${strengthColor} h-1 rounded w-full`} />
// 							</div>
// 							<span className='text-xs font-medium text-gray-600'>
// 								{strengthLabel}
// 							</span>
// 						</div>
// 					)}

// 					{formErrors.password && (
// 						<p className='mt-1 text-xs text-red-600'>{formErrors.password}</p>
// 					)}
// 				</div>

// 				{/* Submit Button */}
// 				<Button
// 					type='submit'
// 					className='w-full flex items-center justify-center gap-2'
// 					disabled={loading}>
// 					{loading ? 'Signing up…' : 'Get started for free'}
// 					{!loading && <ArrowRight className='ml-2 h-4 w-4' />}
// 				</Button>
// 			</form>

// 			{/* Divide Bar & Sign In with Google Button*/}
// 			<div className='mt-6 flex items-center text-sm text-gray-500'>
// 				<div className='flex-1 border-t border-gray-300' />
// 				<span className='px-2'>or</span>
// 				<div className='flex-1 border-t border-gray-300' />
// 			</div>
// 			<button
// 				onClick={handleGoogle}
// 				className='mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 border rounded-md hover:bg-gray-50 transition-colors'>
// 				<svg
// 					viewBox='0 0 24 24'
// 					width='16'
// 					height='16'
// 					xmlns='http://www.w3.org/2000/svg'>
// 					<g transform='matrix(1, 0, 0, 1, 27.009001, -39.238998)'>
// 						<path
// 							fill='#4285F4'
// 							d='M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z'
// 						/>
// 						<path
// 							fill='#34A853'
// 							d='M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z'
// 						/>
// 						<path
// 							fill='#FBBC05'
// 							d='M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z'
// 						/>
// 						<path
// 							fill='#EA4335'
// 							d='M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z'
// 						/>
// 					</g>
// 				</svg>
// 				Continue with Google
// 			</button>
// 		</div>
// 	);
// }

'use client';

import { toast } from '@/hooks/use-toast';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/userStore';

interface SignupFormProps {
	onSuccess?: () => void;
	redirectTo?: string;
}

export type SignupCredentials = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export class AuthError extends Error {
	constructor(message: string, public statusCode?: number) {
		super(message);
		this.name = 'AuthError';
	}
}

const signupSchema = z.object({
	firstName: z
		.string()
		.min(1, 'First name is required')
		.max(50, 'First name must be less than 50 characters')
		.regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
	lastName: z
		.string()
		.min(1, 'Last name is required')
		.max(50, 'Last name must be less than 50 characters')
		.regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
	email: z
		.string()
		.email('Please enter a valid email address')
		.max(255, 'Email must be less than 255 characters'),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.max(128, 'Password must be less than 128 characters')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			'Password must contain at least one uppercase letter, one lowercase letter, and one number'
		),
});

export default function SignupForm({
	onSuccess,
	redirectTo = '/dashboard',
}: SignupFormProps) {
	const [data, setData] = useState<SignupCredentials>({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const [formErrors, setFormErrors] = useState<
		Partial<Record<keyof SignupCredentials, string>>
	>({});
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [strengthScore, setStrengthScore] = useState(0);

	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const { setUser, setLoading: setUserLoading } = useUserStore();
	const router = useRouter();

	const calculatePasswordStrength = (password: string): number => {
		let score = 0;
		if (password.length >= 8) score += 25;
		if (/[A-Z]/.test(password)) score += 25;
		if (/[a-z]/.test(password)) score += 25;
		if (/[0-9]/.test(password)) score += 25;
		if (/[^A-Za-z0-9]/.test(password)) score += 25;
		return Math.min(score, 100);
	};

	const getStrengthConfig = (score: number) => {
		if (score < 50)
			return { label: 'Weak', color: 'bg-red-500', textColor: 'text-red-600' };
		if (score < 75)
			return {
				label: 'Medium',
				color: 'bg-yellow-500',
				textColor: 'text-yellow-600',
			};
		return {
			label: 'Strong',
			color: 'bg-green-500',
			textColor: 'text-green-600',
		};
	};

	useEffect(() => {
		setStrengthScore(calculatePasswordStrength(data.password));
	}, [data.password]);

	const validateForm = (): boolean => {
		try {
			signupSchema.parse(data);
			setFormErrors({});
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors: Partial<Record<keyof SignupCredentials, string>> = {};
				error.errors.forEach((err) => {
					if (err.path[0]) {
						newErrors[err.path[0] as keyof SignupCredentials] = err.message;
					}
				});
				setFormErrors(newErrors);

				// Focus first error field
				const firstErrorField = Object.keys(
					newErrors
				)[0] as keyof SignupCredentials;
				const refs = {
					firstName: firstNameRef,
					lastName: lastNameRef,
					email: emailRef,
					password: passwordRef,
				};
				refs[firstErrorField]?.current?.focus();
			}
			return false;
		}
	};

	const signup = async (credentials: SignupCredentials) => {
		const apiUrl =
			process.env.NEXT_PUBLIC_API_BASE_URL;

		const response = await fetch(`${apiUrl}/api/auth/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
			credentials: 'include',
		});

		const data = await response.json();

		if (!response.ok) {
			throw new AuthError(data.message || 'Signup failed', response.status);
		}

		if (data.token) {
			const expires = new Date();
			expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
			document.cookie = `auth-token=${data.token
				}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
		}

		return data;
	};

	const getGoogleAuthUrl = () => {
		const apiUrl =
			process.env.NEXT_PUBLIC_API_BASE_URL;
		return `${apiUrl}/api/auth/google`;
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
			const response = await signup(data);

			setUser(response.user);

			toast({
				variant: 'success',
				title: 'Welcome aboard!',
				description: `Hi ${data.firstName}, your account has been created successfully!`,
			});

			onSuccess?.();
			router.push(redirectTo);
		} catch (error) {
			console.error('Signup error:', error);

			const errorMessage =
				error instanceof AuthError
					? error.message
					: 'Something went wrong. Please try again.';

			toast({
				variant: 'error',
				title: 'Signup Failed',
				description: errorMessage,
			});
		} finally {
			setLoading(false);
			setUserLoading(false);
		}
	};

	const handleGoogleSignup = () => {
		window.location.href = getGoogleAuthUrl();
	};

	const strengthConfig = getStrengthConfig(strengthScore);

	return (
		<div className='w-full max-w-md mx-auto'>
			<form
				onSubmit={handleSubmit}
				className='space-y-6'>
				{/* Name Fields */}
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<label
							htmlFor='firstName'
							className='block text-sm font-medium text-foreground mb-1'>
							First name
						</label>
						<input
							id='firstName'
							type='text'
							value={data.firstName}
							onChange={(e) =>
								setData((prev) => ({
									...prev,
									firstName: e.target.value.trim(),
								}))
							}
							className='w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
							placeholder='John'
							ref={firstNameRef}
							aria-invalid={!!formErrors.firstName}
							aria-describedby={
								formErrors.firstName ? 'firstName-error' : undefined
							}
						/>
						{formErrors.firstName && (
							<p
								id='firstName-error'
								className='mt-1 text-xs text-destructive'>
								{formErrors.firstName}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor='lastName'
							className='block text-sm font-medium text-foreground mb-1'>
							Last name
						</label>
						<input
							id='lastName'
							type='text'
							value={data.lastName}
							onChange={(e) =>
								setData((prev) => ({
									...prev,
									lastName: e.target.value.trim(),
								}))
							}
							className='w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
							placeholder='Doe'
							ref={lastNameRef}
							aria-invalid={!!formErrors.lastName}
							aria-describedby={
								formErrors.lastName ? 'lastName-error' : undefined
							}
						/>
						{formErrors.lastName && (
							<p
								id='lastName-error'
								className='mt-1 text-xs text-destructive'>
								{formErrors.lastName}
							</p>
						)}
					</div>
				</div>

				{/* Email Field */}
				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-foreground mb-1'>
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
						<p
							id='email-error'
							className='mt-1 text-xs text-destructive'>
							{formErrors.email}
						</p>
					)}
				</div>

				{/* Password Field */}
				<div>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-foreground mb-1'>
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
							aria-describedby={
								formErrors.password ? 'password-error' : 'password-strength'
							}
						/>
						<button
							type='button'
							className='absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground'
							onClick={() => setShowPassword((prev) => !prev)}
							aria-label={showPassword ? 'Hide password' : 'Show password'}>
							{showPassword ? (
								<EyeOff className='w-4 h-4' />
							) : (
								<Eye className='w-4 h-4' />
							)}
						</button>
					</div>

					{/* Password Strength Indicator */}
					{data.password.length > 0 && (
						<div className='mt-2'>
							<div className='flex items-center gap-2 mb-1'>
								<div className='flex-1 h-1 bg-muted rounded-full overflow-hidden'>
									<div
										className={`h-full transition-all duration-300 ${strengthConfig.color}`}
										style={{ width: `${strengthScore}%` }}
									/>
								</div>
								<span
									className={`text-xs font-medium ${strengthConfig.textColor}`}>
									{strengthConfig.label}
								</span>
							</div>
							<p className='text-xs text-muted-foreground'>
								Use 8+ characters with uppercase, lowercase, and numbers
							</p>
						</div>
					)}

					{formErrors.password && (
						<p
							id='password-error'
							className='mt-1 text-xs text-destructive'>
							{formErrors.password}
						</p>
					)}
				</div>

				{/* Submit Button */}
				<Button
					type='submit'
					className='w-full'
					disabled={loading}
					size='lg'>
					{loading ? (
						'Creating account...'
					) : (
						<>
							Get started for free
							<ArrowRight className='ml-2 h-4 w-4' />
						</>
					)}
				</Button>
			</form>

			{/* Divider */}
			<div className='mt-6 flex items-center'>
				<div className='flex-1 border-t border-border' />
				<span className='px-4 text-sm text-muted-foreground'>or</span>
				<div className='flex-1 border-t border-border' />
			</div>

			{/* Google Signup */}
			<Button
				type='button'
				variant='outline'
				className='w-full mt-4 bg-transparent'
				onClick={handleGoogleSignup}
				disabled={loading}
				size='lg'>
				<svg
					className='w-4 h-4 mr-2'
					viewBox='0 0 24 24'>
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

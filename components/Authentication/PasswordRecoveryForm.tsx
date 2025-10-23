/** @format */
'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export default function PasswordRecoveryForm() {
	const [email, setEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !newPassword || newPassword !== repeatPassword) {
			setError('Please fill in all fields correctly.');
			return;
		}

		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, newPassword, repeatPassword }),
			});
			if (!res.ok) {
				const err = await res.json();
				throw new Error(err.message || 'Something went wrong');
			}
			setSuccess(true);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-white px-4'>
			<div className='w-full max-w-md'>
				<h1 className='mb-12 text-center text-2xl font-medium text-gray-900'>
					Password recovery
				</h1>

				<form
					onSubmit={handleSubmit}
					className='space-y-8'>
					{/* Email */}
					<div>
						<label className='block mb-2 text-sm font-medium text-gray-700'>
							Email
						</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='E-mail address'
							className='w-full h-12 px-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition'
							required
						/>
					</div>

					{/* New Password */}
					<div>
						<label className='block mb-2 text-sm font-medium text-gray-700'>
							New password
						</label>
						<input
							type='password'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							placeholder='New password'
							className='w-full h-12 px-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition'
							required
						/>
					</div>

					{/* Repeat Password */}
					<div>
						<label className='block mb-2 text-sm font-medium text-gray-700'>
							Repeat password
						</label>
						<input
							type='password'
							value={repeatPassword}
							onChange={(e) => setRepeatPassword(e.target.value)}
							placeholder='Repeat password'
							className='w-full h-12 px-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition'
							required
						/>
					</div>

					{/* Submit */}
					<Button
						type='submit'
						className='w-full h-12 bg-black text-white text-sm font-medium'
						disabled={loading}>
						{loading ? 'Sending...' : 'Continue'}
					</Button>
				</form>

				{/* Feedback */}
				{error && (
					<p className='mt-6 text-center text-red-500 text-xs'>{error}</p>
				)}
				{success && (
					<p className='mt-6 text-center text-gray-600 text-xs'>
						We’ve sent a confirmation link. Check your email.
					</p>
				)}
			</div>
		</div>
	);
}

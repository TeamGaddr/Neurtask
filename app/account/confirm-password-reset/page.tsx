'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';


function PasswordResetConfirmContent() {
	const router = useRouter();
	const params = useSearchParams();
	const [status, setStatus] = useState('Confirming password reset...');
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const token = params.get('token') ?? null;

		if (!token) {
			setError('No reset token provided');
			return;
		}

		const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
		console.log(
			'Calling backend confirm:',
			`${API_BASE}/api/auth/confirm-password-reset?token=${token}`
		);

		fetch(`${API_BASE}/api/auth/confirm-password-reset?token=${token}`, {
			method: 'GET',
			credentials: 'include',
		})
			.then(async (res) => {
				const data = await res.json();
				if (res.ok && data.token) {
					localStorage.setItem('token', data.token);
					setStatus('Password reset successful! Redirecting...');
					setTimeout(() => router.push('/dashboard'), 2000);
				} else {
					throw new Error(data.message || 'Invalid reset link');
				}
			})
			.catch((err: Error) => {
				console.error(err);
				setError(err.message || 'An error occurred during confirmation');
			});
	}, [params, router]);

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
			<div className='bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center'>
				<h2 className='text-md font-normal text-gray-800 mb-4'>
					{error ? 'Oops!' : status}
				</h2>
				{error && <p className='text-red-500 text-sm'>{error}</p>}
			</div>
		</div>
	);
}


export default function PasswordResetConfirm() {
	return (
		<Suspense
			fallback={
				<div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
					<div className='bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center'>
						<h2 className='text-md font-normal text-gray-800 mb-4'>
							Loading...
						</h2>
					</div>
				</div>
			}
		>
			<PasswordResetConfirmContent />
		</Suspense>
	);
}
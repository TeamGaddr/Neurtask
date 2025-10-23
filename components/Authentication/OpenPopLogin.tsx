/** @format */

'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';



export default function GoogleSignInButton() {
	const router = useRouter();
	const base = process.env.NEXT_PUBLIC_API_BASE_URL || '';

	useEffect(() => {
		const onMessage = async (e: MessageEvent) => {
			if (e.origin !== window.location.origin) return;

			const { token } = e.data ?? {};
			if (!token) return;

			localStorage.setItem('token', token);

			try {
				const resp = await fetch(`${base}/me`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (resp.ok) {
					const user = await resp.json();
					localStorage.setItem('user', JSON.stringify(user));
				}
			} catch (err) {
				console.log(err)
			}

			router.push('/account/onboarding');
		};

		window.addEventListener('message', onMessage);
		return () => window.removeEventListener('message', onMessage);
	}, [base, router]);

	const openPopup = () => {
		const width = 600;
		const height = 700;
		const left = window.screenX + (window.innerWidth - width) / 2;
		const top = window.screenY + (window.innerHeight - height) / 2;

		const popup = window.open(
			`${base}/api/auth/google`,
			'google_oauth',
			`width=${width},height=${height},left=${left},top=${top}`
		);

		if (!popup) {
			alert('Please allow popups for this site');
			return;
		}
	};

	return (
		<button
			onClick={openPopup}
			className='w-full inline-flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium'>
			Sign in with Google
		</button>
	);
}

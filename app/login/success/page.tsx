'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface GoogleAuthMessage {
	type: 'google-auth';
	success: boolean;
	token?: string;
	email?: string;
}

function LoginSuccessHandler() {
	const searchParams = useSearchParams();


export default function LoginSuccessPage() {
	useEffect(() => {
		const params =
			typeof window !== 'undefined'
				? new URLSearchParams(window.location.search)
				: null;
		const token = params?.get('token');
		const email = params?.get('email');

	
		try {
		if (token) localStorage.setItem('token', token);
		} catch (err) {
		console.error(err);
		}

		if (token) {
		try {
			const expires = new Date();
			expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
			document.cookie = `auth-token=${encodeURIComponent(
			token
			)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
		} catch (err) {
			console.error(err);
		}
		}

		try {
		const payload: GoogleAuthMessage = { type: 'google-auth', success: true };
		if (token) payload.token = token;
		if (email) payload.email = email;

		if (window.opener && !window.opener.closed) {
			window.opener.postMessage(payload, '*');
		}
		} catch (err) {
		console.error(err);
		}

		setTimeout(() => {
		try {
			window.close();
		} catch (err) {
			console.error(err);
		}

		}, 250);
	}, []); // run once on client

	return (
		<div style={{ padding: 20, fontFamily: 'system-ui' }}>
		<h2>Signed in</h2>
		<p>You can close this window — signing in was successful.</p>
		</div>
	);
}

export default function LoginSuccessPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
		<LoginSuccessHandler />
		</Suspense>
	);
}

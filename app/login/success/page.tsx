/** @format */

'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function LoginSuccessPage() {
	const searchParams = useSearchParams();

	useEffect(() => {
		const token = searchParams.get('token');
		const email = searchParams.get('email');

		// Save to localStorage (so NoteTaker / other components can read)
		try {
			if (token) localStorage.setItem('token', token);
		} catch (err) {
			// ignore
		}

		// Also set auth cookie for polling fallback
		if (token) {
			try {
				const expires = new Date();
				expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // 30d
				document.cookie = `auth-token=${encodeURIComponent(
					token
				)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
			} catch (err) {}
		}

		// Notify opener (popup flow)
		try {
			const payload: any = { type: 'google-auth', success: true };
			if (token) payload.token = token;
			if (email) payload.email = email;
			if (window.opener && !window.opener.closed) {
				window.opener.postMessage(payload, '*');
			}
		} catch (err) {
			// ignore
		}

		// close popup after short delay to ensure message sent
		setTimeout(() => {
			try {
				window.close();
			} catch (err) {}
		}, 250);
	}, [searchParams]);

	return (
		<div style={{ padding: 20, fontFamily: 'system-ui' }}>
			<h2>Signed in</h2>
			<p>You can close this window — signing in was successful.</p>
		</div>
	);
}

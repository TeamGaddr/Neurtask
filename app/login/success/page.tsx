/** @format */

// /** @format */

// 'use client';

// import { useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';

// export default function LoginSuccessPage() {
// 	const searchParams = useSearchParams();

// 	useEffect(() => {
// 		const token = searchParams.get('token');
// 		const email = searchParams.get('email');

// 		// Save to localStorage (so NoteTaker / other components can read)
// 		try {
// 			if (token) localStorage.setItem('token', token);
// 		} catch (err) {
// 			console.log(err);
// 		}

// 		// Also set auth cookie for polling fallback
// 		if (token) {
// 			try {
// 				const expires = new Date();
// 				expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // 30d
// 				document.cookie = `auth-token=${encodeURIComponent(
// 					token
// 				)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 		}

// 		// Notify opener (popup flow)
// 		try {
// 			// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 			const payload: any = { type: 'google-auth', success: true };
// 			if (token) payload.token = token;
// 			if (email) payload.email = email;
// 			if (window.opener && !window.opener.closed) {
// 				window.opener.postMessage(payload, '*');
// 			}
// 		} catch (err) {
// 			console.log(err);
// 		}

// 		// close popup after short delay to ensure message sent
// 		setTimeout(() => {
// 			try {
// 				window.close();
// 			} catch (err) {
// 				console.log(err);
// 			}
// 		}, 250);
// 	}, [searchParams]);

// 	return (
// 		<div style={{ padding: 20, fontFamily: 'system-ui' }}>
// 			<h2>Signed in</h2>
// 			<p>You can close this window — signing in was successful.</p>
// 		</div>
// 	);
// }

'use client';

import { toast } from '@/hooks/use-toast';
import { useEffect } from 'react';

interface GoogleAuthPayload {
	type: 'google-auth';
	success: true;
	token?: string;
	email?: string;
}

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
		} catch (e) {
			toast({
				title: 'Unable to authenticate user.',
				description: String(e),
				variant: 'error',
			});
		}
		if (token) {
			const expires = new Date();
			expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
			document.cookie = `auth-token=${encodeURIComponent(token)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
		}

		try {
			const payload: GoogleAuthPayload = { type: 'google-auth', success: true };
			if (token) payload.token = token;
			if (email) payload.email = email;
			if (window.opener && !window.opener.closed)
				window.opener.postMessage(payload, '*');
		} catch (e) {
			toast({
				title: 'Unable to authenticate user.',
				description: String(e),
				variant: 'error',
			});
		}

		setTimeout(() => {
			window.close();
		}, 250);
	}, []); // run once on client

	return (
		<div style={{ padding: 20, fontFamily: 'system-ui' }}>
			<h2>Signed in</h2>
			<p>You can close this window — signing in was successful.</p>
		</div>
	);
}

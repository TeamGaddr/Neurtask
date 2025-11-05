'use client';

import { Suspense, useEffect } from 'react';

function OAuthHandler() {
 

	useEffect(() => {
		const token = new URLSearchParams(window.location.search).get('token');
		if (token && window.opener) {
		window.opener.postMessage({ token }, window.location.origin);
		setTimeout(() => window.close(), 400);
		} else {
		setTimeout(() => window.close(), 800);
		}
	}, []);

	return (
		<div className='min-h-screen flex items-center justify-center'>
		Completing sign in…
		</div>
	);
}

export default function OAuthCallbackPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
		<OAuthHandler />
		</Suspense>
	);
}

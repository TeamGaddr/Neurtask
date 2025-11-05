'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function OAuthHandler() {
  	const params = useSearchParams();

	useEffect(() => {
		const token = params.get('token');
		if (token && window.opener) {
		window.opener.postMessage({ token }, window.location.origin);
		setTimeout(() => window.close(), 400);
		} else {
		setTimeout(() => window.close(), 800);
		}
	}, [params]);

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

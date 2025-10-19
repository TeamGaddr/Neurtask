/** @format */

'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function OAuthCallbackPage() {
	const params = useSearchParams();

	useEffect(() => {
		const token = params.get('token');
		if (token && window.opener) {
			// Post the token to the opener window (the page that opened the popup)
			// Use window.location.origin as the targetOrigin so the opener can validate.
			window.opener.postMessage({ token }, window.location.origin);
			// Close the popup after a short delay
			setTimeout(() => window.close(), 400);
		} else {
			// If no token, close or show an error UI
			setTimeout(() => window.close(), 800);
		}
	}, [params]);

	return (
		<div className='min-h-screen flex items-center justify-center'>
			Completing sign in…
		</div>
	);
}

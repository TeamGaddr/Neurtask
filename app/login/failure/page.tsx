/** @format */

'use client';

import { useEffect } from 'react';

export default function LoginFailurePage() {
	useEffect(() => {
		try {
			if (window.opener && !window.opener.closed) {
				window.opener.postMessage(
					{
						type: 'google-auth',
						success: false,
						message: 'Authentication failed',
					},
					'*'
				);
			}
		} catch (err) {}
		setTimeout(() => {
			try {
				window.close();
			} catch (err) {}
		}, 250);
	}, []);

	return (
		<div style={{ padding: 20, fontFamily: 'system-ui' }}>
			<h2>Sign in failed</h2>
			<p>Close this window and try again.</p>
		</div>
	);
}


import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
	try {
		const { email, country = null, region = null } = await request.json();

		if (!email || typeof email !== 'string' || !email.includes('@')) {
			return NextResponse.json(
				{ error: 'Invalid email address' },
				{ status: 400 }
			);
		}

		const { error: adminError } = await resend.emails.send({
		// const { data: adminData, error: adminError } = await resend.emails.send({
			from: 'Early Access <onboarding@resend.dev>',
			to: 'team@gaddr.com', 
			subject: `🎉 New Early Access Subscriber: ${email}`,
			html: `
				<!DOCTYPE html>
				<html>
					<head>
						<style>
							body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
							.container { max-width: 600px; margin: 0 auto; padding: 20px; }
							.header { background-color: #4C0EC9; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
							.content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
							.field { margin-bottom: 10px; }
							.label { font-weight: bold; color: #555; }
							.value { color: #333; }
						</style>
					</head>
					<body>
						<div class="container">
							<div class="header">
								<h2>🎉 New Early Access Subscriber!</h2>
							</div>
							<div class="content">
								<div class="field">
									<span class="label">Email:</span>
									<span class="value">${email}</span>
								</div>
								${country ? `<div class="field">
									<span class="label">Country:</span>
									<span class="value">${country}</span>
								</div>` : ''}
								${region ? `<div class="field">
									<span class="label">Region:</span>
									<span class="value">${region}</span>
								</div>` : ''}
								<div class="field">
									<span class="label">Subscribed at:</span>
									<span class="value">${new Date().toLocaleString()}</span>
								</div>
							</div>
						</div>
					</body>
				</html>
			`,
		});

		if (adminError) {
			console.error('Failed to send admin notification:', adminError);
		}

		// Send welcome email to subscriber
		const { error: welcomeError } = await resend.emails.send({
		// const { data: welcomeData, error: welcomeError } = await resend.emails.send({
			from: 'Neurtask <onboarding@resend.dev>',
			to: email,
			subject: 'Welcome to Neurtask Early Access! 🚀',
			html: `
				<!DOCTYPE html>
				<html>
					<head>
						<style>
							body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
							.container { max-width: 600px; margin: 0 auto; padding: 20px; }
							.header { background-color: #292929; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
							.content { background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px; }
							.footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
						</style>
					</head>
					<body>
						<div class="container">
							<div class="header">
								<h1>Welcome to Neurtask! 🎉</h1>
							</div>
							<div class="content">
								<h2>Thanks for joining our early access list!</h2>
								<p>We're excited to have you on board. You'll be among the first to know when we launch.</p>
								<p>Here's what you can expect:</p>
								<ul>
									<li>✨ Early access to new features</li>
									<li>🎁 Exclusive launch offers</li>
									<li>📧 Updates on our progress</li>
								</ul>
								<p>Stay tuned!</p>
								<p>Best regards,<br>The Neurtask Team</p>
							</div>
							<div class="footer">
								<p>You're receiving this because you signed up for early access at Neurtask.</p>
							</div>
						</div>
					</body>
				</html>
			`,
		});

		if (welcomeError) {
			console.error('Failed to send welcome email:', welcomeError);
		}

		return NextResponse.json(
			{ success: true, email },
			{ status: 200 }
		);
	} catch (err) {
		console.error('Subscribe route error:', err);
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
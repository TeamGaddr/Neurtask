import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
	try {
		const { name, email, message } = await request.json();

		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: 'All fields (name, email, message) are required.' },
				{ status: 400 }
			);
		}

		// Send email using Resend
		const { data, error } = await resend.emails.send({
			from: 'Contact Form <onboarding@resend.dev>',
			to: 'team@gaddr.com', 
			replyTo: email, 
			subject: `New Contact Form Message from ${name}`,
			html: `
				<!DOCTYPE html>
				<html>
					<head>
						<style>
							body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
							.container { max-width: 600px; margin: 0 auto; padding: 20px; }
							.header { background-color: #292929; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
							.content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
							.field { margin-bottom: 15px; }
							.label { font-weight: bold; color: #555; }
							.value { margin-top: 5px; padding: 10px; background-color: white; border-radius: 4px; }
						</style>
					</head>
					<body>
						<div class="container">
							<div class="header">
								<h2>New Contact Form Submission</h2>
							</div>
							<div class="content">
								<div class="field">
									<div class="label">Name:</div>
									<div class="value">${name}</div>
								</div>
								<div class="field">
									<div class="label">Email:</div>
									<div class="value">${email}</div>
								</div>
								<div class="field">
									<div class="label">Message:</div>
									<div class="value">${message.replace(/\n/g, '<br>')}</div>
								</div>
							</div>
						</div>
					</body>
				</html>
			`,
		});

		if (error) {
			console.error('Resend error:', error);
			return NextResponse.json(
				{ error: 'Failed to send message.' },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ success: true, messageId: data?.id },
			{ status: 200 }
		);
	} catch (err) {
		console.error('Contact route error:', err);
		return NextResponse.json(
			{ error: 'Unexpected server error.' },
			{ status: 500 }
		);
	}
}
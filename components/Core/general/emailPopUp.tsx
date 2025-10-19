/** @format */

'use client';

import { toast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';


interface EmailPopupProps {
	isVisible: boolean;
	onSubmit?: (email: string) => void;
	variant?: 'default' | 'alt' | 'purple' | 'footer';
}

const EmailPopup: React.FC<EmailPopupProps> = ({
	isVisible,
	onSubmit,
	variant = 'default'
}) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setSuccess(false);

		let country = null,
			region = null;
		try {
			const geoRes = await fetch(
				'https://ipapi.co/json?fields=country_name,region'
			);
			if (geoRes.ok) {
				const geo = await geoRes.json();
				country = geo.country_name || null;
				region = geo.region || null;
			}
		} catch (err) {
			console.warn('Client-side geo lookup failed:', err);
		}

		try {
			const res = await fetch('/api/subscribe', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, country, region }),
			});
			const payload = await res.json().catch(() => null);
			if (!res.ok) {
				const msg = payload?.error || `Request failed (${res.status})`;
				throw new Error(msg);
			}
			if (payload?.error) {
				if (payload.error === 'Email already registered') {
					toast({
						variant: 'error',
						title: 'Already Subscribed',
						description: 'You are already on the early access list.',
					});
					setLoading(false);
					return;
				}
				throw new Error(payload.error);
			}
			setSuccess(true);
			setEmail('');
			toast({
				variant: 'success',
				title: 'Subscribed',
				description: 'You are on the early access list.',
			});
			onSubmit?.(email);

			setTimeout(() => {
				setSuccess(false);
				setLoading(false);
			}, 1500);
		} catch (err: unknown) {
			console.error(err);
			const errorMessage =
				err instanceof Error ? err.message : 'Subscription failed.';
			toast({
				variant: 'error',
				title: 'Error',
				description: errorMessage,
			});
			setLoading(false);
		}
	};

		const getFormClasses = () => {
		const base = "flex gap-4 flex-nowrap";
		switch (variant) {
			case 'alt':
				return `${base} flex-col max-w-full w-full items-center`;
			case 'footer':
				return `${base} flex-row max-w-full w-full items-center`;
			default:
				return `${base} flex-col max-w-full w-1/2 sm:w-full`;
		}
	};

	const getInputContainerClasses = () => {
		const base = "flex-1 relative";
		switch (variant) {
			case 'footer':
				return `${base} max-w-fit w-[500px] sm:w-full sm:max-w-[220px]`;
			default:
				return `${base} max-w-[315px] w-[500px] sm:w-full sm:max-w-[350px] md:max-w-[300px]`;
		}
	};

	const getInputClasses = () => {
		const base = "border border-[#989898] rounded-lg outline-none transition-all bg-[#FBFAF9] focus:border-[#a0a0a0] placeholder:text-[#7C7C7C] placeholder:font-normal";
		switch (variant) {
			case 'footer':
				return `${base} w-[270px] sm:w-full p-[0.7rem] text-[0.7rem] sm:text-sm md:text-[0.95rem]`;
			default:
				return `${base} w-[303px] sm:w-full p-4 sm:p-[0.7rem] md:p-4 text-[7px] sm:text-sm md:text-[0.95rem]`;
		}
	};

	const getButtonClasses = () => {
		const base = "inline-flex items-center justify-center gap-2 sm:gap-[13px] rounded-lg transition-colors whitespace-nowrap flex-shrink-0 font-medium";
		switch (variant) {
			case 'purple':
				return `${base} w-full max-w-[200px] sm:max-w-[220px] bg-[#4C0EC9] text-white hover:bg-[#481f8e] px-4 py-4 sm:px-2 sm:py-2 md:px-4 md:py-4 text-[0.7rem] sm:text-[0.7rem] md:text-[0.85rem]`;
			case 'alt':
				return `${base} w-[250px] sm:w-full sm:max-w-[220px] md:max-w-[250px] bg-[#292929] text-white hover:bg-[#1f1f1f] px-6 py-4 sm:px-2 sm:py-2 md:px-6 md:py-4 text-[0.7rem] sm:text-[0.7rem] md:text-[0.95rem]`;
			case 'footer':
				return `${base} w-[180px] sm:w-full sm:max-w-[100px] md:max-w-[180px] bg-[#292929] text-white hover:bg-[#1f1f1f] px-4 py-[0.8rem] sm:px-2 sm:py-2 md:px-4 md:py-[0.8rem] text-[0.7rem] sm:text-xs md:text-[0.84rem]`;
			default:
				return `${base} w-full max-w-[200px] sm:max-w-[350px] md:max-w-[200px] bg-[#292929] text-white hover:bg-[#1f1f1f] px-4 py-[1.2rem] sm:px-4 sm:py-3 md:px-4 md:py-[1.2rem] text-[7px] sm:text-sm md:text-[0.85rem] tracking-wider`;
		}
	};

return (
		<div>
			<AnimatePresence>
				{isVisible && (
					<motion.div
						key='popup'
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className='mt-2'>
						<form
							onSubmit={handleSubmit}
							className={getFormClasses()}>
							<div className={getInputContainerClasses()}>
								<input
									type='email'
									placeholder='Enter your email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									disabled={loading || success}
									className={getInputClasses()}
								/>
							</div>

							<button
								type='submit'
								className={getButtonClasses()}
								disabled={loading || success}>
								{loading ? (
									<Loader2 className='animate-spin' size={20} />
								) : success ? (
									<CheckCircle size={20} className='text-green-500' />
								) : (
									<>
										Get Early Access
										<Image
											src='/Arrow.png'
											alt='→'
											width={20}
											height={20}
											className="inline-block"
										/>
									</>
								)}
							</button>
						</form>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default EmailPopup;

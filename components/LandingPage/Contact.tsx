/** @format */

'use client';

import { toast } from '@/hooks/use-toast';
import { motion, useAnimation } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type FormData = { name: string; email: string; message: string };

const Contact: React.FC = () => {
	const controls = useAnimation();
	const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		message: '',
	});
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (inView) controls.start('visible');
	}, [controls, inView]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.2, delayChildren: 0.3 },
		},
	};
	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.5, ease: 'easeOut' },
		},
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setSuccess(false);

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});
			const json = await res.json();
			if (!res.ok) throw new Error(json.error || res.statusText);

			setSuccess(true);
			toast({
				variant: 'success',
				title: 'Message sent',
				description: 'We will get back to you soon.',
			});
			setFormData({ name: '', email: '', message: '' });

			setTimeout(() => {
				setSuccess(false);
				setSubmitting(false);
			}, 1500);
		} catch (err: unknown) {
			console.error(err);
			let message = 'Please try again.';
			if (err instanceof Error) message = err.message;
			toast({ variant: 'error', title: 'Error', description: message });
			setSubmitting(false);
		}
	};

	return (
		<section
			id='contact'
			className='pt-10 pb-[10rem] bg-white'>
			<div className='container mx-auto px-4 sm:px-6'>
				<motion.div
					ref={ref}
					initial='hidden'
					animate={controls}
					variants={containerVariants}
					className='md:max-w-sm max-w-3xl mx-auto'>
					<motion.h2
						variants={itemVariants}
						className='text-3xl md:text-4xl font-medium text-[#292929] mb-10 text-center'>
						Contact
					</motion.h2>

					<motion.form
						variants={itemVariants}
						className='space-y-2'
						onSubmit={handleSubmit}>
						<div className='mb-4'>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-[#292929] mb-3'>
								Name
							</label>
							<input
								type='text'
								id='name'
								name='name'
								value={formData.name}
								onChange={handleChange}
								placeholder='Your name'
								className='w-full px-4 py-2 text-sm font-light rounded-xl border border-gray-300 bg-[#FBFAF9] text-[#292929] focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#BDBDBD] mb-2'
								required
								disabled={submitting || success}
							/>
						</div>
						<div className='mb-4'>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-[#292929] mb-3'>
								E-mail
							</label>
							<input
								type='email'
								id='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								placeholder='Your e-mail'
								className='w-full px-4 py-2 text-sm font-light rounded-xl border border-gray-300 bg-[#FBFAF9] text-[#292929] focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#BDBDBD] mb-3'
								required
								disabled={submitting || success}
							/>
						</div>
						<div className='mb-4'>
							<label
								htmlFor='message'
								className='block text-sm font-medium text-[#292929] mb-3'>
								Message
							</label>
							<textarea
								id='message'
								name='message'
								value={formData.message}
								onChange={handleChange}
								placeholder='Your message'
								rows={6}
								// className='w-full px-4 py-2 text-sm font-light rounded-xl border bg-[background: var(--colors-surface-card-secondary, #FBFAF9);] border-[border: 0.5px solid var(--colors-border-secondary, #989898)] focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#BDBDBD]'
								className='w-full px-4 py-2 text-sm font-light rounded-xl border border-gray-300 bg-[#FBFAF9] text-[#292929] focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#BDBDBD] mb-10'
								required
								disabled={submitting || success}
							/>
						</div>

						<div className='flex justify-center mt-10 sendcnt'>
							<motion.button
								type='submit'
								disabled={submitting}
								className='bg-[#292929] tracking-wider text-white px-10 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center'>
								{submitting ? (
									<Loader2
										className='animate-spin'
										size={20}
									/>
								) : success ? (
									<Check
										className='text-white'
										size={20}
									/>
								) : (
									'Send'
								)}
							</motion.button>
						</div>
					</motion.form>
				</motion.div>
			</div>
		</section>
	);
};

export default Contact;

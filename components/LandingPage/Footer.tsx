/** @format */

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import EmailPopup from '../Core/general/emailPopUp';

const footerLinks = [
	{ name: 'Home', href: '#' },
	{ name: 'Features', href: '#features' },
	{ name: 'How it works', href: '#how-it-works' },
	{ name: 'About', href: '#about' },
	{ name: 'Contact', href: '#contact' },
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.3 },
	},
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Footer() {
	const handleEmailSubmit = (finalEmail: string) => {
		console.log('Email registered from inline form:', finalEmail);
	};

	return (
		// <footer className='bg-[var(--primary-100,#F1EFE9)]  lg:px-20  px-7 md:px-10 pt-12 pb-12'>
		<footer className='bg-[var(--primary-100,#F1EFE9)] -mt-6 lg:px-20 px-7 md:px-10 pt-12 pb-12'>

			<motion.div
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.1 }}
				variants={containerVariants}
				className='mx-auto flex flex-col lg:flex-row justify-between items-start mb-8'>
				<motion.div
					variants={itemVariants}
					className='flex flex-col items-start gap-6  space-y-4'>
					<Link
						href='/'
						className='flex items-center gap-2'>
						<Image
							src='/siteLogo.svg'
							alt='Neurtask Logo'
							width={180}
							height={60}
							className="display-block"
						/>
					</Link>

					<nav className='flex flex-wrap gap-8 '>
						{footerLinks.map((link, i) => (
							<Link
								key={i}
								href={link.href}
								className='text-[#292929] font-semibold hover:text-gray-900 transition-colors text-sm '>
								{link.name}
							</Link>
						))}
					</nav>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className='max-md:mt-0 lg:mt-0 mt-8 max-sm:mt-10 sm:mt-10  space-y-2'>
					<h3 className='text-[#292929] font-semibold tracking-wide mb-4 text-md sm:text-sm'>
						Be Among the First to Experience It
					</h3>
					<div className={`flex items-center`}>
						<EmailPopup
							isVisible={true}
							onSubmit={handleEmailSubmit}
							variant="footer"
						/>
					</div>
				</motion.div>
			</motion.div>

			<div className='border-t-[0.8px] border-[#B0B0B0]' />
			<motion.div
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.1 }}
				variants={containerVariants}
				className='mx-auto flex flex-col md:flex-row justify-between items-center pt-8'>
				<motion.p
					variants={itemVariants}
					className='text-sm text-[#292929] mb-4 md:mb-0'>
					© 2025 Neurtask
				</motion.p>
				<motion.div
					variants={itemVariants}
					className='flex items-center gap-6'>
					<Link
						href='#'
						className='text-sm underline text-[#292929] hover:text-gray-700 transition-colors'>
						Privacy policy
					</Link>
					<Link
						href='#'
						className='text-sm underline text-[#292929] hover:text-gray-700 transition-colors'>
						Terms of service
					</Link>
					<Link
						href='#'
						className='text-sm underline text-[#292929] hover:text-gray-700 transition-colors'>
						Cookies settings
					</Link>
				</motion.div>
			</motion.div>
		</footer>
	);
}

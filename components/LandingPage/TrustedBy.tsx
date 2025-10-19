/** @format */

'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const TrustedBy = () => {
	const controls = useAnimation();
	const [ref, inView] = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
	}, [controls, inView]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.5,
				ease: 'easeOut',
			},
		},
	};

	const logos = [
		{ name: 'Gaddr', src: '/gaddr-trustedBy.svg' },
		{ name: 'Calendar', src: '/gcalendar-trustedBy.svg' },
		{ name: 'Gmail', src: '/gmail-trustedBy.svg' },
		{ name: 'Outlook', src: '/outlookmain-trustedBy.svg' },
		{ name: 'Outlook Calendar', src: '/outlook-trustedBy.svg' },
	];

	return (
		<section className='py-20 bg-white trust'>
			<div className='container mx-auto px-4 md:px-6'>
				<motion.div
					ref={ref}
					initial='hidden'
					animate={controls}
					variants={containerVariants}
					className='text-center'>
					<motion.h2
						variants={itemVariants}
						className='text-3xl md:text-4xl font-medium text-[#292929] mb-16 text-center'>
						Trusted by
					</motion.h2>
					<motion.div
						variants={containerVariants}
						className='flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-[8.1rem]'>
						{logos.map((logo, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								className='grayscale opacity-60 hover:opacity-100 transition-all duration-300'>
								<Image
									src={logo.src || '/placeholder.svg'}
									alt={logo.name}
									width={120}
									height={40}
									className='w-[80px] h-auto sm:w-[120px]'
								/>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default TrustedBy;

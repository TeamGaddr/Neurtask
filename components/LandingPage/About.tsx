/** @format */

'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import EmailPopup from '../Core/general/emailPopUp';

const Dashboard: React.FC = () => (
	<div className='relative max-w-[73rem] mx-auto bg-white overflow-hidden mb-5'>
		<Image
			src='/dashboardAbout.svg'
			alt='Dashboard'
			className='w-full'
			width={1200}
			height={200}
		/>
		<div className='absolute bottom-0 left-0 w-full h-96 bg-gradient-to-b from-transparent to-white' />
	</div>
);

const About: React.FC = () => {
	const controls = useAnimation();
	const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

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

	const handleEmailSubmit = (email: string) => {
		console.log('User email (About):', email);
	};

	return (
		<section
			id='about'
			className='py-20 bg-white'>
			<div className='container mx-auto px-4 sm:px-6 lg:max-w-[73rem]'>
				<div className='relative'>
					<Dashboard />
					<div className='absolute bottom-0 left-0 w-full h-[50rem] bg-gradient-to-b from-transparent to-white md:flex hidden' />

					<motion.div
						ref={ref}
						initial='hidden'
						animate={controls}
						variants={containerVariants}
						className='absolute inset-0 flex flex-col items-center justify-end mb-10 text-center text-black z-10 makeAbout'>
						<h6
							// variants={itemVariants}
							className='text-[45px] text-[#292929] font-medium mb-6'>
							About Neurtask
						</h6>
						<motion.p
							variants={itemVariants}
							 className='text-lg lg:text-xl mb-10 text-[#292929] leading-relaxed font-medium'>
							{/* className='text-[28px] font-medium text-[#292929] leading-[50px] text-center mb-10'>	 */}
							Experience a new level of simplicity with AI that enhances the way
							<br className='lg:flex hidden' /> you work, create, and live.
						</motion.p>

						{/* Inline email popup (always visible) */}
						<motion.div
							variants={itemVariants}
							className='flex justify-center w-full '>
							<EmailPopup
								isVisible={true}
								onSubmit={handleEmailSubmit}
								variant="purple"
							/>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default About;

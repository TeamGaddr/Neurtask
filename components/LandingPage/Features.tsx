/** @format */
'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import EmailPopup from '../Core/general/emailPopUp';

const features = [
	{
		icon: '/meetingFeature.svg',
		title: 'Schedule meetings',
		description: 'AI agent set meetings in seconds',
		category: 'Calendar',
		available: true,
	},
	{
		icon: '/textFeature.svg',
		title: 'Text',
		description: 'AI-powered text generation\nfor content creation',
		category: 'Content',
		available: false,
		
	},
	{
		icon: '/callsFeature.svg',
		title: 'Join calls',
		description: 'AI agent joins your calls for you',
		category: 'Calling',
		available: true,
	},
	{
		icon: '/imageFeature.svg',
		title: 'Image',
		description: 'Generate stunning visuals with AI agent',
		category: 'Visual',
		available: false,
		
	},
	{
		icon: '/notesFeature.svg',
		title: 'Notes',
		description: 'Get instant summaries and notes',
		category: 'Notes',
		available: true,
	},
	{
		icon: '/mediaFeature.svg',
		title: 'Audio & video',
		description: 'Powerful tools for media production',
		category: 'Media',
		available: false,
	},
];

const Features: React.FC = () => {
	const controls = useAnimation();
	const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

	useEffect(() => {
		if (inView) controls.start('visible');
	}, [controls, inView]);

	const handleEmailSubmit = (email: string) => {
		console.log('Email submitted:', email);
	};

	return (
		<section
			id='features'
			className='py-16 max-sm:px-10 bg-white'>
			<div className='container mx-auto max-md:px-[6px] max-md:py-4 px-6 lg:max-w-[73rem]'>
				{/* Header */}
				<motion.div
					ref={ref}
					initial='hidden'
					animate={controls}
					className='text-center mb-5'>
					<motion.h6
						className='text-3xl md:text-4xl my-8 font-medium text-[#292929] mb-9'>
						Features
					</motion.h6>

					<div className='mt-6 flex md:flex-row lg:flex-row flex-row justify-start items-start relative mb-3  mx-auto featurescolumn'>
						<div className='flex items-center rounded-full lg:px-[.42rem] md:px-4 py-[.40rem] bg-[#EAE6FF] features-section'>
							<div className='w-5 h-5 rounded-full flex items-center justify-center mr-1 '>
								<Image
									src='/purpleCheck.svg'
									alt='available'
									width={15}
									height={15}
								/>
							</div>
							<span className='md:text-xs mr-1  text-sm text-[#6019F0]'>
								Available now
							</span>
						</div>
						<div className='flex items-center rounded-full px-[.42rem] py-[.40rem] sm:ml-[15rem] lg:ml-[28rem] bg-[#EDEDED] mx-auto featuresavailable'>
							<div className='w-5 h-5 rounded-full  flex items-center justify-left mr-1'>
								<Image
									src='/watch.svg'
									alt='coming soon'
									width={15}
									height={15}
								/>
							</div>
							<span className='md:text-xs mr-1 text-sm text-[#292929]'>
								Coming soon
							</span>
						</div>
					</div>
				</motion.div>

				<motion.div
					ref={ref}
					initial='hidden'
					animate={controls}
					className='grid grid-cols-1 sm:grid-cols-2 items-center gap-4'>
					{features.map((feature, idx) => (
						<motion.div
							key={idx}
							className={`
                p-4 sm:p-5 rounded-lg flex items-start gap-4 transition-all duration-300
                ${
									feature.available
										? 'border-[0.2px] border-[#7848FF]'
										: 'custom-dashed-border'
								}
              `}>
							<div className='w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden flex-shrink-0'>
								<Image
									src={feature.icon}
									alt={feature.title}
									width={80}
									height={80}
									className='object-cover'
								/>
							</div>
							<div>
								<h2 className='text-lg sm:text-xl font-semibold text-[#292929] mb-1 sm:mb-2'>
									{feature.title}
								</h2>
								<h6 className='text-xs sm:text-sm font-medium md:text-base text-[#292929]'>
									{feature.description}
								</h6>
							</div>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					className='mt-8 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center max-w-[95%] gap-4'>
					<EmailPopup
							isVisible={true}
							onSubmit={handleEmailSubmit}
							variant="purple"
					/>
				</motion.div>
			</div>
		</section>
	);
};

export default Features;

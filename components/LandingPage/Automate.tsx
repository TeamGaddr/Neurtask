/** @format */

'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Automate = () => {
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

	

	return (
		<section className='py-16 bg-white'>
			<div className='container mx-auto px-4 md:px-6'>
				<motion.div
					ref={ref}
					initial='hidden'
					animate={controls}
					className='max-w-3xl mx-auto'>
					<motion.h6
						className='text-[35px] font-[500] text-gray-900 mb-16 text-center'>
						What would you like to automate?
					</motion.h6>

					<motion.div
						className='relative max-w-[42rem] mx-auto'>
						<input
							type='text'
							placeholder='Ex. Make a call of all my meetings of last week...'
							className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600'
						/>
						<button className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 p-2 rounded-full'>
							<Image
								src={'/sendBlack.png'}
								alt={'send button'}
								width={20}
								height={20}
								className='object-cover'
							/>
						</button>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default Automate;

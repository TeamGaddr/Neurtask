/** @format */

'use client';

import Image from 'next/image';
import React from 'react';

const steps = [
	{
		src: '/Create-HowItWorks.png',
		alt: 'Create',
		title: 'Create',
		subtitle: 'Define your project needs',
		
	},
	{
		src: '/Collaborate-HowItWorks.png',
		alt: 'Collaborate',
		title: 'Collaborate',
		subtitle: 'Work with Neurtask AI agents',
		
	},
	{
		src: '/Execute-HowItWorks.png',
		alt: 'Execute',
		title: 'Execute',
		subtitle: 'Deliver results effortlessly',
		
		
	},
];

export default function HowItWorks() {
	return (
		<section
			id='how-it-works'
			 className="relative py-16 px-4 bg-white">
				 {/* Decorative background circle from Figma */}
            <div className="absolute w-full max-w-[1400px] h-[151px] bg-[#FDFCFC] left-1/2 -translate-x-1/2 top-0 rounded-full -z-10"></div>
			<div className='container mx-auto px-4 sm:px-6 lg:max-w-[73rem]'>
				<h6 className='text-3xl md:text-4xl font-medium text-[#292929] mb-16 text-center'>
					How it works
				</h6>
				<div className='grid md:grid-cols-3 sm:justify-center items-center gap-8'>
					{steps.map(({ src, alt, title, subtitle }) => (
						<div
							key={title}
							className='flex flex-col items-start'>
							<div className='curved-image-wrapper mb-4'>
								<Image
									src={src}
									alt={alt}
									width={355}
									height={225}
									className='curved-image'
								/>
							</div>
							<h3 className='text-xl text-[#292929] font-semibold leading-6 mb-3'>
								{title}
							</h3>
							<p className='text-[#292929]'>{subtitle}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

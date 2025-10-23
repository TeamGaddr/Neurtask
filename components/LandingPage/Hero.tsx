/** @format */

'use client';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import EmailPopup from '../Core/general/emailPopUp';

export default function Home() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleEmailSubmit = (email: string) => {
		// handle the submitted email here
		console.log('Submitted email:', email);
	};

	return (
		<>
			<section className="relative w-full min-h-full bg-[url('/HeroWoman.avif')] bg-center bg-cover bg-no-repeat overflow-x-hidden overflow-y-visible">
				<nav className="relative w-full mx-auto px-8 pt-8 pb-4 z-10 flex items-center justify-between">
					<Link href='/' className="flex items-center gap-2">
						<Image
							src='/siteLogo.svg'
							alt='Neurtask Logo'
							width={154}
							height={30}
							className="block"
						/>
					</Link>

					<ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
						{['Home', 'Features', 'How it works', 'About', 'Contact'].map((label) => (
							<li key={label}>
								<a
									href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
									className="text-[22px] font-medium text-[#292929] hover:text-[#555555] transition-colors">
									{label}
								</a>
							</li>
						))}
					</ul>

					<div className="hidden md:flex items-center gap-4">
						<Link
							href='/account/login'
							className="text-[#292929] hover:text-[#555555] font-bold text-[15px] px-4 py-2 rounded-md transition-colors">
							Log in
						</Link>
						<Link
							href='/account/signup'
							className="bg-[#292929] text-white px-6 py-2 rounded-md font-bold text-[15px] hover:bg-[#1f1f1f] transition-colors">
							Sign up
						</Link>
					</div>

					<button
						className="md:hidden bg-transparent border-none"
						onClick={() => setMobileMenuOpen((prev) => !prev)}>
						{mobileMenuOpen ? (
							<X size={24} color='#292929' />
						) : (
							<Menu size={24} color='#292929' />
						)}
					</button>
				</nav>

				{mobileMenuOpen && (
					<div className="absolute top-20 left-0 right-0 bg-white z-[9] shadow-md">
						<ul className="flex flex-col gap-4 p-8">
							{['Home', 'Features', 'How it works', 'About', 'Contact'].map((label) => (
								<li key={label}>
									<a
										href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
										className="text-base font-medium text-[#292929] py-2 hover:text-[#555555] transition-colors block"
										onClick={() => setMobileMenuOpen(false)}>
										{label}
									</a>
								</li>
							))}
							{/* Mobile Auth Buttons */}
							<li className="pt-4 border-t border-gray-100">
								<Link
									href='/account/login'
									className="text-[#292929] hover:text-[#555555] font-medium px-4 py-2 rounded-md transition-colors block text-center"
									onClick={() => setMobileMenuOpen(false)}>
									Log in
								</Link>
							</li>
							<li>
								<Link
									href='/account/signup'
									className="bg-[#292929] text-white px-6 py-2 rounded-md font-medium hover:bg-[#1f1f1f] transition-colors block text-center"
									onClick={() => setMobileMenuOpen(false)}>
									Sign up
								</Link>
							</li>
						</ul>
					</div>
				)}

				<div className="relative z-[5] grid grid-cols-1 md:grid-cols-[60%_40%] lg:grid-cols-[65%_35%] items-center gap-4 lg:gap-16 w-full max-w-[1200px] mx-auto px-4 sm:px-8 md:px-12 lg:px-8 pt-[90px] sm:pt-[130px] md:pt-[90px] lg:pt-[150px] xl:pt-0 min-h-[300px] sm:min-h-[400px] md:min-h-[640px] lg:min-h-[750px] xl:min-h-[900px]">
					<div className="flex flex-col justify-center pr-0 md:pr-4 lg:pr-8 mb-0 md:mb-0 lg:mb-40 xl:mb-20 items-center md:items-start">
						<div className="flex items-center gap-3 mb-4">
							<Image
								src='/usergroup.svg'
								alt='Users'
								width={70}
								height={70}
							/>
							<span className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.1em] uppercase text-[#292929]">16,142 HAPPY USERS</span>
						</div>

						<h1 className="text-[20px] sm:text-[45px] md:text-[25px] lg:text-[50px] xl:text-[49px] font-light leading-tight md:leading-none lg:leading-[1.3] mb-[0.9rem] md:mb-4 lg:mb-[1.4rem] text-[#292929] max-w-full text-center md:text-left">
							Automate tasks with AI agents that save{' '}
							<strong className="font-bold">
								time &amp; energy
							</strong>
						</h1>

						<p className="text-[10px] sm:text-base md:text-base lg:text-xl xl:text-2xl font-normal mb-[0.9rem] md:mb-4 lg:mb-5 text-[#292929] leading-relaxed lg:leading-[1.9] max-w-full text-center md:text-left">
							We offer a platform that schedules meetings,
							<br className="hidden sm:block" /> joins calls and shares summaries.
						</p>

						<EmailPopup
							isVisible={true}
							onSubmit={handleEmailSubmit}
						/>
					</div>
					
					<div className="relative h-full min-h-[500px] hidden md:block">
						<div className="absolute top-[53%] md:top-[55%] lg:top-[60.5%] xl:top-[61%] left-[-23%] lg:left-[-23%] xl:left-[-21%] w-[65px] md:w-[60px] lg:w-[80px] xl:w-[85px] h-[65px] md:h-[60px] lg:h-[80px] xl:h-[85px] z-[6]">
							<svg
								className="w-full h-full"
								viewBox='0 0 128 128'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<g filter='url(#filter0_d_5526_30303)'>
									<circle
										cx='63.6234'
										cy='61.6234'
										r='47.6234'
										fill='white'
									/>
									<circle
										cx='63.6234'
										cy='61.6234'
										r='53.6234'
										stroke='black'
										strokeOpacity='0.08'
										strokeWidth='12'
									/>
								</g>
								<circle
									cx='97.375'
									cy='30.5'
									r='8.5'
									fill='#6BB74D'
								/>
								<image
									href='/NotificationBubble.png'
									preserveAspectRatio='xMidYMid meet'
								/>
								<defs>
									<filter
										id='filter0_d_5526_30303'
										x='0'
										y='0'
										width='127.246'
										height='127.247'
										filterUnits='userSpaceOnUse'
										colorInterpolationFilters='sRGB'>
										<feFlood floodOpacity='0' result='BackgroundImageFix' />
										<feColorMatrix
											in='SourceAlpha'
											type='matrix'
											values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
											result='hardAlpha'
										/>
										<feOffset dy='2' />
										<feGaussianBlur stdDeviation='2' />
										<feComposite in2='hardAlpha' operator='out' />
										<feColorMatrix
											type='matrix'
											values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0'
										/>
										<feBlend
											mode='normal'
											in2='BackgroundImageFix'
											result='effect1_dropShadow_5526_30303'
										/>
										<feBlend
											mode='normal'
											in='SourceGraphic'
											in2='effect1_dropShadow_5526_30303'
											result='shape'
										/>
									</filter>
									<pattern
										id='pattern0_5526_30303'
										patternContentUnits='objectBoundingBox'
										width='1'
										height='1'>
										<use
											xlinkHref='#image0_5526_30303'
											transform='scale(0.000390625 0.000520833)'
										/>
									</pattern>
									<image
										id='image0_5526_30303'
										width='2560'
										height='1920'
										preserveAspectRatio='none'
									/>
								</defs>
							</svg>
						</div>

						<div className="absolute top-[34%] md:top-[40%] lg:top-[46%] xl:top-[47%] right-[16%] md:right-[-10%] lg:right-[-15%] xl:right-[10%] 2xl:right-[-28%] z-[6]">
							<svg
								width='300'
								height='102'
								viewBox='0 0 389 102'
								className="max-w-[250px] md:max-w-[250px] lg:max-w-[320px] xl:max-w-[350px] 2xl:max-w-[400px] h-auto"
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<g filter='url(#filter0_d_5796_31065)'>
									<rect x='10' y='8' width='369' height='82' rx='41' fill='white' />
									<circle cx='47' cy='49' r='7' fill='#6BB74D' />
									<path fill='#292929' />
								</g>
								<defs>
									<filter
										id='filter0_d_5796_31065'
										x='0'
										y='0'
										width='389'
										height='102'
										filterUnits='userSpaceOnUse'
										colorInterpolationFilters='sRGB'>
										<feFlood floodOpacity='0' result='BackgroundImageFix' />
										<feColorMatrix
											in='SourceAlpha'
											type='matrix'
											values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
											result='hardAlpha'
										/>
										<feOffset dy='2' />
										<feGaussianBlur stdDeviation='5' />
										<feComposite in2='hardAlpha' operator='out' />
										<feColorMatrix
											type='matrix'
											values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
										/>
										<feBlend
											mode='normal'
											in2='BackgroundImageFix'
											result='effect1_dropShadow_5796_31065'
										/>
										<feBlend
											mode='normal'
											in='SourceGraphic'
											in2='effect1_dropShadow_5796_31065'
											result='shape'
										/>
									</filter>
								</defs>
							</svg>
							<div className="absolute inset-0 flex items-center pl-16 pr-6">
									<p className="text-[#292929] font-medium text-sm ">
										New appointment scheduled
									</p>
								</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
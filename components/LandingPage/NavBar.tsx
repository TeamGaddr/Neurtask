/** @format */

'use client';

import { motion } from 'framer-motion';
import { Menu, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = ({transparent = false}: {transparent?: boolean}) => {
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	const navVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: 'easeInOut',
			},
		},
	};

	const mobileMenuVariants = {
		closed: {
			opacity: 0,
			height: 0,
			transition: {
				duration: 0.3,
				ease: 'easeInOut',
			},
		},
		open: {
			opacity: 1,
			height: 'auto',
			transition: {
				duration: 0.3,
				ease: 'easeInOut',
			},
		},
	};

	const getNavbarClasses = () => {
		if (transparent) {
			return 'relative bg-transparent text-white py-5';
		} else {
			return `fixed top-0 left-0 right-0 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white py-5'}`;
		}
	};


	return (
		<motion.header
			initial='hidden'
			animate='visible'
			variants={navVariants}
			className={`z-50 transition-all duration-300 ${getNavbarClasses()}`}>
			<div className='container mx-auto px-4 md:px-6'>
				<div className='flex justify-between items-center'>
					<Link
						href='/'
						className='flex items-center'>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='flex items-center'>
							<Sun className='h-6 w-6 mr-2' />
							<span className='text-xl font-semibold'>Neurtask</span>
						</motion.div>
					</Link>

					<nav className='hidden md:flex items-center space-x-8'>
						<Link
							href='#'
							className='text-gray-800 hover:text-gray-600 font-bold text-[17px] transition-colors'>
							Home
						</Link>
						<Link
							href='#features'
							className='text-gray-800 hover:text-gray-600 font-bold text-[17px] transition-colors'>
							Features
						</Link>
						<Link
							href='#how-it-works'
							className='text-gray-800 hover:text-gray-600 font-bold text-[17px] transition-colors'>
							How it works
						</Link>
						<Link
							href='#about'
							className='text-gray-800 hover:text-gray-600 font-bold text-[17px] transition-colors'>
							About
						</Link>
						<Link
							href='#contact'
							className='text-gray-800 hover:text-gray-600 font-bold text-[17px] transition-colors'>
							Contact
						</Link>
					</nav>

					<div className='hidden md:flex items-center space-x-4'>
						<Link
							href='/account/login'
							className='text-gray-800 hover:text-gray-600 font-bold text-[15px] px-4 py-2 rounded-md transition-colors'>
							Log in
						</Link>
						<Link
							href='/account/signup'
							className='bg-gray-900 text-white px-6 py-2 rounded-md font-bold text-[15px] hover:bg-gray-800 transition-colors'>
							Sign up
						</Link>
					</div>

					<button
						className='lg:hidden'
						onClick={toggleMobileMenu}>
						{mobileMenuOpen ? (
							<X className='h-6 w-6' />
						) : (
							<Menu className='h-6 w-6' />
						)}
					</button>
				</div>

				<motion.div
					initial='closed'
					animate={mobileMenuOpen ? 'open' : 'closed'}
					variants={mobileMenuVariants}
					className='lg:hidden overflow-hidden'>
					<div className='py-4 space-y-4'>
						<nav className='flex flex-col space-y-4'>
							<Link
								href='#'
								className='text-gray-800 hover:text-gray-600 font-medium transition-colors'
								onClick={() => setMobileMenuOpen(false)}>
								Home
							</Link>
							<Link
								href='#features'
								className='text-gray-800 hover:text-gray-600 font-medium transition-colors'
								onClick={() => setMobileMenuOpen(false)}>
								Features
							</Link>
							<Link
								href='#how-it-works'
								className='text-gray-800 hover:text-gray-600 font-medium transition-colors'
								onClick={() => setMobileMenuOpen(false)}>
								How it works
							</Link>
							<Link
								href='#about'
								className='text-gray-800 hover:text-gray-600 font-medium transition-colors'
								onClick={() => setMobileMenuOpen(false)}>
								About
							</Link>
							<Link
								href='#contact'
								className='text-gray-800 hover:text-gray-600 font-medium transition-colors'
								onClick={() => setMobileMenuOpen(false)}>
								Contact
							</Link>
						</nav>

						<div className='flex flex-col space-y-3 pt-4 border-t border-gray-100'>
							<Link
								href='/account/login'
								className='text-gray-800 hover:text-gray-600 font-medium px-4 py-2 rounded-md transition-colors text-center'
								onClick={() => setMobileMenuOpen(false)}>
								Log in
							</Link>
							<Link
								href='/account/signup'
								className='bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors text-center'
								onClick={() => setMobileMenuOpen(false)}>
								Sign up
							</Link>
						</div>
					</div>
				</motion.div>
			</div>
		</motion.header>
	);
};

export default Navbar;

/** @format */

'use client';

import GoogleSignInButton from '@/components/Authentication/OpenPopLogin';
import LoginForm from '@/components/Authentication/SigninForm';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

const Page = () => {
	const router = useRouter();

	const handleSuccessfulLogin = () => {
		router.push('/account/onboarding');
	};

	return (
		<div className='min-h-screen flex flex-col md:flex-row'>
			<div className='absolute top-8 left-8'>
				<div className='flex items-center gap-2'>
					<Link
						href='/'
						className='flex items-center'>
						<div className='flex items-center gap-2'>
							<Image
								alt='Logo'
								src='/Logo.png'
								width={25}
								height={25}
							/>
							<span className='text-xl font-semibold'>Neurtask</span>
						</div>
					</Link>
				</div>
			</div>

			<div className='flex flex-col md:flex-row w-full'>
				<div className='w-full md:w-1/2 p-8 flex items-center justify-center'>
					<div className='max-w-md pt-20 md:pt-0'>
						<h1 className='text-3xl font-bold mb-6'>
							Welcome back to Neurtask
						</h1>

						<ul className='space-y-3 ml-5'>
							<li className='flex items-start'>
								<span className='mr-2'>•</span>
								<span>Keep automating your work with Neurtask.</span>
							</li>
							<li className='flex items-start'>
								<span className='mr-2'>•</span>
								<span>Access your AI agents instantly.</span>
							</li>
							<li className='flex items-start'>
								<span className='mr-2'>•</span>
								<span>Need help? We&apos;ll help you.</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Right side - Form */}
				<div className='w-full md:w-1/2 p-8 flex items-center justify-center'>
					<div className='w-full max-w-md space-y-6'>
						<Suspense fallback={<div>Loading login form...</div>}>
							<LoginForm onSuccess={handleSuccessfulLogin} />
						</Suspense>

						<div className='pt-2'>
							{/* <GoogleSignInButton /> */}
						</div>


						<div className='text-center'>
							<p className='text-sm text-gray-600'>
								Don&apos;t have an account?{' '}
								<Link
									href='/account/signup'
									className='text-black font-medium hover:underline'>
									Sign up
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;

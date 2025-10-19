/** @format */

'use client';

import SignupForm from '@/components/Authentication/SignupForm';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page = () => {
	const router = useRouter();

	const handleSuccessfulSignup = () => {
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

			{/* Main content */}
			<div className='flex flex-col md:flex-row w-full'>
				<div className='w-full md:w-1/2 p-8 flex items-center justify-center'>
					<div className='max-w-md pt-20 md:pt-0'>
						<h1 className='text-3xl font-bold mb-6'>
							Join millions worldwide who automate their work effortlessly with
							Neurtask
						</h1>

						<ul className='space-y-3 ml-5'>
							<li className='flex items-start'>
								<span className='mr-2'>•</span>
								<span>Set up in minutes—no coding needed.</span>
							</li>
							<li className='flex items-start'>
								<span className='mr-2'>•</span>
								<span>Enjoy core features free, forever.</span>
							</li>
							<li className='flex items-start'>
								<span className='mr-2'>•</span>
								<span>Try premium tools free for 14 days.</span>
							</li>
						</ul>
					</div>
				</div>

				<div className='w-full md:w-1/2 p-8 flex items-center justify-center'>
					<div className='w-full max-w-md space-y-6'>
						<SignupForm onSuccess={handleSuccessfulSignup} />

						<div className='text-center'>
							<p className='text-sm text-gray-600'>
								Already have an account?{' '}
								<Link
									href='/account/login'
									className='text-black font-medium hover:underline'>
									Log In
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

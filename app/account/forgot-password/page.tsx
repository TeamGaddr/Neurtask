/** @format */

'use client';

import PasswordRecoveryForm from '@/components/Authentication/PasswordRecoveryForm';
import Link from 'next/link';
import Image from 'next/image';

const PasswordRecoveryPage = () => {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center relative bg-white'>
			{/* Top-left Logo */}
			<div className='absolute top-6 left-6'>
				<Image
					src='/siteLogo.svg'
					width={24}
					height={24}
					alt='Neurtask logo'
					className='h-6'
				/>
			</div>

			<div className='w-full max-w-md px-4 sm:px-6 py-8'>
				<div className='space-y-6'>
					<PasswordRecoveryForm />
					<div className='text-center text-sm text-gray-600'>
						Remembered your password?{' '}
						<Link
							href='/account/login'
							className='text-blue-600 font-medium text-sm hover:underline transition-colors'>
							Go back to sign in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PasswordRecoveryPage;

/** @format */

'use client';

import Image from 'next/image';

interface RoleStepProps {
	selectedRole: string;
	onSelectRole: (role: string) => void;
}

const roles = [
	{ id: 'designer', label: 'Designer' },
	{ id: 'business-owner', label: 'Business Owner' },
	{ id: 'architect', label: 'Architect' },
	{ id: 'hr-recruiting', label: 'HR & Recruiting' },
	{ id: 'engineering', label: 'Engineering' },
	{ id: 'it', label: 'IT' },
	{ id: 'developer', label: 'Developer' },
	{ id: 'other', label: 'Other' },
];

const RoleStep = ({ selectedRole, onSelectRole }: RoleStepProps) => {
	return (
		<div className='flex flex-col md:flex-row w-full max-w-6xl gap-10'>
			<div className='w-full md:w-1/2 space-y-4'>
				<div>
					<div className='flex items-center justify-between mb-2'>
						<h1 className='text-3xl font-bold mb-2'>What&apos;s your role?</h1>
						<span className='text-gray-500'>1/4</span>
					</div>
					<div className='relative h-1 bg-gray-200 w-full rounded-full mb-4'>
						<div
							className='absolute h-1 bg-black rounded-full'
							style={{ width: '25%' }}></div>
					</div>
					<p className='text-gray-600'>
						Knowing your role helps us recommend the most relevant features for
						you.
					</p>
				</div>

				<div className='grid grid-cols-2 gap-3 mt-6'>
					{roles.map((role) => (
						<button
							key={role.id}
							className={`
                border rounded-md py-2 px-4 text-left transition-colors
                ${
									selectedRole === role.id
										? 'bg-black text-white'
										: 'bg-white hover:bg-gray-50 border-gray-300'
								}
              `}
							onClick={() => onSelectRole(role.id)}>
							{role.label}
						</button>
					))}
				</div>
			</div>

			<div className='w-full md:w-1/2 hidden md:block'>
				<div className='rounded-lg overflow-hidden h-full'>
					<Image
						src='/FirstStep.png'
						alt='Person holding a business card'
						width={600}
						height={400}
						className='object-cover w-full h-full'
					/>
				</div>
			</div>
		</div>
	);
};

export default RoleStep;

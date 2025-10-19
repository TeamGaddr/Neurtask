/** @format */

'use client';

import Image from 'next/image';

interface JobLevelStepProps {
	selectedLevel: string;
	onSelectLevel: (level: string) => void;
	onSkip: () => void;
}

const jobLevels = [
	{ id: 'manager', label: 'Manager' },
	{ id: 'intern', label: 'Intern' },
	{ id: 'ceo', label: 'CEO' },
	{ id: 'vp-exec', label: 'VP/Exec' },
	{ id: 'individual-contributor', label: 'Individual contributor' },
];

const JobLevelStep = ({
	selectedLevel,
	onSelectLevel,
	onSkip,
}: JobLevelStepProps) => {
	return (
		<div className='flex flex-col md:flex-row w-full max-w-6xl gap-10'>
			<div className='w-full md:w-1/2 space-y-4'>
				<div>
					<div className='flex items-center justify-between mb-2'>
						<h1 className='text-3xl font-bold mb-2'>
							What&apos;s your job level?
						</h1>
						<span className='text-gray-500'>2/4</span>
					</div>
					<div className='relative h-1 bg-gray-200 w-full rounded-full mb-4'>
						<div
							className='absolute h-1 bg-black rounded-full'
							style={{ width: '75%' }}></div>
					</div>
					<p className='text-gray-600'>
						This helps us recommend features that match your responsibilities.
					</p>
				</div>

				<div className='grid grid-cols-2 gap-3 mt-6'>
					{jobLevels.slice(0, 3).map((level) => (
						<button
							key={level.id}
							className={`
                border rounded-md py-2 px-4 text-left transition-colors
                ${
									selectedLevel === level.id
										? 'bg-black text-white'
										: 'bg-white hover:bg-gray-50 border-gray-300'
								}
              `}
							onClick={() => onSelectLevel(level.id)}>
							{level.label}
						</button>
					))}
				</div>

				<div className='grid grid-cols-2 gap-3'>
					{jobLevels.slice(3).map((level) => (
						<button
							key={level.id}
							className={`
                border rounded-md py-2 px-4 text-left transition-colors
                ${
									selectedLevel === level.id
										? 'bg-black text-white'
										: 'bg-white hover:bg-gray-50 border-gray-300'
								}
              `}
							onClick={() => onSelectLevel(level.id)}>
							{level.label}
						</button>
					))}
				</div>

				<div className='flex justify-end mt-6'>
					<button
						onClick={onSkip}
						className='text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md'>
						Skip
					</button>
				</div>
			</div>

			<div className='w-full md:w-1/2 hidden md:block'>
				<div className='rounded-lg overflow-hidden h-full'>
					<Image
						src='/ThirdStep.png'
						alt='Person typing on laptop'
						width={600}
						height={400}
						className='object-cover w-full h-full'
					/>
				</div>
			</div>
		</div>
	);
};

export default JobLevelStep;

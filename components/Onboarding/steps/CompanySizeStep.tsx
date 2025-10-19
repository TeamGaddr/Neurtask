/** @format */

'use client';

import Image from 'next/image';

interface CompanySizeStepProps {
	selectedSize: string;
	onSelectSize: (size: string) => void;
}

const companySizes = [
	{ id: '1-10', label: '1-10' },
	{ id: '11-49', label: '11-49' },
	{ id: '50-99', label: '50-99' },
	{ id: '100-249', label: '100-249' },
	{ id: '250-499', label: '250-499' },
	{ id: '500-999', label: '500-999' },
	{ id: '1000-4999', label: '1000-4999' },
	{ id: '5000-9999', label: '5000-9999' },
	{ id: '10000+', label: '10000+' },
];

const CompanySizeStep = ({
	selectedSize,
	onSelectSize,
}: CompanySizeStepProps) => {
	return (
		<div className='flex flex-col md:flex-row w-full max-w-6xl gap-10'>
			<div className='w-full md:w-1/2 space-y-4'>
				<div>
					<div className='flex items-center justify-between mb-2'>
						<h1 className='text-3xl font-bold mb-2'>
							What&apos;s your company size?
						</h1>
						<span className='text-gray-500'>3/4</span>
					</div>
					<div className='relative h-1 bg-gray-200 w-full rounded-full mb-4'>
						<div
							className='absolute h-1 bg-black rounded-full'
							style={{ width: '50%' }}></div>
					</div>
					<p className='text-gray-600'>
						We use this to tailor features that fit businesses like yours.
					</p>
				</div>

				<div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-6'>
					{companySizes.slice(0, 4).map((size) => (
						<button
							key={size.id}
							className={`
                border rounded-md py-2 px-4 text-left transition-colors
                ${
									selectedSize === size.id
										? 'bg-black text-white'
										: 'bg-white hover:bg-gray-50 border-gray-300'
								}
              `}
							onClick={() => onSelectSize(size.id)}>
							{size.label}
						</button>
					))}
				</div>

				<div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
					{companySizes.slice(4, 7).map((size) => (
						<button
							key={size.id}
							className={`
                border rounded-md py-2 px-4 text-left transition-colors
                ${
									selectedSize === size.id
										? 'bg-black text-white'
										: 'bg-white hover:bg-gray-50 border-gray-300'
								}
              `}
							onClick={() => onSelectSize(size.id)}>
							{size.label}
						</button>
					))}
				</div>

				<div className='grid grid-cols-2 gap-3'>
					{companySizes.slice(7).map((size) => (
						<button
							key={size.id}
							className={`
                border rounded-md py-2 px-4 text-left transition-colors
                ${
									selectedSize === size.id
										? 'bg-black text-white'
										: 'bg-white hover:bg-gray-50 border-gray-300'
								}
              `}
							onClick={() => onSelectSize(size.id)}>
							{size.label}
						</button>
					))}
				</div>
			</div>

			<div className='w-full md:w-1/2 hidden md:block'>
				<div className='rounded-lg overflow-hidden h-full'>
					<Image
						src='/SecondStep.png'
						alt='Team putting hands together'
						width={600}
						height={400}
						className='object-cover w-full h-full'
					/>
				</div>
			</div>
		</div>
	);
};

export default CompanySizeStep;

/** @format */

'use client';

import Image from 'next/image';

interface CalendarStepProps {
	selectedCalendar: string | null;
	onSelectCalendar: (calendar: string) => void;
	onSkip: () => void;
}

const CalendarStep = ({
	selectedCalendar,
	onSelectCalendar,
	onSkip,
}: CalendarStepProps) => {
	return (
		<div className='flex flex-col md:flex-row w-full max-w-6xl gap-10'>
			<div className='w-full md:w-1/2 space-y-4'>
				<div>
					<div className='flex items-center justify-between mb-2'>
						<h1 className='text-3xl font-bold mb-2'>Connect your calendar</h1>
						<span className='text-gray-500'>4/4</span>
					</div>
					<div className='relative h-1 bg-gray-200 w-full rounded-full mb-4'>
						<div
							className='absolute h-1 bg-black rounded-full'
							style={{ width: '100%' }}></div>
					</div>
					<p className='text-gray-600'>
						To capture meetings and generate summaries.
					</p>
				</div>

				<div className='space-y-3 mt-6'>
					<button
						className={`
              w-full border rounded-md py-3 px-4 text-left transition-colors flex items-center
              ${
								selectedCalendar === 'google'
									? 'border-black'
									: 'border-gray-300 hover:border-gray-400'
							}
            `}
						onClick={() => onSelectCalendar('google')}>
						<svg
							viewBox='0 0 24 24'
							width='20'
							height='20'
							className='mr-3'>
							<g transform='matrix(1, 0, 0, 1, 27.009001, -39.238998)'>
								<path
									fill='#4285F4'
									d='M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z'
								/>
								<path
									fill='#34A853'
									d='M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z'
								/>
								<path
									fill='#FBBC05'
									d='M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z'
								/>
								<path
									fill='#EA4335'
									d='M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z'
								/>
							</g>
						</svg>
						Google Calendar
					</button>

					{/* <button
						className={`
              w-full border rounded-md py-3 px-4 text-left transition-colors flex items-center
              ${
								selectedCalendar === 'outlook'
									? 'border-black'
									: 'border-gray-300 hover:border-gray-400'
							}
            `}
						onClick={() => onSelectCalendar('outlook')}>
						<svg
							viewBox='0 0 24 24'
							width='20'
							height='20'
							className='mr-3 text-blue-500'>
							<rect
								width='20'
								height='20'
								fill='#0078D4'
							/>
							<path
								d='M12 6L20 3V17L12 20V6Z'
								fill='#0078D4'
							/>
							<path
								d='M11 6H4V18H11V6Z'
								fill='#0078D4'
							/>
						</svg>
						Outlook Calendar
					</button> */}
				</div>

				<div className='flex justify-between mt-8'>
					<button
						onClick={onSkip}
						className='text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md'>
						Skip
					</button>

					<button
						onClick={() =>
							selectedCalendar ? onSelectCalendar(selectedCalendar) : onSkip()
						}
						className='bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800'>
						Continue
					</button>
				</div>
			</div>

			<div className='w-full md:w-1/2 hidden md:block'>
				<div className='rounded-lg overflow-hidden h-full'>
					<Image
						src='/FinalStep.png'
						alt='Desk with laptop'
						width={600}
						height={400}
						className='object-cover w-full h-full'
					/>
				</div>
			</div>
		</div>
	);
};

export default CalendarStep;

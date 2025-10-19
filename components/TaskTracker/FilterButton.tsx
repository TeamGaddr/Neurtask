/** @format */

import { ChevronDown, X } from 'lucide-react';
import { FC, useState } from 'react';

const FilterButton: FC<{ label: string; onClick: () => void }> = ({
	label,
	onClick,
}) => (
	<button
		onClick={onClick}
		className='flex items-center  gap-1 px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-2xl text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition'>
		{label}
		<ChevronDown className='w-3 h-3 sm:w-4 sm:h-4' />
	</button>
);

const DateTimePickerModal: FC<{ onClose: () => void }> = ({ onClose }) => {
	const [step, setStep] = useState<'date' | 'time'>('date');
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [hour, setHour] = useState(11);
	const [minute, setMinute] = useState(0);
	const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

	const handleNext = () => {
		if (selectedDate) {
			setStep('time');
		}
	};

	const handleDone = () => {
		if (!selectedDate) return;

		const dateWithTime = new Date(selectedDate);
		let adjustedHour = hour % 12;

		if (period === 'PM') adjustedHour += 12;

		dateWithTime.setHours(adjustedHour);
		dateWithTime.setMinutes(minute);
		dateWithTime.setSeconds(0);
		dateWithTime.setMilliseconds(0);

		console.log('Final datetime:', dateWithTime);
		onClose();
	};

	return (
		<div className='absolute top-full mt-2 w-[260px] bg-white shadow-lg rounded-xl p-4 z-50 '>
			<div className='flex justify-between items-center mb-3'>
				<h3 className='text-sm font-medium text-gray-800'>
					{step === 'date' ? 'Select date' : 'Select time'}
				</h3>
				<button onClick={onClose}>
					<X className='w-4 h-4 text-gray-500' />
				</button>
			</div>

			{step === 'date' ? (
				<div className='space-y-3'>
					<div className='grid grid-cols-7 gap-1 text-sm text-center'>
						{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
							<div
								key={d}
								className='text-gray-500'>
								{d}
							</div>
						))}
						{Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
							<div
								key={day}
								onClick={() => setSelectedDate(new Date(2025, 0, day))}
								className={`p-2 rounded-full cursor-pointer ${
									selectedDate?.getDate() === day
										? 'bg-purple-600 text-white'
										: 'hover:bg-gray-200'
								}`}>
								{day}
							</div>
						))}
					</div>

					<div className='flex justify-between mt-2'>
						<button
							onClick={() => setSelectedDate(null)}
							className='text-sm text-gray-500 hover:underline'>
							Clear
						</button>
						<button
							onClick={handleNext}
							className='bg-black text-white text-sm px-4 py-1.5 rounded-md'
							disabled={!selectedDate}>
							Next
						</button>
					</div>
				</div>
			) : (
				<div className='space-y-4'>
					<div className='flex items-center justify-center gap-2 text-lg'>
						<div className='flex flex-col items-center'>
							<input
								type='number'
								value={hour}
								min={1}
								max={12}
								onChange={(e) => setHour(Number(e.target.value))}
								className='w-14 p-1 rounded-md text-center bg-purple-100'
								disabled={!selectedDate}
							/>
							<span className='text-sm mt-1'>Hour</span>
						</div>
						:
						<div className='flex flex-col items-center'>
							<input
								type='number'
								value={minute}
								min={0}
								max={59}
								onChange={(e) => setMinute(Number(e.target.value))}
								className='w-14 p-1 rounded-md text-center bg-purple-100'
								disabled={!selectedDate}
							/>
							<span className='text-sm mt-1'>Minute</span>
						</div>
						<div className='flex flex-col ml-2'>
							<button
								className={`px-2 py-1 rounded ${
									period === 'AM' ? 'bg-[#EAE6FF] text-black' : ''
								}`}
								onClick={() => setPeriod('AM')}>
								AM
							</button>
							<button
								className={`px-2 py-1 rounded ${
									period === 'PM' ? 'bg-[#EAE6FF] text-black' : ''
								}`}
								onClick={() => setPeriod('PM')}>
								PM
							</button>
						</div>
					</div>

					<div className='flex justify-between'>
						<button
							onClick={() => setStep('date')}
							className='text-sm text-gray-500 hover:underline'>
							Back
						</button>
						<button
							onClick={handleDone}
							className='bg-black text-white text-sm px-4 py-1.5 rounded-md'>
							Done
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

type FilterModalProps = {
	title: string;
	options: string[];
	onClose: () => void;
};

const FilterModal: FC<FilterModalProps> = ({ title, options, onClose }) => (
	<div className='absolute top-full mt-2 w-40 sm:w-48 bg-white shadow-lg rounded-xl p-4 z-50'>
		<div className='flex justify-between items-center mb-3'>
			<h3 className='text-sm font-medium text-gray-800'>{title}</h3>
			<button onClick={onClose}>
				<X className='w-4 h-4 text-gray-500' />
			</button>
		</div>
		<div className='space-y-2'>
			{options.map((opt) => (
				<div
					key={opt}
					className='bg-gray-50 px-3 py-2 rounded-md text-sm text-gray-700 cursor-pointer hover:bg-gray-100'>
					{opt}
				</div>
			))}
		</div>
	</div>
);

const FilterButtons: FC = () => {
	const [activeFilter, setActiveFilter] = useState<string | null>(null);

	const toggleFilter = (filter: string) => {
		setActiveFilter(activeFilter === filter ? null : filter);
	};

	const closeModal = () => setActiveFilter(null);

	return (
		<div className='flex space-x-4 px-[10px] sm:px-[40px]'>
			<div className='relative'>
				<FilterButton
					label='Agent'
					onClick={() => toggleFilter('Agent')}
				/>
				{activeFilter === 'Agent' && (
					<FilterModal
						title='Agent'
						options={['Pending', 'Running', 'Finished']}
						onClose={closeModal}
					/>
				)}
			</div>
			<div className='relative'>
				<FilterButton
					label='Status'
					onClick={() => toggleFilter('Status')}
				/>
				{activeFilter === 'Status' && (
					<FilterModal
						title='Status'
						options={['Pending', 'Running', 'Finished']}
						onClose={closeModal}
					/>
				)}
			</div>

			<div className='relative'>
				<FilterButton
					label='Category'
					onClick={() => toggleFilter('Category')}
				/>
				{activeFilter === 'Category' && (
					<FilterModal
						title='Category'
						options={['Scheduled', 'In progress', 'Completed']}
						onClose={closeModal}
					/>
				)}
			</div>

			<div className='relative'>
				<FilterButton
					label='Date'
					onClick={() => toggleFilter('Date')}
				/>
				{activeFilter === 'Date' && (
					<DateTimePickerModal onClose={closeModal} />
				)}
			</div>
		</div>
	);
};

export default FilterButtons;

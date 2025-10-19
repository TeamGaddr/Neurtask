/** @format */

import { X } from 'lucide-react';
import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTimePickerModalProps {
	onClose: () => void;
	onSelect: (datetime: Date) => void;
}

const DateTimePickerModal: FC<DateTimePickerModalProps> = ({
	onClose,
	onSelect,
}) => {
	const [step, setStep] = useState<'date' | 'time'>('date');
	const [tempDate, setTempDate] = useState<Date | null>(null);
	const [timeOnly, setTimeOnly] = useState<Date | null>(null);

	const handleNext = () => {
		if (tempDate) {
			setStep('time');
		}
	};

	const handleDone = () => {
		if (tempDate && timeOnly) {
			const finalDate = new Date(tempDate);
			finalDate.setHours(timeOnly.getHours());
			finalDate.setMinutes(timeOnly.getMinutes());
			finalDate.setSeconds(0);
			finalDate.setMilliseconds(0);
			onSelect(finalDate);
		}
		onClose();
	};

	return (
		<div className='absolute top-full mt-2 w-[300px] bg-white shadow-lg rounded-xl p-4 z-50'>
			<div className='flex justify-between items-center mb-3'>
				<h3 className='text-sm font-medium text-gray-800'>
					{step === 'date' ? 'Select Date' : 'Select Time'}
				</h3>
				<button onClick={onClose}>
					<X className='w-4 h-4 text-gray-500' />
				</button>
			</div>

			{step === 'date' ? (
				<div className='space-y-4 '>
					<DatePicker
						selected={tempDate}
						onChange={(date) => setTempDate(date)}
						inline
					/>
					<div className='flex justify-between'>
						<button
							onClick={() => setTempDate(null)}
							className='text-sm text-gray-500 hover:underline'>
							Clear
						</button>
						<button
							disabled={!tempDate}
							onClick={handleNext}
							className='bg-black text-white text-sm px-4 py-1.5 rounded-md'>
							Next
						</button>
					</div>
				</div>
			) : (
				<div className='space-y-4'>
					<DatePicker
						selected={timeOnly}
						onChange={(time) => setTimeOnly(time)}
						showTimeSelect
						showTimeSelectOnly
						timeIntervals={15}
						timeCaption='Time'
						dateFormat='h:mm aa'
						inline
					/>
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

export default DateTimePickerModal;

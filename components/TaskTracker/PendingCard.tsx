/** @format */

import React from 'react';
import { MoreVertical, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Pending } from '@/constants/TaskTracker/data';
import DropdownActions from '@/components/TaskTracker/TaskDetails';

// Use Pending directly as the prop type
const PendingCard: React.FC<Pending> = ({ title, date, status, progress }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const handleClose = () => {
		setIsOpen(false);
	};
	return (
		<Card className='border rounded-xl shadow-sm bg-gray-50'>
			<CardContent className='p-4 space-y-3'>
				<div className='flex items-start justify-between'>
					<div>
						<h3 className='text-base font-medium'>{title}</h3>
						<p className='text-sm text-gray-500'>Estimated {date}</p>
					</div>
					<div className='relative'>
						<Button
							variant='ghost'
							size='icon'
							className='h-8 w-8 rounded-full'
							onClick={handleToggle}>
							<MoreVertical className='h-5 w-5 text-gray-500' />
						</Button>
						<DropdownActions
							isOpen={isOpen}
							onClose={handleClose}
						/>
					</div>
				</div>

				<div className='space-y-2'>
					<div className='flex items-center gap-1'>
						<span className='text-xs font-medium'>{status}</span>
						<Calendar className='h-3.5 w-3.5 text-gray-700' />
					</div>

					<Progress
						value={progress + 3}
						className='h-1.5 bg-gray-200'
					/>

					<div className='flex justify-end'>
						<span className='text-xs text-gray-500'>{progress}%</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default PendingCard;

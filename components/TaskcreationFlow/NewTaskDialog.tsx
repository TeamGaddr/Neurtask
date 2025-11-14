/** @format */
'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import {
	Calendar,
	Code,
	FileText,
	Lightbulb,
	Search,
	Type,
	Users,
} from 'lucide-react';
import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const TASK_TYPES = [
	{ label: 'Summary', icon: FileText },
	{ label: 'Schedule', icon: Calendar },
	{ label: 'Brainstorm', icon: Lightbulb },
	{ label: 'Research', icon: Search },
	{ label: 'Customers', icon: Users },
	{ label: 'Coding', icon: Code },
	{ label: 'Content', icon: Type },
];

interface NewTaskDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	assignedAgentId: string;
	onCreated?: () => void;
}

export default function NewTaskDialog({
	open,
	onOpenChange,
	assignedAgentId,
	onCreated,
}: NewTaskDialogProps) {
	const [activeType, setActiveType] = useState('');
	const [description, setDescription] = useState('');
	const [repeatDaysOpen, setRepeatDaysOpen] = useState(false);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const [deadlineStart, setDeadlineStart] = useState('');
	const [deadlineEnd, setDeadlineEnd] = useState('');
	const [loading, setLoading] = useState(false);

	const WEEK_DAYS = [
		'Every Monday',
		'Every Tuesday',
		'Every Wednesday',
		'Every Thursday',
		'Every Friday',
		'Every Saturday',
		'Every Sunday',
	];

	const toggleDay = (day: string) =>
		setSelectedDays((prev) =>
			prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
		);

	const handleSubmit = async () => {
		if (!activeType) {
			toast({
				variant: 'error',
				title: 'Validation Error',
				description: 'Please select a task type.',
			});
			return;
		}
		setLoading(true);
		try {
			const payload = {
				title: activeType,
				description,
				type: activeType,
				assignedAgent: assignedAgentId,
				scheduledTime: deadlineStart || new Date().toISOString(),
				recurring: selectedDays.length > 0,
				metaData: { repeatOn: selectedDays },
			};
			const res = await fetch(`${API_BASE}/tasks`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			const body = await res.json();
			if (!res.ok) throw new Error(body.error || 'Failed to create task');

			toast({
				variant: 'success',
				title: 'Task Created',
				description: `Task "${body.title}" has been scheduled.`,
			});
			onCreated?.();
			onOpenChange(false);
		} catch (err) {
			toast({
				variant: 'error',
				title: 'Creation Error',
				description:
					err instanceof Error ? err.message : 'Something went wrong',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}>
			<DialogContent className='w-full sm:max-w-[850px] rounded-xl p-6 border shadow-sm'>
				<DialogTitle className='text-sm font-medium text-gray-900 mb-2'>
					New Task
				</DialogTitle>
				<DialogDescription />

				<div className='p-6 rounded-lg border border-gray-200'>
					{/* Task Type Picker */}
					<div className='grid grid-cols-4 sm:grid-cols-7 gap-3 mb-5 border-b pb-5'>
						{TASK_TYPES.map(({ label, icon: Icon }) => {
							const isActive = activeType === label;
							return (
								<button
									key={label}
									type='button'
									onClick={() => setActiveType(label)}
									className={`flex flex-col items-center justify-center p-3 rounded-lg text-xs border transition-all ${isActive
											? 'bg-white text-black border-purple-600'
											: 'bg-gray-100 text-gray-400 border-gray-200 cursor-default'
										}`}>
									<Icon className='w-5 h-5 mb-1' />
									{label}
								</button>
							);
						})}
					</div>

					{/* Description */}
					<textarea
						rows={4}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='w-full border border-gray-200 bg-white rounded-md p-4 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none'
						placeholder='Draft an agenda, outline goals, or describe activities. Neurtask will do the rest.'
					/>

					{/* Repeat & Deadline */}
					<div className='space-y-4 mt-6'>
						{/* Repeat */}
						<div className='flex items-center justify-between'>
							<label className='text-sm text-gray-700 min-w-[80px]'>
								Repeat
							</label>
							<div className='relative w-[200px]'>
								<button
									type='button'
									onClick={() => setRepeatDaysOpen((v) => !v)}
									className='bg-gray-100 text-gray-800 flex justify-center text-sm p-2.5 rounded-lg shadow-inner w-full text-left focus:outline-none focus:ring-1 focus:ring-gray-300'>
									{selectedDays.length > 0
										? selectedDays
											.map((d) => d.replace('Every ', '').slice(0, 3))
											.join(', ')
										: 'Never'}
								</button>
								{repeatDaysOpen && (
									<div className='absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10'>
										{WEEK_DAYS.map((day) => (
											<label
												key={day}
												className='flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm'>
												<span>{day}</span>
												<input
													type='checkbox'
													checked={selectedDays.includes(day)}
													onChange={() => toggleDay(day)}
													className='accent-purple-600'
												/>
											</label>
										))}
									</div>
								)}
							</div>
						</div>

						{/* Deadline */}
						<div className='flex items-center justify-between'>
							<label className='text-sm text-gray-700 min-w-[80px]'>
								Deadline
							</label>
							<div className='flex items-center gap-2'>
								<input
									type='date'
									value={deadlineStart}
									onChange={(e) => setDeadlineStart(e.target.value)}
									className='bg-gray-100 text-gray-800 text-sm p-2.5 rounded-lg shadow-inner focus:outline-none focus:ring-1 focus:ring-gray-300 w-[120px]'
								/>
								<span className='text-gray-500'>–</span>
								<input
									type='date'
									value={deadlineEnd}
									onChange={(e) => setDeadlineEnd(e.target.value)}
									className='bg-gray-100 text-gray-800 text-sm p-2.5 rounded-lg shadow-inner focus:outline-none focus:ring-1 focus:ring-gray-300 w-[120px]'
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className='flex justify-end mt-6 gap-3'>
					<Button
						variant='ghost'
						onClick={() => onOpenChange(false)}
						className='text-gray-600'>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={loading}
						className='bg-black text-white hover:bg-black/90'>
						{loading ? 'Adding…' : 'Add'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

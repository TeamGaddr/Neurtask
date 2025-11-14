

/**
 * eslint-disable @typescript-eslint/ban-ts-comment
 *
 * @format
 */

import { Check } from 'lucide-react';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const EarlyAccess = forwardRef((props, ref) => {
	const [tasks, setTasks] = useState([
		{
			label: 'Invite 2 Friends',
			desc: 'Earn 200 Credits',
			completed: false,
			action: 'Invite now',
			originalAction: 'Invite now',
		},
		{
			label: 'Join Community',
			desc: 'Earn 200 Credits',
			completed: false,
			action: 'Join now',
			originalAction: 'Join now',
		},
		{
			label: 'Verify Email',
			desc: '+100 Credits',
			completed: true,
			action: 'Completed',
			originalAction: 'Verify now',
		},
		{
			label: 'Complete Profile',
			desc: '+50 Credits',
			completed: true,
			action: 'Completed',
			originalAction: 'Complete now',
		},
	]);

	const toggleComplete = (index: number) => {
		setTasks((prev) =>
			prev.map((task, i) =>
				i === index
					? {
						...task,
						completed: !task.completed,
						action: !task.completed ? 'Completed' : task.originalAction,
					}
					: task
			)
		);
	};

	// handleSubmit function to expose to SettingsPage
	const handleSubmit = async () => {
		console.log('Saving Early Access tasks...', tasks);

		// THIS IS WRONG URL
		const API_URL = 'https://your-backend-url.com/api/auth'; // Adjust as needed
		//const API_URL = 'http://localhost:3001';
		const token = localStorage.getItem('token');

		try {
			await axios.put(
				`${API_URL}/updateEarlyAccessTasks`,
				{ tasks },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			console.log('Early Access tasks updated successfully!');
		} catch (error) {
			console.error('Error saving Early Access tasks:', error);
		}
	};

	// Expose handleSubmit to parent SettingsPage
	useImperativeHandle(ref, () => ({
		handleSubmit,
	}));

	return (
		<div className='w-full'>
			<div className='mb-4'>
				<h1 className='text-lg font-medium text-[#292929]'>Get early access</h1>
				<p className='text-base text-[#7C7C7C]'>
					Complete these simple tasks to unlock your early access
				</p>
			</div>

			{/* Main Card */}
			<div className='flex flex-col lg:flex-row gap-6 items-start'>
				{/* Left Card */}
				<div className='space-y-4 bg-white p-6 rounded-lg shadow border border-gray-200 w-full lg:w-[70%]'>
					<div className='flex justify-between items-center'>
						<h1 className='text-base font-semibold text-gray-900'>
							Unlock Progress
						</h1>
						<p className='text-sm text-[#6019F0]'>
							{`${tasks.filter((t) => t.completed).length}/${tasks.length
								} Complete`}
						</p>
					</div>

					<div className='w-full bg-gray-200 rounded-full h-1.5'>
						<div
							className='bg-[#6019F0] h-1.5 rounded-full'
							style={{
								width: `${(tasks.filter((task) => task.completed).length /
									tasks.length) *
									100
									}%`,
							}}></div>
					</div>

					<div className='relative'>
						<button className='w-full py-2 bg-[#6019F0] text-white rounded-md text-sm font-medium hover:bg-[#6019F0] transition'>
							Unlock Early Access →
						</button>
					</div>

					{/* Tasks List */}
					<div className='space-y-3'>
						{tasks.map((task, index) => {
							const circleClasses = task.completed
								? 'bg-green-500 text-white'
								: 'border-2 border-gray-300';

							return (
								<div
									key={index}
									className={`flex items-start p-4 border rounded-lg ${task.completed ? 'bg-[#F5F5F5]' : 'bg-white'
										}`}>
									<div
										onClick={() => toggleComplete(index)}
										className={`h-5 w-5 flex items-center justify-center rounded-full mt-1 cursor-pointer ${circleClasses}`}>
										{task.completed && <Check className='h-4 w-4' />}
									</div>
									<div className='flex flex-col flex-1 ml-3'>
										<span className='text-sm text-gray-900 font-medium'>
											{task.label}
										</span>
										<p
											className={`text-xs ${task.completed ? 'text-gray-500' : 'text-purple-600'
												}`}>
											{task.desc}
										</p>
									</div>
									{task.action ? (
										<button
											onClick={() => toggleComplete(index)}
											className={`text-sm font-medium ${task.completed
												? 'text-gray-500 cursor-default'
												: 'text-purple-600 hover:underline'
												}`}>
											{task.action}
										</button>
									) : null}
								</div>
							);
						})}
					</div>
				</div>

				{/* Right Card */}
				<div className='bg-[#F5F0FF] p-6 rounded-lg shadow border border-gray-200 w-full lg:w-[30%] space-y-4'>
					<h2 className='text-base font-semibold text-gray-900'>
						What You’ll Unlock
					</h2>
					<ul className='space-y-2 text-sm text-gray-700'>
						<li className='flex items-center'>
							<span className='text-green-500 mr-2'>✓</span> Unlimited
							transcription
						</li>
						<li className='flex items-center'>
							<span className='text-green-500 mr-2'>✓</span> AI Summaries
						</li>
						<li className='flex items-center'>
							<span className='text-green-500 mr-2'>✓</span> 500 mins of
							storage/seat
						</li>
					</ul>
					<hr className='border-t border-gray-200' />
					<h3 className='text-sm font-medium text-gray-900 mt-4'>
						Usage Limits
					</h3>
					<ul className='text-sm text-gray-600 list-disc pl-5 space-y-1'>
						<li>Maximum 650 credits</li>
						<li>Credits expire after 90 days</li>
						<li>Non-transferable credits</li>
					</ul>
				</div>
			</div>
		</div>
	);
});

EarlyAccess.displayName = 'EarlyAccess';

export default EarlyAccess;
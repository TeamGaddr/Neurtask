/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { AGENTS } from '@/constants/agentData/data';
import {
	ALL_TASKS,
	KNOWLEDGE_ITEMS,
	ONGOING_TASKS,
	UPCOMING_MEETINGS,
} from '@/constants/meeting/data';
import { FileText, MoreHorizontal, Search } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AgentDetailPage() {
	const params = useParams();
	const agentId = params.id as string;

	const [agent, setAgent] = useState(
		AGENTS.find((a) => a.id === agentId) || AGENTS[0]
	);

	// For demo purposes, we'll use the first agent if the ID doesn't match
	useEffect(() => {
		const foundAgent = AGENTS.find((a) => a.id === agentId);
		if (foundAgent) {
			setAgent(foundAgent);
		}
	}, [agentId]);

	return (
		<div className='p-8'>
			{/* Agent Header */}
			<div className='flex justify-between items-start mb-8'>
				<div className='flex items-start gap-5'>
					<div
						className={`${agent.iconColor} rounded-lg p-4 w-16 h-16 flex items-center justify-center`}>
						<FileText className='w-8 h-8 text-white' />
					</div>

					<div>
						<h1 className='text-2xl font-bold'>{agent.name}</h1>
						<p className='text-gray-500'>{agent.handle}</p>
						<p className='text-gray-600 mt-2 max-w-2xl'>
							This Agent will take notes during the meeting you allow them to
							join. It will present summaries, meeting outlines, and extract key
							action points, as well as schedule next meetings according to
							availability.
						</p>
					</div>
				</div>

				<Button className='bg-black hover:bg-gray-800 text-white'>
					Manage Agent
				</Button>
			</div>

			{/* Content Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{/* Upcoming Meetings */}
				<div className='bg-white rounded-lg border border-gray-200 p-5'>
					<h2 className='font-medium mb-4'>Upcoming</h2>

					<div className='space-y-4'>
						{UPCOMING_MEETINGS.map((meeting) => (
							<div
								key={meeting.id}
								className='border rounded-lg p-4'>
								{meeting.date.day > 0 && (
									<div className='flex items-start mb-2'>
										<div className='mr-4 text-center'>
											<div className='text-3xl font-bold'>
												{meeting.date.day}
											</div>
											<div className='text-xs text-red-500'>
												{meeting.date.label}
											</div>
											<div className='text-xs text-gray-500'>
												{meeting.date.month}
											</div>
										</div>
										<div>
											<div className='font-medium'>{meeting.title}</div>
											<div className='text-sm text-gray-500'>
												{meeting.timeStart} - {meeting.timeEnd}
											</div>
										</div>
									</div>
								)}
								{!meeting.date.day && (
									<div>
										<div className='font-medium'>{meeting.title}</div>
										<div className='text-sm text-gray-500'>
											{meeting.timeStart} - {meeting.timeEnd}
										</div>
									</div>
								)}
							</div>
						))}
					</div>

					<div className='mt-4 flex items-center justify-center'>
						<button className='flex items-center text-sm text-gray-500 hover:text-gray-700'>
							<MoreHorizontal className='w-4 h-4 mr-1' />
							Go to Calendar
						</button>
					</div>
				</div>

				{/* Ongoing Tasks */}
				<div className='bg-white rounded-lg border border-gray-200 p-5'>
					<h2 className='font-medium mb-4'>Ongoing Tasks</h2>

					<div className='space-y-4'>
						{ONGOING_TASKS.map((task) => (
							<div
								key={task.id}
								className='py-3'>
								<div className='font-medium'>{task.title}</div>
								<div className='text-xs text-gray-500 mb-2'>
									{task.estimatedDate}
								</div>
								<div className='h-1.5 bg-gray-200 rounded-full overflow-hidden'>
									<div
										className='h-full bg-black'
										style={{ width: `${task.progress}%` }}></div>
								</div>
							</div>
						))}
					</div>

					<div className='mt-4 flex items-center justify-center'>
						<button className='flex items-center text-sm text-gray-500 hover:text-gray-700'>
							<MoreHorizontal className='w-4 h-4 mr-1' />
							Go to Task Tracker
						</button>
					</div>
				</div>

				{/* All Tasks */}
				<div className='bg-white rounded-lg border border-gray-200 p-5'>
					<h2 className='font-medium mb-4'>All Tasks</h2>

					<div className='space-y-2'>
						{ALL_TASKS.map((task) => (
							<div
								key={task.id}
								className={`py-3 px-2 rounded ${
									task.isActive ? 'bg-gray-100' : ''
								}`}>
								<div className='font-medium'>{task.title}</div>
								<div className='text-xs text-gray-500'>
									{task.estimatedDate}
								</div>
							</div>
						))}
					</div>

					<div className='mt-4 flex items-center justify-center'>
						<button className='flex items-center text-sm text-gray-500 hover:text-gray-700'>
							<MoreHorizontal className='w-4 h-4 mr-1' />
							Go to Task Library
						</button>
					</div>
				</div>

				{/* Knowledge */}
				<div className='bg-white rounded-lg border border-gray-200 p-5'>
					<h2 className='font-medium mb-4'>Knowledge</h2>

					<div className='relative mb-4'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
						<input
							type='text'
							placeholder='Search'
							className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm'
						/>
					</div>

					<div className='space-y-2'>
						{KNOWLEDGE_ITEMS.map((item, index) => (
							<div
								key={item.id}
								className={`py-3 px-2 rounded flex items-center ${
									index === 0 ? 'bg-gray-100' : ''
								}`}>
								<FileText className='w-4 h-4 mr-2 text-gray-500' />
								<span>{item.title}</span>
							</div>
						))}
					</div>

					<div className='mt-4 flex items-center justify-center'>
						<button className='flex items-center text-sm text-gray-500 hover:text-gray-700'>
							<MoreHorizontal className='w-4 h-4 mr-1' />
							More Knowledge
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

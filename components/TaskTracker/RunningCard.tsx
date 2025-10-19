/** @format */

'use client';

// import RunningCard from '@/components/TaskTracker/RunningCard';
import type { FC } from 'react';

// Define the RunningCard component here since this file is RunningCard.tsx
interface RunningCardProps {
	key: string;
	title: string;
	date: string;
	status: string;
	progress: number;
}

const RunningCard: FC<RunningCardProps> = ({
	title,
	date,
	status,
	progress,
}) => (
	<div className='border p-2 rounded'>
		<div className='font-semibold'>{title}</div>
		<div className='text-xs text-gray-500'>{date}</div>
		<div className='text-xs'>{status}</div>
		<div className='w-full bg-gray-200 rounded-full h-2.5 mt-2'>
			<div
				className='bg-blue-600 h-2.5 rounded-full'
				style={{ width: `${progress}%` }}
			/>
		</div>
	</div>
);

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import EmptyState from '../../lib/isEmpty';

interface Task {
	id: string;
	title: string;
	scheduledTime: string;
	status: string;
	metaData?: {
		progress?: number;
	};
}

export default function RunningTasks() {
	const [runningTasks, setRunningTasks] = useState<Task[] | null>(null);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`
				);
				const data: Task[] = await res.json();
				// adjust this filter if your backend uses a different status for “in-progress”
				const running = data.filter(
					(t) => t.status === 'running' || t.status === 'in-progress'
				);
				setRunningTasks(running);
			} catch (err) {
				console.error('Failed to load running tasks', err);
				setRunningTasks([]); // treat error as empty
			}
		};
		fetchTasks();
	}, []);

	return (
		<div className='w-full max-w-sm mx-auto'>
			<Card className='border rounded-2xl shadow-sm'>
				<CardHeader className='flex items-center justify-between pb-2'>
					<CardTitle className='text-base font-medium'>Running</CardTitle>
					<Button
						variant='link'
						className='text-sm text-gray-500 p-0 h-auto'>
						View all
					</Button>
				</CardHeader>

				<CardContent className='space-y-3'>
					{runningTasks === null ? (
						<EmptyState message='Loading…' />
					) : runningTasks.length > 0 ? (
						runningTasks.map((task) => (
							<RunningCard
								key={task.id}
								title={task.title}
								date={new Date(task.scheduledTime).toLocaleDateString()}
								status={task.status}
								progress={task.metaData?.progress ?? 0}
							/>
						))
					) : (
						<EmptyState message='You have no running tasks.' />
					)}
				</CardContent>
			</Card>
		</div>
	);
}

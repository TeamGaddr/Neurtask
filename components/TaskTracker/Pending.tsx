/** @format */

// import React from "react"
// import TaskCard from "@/components/TaskTracker/PendingCard"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { pendingTasks } from "@/constants/TaskTracker/data"

// const PendingTasks: React.FC = () => {
//   return (
//     <div className=" w-full max-w-sm mx-auto">
//       <Card className="border rounded-2xl shadow-sm">
//         <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//           <CardTitle className="text-base font-medium">Pending</CardTitle>
//           <Button variant="link" className="text-sm font-normal text-gray-500 h-auto p-0">
//             View all
//           </Button>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {pendingTasks.map((task) => (
//             <TaskCard key={task.id} {...task} />
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default PendingTasks

'use client';

import TaskCard from '@/components/TaskTracker/PendingCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import EmptyState from '../../lib/isEmpty';

interface Task {
	id: string;
	title: string;
	scheduledTime: string;
	status: string;
}

export default function PendingTasks() {
	const [pendingTasks, setPendingTasks] = useState<Task[] | null>(null);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`
				);
				const data: Task[] = await res.json();
				setPendingTasks(data.filter((t) => t.status === 'pending'));
			} catch (err) {
				console.error('Failed to load tasks', err);
				setPendingTasks([]);
			}
		};
		fetchTasks();
	}, []);

	return (
		<div className='w-full max-w-sm mx-auto'>
			<Card className='border rounded-2xl shadow-sm'>
				<CardHeader className='flex items-center justify-between pb-2'>
					<CardTitle className='text-base font-medium'>Pending</CardTitle>
					<Button
						variant='link'
						className='text-sm text-gray-500 p-0 h-auto'>
						View all
					</Button>
				</CardHeader>
				<CardContent className='space-y-3'>
					{pendingTasks === null ? (
						<EmptyState message='Loading…' />
					) : pendingTasks.length > 0 ? (
						pendingTasks.map((task) => (
							<TaskCard
								key={task.id}
								title={task.title}
								date={new Date(task.scheduledTime).toLocaleDateString()}
								status={task.status}
								progress={0}
								id={0}
							/>
						))
					) : (
						<EmptyState message='You have no pending tasks.' />
					)}
				</CardContent>
			</Card>
		</div>
	);
}

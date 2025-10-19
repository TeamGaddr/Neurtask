/** @format */

// import React from "react"
// import FinishedTask from "@/components/TaskTracker/FinishedCard"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { FinishedTasks } from "@/constants/TaskTracker/data"

// const Finished: React.FC = () => {
//   return (
//     <div className=" w-full max-w-sm mx-auto">
//       <Card className="border rounded-2xl shadow-sm">
//         <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//           <CardTitle className="text-base font-medium">Finished</CardTitle>
//           <Button variant="link" className="text-sm font-normal text-gray-500 h-auto p-0">
//             View all
//           </Button>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {FinishedTasks.map((task) => (
//             <FinishedTask key={task.id} {...task} />
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default Finished
'use client';

import FinishedTask from '@/components/TaskTracker/FinishedCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import EmptyState from '../../lib/isEmpty';

interface Task {
	id: number;
	title: string;
	scheduledTime: string;
	status: string;
}

export default function Finished() {
	const [finishedTasks, setFinishedTasks] = useState<Task[] | null>(null);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`
				);
				const data: Task[] = await res.json();
				setFinishedTasks(data.filter((t) => t.status === 'completed'));
			} catch (err) {
				console.error('Failed to load tasks', err);
				setFinishedTasks([]); // treat error as no tasks
			}
		};
		fetchTasks();
	}, []);

	return (
		<div className='w-full max-w-sm mx-auto'>
			<Card className='border rounded-2xl shadow-sm'>
				<CardHeader className='flex items-center justify-between pb-2'>
					<CardTitle className='text-base font-medium'>Finished</CardTitle>
					<Button
						variant='link'
						className='text-sm text-gray-500 p-0 h-auto'>
						View all
					</Button>
				</CardHeader>
				<CardContent className='space-y-3'>
					{finishedTasks === null ? (
						<EmptyState message='Loading…' />
					) : finishedTasks.length > 0 ? (
						finishedTasks.map((task) => (
							<FinishedTask
								key={task.id}
								id={task.id}
								title={task.title}
								date={new Date(task.scheduledTime).toLocaleDateString()}
								status={task.status}
								progress={100}
							/>
						))
					) : (
						<EmptyState message='You have no finished tasks.' />
					)}
				</CardContent>
			</Card>
		</div>
	);
}

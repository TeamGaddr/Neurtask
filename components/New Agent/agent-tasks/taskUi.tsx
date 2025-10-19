/** @format */

// /** @format */

// 'use client';

// import AgentHeader from '@/components/Core/agent/AgentHeader';
// import { Button } from '@/components/ui/button';
// import { tasks as initialTasks } from '@/constants/localData/data';
// import {
// 	ClipboardIcon,
// 	FileTextIcon,
// 	PlusIcon,
// 	Trash2Icon,
// } from 'lucide-react';
// import { useState } from 'react';

// export default function TaskUI() {
// 	const [tasks, setTasks] = useState(initialTasks);

// 	const deleteTask = (id: number) => {
// 		setTasks(tasks.filter((task) => task.id !== id));
// 	};

// 	return (
// 		<div>
// 			<AgentHeader />
// 			<div className='px-6 py-2 space-y-6'>
// 				<div className='space-y-2'>
// 					<div className='flex justify-between items-center'>
// 						<h2 className='text-lg font-semibold text-gray-900'>Tasks</h2>
// 						<Button
// 							variant='outline'
// 							size='sm'
// 							className='h-8 gap-2 text-sm font-medium border-gray-300 hover:bg-gray-50'>
// 							<PlusIcon className='h-4 w-4' /> Create Task
// 						</Button>
// 					</div>
// 					<p className='text-sm text-gray-500'>
// 						Add tasks to let your Agent know how to help you and in which
// 						situations.
// 					</p>
// 				</div>

// 				{/* Task List Section */}
// 				<div className='border border-gray-200 rounded-lg p-6'>
// 					{/* Description Section */}
// 					<div className='flex flex-col items-center justify-center text-center mb-8'>
// 						<div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3'>
// 							<ClipboardIcon className='h-6 w-6 text-gray-400' />
// 						</div>
// 						<p className='text-sm text-gray-500 max-w-xs leading-relaxed'>
// 							Browse through your Tasks. Add them as prompts for your Agent to
// 							perform.
// 						</p>
// 					</div>

// 					{/* Task List with Borders */}
// 					<div className='border-t border-b border-gray-200 divide-y divide-gray-200'>
// 						{tasks.map((task) => (
// 							<div
// 								key={task.id}
// 								className='flex items-center justify-between py-4'>
// 								<div className='flex items-center gap-3'>
// 									<FileTextIcon className='h-4 w-4 text-gray-400' />
// 									<span className='text-sm text-gray-700'>{task.title}</span>
// 								</div>
// 								<button
// 									className='h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors'
// 									onClick={() => deleteTask(task.id)}>
// 									<Trash2Icon className='h-4 w-4' />
// 								</button>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

/** @format */

'use client';

import AgentHeader from '@/components/Core/agent/AgentHeader';
import { Button } from '@/components/ui/button';
import { ClipboardIcon, PlusIcon, Trash2Icon, X, File } from 'lucide-react';
import React, { useState } from 'react';

interface AgentData {
	name: string;
	agentTasks?: string[];
}

interface Props {
	data: AgentData;
	setData: (upd: AgentData) => void;
}

export default function TaskForm({ data, setData }: Props) {
	const handle =
		data.name && data.name.trim().length > 0
			? '@' + data.name.toLowerCase().trim().replace(/\s+/g, '')
			: '@yourhandle';

	const [input, setInput] = useState('');
	const [showForm, setShowForm] = useState(false);

	const addTask = () => {
		const trimmed = input.trim();
		if (!trimmed) return;
		setData({
			...data,
			agentTasks: [...(data.agentTasks || []), trimmed],
		});
		setInput('');
	};

	const deleteTask = (idx: number) => {
		setData({
			...data,
			agentTasks: (data.agentTasks || []).filter((_, i) => i !== idx),
		});
	};

	const tasks = data.agentTasks || [];

	const toggleForm = () => {
		setShowForm(() => !showForm)
	}

	return (
		<div>
			<AgentHeader
				agentName={data.name}
				agentHandle={handle}
				onNameChange={(newName) => setData({ ...data, name: newName })}
			/>

			<div className='px-6 py-2 space-y-6'>
				{/* Header and Add */}
				{!showForm ? (
					<div className='flex flex-col items-end mr-20'>

						<Button
							variant='outline'
							size='sm'
							className='h-14 w-14 p-0 rounded-xl bg-[#292929] border-black hover:bg-gray-700 hover:border-gray-800'
							onClick={toggleForm}>
							<PlusIcon className='h-8 w-8 text-white' />
						</Button>
						<span className='text-xs'>Create Task</span>
					</div>
				) : (
					<div className='flex flex-col items-end mr-20'>
						<Button
							variant='outline'
							size='sm'
							className='h-14 w-14 p-0 rounded-xl bg-[#292929] border-black hover:bg-gray-700 hover:border-gray-800'
							onClick={toggleForm}>
							<X className='h-6 w-6 text-white' />
						</Button>
						<span className='text-xs'>Hide form</span>
					</div>
				)}

				{
					showForm ?
						(<div className='flex justify-evenly items-center'>
							<h2 className='text-lg font-semibold text-gray-900'>Tasks</h2>
							<div className='flex gap-2'>
								<select
									value={input}
									onChange={(e) => setInput(e.target.value)}
									className="w-[500px] px-3 py-2 border rounded-md focus:ring-2 focus:ring-gray-200"
								>
									<option value="" disabled>Please select a task</option>
									<option value="Join Meeting">Join Meeting</option>
									<option value="Record Meeting">Record Meeting</option>
									<option value="Summarize Meeting">Summarize Meeting</option>
								</select>
								<Button
									variant='outline'
									size='sm'
									className="h-10 gap-2 text-sm font-medium text-white bg-black border border-black"
									onClick={addTask}>
									<PlusIcon className='h-4 w-4' /> Add Task
								</Button>
							</div>
						</div>)
						: ""
				}

				<p className='text-sm text-gray-500'>
					Add tasks to let your Agent know how to help you and in which
					situations.
				</p>

				{/* Content */}
				<div className='border border-gray-200 rounded-lg p-6'>

					<div className='flex flex-col items-center justify-center text-center gap-4 py-8'>
						<div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3'>
							<ClipboardIcon className='h-8 w-8 text-gray-400' />
						</div>
						<p className='text-sm text-gray-500 max-w-xs leading-relaxed'>
							Browse through your Tasks. Add them as prompts for your Agent to
							perform.
						</p>
					</div>

					<div className='space-y-2'>
						{tasks.map((t, i) => (
							<div
								key={i}
								// className="flex items-center justify-between py-3 px-4 border-t border-b border-gray-300"
								className="flex items-center justify-between py-3 px-4 border-t-[3px] border-b-[3px] border-gray-200 font-semibold"
							>
								<div className="flex items-center gap-4">
									<File />
									<span className='text-gray-700 font-normal'>{t}</span>
								</div>

								<Button
									variant='ghost'
									size='sm'
									className='h-8 w-8 p-0 text-gray-500 hover:text-gray-700'
									onClick={() => deleteTask(i)}>
									<Trash2Icon className='h-4 w-4' />
								</Button>
							</div>
						))}
					</div>

				</div>
			</div>
		</div>
	);
}

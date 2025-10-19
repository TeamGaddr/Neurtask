/** @format */

// /** @format */

// 'use client';

// import { Button } from '@/components/ui/button';
// import { Plus } from 'lucide-react';

// interface AgentHeaderProps {
// 	onAddAgent: () => void;
// }

// export function AgentHeader({ onAddAgent }: AgentHeaderProps) {
// 	return (
// 		<div className='mb-6 md:mb-8'>
// 			<div className='flex flex-wrap justify-between items-start gap-4 mb-2'>
// 				<h1 className='text-xl md:text-2xl font-bold'>Manage Agents</h1>
// 				<Button
// 					onClick={onAddAgent}
// 					className='bg-black hover:bg-gray-800 text-white'>
// 					<Plus className='mr-1 h-4 w-4' />
// 					<span className='hidden sm:inline'>Add agent</span>
// 					<span className='sm:hidden'>Add</span>
// 				</Button>
// 			</div>
// 			<p className='text-sm md:text-base text-gray-600'>
// 				Browse and create AI Agents that will help you with your tasks.
// 				<span className='hidden md:inline'>
// 					<br />
// 					Give them instructions, add knowledge and let them know how to help
// 					you.
// 				</span>
// 			</p>
// 		</div>
// 	);
// }

/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AgentHeaderProps {
	onAddAgent: () => void;
}

export function AgentHeader({ onAddAgent }: AgentHeaderProps) {
	return (
		<div className='mb-8'>
			<div className='flex justify-between items-start gap-4 mb-3'>
				<div>
					<h1 className='text-2xl font-bold text-gray-900 mb-2'>
						Manage Agents
					</h1>
					<p className='text-gray-600 leading-relaxed max-w-2xl'>
						Browse and create AI Agents that will help you with your tasks.
						<br />
						Give them instructions, add knowledge and let them know how to help
						you.
					</p>
				</div>
				<Button
					onClick={onAddAgent}
					className='bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 whitespace-nowrap'>
					<Plus className='h-4 w-4' />
					Add agent
				</Button>
			</div>
		</div>
	);
}

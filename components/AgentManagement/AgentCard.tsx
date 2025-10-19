/** @format */

// /** @format */

// 'use client';

// import type React from 'react';

// import { Switch } from '@/components/ui/switch';
// import { Agent } from '@/constants/agentData/data';
// import { FileText } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// interface AgentCardProps {
// 	agent: Agent;
// 	onToggle: (id: string, enabled: boolean) => void;
// }

// export function AgentCard({ agent, onToggle }: AgentCardProps) {
// 	const router = useRouter();

// 	const handleCardClick = () => {
// 		router.push(`/manage-agents/${agent.id}`);
// 	};

// 	const handleToggleClick = (e: React.MouseEvent) => {
// 		e.stopPropagation();
// 	};

// 	return (
// 		<div
// 			onClick={handleCardClick}
// 			className='bg-white rounded-lg border border-gray-200 p-4 md:p-5 hover:shadow-md transition-shadow cursor-pointer'>
// 			<div className='flex justify-between items-start mb-3 md:mb-4'>
// 				<div className='flex items-start gap-2 md:gap-3'>
// 					<div className={`${agent.iconColor} rounded-md p-2 text-white`}>
// 						<FileText
// 							size={18}
// 							className='md:w-5 md:h-5'
// 						/>
// 					</div>
// 					<div>
// 						<h3 className='font-medium text-sm md:text-base'>{agent.name}</h3>
// 						<p className='text-xs md:text-sm text-gray-500'>{agent.handle}</p>
// 					</div>
// 				</div>
// 				<div onClick={handleToggleClick}>
// 					<Switch
// 						checked={agent.isEnabled}
// 						onCheckedChange={(checked) => onToggle(agent.id, checked)}
// 						className='data-[state=checked]:bg-green-500'
// 					/>
// 				</div>
// 			</div>

// 			<p className='text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2'>
// 				{agent.description}
// 			</p>

// 			<div className='h-1.5 bg-gray-200 rounded-full overflow-hidden'>
// 				<div
// 					className={`h-full ${agent.progressColor}`}
// 					style={{ width: `${agent.progressValue}%` }}></div>
// 			</div>
// 		</div>
// 	);
// }

/** @format */

'use client';

import type React from 'react';

import { Switch } from '@/components/ui/switch';
import { Agent } from '@/constants/agentData/data';
import { FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AgentCardProps {
	agent: Agent;
	onToggle: (id: string, enabled: boolean) => void;
}

export function AgentCard({ agent, onToggle }: AgentCardProps) {
	const router = useRouter();

	const handleCardClick = () => {
		router.push(`/manage-agents/${agent.id}`);
	};

	const handleToggleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<div
			onClick={handleCardClick}
			className='bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow cursor-pointer'>
			<div className='flex justify-between items-start mb-4'>
				<div className='flex items-start gap-3'>
					<div className={`${agent.iconColor} rounded-lg p-3 text-white`}>
						<FileText size={20} />
					</div>
					<div>
						<h3 className='font-semibold text-base text-gray-900'>
							{agent.name}
						</h3>
						<p className='text-sm text-gray-500'>{agent.handle}</p>
					</div>
				</div>
				<div onClick={handleToggleClick}>
					<Switch
						checked={agent.isEnabled}
						onCheckedChange={(checked) => onToggle(agent.id, checked)}
						className='data-[state=checked]:bg-green-500'
					/>
				</div>
			</div>
             
			{Array.isArray(agent.description) ? (
  <div className='text-sm text-gray-600 mb-4 leading-relaxed space-y-1'>
    {agent.description.map((line, index) => (
      <p key={index}>{line}</p>
    ))}
  </div>
) : (
  <p className='text-sm text-gray-600 mb-4 leading-relaxed'>
    {agent.description}
  </p>
)}

			<div className='h-2 bg-gray-100 rounded-full overflow-hidden'>
				<div
					className={`h-full ${agent.progressColor} transition-all duration-300`}
					style={{ width: `${agent.progressValue}%` }}></div>
			</div>
		</div>
	);
}

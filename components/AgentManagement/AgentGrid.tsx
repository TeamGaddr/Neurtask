/** @format */

// /** @format */

// 'use client';

// import type { Agent } from '@/constants/agentData/data';
// import { AgentCard } from './AgentCard';

// interface AgentGridProps {
// 	agents: Agent[];
// 	onToggleAgent: (id: string, enabled: boolean) => void;
// }

// export function AgentGrid({ agents, onToggleAgent }: AgentGridProps) {
// 	return (
// 		<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
// 			{agents.map((agent) => (
// 				<AgentCard
// 					key={agent.id}
// 					agent={agent}
// 					onToggle={onToggleAgent}
// 				/>
// 			))}
// 		</div>
// 	);
// }

/** @format */

'use client';

import type { Agent } from '@/constants/agentData/data';
import { AgentCard } from './AgentCard';

interface AgentGridProps {
	agents: Agent[];
	onToggleAgent: (id: string, enabled: boolean) => void;
}

export function AgentGrid({ agents, onToggleAgent }: AgentGridProps) {
	console.log("Rendering agents:", agents.map(a => a.id)); // 👈 Add this line
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
			{agents.map((agent) => (
				<AgentCard
					 key={agent.id}
					 agent={agent}
					 onToggle={onToggleAgent}
				/>
			))}
		</div>
	);
}

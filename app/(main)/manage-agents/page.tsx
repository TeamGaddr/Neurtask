/** @format */

// /** @format */

// 'use client';

// import { AgentGrid } from '@/components/AgentManagemnt/AgentGrid';
// import { AgentHeader } from '@/components/AgentManagemnt/AgentHeader';
// import { Agent, AGENTS } from '@/constants/agentData/data';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function AgentsPage() {
// 	const [agents, setAgents] = useState<Agent[]>(AGENTS);
// 	const router = useRouter();

// 	const handleToggleAgent = (id: string, enabled: boolean) => {
// 		const updatedAgents = agents.map((agent) =>
// 			agent.id === id ? { ...agent, isEnabled: enabled } : agent
// 		);
// 		setAgents(updatedAgents);
// 	};

// 	const handleAddAgent = () => {
// 		router.push(`/NewAgent`);
// 	};

// 	return (
// 		<div className='p-4 md:p-8 max-w-6xl mx-auto'>
// 			<AgentHeader onAddAgent={handleAddAgent} />
// 			<AgentGrid
// 				agents={agents}
// 				onToggleAgent={handleToggleAgent}
// 			/>
// 		</div>
// 	);
// }

/** @format */

'use client';

import { AgentGrid } from '@/components/AgentManagement/AgentGrid';
import { AgentHeader } from '@/components/AgentManagement/AgentHeader';
import { Button } from '@/components/ui/button';
import type { Agent } from '@/constants/agentData/data';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export default function AgentsPage() {
	const [agents, setAgents] = useState<Agent[]>([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const fetchAgents = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${API_BASE}/api/agents`, {
				credentials: 'include',
			});
			if (!res.ok) throw new Error('Failed to load agents');

			const dataFromApi = await res.json();

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const mappedAgents = dataFromApi.map((agent: any) => ({
				...agent,
				id: agent._id,
			}));

			console.log('Mapped agents:', mappedAgents);
			setAgents(mappedAgents);
		} catch (err) {
			toast({
				variant: 'error',
				title: 'Load Error',
				description:
					err instanceof Error ? err.message : 'Something went wrong',
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAgents();
	}, []);

	const handleToggleAgent = async (id: string, enabled: boolean) => {
		// Optimistic UI
		setAgents((prev) =>
			prev.map((a) => (a.id === id ? { ...a, isEnabled: enabled } : a))
		);

		try {
			const res = await fetch(`${API_BASE}/api/agents/${id}`, {

				method: 'PUT',

				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ isEnabled: enabled }),
			});
			if (!res.ok) throw new Error('Failed to update agent');

			const updated: Agent = await res.json();
			setAgents((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
		} catch (err) {
			setAgents((prev) =>
				prev.map((a) => (a.id === id ? { ...a, isEnabled: !enabled } : a))
			);
			toast({
				variant: 'error',
				title: 'Update Error',
				description:
					err instanceof Error ? err.message : 'Something went wrong',
			});
		}
	};

	const handleAddAgent = () => {
		router.push('/NewAgent');
	};

	// Render
	return (
		<div className='p-4 md:p-8 max-w-6xl mx-auto'>
			<AgentHeader onAddAgent={handleAddAgent} />

			{loading ? (
				<p className='text-center py-12 text-gray-500'>Loading agents…</p>
			) : agents.length === 0 ? (
				<div className='flex flex-col items-center justify-center py-20 space-y-6'>
					<Image
						src='/no-agents.svg'
						alt='No agents'
						width={128}
						height={128}
						className='w-32 h-32 opacity-50'
					/>
					<p className='text-gray-500 text-lg'>
						You haven’t created any agents yet.
					</p>
					<Button
						onClick={handleAddAgent}
						className='px-6'>
						Create Your First Agent
					</Button>
				</div>
			) : (
				<AgentGrid
					agents={agents}
					onToggleAgent={handleToggleAgent}
				/>
			)}
		</div>
	);
}

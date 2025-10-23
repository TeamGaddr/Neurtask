/** @format */

'use client';

import AgentNavigationTabs from '@/components/Core/agent/AgentsNavTabs';
import AgentForm from '@/components/New Agent/agent-general/agentForm';
import ModelSelection from '@/components/New Agent/agent-general/ModelSelection';
import KnowledgeUI from '@/components/New Agent/agent-knowledge/knowledgeUi';
import PermissionUi from '@/components/New Agent/agent-permissions/permissionUi';
import TaskUI from '@/components/New Agent/agent-tasks/taskUi';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const AgentSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required'),
	category: z.string().min(1, 'Category is required'),
	generalInstruction: z.string().min(1, 'Instruction is required'),
	defaultModel: z.string().optional(),
	agentTasks: z.array(z.string()).optional(),
	knowledgeBase: z.object({ files: z.array(z.string()) }).optional(),
	googleDriveEnabled: z.boolean().optional(),
	googleMeetEnabled: z.boolean().optional(),
	googleCalendarEnabled: z.boolean().optional(),
});
type AgentCreateData = z.infer<typeof AgentSchema>;

export default function Page() {
	const [currentStep, setCurrentStep] = useState(0);
	const [data, setData] = useState<AgentCreateData>({
		name: '',
		description: '',
		category: '',
		generalInstruction: '',
	});
	const [errors, setErrors] = useState<
		Partial<Record<keyof AgentCreateData, string>>
	>({});
	const [loading, setLoading] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const refs = {
		name: useRef<HTMLInputElement>(null),
		description: useRef<HTMLTextAreaElement>(null),
		category: useRef<HTMLInputElement>(null),
		generalInstruction: useRef<HTMLTextAreaElement>(null),
	};

	useEffect(() => {
		const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
		checkIfMobile();
		window.addEventListener('resize', checkIfMobile);
		return () => window.removeEventListener('resize', checkIfMobile);
	}, []);

	const handleValidate = (): boolean => {
		const result = AgentSchema.safeParse(data);
		if (result.success) {
			setErrors({});
			return true;
		}
		const fieldErrs = result.error.flatten().fieldErrors;
		const newErrs: typeof errors = {};
		for (const key of Object.keys(fieldErrs) as (keyof AgentCreateData)[]) {
			if (fieldErrs[key]?.[0]) newErrs[key] = fieldErrs[key]![0];
		}
		setErrors(newErrs);
		const firstMsg = Object.values(newErrs)[0];
		if (firstMsg) {
			toast({
				variant: 'error',
				title: 'Validation Error',
				description: firstMsg,
			});
		}
		return false;
	};

	const steps = [
		<div key='general'>
			<AgentForm
				data={data}
				setData={setData}
				errors={errors}
			/>
			<ModelSelection
				data={data}
				setData={(upd) => setData((prev) => ({ ...prev, ...upd }))}
			/>
		</div>,
		<KnowledgeUI
			key='knowledge'
			data={data}
			setData={(upd) => setData((prev) => ({ ...prev, ...upd }))}
		/>,
		<TaskUI
			key='tasks'
			data={data}
			setData={(upd) => setData((prev) => ({ ...prev, ...upd }))}
		/>,
		<PermissionUi
			key='permissions'
			data={data}
			setData={(upd) => setData((prev) => ({ ...prev, ...upd }))}
		/>,
	];

	const isLast = currentStep === steps.length - 1;

	// 6. Next / Submit handler
	const handleNext = async () => {
		// Final step: Submit General tab data on last step only
		if (isLast) {
			const isValid = handleValidate();
			if (!isValid) {
				for (const key of [
					'name',
					'description',
					'category',
					'generalInstruction',
				] as const) {
					if (!data[key]) {
						refs[key].current?.focus();
						break;
					}
				}
				return;
			}

			setLoading(true);
			try {
				const res = await fetch(`${API_BASE}/api/agents`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify(data),
				});
				const body = await res.json();
				if (!res.ok) throw new Error(body.message || 'Failed to create agent');

				toast({
					variant: 'success',
					title: 'Agent Created',
					description: `“${body.name}” is now available.`,
				});

				// router.push(`/agents/${body._id}`); // or another success page
			} catch (err) {
				toast({
					variant: 'error',
					title: 'Creation Error',
					description:
						err instanceof Error ? err.message : 'Something went wrong',
				});
			} finally {
				setLoading(false);
			}
			return;
		}

		// Not last step: just go to the next
		setCurrentStep((s) => s + 1);
	};

	// 7. Render
	return (
		<div className='h-screen flex flex-col px-4 pt-5'>
			{isMobile ? (
				<>
					<AgentNavigationTabs
						currentStep={currentStep}
						setCurrentStep={setCurrentStep}
					/>
					<div className='mt-4 flex-1'>{steps[currentStep]}</div>
					<div className='w-full mt-4 flex justify-end'>
						<Button
							onClick={handleNext}
							disabled={loading}
							className={`px-6 w-[8rem] py-2 text-sm font-medium rounded-lg transition-all ${
								loading
									? 'bg-gray-300 text-gray-500'
									: 'bg-black text-white hover:bg-gray-800'
							}`}>
							{loading
								? isLast
									? 'Creating…'
									: 'Loading…'
								: isLast
								? 'Create'
								: 'Next'}
						</Button>
					</div>
				</>
			) : (
				<div className='flex flex-row px-10 pt-5 flex-1'>
					<div className='flex-1 pr-6'>{steps[currentStep]}</div>
					<div className='w-[20%] pr-6'>
						<AgentNavigationTabs
							currentStep={currentStep}
							setCurrentStep={setCurrentStep}
						/>
					</div>
					<div className='w-[10%] flex flex-col justify-end pb-5'>
						<Button
							onClick={handleNext}
							disabled={loading}
							className={`px-6 w-full py-2 text-sm font-medium rounded-lg transition-all ${
								loading
									? 'bg-gray-300 text-gray-500'
									: 'bg-black text-white hover:bg-gray-800'
							}`}>
							{loading
								? isLast
									? 'Creating…'
									: 'Loading…'
								: isLast
								? 'Create'
								: 'Next'}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

/** @format */

export interface Meeting {
	id: string;
	title: string;
	date: {
		day: number;
		label: string;
		month: string;
	};
	timeStart: string;
	timeEnd: string;
}

export interface Task {
	id: string;
	title: string;
	estimatedDate: string;
	progress: number;
	isActive?: boolean;
}

export interface KnowledgeItem {
	id: string;
	title: string;
}

export const UPCOMING_MEETINGS: Meeting[] = [
	{
		id: 'meeting-1',
		title: 'Workshop Design Team',
		date: {
			day: 5,
			label: 'Today',
			month: 'February',
		},
		timeStart: '15:00',
		timeEnd: '16:00',
	},
	{
		id: 'meeting-2',
		title: 'Workshop Design Team',
		date: {
			day: 6,
			label: 'Tomorrow',
			month: 'February',
		},
		timeStart: '15:00',
		timeEnd: '16:00',
	},
	{
		id: 'meeting-3',
		title: 'Workshop Design Team',
		date: {
			day: 0, // No day shown for this one
			label: '',
			month: '',
		},
		timeStart: '15:00',
		timeEnd: '16:00',
	},
];

export const ONGOING_TASKS: Task[] = [
	{
		id: 'task-1',
		title: 'Summarize Meeting',
		estimatedDate: 'Estimated 12.12.2024, 19:49',
		progress: 90,
	},
	{
		id: 'task-2',
		title: 'Summarize Meeting',
		estimatedDate: 'Estimated 12.12.2024, 19:49',
		progress: 95,
	},
];

export const ALL_TASKS: Task[] = [
	{
		id: 'task-3',
		title: 'Summarize Meeting',
		estimatedDate: 'Estimated 12.12.2024, 19:49',
		progress: 0,
	},
	{
		id: 'task-4',
		title: 'Summarize Meeting',
		estimatedDate: 'Estimated 12.12.2024, 19:49',
		progress: 0,
		isActive: true,
	},
	{
		id: 'task-5',
		title: 'Summarize Meeting',
		estimatedDate: 'Estimated 12.12.2024, 19:49',
		progress: 0,
	},
	{
		id: 'task-6',
		title: 'Summarize Meeting',
		estimatedDate: 'Estimated 12.12.2024, 19:49',
		progress: 0,
	},
];

export const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
	{ id: 'knowledge-1', title: 'Notes Standards' },
	{ id: 'knowledge-2', title: 'Notes Standards' },
	{ id: 'knowledge-3', title: 'Notes Standards' },
	{ id: 'knowledge-4', title: 'Notes Standards' },
];

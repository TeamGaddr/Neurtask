/** @format */

export interface User {
	id: number;
	name: string;
	role: string;
	avatar: string;
	canEdit: boolean;
}

export const users: User[] = [
	{
		id: 1,
		name: 'Everyone',
		role: 'Can view',
		avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
		canEdit: true,
	},
	{
		id: 2,
		name: 'Claire Fontaine',
		role: 'Can edit',
		avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
		canEdit: true,
	},
	{
		id: 3,
		name: 'John Smith',
		role: 'Owner',
		avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
		canEdit: false,
	},
];

export interface Task {
	id: number;
	title: string;
}

export const tasks: Task[] = [
	{ id: 1, title: 'Summarize Meeting' },
	{ id: 2, title: 'Record meeting' },
	{ id: 3, title: 'Schedule follow-up meeting' },
];

export interface Model {
	id: string;
	name: string;
	description: string;
}

export const models: Model[] = [
	{
		id: 'auto',
		name: 'Auto',
		description: 'Automatically choose the best model for the task.',
	},
	{
		id: 'claude',
		name: 'Claude 3.5 Sonnet',
		description: 'Best overall speed, cost, and quality.',
	},
	{
		id: 'gpt4o',
		name: 'GPT-4o Mini',
		description: 'Cheap, fast, but not as smart. Best used for simple tasks.',
	},
	{
		id: 'gpt4t',
		name: 'GPT-4 Turbo',
		description: 'Best reasoning skills, but more expensive.',
	},
];

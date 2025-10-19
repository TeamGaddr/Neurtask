/** @format */

// import { progress } from "framer-motion";

export interface AgentData {
	id: string;
	name: string;
	handle: string;
	icon: string;
	description: string;
}

export interface AgentMemory {
	id: string;
	content: string;
	isEnabled: boolean;
}

export interface AgentSettings {
	allowWorkspaceContent: boolean;
	searchWeb: boolean;
}

export const AGENT_DATA: AgentData = {
	id: 'notetaker-1',
	name: 'The Notetaker',
	handle: '@notetaker',
	icon: 'pencil',
	description:
		'Add integrations, files and assets to give your Assistant knowledge over specific topics',
};

export const AGENT_MEMORIES: AgentMemory[] = [
	{
		id: 'memory-1',
		content: 'Meetings are always Mondays and Fridays at 9:15.',
		isEnabled: true,
	},
	{
		id: 'memory-2',
		content:
			'At the end of the meeting, summaries are posted on the general chat.',
		isEnabled: true,
	},
];

export const AGENT_SETTINGS: AgentSettings = {
	allowWorkspaceContent: false,
	searchWeb: false,
};

export const NAVIGATION_TABS = [
	{ id: 'general', label: 'General', isActive: true },
	{ id: 'knowledge', label: 'Knowledge' },
	{ id: 'tasks', label: 'Tasks' },
	{ id: 'permissions', label: 'Permissions' },
];

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

export interface Agent {
	id: string;
	name: string;
	handle: string;
	description: string;
	isEnabled: boolean;
	iconColor: string;
	progressColor: string;
	progressValue: number;
}

export interface AgentCategory {
	id: string;
	name: string;
	count?: number;
}

export const AGENTS: Agent[] = [
	{
		id: 'agent-1',
		name: 'The Notetaker',
		handle: '@notetaker',
		description:
			'This Agent will take notes during the meeting you allow them to join.',
		isEnabled: true,
		iconColor: 'bg-red-500',
		progressColor: 'bg-red-500',
		progressValue: 65,
	},
	{
		id: 'agent-2',
		name: 'The Video Maker',
		handle: '@video-maker',
		description:
			'This Agent will create videos from the meeting recordings you allow them to join.',
		isEnabled: true,
		iconColor: 'bg-cyan-600',
		progressColor: 'bg-cyan-500',
		progressValue: 35,
	},
];

export const AGENT_FILTERS = [
	{ id: 'all', name: 'All Agents', isActive: true },
	{ id: 'shared', name: 'Shared with me', isActive: false },
	{ id: 'recent', name: 'Recent', isActive: false },
];

export const AGENT_CATEGORIES: AgentCategory[] = [
	{ id: 'sales', name: 'Sales', count: 3 },
	{ id: 'meeting', name: 'Meeting', count: 5 },
	{ id: 'emails', name: 'Emails', count: 2 },
	{ id: 'hr', name: 'HR', count: 1 },
];

export const ONGOING_TASKS = [
	{ title: 'Summarize Meeting', date: '12.12.2024, 19:49', progress: 70 },
	{ title: 'Summarize Meeting', date: '12.12.2024, 19:49', progress: 40 },
];

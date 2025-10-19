/** @format */

// Types
export interface Notification {
	id: string;
	title: string;
	description: string;
	timestamp: string;
	isRead: boolean;
	type: 'note' | 'meeting' | 'task' | 'alert';
}

export const NOTIFICATIONS: Notification[] = [
	{
		id: 'notif-1',
		title: 'Note-taking Completed',
		description:
			'The task scheduled for the Meeting "Design Sync" at 11:00 today has been completed and the summary was sent to the participants.',
		timestamp: '10 min ago',
		isRead: false,
		type: 'note',
	},
	{
		id: 'notif-2',
		title: 'Note-taking Completed',
		description:
			'The task scheduled for the Meeting "Design Sync" at 11:00 today has been completed and the summary was sent to the participants.',
		timestamp: '10 min ago',
		isRead: false,
		type: 'note',
	},
	{
		id: 'notif-3',
		title: 'Note-taking Completed',
		description:
			'The task scheduled for the Meeting "Design Sync" at 11:00 today has been completed and the summary was sent to the participants.',
		timestamp: '10 min ago',
		isRead: true,
		type: 'note',
	},
	{
		id: 'notif-4',
		title: 'Note-taking Completed',
		description:
			'The task scheduled for the Meeting "Design Sync" at 11:00 today has been completed and the summary was sent to the participants.',
		timestamp: '10 min ago',
		isRead: true,
		type: 'note',
	},
];

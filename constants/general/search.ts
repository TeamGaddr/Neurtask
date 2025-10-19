/** @format */

export interface RecentSearch {
	id: string;
	title: string;
	lastModified: string;
	type: 'document' | 'meeting' | 'pdf';
}

export interface SuggestedItem {
	id: string;
	title: string;
}

// Mock data
export const RECENT_SEARCHES: RecentSearch[] = [
	{
		id: 'search-1',
		title: 'Reach out meeting participants',
		lastModified: 'Last modified 12.12.2024, 19:49',
		type: 'meeting',
	},
	{
		id: 'search-2',
		title: 'Record Meeting',
		lastModified: 'Last modified 12.12.2024, 19:49',
		type: 'meeting',
	},
	{
		id: 'search-3',
		title: 'Meeting Summaries 2024.pdf',
		lastModified: 'Last modified 12.12.2024, 19:49',
		type: 'pdf',
	},
];

export const SUGGESTED_ITEMS: SuggestedItem[] = [
	{ id: 'suggested-1', title: 'Notes Standards' },
	{ id: 'suggested-2', title: 'Meeting Templates' },
	{ id: 'suggested-3', title: 'Project Guidelines' },
	{ id: 'suggested-4', title: 'Team Documentation' },
];

// Filter options
export const FILTER_OPTIONS = {
	types: ['All Types', 'Documents', 'Meetings', 'PDFs'],
	categories: ['All Categories', 'Work', 'Personal', 'Projects'],
	agents: ['All Agents', 'AI Assistant', 'Human', 'System'],
	dates: ['All Time', 'Today', 'This Week', 'This Month', 'This Year'],
};

/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { AGENTS } from '@/constants/agentData/data';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
// import { NotificationPopover } from './NotificationPopover';
// import { SearchDialog } from './SearchPanel';

const NAVIGATION_MAP: Record<string, { label: string; parent: string | null }> =
	{
		'/': { label: 'Dashboard', parent: null },
		'/agents': { label: 'Agents', parent: null },
		'/knowledge': { label: 'Knowledge', parent: null },
		// '/tasks': { label: 'Tasks', parent: null },
		// '/tasks/library': { label: 'Task Library', parent: '/tasks' },
		// '/tasks/tracker': { label: 'Task Tracker', parent: '/tasks' },
		'/meetings': { label: 'Meetings', parent: null },
		'/integrations': { label: 'Integrations', parent: null },
	};

// Function to format text (adds spacing and capitalizes words)
const formatBreadcrumb = (text: string) => {
	return text
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/-|_/g, ' ')
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export function Header() {
	const pathname = usePathname();

	const breadcrumbs = useMemo(() => {
		const pathSegments = pathname?.split('/').filter(Boolean);
		if (pathSegments?.length === 0) {
			return [{ label: 'Dashboard', path: '/' }];
		}

		let currentPath = '';
		const crumbs = [];

		if (pathSegments?.length > 0) {
			currentPath = `/${pathSegments[0]}`;
			const navItem = NAVIGATION_MAP[currentPath];

			if (navItem) {
				crumbs.push({ label: navItem.label, path: currentPath });
			} else {
				crumbs.push({
					label: formatBreadcrumb(pathSegments[0]),
					path: currentPath,
				});
			}
		}

		for (let i = 1; i < pathSegments.length; i++) {
			const prevPath = currentPath;
			currentPath = `${currentPath}/${pathSegments[i]}`;
			const navItem = NAVIGATION_MAP[currentPath];

			if (navItem) {
				crumbs.push({ label: navItem.label, path: currentPath });
			} else {
				if (prevPath === '/agents') {
					const agentId = pathSegments[i];
					const agent = AGENTS.find((a) => a.id === agentId);
					if (agent) {
						crumbs.push({ label: agent.name, path: currentPath });
						continue;
					}
				}
				crumbs.push({
					label: formatBreadcrumb(pathSegments[i]),
					path: currentPath,
				});
			}
		}

		return crumbs;
	}, [pathname]);

	return (
		<header className='h-14 border-b bg-white flex items-center justify-between px-4 shadow-sm'>
			<div className='flex items-center'>
				{breadcrumbs.length === 1 ? (
					<Button
						variant='secondary'
						size='sm'
						className='rounded-md bg-white border border-gray-200'>
						{breadcrumbs[0].label}
					</Button>
				) : (
					<div className='flex items-center'>
						{breadcrumbs.map((crumb, index) => (
							<div
								key={crumb.path}
								className='flex items-center'>
								{index > 0 && (
									<ChevronRight className='h-3 w-3 mx-1 text-gray-400' />
								)}
								<Button
									variant='secondary'
									size='sm'
									className={`rounded-md ${
										index === breadcrumbs.length - 1
											? 'bg-white border border-gray-200'
											: 'bg-transparent border-none hover:bg-gray-100'
									}`}>
									{crumb.label}
								</Button>
							</div>
						))}
					</div>
				)}
			</div>

			{/* <div className='flex items-center gap-1'>
				<SearchDialog />
				<NotificationPopover />
			</div> */}
		</header>
	);
}

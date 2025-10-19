/** @format */

'use client';

import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	NOTIFICATIONS,
	type Notification,
} from '@/constants/general/notifications';
import { Bell, FileText } from 'lucide-react';
import { useState } from 'react';

export function NotificationPopover() {
	const [notifications, setNotifications] =
		useState<Notification[]>(NOTIFICATIONS);
	const [isOpen, setIsOpen] = useState(false);

	const unreadCount = notifications.filter((n) => !n.isRead).length;

	const markAllAsRead = () => {
		setNotifications(
			notifications.map((notification) => ({
				...notification,
				isRead: true,
			}))
		);
	};

	const handleDiscard = (id: string) => {
		setNotifications(
			notifications.filter((notification) => notification.id !== id)
		);
	};

	return (
		<Popover
			open={isOpen}
			onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='h-9 w-9 rounded-full border border-gray-200 relative transition-colors hover:bg-gray-50'
					aria-label='Notifications'>
					<Bell className='h-4 w-4 rounded-full border-1 border-gray-600' />
					{unreadCount > 0 && (
						<span className='absolute top-1 right-1 h-4 w-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center'>
							{unreadCount}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='w-[380px] p-0'
				align='end'
				sideOffset={8}>
				<div className='flex items-center justify-between p-4'>
					<div className='flex items-center gap-2'>
						<h4 className='font-medium'>Notifications</h4>
						{unreadCount > 0 && (
							<span className='bg-[#6923FF] text-white px-2 py-0.5 rounded-full text-xs'>
								{unreadCount}
							</span>
						)}
					</div>
					{unreadCount > 0 && (
						<Button
							variant='ghost'
							className='text-sm hover:bg-gray-100'
							onClick={markAllAsRead}>
							Mark all as read
						</Button>
					)}
				</div>
				<Separator />
				<ScrollArea className='h-[400px]'>
					{notifications.length > 0 ? (
						notifications.map((notification) => (
							<div
								key={notification.id}
								className={`p-4 flex gap-3 hover:bg-gray-50 transition-colors ${
									!notification.isRead ? 'bg-blue-50/30' : ''
								}`}>
								<FileText className='h-5 w-5 text-gray-500 shrink-0 mt-0.5' />
								<div className='flex-1 space-y-1'>
									<div className='flex items-center justify-between'>
										<p className='text-sm font-medium'>{notification.title}</p>
										<span className='text-xs text-gray-500'>
											{notification.timestamp}
										</span>
									</div>
									<p className='text-sm text-gray-500 line-clamp-2'>
										{notification.description}
									</p>
									<div className='flex items-center gap-2 pt-1'>
										<Button
											variant='ghost'
											size='sm'
											className='h-8 hover:bg-gray-100'
											onClick={() => handleDiscard(notification.id)}>
											Discard
										</Button>
										<Button
											variant='secondary'
											size='sm'
											className='h-8'>
											View Meeting
										</Button>
									</div>
								</div>
							</div>
						))
					) : (
						<div className='flex flex-col items-center justify-center h-[200px] text-center p-4'>
							<Bell className='h-10 w-10 text-gray-300 mb-2' />
							<p className='text-gray-500'>No notifications</p>
							<p className='text-sm text-gray-400'>
								You&apos;re all caught up!
							</p>
						</div>
					)}
				</ScrollArea>
			</PopoverContent>
		</Popover>
	);
}

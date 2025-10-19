/** @format */

// /**
//  * eslint-disable @next/next/no-img-element
//  *
//  * @format
//  */

// 'use client';

// import AgentHeader from '@/components/Core/agent/AgentHeader';
// import CardToggle from '@/components/Setting/CardToggle';
// import { users } from '@/constants/localData/data';
// import { ChevronDown, Search } from 'lucide-react';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import { FaGoogleDrive, FaRegCalendarAlt, FaVideo } from 'react-icons/fa';

// const PermissionUi = () => {
// 	const [googleCalendar, setGoogleCalendar] = useState(false);
// 	const [googleDrive, setGoogleDrive] = useState(false);
// 	const [outlookCalendar, setOutlookCalendar] = useState(false);

// 	return (
// 		<div>
// 			<AgentHeader />
// 			<div className='px-6 py-2 space-y-6'>
// 				<div className='space-y-2'>
// 					<h2 className='text-lg font-semibold text-gray-900'>Permissions</h2>
// 					<p className='text-sm text-gray-500'>
// 						Establish who is allowed to use this Assistant
// 					</p>
// 				</div>

// 				<div className='relative'>
// 					<input
// 						type='text'
// 						placeholder='Search Team Workspace'
// 						className='w-full px-4 py-3 pl-4 pr-10 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
// 					/>
// 					<Search className='absolute right-3 top-3.5 h-4 w-4 text-gray-400' />
// 				</div>

// 				<div className='border border-gray-200 rounded-lg overflow-hidden'>
// 					{users.map((user, index) => (
// 						<div
// 							key={user.id}
// 							className={`flex items-center justify-between px-4 py-4 ${
// 								index !== users.length - 1 ? 'border-b border-gray-200' : ''
// 							}`}>
// 							<div className='flex items-center gap-3'>
// 								<Image
// 									src={user.avatar}
// 									alt={user.name}
// 									className='w-10 h-10 rounded-full'
// 									width={40}
// 									height={40}
// 								/>
// 								<span className='text-sm font-medium text-gray-900'>
// 									{user.name}
// 								</span>
// 							</div>
// 							<div className='flex items-center gap-1 text-sm text-gray-500'>
// 								{user.role}
// 								{user.canEdit && (
// 									<ChevronDown className='h-4 w-4 text-gray-400 ml-1' />
// 								)}
// 							</div>
// 						</div>
// 					))}
// 				</div>

// 				<div className='space-y-3'>
// 					<h3 className='text-lg font-semibold text-gray-900'>
// 						Integrations settings
// 					</h3>
// 					<p className='text-sm text-gray-500'>Control your integrations</p>
// 				</div>

// 				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
// 					<CardToggle
// 						icon={<FaVideo className='text-gray-600' />}
// 						title='Google Meet'
// 						description='Add your docs and files for analysis and management by AI agents'
// 						enabled={googleCalendar}
// 						onToggle={() => setGoogleCalendar(!googleCalendar)}
// 					/>

// 					<CardToggle
// 						icon={<FaGoogleDrive className='text-gray-600' />}
// 						title='Google Drive'
// 						description='Add your docs and files for analysis and management by AI agents'
// 						enabled={googleDrive}
// 						onToggle={() => setGoogleDrive(!googleDrive)}
// 					/>

// 					<CardToggle
// 						icon={<FaRegCalendarAlt className='text-gray-600' />}
// 						title='Google Calendar'
// 						description='Add your docs and files for analysis and management by AI agents'
// 						enabled={outlookCalendar}
// 						onToggle={() => setOutlookCalendar(!outlookCalendar)}
// 					/>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default PermissionUi;

/** @format */

'use client';

import AgentHeader from '@/components/Core/agent/AgentHeader';
import { Switch } from '@/components/ui/switch';
import { users } from '@/constants/localData/data';
import { ChevronDown, InfoIcon, Search } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { FaGoogleDrive, FaRegCalendarAlt, FaVideo } from 'react-icons/fa';

export interface PermissionData {
	name: string;
	permissions?: {
		ownerId: string;
		visibility: 'private' | 'public';
	};
	googleDriveEnabled?: boolean;
	googleMeetEnabled?: boolean;
	googleCalendarEnabled?: boolean;
}

interface Props {
	data: PermissionData;
	setData: (upd: PermissionData) => void;
}

export default function PermissionsForm({ data, setData }: Props) {
	const [query, setQuery] = useState('');
	const searchRef = useRef<HTMLInputElement>(null);

	const handle =
		data.name && data.name.trim().length > 0
			? '@' + data.name.toLowerCase().trim().replace(/\s+/g, '')
			: '@yourhandle';

	const setOwner = (ownerId: string) => {
		setData({
			...data,
			permissions: {
				ownerId,
				visibility: data.permissions?.visibility ?? 'private',
			},
		});
	};

	const setVisibility = (visibility: 'private' | 'public') => {
		setData({
			...data,
			permissions: {
				ownerId: data.permissions?.ownerId ?? '',
				visibility,
			},
		});
	};

	const toggleFlag = (
		flag: 'googleDriveEnabled' | 'googleMeetEnabled' | 'googleCalendarEnabled'
	) => {
		setData({ ...data, [flag]: !data[flag] });
	};

	const filteredUsers = users.filter((u) =>
		u.name.toLowerCase().includes(query.toLowerCase())
	);

	return (
		<div>
			<AgentHeader
				agentName={data.name}
				agentHandle={handle}
				onNameChange={(newName) => setData({ ...data, name: newName })}
			/>

			<div className='px-6 py-2 space-y-6'>
				<div className='space-y-1'>
					<h2 className='text-lg font-semibold text-gray-900'>Permissions</h2>
					<p className='text-sm text-gray-500'>
						Who can see and manage this Assistant?
					</p>
				</div>

				<div className='space-y-2'>
					<div className='flex items-center gap-2'>
						<InfoIcon className='h-4 w-4 text-gray-500' />
						<h3 className='text-sm font-medium text-gray-700'>Owner</h3>
					</div>
					<div className='relative'>
						<input
							ref={searchRef}
							type='text'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder='Search users...'
							className='w-full px-4 py-3 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none'
						/>
						<Search className='absolute right-3 top-3.5 h-4 w-4 text-gray-400' />
					</div>
					<div className='border border-gray-200 rounded-lg max-h-48 overflow-auto'>
						{filteredUsers.map((user, idx) => {
							const isSelected =
								data.permissions?.ownerId === user.id.toString();
							return (
								<div
									key={user.id}
									onClick={() => setOwner(user.id.toString())}
									className={`flex items-center justify-between px-4 py-3 cursor-pointer ${idx < filteredUsers.length - 1
										? 'border-b border-gray-200'
										: ''
										} ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
									<div className='flex items-center gap-3'>

										<span className='text-sm font-medium text-gray-900'>
											{user.name}
										</span>
									</div>
									{isSelected && (
										<ChevronDown className='h-4 w-4 text-gray-600' />
									)}
								</div>
							);
						})}
					</div>
				</div>

				<div className='space-y-1'>
					<div className='flex items-center gap-2'>
						<InfoIcon className='h-4 w-4 text-gray-500' />
						<h3 className='text-sm font-medium text-gray-700'>Visibility</h3>
					</div>
					<select
						value={data.permissions?.visibility ?? 'private'}
						onChange={(e) =>
							setVisibility(e.target.value as 'private' | 'public')
						}
						className='w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none'>
						<option value='private'>Private</option>
						<option value='public'>Public</option>
					</select>
				</div>

				<div className='space-y-2'>
					<div className='flex items-center gap-2'>
						<InfoIcon className='h-4 w-4 text-gray-500' />
						<h3 className='text-sm font-medium text-gray-700'>Integrations</h3>
					</div>
					{[
						{
							label: 'Google Drive',
							flag: 'googleDriveEnabled' as const,
							icon: <FaGoogleDrive className='text-gray-600' />,
						},
						{
							label: 'Google Meet',
							flag: 'googleMeetEnabled' as const,
							icon: <FaVideo className='text-gray-600' />,
						},
						{
							label: 'Google Calendar',
							flag: 'googleCalendarEnabled' as const,
							icon: <FaRegCalendarAlt className='text-gray-600' />,
						},
					].map(({ label, flag, icon }) => (
						<div
							key={flag}
							className='flex items-center justify-between py-2 border-b border-gray-200'>
							<div className='flex items-center gap-2'>
								{icon}
								<span className='text-sm text-gray-700'>{label}</span>
							</div>
							<Switch
								checked={!!data[flag]}
								onCheckedChange={() => toggleFlag(flag)}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

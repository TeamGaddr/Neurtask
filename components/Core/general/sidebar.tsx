/** @format */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';

import { Button } from '@/components/ui/button';
import { ArrowLeftToLine, ArrowRightToLine, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import dropdownLogo from './../../../public/dropdownlogo.svg';
import { WorkspaceDropdown } from './ProfileDropdown';

export function Sidebar() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const pathname = usePathname();

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<div className='relative'>
			<div
				className={`
          ${isCollapsed ? 'w-16' : 'w-60'} 
          h-screen bg-white border-r flex flex-col transition-all duration-300
        `}>
				<div className='h-14 px-4 border-b flex justify-between items-center'>
					{!isCollapsed ? (
						<>
							<WorkspaceDropdown
								trigger={
									<div className='flex items-center gap-2 hover:bg-gray-50 p-1 rounded cursor-pointer'>
										<Image
											src={dropdownLogo}
											alt='Workspace'
											width={22}
											height={22}
										/>
										{/* <div className='h-6 w-6 bg-red-200 rounded flex items-center justify-center'>
											<span className='text-red-800 font-bold text-sm'>W</span>
										</div> */}
										<span className='font-medium'>Workspace</span>
										<ChevronDown className='h-4 w-4' />
									</div>
								}
							/>
							<Button
								variant={'ghost'}
								onClick={toggleCollapse}
								className='text-gray-500 hover:text-gray-700'>
								<ArrowLeftToLine className='h-4 w-4' />
							</Button>
						</>
					) : (
						<div className='w-full flex justify-center'>
							<div className='h-6 w-6 bg-red-200 rounded flex items-center justify-center'>
								<Image
									src={dropdownLogo}
									alt='Workspace'
									width={22}
									height={22}
								/>
								{/* <span className='text-red-800 font-bold text-sm'>W</span> */}
							</div>
						</div>
					)}
				</div>

				<nav className='flex-1 overflow-y-auto py-6'>
					<NavItem
						href='/dashboard'
						icon={
							<svg
								width='20'
								height='21'
								viewBox='0 0 20 21'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M3.125 8.78125V18C3.125 18.1658 3.19085 18.3247 3.30806 18.4419C3.42527 18.5592 3.58424 18.625 3.75 18.625H7.5V13.3125C7.5 13.0639 7.59877 12.8254 7.77459 12.6496C7.9504 12.4738 8.18886 12.375 8.4375 12.375H11.5625C11.8111 12.375 12.0496 12.4738 12.2254 12.6496C12.4012 12.8254 12.5 13.0639 12.5 13.3125V18.625H16.25C16.4158 18.625 16.5747 18.5592 16.6919 18.4419C16.8092 18.3247 16.875 18.1658 16.875 18V8.78125'
									stroke='#292929'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M18.75 10.5L10.4254 2.5313C10.2301 2.32505 9.77344 2.32271 9.57461 2.5313L1.25 10.5M15.625 7.49224V3.00005H13.75V5.69536'
									stroke='#292929'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						}
						label='Home'
						isCollapsed={isCollapsed}
						isActive={pathname === '/dashboard'}
					/>
					<NavItem
						href='/manage-agents'
						icon={
							<svg
								width='20'
								height='21'
								viewBox='0 0 20 21'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M2.91726 7.16661C2.91742 6.37654 3.12182 5.59992 3.51061 4.91213C3.8994 4.22434 4.45938 3.64873 5.13621 3.24116C5.81304 2.83359 6.58373 2.6079 7.3735 2.58599C8.16326 2.56408 8.94528 2.7467 9.64367 3.11612C10.3421 3.48554 10.9331 4.02923 11.3594 4.6944C11.7857 5.35958 12.0329 6.12367 12.0768 6.91252C12.1208 7.70136 11.9601 8.48818 11.6103 9.19661C11.2606 9.90505 10.7336 10.511 10.0806 10.9558C11.4868 11.4716 12.7066 12.3964 13.5828 13.6112C14.459 14.826 14.9516 16.2753 14.9973 17.7724C14.9953 17.9339 14.9311 18.0883 14.818 18.2035C14.7048 18.3186 14.5516 18.3856 14.3902 18.3905C14.2289 18.3953 14.0719 18.3376 13.9521 18.2294C13.8323 18.1213 13.7589 17.971 13.7473 17.8099C13.6976 16.1862 13.0177 14.6455 11.8516 13.5144C10.6854 12.3834 9.12472 11.7509 7.50017 11.7509C5.87563 11.7509 4.31492 12.3834 3.14878 13.5144C1.98264 14.6455 1.30272 16.1862 1.25309 17.8099C1.24475 17.9731 1.17282 18.1266 1.05272 18.2374C0.932625 18.3482 0.773906 18.4076 0.610569 18.4028C0.447231 18.398 0.292268 18.3294 0.178875 18.2117C0.065483 18.0941 0.00268133 17.9367 0.00392436 17.7733C0.0493838 16.276 0.54193 14.8265 1.41816 13.6115C2.2944 12.3965 3.51421 11.4716 4.92059 10.9558C4.30316 10.5353 3.79786 9.97021 3.4487 9.30979C3.09955 8.64938 2.9171 7.91364 2.91726 7.16661ZM7.50059 3.83327C6.61654 3.83327 5.76869 4.18446 5.14357 4.80958C4.51845 5.43471 4.16726 6.28255 4.16726 7.16661C4.16726 8.05066 4.51845 8.89851 5.14357 9.52363C5.76869 10.1488 6.61654 10.4999 7.50059 10.4999C8.38465 10.4999 9.23249 10.1488 9.85761 9.52363C10.4827 8.89851 10.8339 8.05066 10.8339 7.16661C10.8339 6.28255 10.4827 5.43471 9.85761 4.80958C9.23249 4.18446 8.38465 3.83327 7.50059 3.83327ZM14.4089 7.16661C14.2861 7.16661 14.1656 7.17494 14.0473 7.19161C13.9646 7.2064 13.8799 7.2044 13.7981 7.18573C13.7162 7.16706 13.639 7.1321 13.571 7.08293C13.503 7.03376 13.4455 6.9714 13.4021 6.89956C13.3587 6.82771 13.3302 6.74787 13.3184 6.66478C13.3065 6.58169 13.3115 6.49706 13.333 6.41594C13.3546 6.33482 13.3923 6.25888 13.4438 6.19263C13.4953 6.12638 13.5597 6.07119 13.633 6.03036C13.7063 5.98952 13.7871 5.96387 13.8706 5.95494C14.6994 5.83511 15.5445 5.99427 16.273 6.40738C17.0014 6.82048 17.5718 7.46408 17.8944 8.23688C18.217 9.00968 18.2735 9.86781 18.055 10.6762C17.8364 11.4846 17.3553 12.1974 16.6873 12.7024C17.6692 13.1421 18.503 13.8566 19.088 14.7596C19.6729 15.6627 19.9841 16.7157 19.9839 17.7916C19.9839 17.9574 19.9181 18.1163 19.8009 18.2335C19.6837 18.3508 19.5247 18.4166 19.3589 18.4166C19.1932 18.4166 19.0342 18.3508 18.917 18.2335C18.7998 18.1163 18.7339 17.9574 18.7339 17.7916C18.7342 16.8616 18.4348 15.9563 17.88 15.21C17.3251 14.4636 16.5445 13.916 15.6539 13.6483L15.2089 13.5149V12.1183L15.5506 11.9441C16.0571 11.6876 16.4623 11.2678 16.7008 10.7526C16.9394 10.2375 16.9974 9.65692 16.8654 9.10474C16.7335 8.55255 16.4193 8.06095 15.9736 7.70929C15.5279 7.35764 14.9767 7.16646 14.4089 7.16661Z'
									fill='#292929'
								/>
							</svg>
						}
						label='Agents'
						isCollapsed={isCollapsed}
						isActive={pathname?.startsWith('/manage-agents')}
					/>
					{/* <NavItem
						href='/knowledge'
						icon={<Lightbulb size={18} />}
						label='Knowledge'
						isCollapsed={isCollapsed}
						isActive={pathname.startsWith('/knowledge')}
					/> */}
					{/* <NavItem
						href='/tasks'
						icon={
							<svg
								width='20'
								height='21'
								viewBox='0 0 20 21'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M8.75 13.1125L6.50625 10.8688L5.625 11.75L8.75 14.875L14.375 9.25005L13.4938 8.36255L8.75 13.1125Z'
									fill='#292929'
								/>
								<path
									d='M15.625 3.625H13.75V3C13.75 2.66848 13.6183 2.35054 13.3839 2.11612C13.1495 1.8817 12.8315 1.75 12.5 1.75H7.5C7.16848 1.75 6.85054 1.8817 6.61612 2.11612C6.3817 2.35054 6.25 2.66848 6.25 3V3.625H4.375C4.04348 3.625 3.72554 3.7567 3.49112 3.99112C3.2567 4.22554 3.125 4.54348 3.125 4.875V18C3.125 18.3315 3.2567 18.6495 3.49112 18.8839C3.72554 19.1183 4.04348 19.25 4.375 19.25H15.625C15.9565 19.25 16.2745 19.1183 16.5089 18.8839C16.7433 18.6495 16.875 18.3315 16.875 18V4.875C16.875 4.54348 16.7433 4.22554 16.5089 3.99112C16.2745 3.7567 15.9565 3.625 15.625 3.625ZM7.5 3H12.5V5.5H7.5V3ZM15.625 18H4.375V4.875H6.25V6.75H13.75V4.875H15.625V18Z'
									fill='#292929'
								/>
							</svg>
						}
						label='Tasks'
						isCollapsed={isCollapsed}
						isActive={pathname?.startsWith('/tasks')}
					/> */}

					<NavItem
						href='/Meetings'
						icon={
							<svg
								width='20'
								height='21'
								viewBox='0 0 20 21'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M2.5 13.625V7.37504C2.5 6.93301 2.67559 6.50909 2.98816 6.19653C3.30072 5.88397 3.72464 5.70837 4.16667 5.70837H11.25C11.692 5.70837 12.116 5.88397 12.4285 6.19653C12.7411 6.50909 12.9167 6.93301 12.9167 7.37504V13.625C12.9167 14.0671 12.7411 14.491 12.4285 14.8036C12.116 15.1161 11.692 15.2917 11.25 15.2917H4.16667C3.72464 15.2917 3.30072 15.1161 2.98816 14.8036C2.67559 14.491 2.5 14.0671 2.5 13.625ZM16.8067 6.32587L13.4733 9.29504C13.4294 9.33405 13.3942 9.38191 13.3701 9.43548C13.346 9.48905 13.3334 9.54712 13.3333 9.60587V11.0875C13.3334 11.1463 13.346 11.2044 13.3701 11.2579C13.3942 11.3115 13.4294 11.3594 13.4733 11.3984L16.8067 14.3675C16.8667 14.4209 16.9409 14.4557 17.0203 14.4679C17.0997 14.48 17.1809 14.469 17.2542 14.436C17.3274 14.4031 17.3896 14.3497 17.4332 14.2822C17.4768 14.2148 17.5 14.1362 17.5 14.0559V6.63754C17.5 6.55722 17.4768 6.47861 17.4332 6.41117C17.3896 6.34372 17.3274 6.29032 17.2542 6.25739C17.1809 6.22446 17.0997 6.21341 17.0203 6.22556C16.9409 6.23771 16.8667 6.27254 16.8067 6.32587Z'
									stroke='#292929'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						}
						label='Meetings'
						isCollapsed={isCollapsed}
						isActive={pathname?.startsWith('/meetings')}
					/>
					<NavItem
						href='/settings'
						icon={
							<svg
								width='20'
								height='21'
								viewBox='0 0 20 21'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M6.66797 2.16663V6.33329M13.3346 2.16663V6.33329M10.0013 14.6666C8.45421 14.6666 6.97047 14.052 5.87651 12.9581C4.78255 11.8641 4.16797 10.3804 4.16797 8.83329V6.33329H15.8346V8.83329C15.8346 10.3804 15.2201 11.8641 14.1261 12.9581C13.0321 14.052 11.5484 14.6666 10.0013 14.6666ZM10.0013 14.6666V18.8333'
									stroke='#292929'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						}
						label='Integrations'
						isCollapsed={isCollapsed}
						isActive={pathname?.startsWith('/settings')}
					/>
				</nav>

				{/* <div className='border-t mx-2 my-2'></div> */}

				{/* {!isCollapsed && (
					<div className='px-4 py-1 text-sm text-gray-500 flex items-center'>
						<span>Favorites</span>
					</div>
				)}
				<nav className='py-1 px-2'>
					<NavItem
						href='/agents/notetaker-1'
						icon={
							<div className='h-5 w-5 bg-red-500 rounded flex items-center justify-center text-white text-xs'>
								N
							</div>
						}
						label='Notetaker'
						isCollapsed={isCollapsed}
						isActive={pathname === '/agents/notetaker-1'}
					/>
				</nav>

				{/* Separator */}
				{/* <div className='border-t mx-2 my-2'></div> */}

				{/* Recents Section */}
				{/* {!isCollapsed && (
					<div className='px-4 py-1 text-sm text-gray-500'>Recents</div>
				)} */}
				{/* <nav className='py-1 px-2'>
					<NavItem
						href='/conversations/1'
						icon={<MessageSquare size={18} />}
						label='Conversation 1'
						isCollapsed={isCollapsed}
						isActive={pathname === '/conversations/1'}
					/>
				</nav> */}

				{/* <div className='p-2 mt-auto'>
					<div className='bg-zinc-900 text-white p-3 rounded-md flex items-center gap-2'>
						<div className='relative h-4 w-4'>
							<div className='absolute inset-0 rounded-full border-2 border-green-400'></div>
							<div
								className='absolute inset-0 rounded-full border-2 border-green-400'
								style={{
									clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
									opacity: 0.3,
								}}></div>
						</div>
						{!isCollapsed && (
							<span className='text-sm'>122 credits remaining</span>
						)}
					</div>
				</div> */}
			</div>

			{/* Expand button - always visible when collapsed */}
			{isCollapsed && (
				<button
					onClick={toggleCollapse}
					className='absolute top-6 -right-3 bg-white border rounded-full p-1 shadow-sm hover:bg-gray-50'
					aria-label='Expand sidebar'>
					<ArrowRightToLine className='h-3 w-3' />
				</button>
			)}
		</div>
	);
}

interface NavItemProps {
	icon: React.ReactNode;
	label: string;
	isCollapsed: boolean;
	isActive?: boolean;
	hasChildren?: boolean;
	isExpanded?: boolean;
	onToggleExpand?: () => void;
	href?: string;
}

function NavItem({
	icon,
	label,
	isCollapsed,
	isActive,
	hasChildren,
	isExpanded,
	onToggleExpand,
	href,
}: NavItemProps) {
	const content = (
		<>
			<div className='flex items-center gap-3'>
				<span className='text-gray-700'>{icon}</span>
				{!isCollapsed && <span className='text-sm'>{label}</span>}
			</div>
			{!isCollapsed && hasChildren && (
				<ChevronDown
					className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''
						}`}
				/>
			)}
		</>
	);

	const className = `
    flex items-center w-full p-2 rounded-md text-sm
    ${isActive ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'}
    ${isCollapsed ? 'justify-center' : 'justify-between px-4'}
  `;

	if (hasChildren) {
		return (
			<button
				className={className}
				onClick={onToggleExpand}>
				{content}
			</button>
		);
	}

	if (href) {
		return (
			<Link
				href={href}
				className={className}>
				{content}
			</Link>
		);
	}

	return <button className={className}>{content}</button>;
}

/** @format */

'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	ArrowLeft,
	ArrowUp,
	ChevronDown,
	Clock,
	Globe,
	Maximize2,
	Paperclip,
	X,
} from 'lucide-react';
import Image from 'next/image';

const FloatingChat = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	const [showRecentTasks, setShowRecentTasks] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isSmallDevice, setIsSmallDevice] = useState(false);

	const toggleFullscreen = () => {
		setIsFullscreen(!isFullscreen);
	};

	const chatButtonRef = useRef<HTMLButtonElement>(null);
	const dragRef = useRef<{ startX: number; startY: number }>({
		startX: 0,
		startY: 0,
	});

	// Initialize position to bottom right
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setPosition({
				x: window.innerWidth - 80,
				y: window.innerHeight - 80,
			});
		}
	}, []);

	// Check for small devices
	useEffect(() => {
		const handleResize = () => {
			setIsSmallDevice(window.innerWidth < 640);
		};
		// Initial check
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleSendMessage = () => {
		console.log('Message sent:', message);
		setMessage('');
	};

	const toggleChat = () => {
		setIsOpen(!isOpen);
		setShowRecentTasks(false);
	};

	const toggleRecentTasks = () => {
		setShowRecentTasks(!showRecentTasks);
	};

	// Drag functionality
	const handleMouseDown = (e: React.MouseEvent) => {
		if (chatButtonRef.current) {
			const rect = chatButtonRef.current.getBoundingClientRect();
			setIsDragging(true);
			dragRef.current = {
				startX: e.clientX,
				startY: e.clientY,
			};
			setDragOffset({
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			});

			// Prevent text selection during drag
			e.preventDefault();
		}
	};

	const handleMouseMove = React.useCallback(
		(e: MouseEvent) => {
			if (isDragging) {
				const newX = e.clientX - dragOffset.x;
				const newY = e.clientY - dragOffset.y;

				// Keep button within viewport bounds
				const maxX =
					window.innerWidth - (chatButtonRef.current?.offsetWidth || 60);
				const maxY =
					window.innerHeight - (chatButtonRef.current?.offsetHeight || 60);

				setPosition({
					x: Math.max(0, Math.min(newX, maxX)),
					y: Math.max(0, Math.min(newY, maxY)),
				});
			}
		},
		[isDragging, dragOffset.x, dragOffset.y, chatButtonRef]
	);

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	// Add and remove event listeners
	useEffect(() => {}, []);
	useEffect(() => {
		if (isDragging) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [handleMouseMove, isDragging]);

	return (
		<div>
			{/* Floating Chat Button */}
			<Button
				ref={chatButtonRef}
				onMouseDown={handleMouseDown}
				onClick={!isDragging ? toggleChat : undefined}
				className='fixed z-50 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all cursor-move'
				style={{
					left: `${position.x}px`,
					top: `${position.y}px`,
					transform: 'translate(-50%, -50%)',
				}}>
				{isOpen ? (
					<X className='w-6 h-6' />
				) : (
					<Image
						src='/chat.png'
						alt='Chat Icon'
						width={20}
						height={20}
					/>
				)}
			</Button>

			{/* Chat Modal */}
			{isOpen && (
				<div
					className={`fixed ${
						isSmallDevice || isFullscreen ? 'inset-0 z-50' : 'z-40'
					}`}>
					<div
						className={`bg-white shadow-xl relative overflow-hidden ${
							isSmallDevice || isFullscreen
								? 'fixed inset-0 w-full h-full'
								: 'w-80 md:w-96 rounded-lg'
						}`}
						style={
							!isSmallDevice && !isFullscreen
								? {
										position: 'fixed',
										top: `${position.y}px`,
										left: `${position.x}px`,
										transform: 'translate(-100%, -100%)',
								  }
								: undefined
						}>
						{/* Header */}
						<div className='flex items-center justify-between p-3 border-b'>
							<Button
								variant='ghost'
								size='icon'
								className='rounded-full h-8 w-8'>
								<ArrowLeft className='h-4 w-4 text-gray-500' />
							</Button>

							<div className='flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full'>
								<div className='w-6 h-6 bg-red-500 flex items-center justify-center rounded-md'>
									<svg
										width='12'
										height='12'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										className='text-white'>
										<path
											d='M15.5 5L18.5 8M18.5 8L21.5 11M18.5 8L15.5 11M18.5 8L12 14.5M12 14.5L7 19.5M12 14.5L14.5 12M3 21L7 19.5M7 19.5L5.5 16'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</div>
								<span className='font-medium text-sm'>The Notetaker</span>
								<ChevronDown
									size={14}
									className='text-gray-500'
								/>
							</div>

							<div className='flex items-center space-x-1'>
								<Button
									variant='ghost'
									size='icon'
									className='rounded-full h-8 w-8'
									onClick={toggleFullscreen}>
									{isFullscreen ? (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
											className='h-4 w-4 text-gray-500'>
											<path d='M8 3v3a2 2 0 0 1-2 2H3' />
											<path d='M21 8h-3a2 2 0 0 1-2-2V3' />
											<path d='M3 16h3a2 2 0 0 1 2 2v3' />
											<path d='M16 21v-3a2 2 0 0 1 2-2h3' />
										</svg>
									) : (
										<Maximize2 className='h-4 w-4 text-gray-500' />
									)}
								</Button>
								<Button
									onClick={toggleChat}
									variant='ghost'
									size='icon'
									className='rounded-full h-8 w-8'>
									<X className='h-4 w-4 text-gray-500' />
								</Button>
							</div>
						</div>

						{/* Chat Content */}
						<div
							className={`${
								isSmallDevice || isFullscreen ? 'flex-grow overflow-y-auto' : ''
							} p-6 text-center relative`}>
							<div className='w-14 h-14 mx-auto bg-red-500 flex items-center justify-center rounded-lg mb-3'>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									className='text-white'>
									<path
										d='M15.5 5L18.5 8M18.5 8L21.5 11M18.5 8L15.5 11M18.5 8L12 14.5M12 14.5L7 19.5M12 14.5L14.5 12M3 21L7 19.5M7 19.5L5.5 16'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>

							{/* Agent Info */}
							<h3 className='text-xl font-semibold mb-1'>The Notetaker</h3>
							<p className='text-gray-500 text-sm mb-6'>
								This Agent will take notes during the meeting you
								<br />
								allow them to join.
							</p>

							{/* Recent Tasks Popup */}
							{showRecentTasks && (
								<div className='absolute left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-[80%] z-10'>
									<div className='flex justify-between items-center mb-2'>
										<h4 className='font-medium text-xs'>Recent Tasks</h4>
										<Button
											variant='ghost'
											size='sm'
											className='h-6 w-6 p-0'
											onClick={() => setShowRecentTasks(false)}>
											<X className='h-4 w-4' />
										</Button>
									</div>

									<div className='space-y-1'>
										<button className='w-full bg-[#FBFAF9] text-left px-3 py-2 hover:bg-gray-50 rounded text-xs'>
											How many meetings are there scheduled for next week?
										</button>
										<button className='w-full bg-[#FBFAF9] text-left px-3 py-2 hover:bg-gray-50 rounded text-xs'>
											Summarize Meeting
										</button>
										<button className='w-full text-left bg-[#FBFAF9] px-3 py-2 hover:bg-gray-50 rounded text-xs'>
											Schedule Follow up Meeting
										</button>
										<button className='w-full text-left bg-[#FBFAF9] px-3 py-2 hover:bg-gray-50 rounded text-xs'>
											Reach out meeting participants
										</button>
										<button className='w-full text-left bg-[#FBFAF9] px-3 py-2 hover:bg-gray-50 rounded text-xs'>
											Reach out meeting participants
										</button>
									</div>
								</div>
							)}

							{/* Suggested Questions */}
							<div className='space-y-2 mt-4'>
								<button className='w-full px-4 py-2 border border-gray-200 rounded-full text-xs text-left hover:bg-gray-50 transition-colors'>
									How many meetings are there scheduled for next week?
								</button>
								<button className='w-full px-4 py-2 border border-gray-200 rounded-full text-xs text-left hover:bg-gray-50 transition-colors'>
									Which open tasks have the highest priority?
								</button>
								<button className='w-full px-4 py-2 border border-gray-200 rounded-full text-xs text-left hover:bg-gray-50 transition-colors'>
									Which open tasks have the highest priority?
								</button>
							</div>

							{/* Recent Tasks Button */}
							<div className='mt-6 flex justify-center'>
								<button
									className='px-4 py-2 border border-gray-200 rounded-full text-sm flex items-center space-x-2 hover:bg-gray-50 transition-colors'
									onClick={toggleRecentTasks}>
									<span>Recent tasks</span>
									<Clock
										size={14}
										className='text-gray-500'
									/>
								</button>
							</div>
						</div>

						{/* Input Section */}
						<div className='p-4 bg-gray-50'>
							<div className='flex flex-col bg-white rounded-xl px-4 py-3 border border-gray-200'>
								<input
									type='text'
									placeholder='Ask anything to your Agent'
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									className='bg-transparent outline-none text-xs w-full'
								/>

								<div className='flex justify-between items-center mt-2'>
									<div className='flex space-x-4'>
										<Button
											variant={'ghost'}
											className='text-gray-500 rounded-full hover:text-gray-700'>
											<Paperclip size={18} />
										</Button>
										<Button
											variant={'ghost'}
											className='flex items-center rounded-full text-gray-500 hover:text-gray-700'>
											<Globe size={18} />
											<span className='text-xs ml-1'>Web</span>
										</Button>
									</div>

									<Button
										onClick={handleSendMessage}
										className='w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors'>
										<ArrowUp size={18} />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FloatingChat;

/** @format */

// import React, { useMemo } from 'react';

// /**
//  * Example messages (replace with your real data)
//  */
// const messages = [
// 	{
// 		name: 'Vato',
// 		time: '0:00',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
// 	},
// 	{
// 		name: 'Alexandra',
// 		time: '0:00',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
// 	},
// 	{
// 		name: 'Deepa',
// 		time: '0:00',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
// 	},
// 	{
// 		name: 'Vato',
// 		time: '0:00',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
// 	},
// ];

// /**
//  * Tailwind color classes for the left dot.
//  * Add / remove classes to taste.
//  */
// const colorClasses = [
// 	'bg-green-500',
// 	'bg-purple-500',
// 	'bg-red-500',
// 	'bg-blue-500',
// 	'bg-yellow-400',
// 	'bg-pink-500',
// 	'bg-indigo-500',
// 	'bg-teal-500',
// ];

// /**
//  * Utility: pick a random color index for each message once.
//  * Using useMemo so colors don't flip on every re-render.
//  */
// function useRandomColorsForMessages(list) {
// 	return useMemo(() => {
// 		return list.map(() => {
// 			const idx = Math.floor(Math.random() * colorClasses.length);
// 			return colorClasses[idx];
// 		});
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, []); // intentionally only once per mount
// }

// const ChatSidebar = () => {
// 	const randomColors = useRandomColorsForMessages(messages);

// 	return (
// 		<div className='pl-4'>
// 			<div
// 				className='bg-[#FBFAF9] border-[#ECEBEB] rounded-md py-5 p-3 shadow max-h-[calc(100vh-150px)] overflow-y-auto space-y-3 border'
// 				style={{ width: 300 }}>
// 				{messages.map((msg, idx) => (
// 					<div
// 						key={idx}
// 						className='flex items-start gap-3'
// 						// small visual separation for each item
// 					>
// 						{/* Left column: time (top) and dot (below) */}
// 						<div className='w-14 justify-center gap-2 flex flex-row items-center select-none'>
// 							<div
// 								className={`w-3.5 h-3.5 rounded-full ${
// 									randomColors[idx] || 'bg-gray-400'
// 								}`}
// 								aria-hidden='true'
// 							/>
// 							<div className='text-[11px] text-gray-400 tracking-wide'>
// 								{msg.time}
// 							</div>
// 						</div>

// 						{/* Right column: name and message */}
// 						<div className='flex-1'>
// 							<div className='flex items-center justify-between'>
// 								<p className='text-sm font-medium text-gray-800'>{msg.name}</p>
// 							</div>

// 							<p className='text-xs text-gray-600 mt-1 leading-tight line-clamp-3'>
// 								{msg.text}
// 							</p>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default ChatSidebar;

// components/Meetings/ChatSidebar.tsx
import React, { useEffect, useState } from 'react';

type ChatUser = {
	id?: string;
	name: string;
	email?: string;
	avatarUrl?: string;
	color?: string;
};
type ChatMessage = {
	_id?: string;
	meetingId?: string;
	sender: ChatUser;
	type?: string;
	text?: string;
	mediaUrl?: string;
	createdAt?: string;
};

const ChatSidebar: React.FC<{ meetingId?: string }> = ({ meetingId }) => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

	useEffect(() => {
		if (!meetingId) return;
		let cancelled = false;
		const fetchMessages = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(
					`${apiUrl}/api/meeting/${encodeURIComponent(meetingId)}`
				);
				if (!res.ok) throw new Error(`Status ${res.status}`);
				const json = await res.json();
				if (!cancelled) setMessages(json.messages ?? []);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				if (!cancelled) setError(err.message || 'Failed to load messages');
			} finally {
				if (!cancelled) setLoading(false);
			}
		};
		fetchMessages();

		// optional: poll every 10s for new messages (or use websocket)
		const id = setInterval(fetchMessages, 10_000);
		return () => {
			cancelled = true;
			clearInterval(id);
		};
	}, [meetingId]);

	if (!meetingId)
		return <div className='text-sm text-gray-500 p-2'>No meeting selected</div>;
	if (loading)
		return <div className='p-2 text-sm text-gray-500'>Loading chat…</div>;
	if (error)
		return <div className='p-2 text-sm text-red-500'>Error: {error}</div>;

	return (
		<div className='pl-4'>
			<div
				className='bg-[#FBFAF9] border-[#ECEBEB] rounded-md py-5 p-3 shadow max-h-[calc(100vh-150px)] overflow-y-auto space-y-3 border'
				style={{ width: 300 }}>
				{messages.length === 0 && (
					<div className='text-sm text-gray-500'>No messages</div>
				)}
				{messages.map((msg, idx) => (
					<div
						key={msg._id ?? idx}
						className='flex items-start gap-3'>
						<div className='w-14 justify-center gap-2 flex flex-row items-center select-none'>
							<div
								className={`w-3.5 h-3.5 rounded-full ${
									msg.sender?.color ?? 'bg-gray-400'
								}`}
								aria-hidden
							/>
							<div className='text-[11px] text-gray-400 tracking-wide'>
								{new Date(msg.createdAt ?? Date.now()).toLocaleTimeString()}
							</div>
						</div>

						<div className='flex-1'>
							<div className='flex items-center justify-between'>
								<p className='text-sm font-medium text-gray-800'>
									{msg.sender?.name ?? 'Unknown'}
								</p>
							</div>

							<p className='text-xs text-gray-600 mt-1 leading-tight line-clamp-3'>
								{msg.text}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatSidebar;

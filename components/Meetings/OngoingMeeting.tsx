/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

// /** @format */

'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import NoteTaker from './NoteTakerMeeting';
import MeetingRecorder from './MeetingRecorder';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
const TOKEN_KEY = 'token';
const getAppToken = () => {
	try {
		const t = localStorage.getItem(TOKEN_KEY);
		if (t) return t;
		const match =
			document.cookie.match(/(?:^|;\s*)auth-token=([^;]+)/) ||
			document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
		return match ? decodeURIComponent(match[1]) : null;
	} catch {
		return null;
	}
};

// small spinner inline
const Spinner: React.FC<{ size?: number }> = ({ size = 16 }) => (
	<svg
		className='animate-spin inline-block'
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		aria-hidden>
		<circle
			cx='12'
			cy='12'
			r='10'
			stroke='currentColor'
			strokeWidth='4'
			opacity='0.15'
		/>
		<path
			d='M22 12a10 10 0 00-10-10'
			stroke='currentColor'
			strokeWidth='4'
			strokeLinecap='round'
		/>
	</svg>
);

const OngoingMeeting: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [aiJoining, setAiJoining] = useState(false);
	interface Meeting {
		_id: string;
		title?: string;
		startDateTime?: string;
		endDateTime?: string;
		meetingLink?: string;
		attendees?: string[];
		calendarEventId?: number;
	}
	const [meetings, setMeetings] = useState<Meeting[]>([]);
	const [loading, setLoading] = useState(false);

	React.useEffect(() => {
		const fetchMeetings = async () => {
			setLoading(true);
			try {
				const token = getAppToken();
				const res = await fetch(`${API_BASE}/api/meeting`, {
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						...(token ? { Authorization: `Bearer ${token}` } : {}),
					},
				});
				if (!res.ok) throw new Error(`Status ${res.status}`);
				const json = await res.json();
				const arr = Array.isArray(json) ? json : json?.meetings ?? [];
				setMeetings(arr);
			} catch (err) {
				console.log(err)
				setMeetings([]);
			} finally {
				setLoading(false);
			}
		};
		fetchMeetings();
	}, []);

	// compute ongoing meeting silently
	const ongoingMeeting = useMemo(() => {
		const now = new Date();
		return (
			meetings.find((m: any) => {
				if (!m.startDateTime || !m.endDateTime) return false;
				const s = new Date(m.startDateTime);
				const e = new Date(m.endDateTime);
				return now >= s && now <= e;
			}) ?? null
		);
	}, [meetings]);

	const triggerAiJoin = async (meetingId: string) => {
		setAiJoining(true);
		toast({
			variant: 'info',
			title: 'AI requested',
			description: 'Requesting AI to join in background',
		});
		try {
			const res = await fetch(
				`${API_BASE}/api/meeting/${encodeURIComponent(meetingId)}/join-ai`,
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						...(getAppToken()
							? { Authorization: `Bearer ${getAppToken()}` }
							: {}),
					},
				}
			);

			if (!res.ok) {
				const txt = await res.text().catch(() => '');
				toast({
					variant: 'error',
					title: 'AI join failed',
					description: txt || `Status ${res.status}`,
				});
				setAiJoining(false);
				return;
			}

			const json = await res.json();
			toast({
				variant: 'success',
				title: 'AI joined',
				description: json?.summary
					? String(json.summary).slice(0, 140) +
					(String(json.summary).length > 140 ? '…' : '')
					: 'AI joined the meeting',
			});

			// refresh cache silently
			// refresh(false).catch(() => { });
		} catch (err: any) {
			toast({
				variant: 'error',
				title: 'AI join error',
				description: err?.message || 'Failed to call join-ai',
			});
		} finally {
			setAiJoining(false);
		}
	};

	const joinMeeting = (meeting: any | null) => {
		if (!meeting) {
			toast({
				variant: 'warning',
				title: 'No meeting',
				description: 'No ongoing meeting to join',
			});
			return;
		}

		// open meeting link in new tab if present
		if (meeting.meetingLink) {
			try {
				window.open(meeting.meetingLink, '_blank', 'noopener,noreferrer');
			} catch (err) {
				console.log(err)
			}
		} else {
			// no meeting link - user still requested join; let backend try fallback
			toast({
				variant: 'info',
				title: 'Joining',
				description: 'No link found — requesting AI / backend fallback',
			});
		}

		if (meeting._id) triggerAiJoin(meeting._id);
	};

	return (
		<Card className='bg-white border border-gray-200 rounded-xl p-6 sm:p-6 flex flex-col'>
			{/* Row container */}
			<div className='flex items-center justify-start gap-[5rem]'>
				{/* Left block: titles */}
				<div className='min-w-0'>
					{/* small label */}
					<div
						className='text-sm text-gray-600 mb-1'
						aria-hidden>
						{/* optional: can be empty or used for context */}
					</div>

					{/* Heading + Meeting title */}
					{ongoingMeeting ? (
						<>
							<p className='text-sm text-gray-700'>Ongoing Meeting</p>
							<p
								className='text-lg sm:text-xl font-semibold text-[#111827] truncate'
								title={ongoingMeeting.title}>
								{ongoingMeeting.title}
							</p>
						</>
					) : (
						<>
							<p className='text-sm text-gray-700'>
								No ongoing meeting currently
							</p>
						</>
					)}

					{/* attendees / subtitle */}
					<div className='mt-2 text-xs text-gray-500 max-w-[60vw] sm:max-w-md truncate'>
						{ongoingMeeting?.attendees?.length
							? `Meeting with ${ongoingMeeting.attendees.join(', ')}`
							: !ongoingMeeting && loading
								? 'Checking meetings…'
								: 'No attendees'}
					</div>
				</div>

				{/* Right block: buttons */}
				<div className='flex items-center gap-3'>
					{/* Join Meeting: neon pill */}
					<Button
						onClick={() => joinMeeting(ongoingMeeting)}
						disabled={!ongoingMeeting || aiJoining}
						aria-disabled={!ongoingMeeting || aiJoining}
						className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm ${ongoingMeeting && !aiJoining
							? 'bg-[#dafd3c] hover:bg-[#c9ef2a] text-black'
							: 'bg-[#f0f3d6] text-gray-500 cursor-not-allowed'
							}`}
						aria-live='polite'>
						{aiJoining ? (
							<>
								<Spinner size={14} /> <span>Joining…</span>
							</>
						) : (
							'Join Meeting'
						)}
					</Button>
					{ongoingMeeting ? <MeetingRecorder /> : ""}

					{/* Notetaker: dark pill */}
					<Button
						onClick={() => setOpen(true)}
						className='flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2b2b2b] hover:bg-[#232323] text-white text-sm'
						aria-label='Open notetaker'>
						<Plus size={14} />
						<span className='hidden sm:inline'>Notetaker</span>
					</Button>
				</div>
			</div>

			{/* NoteTaker modal */}
			<NoteTaker
				open={open}
				onOpenChange={(o) => setOpen(o)}
				initialMeeting={
					ongoingMeeting
						? {
							id: ongoingMeeting._id,
							title: ongoingMeeting.title,
							meetingLink: ongoingMeeting.meetingLink,
							calendarEventId: ongoingMeeting.calendarEventId != null ? String(ongoingMeeting.calendarEventId) : undefined,
							startDateTime: ongoingMeeting.startDateTime,
							endDateTime: ongoingMeeting.endDateTime,
						}
						: undefined
				}
			/>
		</Card>
	);
};

export default OngoingMeeting;

/** @format */

// 'use client';

// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { toast } from '@/hooks/use-toast';
// import { Plus } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import NoteTaker from './NoteTakerMeeting';

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
// const TOKEN_KEY = 'token';
// const getAppToken = () => {
// 	try {
// 		const t = localStorage.getItem(TOKEN_KEY);
// 		if (t) return t;
// 		const match =
// 			document.cookie.match(/(?:^|;\s*)auth-token=([^;]+)/) ||
// 			document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
// 		return match ? decodeURIComponent(match[1]) : null;
// 	} catch {
// 		return null;
// 	}
// };

// const Spinner: React.FC<{ size?: number }> = ({ size = 16 }) => (
// 	<svg
// 		className='animate-spin inline-block'
// 		width={size}
// 		height={size}
// 		viewBox='0 0 24 24'
// 		fill='none'
// 		aria-hidden>
// 		<circle
// 			cx='12'
// 			cy='12'
// 			r='10'
// 			stroke='currentColor'
// 			strokeWidth='4'
// 			opacity='0.15'
// 		/>
// 		<path
// 			d='M22 12a10 10 0 00-10-10'
// 			stroke='currentColor'
// 			strokeWidth='4'
// 			strokeLinecap='round'
// 		/>
// 	</svg>
// );

// type ApiMeeting = {
// 	_id: string;
// 	calendarEventId?: string;
// 	title?: string;
// 	startDateTime?: string;
// 	endDateTime?: string;
// 	meetingLink?: string;
// 	attendees?: Array<{ email?: string } | string> | string[];
// 	transcript?: string;
// 	aiStatus?: string;
// };

// export default function OngoingMeetingCard() {
// 	const [ongoing, setOngoing] = useState<ApiMeeting | null>(null);
// 	const [loading, setLoading] = useState(false);
// 	const [aiJoining, setAiJoining] = useState(false);
// 	const [openNotetaker, setOpenNotetaker] = useState(false);

// 	// parse ISO-ish strings safely
// 	const parseDate = (v?: string | Date | null) => {
// 		if (!v) return null;
// 		const d =
// 			typeof v === 'string'
// 				? new Date(v)
// 				: v instanceof Date
// 				? v
// 				: new Date(String(v));
// 		return isNaN(d.getTime()) ? null : d;
// 	};

// 	const fetchOngoing = async () => {
// 		setLoading(true);
// 		try {
// 			const token = getAppToken();
// 			const res = await fetch(`${API_BASE}/api/meeting/ongoing`, {
// 				method: 'GET',
// 				credentials: 'include',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					...(token ? { Authorization: `Bearer ${token}` } : {}),
// 				},
// 			});
// 			if (!res.ok) {
// 				// If the endpoint returns a singular array sometimes, try the root /api/meeting as fallback
// 				if (res.status === 401 || res.status === 403) {
// 					setOngoing(null);
// 					return;
// 				}
// 				throw new Error(`Status ${res.status}`);
// 			}
// 			const json = await res.json();
// 			// Backend may return { meetings: [...] } or an array — handle both
// 			const arr = Array.isArray(json) ? json : json?.meetings ?? [];
// 			const now = new Date();
// 			const current = arr.find((m: any) => {
// 				const s = parseDate(m.startDateTime);
// 				const e = parseDate(m.endDateTime);
// 				if (!s || !e) return false;
// 				return now >= s && now <= e;
// 			});
// 			setOngoing(current ?? null);
// 		} catch (err) {
// 			console.error('fetchOngoing error', err);
// 			setOngoing(null);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchOngoing();
// 		const id = setInterval(fetchOngoing, 30_000); // keep it responsive but not too chatty
// 		return () => clearInterval(id);
// 	}, []);

// 	const getAttendeeList = (m?: ApiMeeting) => {
// 		if (!m?.attendees) return [];
// 		return Array.isArray(m.attendees)
// 			? m.attendees
// 					.map((a: any) => (typeof a === 'string' ? a : a?.email ?? ''))
// 					.filter(Boolean)
// 			: [];
// 	};

// 	const triggerAiJoin = async (meeting: ApiMeeting) => {
// 		setAiJoining(true);
// 		toast({
// 			variant: 'info',
// 			title: 'AI requested',
// 			description: 'Requesting AI to join',
// 		});
// 		try {
// 			// prefer calendarEventId when present because backend resolves that
// 			const idToSend = meeting.calendarEventId ?? meeting._id;
// 			const token = getAppToken();
// 			const res = await fetch(
// 				`${API_BASE}/api/meeting/${encodeURIComponent(idToSend)}/join-ai`,
// 				{
// 					method: 'POST',
// 					credentials: 'include',
// 					headers: {
// 						'Content-Type': 'application/json',
// 						...(token ? { Authorization: `Bearer ${token}` } : {}),
// 					},
// 					// no body required by your backend; kept consistent with server code
// 				}
// 			);
// 			if (!res.ok) {
// 				const txt = await res.text().catch(() => '');
// 				toast({
// 					variant: 'error',
// 					title: 'AI join failed',
// 					description: txt || `Status ${res.status}`,
// 				});
// 				return;
// 			}
// 			const json = await res.json();
// 			toast({
// 				variant: 'success',
// 				title: 'AI joined',
// 				description:
// 					json?.summary && String(json.summary).length > 0
// 						? String(json.summary).slice(0, 140) +
// 						  (String(json.summary).length > 140 ? '…' : '')
// 						: 'AI joined the meeting',
// 			});
// 			// update ongoing after join
// 			fetchOngoing();
// 		} catch (err: any) {
// 			toast({
// 				variant: 'error',
// 				title: 'AI join error',
// 				description: err?.message || 'Failed to call join-ai',
// 			});
// 		} finally {
// 			setAiJoining(false);
// 		}
// 	};

// 	const joinMeeting = (m: ApiMeeting | null) => {
// 		if (!m) {
// 			toast({
// 				variant: 'warning',
// 				title: 'No meeting',
// 				description: 'No ongoing meeting to join',
// 			});
// 			return;
// 		}

// 		// open link if available; backend may populate 'hangoutLink' as meetingLink
// 		if (m.meetingLink) {
// 			try {
// 				window.open(m.meetingLink, '_blank', 'noopener,noreferrer');
// 			} catch (err) {
// 				/* ignore */
// 			}
// 		} else {
// 			toast({
// 				variant: 'info',
// 				title: 'Joining',
// 				description: 'No link found — requesting backend to join',
// 			});
// 		}

// 		// trigger AI join (backend will accept calendarEventId or ObjectId)
// 		triggerAiJoin(m);
// 	};

// 	return (
// 		<Card className='bg-white border border-gray-200 rounded-xl p-6 sm:p-6 flex flex-col'>
// 			<div className='flex items-center justify-between gap-6'>
// 				<div className='min-w-0'>
// 					<div
// 						className='text-sm text-gray-600 mb-1'
// 						aria-hidden></div>

// 					{ongoing ? (
// 						<>
// 							<p className='text-sm text-gray-700'>Ongoing Meeting</p>
// 							<p
// 								className='text-lg sm:text-xl font-semibold text-[#111827] truncate'
// 								title={ongoing.title}>
// 								{ongoing.title ?? 'Untitled meeting'}
// 							</p>
// 						</>
// 					) : loading ? (
// 						<p className='text-sm text-gray-700'>Checking meetings…</p>
// 					) : (
// 						<p className='text-sm text-gray-700'>
// 							No ongoing meeting currently
// 						</p>
// 					)}

// 					<div className='mt-2 text-xs text-gray-500 max-w-[60vw] sm:max-w-md truncate'>
// 						{ongoing
// 							? `Meeting with ${
// 									getAttendeeList(ongoing).join(', ') || 'attendees'
// 							  }`
// 							: 'No attendees'}
// 					</div>
// 				</div>

// 				<div className='flex items-center gap-3'>
// 					<Button
// 						onClick={() => joinMeeting(ongoing)}
// 						disabled={!ongoing || aiJoining}
// 						aria-disabled={!ongoing || aiJoining}
// 						className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm ${
// 							ongoing && !aiJoining
// 								? 'bg-[#dafd3c] hover:bg-[#c9ef2a] text-black'
// 								: 'bg-[#f0f3d6] text-gray-500 cursor-not-allowed'
// 						}`}
// 						aria-live='polite'>
// 						{aiJoining ? (
// 							<>
// 								<Spinner size={14} /> <span>Joining…</span>
// 							</>
// 						) : (
// 							'Join Meeting'
// 						)}
// 					</Button>

// 					<Button
// 						onClick={() => setOpenNotetaker(true)}
// 						className='flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2b2b2b] hover:bg-[#232323] text-white text-sm'
// 						aria-label='Open notetaker'>
// 						<Plus size={14} />
// 						<span className='hidden sm:inline'>Notetaker</span>
// 					</Button>
// 				</div>
// 			</div>

// 			<NoteTaker
// 				open={openNotetaker}
// 				onOpenChange={(o) => setOpenNotetaker(o)}
// 				initialMeeting={
// 					ongoing
// 						? {
// 								id: ongoing._id ?? ongoing.calendarEventId ?? '',
// 								title: ongoing.title,
// 								meetingLink: ongoing.meetingLink,
// 								startDateTime: ongoing.startDateTime,
// 								endDateTime: ongoing.endDateTime,
// 						  }
// 						: undefined
// 				}
// 			/>
// 		</Card>
// 	);
// }

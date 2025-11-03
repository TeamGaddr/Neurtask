/** @format */

'use client';

import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useUserStore } from '../../lib/store/userStore';
import { Card } from '../ui/card';

type ApiMeeting = {
	_id: string;
	title?: string;
	startDate?: string; // dd/mm/yyyy or yyyy-mm-dd
	endDate?: string;
	startTime?: string;
	endTime?: string;
	startDateTime?: string; // ISO if present
	endDateTime?: string;
	meetingLink?: string;
	attendees?: Array<{ email?: string }>;
	notetakerEnabled?: boolean;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

const parseAnyDate = (dateStr?: string, timeStr?: string): Date | null => {
	if (!dateStr && !timeStr) return null;
	if (dateStr && /^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
		const t = timeStr ?? '';
		const iso = dateStr.includes('T')
			? dateStr
			: `${dateStr}T${t || '00:00'}:00`;
		const d = new Date(iso);
		return isNaN(d.getTime()) ? null : d;
	}
	if (dateStr && /^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
		const [dd, mm, yyyy] = dateStr.split('/');
		const iso = `${yyyy}-${mm}-${dd}T${timeStr ?? '00:00'}:00`;
		const d = new Date(iso);
		return isNaN(d.getTime()) ? null : d;
	}
	try {
		const d = new Date(dateStr ?? timeStr ?? '');
		return isNaN(d.getTime()) ? null : d;
	} catch {
		return null;
	}
};

const isSameDay = (a: Date, b: Date) =>
	a.getFullYear() === b.getFullYear() &&
	a.getMonth() === b.getMonth() &&
	a.getDate() === b.getDate();

const isToday = (d: Date) => isSameDay(d, new Date());

const isYesterday = (d: Date) => {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	return isSameDay(d, yesterday);
};

const formatLeftTile = (d: Date | null) => {
	if (!d) return { line1: '—', line2: '' };
	const optionsDay = { day: '2-digit', month: '2-digit' } as const;
	const day = d.toLocaleDateString(undefined, optionsDay); // dd/mm
	const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	return { line1: day, line2: time };
};

const formatDuration = (start: Date | null, end: Date | null) => {
	if (!start) return '';
	if (!end)
		return start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	const diffMs = Math.max(0, end.getTime() - start.getTime());
	const mins = Math.round(diffMs / 60000);
	if (mins < 60) return `${mins} min`;
	const hours = Math.floor(mins / 60);
	const rem = mins % 60;
	return rem === 0 ? `${hours} hr` : `${hours} hr ${rem} min`;
};

export default function MeetingCard({
	onMeetingClick,
}: {
	onMeetingClick?: (m: ApiMeeting) => void;
}) {
	const [meetings, setMeetings] = useState<ApiMeeting[]>([]);
	const [loading, setLoading] = useState(false);
	const user = useUserStore((s) => s.user);
	const userEmail = user?.email;
	const router = useRouter();
	// const token = localStorage.getItem('token');
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
       if (typeof window !== 'undefined') {
           const storedToken = localStorage.getItem('token');
          setToken(storedToken);
       }
  	}, []);

	const fetchMeetings = async () => {
		try {
			setLoading(true);
			const res = await fetch(`${API_BASE}/api/meeting`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			if (!res.ok) throw new Error('Failed to fetch meetings');
			const data = await res.json();
			const normalized = (Array.isArray(data) ? data : []).map((m) => ({
				_id: m._id,
				title: m.title ?? m.name ?? 'Untitled meeting',
				startDate: m.startDate,
				endDate: m.endDate,
				startTime: m.startTime,
				endTime: m.endTime,
				startDateTime: m.startDateTime,
				endDateTime: m.endDateTime,
				meetingLink: m.meetingLink,
				attendees: m.attendees ?? m.attendeeStatus ?? [],
				notetakerEnabled: !!m.notetakerEnabled,
			})) as ApiMeeting[];

			normalized.sort((a, b) => {
				const aDate =
					parseAnyDate(a.startDateTime ?? a.startDate, a.startTime) ??
					new Date(0);
				const bDate =
					parseAnyDate(b.startDateTime ?? b.startDate, b.startTime) ??
					new Date(0);
				return bDate.getTime() - aDate.getTime(); // descending
			});
			setMeetings(normalized);
		} catch (err) {
			console.error('Error fetching meetings', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMeetings();
		const id = setInterval(fetchMeetings, 60 * 1000);
		return () => clearInterval(id);
	}, []);

	const grouped = useMemo(() => {
		const today: ApiMeeting[] = [];
		const yesterday: ApiMeeting[] = [];
		const upcoming: ApiMeeting[] = [];

		for (const m of meetings) {
			const start = parseAnyDate(m.startDateTime ?? m.startDate, m.startTime);
			if (!start) {
				upcoming.push(m);
				continue;
			}
			if (isToday(start)) today.push(m);
			else if (isYesterday(start)) yesterday.push(m);
			else upcoming.push(m);
		}

		const sortDesc = (arr: ApiMeeting[]) =>
			arr.sort((a, b) => {
				const ad =
					parseAnyDate(a.startDateTime ?? a.startDate, a.startTime) ??
					new Date(0);
				const bd =
					parseAnyDate(b.startDateTime ?? b.startDate, b.startTime) ??
					new Date(0);
				return bd.getTime() - ad.getTime();
			});

		sortDesc(today);
		sortDesc(yesterday);
		sortDesc(upcoming);

		return { today, yesterday, upcoming };
	}, [meetings]);

	const displayOlder = useMemo(() => {
		const arr = (grouped.upcoming ?? []).slice();
		arr.sort((a, b) => {
			const ad =
				parseAnyDate(a.startDateTime ?? a.startDate, a.startTime) ??
				new Date(0);
			const bd =
				parseAnyDate(b.startDateTime ?? b.startDate, b.startTime) ??
				new Date(0);
			return bd.getTime() - ad.getTime();
		});
		return arr.slice(0, 10);
	}, [grouped.upcoming]);

	const userWillAttend = (m: ApiMeeting) => {
		if (!userEmail || !Array.isArray(m.attendees)) return false;
		return m.attendees.some(
			(a) => (a.email ?? '').toLowerCase() === userEmail.toLowerCase()
		);
	};

	const toggleAttend = async (meeting: ApiMeeting, willAttend: boolean) => {
		if (!userEmail) {
			toast({
				variant: 'error',
				title: 'Authentication Error',
				description: 'Please login to change attendance.',
			});
			return;
		}
		setMeetings((prev) =>
			prev.map((p) =>
				p._id === meeting._id
					? {
							...p,
							attendees: willAttend
								? [...(p.attendees ?? []), { email: userEmail }]
								: (p.attendees ?? []).filter(
										(a) =>
											(a.email ?? '').toLowerCase() !== userEmail.toLowerCase()
								  ),
					  }
					: p
			)
		);

		try {
			const res = await fetch(
				`${API_BASE}/api/meeting/${meeting._id}/attendee`,
				{
					method: 'PATCH',
					credentials: 'include',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ userEmail, willAttend }),
				}
			);
			if (!res.ok) throw new Error('Failed to update attendance');
		} catch (err) {
			console.error(err);
			fetchMeetings();
			toast({
				variant: 'error',
				title: 'Update failed',
				description: 'Could not update attendance. Please try again.',
			});
		}
	};

	const MeetingRow: React.FC<{ m: ApiMeeting }> = ({ m }) => {
		const start = parseAnyDate(m.startDateTime ?? m.startDate, m.startTime);
		const end = parseAnyDate(m.endDateTime ?? m.endDate, m.endTime);
		const left = formatLeftTile(start);
		const duration = formatDuration(start, end);
		const attending = userWillAttend(m);

		// Determine whether the meeting is a past meeting (allowed to open details).
		// Rules:
		// - If end exists and end < now => past (allow)
		// - Else if start exists and start < now => started in past (allow)
		// - Otherwise (start in future or no dates) => not allowed to open details
		const now = Date.now();
		const isPast = (() => {
			if (end) return end.getTime() < now;
			if (start) return start.getTime() < now;
			return false;
		})();

		const clickable = isPast;

		const handleClick = () => {
			if (!clickable) {
				toast({
					variant: 'warning',
					title: 'Meeting not available',
					description:
						'This meeting hasn’t started or is upcoming and cannot be opened.',
				});
				return;
			}
			if (onMeetingClick) {
				onMeetingClick(m);
			} else {
				if (m._id) router.push(`/meetings/${encodeURIComponent(m._id)}`);
			}
		};

		return (
			<div
				role={clickable ? 'button' : undefined}
				tabIndex={clickable ? 0 : -1}
				onClick={handleClick}
				onKeyDown={(e) => {
					if (!clickable) return;
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						handleClick();
					}
				}}
				className={`flex items-center justify-between py-4 border-b last:border-b-0 rounded-md focus:outline-none ${
					clickable
						? 'cursor-pointer hover:shadow-sm focus:ring-2 focus:ring-primary'
						: 'opacity-75 cursor-not-allowed'
				}`}
				aria-disabled={!clickable}>
				<div className='flex items-center gap-4 min-w-0'>
					<div className='w-20 h-20 bg-gray-200 rounded-md flex flex-col items-center justify-center text-sm font-medium text-gray-700 shadow-sm flex-shrink-0'>
						<div>{left.line1}</div>
						<div className='text-xs text-gray-600 mt-1'>{left.line2}</div>
					</div>
					<div className='min-w-0'>
						<div
							className='text-sm font-medium text-[#1f2937] truncate'
							title={m.title}>
							{m.title}
						</div>
						<div className='text-xs text-gray-500 mt-1'>
							{duration || (start ? start.toLocaleString() : '')}
						</div>
					</div>
				</div>

				<div className='flex items-center gap-4'>
					{/* prevent the Switch click from bubbling up to the row (so toggling doesn't navigate) */}
					<div
						className='flex flex-col items-end mr-4'
						onClick={(e) => e.stopPropagation()}>
						<div className='text-xs text-gray-500'>Attend</div>
						<div className='mt-1'>
							<Switch
								checked={attending}
								onCheckedChange={(v) => toggleAttend(m, v)}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<Card className='bg-white border border-gray-200 p-6 m-6'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-lg font-semibold text-gray-900'>Next Meeting</h3>
				<div className='text-sm text-gray-500'>
					{loading ? 'Loading...' : `${meetings.length} meetings`}
				</div>
			</div>

			{grouped.today.length > 0 && (
				<div className='mb-6'>
					<div className='text-sm text-gray-700 font-medium mb-3'>Today</div>
					<div className='space-y-2'>
						{grouped.today.map((m) => (
							<MeetingRow
								key={m._id}
								m={m}
							/>
						))}
					</div>
				</div>
			)}

			{grouped.yesterday.length > 0 && (
				<div className='mb-6'>
					<div className='text-sm text-gray-700 font-medium mb-3'>
						Yesterday
					</div>
					<div className='space-y-2'>
						{grouped.yesterday.map((m) => (
							<MeetingRow
								key={m._id}
								m={m}
							/>
						))}
					</div>
				</div>
			)}

			{displayOlder.length > 0 && (
				<div className='mb-6'>
					<div className='text-sm text-gray-700 font-medium mb-3'>
						Older Meetings
					</div>
					<div className='space-y-2'>
						{displayOlder.map((m) => (
							<MeetingRow
								key={m._id}
								m={m}
							/>
						))}
					</div>
				</div>
			)}

			{!loading && meetings.length === 0 && (
				<div className='py-8 text-center text-gray-500'>No meetings found</div>
			)}
		</Card>
	);
}

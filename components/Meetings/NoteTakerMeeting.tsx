'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Check, Link, X } from 'lucide-react';
import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { DateTimePicker } from '@/components/ui/datetimepicker';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
const BACKEND_ORIGIN = (() => {
	try {
		return new URL(API_BASE).origin;
	} catch {
		return API_BASE;
	}
})();
const TOKEN_KEY = 'token';

type CalendarEvent = {
	id: string;
	summary?: string;
	start?: { dateTime?: string; date?: string };
	end?: { dateTime?: string; date?: string };
	hangoutLink?: string;
	description?: string;
};

type InitialMeeting = {
	id: string;
	title?: string;
	meetingLink?: string;
	calendarEventId?: string;
	startDateTime?: string;
	endDateTime?: string;
};

type NoteTakerProps = {
	open: boolean;
	onOpenChange: (o: boolean) => void;
	initialMeeting?: InitialMeeting;
};

// Type for calendar event items from API
interface CalendarEventItem {
	id: string;
	summary?: string;
	start?: { dateTime?: string; date?: string };
	end?: { dateTime?: string; date?: string };
	hangoutLink?: string;
	conferenceData?: {
		entryPoints?: Array<{
			entryPointType?: string;
			uri?: string;
		}>;
	};
	description?: string;
}

// Type for meeting payload
interface MeetingPayload {
	title: string;
	description: string;
	startDateTime: string | null;
	endDateTime: string | null;
	notetakerEnabled: boolean;
	meetingLink?: string;
	calendarEventId?: string;
}

const formatEventLabel = (ev: CalendarEvent) => {
	const title = ev.summary ?? 'Untitled';
	const start = ev.start?.dateTime ?? ev.start?.date ?? '';
	const date = start
		? new Date(start).toLocaleString([], {
				dateStyle: 'medium',
				timeStyle: 'short',
		  })
		: '';
	return `${title}${date ? ` — ${date}` : ''}`;
};

// SSR-safe token getter
const getAppToken = (): string | null => {
	if (typeof window === 'undefined') return null;
	
	try {
		const fromLs = localStorage.getItem(TOKEN_KEY);
		if (fromLs) return fromLs;
		const match =
			document.cookie.match(/(?:^|;\s*)auth-token=([^;]+)/) ||
			document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
		return match ? decodeURIComponent(match[1]) : null;
	} catch {
		return null;
	}
};

// SSR-safe localStorage setter
const setAppToken = (token: string): void => {
	if (typeof window === 'undefined') return;
	
	try {
		localStorage.setItem(TOKEN_KEY, token);
	} catch (err) {
		console.warn('Failed to persist token', err);
	}
	
	try {
		const expires = new Date();
		expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
		document.cookie = `auth-token=${encodeURIComponent(
			token
		)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
	} catch (err) {
		console.warn('Failed to set cookie', err);
	}
};

const SkeletonRow: React.FC<{ className?: string }> = ({ className = '' }) => (
	<div className={`h-5 rounded-md bg-slate-200 animate-pulse ${className}`} />
);

// Helper: Combine Date + time string (HH:mm) to ISO string
const combineDateAndTime = (date: Date | undefined, time: string): string | null => {
	if (!date || !time) return null;
	const [hours, minutes] = time.split(':').map(Number);
	if (isNaN(hours) || isNaN(minutes)) return null;
	
	const combined = new Date(date);
	combined.setHours(hours, minutes, 0, 0);
	return combined.toISOString();
};

const NoteTaker: FC<NoteTakerProps> = ({ open, onOpenChange }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [startTime, setStartTime] = useState('09:00');
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);
	const [endTime, setEndTime] = useState('10:00');
	
	const [selectedMeetingPlatform, setSelectedMeetingPlatform] = useState<
		'google_calendar' | 'custom'
	>('google_calendar');
	const [customMeetingLink, setCustomMeetingLink] = useState('');
	const [allowNotetaker, setAllowNotetaker] = useState(false);

	const [loading, setLoading] = useState(false);
	const [eventsLoading, setEventsLoading] = useState(false);
	const [events, setEvents] = useState<CalendarEvent[]>([]);
	const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [googleConnected, setGoogleConnected] = useState(false);
	const [googleEmail, setGoogleEmail] = useState<string | null>(null);

	const [copiedEventId, setCopiedEventId] = useState<string | null>(null);
	const copyTimerRef = useRef<number | null>(null);

	const popupRef = useRef<Window | null>(null);
	const popupPollRef = useRef<number | null>(null);
	const messageListenerRef = useRef<((e: MessageEvent) => void) | undefined>(
		undefined
	);

	const [showAllEvents, setShowAllEvents] = useState(false);
	const VISIBLE_EVENTS_COUNT = 5;

	const MAX_FETCH_ATTEMPTS = 3;
	const BASE_BACKOFF_MS = 500;

	const lastFetchErrorRef = useRef<string | null>(null);

	const fetchCalendarEvents = useCallback(async (manual = false) => {
		const appToken = getAppToken();
		if (!appToken && !manual) {
			setEvents([]);
			setEventsLoading(false);
			return [];
		}

		setEventsLoading(true);
		setEvents([]);
		let attempt = 0;
		let mapped: CalendarEvent[] = []; 

		while (attempt < MAX_FETCH_ATTEMPTS) {
			try {
				const candidateUrls = [
					`${API_BASE}/api/auth/google/events?maxResults=50`,
					`${API_BASE}/api/calendar/events?maxResults=50`,
					`${API_BASE}/api/auth/google/events`,
					`${API_BASE}/api/calendar/events`,
				];

				for (const url of candidateUrls) {
					try {
						const res = await fetch(url, {
							method: 'GET',
							credentials: 'include',
							headers: {
								'Content-Type': 'application/json',
								...(appToken ? { Authorization: `Bearer ${appToken}` } : {}),
							},
						});
						if (!res.ok) {
							continue;
						}
						const json = await res.json();
						let items: CalendarEventItem[] = [];
						if (Array.isArray(json)) items = json;
						else if (Array.isArray(json?.events)) items = json.events;
						else if (Array.isArray(json?.items)) items = json.items;
						else if (Array.isArray(json?.data?.items)) items = json.data.items;
						else items = json?.items ?? json?.events ?? [];

						mapped = (items || []).map((it: CalendarEventItem) => ({
							id: it.id,
							summary: it.summary,
							start: it.start,
							end: it.end,
							hangoutLink:
								it.hangoutLink ??
								it.conferenceData?.entryPoints?.find(
									(e) => e.entryPointType === 'video'
								)?.uri,
							description: it.description,
						}));
						lastFetchErrorRef.current = null;
						break;
					} catch (err) {
						console.log(err);
						continue;
					}
				}

				setEvents(mapped);
				break;
			} catch (err) {
				attempt += 1;
				if (attempt >= MAX_FETCH_ATTEMPTS) {
					console.error('[NoteTaker] all event fetch attempts failed', err);
					lastFetchErrorRef.current = 'Failed to fetch calendar events';
					setEvents([]);
					if (manual) {
						toast({
							title: 'Events fetch failed',
							description: String(lastFetchErrorRef.current),
							variant: 'error',
						});
					}
					break;
				}
				const delay = BASE_BACKOFF_MS * 2 ** (attempt - 1);
				await new Promise((r) => setTimeout(r, delay));
				continue;
			}
		}

		setEventsLoading(false);
		return mapped;
	}, []); 

	useEffect(() => {
		if (open) {
			const token = getAppToken();
			if (token) {
				setGoogleConnected(true);
				fetchCalendarEvents(false).catch((err) =>
					console.warn('fetchCalendarEvents error on open', err)
				);
			} else {
				setGoogleConnected(false);
				setEvents([]);
				setSelectedEventId(null);
			}
		} else {
			setEvents([]);
			setSelectedEventId(null);
		}

		return () => {
			if (popupPollRef.current) {
				window.clearInterval(popupPollRef.current);
				popupPollRef.current = null;
			}
			if (messageListenerRef.current) {
				window.removeEventListener('message', messageListenerRef.current);
				messageListenerRef.current = undefined;
			}
			if (popupRef.current && !popupRef.current.closed)
				popupRef.current.close();
		};
	}, [open, fetchCalendarEvents]);

	const handleConnectGoogle = async () => {
		setError('');
		setSuccess('');
		const authUrl = `${API_BASE}/api/auth/google`;

		const onMessage = async (e: MessageEvent) => {
			try {
				const allowedOrigins = [BACKEND_ORIGIN, window.location.origin].filter(
					Boolean
				);
				if (!allowedOrigins.includes(e.origin)) {
					console.warn('Ignored message from origin', e.origin);
					return;
				}
				const data = e.data;
				if (!data || data.type !== 'google-auth') return;

				if (data.success) {
					if (data.token) {
						setAppToken(data.token);
					}

					setGoogleConnected(true);
					if (data.email) setGoogleEmail(data.email);
					window.removeEventListener('message', onMessage);
					messageListenerRef.current = undefined;
					try {
						popupRef.current?.close();
					} catch {}
					popupRef.current = null;
					if (popupPollRef.current) {
						window.clearInterval(popupPollRef.current);
						popupPollRef.current = null;
					}

					await fetchCalendarEvents(true);
				} else {
					window.removeEventListener('message', onMessage);
					toast({
						title: 'Google sign-in failed',
						description: data.message || 'Cancelled',
						variant: 'error',
					});
				}
			} catch (err) {
				console.warn('postMessage handler error', err);
			}
		};

		messageListenerRef.current = onMessage;
		window.addEventListener('message', onMessage, false);

		const width = 600,
			height = 700;
		const left = window.screenX + (window.innerWidth - width) / 2;
		const top = window.screenY + (window.innerHeight - height) / 2;
		const popup = window.open(
			authUrl,
			'googleAuth',
			`width=${width},height=${height},left=${left},top=${top}`
		);
		if (!popup) {
			window.removeEventListener('message', onMessage);
			messageListenerRef.current = undefined;
			toast({
				title: 'Popup blocked',
				description: 'Allow popups for this site',
				variant: 'error',
			});
			return;
		}
		popupRef.current = popup;

		popupPollRef.current = window.setInterval(async () => {
			try {
				if (!popup || popup.closed) {
					if (popupPollRef.current) {
						window.clearInterval(popupPollRef.current);
						popupPollRef.current = null;
					}
					if (messageListenerRef.current) {
						window.removeEventListener('message', messageListenerRef.current);
						messageListenerRef.current = undefined;
					}
					popupRef.current = null;
					const token = getAppToken();
					if (token) {
						setGoogleConnected(true);
						await fetchCalendarEvents(true);
					}
				}
			} catch (err) {
				console.warn('popup poll error', err);
			}
		}, 500);
	};

	const copySelectedMeetingLink = async () => {
		const ev = events.find((e) => e.id === selectedEventId);
		const url = ev?.hangoutLink || customMeetingLink || '';
		if (!url) {
			toast({
				title: 'No meeting link',
				description: 'Selected event has no meeting link',
				variant: 'error',
			});
			return;
		}
		try {
			await navigator.clipboard.writeText(url);
			setCopiedEventId(selectedEventId);
			if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
			copyTimerRef.current = window.setTimeout(() => {
				setCopiedEventId(null);
				copyTimerRef.current = null;
			}, 3000);
			toast({
				title: 'Copied',
				description: 'Meeting link copied to clipboard',
				variant: 'success',
			});
		} catch {
			toast({
				title: 'Copy failed',
				description: 'Could not copy link',
				variant: 'error',
			});
		}
	};

	const validate = () => {
		setError('');
		if (!startDate || !endDate || !startTime || !endTime) {
			setError('Please fill required dates and times.');
			toast({
				title: 'Validation error',
				description: 'Please fill required dates and times.',
				variant: 'error',
			});
			return false;
		}

		const startISO = combineDateAndTime(startDate, startTime);
		const endISO = combineDateAndTime(endDate, endTime);
		
		if (!startISO || !endISO) {
			setError('Please select valid date and time.');
			toast({
				title: 'Validation error',
				description: 'Invalid date/time',
				variant: 'error',
			});
			return false;
		}

		if (new Date(startISO) >= new Date(endISO)) {
			setError('End date/time must be after start date/time.');
			toast({
				title: 'Validation error',
				description: 'End must be after start',
				variant: 'error',
			});
			return false;
		}

		return true;
	};

	const submitMeeting = async (payload: MeetingPayload) => {
		const appToken = getAppToken();
		const res = await fetch(`${API_BASE}/api/meeting`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(appToken ? { Authorization: `Bearer ${appToken}` } : {}),
			},
			body: JSON.stringify(payload),
		});
		if (!res.ok) {
			const text = await res.text();
			throw new Error(text || 'Failed to save meeting');
		}
		return res.json();
	};

	const handleNotetakerToggle = async (v: boolean) => {
		setError('');
		if (v) {
			setAllowNotetaker(true);

			setTimeout(async () => {
				setLoading(true);
				try {
					if (!validate()) {
						setAllowNotetaker(false);
						setLoading(false);
						return;
					}

					if (
						selectedMeetingPlatform === 'google_calendar' &&
						events.length === 0
					) {
						setSelectedMeetingPlatform('custom');
					}

					const startISO = combineDateAndTime(startDate, startTime);
					const endISO = combineDateAndTime(endDate, endTime);

					const payload: MeetingPayload = {
						title: title || description || 'Meeting',
						description,
						startDateTime: startISO,
						endDateTime: endISO,
						notetakerEnabled: true,
						...(selectedMeetingPlatform === 'custom'
							? { meetingLink: customMeetingLink || undefined }
							: {}),
						...(selectedMeetingPlatform === 'google_calendar' && selectedEventId
							? { calendarEventId: selectedEventId }
							: {}),
					};

					const created = await submitMeeting(payload);

					if (created?.meetingLink) {
						try {
							await navigator.clipboard.writeText(created.meetingLink);
							toast({
								title: 'Meeting link copied',
								description: 'Meeting link generated & copied to clipboard',
								variant: 'success',
							});
						} catch {
							toast({
								title: 'Failed to copy',
								description: 'Meeting link failed to copy.',
								variant: 'error',
							});
						}
					}

					toast({
						title: 'Saved',
						description: 'Meeting saved with notetaker enabled',
						variant: 'success',
					});
					onOpenChange(false);
				} catch (err) {
					const errorMessage = err instanceof Error ? err.message : 'Failed to save meeting with notetaker';
					console.error('Auto-save notetaker error', err);
					setError(errorMessage);
					toast({
						title: 'Save failed',
						description: errorMessage,
						variant: 'error',
					});
					setAllowNotetaker(false);
				} finally {
					setLoading(false);
				}
			}, 300);
		} else {
			setAllowNotetaker(false);
		}
	};

	const INPUT_BORDER = '#989898';
	const INPUT_BG = '#FBFAF9';
	const INPUT_TEXT_COLOR = '#111827';

	const selectDisabled =
		googleConnected && !eventsLoading && events.length === 0;

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}>
			<DialogContent
				className='max-w-md p-0 gap-0 bg-white rounded-2xl'
				style={{ overflow: 'hidden' }}>
				<DialogTitle className="sr-only">Event Details</DialogTitle>
				<DialogDescription className="sr-only">
					Create or select a meeting event with optional notetaker
				</DialogDescription>
				<div className='px-14 py-8'>
					<div className='flex justify-between items-center mb-4'>
						<h2 className='text-base font-medium text-gray-900'>
							Event Details
						</h2>
						<button
							onClick={() => onOpenChange(false)}
							className='text-gray-400 hover:text-gray-600 transition-colors'
							aria-label='Close dialog'>
							<X size={20} />
						</button>
					</div>

					<div className='mx-auto max-w-sm'>
						{/* Title */}
						<div className='mb-5'>
							<label
								className='block text-sm text-gray-700 mb-2'
								style={{ fontWeight: 400, fontSize: '13px' }}>
								Title (Optional)
							</label>
							<Input
								type='text'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className='w-full px-3 py-2 rounded-xl focus:outline-none'
								placeholder=''
								style={{
									backgroundColor: INPUT_BG,
									border: `1px solid ${INPUT_BORDER}`,
									color: INPUT_TEXT_COLOR,
									fontWeight: 400,
									fontSize: '13px',
									borderRadius: 10,
								}}
								disabled={loading}
								aria-label='Title'
							/>
						</div>

						{/* Start Date & Time */}
						<div className='mb-5'>
							<DateTimePicker
								label="Start"
								date={startDate}
								onDateChange={setStartDate}
								time={startTime}
								onTimeChange={setStartTime}
								disabled={loading}
								id="start-datetime"
							/>
						</div>

						{/* End Date & Time */}
						<div className='mb-5'>
							<DateTimePicker
								label="End"
								date={endDate}
								onDateChange={setEndDate}
								time={endTime}
								onTimeChange={setEndTime}
								disabled={loading}
								id="end-datetime"
							/>
						</div>

						{/* Description */}
						<div className='mb-5'>
							<label
								className='block text-sm text-gray-700 mb-2'
								style={{ fontWeight: 400, fontSize: '13px' }}>
								Description (Optional)
							</label>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className='w-full min-h-[72px] px-3 py-2 rounded-xl focus:outline-none resize-none'
								placeholder=''
								style={{
									backgroundColor: INPUT_BG,
									border: `1px solid ${INPUT_BORDER}`,
									color: INPUT_TEXT_COLOR,
									fontWeight: 400,
									fontSize: '13px',
									borderRadius: 10,
								}}
								disabled={loading}
								aria-label='Description'
							/>
						</div>

						{/* Meeting selection */}
						<div className='mb-5'>
							<label
								className='block text-sm text-gray-700 mb-2'
								style={{ fontWeight: 400, fontSize: '13px' }}>
								Choose existing or created meeting
							</label>

							{selectedMeetingPlatform === 'google_calendar' &&
							googleConnected ? (
								<>
									{!eventsLoading && events.length === 0 ? (
										<div className='mb-3 p-3 rounded-md bg-yellow-50 border border-yellow-200'>
											<p className='text-sm text-yellow-800'>
												You don&apos;t have any calendar events. You can still create
												a meeting manually below.
											</p>
										</div>
									) : null}

									<Select
										value={selectedEventId ?? ''}
										onValueChange={(v) =>
											setSelectedEventId((prev) => {
												if (!v) return null;
												return prev === v ? null : v;
											})
										}>
										<SelectTrigger
											className={`w-full rounded-xl px-4 py-3 text-left ${
												selectDisabled ? 'opacity-60 pointer-events-none' : ''
											}`}
											style={{
												backgroundColor: INPUT_BG,
												border: `1px solid ${INPUT_BORDER}`,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												fontWeight: 400,
												fontSize: '13px',
												color: INPUT_TEXT_COLOR,
												borderRadius: 10,
											}}
											aria-disabled={selectDisabled}>
											<SelectValue placeholder='Meetings' />
										</SelectTrigger>

										<SelectContent>
											<SelectGroup>
												{eventsLoading && (
													<>
														<SelectItem value='pending'>Loading...</SelectItem>
														<div className='p-2 space-y-2'>
															<SkeletonRow />
															<SkeletonRow />
															<SkeletonRow />
														</div>
													</>
												)}
												{!eventsLoading && events.length === 0 && (
													<>
														<SelectItem
															value='no-events'
															disabled>
															No upcoming events
														</SelectItem>
													</>
												)}
												{!eventsLoading && events.length > 0 && (
													<>
														{(showAllEvents
															? events
															: events.slice(0, VISIBLE_EVENTS_COUNT)
														).map((ev) => (
															<SelectItem
																key={ev.id}
																value={ev.id}>
																{formatEventLabel(ev)}
															</SelectItem>
														))}

														{events.length > VISIBLE_EVENTS_COUNT && (
															<div className='p-2'>
																<button
																	type='button'
																	onClick={() => setShowAllEvents((s) => !s)}
																	className='text-sm underline'>
																	{showAllEvents
																		? 'Show fewer'
																		: `Show all (${events.length})`}
																</button>
															</div>
														)}
													</>
												)}
											</SelectGroup>
										</SelectContent>
									</Select>

									<Button
										onClick={copySelectedMeetingLink}
										disabled={!selectedEventId && !customMeetingLink}
										variant='outline'
										className='w-full mt-3 rounded-xl py-3'
										style={{
											backgroundColor: '#ffffff',
											border: `1px solid ${INPUT_BORDER}`,
											fontWeight: 400,
											fontSize: '13px',
											color: INPUT_TEXT_COLOR,
											borderRadius: 10,
										}}>
										{copiedEventId ? (
											<>
												<Check
													size={16}
													className='inline-block mr-2'
												/>
												Copied
											</>
										) : (
											<>
												Copy Meeting Link
												<Link
													size={16}
													className='ml-2'
												/>
											</>
										)}
									</Button>
								</>
							) : selectedMeetingPlatform === 'google_calendar' &&
							  !googleConnected ? (
								<div className='mt-2 flex items-center justify-between rounded-xl p-3 border border-yellow-300 bg-yellow-50'>
									<div>
										<p className='font-medium text-sm'>
											Google Calendar not connected
										</p>
										<p className='text-sm text-gray-600'>
											Connect Google to automatically create Calendar events.
										</p>
									</div>
									<div>
										<Button
											onClick={handleConnectGoogle}
											disabled={eventsLoading}
											size='sm'>
											Connect Google
										</Button>
									</div>
								</div>
							) : (
								selectedMeetingPlatform === 'custom' && (
									<div className='mt-2'>
										<label
											className='block text-sm text-gray-700 mb-2'
											style={{ fontWeight: 400, fontSize: '13px' }}>
											Meeting link (optional)
										</label>
										<Input
											type='url'
											value={customMeetingLink}
											onChange={(e) => setCustomMeetingLink(e.target.value)}
											placeholder='https://example.com/meeting'
											className='rounded-xl bg-gray-50'
											style={{
												backgroundColor: INPUT_BG,
												border: `1px solid ${INPUT_BORDER}`,
												color: INPUT_TEXT_COLOR,
												fontWeight: 400,
												fontSize: '13px',
												borderRadius: 10,
											}}
											disabled={loading}
										/>
									</div>
								)
							)}
						</div>

						{googleConnected && googleEmail && (
							<div className='mb-5 text-sm text-gray-600'>
								Connected as: {googleEmail}
							</div>
						)}

						{/* Notetaker toggle */}
						<div className='flex items-center justify-between border border-gray-200 rounded-xl p-4 bg-white'>
							<div>
								<p
									className='font-medium text-gray-900'
									style={{ fontSize: '14px' }}>
									Notetaker
								</p>
								<p
									className='text-sm text-gray-500'
									style={{ fontSize: '12px' }}>
									Allow notetaker to create notes
								</p>
							</div>
							<Switch
								checked={allowNotetaker}
								onCheckedChange={(v) => handleNotetakerToggle(Boolean(v))}
								className='data-[state=checked]:bg-green-500'
								disabled={loading}
								aria-label='Enable notetaker'
							/>
						</div>

						<div
							aria-live='polite'
							className='sr-only'>
							{error || success ? `${error || ''} ${success || ''}` : ''}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default NoteTaker;
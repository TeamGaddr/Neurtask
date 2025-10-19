/** @format */

// /** @format */

// // /** @format */

// // 'use client';

// // import { Button } from '@/components/ui/button';
// // import { Dialog, DialogContent } from '@/components/ui/dialog';
// // import { Input } from '@/components/ui/input';
// // import {
// // 	Select,
// // 	SelectContent,
// // 	SelectGroup,
// // 	SelectItem,
// // 	SelectTrigger,
// // 	SelectValue,
// // } from '@/components/ui/select';
// // import { Switch } from '@/components/ui/switch';
// // import { toast } from '@/hooks/use-toast';
// // import { Check, Link, Plus, X } from 'lucide-react';
// // import { type FC, useEffect, useRef, useState } from 'react';

// // const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
// // const BACKEND_ORIGIN = (() => {
// // 	try {
// // 		return new URL(API_BASE).origin;
// // 	} catch {
// // 		return API_BASE;
// // 	}
// // })();
// // const TOKEN_KEY = 'token';

// // type CalendarEvent = {
// // 	id: string;
// // 	summary?: string;
// // 	start?: { dateTime?: string; date?: string };
// // 	end?: { dateTime?: string; date?: string };
// // 	hangoutLink?: string;
// // 	description?: string;
// // };

// // type InitialMeeting = {
// // 	id: string; // _id
// // 	title?: string;
// // 	meetingLink?: string;
// // 	calendarEventId?: string;
// // 	startDateTime?: string;
// // 	endDateTime?: string;
// // };

// // type NoteTakerProps = {
// // 	open: boolean;
// // 	onOpenChange: (o: boolean) => void;
// // 	initialMeeting?: InitialMeeting;
// // };

// // // --- parsing helpers (same as before) ---
// // const parseDDMMYYYY = (s: string): Date | null => {
// // 	if (!s) return null;
// // 	const parts = s.trim().split('/');
// // 	if (parts.length !== 3) return null;
// // 	const [dd, mm, yyyy] = parts.map((p) => Number.parseInt(p, 10));
// // 	if (!dd || !mm || !yyyy) return null;
// // 	const date = new Date(yyyy, mm - 1, dd);
// // 	if (isNaN(date.getTime())) return null;
// // 	if (
// // 		date.getDate() !== dd ||
// // 		date.getMonth() !== mm - 1 ||
// // 		date.getFullYear() !== yyyy
// // 	)
// // 		return null;
// // 	return date;
// // };

// // const parseTimeAMPM = (
// // 	s: string
// // ): { hours: number; minutes: number } | null => {
// // 	if (!s) return null;
// // 	const m = s.trim().match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
// // 	if (!m) return null;
// // 	let hh = Number.parseInt(m[1], 10);
// // 	const mmn = Number.parseInt(m[2], 10);
// // 	const ampm = m[3].toUpperCase();
// // 	if (hh < 1 || hh > 12 || mmn < 0 || mmn > 59) return null;
// // 	if (ampm === 'AM') {
// // 		if (hh === 12) hh = 0;
// // 	} else {
// // 		if (hh !== 12) hh += 12;
// // 	}
// // 	return { hours: hh, minutes: mmn };
// // };

// // const combineToISOString = (
// // 	dateDDMMYYYY: string,
// // 	timeAMPM: string
// // ): string | null => {
// // 	const d = parseDDMMYYYY(dateDDMMYYYY);
// // 	const t = parseTimeAMPM(timeAMPM);
// // 	if (!d || !t) return null;
// // 	const combined = new Date(
// // 		d.getFullYear(),
// // 		d.getMonth(),
// // 		d.getDate(),
// // 		t.hours,
// // 		t.minutes,
// // 		0,
// // 		0
// // 	);
// // 	return combined.toISOString();
// // };

// // const formatTimeTo24Hour = (time12: string): string => {
// // 	const parsed = parseTimeAMPM(time12);
// // 	if (!parsed) return '';
// // 	const hours = parsed.hours.toString().padStart(2, '0');
// // 	const minutes = parsed.minutes.toString().padStart(2, '0');
// // 	return `${hours}:${minutes}`;
// // };

// // const formatTimeTo12Hour = (time24: string): string => {
// // 	if (!time24) return '';
// // 	const [hours, minutes] = time24.split(':').map(Number);
// // 	if (isNaN(hours) || isNaN(minutes)) return '';

// // 	const period = hours >= 12 ? 'PM' : 'AM';
// // 	const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
// // 	return `${displayHours.toString().padStart(2, '0')}:${minutes
// // 		.toString()
// // 		.padStart(2, '0')} ${period}`;
// // };

// // const isoToDDMMYYYY = (iso?: string): string => {
// // 	if (!iso) return '';
// // 	const d = new Date(iso);
// // 	if (isNaN(d.getTime())) return '';
// // 	const dd = String(d.getDate()).padStart(2, '0');
// // 	const mm = String(d.getMonth() + 1).padStart(2, '0');
// // 	const yyyy = d.getFullYear();
// // 	return `${dd}/${mm}/${yyyy}`;
// // };

// // const isoTo24Hour = (iso?: string): string => {
// // 	if (!iso) return '';
// // 	const d = new Date(iso);
// // 	if (isNaN(d.getTime())) return '';
// // 	const hh = String(d.getHours()).padStart(2, '0');
// // 	const min = String(d.getMinutes()).padStart(2, '0');
// // 	return `${hh}:${min}`;
// // };

// // const formatEventLabel = (ev: CalendarEvent) => {
// // 	const title = ev.summary ?? 'Untitled';
// // 	const start = ev.start?.dateTime ?? ev.start?.date ?? '';
// // 	const date = start
// // 		? new Date(start).toLocaleString([], {
// // 				dateStyle: 'medium',
// // 				timeStyle: 'short',
// // 		  })
// // 		: '';
// // 	return `${title}${date ? ` — ${date}` : ''}`;
// // };

// // const getAppToken = () => {
// // 	try {
// // 		const fromLs = localStorage.getItem(TOKEN_KEY);
// // 		if (fromLs) return fromLs;
// // 		const match =
// // 			document.cookie.match(/(?:^|;\s*)auth-token=([^;]+)/) ||
// // 			document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
// // 		return match ? decodeURIComponent(match[1]) : null;
// // 	} catch {
// // 		return null;
// // 	}
// // };

// // const Spinner: React.FC<{ size?: number }> = ({ size = 18 }) => (
// // 	<svg
// // 		className='animate-spin'
// // 		width={size}
// // 		height={size}
// // 		viewBox='0 0 24 24'
// // 		fill='none'
// // 		aria-hidden>
// // 		<circle
// // 			cx='12'
// // 			cy='12'
// // 			r='10'
// // 			stroke='currentColor'
// // 			strokeWidth='4'
// // 			opacity='0.2'
// // 		/>
// // 		<path
// // 			d='M22 12a10 10 0 00-10-10'
// // 			stroke='currentColor'
// // 			strokeWidth='4'
// // 			strokeLinecap='round'
// // 		/>
// // 	</svg>
// // );

// // /** Small skeleton used while events are loading */
// // const SkeletonRow: React.FC<{ className?: string }> = ({ className = '' }) => (
// // 	<div className={`h-5 rounded-md bg-slate-200 animate-pulse ${className}`} />
// // );

// // const NoteTaker: FC<NoteTakerProps> = ({
// // 	open,
// // 	onOpenChange,
// // 	initialMeeting,
// // }) => {
// // 	const [title, setTitle] = useState('');
// // 	const [description, setDescription] = useState('');
// // 	const [startDate, setStartDate] = useState(''); // dd/mm/yyyy
// // 	const [endDate, setEndDate] = useState('');
// // 	const [startTime, setStartTime] = useState('09:00 AM');
// // 	const [endTime, setEndTime] = useState('10:00 AM');
// // 	const [selectedMeetingPlatform, setSelectedMeetingPlatform] = useState<
// // 		'google_calendar' | 'custom'
// // 	>('google_calendar');
// // 	const [customMeetingLink, setCustomMeetingLink] = useState('');
// // 	const [allowNotetaker, setAllowNotetaker] = useState(false);

// // 	const [loading, setLoading] = useState(false);
// // 	const [eventsLoading, setEventsLoading] = useState(false);
// // 	const [events, setEvents] = useState<CalendarEvent[]>([]);
// // 	const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
// // 	const [error, setError] = useState('');
// // 	const [success, setSuccess] = useState('');
// // 	const [googleConnected, setGoogleConnected] = useState(false);
// // 	const [googleEmail, setGoogleEmail] = useState<string | null>(null);

// // 	const [copiedEventId, setCopiedEventId] = useState<string | null>(null);
// // 	const copyTimerRef = useRef<number | null>(null);

// // 	const popupRef = useRef<Window | null>(null);
// // 	const popupPollRef = useRef<number | null>(null);
// // 	const messageListenerRef = useRef<((e: MessageEvent) => void) | undefined>(
// // 		undefined
// // 	);

// // 	const [showAllEvents, setShowAllEvents] = useState(false);
// // 	const VISIBLE_EVENTS_COUNT = 5;

// // 	// initial focus ref for accessibility
// // 	const firstInputRef = useRef<HTMLInputElement | null>(null);

// // 	// small retry/backoff config for fetching events
// // 	const MAX_FETCH_ATTEMPTS = 3;
// // 	const BASE_BACKOFF_MS = 500; // start 500ms, then double

// // 	// track last fetch error to optionally show Retry CTA
// // 	const lastFetchErrorRef = useRef<string | null>(null);

// // 	useEffect(() => {
// // 		// When modal opens we intentionally do NOT prefill from initialMeeting

// // 		if (open) {
// // 			// Always attempt to fetch events when modal opens.
// // 			// This ensures event list is populated whether or not we have a token in LS.
// // 			fetchCalendarEvents(false).catch((err) =>
// // 				console.warn('fetchCalendarEvents error on open', err)
// // 			);

// // 			const token = getAppToken();
// // 			if (token) {
// // 				setGoogleConnected(true);
// // 			}
// // 		}
// // 		return () => {
// // 			if (popupPollRef.current) {
// // 				window.clearInterval(popupPollRef.current);
// // 				popupPollRef.current = null;
// // 			}
// // 			if (messageListenerRef.current) {
// // 				window.removeEventListener('message', messageListenerRef.current);
// // 				messageListenerRef.current = undefined;
// // 			}
// // 			if (popupRef.current && !popupRef.current.closed)
// // 				popupRef.current.close();
// // 		};
// // 		// eslint-disable-next-line react-hooks/exhaustive-deps
// // 	}, [open]);

// // 	// fetch calendar events (with exponential backoff retries)
// // 	const fetchCalendarEvents = async (manual = false) => {
// // 		// manual=true means user clicked "Retry" and wants immediate feedback
// // 		if (!manual) {
// // 			// silent background: keep minimal UI noise
// // 			lastFetchErrorRef.current = null;
// // 		}

// // 		setEventsLoading(true);
// // 		setEvents([]);
// // 		let attempt = 0;
// // 		let lastErr: any = null;
// // 		let finalMapped: CalendarEvent[] = [];

// // 		while (attempt < MAX_FETCH_ATTEMPTS) {
// // 			try {
// // 				const appToken = getAppToken();
// // 				const candidateUrls = [
// // 					`${API_BASE}/api/auth/google/events?maxResults=50`,
// // 					`${API_BASE}/api/calendar/events?maxResults=50`,
// // 					`${API_BASE}/api/auth/google/events`,
// // 					`${API_BASE}/api/calendar/events`,
// // 				];

// // 				for (const url of candidateUrls) {
// // 					try {
// // 						const res = await fetch(url, {
// // 							method: 'GET',
// // 							credentials: 'include',
// // 							headers: {
// // 								'Content-Type': 'application/json',
// // 								...(appToken ? { Authorization: `Bearer ${appToken}` } : {}),
// // 							},
// // 						});
// // 						if (!res.ok) {
// // 							lastErr = { url, status: res.status };
// // 							continue;
// // 						}
// // 						const json = await res.json();
// // 						let items: any[] = [];
// // 						if (Array.isArray(json)) items = json;
// // 						else if (Array.isArray(json?.events)) items = json.events;
// // 						else if (Array.isArray(json?.items)) items = json.items;
// // 						else if (Array.isArray(json?.data?.items)) items = json.data.items;
// // 						else items = json?.items ?? json?.events ?? [];

// // 						finalMapped = (items || []).map((it: any) => ({
// // 							id: it.id,
// // 							summary: it.summary,
// // 							start: it.start,
// // 							end: it.end,
// // 							hangoutLink:
// // 								it.hangoutLink ??
// // 								it.conferenceData?.entryPoints?.find(
// // 									(e: any) => e.entryPointType === 'video'
// // 								)?.uri,
// // 							description: it.description,
// // 						}));

// // 						// success for this candidate url
// // 						lastFetchErrorRef.current = null;
// // 						break; // break out of candidateUrls loop
// // 					} catch (err) {
// // 						lastErr = err;
// // 						continue;
// // 					}
// // 				}

// // 				// if we have finalMapped (possibly empty) then success (no need to retry)
// // 				// break out of the attempts loop
// // 				break;
// // 			} catch (err) {
// // 				attempt += 1;
// // 				// if we've exhausted attempts, set events empty and log
// // 				if (attempt >= MAX_FETCH_ATTEMPTS) {
// // 					console.error('[NoteTaker] all event fetch attempts failed', err);
// // 					lastFetchErrorRef.current =
// // 						(err && err.message) || 'Failed to fetch calendar events';
// // 					finalMapped = [];
// // 					// if manual, give user immediate feedback
// // 					if (manual) {
// // 						toast({
// // 							title: 'Events fetch failed',
// // 							description: String(lastFetchErrorRef.current),
// // 							variant: 'error',
// // 						});
// // 					}
// // 					break;
// // 				}
// // 				// exponential backoff delay
// // 				const delay = BASE_BACKOFF_MS * 2 ** (attempt - 1);
// // 				await new Promise((r) => setTimeout(r, delay));
// // 				continue;
// // 			}
// // 		}

// // 		// Always update state and clear loading here
// // 		try {
// // 			setEvents(finalMapped);
// // 			// IMPORTANT: do NOT auto-select the first event — keep placeholder until user explicitly selects.
// // 			// if (finalMapped.length && !selectedEventId) {
// // 			//   setSelectedEventId(finalMapped[0].id);
// // 			// }
// // 		} finally {
// // 			setEventsLoading(false);
// // 		}

// // 		return finalMapped;
// // 	};

// // 	// google connect flow (unchanged)
// // 	const handleConnectGoogle = async () => {
// // 		setError('');
// // 		setSuccess('');
// // 		const authUrl = `${API_BASE}/api/auth/google`;

// // 		const onMessage = async (e: MessageEvent) => {
// // 			try {
// // 				const allowedOrigins = [BACKEND_ORIGIN, window.location.origin].filter(
// // 					Boolean
// // 				);
// // 				if (!allowedOrigins.includes(e.origin)) {
// // 					console.warn('Ignored message from origin', e.origin);
// // 					return;
// // 				}
// // 				const data = e.data;
// // 				if (!data || data.type !== 'google-auth') return;

// // 				if (data.success) {
// // 					if (data.token) {
// // 						try {
// // 							localStorage.setItem(TOKEN_KEY, data.token);
// // 						} catch (err) {
// // 							console.warn('Failed to persist token', err);
// // 						}
// // 						try {
// // 							const expires = new Date();
// // 							expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
// // 							document.cookie = `auth-token=${encodeURIComponent(
// // 								data.token
// // 							)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
// // 						} catch {}
// // 					}

// // 					setGoogleConnected(true);
// // 					if (data.email) setGoogleEmail(data.email);
// // 					window.removeEventListener('message', onMessage);
// // 					messageListenerRef.current = undefined;
// // 					try {
// // 						popupRef.current?.close();
// // 					} catch {}
// // 					popupRef.current = null;
// // 					if (popupPollRef.current) {
// // 						window.clearInterval(popupPollRef.current);
// // 						popupPollRef.current = null;
// // 					}

// // 					await fetchCalendarEvents(true); // manual=true to give feedback on failure
// // 				} else {
// // 					window.removeEventListener('message', onMessage);
// // 					toast({
// // 						title: 'Google sign-in failed',
// // 						description: data.message || 'Cancelled',
// // 						variant: 'error',
// // 					});
// // 				}
// // 			} catch (err) {
// // 				console.warn('postMessage handler error', err);
// // 			}
// // 		};

// // 		messageListenerRef.current = onMessage;
// // 		window.addEventListener('message', onMessage, false);

// // 		const width = 600,
// // 			height = 700;
// // 		const left = window.screenX + (window.innerWidth - width) / 2;
// // 		const top = window.screenY + (window.innerHeight - height) / 2;
// // 		const popup = window.open(
// // 			authUrl,
// // 			'googleAuth',
// // 			`width=${width},height=${height},left=${left},top=${top}`
// // 		);
// // 		if (!popup) {
// // 			window.removeEventListener('message', onMessage);
// // 			messageListenerRef.current = undefined;
// // 			toast({
// // 				title: 'Popup blocked',
// // 				description: 'Allow popups for this site',
// // 				variant: 'error',
// // 			});
// // 			return;
// // 		}
// // 		popupRef.current = popup;

// // 		popupPollRef.current = window.setInterval(async () => {
// // 			try {
// // 				if (!popup || popup.closed) {
// // 					if (popupPollRef.current) {
// // 						window.clearInterval(popupPollRef.current);
// // 						popupPollRef.current = null;
// // 					}
// // 					if (messageListenerRef.current) {
// // 						window.removeEventListener('message', messageListenerRef.current);
// // 						messageListenerRef.current = undefined;
// // 					}
// // 					popupRef.current = null;
// // 					const token = getAppToken();
// // 					if (token) {
// // 						setGoogleConnected(true);
// // 						await fetchCalendarEvents(true); // manual=true when popup closed
// // 					}
// // 				}
// // 			} catch (err) {
// // 				console.warn('popup poll error', err);
// // 			}
// // 		}, 500);
// // 	};

// // 	const copySelectedMeetingLink = async () => {
// // 		const ev = events.find((e) => e.id === selectedEventId);
// // 		const url = ev?.hangoutLink || customMeetingLink || '';
// // 		if (!url) {
// // 			toast({
// // 				title: 'No meeting link',
// // 				description: 'Selected event has no meeting link',
// // 				variant: 'error',
// // 			});
// // 			return;
// // 		}
// // 		try {
// // 			await navigator.clipboard.writeText(url);
// // 			setCopiedEventId(selectedEventId);
// // 			if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
// // 			copyTimerRef.current = window.setTimeout(() => {
// // 				setCopiedEventId(null);
// // 				copyTimerRef.current = null;
// // 			}, 3000);
// // 			toast({
// // 				title: 'Copied',
// // 				description: 'Meeting link copied to clipboard',
// // 				variant: 'success',
// // 			});
// // 		} catch {
// // 			toast({
// // 				title: 'Copy failed',
// // 				description: 'Could not copy link',
// // 				variant: 'error',
// // 			});
// // 		}
// // 	};

// // 	const validate = () => {
// // 		setError('');
// // 		if (!startDate || !endDate || !startTime || !endTime) {
// // 			setError('Please fill required dates and times.');
// // 			toast({
// // 				title: 'Validation error',
// // 				description: 'Please fill required dates and times.',
// // 				variant: 'error',
// // 			});
// // 			return false;
// // 		}

// // 		const startISO = combineToISOString(startDate, startTime);
// // 		const endISO = combineToISOString(endDate, endTime);
// // 		if (!startISO || !endISO) {
// // 			setError(
// // 				'Please use valid date (dd/mm/yyyy) and time (hh:mm AM/PM) formats.'
// // 			);
// // 			toast({
// // 				title: 'Validation error',
// // 				description: 'Invalid date/time format',
// // 				variant: 'error',
// // 			});
// // 			return false;
// // 		}

// // 		if (new Date(startISO) >= new Date(endISO)) {
// // 			setError('End date/time must be after start date/time.');
// // 			toast({
// // 				title: 'Validation error',
// // 				description: 'End must be after start',
// // 				variant: 'error',
// // 			});
// // 			return false;
// // 		}

// // 		return true;
// // 	};

// // 	const submitMeeting = async (payload: any) => {
// // 		const appToken = getAppToken();
// // 		const res = await fetch(`${API_BASE}/api/meeting`, {
// // 			method: 'POST',
// // 			headers: {
// // 				'Content-Type': 'application/json',
// // 				...(appToken ? { Authorization: `Bearer ${appToken}` } : {}),
// // 			},
// // 			body: JSON.stringify(payload),
// // 		});
// // 		if (!res.ok) {
// // 			const text = await res.text();
// // 			throw new Error(text || 'Failed to save meeting');
// // 		}
// // 		return res.json();
// // 	};

// // 	// NOTE: user requested that saving only starts when the switch becomes ON.
// // 	// handleNotetakerToggle will only attempt to save when v===true.
// // 	const handleNotetakerToggle = async (v: boolean) => {
// // 		setError('');
// // 		if (v) {
// // 			// optimistic UI: flip the switch immediately so user sees the change
// // 			setAllowNotetaker(true);

// // 			// small delay before showing the spinner so the toggle feels responsive
// // 			setTimeout(async () => {
// // 				setLoading(true);
// // 				try {
// // 					// validate before attempting save; if validation fails, rollback
// // 					if (!validate()) {
// // 						setAllowNotetaker(false);
// // 						setLoading(false);
// // 						return;
// // 					}

// // 					// if user selected google platform but there are no events available, fall back
// // 					// to creating a meeting (custom) so backend can generate link (if configured).
// // 					if (
// // 						selectedMeetingPlatform === 'google_calendar' &&
// // 						events.length === 0
// // 					) {
// // 						setSelectedMeetingPlatform('custom');
// // 					}

// // 					const payloadStartDate = startDate;
// // 					const payloadEndDate = endDate;
// // 					const payloadStartTime = formatTimeTo24Hour(startTime);
// // 					const payloadEndTime = formatTimeTo24Hour(endTime);

// // 					const payload: any = {
// // 						title: title || description || 'Meeting',
// // 						description,
// // 						startDate: payloadStartDate,
// // 						endDate: payloadEndDate,
// // 						startTime: payloadStartTime,
// // 						endTime: payloadEndTime,
// // 						notetakerEnabled: true,
// // 						...(selectedMeetingPlatform === 'custom'
// // 							? { meetingLink: customMeetingLink || undefined }
// // 							: {}),
// // 						...(selectedMeetingPlatform === 'google_calendar' && selectedEventId
// // 							? { calendarEventId: selectedEventId }
// // 							: {}),
// // 					};

// // 					// Submit: backend should create meeting and — if configured — create meeting link when notetakerEnabled is true.
// // 					const created = await submitMeeting(payload);

// // 					// If backend returns meeting with meetingLink, we can optionally copy it:
// // 					if (created?.meetingLink) {
// // 						try {
// // 							await navigator.clipboard.writeText(created.meetingLink);
// // 							toast({
// // 								title: 'Meeting link copied',
// // 								description: 'Meeting link generated & copied to clipboard',
// // 								variant: 'success',
// // 							});
// // 						} catch {
// // 							/* ignore clipboard failure */
// // 						}
// // 					}

// // 					// success: show toast and close modal
// // 					toast({
// // 						title: 'Saved',
// // 						description: 'Meeting saved with notetaker enabled',
// // 						variant: 'success',
// // 					});
// // 					onOpenChange(false);
// // 				} catch (err: any) {
// // 					console.error('Auto-save notetaker error', err);
// // 					setError(err?.message || 'Failed to save meeting with notetaker');
// // 					toast({
// // 						title: 'Save failed',
// // 						description: err?.message || 'Failed to save meeting',
// // 						variant: 'error',
// // 					});
// // 					// rollback toggle on failure
// // 					setAllowNotetaker(false);
// // 				} finally {
// // 					setLoading(false);
// // 				}
// // 			}, 300);
// // 		} else {
// // 			// user toggled off: just update local state (no save action)
// // 			setAllowNotetaker(false);
// // 		}
// // 	};

// // 	// design-specific constants (fixed order: border = #FBFAF9, bg = #989898)
// // 	const INPUT_BORDER = '#989898';
// // 	const INPUT_BG = ' #FBFAF9';
// // 	const INPUT_TEXT_COLOR = '#111827';

// // 	// helper: when there are no events, allow the user to create one quickly
// // 	const handleCreateMeetingManually = () => {
// // 		setSelectedMeetingPlatform('custom');
// // 	};

// // 	return (
// // 		<Dialog
// // 			open={open}
// // 			onOpenChange={onOpenChange}>
// // 			{/* Reduced modal width (max-w-md) and increased internal padding to match design.
// //                 The inner content is constrained to max-w-sm so fields appear narrower. */}
// // 			<DialogContent
// // 				className='max-w-md p-0 gap-0 bg-white rounded-2xl'
// // 				style={{ overflow: 'hidden' }}>
// // 				{/* Increased outer padding to create spacious sides */}
// // 				<div className='px-14 py-8'>
// // 					{/* header */}
// // 					<div className='flex justify-between items-center mb-4'>
// // 						<h2 className='text-base font-medium text-gray-900'>
// // 							Event Details
// // 						</h2>
// // 						<button
// // 							onClick={() => onOpenChange(false)}
// // 							className='text-gray-400 hover:text-gray-600 transition-colors'
// // 							aria-label='Close dialog'>
// // 							<X size={20} />
// // 						</button>
// // 					</div>

// // 					{/* main content with stricter width so fields are narrower like the design */}
// // 					<div className='mx-auto max-w-sm'>
// // 						{/* Start date */}
// // 						<div className='mb-5'>
// // 							<label
// // 								className='block text-sm text-gray-700 mb-2'
// // 								style={{ fontWeight: 400, fontSize: '13px' }}>
// // 								Start date
// // 							</label>
// // 							<input
// // 								ref={firstInputRef}
// // 								type='text'
// // 								value={startDate}
// // 								onChange={(e) => setStartDate(e.target.value)}
// // 								placeholder='dd/mm/yyyy'
// // 								className='w-full px-3 py-2 rounded-xl focus:outline-none'
// // 								style={{
// // 									backgroundColor: INPUT_BG,
// // 									border: `1px solid ${INPUT_BORDER}`,
// // 									color: INPUT_TEXT_COLOR,
// // 									fontWeight: 400,
// // 									fontSize: '13px',
// // 									borderRadius: 10,
// // 								}}
// // 								disabled={loading}
// // 								aria-label='Start date (dd/mm/yyyy)'
// // 							/>
// // 						</div>

// // 						{/* End date */}
// // 						<div className='mb-5'>
// // 							<label
// // 								className='block text-sm text-gray-700 mb-2'
// // 								style={{ fontWeight: 400, fontSize: '13px' }}>
// // 								End date
// // 							</label>
// // 							<input
// // 								type='text'
// // 								value={endDate}
// // 								onChange={(e) => setEndDate(e.target.value)}
// // 								placeholder='dd/mm/yyyy'
// // 								className='w-full px-3 py-2 rounded-xl focus:outline-none'
// // 								style={{
// // 									backgroundColor: INPUT_BG,
// // 									border: `1px solid ${INPUT_BORDER}`,
// // 									color: INPUT_TEXT_COLOR,
// // 									fontWeight: 400,
// // 									fontSize: '13px',
// // 									borderRadius: 10,
// // 								}}
// // 								disabled={loading}
// // 								aria-label='End date (dd/mm/yyyy)'
// // 							/>
// // 						</div>

// // 						{/* Start & End time */}
// // 						<div className='grid grid-cols-2 gap-4 mb-5'>
// // 							<div>
// // 								<label
// // 									className='block text-sm text-gray-700 mb-2'
// // 									style={{ fontWeight: 400, fontSize: '13px' }}>
// // 									Start time
// // 								</label>
// // 								<input
// // 									type='text'
// // 									value={startTime}
// // 									onChange={(e) => setStartTime(e.target.value)}
// // 									placeholder='09:00 AM'
// // 									className='w-full px-3 py-2 rounded-xl focus:outline-none'
// // 									style={{
// // 										backgroundColor: INPUT_BG,
// // 										border: `1px solid ${INPUT_BORDER}`,
// // 										color: INPUT_TEXT_COLOR,
// // 										fontWeight: 400,
// // 										fontSize: '13px',
// // 										borderRadius: 10,
// // 									}}
// // 									disabled={loading}
// // 									aria-label='Start time (hh:mm AM/PM)'
// // 								/>
// // 							</div>
// // 							<div>
// // 								<label
// // 									className='block text-sm text-gray-700 mb-2'
// // 									style={{ fontWeight: 400, fontSize: '13px' }}>
// // 									End time
// // 								</label>
// // 								<input
// // 									type='text'
// // 									value={endTime}
// // 									onChange={(e) => setEndTime(e.target.value)}
// // 									placeholder='10:00 AM'
// // 									className='w-full px-3 py-2 rounded-xl focus:outline-none'
// // 									style={{
// // 										backgroundColor: INPUT_BG,
// // 										border: `1px solid ${INPUT_BORDER}`,
// // 										color: INPUT_TEXT_COLOR,
// // 										fontWeight: 400,
// // 										fontSize: '13px',
// // 										borderRadius: 10,
// // 									}}
// // 									disabled={loading}
// // 									aria-label='End time (hh:mm AM/PM)'
// // 								/>
// // 							</div>
// // 						</div>

// // 						{/* Description */}
// // 						<div className='mb-5'>
// // 							<label
// // 								className='block text-sm text-gray-700 mb-2'
// // 								style={{ fontWeight: 400, fontSize: '13px' }}>
// // 								Description (Optional)
// // 							</label>
// // 							<textarea
// // 								value={description}
// // 								onChange={(e) => setDescription(e.target.value)}
// // 								className='w-full min-h-[72px] px-3 py-2 rounded-xl focus:outline-none resize-none'
// // 								placeholder=''
// // 								style={{
// // 									backgroundColor: INPUT_BG,
// // 									border: `1px solid ${INPUT_BORDER}`,
// // 									color: INPUT_TEXT_COLOR,
// // 									fontWeight: 400,
// // 									fontSize: '13px',
// // 									borderRadius: 10,
// // 								}}
// // 								disabled={loading}
// // 								aria-label='Description'
// // 							/>
// // 						</div>

// // 						{/* Meeting selection */}
// // 						<div className='mb-5'>
// // 							<label
// // 								className='block text-sm text-gray-700 mb-2'
// // 								style={{ fontWeight: 400, fontSize: '13px' }}>
// // 								Choose existing or created meeting
// // 							</label>

// // 							{selectedMeetingPlatform === 'google_calendar' &&
// // 							googleConnected ? (
// // 								<>
// // 									{/* show explicit message when there are no events */}
// // 									{!eventsLoading && events.length === 0 && (
// // 										<div className='mb-3 p-3 rounded-md bg-yellow-50 border border-yellow-200'>
// // 											<p className='text-sm text-yellow-800'>
// // 												No events found in your Google Calendar. Create a
// // 												meeting manually to continue.
// // 											</p>
// // 										</div>
// // 									)}

// // 									{/* IMPORTANT: select toggles off when clicking same item.
// //                                         placeholder is shown when selectedEventId is null/empty */}
// // 									<Select
// // 										value={selectedEventId ?? ''}
// // 										onValueChange={(v) =>
// // 											setSelectedEventId((prev) => {
// // 												// if user clicked the currently selected value -> deselect
// // 												if (!v) return null;
// // 												return prev === v ? null : v;
// // 											})
// // 										}>
// // 										<SelectTrigger
// // 											className='w-full rounded-xl px-4 py-3 text-left'
// // 											style={{
// // 												backgroundColor: INPUT_BG,
// // 												border: `1px solid ${INPUT_BORDER}`,
// // 												display: 'flex',
// // 												alignItems: 'center',
// // 												justifyContent: 'center', // center the placeholder text
// // 												fontWeight: 400,
// // 												fontSize: '13px',
// // 												color: INPUT_TEXT_COLOR,
// // 												borderRadius: 10,
// // 											}}>
// // 											{/* placeholder will show when value is '' (i.e. selectedEventId is null) */}
// // 											<SelectValue placeholder='Meetings' />
// // 										</SelectTrigger>

// // 										<SelectContent>
// // 											<SelectGroup>
// // 												{eventsLoading && (
// // 													<>
// // 														<SelectItem value='pending'>Loading...</SelectItem>
// // 														<div className='p-2 space-y-2'>
// // 															<SkeletonRow />
// // 															<SkeletonRow />
// // 															<SkeletonRow />
// // 														</div>
// // 													</>
// // 												)}
// // 												{!eventsLoading && events.length === 0 && (
// // 													<>
// // 														<SelectItem value='upcoming'>
// // 															No upcoming events
// // 														</SelectItem>
// // 														<div className='p-3 space-y-2'>
// // 															<p
// // 																className='text-sm text-gray-600'
// // 																style={{ fontSize: '12px' }}>
// // 																No calendar events found. Create a meeting
// // 																manually to continue.
// // 															</p>
// // 															<div className='flex gap-2'>
// // 																<Button
// // 																	variant='ghost'
// // 																	onClick={() => fetchCalendarEvents(true)}
// // 																	disabled={eventsLoading}
// // 																	size='sm'>
// // 																	Retry
// // 																</Button>
// // 																<Button
// // 																	onClick={handleCreateMeetingManually}
// // 																	disabled={loading}
// // 																	size='sm'>
// // 																	<Plus
// // 																		size={14}
// // 																		className='mr-2'
// // 																	/>
// // 																	Create meeting
// // 																</Button>
// // 															</div>
// // 														</div>
// // 													</>
// // 												)}
// // 												{!eventsLoading && events.length > 0 && (
// // 													<>
// // 														{(showAllEvents
// // 															? events
// // 															: events.slice(0, VISIBLE_EVENTS_COUNT)
// // 														).map((ev) => (
// // 															<SelectItem
// // 																key={ev.id}
// // 																value={ev.id}>
// // 																{formatEventLabel(ev)}
// // 															</SelectItem>
// // 														))}

// // 														{events.length > VISIBLE_EVENTS_COUNT && (
// // 															<div className='p-2'>
// // 																<button
// // 																	type='button'
// // 																	onClick={() => setShowAllEvents((s) => !s)}
// // 																	className='text-sm underline'>
// // 																	{showAllEvents
// // 																		? 'Show fewer'
// // 																		: `Show all (${events.length})`}
// // 																</button>
// // 															</div>
// // 														)}
// // 													</>
// // 												)}
// // 											</SelectGroup>
// // 										</SelectContent>
// // 									</Select>

// // 									<Button
// // 										onClick={copySelectedMeetingLink}
// // 										disabled={!selectedEventId && !customMeetingLink}
// // 										variant='outline'
// // 										className='w-full mt-3 rounded-xl py-3'
// // 										style={{
// // 											backgroundColor: '#ffffff',
// // 											border: `1px solid ${INPUT_BORDER}`,
// // 											fontWeight: 400,
// // 											fontSize: '13px',
// // 											color: INPUT_TEXT_COLOR,
// // 											borderRadius: 10,
// // 										}}>
// // 										{copiedEventId ? (
// // 											<>
// // 												<Check
// // 													size={16}
// // 													className='inline-block mr-2'
// // 												/>
// // 												Copied
// // 											</>
// // 										) : (
// // 											<>
// // 												Copy Meeting Link
// // 												<Link
// // 													size={16}
// // 													className='ml-2'
// // 												/>
// // 											</>
// // 										)}
// // 									</Button>
// // 								</>
// // 							) : selectedMeetingPlatform === 'google_calendar' &&
// // 							  !googleConnected ? (
// // 								<div className='mt-2 flex items-center justify-between rounded-xl p-3 border border-yellow-300 bg-yellow-50'>
// // 									<div>
// // 										<p className='font-medium text-sm'>
// // 											Google Calendar not connected
// // 										</p>
// // 										<p className='text-sm text-gray-600'>
// // 											Connect Google to automatically create Calendar events.
// // 										</p>
// // 									</div>
// // 									<div>
// // 										<Button
// // 											onClick={handleConnectGoogle}
// // 											disabled={eventsLoading}
// // 											size='sm'>
// // 											Connect Google
// // 										</Button>
// // 									</div>
// // 								</div>
// // 							) : (
// // 								selectedMeetingPlatform === 'custom' && (
// // 									<div className='mt-2'>
// // 										<label
// // 											className='block text-sm text-gray-700 mb-2'
// // 											style={{ fontWeight: 400, fontSize: '13px' }}>
// // 											Meeting link (optional)
// // 										</label>
// // 										<Input
// // 											type='url'
// // 											value={customMeetingLink}
// // 											onChange={(e) => setCustomMeetingLink(e.target.value)}
// // 											placeholder='https://example.com/meeting'
// // 											className='rounded-xl bg-gray-50'
// // 											style={{
// // 												backgroundColor: INPUT_BG,
// // 												border: `1px solid ${INPUT_BORDER}`,
// // 												color: INPUT_TEXT_COLOR,
// // 												fontWeight: 400,
// // 												fontSize: '13px',
// // 												borderRadius: 10,
// // 											}}
// // 											disabled={loading}
// // 										/>
// // 									</div>
// // 								)
// // 							)}
// // 						</div>

// // 						{/* Notetaker toggle */}
// // 						<div className='flex items-center justify-between border border-gray-200 rounded-xl p-4 bg-white'>
// // 							<div>
// // 								<p
// // 									className='font-medium text-gray-900'
// // 									style={{ fontSize: '14px' }}>
// // 									Notetaker
// // 								</p>
// // 								<p
// // 									className='text-sm text-gray-500'
// // 									style={{ fontSize: '12px' }}>
// // 									Allow notetaker to create notes
// // 								</p>
// // 							</div>
// // 							{/* Switch is controlled by allowNotetaker — it only becomes true after success */}
// // 							<Switch
// // 								checked={allowNotetaker}
// // 								onCheckedChange={(v) => handleNotetakerToggle(Boolean(v))}
// // 								className='data-[state=checked]:bg-green-500'
// // 								disabled={loading}
// // 								aria-label='Enable notetaker'
// // 							/>
// // 						</div>

// // 						{/* status / feedback area (aria-live for screen readers) */}
// // 						<div
// // 							aria-live='polite'
// // 							className='sr-only'>
// // 							{error || success ? `${error || ''} ${success || ''}` : ''}
// // 						</div>
// // 					</div>
// // 				</div>
// // 			</DialogContent>
// // 		</Dialog>
// // 	);
// // };

// // export default NoteTaker;

// /** @format */

// 'use client';

// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import {
// 	Select,
// 	SelectContent,
// 	SelectGroup,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/select';
// import { Switch } from '@/components/ui/switch';
// import { toast } from '@/hooks/use-toast';
// import { Check, Link, Plus, X } from 'lucide-react';
// import { type FC, useEffect, useRef, useState } from 'react';

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
// const BACKEND_ORIGIN = (() => {
// 	try {
// 		return new URL(API_BASE).origin;
// 	} catch {
// 		return API_BASE;
// 	}
// })();
// const TOKEN_KEY = 'token';

// type CalendarEvent = {
// 	id: string;
// 	summary?: string;
// 	start?: { dateTime?: string; date?: string };
// 	end?: { dateTime?: string; date?: string };
// 	hangoutLink?: string;
// 	description?: string;
// };

// type InitialMeeting = {
// 	id: string; // _id
// 	title?: string;
// 	meetingLink?: string;
// 	calendarEventId?: string;
// 	startDateTime?: string;
// 	endDateTime?: string;
// };

// type NoteTakerProps = {
// 	open: boolean;
// 	onOpenChange: (o: boolean) => void;
// 	initialMeeting?: InitialMeeting;
// };

// // --- parsing helpers (same as before) ---
// const parseDDMMYYYY = (s: string): Date | null => {
// 	if (!s) return null;
// 	const parts = s.trim().split('/');
// 	if (parts.length !== 3) return null;
// 	const [dd, mm, yyyy] = parts.map((p) => Number.parseInt(p, 10));
// 	if (!dd || !mm || !yyyy) return null;
// 	const date = new Date(yyyy, mm - 1, dd);
// 	if (isNaN(date.getTime())) return null;
// 	if (
// 		date.getDate() !== dd ||
// 		date.getMonth() !== mm - 1 ||
// 		date.getFullYear() !== yyyy
// 	)
// 		return null;
// 	return date;
// };

// const parseTimeAMPM = (
// 	s: string
// ): { hours: number; minutes: number } | null => {
// 	if (!s) return null;
// 	const m = s.trim().match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
// 	if (!m) return null;
// 	let hh = Number.parseInt(m[1], 10);
// 	const mmn = Number.parseInt(m[2], 10);
// 	const ampm = m[3].toUpperCase();
// 	if (hh < 1 || hh > 12 || mmn < 0 || mmn > 59) return null;
// 	if (ampm === 'AM') {
// 		if (hh === 12) hh = 0;
// 	} else {
// 		if (hh !== 12) hh += 12;
// 	}
// 	return { hours: hh, minutes: mmn };
// };

// const combineToISOString = (
// 	dateDDMMYYYY: string,
// 	timeAMPM: string
// ): string | null => {
// 	const d = parseDDMMYYYY(dateDDMMYYYY);
// 	const t = parseTimeAMPM(timeAMPM);
// 	if (!d || !t) return null;
// 	const combined = new Date(
// 		d.getFullYear(),
// 		d.getMonth(),
// 		d.getDate(),
// 		t.hours,
// 		t.minutes,
// 		0,
// 		0
// 	);
// 	return combined.toISOString();
// };

// const formatTimeTo24Hour = (time12: string): string => {
// 	const parsed = parseTimeAMPM(time12);
// 	if (!parsed) return '';
// 	const hours = parsed.hours.toString().padStart(2, '0');
// 	const minutes = parsed.minutes.toString().padStart(2, '0');
// 	return `${hours}:${minutes}`;
// };

// const formatTimeTo12Hour = (time24: string): string => {
// 	if (!time24) return '';
// 	const [hours, minutes] = time24.split(':').map(Number);
// 	if (isNaN(hours) || isNaN(minutes)) return '';

// 	const period = hours >= 12 ? 'PM' : 'AM';
// 	const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
// 	return `${displayHours.toString().padStart(2, '0')}:${minutes
// 		.toString()
// 		.padStart(2, '0')} ${period}`;
// };

// const isoToDDMMYYYY = (iso?: string): string => {
// 	if (!iso) return '';
// 	const d = new Date(iso);
// 	if (isNaN(d.getTime())) return '';
// 	const dd = String(d.getDate()).padStart(2, '0');
// 	const mm = String(d.getMonth() + 1).padStart(2, '0');
// 	const yyyy = d.getFullYear();
// 	return `${dd}/${mm}/${yyyy}`;
// };

// const isoTo24Hour = (iso?: string): string => {
// 	if (!iso) return '';
// 	const d = new Date(iso);
// 	if (isNaN(d.getTime())) return '';
// 	const hh = String(d.getHours()).padStart(2, '0');
// 	const min = String(d.getMinutes()).padStart(2, '0');
// 	return `${hh}:${min}`;
// };

// const formatEventLabel = (ev: CalendarEvent) => {
// 	const title = ev.summary ?? 'Untitled';
// 	const start = ev.start?.dateTime ?? ev.start?.date ?? '';
// 	const date = start
// 		? new Date(start).toLocaleString([], {
// 				dateStyle: 'medium',
// 				timeStyle: 'short',
// 		  })
// 		: '';
// 	return `${title}${date ? ` — ${date}` : ''}`;
// };

// const getAppToken = () => {
// 	try {
// 		const fromLs = localStorage.getItem(TOKEN_KEY);
// 		if (fromLs) return fromLs;
// 		const match =
// 			document.cookie.match(/(?:^|;\s*)auth-token=([^;]+)/) ||
// 			document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
// 		return match ? decodeURIComponent(match[1]) : null;
// 	} catch {
// 		return null;
// 	}
// };

// const Spinner: React.FC<{ size?: number }> = ({ size = 18 }) => (
// 	<svg
// 		className='animate-spin'
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
// 			opacity='0.2'
// 		/>
// 		<path
// 			d='M22 12a10 10 0 00-10-10'
// 			stroke='currentColor'
// 			strokeWidth='4'
// 			strokeLinecap='round'
// 		/>
// 	</svg>
// );

// /** Small skeleton used while events are loading */
// const SkeletonRow: React.FC<{ className?: string }> = ({ className = '' }) => (
// 	<div className={`h-5 rounded-md bg-slate-200 animate-pulse ${className}`} />
// );

// const NoteTaker: FC<NoteTakerProps> = ({
// 	open,
// 	onOpenChange,
// 	initialMeeting,
// }) => {
// 	const [title, setTitle] = useState('');
// 	const [description, setDescription] = useState('');
// 	const [startDate, setStartDate] = useState(''); // dd/mm/yyyy
// 	const [endDate, setEndDate] = useState('');
// 	const [startTime, setStartTime] = useState('09:00 AM');
// 	const [endTime, setEndTime] = useState('10:00 AM');
// 	const [selectedMeetingPlatform, setSelectedMeetingPlatform] = useState<
// 		'google_calendar' | 'custom'
// 	>('google_calendar');
// 	const [customMeetingLink, setCustomMeetingLink] = useState('');
// 	const [allowNotetaker, setAllowNotetaker] = useState(false);

// 	const [loading, setLoading] = useState(false);
// 	const [eventsLoading, setEventsLoading] = useState(false);
// 	const [events, setEvents] = useState<CalendarEvent[]>([]);
// 	const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
// 	const [error, setError] = useState('');
// 	const [success, setSuccess] = useState('');
// 	const [googleConnected, setGoogleConnected] = useState(false);
// 	const [googleEmail, setGoogleEmail] = useState<string | null>(null);

// 	const [copiedEventId, setCopiedEventId] = useState<string | null>(null);
// 	const copyTimerRef = useRef<number | null>(null);

// 	const popupRef = useRef<Window | null>(null);
// 	const popupPollRef = useRef<number | null>(null);
// 	const messageListenerRef = useRef<((e: MessageEvent) => void) | undefined>(
// 		undefined
// 	);

// 	const [showAllEvents, setShowAllEvents] = useState(false);
// 	const VISIBLE_EVENTS_COUNT = 5;

// 	// initial focus ref for accessibility
// 	const firstInputRef = useRef<HTMLInputElement | null>(null);

// 	// small retry/backoff config for fetching events
// 	const MAX_FETCH_ATTEMPTS = 3;
// 	const BASE_BACKOFF_MS = 500; // start 500ms, then double

// 	// track last fetch error to optionally show Retry CTA
// 	const lastFetchErrorRef = useRef<string | null>(null);

// 	useEffect(() => {
// 		// When modal opens we intentionally do NOT prefill from initialMeeting

// 		if (open) {
// 			// Always attempt to fetch events when modal opens.
// 			// This ensures event list is populated whether or not we have a token in LS.
// 			fetchCalendarEvents(false).catch((err) =>
// 				console.warn('fetchCalendarEvents error on open', err)
// 			);

// 			const token = getAppToken();
// 			if (token) {
// 				setGoogleConnected(true);
// 			} else {
// 				setGoogleConnected(false);
// 			}
// 		}
// 		return () => {
// 			if (popupPollRef.current) {
// 				window.clearInterval(popupPollRef.current);
// 				popupPollRef.current = null;
// 			}
// 			if (messageListenerRef.current) {
// 				window.removeEventListener('message', messageListenerRef.current);
// 				messageListenerRef.current = undefined;
// 			}
// 			if (popupRef.current && !popupRef.current.closed)
// 				popupRef.current.close();
// 		};
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [open]);

// 	// fetch calendar events (with exponential backoff retries)
// 	const fetchCalendarEvents = async (manual = false) => {
// 		// manual=true means user clicked "Retry" and wants immediate feedback
// 		if (!manual) {
// 			// silent background: keep minimal UI noise
// 			lastFetchErrorRef.current = null;
// 		}

// 		setEventsLoading(true);
// 		setEvents([]);
// 		let attempt = 0;
// 		let lastErr: any = null;
// 		let finalMapped: CalendarEvent[] = [];

// 		while (attempt < MAX_FETCH_ATTEMPTS) {
// 			try {
// 				const appToken = getAppToken();
// 				const candidateUrls = [
// 					`${API_BASE}/api/auth/google/events?maxResults=50`,
// 					`${API_BASE}/api/calendar/events?maxResults=50`,
// 					`${API_BASE}/api/auth/google/events`,
// 					`${API_BASE}/api/calendar/events`,
// 				];

// 				for (const url of candidateUrls) {
// 					try {
// 						const res = await fetch(url, {
// 							method: 'GET',
// 							credentials: 'include',
// 							headers: {
// 								'Content-Type': 'application/json',
// 								...(appToken ? { Authorization: `Bearer ${appToken}` } : {}),
// 							},
// 						});
// 						if (!res.ok) {
// 							lastErr = { url, status: res.status };
// 							continue;
// 						}
// 						const json = await res.json();
// 						let items: any[] = [];
// 						if (Array.isArray(json)) items = json;
// 						else if (Array.isArray(json?.events)) items = json.events;
// 						else if (Array.isArray(json?.items)) items = json.items;
// 						else if (Array.isArray(json?.data?.items)) items = json.data.items;
// 						else items = json?.items ?? json?.events ?? [];

// 						finalMapped = (items || []).map((it: any) => ({
// 							id: it.id,
// 							summary: it.summary,
// 							start: it.start,
// 							end: it.end,
// 							hangoutLink:
// 								it.hangoutLink ??
// 								it.conferenceData?.entryPoints?.find(
// 									(e: any) => e.entryPointType === 'video'
// 								)?.uri,
// 							description: it.description,
// 						}));

// 						// success for this candidate url
// 						lastFetchErrorRef.current = null;
// 						break; // break out of candidateUrls loop
// 					} catch (err) {
// 						lastErr = err;
// 						continue;
// 					}
// 				}

// 				// if we have finalMapped (possibly empty) then success (no need to retry)
// 				// break out of the attempts loop
// 				break;
// 			} catch (err) {
// 				attempt += 1;
// 				// if we've exhausted attempts, set events empty and log
// 				if (attempt >= MAX_FETCH_ATTEMPTS) {
// 					console.error('[NoteTaker] all event fetch attempts failed', err);
// 					lastFetchErrorRef.current =
// 						(err && err.message) || 'Failed to fetch calendar events';
// 					finalMapped = [];
// 					// if manual, give user immediate feedback
// 					if (manual) {
// 						toast({
// 							title: 'Events fetch failed',
// 							description: String(lastFetchErrorRef.current),
// 							variant: 'error',
// 						});
// 					}
// 					break;
// 				}
// 				// exponential backoff delay
// 				const delay = BASE_BACKOFF_MS * 2 ** (attempt - 1);
// 				await new Promise((r) => setTimeout(r, delay));
// 				continue;
// 			}
// 		}

// 		// Always update state and clear loading here
// 		try {
// 			setEvents(finalMapped);
// 			// IMPORTANT: do NOT auto-select the first event — keep placeholder until user explicitly selects.
// 			// if (finalMapped.length && !selectedEventId) {
// 			//   setSelectedEventId(finalMapped[0].id);
// 			// }
// 		} finally {
// 			setEventsLoading(false);
// 		}

// 		return finalMapped;
// 	};

// 	// google connect flow (unchanged)
// 	const handleConnectGoogle = async () => {
// 		setError('');
// 		setSuccess('');
// 		const authUrl = `${API_BASE}/api/auth/google`;

// 		const onMessage = async (e: MessageEvent) => {
// 			try {
// 				const allowedOrigins = [BACKEND_ORIGIN, window.location.origin].filter(
// 					Boolean
// 				);
// 				if (!allowedOrigins.includes(e.origin)) {
// 					console.warn('Ignored message from origin', e.origin);
// 					return;
// 				}
// 				const data = e.data;
// 				if (!data || data.type !== 'google-auth') return;

// 				if (data.success) {
// 					if (data.token) {
// 						try {
// 							localStorage.setItem(TOKEN_KEY, data.token);
// 						} catch (err) {
// 							console.warn('Failed to persist token', err);
// 						}
// 						try {
// 							const expires = new Date();
// 							expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
// 							document.cookie = `auth-token=${encodeURIComponent(
// 								data.token
// 							)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
// 						} catch {}
// 					}

// 					setGoogleConnected(true);
// 					if (data.email) setGoogleEmail(data.email);
// 					window.removeEventListener('message', onMessage);
// 					messageListenerRef.current = undefined;
// 					try {
// 						popupRef.current?.close();
// 					} catch {}
// 					popupRef.current = null;
// 					if (popupPollRef.current) {
// 						window.clearInterval(popupPollRef.current);
// 						popupPollRef.current = null;
// 					}

// 					await fetchCalendarEvents(true); // manual=true to give feedback on failure
// 				} else {
// 					window.removeEventListener('message', onMessage);
// 					toast({
// 						title: 'Google sign-in failed',
// 						description: data.message || 'Cancelled',
// 						variant: 'error',
// 					});
// 				}
// 			} catch (err) {
// 				console.warn('postMessage handler error', err);
// 			}
// 		};

// 		messageListenerRef.current = onMessage;
// 		window.addEventListener('message', onMessage, false);

// 		const width = 600,
// 			height = 700;
// 		const left = window.screenX + (window.innerWidth - width) / 2;
// 		const top = window.screenY + (window.innerHeight - height) / 2;
// 		const popup = window.open(
// 			authUrl,
// 			'googleAuth',
// 			`width=${width},height=${height},left=${left},top=${top}`
// 		);
// 		if (!popup) {
// 			window.removeEventListener('message', onMessage);
// 			messageListenerRef.current = undefined;
// 			toast({
// 				title: 'Popup blocked',
// 				description: 'Allow popups for this site',
// 				variant: 'error',
// 			});
// 			return;
// 		}
// 		popupRef.current = popup;

// 		popupPollRef.current = window.setInterval(async () => {
// 			try {
// 				if (!popup || popup.closed) {
// 					if (popupPollRef.current) {
// 						window.clearInterval(popupPollRef.current);
// 						popupPollRef.current = null;
// 					}
// 					if (messageListenerRef.current) {
// 						window.removeEventListener('message', messageListenerRef.current);
// 						messageListenerRef.current = undefined;
// 					}
// 					popupRef.current = null;
// 					const token = getAppToken();
// 					if (token) {
// 						setGoogleConnected(true);
// 						await fetchCalendarEvents(true); // manual=true when popup closed
// 					}
// 				}
// 			} catch (err) {
// 				console.warn('popup poll error', err);
// 			}
// 		}, 500);
// 	};

// 	const copySelectedMeetingLink = async () => {
// 		const ev = events.find((e) => e.id === selectedEventId);
// 		const url = ev?.hangoutLink || customMeetingLink || '';
// 		if (!url) {
// 			toast({
// 				title: 'No meeting link',
// 				description: 'Selected event has no meeting link',
// 				variant: 'error',
// 			});
// 			return;
// 		}
// 		try {
// 			await navigator.clipboard.writeText(url);
// 			setCopiedEventId(selectedEventId);
// 			if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
// 			copyTimerRef.current = window.setTimeout(() => {
// 				setCopiedEventId(null);
// 				copyTimerRef.current = null;
// 			}, 3000);
// 			toast({
// 				title: 'Copied',
// 				description: 'Meeting link copied to clipboard',
// 				variant: 'success',
// 			});
// 		} catch {
// 			toast({
// 				title: 'Copy failed',
// 				description: 'Could not copy link',
// 				variant: 'error',
// 			});
// 		}
// 	};

// 	const validate = () => {
// 		setError('');
// 		if (!startDate || !endDate || !startTime || !endTime) {
// 			setError('Please fill required dates and times.');
// 			toast({
// 				title: 'Validation error',
// 				description: 'Please fill required dates and times.',
// 				variant: 'error',
// 			});
// 			return false;
// 		}

// 		const startISO = combineToISOString(startDate, startTime);
// 		const endISO = combineToISOString(endDate, endTime);
// 		if (!startISO || !endISO) {
// 			setError(
// 				'Please use valid date (dd/mm/yyyy) and time (hh:mm AM/PM) formats.'
// 			);
// 			toast({
// 				title: 'Validation error',
// 				description: 'Invalid date/time format',
// 				variant: 'error',
// 			});
// 			return false;
// 		}

// 		if (new Date(startISO) >= new Date(endISO)) {
// 			setError('End date/time must be after start date/time.');
// 			toast({
// 				title: 'Validation error',
// 				description: 'End must be after start',
// 				variant: 'error',
// 			});
// 			return false;
// 		}

// 		return true;
// 	};

// 	const submitMeeting = async (payload: any) => {
// 		const appToken = getAppToken();
// 		const res = await fetch(`${API_BASE}/api/meeting`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				...(appToken ? { Authorization: `Bearer ${appToken}` } : {}),
// 			},
// 			body: JSON.stringify(payload),
// 		});
// 		if (!res.ok) {
// 			const text = await res.text();
// 			throw new Error(text || 'Failed to save meeting');
// 		}
// 		return res.json();
// 	};

// 	// NOTE: user requested that saving only starts when the switch becomes ON.
// 	// handleNotetakerToggle will only attempt to save when v===true.
// 	const handleNotetakerToggle = async (v: boolean) => {
// 		setError('');
// 		if (v) {
// 			// optimistic UI: flip the switch immediately so user sees the change
// 			setAllowNotetaker(true);

// 			// small delay before showing the spinner so the toggle feels responsive
// 			setTimeout(async () => {
// 				setLoading(true);
// 				try {
// 					// validate before attempting save; if validation fails, rollback
// 					if (!validate()) {
// 						setAllowNotetaker(false);
// 						setLoading(false);
// 						return;
// 					}

// 					// if user selected google platform but there are no events available, fall back
// 					// to creating a meeting (custom) so backend can generate link (if configured).
// 					if (
// 						selectedMeetingPlatform === 'google_calendar' &&
// 						events.length === 0
// 					) {
// 						setSelectedMeetingPlatform('custom');
// 					}

// 					const payloadStartDate = startDate;
// 					const payloadEndDate = endDate;
// 					const payloadStartTime = formatTimeTo24Hour(startTime);
// 					const payloadEndTime = formatTimeTo24Hour(endTime);

// 					const payload: any = {
// 						title: title || description || 'Meeting',
// 						description,
// 						startDate: payloadStartDate,
// 						endDate: payloadEndDate,
// 						startTime: payloadStartTime,
// 						endTime: payloadEndTime,
// 						notetakerEnabled: true,
// 						...(selectedMeetingPlatform === 'custom'
// 							? { meetingLink: customMeetingLink || undefined }
// 							: {}),
// 						...(selectedMeetingPlatform === 'google_calendar' && selectedEventId
// 							? { calendarEventId: selectedEventId }
// 							: {}),
// 					};

// 					// Submit: backend should create meeting and — if configured — create meeting link when notetakerEnabled is true.
// 					const created = await submitMeeting(payload);

// 					// If backend returns meeting with meetingLink, we can optionally copy it:
// 					if (created?.meetingLink) {
// 						try {
// 							await navigator.clipboard.writeText(created.meetingLink);
// 							toast({
// 								title: 'Meeting link copied',
// 								description: 'Meeting link generated & copied to clipboard',
// 								variant: 'success',
// 							});
// 						} catch {
// 							/* ignore clipboard failure */
// 						}
// 					}

// 					// success: show toast and close modal
// 					toast({
// 						title: 'Saved',
// 						description: 'Meeting saved with notetaker enabled',
// 						variant: 'success',
// 					});
// 					onOpenChange(false);
// 				} catch (err: any) {
// 					console.error('Auto-save notetaker error', err);
// 					setError(err?.message || 'Failed to save meeting with notetaker');
// 					toast({
// 						title: 'Save failed',
// 						description: err?.message || 'Failed to save meeting',
// 						variant: 'error',
// 					});
// 					// rollback toggle on failure
// 					setAllowNotetaker(false);
// 				} finally {
// 					setLoading(false);
// 				}
// 			}, 300);
// 		} else {
// 			// user toggled off: just update local state (no save action)
// 			setAllowNotetaker(false);
// 		}
// 	};

// 	// design-specific constants (fixed order: border = #FBFAF9, bg = #989898)
// 	const INPUT_BORDER = '#989898';
// 	const INPUT_BG = ' #FBFAF9';
// 	const INPUT_TEXT_COLOR = '#111827';

// 	// helper: when there are no events, allow the user to create one quickly
// 	const handleCreateMeetingManually = () => {
// 		setSelectedMeetingPlatform('custom');
// 	};

// 	// === New: disable select when connected and there are zero events ===
// 	const selectDisabled =
// 		googleConnected && !eventsLoading && events.length === 0;

// 	return (
// 		<Dialog
// 			open={open}
// 			onOpenChange={onOpenChange}>
// 			{/* Reduced modal width (max-w-md) and increased internal padding to match design.
//                 The inner content is constrained to max-w-sm so fields appear narrower. */}
// 			<DialogContent
// 				className='max-w-md p-0 gap-0 bg-white rounded-2xl'
// 				style={{ overflow: 'hidden' }}>
// 				{/* Increased outer padding to create spacious sides */}
// 				<div className='px-14 py-8'>
// 					{/* header */}
// 					<div className='flex justify-between items-center mb-4'>
// 						<h2 className='text-base font-medium text-gray-900'>
// 							Event Details
// 						</h2>
// 						<button
// 							onClick={() => onOpenChange(false)}
// 							className='text-gray-400 hover:text-gray-600 transition-colors'
// 							aria-label='Close dialog'>
// 							<X size={20} />
// 						</button>
// 					</div>

// 					{/* main content with stricter width so fields are narrower like the design */}
// 					<div className='mx-auto max-w-sm'>
// 						{/* Start date */}
// 						<div className='mb-5'>
// 							<label
// 								className='block text-sm text-gray-700 mb-2'
// 								style={{ fontWeight: 400, fontSize: '13px' }}>
// 								Start date
// 							</label>
// 							<input
// 								ref={firstInputRef}
// 								type='text'
// 								value={startDate}
// 								onChange={(e) => setStartDate(e.target.value)}
// 								placeholder='dd/mm/yyyy'
// 								className='w-full px-3 py-2 rounded-xl focus:outline-none'
// 								style={{
// 									backgroundColor: INPUT_BG,
// 									border: `1px solid ${INPUT_BORDER}`,
// 									color: INPUT_TEXT_COLOR,
// 									fontWeight: 400,
// 									fontSize: '13px',
// 									borderRadius: 10,
// 								}}
// 								disabled={loading}
// 								aria-label='Start date (dd/mm/yyyy)'
// 							/>
// 						</div>

// 						{/* End date */}
// 						<div className='mb-5'>
// 							<label
// 								className='block text-sm text-gray-700 mb-2'
// 								style={{ fontWeight: 400, fontSize: '13px' }}>
// 								End date
// 							</label>
// 							<input
// 								type='text'
// 								value={endDate}
// 								onChange={(e) => setEndDate(e.target.value)}
// 								placeholder='dd/mm/yyyy'
// 								className='w-full px-3 py-2 rounded-xl focus:outline-none'
// 								style={{
// 									backgroundColor: INPUT_BG,
// 									border: `1px solid ${INPUT_BORDER}`,
// 									color: INPUT_TEXT_COLOR,
// 									fontWeight: 400,
// 									fontSize: '13px',
// 									borderRadius: 10,
// 								}}
// 								disabled={loading}
// 								aria-label='End date (dd/mm/yyyy)'
// 							/>
// 						</div>

// 						{/* Start & End time */}
// 						<div className='grid grid-cols-2 gap-4 mb-5'>
// 							<div>
// 								<label
// 									className='block text-sm text-gray-700 mb-2'
// 									style={{ fontWeight: 400, fontSize: '13px' }}>
// 									Start time
// 								</label>
// 								<input
// 									type='text'
// 									value={startTime}
// 									onChange={(e) => setStartTime(e.target.value)}
// 									placeholder='09:00 AM'
// 									className='w-full px-3 py-2 rounded-xl focus:outline-none'
// 									style={{
// 										backgroundColor: INPUT_BG,
// 										border: `1px solid ${INPUT_BORDER}`,
// 										color: INPUT_TEXT_COLOR,
// 										fontWeight: 400,
// 										fontSize: '13px',
// 										borderRadius: 10,
// 									}}
// 									disabled={loading}
// 									aria-label='Start time (hh:mm AM/PM)'
// 								/>
// 							</div>
// 							<div>
// 								<label
// 									className='block text-sm text-gray-700 mb-2'
// 									style={{ fontWeight: 400, fontSize: '13px' }}>
// 									End time
// 								</label>
// 								<input
// 									type='text'
// 									value={endTime}
// 									onChange={(e) => setEndTime(e.target.value)}
// 									placeholder='10:00 AM'
// 									className='w-full px-3 py-2 rounded-xl focus:outline-none'
// 									style={{
// 										backgroundColor: INPUT_BG,
// 										border: `1px solid ${INPUT_BORDER}`,
// 										color: INPUT_TEXT_COLOR,
// 										fontWeight: 400,
// 										fontSize: '13px',
// 										borderRadius: 10,
// 									}}
// 									disabled={loading}
// 									aria-label='End time (hh:mm AM/PM)'
// 								/>
// 							</div>
// 						</div>

// 						{/* Description */}
// 						<div className='mb-5'>
// 							<label
// 								className='block text-sm text-gray-700 mb-2'
// 								style={{ fontWeight: 400, fontSize: '13px' }}>
// 								Description (Optional)
// 							</label>
// 							<textarea
// 								value={description}
// 								onChange={(e) => setDescription(e.target.value)}
// 								className='w-full min-h-[72px] px-3 py-2 rounded-xl focus:outline-none resize-none'
// 								placeholder=''
// 								style={{
// 									backgroundColor: INPUT_BG,
// 									border: `1px solid ${INPUT_BORDER}`,
// 									color: INPUT_TEXT_COLOR,
// 									fontWeight: 400,
// 									fontSize: '13px',
// 									borderRadius: 10,
// 								}}
// 								disabled={loading}
// 								aria-label='Description'
// 							/>
// 						</div>

// 						{/* Meeting selection */}
// 						<div className='mb-5'>
// 							<label
// 								className='block text-sm text-gray-700 mb-2'
// 								style={{ fontWeight: 400, fontSize: '13px' }}>
// 								Choose existing or created meeting
// 							</label>

// 							{selectedMeetingPlatform === 'google_calendar' &&
// 							googleConnected ? (
// 								<>
// 									{/* show explicit message when there are no events:
//                                          NOTE: no CTA here — just informative text as requested */}
// 									{!eventsLoading && events.length === 0 && (
// 										<div className='mb-3 p-3 rounded-md bg-yellow-50 border border-yellow-200'>
// 											<p className='text-sm text-yellow-800'>
// 												You don't have any events in your Google Calendar.
// 											</p>
// 										</div>
// 									)}

// 									{/* IMPORTANT: when there are zero events the select is disabled */}
// 									<Select
// 										value={selectedEventId ?? ''}
// 										// prevent changes while disabled
// 										onValueChange={(v) => {
// 											if (selectDisabled) return;
// 											// if user clicked the currently selected value -> deselect
// 											if (!v) {
// 												setSelectedEventId(null);
// 												return;
// 											}
// 											setSelectedEventId((prev) => (prev === v ? null : v));
// 										}}>
// 										<SelectTrigger
// 											// mark trigger disabled and style it visually
// 											className={`w-full rounded-xl px-4 py-3 text-left ${
// 												selectDisabled ? 'opacity-60 cursor-not-allowed' : ''
// 											}`}
// 											style={{
// 												backgroundColor: INPUT_BG,
// 												border: `1px solid ${INPUT_BORDER}`,
// 												display: 'flex',
// 												alignItems: 'center',
// 												justifyContent: 'center',
// 												fontWeight: 400,
// 												fontSize: '13px',
// 												color: INPUT_TEXT_COLOR,
// 												borderRadius: 10,
// 											}}
// 											aria-disabled={selectDisabled}
// 											title={selectDisabled ? 'No calendar events' : undefined}
// 											// some SelectTrigger APIs support disabled prop — guard in case:
// 											{...(selectDisabled ? { disabled: true } : {})}>
// 											{/* placeholder will show when value is '' (i.e. selectedEventId is null) */}
// 											<SelectValue placeholder='Meetings' />
// 										</SelectTrigger>

// 										<SelectContent>
// 											<SelectGroup>
// 												{eventsLoading && (
// 													<>
// 														<SelectItem value='pending'>Loading...</SelectItem>
// 														<div className='p-2 space-y-2'>
// 															<SkeletonRow />
// 															<SkeletonRow />
// 															<SkeletonRow />
// 														</div>
// 													</>
// 												)}
// 												{!eventsLoading && events.length === 0 && (
// 													<>
// 														{/* No CTAs here — just show "No upcoming events" */}
// 														<SelectItem value='upcoming'>
// 															No upcoming events
// 														</SelectItem>
// 														<div className='p-3 space-y-2'>
// 															<p
// 																className='text-sm text-gray-600'
// 																style={{ fontSize: '12px' }}>
// 																You don't have any calendar events. You can
// 																still create a meeting without adding a meeting
// 																link.
// 															</p>
// 														</div>
// 													</>
// 												)}
// 												{!eventsLoading && events.length > 0 && (
// 													<>
// 														{(showAllEvents
// 															? events
// 															: events.slice(0, VISIBLE_EVENTS_COUNT)
// 														).map((ev) => (
// 															<SelectItem
// 																key={ev.id}
// 																value={ev.id}>
// 																{formatEventLabel(ev)}
// 															</SelectItem>
// 														))}

// 														{events.length > VISIBLE_EVENTS_COUNT && (
// 															<div className='p-2'>
// 																<button
// 																	type='button'
// 																	onClick={() => setShowAllEvents((s) => !s)}
// 																	className='text-sm underline'>
// 																	{showAllEvents
// 																		? 'Show fewer'
// 																		: `Show all (${events.length})`}
// 																</button>
// 															</div>
// 														)}
// 													</>
// 												)}
// 											</SelectGroup>
// 										</SelectContent>
// 									</Select>

// 									<Button
// 										onClick={copySelectedMeetingLink}
// 										disabled={!selectedEventId && !customMeetingLink}
// 										variant='outline'
// 										className='w-full mt-3 rounded-xl py-3'
// 										style={{
// 											backgroundColor: '#ffffff',
// 											border: `1px solid ${INPUT_BORDER}`,
// 											fontWeight: 400,
// 											fontSize: '13px',
// 											color: INPUT_TEXT_COLOR,
// 											borderRadius: 10,
// 										}}>
// 										{copiedEventId ? (
// 											<>
// 												<Check
// 													size={16}
// 													className='inline-block mr-2'
// 												/>
// 												Copied
// 											</>
// 										) : (
// 											<>
// 												Copy Meeting Link
// 												<Link
// 													size={16}
// 													className='ml-2'
// 												/>
// 											</>
// 										)}
// 									</Button>
// 								</>
// 							) : selectedMeetingPlatform === 'google_calendar' &&
// 							  !googleConnected ? (
// 								<div className='mt-2 flex items-center justify-between rounded-xl p-3 border border-yellow-300 bg-yellow-50'>
// 									<div>
// 										<p className='font-medium text-sm'>
// 											Google Calendar not connected
// 										</p>
// 										<p className='text-sm text-gray-600'>
// 											Connect Google to automatically create Calendar events.
// 										</p>
// 									</div>
// 									<div>
// 										<Button
// 											onClick={handleConnectGoogle}
// 											disabled={eventsLoading}
// 											size='sm'>
// 											Connect Google
// 										</Button>
// 									</div>
// 								</div>
// 							) : (
// 								selectedMeetingPlatform === 'custom' && (
// 									<div className='mt-2'>
// 										<label
// 											className='block text-sm text-gray-700 mb-2'
// 											style={{ fontWeight: 400, fontSize: '13px' }}>
// 											Meeting link (optional)
// 										</label>
// 										<Input
// 											type='url'
// 											value={customMeetingLink}
// 											onChange={(e) => setCustomMeetingLink(e.target.value)}
// 											placeholder='https://example.com/meeting'
// 											className='rounded-xl bg-gray-50'
// 											style={{
// 												backgroundColor: INPUT_BG,
// 												border: `1px solid ${INPUT_BORDER}`,
// 												color: INPUT_TEXT_COLOR,
// 												fontWeight: 400,
// 												fontSize: '13px',
// 												borderRadius: 10,
// 											}}
// 											disabled={loading}
// 										/>
// 									</div>
// 								)
// 							)}
// 						</div>

// 						{/* Notetaker toggle */}
// 						<div className='flex items-center justify-between border border-gray-200 rounded-xl p-4 bg-white'>
// 							<div>
// 								<p
// 									className='font-medium text-gray-900'
// 									style={{ fontSize: '14px' }}>
// 									Notetaker
// 								</p>
// 								<p
// 									className='text-sm text-gray-500'
// 									style={{ fontSize: '12px' }}>
// 									Allow notetaker to create notes
// 								</p>
// 							</div>
// 							{/* Switch is controlled by allowNotetaker — it only becomes true after success */}
// 							<Switch
// 								checked={allowNotetaker}
// 								onCheckedChange={(v) => handleNotetakerToggle(Boolean(v))}
// 								className='data-[state=checked]:bg-green-500'
// 								disabled={loading}
// 								aria-label='Enable notetaker'
// 							/>
// 						</div>

// 						{/* status / feedback area (aria-live for screen readers) */}
// 						<div
// 							aria-live='polite'
// 							className='sr-only'>
// 							{error || success ? `${error || ''} ${success || ''}` : ''}
// 						</div>
// 					</div>
// 				</div>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };

// export default NoteTaker;

/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
import { Check, Link, Plus, X } from 'lucide-react';
import { type FC, useEffect, useRef, useState } from 'react';

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
	id: string; // _id
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

// --- parsing helpers (same as before) ---
const parseDDMMYYYY = (s: string): Date | null => {
	if (!s) return null;
	const parts = s.trim().split('/');
	if (parts.length !== 3) return null;
	const [dd, mm, yyyy] = parts.map((p) => Number.parseInt(p, 10));
	if (!dd || !mm || !yyyy) return null;
	const date = new Date(yyyy, mm - 1, dd);
	if (isNaN(date.getTime())) return null;
	if (
		date.getDate() !== dd ||
		date.getMonth() !== mm - 1 ||
		date.getFullYear() !== yyyy
	)
		return null;
	return date;
};

const parseTimeAMPM = (
	s: string
): { hours: number; minutes: number } | null => {
	if (!s) return null;
	const m = s.trim().match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
	if (!m) return null;
	let hh = Number.parseInt(m[1], 10);
	const mmn = Number.parseInt(m[2], 10);
	const ampm = m[3].toUpperCase();
	if (hh < 1 || hh > 12 || mmn < 0 || mmn > 59) return null;
	if (ampm === 'AM') {
		if (hh === 12) hh = 0;
	} else {
		if (hh !== 12) hh += 12;
	}
	return { hours: hh, minutes: mmn };
};

const combineToISOString = (
	dateDDMMYYYY: string,
	timeAMPM: string
): string | null => {
	const d = parseDDMMYYYY(dateDDMMYYYY);
	const t = parseTimeAMPM(timeAMPM);
	if (!d || !t) return null;
	const combined = new Date(
		d.getFullYear(),
		d.getMonth(),
		d.getDate(),
		t.hours,
		t.minutes,
		0,
		0
	);
	return combined.toISOString();
};

const formatTimeTo24Hour = (time12: string): string => {
	const parsed = parseTimeAMPM(time12);
	if (!parsed) return '';
	const hours = parsed.hours.toString().padStart(2, '0');
	const minutes = parsed.minutes.toString().padStart(2, '0');
	return `${hours}:${minutes}`;
};

const formatTimeTo12Hour = (time24: string): string => {
	if (!time24) return '';
	const [hours, minutes] = time24.split(':').map(Number);
	if (isNaN(hours) || isNaN(minutes)) return '';

	const period = hours >= 12 ? 'PM' : 'AM';
	const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
	return `${displayHours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')} ${period}`;
};

const isoToDDMMYYYY = (iso?: string): string => {
	if (!iso) return '';
	const d = new Date(iso);
	if (isNaN(d.getTime())) return '';
	const dd = String(d.getDate()).padStart(2, '0');
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	const yyyy = d.getFullYear();
	return `${dd}/${mm}/${yyyy}`;
};

const isoTo24Hour = (iso?: string): string => {
	if (!iso) return '';
	const d = new Date(iso);
	if (isNaN(d.getTime())) return '';
	const hh = String(d.getHours()).padStart(2, '0');
	const min = String(d.getMinutes()).padStart(2, '0');
	return `${hh}:${min}`;
};

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

const getAppToken = () => {
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

const Spinner: React.FC<{ size?: number }> = ({ size = 18 }) => (
	<svg
		className='animate-spin'
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
			opacity='0.2'
		/>
		<path
			d='M22 12a10 10 0 00-10-10'
			stroke='currentColor'
			strokeWidth='4'
			strokeLinecap='round'
		/>
	</svg>
);

/** Small skeleton used while events are loading */
const SkeletonRow: React.FC<{ className?: string }> = ({ className = '' }) => (
	<div className={`h-5 rounded-md bg-slate-200 animate-pulse ${className}`} />
);

const NoteTaker: FC<NoteTakerProps> = ({ open, onOpenChange }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [startDate, setStartDate] = useState(''); // dd/mm/yyyy
	const [endDate, setEndDate] = useState('');
	const [startTime, setStartTime] = useState('09:00 AM');
	const [endTime, setEndTime] = useState('10:00 AM');
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

	// initial focus ref for accessibility
	const firstInputRef = useRef<HTMLInputElement | null>(null);

	// small retry/backoff config for fetching events
	const MAX_FETCH_ATTEMPTS = 3;
	const BASE_BACKOFF_MS = 500; // start 500ms, then double

	// track last fetch error to optionally show Retry CTA
	const lastFetchErrorRef = useRef<string | null>(null);

	// When modal opens: do NOT prefill from initialMeeting and do NOT auto-join.
	useEffect(() => {
		if (open) {
			const token = getAppToken();
			if (token) {
				setGoogleConnected(true);
				// only fetch events when token exists
				fetchCalendarEvents(false).catch((err) =>
					console.warn('fetchCalendarEvents error on open', err)
				);
			} else {
				setGoogleConnected(false);
				// keep events empty and show Connect CTA
				setEvents([]);
				setSelectedEventId(null);
			}
			// focus the first input a bit after open for accessibility
			setTimeout(() => {
				try {
					firstInputRef.current?.focus();
				} catch {}
			}, 50);
		} else {
			// reset UI guard states when modal closes
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	// fetch calendar events (exponential backoff), only when token exists OR manual=true
	const fetchCalendarEvents = async (manual = false) => {
		const appToken = getAppToken();
		// If there's no app token and this is not a manual retry after auth, don't fetch.
		if (!appToken && !manual) {
			setEvents([]);
			setEventsLoading(false);
			return [];
		}

		setEventsLoading(true);
		setEvents([]);
		let attempt = 0;
		let lastErr: any = null;

		while (attempt < MAX_FETCH_ATTEMPTS) {
			try {
				const candidateUrls = [
					`${API_BASE}/api/auth/google/events?maxResults=50`,
					`${API_BASE}/api/calendar/events?maxResults=50`,
					`${API_BASE}/api/auth/google/events`,
					`${API_BASE}/api/calendar/events`,
				];

				let mapped: CalendarEvent[] = [];

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
							lastErr = { url, status: res.status };
							continue;
						}
						const json = await res.json();
						let items: any[] = [];
						if (Array.isArray(json)) items = json;
						else if (Array.isArray(json?.events)) items = json.events;
						else if (Array.isArray(json?.items)) items = json.items;
						else if (Array.isArray(json?.data?.items)) items = json.data.items;
						else items = json?.items ?? json?.events ?? [];

						mapped = (items || []).map((it: any) => ({
							id: it.id,
							summary: it.summary,
							start: it.start,
							end: it.end,
							hangoutLink:
								it.hangoutLink ??
								it.conferenceData?.entryPoints?.find(
									(e: any) => e.entryPointType === 'video'
								)?.uri,
							description: it.description,
						}));
						lastFetchErrorRef.current = null;
						break; // success on this candidate url
					} catch (err) {
						lastErr = err;
						continue;
					}
				}

				// set events (may be empty) and exit retry loop
				setEvents(mapped);
				// IMPORTANT: do not auto-select the first event — keep placeholder until user chooses
				// if (mapped.length && !selectedEventId) setSelectedEventId(mapped[0].id);

				break;
			} catch (err) {
				attempt += 1;
				if (attempt >= MAX_FETCH_ATTEMPTS) {
					console.error('[NoteTaker] all event fetch attempts failed', err);
					lastFetchErrorRef.current =
						(err && err.message) || 'Failed to fetch calendar events';
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
			} finally {
				// continue; eventsLoading cleared below
			}
		}

		setEventsLoading(false);
		return events;
	};

	// google connect flow (popup + postMessage)
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
						try {
							localStorage.setItem(TOKEN_KEY, data.token);
						} catch (err) {
							console.warn('Failed to persist token', err);
						}
						try {
							const expires = new Date();
							expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
							document.cookie = `auth-token=${encodeURIComponent(
								data.token
							)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
						} catch {}
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

					// manual=true so fetch runs even if token logic checks for appToken
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

		const startISO = combineToISOString(startDate, startTime);
		const endISO = combineToISOString(endDate, endTime);
		if (!startISO || !endISO) {
			setError(
				'Please use valid date (dd/mm/yyyy) and time (hh:mm AM/PM) formats.'
			);
			toast({
				title: 'Validation error',
				description: 'Invalid date/time format',
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

	const submitMeeting = async (payload: any) => {
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

	// handle notetaker toggle: optimistic toggle -> small delay -> spinner -> save -> toast + close or rollback
	const handleNotetakerToggle = async (v: boolean) => {
		setError('');
		if (v) {
			// optimistic UI
			setAllowNotetaker(true);

			// small UX delay (toggle flips immediately, spinner shows after)
			setTimeout(async () => {
				setLoading(true);
				try {
					// validate; rollback if invalid
					if (!validate()) {
						setAllowNotetaker(false);
						setLoading(false);
						return;
					}

					// if user selected google platform but there are no events, fall back to custom (no CTAs)
					if (
						selectedMeetingPlatform === 'google_calendar' &&
						events.length === 0
					) {
						setSelectedMeetingPlatform('custom');
					}

					const payloadStartDate = startDate;
					const payloadEndDate = endDate;
					const payloadStartTime = formatTimeTo24Hour(startTime);
					const payloadEndTime = formatTimeTo24Hour(endTime);

					const payload: any = {
						title: title || description || 'Meeting',
						description,
						startDate: payloadStartDate,
						endDate: payloadEndDate,
						startTime: payloadStartTime,
						endTime: payloadEndTime,
						notetakerEnabled: true,
						...(selectedMeetingPlatform === 'custom'
							? { meetingLink: customMeetingLink || undefined }
							: {}),
						...(selectedMeetingPlatform === 'google_calendar' && selectedEventId
							? { calendarEventId: selectedEventId }
							: {}),
					};

					const created = await submitMeeting(payload);

					// optional: copy generated meeting link
					if (created?.meetingLink) {
						try {
							await navigator.clipboard.writeText(created.meetingLink);
							toast({
								title: 'Meeting link copied',
								description: 'Meeting link generated & copied to clipboard',
								variant: 'success',
							});
						} catch {
							/* ignore */
						}
					}

					toast({
						title: 'Saved',
						description: 'Meeting saved with notetaker enabled',
						variant: 'success',
					});
					onOpenChange(false);
				} catch (err: any) {
					console.error('Auto-save notetaker error', err);
					setError(err?.message || 'Failed to save meeting with notetaker');
					toast({
						title: 'Save failed',
						description: err?.message || 'Failed to save meeting',
						variant: 'error',
					});
					// rollback
					setAllowNotetaker(false);
				} finally {
					setLoading(false);
				}
			}, 300);
		} else {
			setAllowNotetaker(false);
		}
	};

	// design-specific constants
	const INPUT_BORDER = '#989898';
	const INPUT_BG = '#FBFAF9';
	const INPUT_TEXT_COLOR = '#111827';

	// helper: when there are no events, allow the user to create one quickly
	const handleCreateMeetingManually = () => {
		setSelectedMeetingPlatform('custom');
	};

	const selectDisabled =
		// only disable when connected & not loading & truly zero events
		googleConnected && !eventsLoading && events.length === 0;

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}>
			<DialogContent
				className='max-w-md p-0 gap-0 bg-white rounded-2xl'
				style={{ overflow: 'hidden' }}>
				<div className='px-14 py-8'>
					{/* header */}
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

					{/* main content */}
					<div className='mx-auto max-w-sm'>
						{/* Start date */}
						<div className='mb-5'>
							<label
								className='block text-sm text-gray-700 mb-2'
								style={{ fontWeight: 400, fontSize: '13px' }}>
								Start date
							</label>
							<input
								ref={firstInputRef}
								type='text'
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
								placeholder='dd/mm/yyyy'
								className='w-full px-3 py-2 rounded-xl focus:outline-none'
								style={{
									backgroundColor: INPUT_BG,
									border: `1px solid ${INPUT_BORDER}`,
									color: INPUT_TEXT_COLOR,
									fontWeight: 400,
									fontSize: '13px',
									borderRadius: 10,
								}}
								disabled={loading}
								aria-label='Start date (dd/mm/yyyy)'
							/>
						</div>

						{/* End date */}
						<div className='mb-5'>
							<label
								className='block text-sm text-gray-700 mb-2'
								style={{ fontWeight: 400, fontSize: '13px' }}>
								End date
							</label>
							<input
								type='text'
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
								placeholder='dd/mm/yyyy'
								className='w-full px-3 py-2 rounded-xl focus:outline-none'
								style={{
									backgroundColor: INPUT_BG,
									border: `1px solid ${INPUT_BORDER}`,
									color: INPUT_TEXT_COLOR,
									fontWeight: 400,
									fontSize: '13px',
									borderRadius: 10,
								}}
								disabled={loading}
								aria-label='End date (dd/mm/yyyy)'
							/>
						</div>

						{/* Start & End time */}
						<div className='grid grid-cols-2 gap-4 mb-5'>
							<div>
								<label
									className='block text-sm text-gray-700 mb-2'
									style={{ fontWeight: 400, fontSize: '13px' }}>
									Start time
								</label>
								<input
									type='text'
									value={startTime}
									onChange={(e) => setStartTime(e.target.value)}
									placeholder='09:00 AM'
									className='w-full px-3 py-2 rounded-xl focus:outline-none'
									style={{
										backgroundColor: INPUT_BG,
										border: `1px solid ${INPUT_BORDER}`,
										color: INPUT_TEXT_COLOR,
										fontWeight: 400,
										fontSize: '13px',
										borderRadius: 10,
									}}
									disabled={loading}
									aria-label='Start time (hh:mm AM/PM)'
								/>
							</div>
							<div>
								<label
									className='block text-sm text-gray-700 mb-2'
									style={{ fontWeight: 400, fontSize: '13px' }}>
									End time
								</label>
								<input
									type='text'
									value={endTime}
									onChange={(e) => setEndTime(e.target.value)}
									placeholder='10:00 AM'
									className='w-full px-3 py-2 rounded-xl focus:outline-none'
									style={{
										backgroundColor: INPUT_BG,
										border: `1px solid ${INPUT_BORDER}`,
										color: INPUT_TEXT_COLOR,
										fontWeight: 400,
										fontSize: '13px',
										borderRadius: 10,
									}}
									disabled={loading}
									aria-label='End time (hh:mm AM/PM)'
								/>
							</div>
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

							{/* Google calendar branch */}
							{selectedMeetingPlatform === 'google_calendar' &&
							googleConnected ? (
								<>
									{/* If connected but zero events -> explicit placeholder message (no CTAs) */}
									{!eventsLoading && events.length === 0 ? (
										<div className='mb-3 p-3 rounded-md bg-yellow-50 border border-yellow-200'>
											<p className='text-sm text-yellow-800'>
												You don’t have any calendar events. You can still create
												a meeting manually below.
											</p>
										</div>
									) : null}

									{/* Select: disabled when there are zero events */}
									<Select
										value={selectedEventId ?? ''}
										onValueChange={(v) =>
											setSelectedEventId((prev) => {
												// if user clicked empty/placeholder - clear
												if (!v) return null;
												// toggle off if they clicked the currently selected item
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
														{/* show a single inert item so dropdown isn't empty */}
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

									{/* Copy meeting link */}
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
								/* Not connected: show the Connect CTA */
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
								/* custom meeting link entry */
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

						{/* status / feedback area (aria-live for screen readers) */}
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

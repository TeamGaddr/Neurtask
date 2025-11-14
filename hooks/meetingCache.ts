/** @format */

// hooks/useMeetingsCache.ts
import { useEffect, useRef, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const TOKEN_KEY = 'token';
const CACHE_KEY = 'meetings-cache:v1';
const CACHE_TTL_MS = 60 * 1000; // 1 minute
const DEFAULT_INTERVAL_MS = 30_000; // 30s
const MAX_BACKOFF_MS = 300_000; // 5 minutes

type RawMeeting = any; // adjust to your meeting type if desired
type CacheShape = { ts: number; data: RawMeeting[] };

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

const shallowMeetingsEqual = (a: RawMeeting[], b: RawMeeting[]) => {
	if (a === b) return true;
	if (a.length !== b.length) return false;
	const aIds = new Set(a.map((m: any) => String(m._id ?? m.id ?? '')));
	for (const m of b) {
		if (!aIds.has(String(m._id ?? m.id ?? ''))) return false;
	}
	return true;
};

export const useMeetingsCache = (opts?: {
	intervalMs?: number;
	initial?: RawMeeting[];
}) => {
	const intervalMs = opts?.intervalMs ?? DEFAULT_INTERVAL_MS;

	const readCache = (): RawMeeting[] => {
		try {
			const raw = localStorage.getItem(CACHE_KEY);
			if (!raw) return opts?.initial ?? [];
			const parsed = JSON.parse(raw) as CacheShape;
			if (Date.now() - parsed.ts < CACHE_TTL_MS) return parsed.data;
			return opts?.initial ?? [];
		} catch {
			return opts?.initial ?? [];
		}
	};

	const [meetings, setMeetings] = useState<RawMeeting[]>(readCache);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const backoffRef = useRef({ attempts: 0, nextInterval: intervalMs });
	const abortRef = useRef<AbortController | null>(null);
	const pollingRef = useRef<number | null>(null);
	const mountedRef = useRef(true);

	const writeCache = (data: RawMeeting[]) => {
		try {
			localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
		} catch (e) {
			// ignore localStorage errors

			console.warn('useMeetingsCache writeCache error', e);
		}
	};

	const fetchMeetings = async (force = false) => {
		// short-circuit: if we have fresh cache and not forcing, return cached
		try {
			const raw = localStorage.getItem(CACHE_KEY);
			if (!force && raw) {
				const parsed = JSON.parse(raw) as CacheShape;
				if (Date.now() - parsed.ts < CACHE_TTL_MS) {
					return parsed.data;
				}
			}

			setLoading(true);
			setError(null);

			if (abortRef.current) abortRef.current.abort();
			const ac = new AbortController();
			abortRef.current = ac;

			const res = await fetch(`${API_BASE}/api/meeting`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					...(getAppToken()
						? { Authorization: `Bearer ${getAppToken()}` }
						: {}),
				},
				signal: ac.signal,
			});

			if (!res.ok) {
				const txt = await res.text().catch(() => '');
				throw new Error(txt || `Status ${res.status}`);
			}

			const json = await res.json();
			if (!Array.isArray(json)) {
				// fallback, but treat as error
				throw new Error('Unexpected API response (expected array)');
			}

			// smart diffing: only update UI if meetings changed
			setMeetings((prev) => {
				if (!shallowMeetingsEqual(prev, json)) {
					writeCache(json);
					return json;
				}
				// update cache timestamp only
				writeCache(json);
				return prev;
			});

			// reset backoff on success
			backoffRef.current.attempts = 0;
			backoffRef.current.nextInterval = intervalMs;

			return json;
		} catch (err: any) {
			if (err?.name === 'AbortError') {
				// aborted by new request, ignore
			} else {
				backoffRef.current.attempts += 1;
				const next = Math.min(
					intervalMs * 2 ** backoffRef.current.attempts,
					MAX_BACKOFF_MS
				);
				backoffRef.current.nextInterval = next;
				setError(err?.message ?? 'Failed to fetch meetings');

				console.warn('useMeetingsCache fetch error', err);
			}
			return null;
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		mountedRef.current = true;

		const start = async () => {
			// initial fetch if cache stale
			await fetchMeetings(false);

			const tick = async () => {
				if (!mountedRef.current) return;
				if (document.visibilityState !== 'visible') {
					// delay next tick but don't fetch while hidden
					pollingRef.current = window.setTimeout(
						tick,
						backoffRef.current.nextInterval ?? intervalMs
					);
					return;
				}
				await fetchMeetings(false);
				pollingRef.current = window.setTimeout(
					tick,
					backoffRef.current.nextInterval ?? intervalMs
				);
			};

			pollingRef.current = window.setTimeout(
				tick,
				backoffRef.current.nextInterval ?? intervalMs
			);
		};

		start();

		const onVis = () => {
			if (document.visibilityState === 'visible') {
				// immediate refresh when user returns
				backoffRef.current.attempts = 0;
				backoffRef.current.nextInterval = intervalMs;
				fetchMeetings(true).catch(() => { });
			}
		};

		document.addEventListener('visibilitychange', onVis);

		return () => {
			mountedRef.current = false;
			document.removeEventListener('visibilitychange', onVis);
			if (abortRef.current) abortRef.current.abort();
			if (pollingRef.current) window.clearTimeout(pollingRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const refresh = async (force = true) => fetchMeetings(force);

	const getMeetingById = (id?: string) =>
		meetings.find((m: any) => String(m._id ?? m.id ?? '') === String(id)) ??
		null;

	return { meetings, loading, error, refresh, getMeetingById };
};

/** @format */
'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type TranscriptSegment = {
	speaker: string;
	text: string;
	startTime: number;
	endTime: number;
};
type MeetingResponse = {
	_id: string;
	title: string;
	description?: string;
	startDateTime?: string;
	endDateTime?: string;
	recordingUrl?: string | null;
	transcript?: TranscriptSegment[];
	summary?: string;
	actionItems?: string[];
	attendees?: string[];
};

const MeetingDetails: React.FC<{ meetingId?: string }> = ({ meetingId }) => {
	const [meeting, setMeeting] = useState<MeetingResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [showAudio, setShowAudio] = useState(false);

	useEffect(() => {
		if (!meetingId) return;
		let cancelled = false;
		const load = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(
					`http://localhost:3001/api/meeting/${encodeURIComponent(meetingId)}`
				);
				if (!res.ok) {
					throw new Error(`Server responded ${res.status}`);
				}
				const json = await res.json();
				if (!cancelled) setMeeting(json);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				if (!cancelled) setError(err.message || 'Failed to load meeting');
			} finally {
				if (!cancelled) setLoading(false);
			}
		};
		load();
		return () => {
			cancelled = true;
		};
	}, [meetingId]);

	if (!meetingId) {
		return
		(
			<div className='p-6 text-sm text-gray-500'>No meeting selected.</div>
		);
	}

	if (loading) return <div className='p-6'>Loading meeting…</div>;
	if (error) return <div className='p-6 text-red-500'>Error: {error}</div>;
	if (!meeting) return <div className='p-6 text-gray-500'>No data.</div>;

	const audioSrc = meeting.recordingUrl ?? undefined;

	return (
		<div className='p-6 w-full flex flex-col items-center'>
			<div className='w-full max-w-4xl'>
				<div className='w-full text-left space-y-1 mb-7'>
					<p className='text-lg font-semibold text-gray-600'>{meeting.title}</p>
					<p className='text-sm text-gray-400'>{meeting.description}</p>
					<p className='text-sm text-gray-400'>
						{meeting.startDateTime
							? new Date(meeting.startDateTime).toLocaleString()
							: ''}
					</p>
				</div>

				<div className='flex flex-col md:flex-row items-start md:items-center justify-between md:space-x-6'>
					{!showAudio && (
						<div className='mb-4 md:mb-0'>
							<h3 className='text-3xl font-bold leading-snug'>
								<div>Ai - Generated</div>
								<div>Notes</div>
							</h3>
						</div>
					)}

					<div
						className={`relative rounded-lg overflow-hidden transition-all duration-300 ${showAudio ? 'w-full h-28' : 'w-[280px] h-[150px]'
							}`}
						onClick={() => {
							if (audioSrc) setShowAudio(true);
						}}
						role={audioSrc ? 'button' : undefined}
						tabIndex={audioSrc ? 0 : -1}
						onKeyDown={(e) => {
							if (audioSrc && (e.key === 'Enter' || e.key === ' '))
								setShowAudio(true);
						}}>
						{!showAudio ? (
							<>
								<div className='relative w-full h-full'>
									<Image
										src='/audio-thumb.png'
										alt='Audio thumbnail'
										fill
										style={{ objectFit: 'cover' }}
										sizes='(max-width: 1024px) 280px, 400px'
									/>
								</div>

								<div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
									<div className='w-12 h-12 bg-white/90 rounded-full flex items-center justify-center'>
										<div className='w-0 h-0 border-l-[14px] border-t-[8px] border-b-[8px] border-l-black border-t-transparent border-b-transparent ml-1' />
									</div>
								</div>
							</>
						) : (
							<div className='absolute inset-0 flex items-center justify-center bg-gray-900/80'>
								<div className='w-full px-4 py-3'>
									<div className='flex items-center justify-between gap-4'>
										<div className='flex-1'>
											{audioSrc ? (
												<audio
													controls
													src={audioSrc}
													autoPlay
													className='w-full h-10'
												/>
											) : (
												<div className='text-white text-sm'>
													No recording available
												</div>
											)}
										</div>

										<div className='ml-3'>
											<button
												onClick={(e) => {
													e.stopPropagation();
													setShowAudio(false);
												}}
												className='inline-flex items-center justify-center rounded-full p-2 bg-white/10 hover:bg-white/20'
												aria-label='Close audio player'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='w-4 h-4 text-white'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'>
													<line
														x1='18'
														y1='6'
														x2='6'
														y2='18'
													/>
													<line
														x1='6'
														y1='6'
														x2='18'
														y2='18'
													/>
												</svg>
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				{!showAudio && (
					<div className='mt-6'>
						<ul className='list-disc ml-5 text-sm text-gray-700'>
							{meeting.summary ? (
								<li>
									<strong>Summary:</strong> {meeting.summary}
								</li>
							) : (
								<li>
									<strong>Project Timeline and Focus:</strong> The team needs to
									finalize...
								</li>
							)}
						</ul>
					</div>
				)}

				{!showAudio &&
					meeting.actionItems &&
					meeting.actionItems.length > 0 && (
						<div className='mt-6'>
							<h4 className='text-sm font-medium mb-2'>Action Items</h4>
							<ul className='list-disc ml-5 text-sm text-gray-700'>
								{meeting.actionItems.map((a, idx) => (
									<li key={idx}>{a}</li>
								))}
							</ul>
						</div>
					)}

				{!showAudio && (
					<div className='mt-6 flex justify-end'>
						<Button className='bg-black hover:bg-gray-800 text-white px-6 py-2'>
							Read more
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default MeetingDetails;

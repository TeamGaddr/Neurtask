'use client';

import MeetingDetails from '@/components/Meetings/MeetingDetails';
import MeetingHeader from '@/components/Meetings/MeetingHeader';
import OngoingMeeting from '@/components/Meetings/OngoingMeeting';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ISummaryByID {
	summary: string,
	date: string
}

interface ITranscriptById {
	id: string
	date: string
	transcript: {
		text: string
	}[]
}

export default function MeetingPage() {
	const router = useRouter();
	const [summary, setSummary] = useState<ISummaryByID | null>(null);
	const [transcript, setTranscript] = useState<ITranscriptById | null>(null);
	const { id } = useParams()
	console.log(id)
	useEffect(() => {
		const getSummary = async () => {
			if (!id) {
				return
			}

			try {
				const token = localStorage.getItem('token');
				const response = await fetch(`http://localhost:3001/api/summary/${id}`, {
					headers: { Authorization: `Bearer ${token}` },
				})

				const summary = await response.json()
				setSummary(summary)
			} catch (error) {

			}
		}

		getSummary()

	}, []);

	console.log()

	useEffect(() => {
		const getTranscriptById = async () => {
			try {
				if (!id) {
					return
				}
				const token = localStorage.getItem('token');
				const response = await fetch(`http://localhost:3001/api/transcript/${id}`, {
					headers: { Authorization: `Bearer ${token}` },
				})

				const transcript = await response.json()
				setTranscript(transcript)
			}
			catch (error) {

			}
		}
		getTranscriptById()
	}, [])

	if (!summary || !transcript) return <div>This summary and transcription is not available.</div>;


	return (
		<div>
			<div className='p-6 space-y-8'>
				<MeetingHeader />

				<div className='flex gap-8'>
					<div className='flex-1 max-w-5xl space-y-8'>
						<OngoingMeeting />
						<MeetingDetails />
					</div>
				</div>
			</div>
			<section className="p-8 md:p-12 min-h-screen">


				<div className="grid grid-cols-1 md:grid-cols-3 gap-20">

					<div className="md:col-span-2  p-6 md:p-8 rounded-xl  ">

						<h2>Summary</h2>
						<p className="text-gray-700 leading-relaxed mb-4">
							{summary?.summary}
						</p>

						<span className="text-sm font-medium text-black-500">
							Date: {summary?.date.slice(0, 10)}
						</span>
					</div>

					<div className="md:w-[60%] g-gray p-6 md:p-9 rounded-3xl border border-gray-200">


						<div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 max-w-[30vh]">
							<h2>Transcription</h2>
							{transcript && Array.isArray(transcript.transcript) && transcript.transcript.map((item: any, index: any) => {
								return (
									<div key={index} className="">
										<p className="text-gray-800 leading-normal">
											{item.text}
										</p>
										<h2 className="text-2xl font-bold text-indigo-600 mb-4 border-b pb-2">

										</h2>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
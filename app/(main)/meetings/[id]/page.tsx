'use client';

import MeetingDetails from '@/components/Meetings/MeetingDetails';
import MeetingHeader from '@/components/Meetings/MeetingHeader';
import OngoingMeeting from '@/components/Meetings/OngoingMeeting';
import { toast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';
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
		startTime: number
	}[]
}

export default function MeetingPage() {
	const [summary, setSummary] = useState<ISummaryByID | null>(null);
	const [transcript, setTranscript] = useState<ITranscriptById | null>(null);
	const { id } = useParams()
	const [searchQuery, setSearchQuery] = useState('');

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
				toast({
                title: 'Events fetch failed',
                description: String(error),
				variant: 'error',
				});
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
			toast({
                title: 'Events fetch failed',
                description: String(error),
				variant: 'error',
				});
			}
		}
		getTranscriptById()
	}, [])

	if (!summary || !transcript) return <div>This summary and transcription is not available.</div>;

	const searchInTranscript = transcript.transcript.filter((item) =>
		item.text.toLowerCase().includes(searchQuery.toLowerCase())
	);



	return (
		<section className='flex flex-col md:flex-row gap-8 p-6'>
			<section className='p-6 space-y-8'>
				<div className='p-6 space-y-8'>
					<MeetingHeader />

					<div className='flex gap-8'>
						<div className='flex-1 max-w-5xl space-y-8'>
							<OngoingMeeting />
							<MeetingDetails />
						</div>
					</div>

					<div className="md:col-span-1  p-6 md:p-10 rounded-xl  ">

						<p className="text-gray-700 leading-relaxed mb-4">
							{summary?.summary}
						</p>

						<span className="text-sm font-medium text-black-500">
							Date: {summary?.date.slice(0, 10)}
						</span>
					</div>

				</div>
			</section>



			<aside className='md:w-1/3 p-6'>
				<form
					onSubmit={(e) => e.preventDefault()}
				>

					<label >
						<input
							id="search"
							type="text"
							placeholder="Search in chat"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-[96%] border border-gray-300 rounded-md px-3 py-2 mr-4 mb-5 focus:outline-none focus:ring focus:ring-indigo-200"
						/>
					</label>
				</form>

				<div className='p-6 bg-gray border border-gray-200 rounded-xl shadow-sm max-h-[90vh] w-[15vw] overflow-y-auto'>


					{searchInTranscript.length > 0 ? (
						searchInTranscript.map((item, index) => {
							return (
								<div key={index} className="mb-3">
									{item.startTime && <span>{item.startTime.toFixed(2)}</span>}
									<p className="text-gray-800 leading-normal">{item.text}</p>
									<h2 className="text-2xl font-bold text-indigo-600 mb-4 border-b pb-2"></h2>
								</div>
							)

						})
					) : (
						<p className="text-gray-500 italic mt-4">No matches found.</p>
					)}
				</div>
			</aside>

		</section>
	);
}
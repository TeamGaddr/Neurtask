/** @format */

// /** @format */

// 'use client';
// import React, { useState } from 'react';

// // import React from 'react';
// import ChatSidebar from '@/components/Meetings/ChatSidebar';
// import MeetingCard from '@/components/Meetings/MeetingCard';
// import MeetingDetails from '@/components/Meetings/MeetingDetails';
// import MeetingFilter from '@/components/Meetings/MeetingFilter';
// import MeetingHeader from '@/components/Meetings/MeetingHeader';
// import OngoingMeeting from '@/components/Meetings/OngoingMeeting';
// import Image from 'next/image';

// const Meetings = () => {
// 	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

// 	return (
// 		<div className='p-4 space-y-8'>
// 			{/* Header */}
// 			<MeetingHeader />

// 			{/* Filter + Search (only show search when date selected) */}
// 			<div className='flex flex-col lg:flex-row justify-between lg:items-center space-y-4 lg:space-y-0'>
// 				<MeetingFilter onDateChange={setSelectedDate} />
// 				{selectedDate && (
// 					<div className='w-full lg:w-1/3 space-y-4 pl-20'>
// 						<div className='relative w-full'>
// 							<Image
// 								src='/search.png'
// 								alt='Search icon'
// 								className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4'
// 							/>
// 							<input
// 								type='text'
// 								placeholder='Search in chat'
// 								className='w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
// 							/>
// 						</div>
// 					</div>
// 				)}
// 			</div>

// 			{/* OngoingMeeting stays in all cases */}
// 			<div className='flex flex-col mx-[2.5rem] lg:flex-row space-y-8 lg:space-y-0 '>
// 				<div className={`flex-1 space-y-8 ${selectedDate ? 'lg:w-2/3' : ''}`}>
// 					<OngoingMeeting />
// 					{!selectedDate && <MeetingCard />}
// 					{selectedDate && <MeetingDetails />}
// 				</div>

// 				{/* Chat appears only after date is selected */}
// 				{selectedDate && (
// 					<div className='w-full lg:w-1/3 space-y-4'>
// 						<ChatSidebar />
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default Meetings;

/** @format */

'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import ChatSidebar from '@/components/Meetings/ChatSidebar';
import MeetingCard from '@/components/Meetings/MeetingCard';
import MeetingDetails from '@/components/Meetings/MeetingDetails';
import MeetingFilter from '@/components/Meetings/MeetingFilter';
import MeetingHeader from '@/components/Meetings/MeetingHeader';
import OngoingMeeting from '@/components/Meetings/OngoingMeeting';
import Image from 'next/image';

const Meetings = () => {
	const router = useRouter();
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	// handler that navigates to the details page for a meeting
	const handleMeetingClick = (meeting: { _id?: string }) => {
		if (!meeting?._id) return;
		router.push(`/Meetings/${encodeURIComponent(meeting._id)}`);
	};

	return (
		<div className='p-4 space-y-8'>
			<MeetingHeader />

			<div className='flex flex-col lg:flex-row justify-between lg:items-center space-y-4 lg:space-y-0'>
				<MeetingFilter onDateChange={setSelectedDate} />
				{selectedDate && (
					<div className='w-full lg:w-1/3 space-y-4 pl-20'>
						<div className='relative w-full'>
							<Image
								src='/search.png'
								alt='Search icon'
								className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4'
							/>
							<input
								type='text'
								placeholder='Search in chat'
								className='w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
							/>
						</div>
					</div>
				)}
			</div>

			<div className='flex flex-col mx-[2.5rem] lg:flex-row space-y-8 lg:space-y-0 '>
				<div className={`flex-1 space-y-8 ${selectedDate ? 'lg:w-2/3' : ''}`}>
					<OngoingMeeting />
					{/* pass the click handler down */}
					{!selectedDate && <MeetingCard onMeetingClick={handleMeetingClick} />}
					{selectedDate && <MeetingDetails />}
				</div>

				{selectedDate && (
					<div className='w-full lg:w-1/3 space-y-4'>
						<ChatSidebar />
					</div>
				)}
			</div>
		</div>
	);
};

export default Meetings;

/** @format */

// /** @format */

// // /** @format */

// // // app/meetings/[id]/page.tsx  (Next.js 13+ app router)
// // import ChatSidebar from '@/components/Meetings/ChatSidebar';
// // import MeetingDetails from '@/components/Meetings/MeetingDetails';
// // import React from 'react';

// // interface Props {
// // 	params: { id: string };
// // }

// // export default async function MeetingDetailsPage({ params }: Props) {
// // 	const { id } = params;
// // 	// Optionally fetch meeting server-side here using id
// // 	// const meeting = await fetch(`${API_BASE}/api/meeting/${id}`, { ... });

// // 	return (
// // 		<div className='p-6'>
// // 			{/* If MeetingDetails expects the full meeting object, fetch and pass it in.
// //           Otherwise you can just render the component and let it fetch by id. */}
// // 			<MeetingDetails meetingId={id} />
// // 			<div className='w-full lg:w-1/3 space-y-4'>
// // 				<ChatSidebar />
// // 			</div>
// // 		</div>
// // 	);
// // }

// /** @format */

// // /** @format */

// // 'use client';
// // import React, { useState } from 'react';

// // // import React from 'react';
// // import ChatSidebar from '@/components/Meetings/ChatSidebar';
// // import MeetingCard from '@/components/Meetings/MeetingCard';
// // import MeetingDetails from '@/components/Meetings/MeetingDetails';
// // import MeetingFilter from '@/components/Meetings/MeetingFilter';
// // import MeetingHeader from '@/components/Meetings/MeetingHeader';
// // import OngoingMeeting from '@/components/Meetings/OngoingMeeting';
// // import Image from 'next/image';

// // const Meetings = () => {
// // 	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

// // 	return (
// // 		<div className='p-4 space-y-8'>
// // 			{/* Header */}
// // 			<MeetingHeader />

// // 			{/* Filter + Search (only show search when date selected) */}
// // 			<div className='flex flex-col lg:flex-row justify-between lg:items-center space-y-4 lg:space-y-0'>
// // 				<MeetingFilter onDateChange={setSelectedDate} />
// // 				{selectedDate && (
// // 					<div className='w-full lg:w-1/3 space-y-4 pl-20'>
// // 						<div className='relative w-full'>
// // 							<Image
// // 								src='/search.png'
// // 								alt='Search icon'
// // 								className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4'
// // 							/>
// // 							<input
// // 								type='text'
// // 								placeholder='Search in chat'
// // 								className='w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
// // 							/>
// // 						</div>
// // 					</div>
// // 				)}
// // 			</div>

// // 			{/* OngoingMeeting stays in all cases */}
// // 			<div className='flex flex-col mx-[2.5rem] lg:flex-row space-y-8 lg:space-y-0 '>
// // 				<div className={`flex-1 space-y-8 ${selectedDate ? 'lg:w-2/3' : ''}`}>
// // 					<OngoingMeeting />
// // 					{!selectedDate && <MeetingCard />}
// // 					{selectedDate && <MeetingDetails />}
// // 				</div>

// // 				{/* Chat appears only after date is selected */}
// // 				{selectedDate && (
// // 					<div className='w-full lg:w-1/3 space-y-4'>
// // 						<ChatSidebar />
// // 					</div>
// // 				)}
// // 			</div>
// // 		</div>
// // 	);
// // };

// // export default Meetings;

// /** @format */

// 'use client';
// import React, { useState } from 'react';

// import ChatSidebar from '@/components/Meetings/ChatSidebar';
// import MeetingDetails from '@/components/Meetings/MeetingDetails';
// import MeetingHeader from '@/components/Meetings/MeetingHeader';
// import OngoingMeeting from '@/components/Meetings/OngoingMeeting';
// import Image from 'next/image';

// const Meetings = () => {
// 	return (
// 		<div className='p-4 space-y-8'>
// 			<MeetingHeader />

// 			<div className='flex flex-col lg:flex-row justify-end lg:items-center space-y-4 lg:space-y-0'>
// 				{/* <MeetingFilter /> */}
// 				<div className='w-full lg:w-[27%] pr-9 space-y-4'>
// 					<div className='relative'>
// 						<Image
// 							src='/search.png'
// 							alt='Search icon'
// 							width={4}
// 							height={4}
// 							className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4'
// 						/>
// 						<input
// 							type='text'
// 							placeholder='Search in chat'
// 							className='w-full border bg-[#FBFAF9] border-[#ECEBEB] rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
// 						/>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='flex flex-col mx-[2.5rem] lg:flex-row space-y-8 lg:space-y-0 '>
// 				<div className={`flex-1 space-y-8 lg:w-2/3`}>
// 					<OngoingMeeting />
// 					{/* pass the click handler down */}
// 					<MeetingDetails />
// 				</div>

// 				<div className='w-full lg:w-1/3 space-y-4 flex justify-end'>
// 					<ChatSidebar />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Meetings;

// app/meetings/[id]/page.tsx
'use client';
import ChatSidebar from '@/components/Meetings/ChatSidebar';
import MeetingDetails from '@/components/Meetings/MeetingDetails';
import MeetingHeader from '@/components/Meetings/MeetingHeader';
import OngoingMeeting from '@/components/Meetings/OngoingMeeting';
import React from 'react';

interface Props {
	params: { id: string };
}

export default function MeetingPage({ params }: Props) {
	const { id } = params;

	return (
		<div className='p-6 space-y-8'>
			<MeetingHeader />

			<div className='flex gap-8'>
				<div className='flex-1 max-w-3xl space-y-8'>
					<OngoingMeeting />
					<MeetingDetails meetingId={id} />
				</div>

				<aside className='w-80'>
					{/* Search box */}
					<div className='mb-4'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Search in chat'
								className='w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
								aria-label='Search in chat'
							/>
						</div>
					</div>

					<ChatSidebar meetingId={id} />
				</aside>
			</div>
		</div>
	);
}

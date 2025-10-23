'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUserStore } from '@/lib/store/userStore';
import { format, isAfter, isToday, isTomorrow, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


interface GroupedMeetings {
	day: string;
	label?: string;
	month: string;
	events: string[];
}
// interface Task {
// 	id: string;
// 	title: string;
// 	date: string;
// }

// type Note = {
// 	meetingTitle: string; // title of the meeting
// 	transcript: string;   // transcript text
// };



const UpcomingCard = ({ day, label, month, events }: GroupedMeetings) => (
	<Card className='bg-white p-4 rounded-lg relative'>
		<div className='flex gap-8'>
			<div className='text-left'>
				<div className='text-3xl font-bold'>{day}</div>
				{label && (
					<div className='text-xs text-red-600 font-normal'>{label}</div>
				)}
				<div className='text-xs text-gray-500'>{month}</div>
			</div>
			<div>
				{events.map((eventStr, idx) => {
					const lastSpaceIndex = eventStr.lastIndexOf(' ');
					const title = eventStr.substring(0, lastSpaceIndex - 12);
					const time = eventStr.substring(lastSpaceIndex - 12);
					return (
						<div key={idx} className="mb-4"> {/* spacing between cards */}
							<div className="flex flex-col">
								<h4 className="text-sm font-medium">{title}</h4>
								<p className="text-xs text-gray-500" style={{ marginTop: '4px' }}>{time}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	</Card>
);

export default function Dashboard() {
	const router = useRouter();
	const userId = useUserStore((state) => state.user?._id);
	const [grouped, setGrouped] = useState<GroupedMeetings[]>([]);
	const [loading, setLoading] = useState(false);

	// // Tasks state
	// const [tasks, setTasks] = useState<Task[]>([]);
	// const [taskLoading, setTaskLoading] = useState(false);
	// const [taskError, setTaskError] = useState<string | null>(null);
	// //notes
	// const [notes, setNotes] = useState<Note[]>([]);
	// const [error, setError] = useState<string | null>(null);

	useEffect(() => {
    if (!userId) return;
    
    const fetchUpcoming = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3001/api/calendar/events`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch meetings');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any[] = await res.json();
        const now = new Date();

        const future = data.filter((item) =>
          isAfter(parseISO(item.end.dateTime), now)
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const temp: Record<string, any[]> = {};
        future.forEach((item) => {
          const dateKey = format(parseISO(item.start.dateTime), 'yyyy-MM-dd');
          temp[dateKey] = temp[dateKey] || [];
          temp[dateKey].push({
            id: item.id,
            title: item.summary || 'Untitled',
            startTime: item.start.dateTime,
            endTime: item.end.dateTime
          });
        });

        const arranged = Object.keys(temp)
          .sort()
          .map((key) => {
            const arr = temp[key];
            const dateObj = parseISO(arr[0].startTime);
            const label = isToday(dateObj)
              ? 'Today'
              : isTomorrow(dateObj)
                ? 'Tomorrow'
                : undefined;
            return {
              day: format(dateObj, 'd'),
              label,
              month: format(dateObj, 'LLLL yyyy'),
              events: arr.map(
                (m) =>
                  `${m.title} ${format(parseISO(m.startTime), 'HH:mm')} - ${format(parseISO(m.endTime), 'HH:mm')}`
              ),
            };
          });

        setGrouped(arranged);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, [userId]);

// useEffect(() => {
//   const fetchTasksAndNotes = async () => {
//     setTaskLoading(true);
//     setTaskError(null);

//     try {
//       // Step 1: Fetch tasks
//       const res = await fetch('http://localhost:3001/api/meeting/tasks', {
//         method: 'GET',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (!res.ok) throw new Error('Failed to fetch tasks');

//       const data: Task[] = await res.json();
//       setTasks(data);
//       console.log('Fetched tasks:', data);

//       if (data.length === 0) {
//         setNotes([]);
//         return;
//       }

//       // Step 2: Fetch notes for tasks with valid IDs
//       const notesPromises = data
//         .filter(task => task.id) // only tasks with valid IDs
//         .map(task =>
//           fetch(`http://localhost:3001/api/meeting/${task.id}/notes`)
//             .then(res => {
//               if (!res.ok) throw new Error(`Failed to fetch notes for task ${task.id}`);
//               return res.json();
//             })
//             .catch(err => {
//               console.warn(err.message);
//               return []; // return empty notes if a fetch fails
//             })
//         );

//       const allNotes = await Promise.allSettled(notesPromises);

//       // Step 3: Flatten notes and format
//       const notes: Note[] = allNotes
//         .filter(r => r.status === 'fulfilled')
//         .flatMap((r: any) => r.value)
//         .map((note: any) => ({
//           meetingTitle: note.meetingTitle,
//           transcript: note.transcript,
//         }));

//       setNotes(notes);
//       console.log('Fetched notes:', notes);

//     } catch (err: any) {
//       console.error(err);
//       setTaskError(err.message || 'Something went wrong');
//       setNotes([]);
//     } finally {
//       setTaskLoading(false);
//     }
//   };

//   fetchTasksAndNotes();
// }, []);


	return (
		<>
			{/* <div className='bg-[#fff] shadow-sm w-full p-5'>
				<h1 className='text-3xl font-semibold my-4'>
					What would you like to automate?
				</h1>
				<Input
					placeholder='Ex. Make a pdf of all the meetings of last week.'
					className='mb-6'
				/>
			</div> */}
			<div className='min-h-screen p-12'>
				<div className='grid grid-cols-2 gap-6 md:grid-cols-[1fr_2fr]'>
					{/* Upcoming (Left) */}
					<Card className='p-4 rounded-lg h-[820px]'>
						<h3 className='text-sm font-medium mb-3'>Upcoming</h3>
						<div className='space-y-2'>
							{loading ? (
								<p className='text-xs text-gray-500'>Loading...</p>
							) : grouped.length ? (
								<div className='space-y-2'>
									{grouped.map((block, i) => (
										<UpcomingCard
											key={i}
											{...block}
										/>
									))}
								</div>
							) : (
								<div className='flex flex-col items-center justify-center space-y-4'>
									<p className='text-xs text-gray-500'>No upcoming meetings</p>
									<Button onClick={() => router.push('/Meetings')}>
										Go to Meetings Page
									</Button>
								</div>
							)}
						</div>
					</Card>

					{/* Right Grid */}
					<div className="grid grid-cols-1 gap-6 md:grid-cols-1 md:grid-rows-2 ">
						{/* Tasks */}
						<Card className="p-4 rounded-lg gap-2">
							<h3 className="text-sm font-medium mb-3">Tasks</h3>
							{/* <div className="space-y-3">
								{taskLoading ? (
									<p className="text-xs text-gray-500">Loading...</p>
								) : taskError ? (
									<p className="text-xs text-red-500">{taskError}</p>
								) : tasks.length ? (
									tasks.slice(0, 4).map((task, i) => (
										<TaskCard key={task.id || i} {...task} />
									))
								) : (
									<p className="text-xs text-gray-500">No tasks</p>
								)}
							</div> */}
						</Card>

						{/* Suggested */}
						<Card className='p-4 bg-white rounded-lg h-[395px]'>
							<h3 className='text-sm font-medium text-gray-700 mb-3'>
								Notetaking from the meeting
							</h3>

							<div className='overflow-y-auto h-[calc(100%-2.5rem)] divide-y space-y-4 divide-gray-200'>
								{/* {notes.length === 0 ? (
									<p className='text-sm text-gray-500'>No notes available</p>
								) : (
									notes.map((note, i) => (
										<div
											key={i}
											className='group flex flex-col justify-between px-3 py-2 hover:bg-gray-50 transition-colors'>
											<div className='flex items-center space-x-2 mb-1'>
												<FileText className='w-5 h-5 text-gray-500' />
												<span className='text-sm font-medium text-gray-800'>{note.meetingTitle}</span>
											</div>
											<p className='text-sm text-gray-700'>{note.transcript}</p>
											<button className='opacity-0 group-hover:opacity-100 self-end mt-1'>
												<Trash className='w-4 h-4 text-gray-400 hover:text-red-500' />
											</button>
										</div>
									))
								)} */}
							</div>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}

/** @format */

import React, { useState } from 'react';
import { FC } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '../ui/switch';
type DialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

const MeetingPermissions: FC<DialogProps> = ({ open, onOpenChange }) => {
	type Option = {
		type: string;
		detail: string;
		attend: boolean;
		id: number;
	};

	type MeetingDialog = {
		MeetingOption: string;
		Options: Option[];
	};

	const [options, SetOptions] = useState<MeetingDialog[]>([
		{
			MeetingOption: 'Meeting Recording',
			Options: [
				{
					type: 'Join all meetings',
					detail:
						'The meeting video maker attends all meetings in your calendar.',
					attend: true,
					id: 1,
				},
				{
					type: 'Join all meetings',
					detail: 'The video maker attends all meetings you accepted',
					attend: true,
					id: 2,
				},
				{
					type: 'Join meetings I organize',
					detail: 'The video maker attends all meetings you host. ',
					attend: true,
					id: 3,
				},
				{
					type: 'Join when invited',
					detail: 'The video maker attends when manually added',
					attend: true,
					id: 4,
				},
			],
		},
		{
			MeetingOption: 'Meeting Recap',
			Options: [
				{
					type: 'Send to all',
					detail: 'Send an e-mail recap to each particpianparticipant ',
					attend: true,
					id: 5,
				},
				{
					type: 'Send to all team members',
					detail: 'Send e-mail to all participants in your team',
					attend: true,
					id: 6,
				},
				{
					type: 'Send to owners',
					detail: 'Send an e-mail recap only to the meeting owners',
					attend: true,
					id: 7,
				},
			],
		},
		{
			MeetingOption: 'Integrations',
			Options: [
				{
					type: 'Google Calendar',
					detail: 'Connect your Google Calendar',
					attend: true,
					id: 8,
				},
			],
		},
	]);
	const toggleAttend = (Index: number, Id: number) => {
		const updatedOptions = [...options];
		const optionIndex = updatedOptions[Index].Options.findIndex(
			(m) => m.id === Id
		);
		if (optionIndex !== -1) {
			updatedOptions[Index].Options[optionIndex].attend =
				!updatedOptions[Index].Options[optionIndex].attend;
			SetOptions(updatedOptions);
			//may be i will set just the attend
		}
	};
	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}>
			<DialogContent className='w-full sm:max-w-[720px] rounded-xl border shadow-sm  px-8 py-12 '>
				<DialogTitle />
				{options.map((iter, index) => (
					<div
						key={iter.MeetingOption}
						className=' pl-6 pr-6 mb-6'>
						<p className=' ml-3  text-[#2B2B2B] font-medium'>
							{iter.MeetingOption}
						</p>
						{iter.Options.map((opt) => (
							<div
								key={opt.id}
								className={`p-3 mt-1 ${
									index === 2 ? 'border border-gray-300 rounded-xl mt-5' : ''
								}`}>
								<div className=' relative flex space-x-5 '>
									<p className=' text-sm text-[#2B2B2B]'>{opt.type}</p>
									<Switch
										checked={Boolean(opt.attend)}
										onCheckedChange={() => toggleAttend(index, opt.id)}
										className='data-[state=checked]:bg-green-500 absolute right-0'
									/>
								</div>
								<p className='text-sm text-[#7C7C7C]'>{opt.detail}</p>
							</div>
						))}
					</div>
				))}
			</DialogContent>
		</Dialog>
	);
};

export default MeetingPermissions;

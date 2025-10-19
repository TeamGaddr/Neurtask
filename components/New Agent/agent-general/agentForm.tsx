/** @format */

import AgentHeader from '@/components/Core/agent/AgentHeader';
import Image from 'next/image';

interface AgentData {
	name: string;
	description: string;
	category: string;
	generalInstruction: string;
}

interface Props {
	data: AgentData;
	setData: (upd: AgentData) => void;
	errors?: Partial<Record<keyof AgentData, string>>;
}

export default function AgentForm({ data, setData, errors = {} }: Props) {
	const handle =
		data.name && data.name.trim().length > 0
			? '@' + data.name.toLowerCase().trim().replace(/\s+/g, '')
			: '@yourhandle';

	return (
		<div>
			<AgentHeader
				agentName={data.name || ''}
				agentHandle={handle}
				onNameChange={(newName) => setData({ ...data, name: newName })}
				error={errors.name}
			/>

			<div className='px-6 py-2 space-y-8'>
				<div>
					<label className='block text-[#292929] font-normal mb-2'>
						Description *
					</label>
					<textarea
						rows={3}
						value={data.description}
						onChange={(e) => setData({ ...data, description: e.target.value })}
						placeholder='Describe to your team what will this Agent help you with.'
						className={`w-full p-3 border-[0.5px] text-[14px] rounded-lg focus:outline-none focus:ring-2 placeholder:text-[#BDBDBD] focus:border-transparent resize-none ${errors.description ? 'border-red-500' : 'border-[#989898]'
							}`}
						style={{ height: '80px', verticalAlign: 'top' }}
					/>
					{errors.description && (
						<p className='mt-1 text-sm text-red-500'>{errors.description}</p>
					)}
				</div>

				<div>
					<label className='block text-[#292929] font-normal mb-2'>
						Category *
					</label>
					<select
						value={data.category}
						onChange={(e) => setData({ ...data, category: e.target.value })}
						className={`w-full p-3 border-[0.5px] text-[14px] rounded-lg focus:outline-none focus:ring-2 placeholder:text-[#BDBDBD] focus:border-transparent ${errors.category ? 'border-red-500' : 'border-[#989898]'}`}
					>
						<option value="" disabled>
							Choose under what category this Agent can be found.
						</option>
						<option value="MeetingAssistant">Meeting Assistant</option>
						<option value="Scheduler">Scheduler</option>
						<option value="PersonalAssistant">Personal Assistant</option>
						<option value="CustomerSupport">Customer Support</option>
						<option value="Productivity">Productivity</option>
						<option value="Research">Research</option>
						<option value="Entertainment">Entertainment</option>
					</select>

					{errors.category && (
						<p className='mt-1 text-sm text-red-500'>{errors.category}</p>
					)}
				</div>

				<div>
					<label className='flex items-center gap-1 text-[#292929] font-normal mb-2'>
						General Instructions *
						<Image
							src='/info.svg'
							alt='tooltip'
							width={19}
							height={19}
						/>
					</label>
					<textarea
						rows={6}
						value={data.generalInstruction}
						onChange={(e) =>
							setData({ ...data, generalInstruction: e.target.value })
						}
						placeholder='Give general input to customize the behavior of your Agent.'
						className={`w-full p-3 border-[0.5px] text-[14px] rounded-lg focus:outline-none focus:ring-2 placeholder:text-[#BDBDBD] resize-none ${errors.generalInstruction ? 'border-red-500' : 'border-[#989898]'
							}`}
					/>
					{errors.generalInstruction && (
						<p className='mt-1 text-sm text-red-500'>
							{errors.generalInstruction}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

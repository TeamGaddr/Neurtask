/** @format */

// /** @format */

// 'use client';

// import AgentHeader from '@/components/Core/agent/AgentHeader';
// import { Button } from '@/components/ui/button';
// import { Switch } from '@/components/ui/switch';
// import { AGENT_MEMORIES, AGENT_SETTINGS } from '@/constants/agentData/data';
// import { FileIcon, InfoIcon, PlusIcon, Trash2Icon, XIcon } from 'lucide-react';
// import React, { useRef, useState } from 'react';

// interface AgentData {
// 	name: string;
// }

// interface Props {
// 	data: AgentData;
// 	setData: (upd: AgentData) => void;
// }

// export default function KnowledgeUI({ data, setData }: Props) {
// 	const handle =
// 		data.name && data.name.trim().length > 0
// 			? '@' + data.name.toLowerCase().trim().replace(/\s+/g, '')
// 			: '@yourhandle';

// 	const [workspaceContent, setWorkspaceContent] = useState(
// 		AGENT_SETTINGS.allowWorkspaceContent
// 	);
// 	const [memories, setMemories] = useState(AGENT_MEMORIES);
// 	const [searchWeb, setSearchWeb] = useState(AGENT_SETTINGS.searchWeb);
// 	const [files, setFiles] = useState<File[]>([]);
// 	const fileInputRef = useRef<HTMLInputElement>(null);

// 	const toggleMemory = (index: number) => {
// 		setMemories(
// 			memories.map((memory, i) =>
// 				i === index ? { ...memory, isEnabled: !memory.isEnabled } : memory
// 			)
// 		);
// 	};

// 	const deleteMemory = (index: number) => {
// 		setMemories(memories.filter((_, i) => i !== index));
// 	};

// 	const handleAddFiles = () => {
// 		fileInputRef.current?.click();
// 	};

// 	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		if (e.target.files) {
// 			const newFiles = Array.from(e.target.files);
// 			setFiles((prev) => [...prev, ...newFiles]);
// 		}
// 	};

// 	const removeFile = (index: number) => {
// 		setFiles(files.filter((_, i) => i !== index));
// 	};

// 	return (
// 		<div>
// 			<AgentHeader
// 				agentName={data.name || ''}
// 				agentHandle={handle}
// 				onNameChange={(newName) => setData({ ...data, name: newName })}
// 			/>
// 			<div className='px-6 py-2  space-y-6'>
// 				<div className='space-y-2'>
// 					<div className='flex justify-between items-center'>
// 						<div className='flex flex-col gap-4'>
// 							<h2 className='text-lg font-semibold text-gray-900'>Knowledge</h2>
// 							<p className='text-sm text-gray-500'>
// 								Add integrations, files and assets to give your Assistant
// 								<br /> knowledge over specific topics.
// 							</p>
// 						</div>
// 						<div className='flex flex-col items-center gap-1'>
// 							<Button
// 								variant='outline'
// 								size='sm'
// 								className='h-12 w-12 p-0 rounded-xl bg-[#292929] border-black hover:bg-gray-700 hover:border-gray-800'
// 								onClick={handleAddFiles}>
// 								<PlusIcon className='h-6 w-6 text-white' />
// 							</Button>
// 							<span className='text-xs text-gray-600'>Add Files</span>
// 						</div>
// 						<input
// 							type='file'
// 							ref={fileInputRef}
// 							className='hidden'
// 							onChange={handleFileChange}
// 							multiple
// 						/>
// 					</div>
// 				</div>

// 				<div className='border border-gray-200 rounded-lg p-6'>
// 					{files.length > 0 ? (
// 						<div className='space-y-4'>
// 							<div className='text-sm font-medium text-gray-900'>
// 								Uploaded Files
// 							</div>
// 							<div className='space-y-2'>
// 								{files.map((file, index) => (
// 									<div
// 										key={index}
// 										className='flex items-center justify-between bg-gray-50 p-3 rounded-md'>
// 										<div className='flex items-center gap-3'>
// 											<FileIcon className='h-4 w-4 text-gray-400' />
// 											<span className='text-sm text-gray-700 truncate max-w-[200px]'>
// 												{file.name}
// 											</span>
// 										</div>
// 										<Button
// 											variant='ghost'
// 											size='sm'
// 											className='text-gray-500 hover:text-gray-700 h-8 w-8 p-0'
// 											onClick={() => removeFile(index)}>
// 											<XIcon className='h-4 w-4' />
// 										</Button>
// 									</div>
// 								))}
// 							</div>
// 						</div>
// 					) : (
// 						<div className='flex flex-col items-center justify-center text-center gap-3 py-12'>
// 							<div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center'>
// 								<FileIcon className='h-6 w-6 text-gray-400' />
// 							</div>
// 							<p className='text-sm text-gray-500 max-w-xs leading-relaxed'>
// 								Browse through integrations, files and assets to give your
// 								Assistant knowledge over specific topics.
// 							</p>
// 						</div>
// 					)}

// 					<div className='flex items-center justify-between pt-4 border-t border-gray-200 mt-6'>
// 						<span className='text-sm text-gray-700'>
// 							Allow use of all workspace content
// 						</span>
// 						<Switch
// 							checked={workspaceContent}
// 							onCheckedChange={setWorkspaceContent}
// 						/>
// 					</div>
// 				</div>

// 				<div className='space-y-4'>
// 					<div className='flex items-center gap-2'>
// 						<h2 className='text-lg font-semibold text-gray-900'>
// 							Agent Specific Memories
// 						</h2>
// 						<InfoIcon className='h-4 w-4 text-gray-500' />
// 					</div>

// 					<div className='border border-gray-200 rounded-lg p-4 space-y-4'>
// 						<div className='text-sm text-gray-500 pb-2'>
// 							Type facts for your Agent to remember.
// 						</div>

// 						{memories.map((memory, index) => (
// 							<div
// 								key={memory.id}
// 								className='flex items-center justify-between gap-3 py-2'>
// 								<span className='text-sm text-gray-700 flex-1'>
// 									{memory.content}
// 								</span>
// 								<div className='flex items-center gap-3'>
// 									<Switch
// 										checked={memory.isEnabled}
// 										onCheckedChange={() => toggleMemory(index)}
// 									/>
// 									<Button
// 										variant='ghost'
// 										size='sm'
// 										className='h-8 w-8 p-0 text-gray-500 hover:text-gray-700'
// 										onClick={() => deleteMemory(index)}>
// 										<Trash2Icon className='h-4 w-4' />
// 									</Button>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>

// 				<div className='space-y-3'>
// 					<h2 className='text-lg font-semibold text-gray-900'>
// 						Search the web for information
// 					</h2>
// 					<div className='flex items-center justify-between'>
// 						<p className='text-sm text-gray-500'>
// 							Allow the Agent to browse through websites to answer your
// 							requests.
// 						</p>
// 						<Switch
// 							checked={searchWeb}
// 							onCheckedChange={setSearchWeb}
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

/** @format */

'use client';

import AgentHeader from '@/components/Core/agent/AgentHeader';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { FileIcon, InfoIcon, PlusIcon, Trash2Icon, XIcon } from 'lucide-react';
import React, { useRef } from 'react';

interface AgentData {
	name: string;
	knowledgeBase?: { files: string[] };
	allowWorkspaceContent?: boolean;
	agentMemories?: { id: string; content: string; isEnabled: boolean }[];
	searchWeb?: boolean;
}

interface Props {
	data: AgentData;
	setData: (upd: AgentData) => void;
}

export default function KnowledgeUI({ data, setData }: Props) {
	const handle =
		data.name && data.name.trim().length > 0
			? '@' + data.name.toLowerCase().trim().replace(/\s+/g, '')
			: '@yourhandle';

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleAddFiles = () => fileInputRef.current?.click();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const newNames = Array.from(e.target.files).map((f) => f.name);
		setData({
			...data,
			knowledgeBase: {
				files: [...(data.knowledgeBase?.files || []), ...newNames],
			},
		});
	};

	const removeFile = (idx: number) => {
		setData({
			...data,
			knowledgeBase: {
				files: data.knowledgeBase!.files.filter((_, i) => i !== idx),
			},
		});
	};

	const toggleWorkspace = () =>
		setData({
			...data,
			allowWorkspaceContent: !data.allowWorkspaceContent,
		});

	const toggleSearchWeb = () =>
		setData({ ...data, searchWeb: !data.searchWeb });

	const toggleMemory = (idx: number) => {
		const mems = data.agentMemories || [];
		setData({
			...data,
			agentMemories: mems.map((m, i) =>
				i === idx ? { ...m, isEnabled: !m.isEnabled } : m
			),
		});
	};

	const deleteMemory = (idx: number) =>
		setData({
			...data,
			agentMemories: (data.agentMemories || []).filter((_, i) => i !== idx),
		});

	return (
		<div>
			<AgentHeader
				agentName={data.name || ''}
				agentHandle={handle}
				onNameChange={(newName) => setData({ ...data, name: newName })}
			/>

			<div className='px-6 py-2 space-y-6'>
				{/* File Upload */}
				<div className='flex justify-between items-center'>
					<div>
						<h2 className='text-lg font-semibold'>Knowledge</h2>
						<p className='text-sm text-gray-500'>
							Add files & integrations to feed your Agent knowledge.
						</p>
					</div>
					<div className='flex flex-col items-center'>
						<Button
							variant='outline'
							size='sm'
							className='h-12 w-12 p-0 rounded-xl bg-[#292929] border-black hover:bg-gray-700 hover:border-gray-800'
							onClick={handleAddFiles}>
							<PlusIcon className='h-6 w-6 text-white' />
						</Button>
						<span className='text-xs'>Add Files</span>
					</div>
					<input
						ref={fileInputRef}
						type='file'
						hidden
						multiple
						onChange={handleFileChange}
					/>
				</div>

				{/* Uploaded Files */}
				<div className='border rounded-lg p-6'>
					{data.knowledgeBase?.files?.length ? (
						data.knowledgeBase.files.map((name, i) => (
							<div
								key={i}
								className='flex items-center justify-between bg-gray-50 p-3 rounded-md mb-2'>
								<div className='flex items-center gap-3'>
									<FileIcon className='h-4 w-4 text-gray-400' />
									<span className='text-sm truncate max-w-xs'>{name}</span>
								</div>
								<Button
									variant='ghost'
									size='sm'
									className='h-8 w-8 p-0'
									onClick={() => removeFile(i)}>
									<XIcon className='h-4 w-4' />
								</Button>
							</div>
						))
					) : (
						<div className='flex flex-col items-center justify-center text-center gap-3 py-12'>
							{' '}
							<div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center'>
								<FileIcon className='h-6 w-6 text-gray-400' />{' '}
							</div>{' '}
							<p className='text-sm text-gray-500 max-w-xs leading-relaxed'>
								Browse through integrations, files and assets to give your
								Assistant knowledge over specific topics.{' '}
							</p>{' '}
						</div>
					)}

					{/* Workspace toggle */}
					<div className='flex justify-between items-center mt-6 pt-4 border-t'>
						<span>Allow use of all workspace content</span>
						<Switch
							checked={!!data.allowWorkspaceContent}
							onCheckedChange={toggleWorkspace}
						/>
					</div>
				</div>

				<div className='border rounded-lg p-4 space-y-4'>
					<div className='flex items-center gap-2'>
						<h2 className='text-lg font-semibold'>Agent Memories</h2>
						<InfoIcon className='h-4 w-4 text-gray-500' />
					</div>
					{(data.agentMemories || []).map((m, i) => (
						<div
							key={m.id}
							className='flex items-center justify-between'>
							<span>{m.content}</span>
							<div className='flex items-center gap-2'>
								<Switch
									checked={m.isEnabled}
									onCheckedChange={() => toggleMemory(i)}
								/>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => deleteMemory(i)}>
									<Trash2Icon className='h-4 w-4' />
								</Button>
							</div>
						</div>
					))}
				</div>

				<div className='space-y-3'>
					<h2 className='text-lg font-semibold text-gray-900'>
						Search the web for information
					</h2>
					<div className='flex items-center justify-between'>
						<p className='text-sm text-gray-500'>
							Allow the Agent to browse through websites to answer your
							requests.
						</p>
						<Switch
							checked={!!data.searchWeb}
							onCheckedChange={toggleSearchWeb}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

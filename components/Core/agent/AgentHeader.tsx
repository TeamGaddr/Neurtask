/** @format */

'use client';

import { Pencil } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface EditableAgentHeaderProps {
	agentName: string;
	agentHandle: string;
	agentIcon?: React.ReactNode;
	onNameChange: (newName: string) => void;
	error?: string;
}

export default function AgentHeader({
	agentName,
	agentHandle,
	agentIcon,
	onNameChange,
	error,
}: EditableAgentHeaderProps) {
	const [isEditing, setIsEditing] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing) inputRef.current?.focus();
	}, [isEditing]);

	const finishEdit = () => {
		setIsEditing(false);
	};

	const handleKey = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			finishEdit();
		}
	};

	return (
		<div className='flex flex-col gap-1 p-6'>
			<div className='flex items-center gap-6'>
				<div className='w-[73px] h-[73px] bg-[#4C0EC9] rounded-2xl flex items-center justify-center'>
					{agentIcon || (
						<Pencil className='w-[25.57px] h-[25.57px] text-white' />
					)}
				</div>
				<div className='flex flex-col gap-1'>
					{isEditing ? (
						<input
							ref={inputRef}
							value={agentName}
							onChange={(e) => onNameChange(e.target.value)}
							onBlur={finishEdit}
							onKeyDown={handleKey}
							className={`text-xl font-semibold text-[#292929] border-b-2 focus:outline-none ${
								error ? 'border-red-500' : 'border-gray-300'
							}
`}
						/>
					) : (
						<h1
							className={`text-xl font-semibold text-[#292929] cursor-text ${
								error ? 'underline decoration-red-500' : ''
							}`}
							onClick={() => setIsEditing(true)}>
							{agentName || 'Agent Name'}
						</h1>
					)}
					<p className='text-sm text-gray-500'>{agentHandle}</p>
					{error && <p className='text-sm text-red-500'>{error}</p>}
				</div>
			</div>
		</div>
	);
}

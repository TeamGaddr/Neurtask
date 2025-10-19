/** @format */

'use client';

import { Check } from 'lucide-react';
import React from 'react';

interface Model {
	id: string;
	name: string;
	description: string;
}

const models: Model[] = [
	{
		id: 'Auto',
		name: 'Auto',
		description: 'Automatically choose the best model.',
	},
];

interface ModelSelectionData {
	defaultModel?: string;
}

interface Props {
	data: ModelSelectionData;
	setData: (upd: ModelSelectionData) => void;
}

export default function ModelSelection({ data, setData }: Props) {
	const selected = data.defaultModel || 'Auto';
	return (
		<div className='px-6 pb-5 space-y-8'>
			<h2 className='text-lg font-medium'>Default Model</h2>
			<div className='flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3'>
				{models.map((m) => (
					<button
						key={m.id}
						type='button'
						onClick={() => setData({ ...data, defaultModel: m.id })}
						className={`relative p-6 border rounded-lg text-left ${
							selected === m.id
								? 'border-gray-900 bg-gray-50'
								: 'border-gray-300'
						}`}>
						{selected === m.id && (
							<div className='absolute top-3 right-3 bg-gray-900 text-white rounded-full p-1'>
								<Check size={14} />
							</div>
						)}
						<h3 className='font-medium mb-2'>{m.name}</h3>
						<p className='text-sm text-gray-500'>{m.description}</p>
					</button>
				))}
			</div>
		</div>
	);
}

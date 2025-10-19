/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import React, { useState } from 'react';
import NewTaskDialog from '../TaskcreationFlow/NewTaskDialog';

const SearchBar = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className='flex items-center justify-between px-[10px] sm:px-[40px] gap-2 sm:gap-6 lg:gap-12'>
				<div className='relative w-full max-w-[600px]'>
					<Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4' />
					<Input
						placeholder='Search Team Workspace'
						className='pl-10 border border-gray-200 focus:border-gray-300 focus:ring-0 focus:outline-none w-full'
					/>
				</div>

				<Button
					className='bg-black hover:bg-gray-800 text-white whitespace-nowrap'
					onClick={() => setOpen(true)}>
					<Plus className='mr-1' />
					<span className='hidden sm:inline'>Add tasks</span>
					<span className='sm:hidden'>Add</span>
				</Button>
			</div>

			<NewTaskDialog
				open={open}
				onOpenChange={setOpen}
				assignedAgentId={''}
			/>
		</>
	);
};

export default SearchBar;

/** @format */

'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	FILTER_OPTIONS,
	RECENT_SEARCHES,
	SUGGESTED_ITEMS,
} from '@/constants/general/search';
import { FileText, Search } from 'lucide-react';
import { useState } from 'react';

export function SearchDialog() {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='h-9 w-9 rounded-full border border-gray-200 relative transition-colors hover:bg-gray-50'
					aria-label='Search'>
					<Search className='h-4 w-4' />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[600px] w-full h-[600px] p-4 md:p-6 flex flex-col'>
				<DialogHeader className='flex items-center justify-between'>
					<DialogTitle className='text-lg md:text-xl'>Search</DialogTitle>
					<Button
						variant='ghost'
						size='icon'
						className='h-8 w-8 rounded-full'
						onClick={() => setIsOpen(false)}
					/>
				</DialogHeader>

				{/* Search Input */}
				<div className='relative mt-2'>
					<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
					<input
						className='w-full rounded-md border border-gray-200 bg-white px-10 py-2 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400'
						placeholder='Search Team Workspace'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				{/* Filters */}
				<div className='flex flex-wrap gap-2 mt-4'>
					{Object.entries(FILTER_OPTIONS).map(([key, values]) => (
						<Select key={key}>
							<SelectTrigger className='w-[120px] bg-white text-sm'>
								<SelectValue
									placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
								/>
							</SelectTrigger>
							<SelectContent>
								{values.map((option) => (
									<SelectItem
										key={option}
										value={option.toLowerCase().replace(/\s+/g, '-')}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					))}
				</div>

				<div className='space-y-4 mt-4 flex-1 overflow-auto'>
					{/* Recent Searches */}
					<div>
						<h3 className='text-sm font-medium mb-2'>Recent searches</h3>
						<div className='space-y-2'>
							{RECENT_SEARCHES.map((search) => (
								<div
									key={search.id}
									className='flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors'>
									<FileText className='h-5 w-5 text-gray-500' />
									<div>
										<p className='text-sm font-medium'>{search.title}</p>
										<p className='text-xs text-gray-500'>
											{search.lastModified}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Suggested */}
					<div>
						<h3 className='text-sm font-medium mb-2'>Suggested</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
							{SUGGESTED_ITEMS.map((item) => (
								<div
									key={item.id}
									className='flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors'>
									<FileText className='h-4 w-4 text-gray-500' />
									<span className='text-sm'>{item.title}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className='mt-4 flex justify-end'>
					<Button variant='default'>Search</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

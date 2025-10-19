/** @format */

'use client';

import { AgentCategory } from '@/constants/agentData/data';
import { useState } from 'react';

interface AgentFiltersProps {
	filters: { id: string; name: string; isActive: boolean }[];
	categories: AgentCategory[];
	onFilterChange: (filterId: string) => void;
	onCategoryChange: (categoryId: string) => void;
}

export function AgentFilters({
	filters,
	categories,
	onFilterChange,
	onCategoryChange,
}: AgentFiltersProps) {
	const [activeFilter, setActiveFilter] = useState(
		filters.find((f) => f.isActive)?.id || 'all'
	);
	const [activeCategory, setActiveCategory] = useState<string | null>(null);

	const handleFilterClick = (filterId: string) => {
		setActiveFilter(filterId);
		setActiveCategory(null);
		onFilterChange(filterId);
	};

	const handleCategoryClick = (categoryId: string) => {
		if (activeCategory === categoryId) {
			setActiveCategory(null);
			setActiveFilter('all');
			onFilterChange('all');
		} else {
			setActiveCategory(categoryId);
			setActiveFilter('');
			onCategoryChange(categoryId);
		}
	};

	return (
		<div className='w-full lg:w-48 space-y-6'>
			<div className='space-y-2'>
				{filters.map((filter) => (
					<button
						key={filter.id}
						className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
							activeFilter === filter.id
								? 'bg-gray-100 font-medium'
								: 'hover:bg-gray-50'
						}`}
						onClick={() => handleFilterClick(filter.id)}>
						{filter.name}
					</button>
				))}
			</div>
			<hr className='bg-black' />
			<div>
				<h3 className='text-sm font-medium mb-2 text-gray-500'>Categories</h3>
				<div className='space-y-2'>
					{categories.map((category) => (
						<button
							key={category.id}
							className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex justify-between items-center ${
								activeCategory === category.id
									? 'bg-gray-100 font-medium'
									: 'hover:bg-gray-50'
							}`}
							onClick={() => handleCategoryClick(category.id)}>
							<span>{category.name}</span>
							{category.count && (
								<span className='text-xs bg-gray-100 px-2 py-0.5 rounded-full'>
									{category.count}
								</span>
							)}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

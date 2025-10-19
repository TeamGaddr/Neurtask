/** @format */

'use client';
import React from 'react';
import SearchBar from '@/components/TaskTracker/SearchBar';
import FilterButtons from '@/components/TaskTracker/FilterButton';
import CalendarStrip from '@/components/TaskTracker/CalendarStrip';
import TaskList from '@/components/TaskTracker/TaskList';

const Tracker = () => {
	return (
		<div className='p-4 space-y-8'>
			<SearchBar />
			<FilterButtons />
			<CalendarStrip />
			<TaskList />
		</div>
	);
};

export default Tracker;

/** @format */

import React from 'react';
import PendingTasks from '@/components/TaskTracker/Pending';
import Running from '@/components/TaskTracker/Running';
import Finished from '@/components/TaskTracker/Finished';
function TaskList() {
	return (
		<div className=' flex flex-col gap-5 md:flex-row'>
			<PendingTasks />
			<Running />
			<Finished />
		</div>
	);
}

export default TaskList;

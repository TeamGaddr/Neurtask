
import React from 'react';
import { Video } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import MeetingPermissions from './MeetingPermissions';

const MeetingHeader = () => {
	const [IsOpen, SetOpen] = useState(false);

  return (
    <div className=" flex sm:p-4 sm:px-14 sm:space-x-16 justify-between items-center">
		<div>
			<Video className="h-[90px] w-[90px]" strokeWidth={0.25}/> 
		</div>
		<div>
			<p className=" text-2xl font-semibold">Meetings</p>
			<p className="text-sm text-[#7c7c7c]">This is where you will find all your meetings either upcoming or attended in the past also you can add notetaker to the meeting.</p>
		</div>
		<Button className=" bg-black hover:bg-gray-800 text-white whitespace-nowrap"
			onClick={()=> SetOpen(true)}>
			<span>Permissions</span>
		</Button>
		<MeetingPermissions open ={IsOpen} onOpenChange={SetOpen} ></MeetingPermissions>
    </div>
  );
};

export default MeetingHeader;
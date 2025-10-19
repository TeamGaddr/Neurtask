/** @format */

'use client';

import { NAVIGATION_TABS } from '@/constants/agentData/data';
import { useEffect, useState } from 'react';

interface SidebarProps {
	currentStep: number;
	setCurrentStep: (step: number) => void;
}

const AgentNavigationTabs = ({ currentStep, setCurrentStep }: SidebarProps) => {
	const [isMobile, setIsMobile] = useState(false);

	// Check if we're on mobile
	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		// Initial check
		checkIfMobile();

		// Add event listener for window resize
		window.addEventListener('resize', checkIfMobile);

		// Cleanup
		return () => window.removeEventListener('resize', checkIfMobile);
	}, []);

	// Handle tab click
	const handleTabClick = (index: number) => {
		setCurrentStep(index);
	};
	if (isMobile) {
		return (
			<div className='w-full justify-center h-[74%] mb-6'>
				<div className='overflow-x-auto pb-2'>
					<div className='flex space-x-2 min-w-max'>
						{NAVIGATION_TABS.map((step, index) => (
							<button
								key={index}
								onClick={() => handleTabClick(index)}
								className={`px-4 py-2 text-sm font-medium border border-gray-300 rounded-2xl transition-all flex-shrink-0
                ${
									currentStep === index
										? 'bg-[#EBEBEB] text-black'
										: 'text-black bg-white'
								}`}>
								{step.label}
							</button>
						))}
					</div>
				</div>

				{/* Progress indicator */}
				<div className='w-full bg-gray-200 h-1 rounded-full mt-2'>
					<div
						className='bg-black h-1 rounded-full transition-all duration-300'
						style={{
							width: `${((currentStep + 1) / NAVIGATION_TABS.length) * 100}%`,
						}}></div>
				</div>
			</div>
		);
	}

	return (
		<div className='w-48 flex flex-col items-center py-10  mt-14'>
			{NAVIGATION_TABS.map((step, index) => (
				<div
					key={index}
					className='relative flex flex-col items-center'>
					{index > 0 && (
						<div className='w-px h-10 bg-[#292929] items-center  mt-6 mb-6' />
					)}

					{/* Step button */}
					<button
						onClick={() => handleTabClick(index)}
						className={`px-4 py-2 w-28 text-sm font-medium border border-gray-300 rounded-lg transition-all flex items-center justify-center
            ${
							currentStep === index
								? 'bg-[#EBEBEB] text-[#292929]'
								: 'text-[#292929] bg-white'
						}`}>
						{step.label}
					</button>
				</div>
			))}
		</div>
	);
};

export default AgentNavigationTabs;

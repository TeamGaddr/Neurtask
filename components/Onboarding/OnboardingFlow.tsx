/** @format */

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CalendarStep from './steps/CalenderStep';
// import CompanySizeStep from './steps/CompanySizeStep';
// import JobLevelStep from './steps/JobLevelStep';
// import RoleStep from './steps/RoleStep';

export interface OnboardingData {
	role: string;
	companySize: string;
	jobLevel: string;
	calendar: string | null;
}

const OnboardingFlow = () => {
	const router = useRouter();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [currentStep, setCurrentStep] = useState(0);
	const [onboardingData, setOnboardingData] = useState<OnboardingData>({
		role: '',
		companySize: '',
		jobLevel: '',
		calendar: null,
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isNewUser, setIsNewUser] = useState(false);

	useEffect(() => {
		const referrer = document.referrer;
		setIsNewUser(referrer.includes('/signup'));
	}, []);

	const handleComplete = () => {
		console.log('Onboarding completed with data:', onboardingData);
		router.push('/');
	};

	// const steps = [
	// 	{
	// 		id: 'role',
	// 		component: (
	// 			<RoleStep
	// 				selectedRole={onboardingData.role}
	// 				onSelectRole={(role) => {
	// 					setOnboardingData({ ...onboardingData, role });
	// 					handleNext();
	// 				}}
	// 			/>
	// 		),
	// 	},
	// 	{
	// 		id: 'companySize',
	// 		component: (
	// 			<CompanySizeStep
	// 				selectedSize={onboardingData.companySize}
	// 				onSelectSize={(companySize) => {
	// 					setOnboardingData({ ...onboardingData, companySize });
	// 					handleNext();
	// 				}}
	// 			/>
	// 		),
	// 	},
	// 	{
	// 		id: 'jobLevel',
	// 		component: (
	// 			<JobLevelStep
	// 				selectedLevel={onboardingData.jobLevel}
	// 				onSelectLevel={(jobLevel) => {
	// 					setOnboardingData({ ...onboardingData, jobLevel });
	// 					handleNext();
	// 				}}
	// 				onSkip={() => handleNext()}
	// 			/>
	// 		),
	// 	},
	// 	{
	// 		id: 'calendar',
	// 		component: (
	// 			<CalendarStep
	// 				selectedCalendar={onboardingData.calendar}
	// 				onSelectCalendar={(calendar) => {
	// 					setOnboardingData({ ...onboardingData, calendar });
	// 					handleComplete();
	// 				}}
	// 				onSkip={handleComplete}
	// 			/>
	// 		),
	// 	},
	// ];

	const steps = [
		{
			id: 'calendar',
			component: (
				<CalendarStep
					selectedCalendar={onboardingData.calendar}
					onSelectCalendar={(calendar) => {
						setOnboardingData({ ...onboardingData, calendar });
						handleComplete();
					}}
					onSkip={handleComplete}
				/>
			),
		},
	];

	// const handleNext = () => {
	// 	if (currentStep < steps.length - 1) {
	// 		setCurrentStep(currentStep + 1);
	// 	}
	// };

	return (
		<div className='min-h-screen flex flex-col'>
			{/* Logo */}
			<div className='p-8'>
				<div className='flex items-center gap-2'>
					<Image
						src='/logo.png'
						alt='Person typing on laptop'
						width={20}
						height={20}
					/>
					<span className='font-bold text-xl'>Neurtask</span>
				</div>
			</div>

			{/* Current Step */}
			<div className='flex-1 flex items-center justify-evenly p-4'>
				{steps[currentStep].component}
			</div>
		</div>
	);
};

export default OnboardingFlow;

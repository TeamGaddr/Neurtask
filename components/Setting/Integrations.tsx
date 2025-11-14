import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react';
import { FaGoogleDrive, FaRegCalendarAlt, FaVideo } from 'react-icons/fa';
import CardToggle from './CardToggle';

interface IntegrationsResponse {
	googlemeet: boolean;
	googledrive: boolean;
	calendar: boolean;
}

export interface IntegrationsHandle {
	handleSubmit: () => Promise<void>;
}

const API_BASE =
	process.env.NEXT_PUBLIC_API_BASE_URL;
// LINE 39 AND 116

const Integrations = forwardRef<IntegrationsHandle>((props, ref) => {
	const [googlemeet, setGoogleMeet] = useState(false);
	const [googledrive, setGoogleDrive] = useState(false);
	const [calendar, setGoogleCalendar] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>('');

	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;

	useEffect(() => {
		//THIS ENDPOINT IS 404 
		axios
			.get<IntegrationsResponse>(`${API_BASE}/api/integrations/status`, {
				headers: token ? { Authorization: `Bearer ${token}` } : undefined,
			})
			.then(({ data }) => {
				setGoogleMeet(data.googlemeet);
				setGoogleDrive(data.googledrive);
				setGoogleCalendar(data.calendar);
			})
			.catch(() => {
				toast({
					title: 'Something went wrong',
					description: 'please try again',
					variant: 'error',
				});
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const service = params.get('service') as keyof IntegrationsResponse | null;
		const isSuccessPath = window.location.pathname.includes(
			'/api/integrations/success'
		);

		if (isSuccessPath && service) {
			const newState: IntegrationsResponse = {
				googlemeet,
				googledrive,
				calendar,
				[service]: true,
			} as IntegrationsResponse;

			setGoogleMeet(newState.googlemeet);
			setGoogleDrive(newState.googledrive);
			setGoogleCalendar(newState.calendar);


			updateIntegrations(newState);


			window.history.replaceState({}, '', window.location.pathname);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	const handleGoogleAuth = (service: keyof IntegrationsResponse) => {
		window.location.href = `${API_BASE}/api/auth/google?service=${encodeURIComponent(
			service
		)}`;
	};

	// Toggle handler
	const handleToggle = (key: keyof IntegrationsResponse) => {

		if (!({ googlemeet, googledrive, calendar })[key]) {
			handleGoogleAuth(key);
		} else {
			const newState: IntegrationsResponse = {
				googlemeet,
				googledrive,
				calendar,
				[key]: false,
			} as IntegrationsResponse;

			setGoogleMeet(newState.googlemeet);
			setGoogleDrive(newState.googledrive);
			setGoogleCalendar(newState.calendar);
			updateIntegrations(newState);
		}
	};

	const updateIntegrations = async (newState: IntegrationsResponse) => {
		try {
			await axios.put(`${API_BASE}/api/integrations/update`, newState, {
				headers: {
					...(token ? { Authorization: `Bearer ${token}` } : {}),
					'Content-Type': 'application/json',
				},
			});
		} catch {
			setError('Failed to update integrations.');
		}
	};

	const handleSubmit = async () => {
		setLoading(true);
		setError('');
		await updateIntegrations({ googlemeet, googledrive, calendar });
		setLoading(false);
	};

	useImperativeHandle(ref, () => ({ handleSubmit }));

	return (
		<>
			<div className='space-y-2 mb-6'>
				<h1 className='text-lg font-medium text-[#292929]'>
					Integrations Settings
				</h1>
				<p className='text-base text-[#7C7C7C]'>
					Control your integrations with Google services
				</p>
			</div>

			{loading ? (
				<p className='text-gray-600'>Processing…</p>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-4'>
					<CardToggle
						icon={<FaVideo />}
						title='Google Meet'
						description='Connect to create and manage Google Meet events'
						enabled={googlemeet}
						onToggle={() => handleToggle('googlemeet')}
					/>
					<CardToggle
						icon={<FaGoogleDrive />}
						title='Google Drive'
						description='Link your Google Drive for file access'
						enabled={googledrive}
						onToggle={() => handleToggle('googledrive')}
					/>
					<CardToggle
						icon={<FaRegCalendarAlt />}
						title='Google Calendar'
						description='Sync with your Google Calendar'
						enabled={calendar}
						onToggle={() => handleToggle('calendar')}
					/>
				</div>
			)}
			{error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
		</>
	);
});

Integrations.displayName = 'Integrations';

export default Integrations;

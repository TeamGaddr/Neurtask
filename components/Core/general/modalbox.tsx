/** @format */

import { Check, Copy, Loader, Mail, X } from 'lucide-react';
import React, { useState } from 'react';
import { FaFacebook, FaSlack, FaTwitter } from 'react-icons/fa';

interface ShareModalProps {
	isOpen: boolean;
	onClose: () => void;
	link: string;
	isLoading: boolean;
}

export default function ShareModal({
	isOpen,
	onClose,
	link,
	isLoading,
}: ShareModalProps) {
	const [copied, setCopied] = useState(false);

	const platforms = [
		{
			name: 'Twitter',
			icon: <FaTwitter size={20} />,
			url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`,
		},
		{
			name: 'Facebook',
			icon: <FaFacebook size={20} />,
			url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
				link
			)}`,
		},
		{
			name: 'Slack',
			icon: <FaSlack size={20} />,
			url: `https://slack.com/share?url=${encodeURIComponent(link)}`,
		},
		{
			name: 'Message',
			icon: <Mail size={20} />,
			url: `mailto:?body=${encodeURIComponent(link)}`,
		},
	];

	// const handleCopy = () => {
	// 	navigator.clipboard.writeText(link);
	// 	setCopied(true);
	// 	setTimeout(() => setCopied(false), 2000);
	// };
// 	const handleCopy = () => {
// 	if (navigator?.clipboard?.writeText) {
// 		navigator.clipboard.writeText(link).then(() => {
// 			setCopied(true);
// 			setTimeout(() => setCopied(false), 2000);
// 		});
// 	} 
// };
const handleCopy = async () => {
	try {
		if (navigator?.clipboard?.writeText) {
			await navigator.clipboard.writeText(link);
		} else {
			const textarea = document.createElement('textarea');
			textarea.value = link;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	} catch (err) {
		console.error('Failed to copy:', err);
	}
};

	

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
			<div className='relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl'>
				<button
					onClick={onClose}
					className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition'>
					<X className='h-5 w-5' />
				</button>

				<h3 className='mb-4 text-lg font-semibold text-center text-gray-900 dark:text-gray-100'>
					Share
				</h3>

				{isLoading ? (
					<div className='flex items-center justify-center py-8'>
						<Loader className='w-8 h-8 animate-spin text-gray-500' />
					</div>
				) : (
					<>
						<div className='flex justify-between gap-2 mb-6'>
							{platforms.map((p) => (
								<button
									key={p.name}
									onClick={() => window.open(p.url, '_blank', 'noopener')}
									className='flex-1 flex flex-col items-center gap-1 p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition'>
									<div className='p-2 dark:bg-gray-900 rounded-full'>
										{p.icon}
									</div>
									<span className='text-xs text-gray-700 dark:text-gray-300'>
										{p.name}
									</span>
								</button>
							))}
						</div>

						<label className='block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'>
							Page Link
						</label>
						<div className='flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden'>
							<input
								type='text'
								readOnly
								value={link}
								className='flex-grow px-4 py-2 text-sm text-gray-800 dark:text-gray-200 bg-transparent focus:outline-none'
							/>
							<button
								onClick={handleCopy}
								className='px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition'>
								{copied ? (
									<Check className='h-5 w-5 text-green-500' />
								) : (
									<Copy className='h-5 w-5 text-gray-500' />
								)}
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

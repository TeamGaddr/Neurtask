/** @format */

// /** @format */

// import * as React from 'react';
// import * as ToastPrimitive from '@radix-ui/react-toast';
// import { CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react';
// import clsx from 'clsx';

// export type ToastVariant = 'success' | 'error' | 'info' | 'default';
// export interface ToastProps extends ToastPrimitive.ToastProps {
// 	variant?: ToastVariant;
// 	title: React.ReactNode;
// 	description?: React.ReactNode;
// 	action?: React.ReactNode;
// 	timestamp?: string;
// }

// // Provider to wrap your application
// export const ToastProvider = ToastPrimitive.Provider;

// // Viewport where toasts will appear
// export const ToastViewport: React.FC<ToastPrimitive.ToastViewportProps> = ({
// 	className,
// 	...props
// }) => (
// 	<ToastPrimitive.Viewport
// 		className={clsx(
// 			'fixed bottom-4 right-4 flex flex-col space-y-2 w-96 max-w-full z-50 outline-none',
// 			className
// 		)}
// 		{...props}
// 	/>
// );

// // Main Toast component
// export const Toast: React.FC<ToastProps> = React.forwardRef<
// 	HTMLDivElement,
// 	ToastProps
// >(
// 	(
// 		{
// 			variant = 'default',
// 			title,
// 			description,
// 			action,
// 			timestamp,
// 			className,
// 			...props
// 		},
// 		ref
// 	) => {
// 		const variantStyles: Record<ToastVariant, string> = {
// 			default: 'bg-white border border-gray-200',
// 			success: 'bg-white border border-green-200',
// 			error: 'bg-white border border-red-200',
// 			info: 'bg-white border border-blue-200',
// 		};

// 		const iconMap: Record<ToastVariant, React.ReactNode> = {
// 			default: null,
// 			success: <CheckCircle2 className='w-5 h-5 text-green-500' />,
// 			error: <XCircle className='w-5 h-5 text-red-500' />,
// 			info: <Info className='w-5 h-5 text-blue-500' />,
// 		};

// 		return (
// 			<ToastPrimitive.Root
// 				ref={ref}
// 				className={clsx(
// 					'grid grid-cols-[auto_1fr_auto] items-start gap-3 p-4 rounded-xl shadow-md',
// 					variantStyles[variant],
// 					className
// 				)}
// 				{...props}>
// 				{/* Icon */}
// 				{iconMap[variant] && <div className='mt-1'>{iconMap[variant]}</div>}

// 				{/* Content */}
// 				<div className='flex-1 space-y-1'>
// 					<div className='flex items-center justify-between'>
// 						<ToastPrimitive.Title className='text-sm font-semibold text-gray-900'>
// 							{title}
// 						</ToastPrimitive.Title>
// 						{timestamp && (
// 							<span className='text-xs text-gray-500'>{timestamp}</span>
// 						)}
// 					</div>
// 					{description && (
// 						<ToastPrimitive.Description className='text-sm text-gray-700'>
// 							{description}
// 						</ToastPrimitive.Description>
// 					)}
// 				</div>

// 				{/* Actions */}
// 				{action && (
// 					<div className='flex-shrink-0'>
// 						<ToastPrimitive.Action asChild>{action}</ToastPrimitive.Action>
// 					</div>
// 				)}
// 			</ToastPrimitive.Root>
// 		);
// 	}
// );
// Toast.displayName = 'Toast';

// // Export individual primitives if needed
// export const ToastTitle = ToastPrimitive.Title;
// export const ToastDescription = ToastPrimitive.Description;
// export const ToastAction = ToastPrimitive.Action;

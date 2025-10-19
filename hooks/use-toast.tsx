/** @format */

'use client';

import type { ToastActionElement } from '@/components/ui/toast';
import * as RadixToast from '@radix-ui/react-toast';
import { clsx } from 'clsx';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import * as React from 'react';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5_000;

type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToasterToast {
	id: string;
	variant?: 'success' | 'error' | 'info' | 'warning';
	title?: string;
	description?: string;
	action?: ToastActionElement;
	timestamp: string;
	open: boolean;
	onOpenChange(open: boolean): void;
}

type State = { toasts: ToasterToast[] };

type Action =
	| { type: 'ADD'; toast: ToasterToast }
	| { type: 'UPDATE'; toast: Partial<ToasterToast> & { id: string } }
	| { type: 'DISMISS'; id?: string }
	| { type: 'REMOVE'; id?: string };

let count = 0;
function genId() {
	return String(++count);
}

const timeouts = new Map<string, ReturnType<typeof setTimeout>>();
function queueRemove(id: string) {
	if (timeouts.has(id)) return;
	const t = setTimeout(() => {
		dispatch({ type: 'REMOVE', id });
		timeouts.delete(id);
	}, TOAST_REMOVE_DELAY);
	timeouts.set(id, t);
}

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'ADD':
			return {
				toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
			};
		case 'UPDATE':
			return {
				toasts: state.toasts.map((t) =>
					t.id === action.toast.id ? { ...t, ...action.toast } : t
				),
			};
		case 'DISMISS':
			return {
				toasts: state.toasts.map((t) =>
					!action.id || t.id === action.id
						? (() => {
								queueRemove(t.id);
								return { ...t, open: false };
						  })()
						: t
				),
			};
		case 'REMOVE':
			return action.id == null
				? { toasts: [] }
				: { toasts: state.toasts.filter((t) => t.id !== action.id) };
		default:
			return state;
	}
}

let globalState: State = { toasts: [] };
const listeners = new Set<React.Dispatch<State>>();

function dispatch(a: Action) {
	globalState = reducer(globalState, a);
	listeners.forEach((l) => l(globalState));
}

export function toast({
	variant = 'success',
	title,
	description,
	action,
}: Omit<Partial<ToasterToast>, 'id' | 'open' | 'timestamp' | 'onOpenChange'>) {
	const id = genId();
	const timestamp = new Date().toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});

	const base: ToasterToast = {
		id,
		variant,
		title,
		description,
		action,
		timestamp,
		open: true,
		onOpenChange: (open) => {
			if (!open) dispatch({ type: 'DISMISS', id });
		},
	};

	dispatch({ type: 'ADD', toast: base });

	return {
		id,
		dismiss: () => dispatch({ type: 'DISMISS', id }),
		update: (t: Partial<Omit<ToasterToast, 'id'>>) =>
			dispatch({ type: 'UPDATE', toast: { ...t, id } }),
	};
}

export function useToast() {
	const [state, setState] = React.useState(globalState);
	React.useEffect(() => {
		listeners.add(setState);
		return () => void listeners.delete(setState);
	}, []);
	return {
		...state,
		toast,
		dismiss: (id?: string) => dispatch({ type: 'DISMISS', id }),
	};
}

export const ToastProvider = RadixToast.Provider;

export const ToastViewport: React.FC<RadixToast.ToastViewportProps> = (
	props
) => (
	<RadixToast.Viewport
		className='fixed bottom-4 right-4 flex flex-col space-y-2 w-80 max-w-full outline-none z-[100]'
		{...props}
	/>
);

const variantClasses: Record<ToastVariant, string> = {
	success: 'bg-white border border-green-200',
	error: 'bg-white border border-red-200',
	info: 'bg-white border border-blue-200',
	warning: 'bg-white border border-yellow-200',
};

const iconMap: Record<ToastVariant, React.ReactNode> = {
	success: <CheckCircle2 className='w-5 h-5 text-green-500' />,
	error: <XCircle className='w-5 h-5 text-red-500' />,
	info: <Info className='w-5 h-5 text-blue-500' />,
	warning: <AlertTriangle className='w-5 h-5 text-yellow-500' />,
};

// this component renders each toast from state
export function Toaster() {
	const { toasts } = useToast();
	return (
		<>
			{toasts.map((t) => (
				<RadixToast.Root
					key={t.id}
					open={t.open}
					onOpenChange={t.onOpenChange}
					className={clsx(
						'flex items-start gap-3 p-4 rounded-lg shadow',
						variantClasses[t.variant ?? 'info']
					)}>
					<div>{iconMap[t.variant ?? 'info']}</div>
					<div className='flex-1'>
						<div className='flex justify-between items-center'>
							<RadixToast.Title className='text-sm font-medium text-gray-900'>
								{t.title}
							</RadixToast.Title>
							<span className='text-xs text-gray-500'>{t.timestamp}</span>
						</div>
						{t.description && (
							<RadixToast.Description className='text-sm text-gray-600 mt-1'>
								{t.description}
							</RadixToast.Description>
						)}
					</div>
					{t.action && (
						<RadixToast.Action
							asChild
							altText='toast-action'>
							{t.action}
						</RadixToast.Action>
					)}
				</RadixToast.Root>
			))}
		</>
	);
}

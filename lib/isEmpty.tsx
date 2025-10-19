/** @format */

'use client';

import React from 'react';

interface EmptyStateProps {
	message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
	return <div className='py-10 text-center text-gray-500'>{message}</div>;
}

/** @format */

import React from 'react';

const InputElement = ({
	id,
	label,
	placeholder,
	type,
	value,
	onChange,
}: {
	id: string;
	label: string;
	placeholder: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<div className='flex flex-col gap-2 w-full font-[family-name:var(--font-roboto)]'>
			<label
				htmlFor={id}
				className='w-full text-sm'>
				{label}
			</label>
			<div className='p-3 rounded-md bg-zinc-100'>
				<input
					className='text-sm w-full bg-transparent outline-none text-zinc-500'
					id={id}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			</div>
			{id === 'password' && (
				<p className='text-xs text-zinc-400'>
					It must be a combination of minimum 8 letters, numbers, and symbols.
				</p>
			)}
		</div>
	);
};

export default InputElement;

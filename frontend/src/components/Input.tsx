import { HTMLInputTypeAttribute } from 'react';

interface InputProps {
	id: string;
	label: string;
	onChange: (value: string) => void;
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
}

const Input = ({
	id,
	label,
	type,
	placeholder,
	onChange,
}: InputProps) => {
	return (
		<div className="mb-4">
			<label className="block text-gray-700 text-sm font-bold" htmlFor={id}>
				{label}
			</label>{' '}
			<br />
				<input
					id={id}
					className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
					type={type}
					placeholder={placeholder}
					onChange={(e) => {
						e.preventDefault();
						onChange(e.target.value);
					}}
					required
				/>
			</div>
	);
};

export default Input;

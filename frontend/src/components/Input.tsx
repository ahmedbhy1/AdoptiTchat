import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  id: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
}

const Input = ({
  id,
  value,
  label,
  type,
  placeholder,
  onChange,
  disabled,
}: InputProps) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold" htmlFor={id}>
        {label}
      </label>{" "}
      <br />
      <input
        disabled={disabled}
        id={id}
        className={
          "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        }
        value={value}
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

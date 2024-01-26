import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";

export function Dropdown({
  options,
  onChange,
  value,
  label,
  disabled,
  name,
}: {
  options: string[];
  onChange: (value: any) => void;
  value: string;
  label: string;
  disabled: boolean;
  name: string;
}) {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-5">
        {label}
      </label>{" "}
      <Listbox
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        disabled={disabled}
      >
        <div className="relative mb-4">
          <Listbox.Button
            className="cursor-pointer h-full w-full   ring-1 ring-gray-200 text-left pl-4 bg-light rounded  
               focus:outline-none focus:ring-gray-500 focus:ring-2  shadow"
          >
            <span className="block truncate capitalize text-black">
              {value}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none h-full">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-4 divide-y divide-gray-300 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `${active ? "text-purple-500 " : "text-gray-600"}
                        cursor-pointer select-none relative py-3  px-6`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 right-0 flex items-center pr-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
}

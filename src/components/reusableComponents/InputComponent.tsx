import React from 'react';
import { customInputProps } from '../../types/types';
import '../../pages/index.css';
const InputComponent = (props: customInputProps) => {
    return (
        <div className="lg:col-span-6 col-span-12">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {props.label}
            </label>
            <input
                type={props.type}
                placeholder={props.placeholder}
                // value={props.value}
                onChange={props.onChange}
                className="bg-[#F5F5F5] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required={props.required ? props.required : false}
                disabled={props.disabled ? props.disabled : false}
            />
        </div>
    );
};

export default InputComponent;

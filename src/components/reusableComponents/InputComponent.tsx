import React from 'react';
import { customInputProps } from '../../types/types';
import '../../pages/index.css';
const InputComponent = (props: customInputProps) => {
    return (
        <div className="flex relative">
            <label
                htmlFor=""
                className="absolute text-[18px] font-[500] transform  -translate-y-4 scale-75 top-2  bg-white dark:bg-gray-900 px-2   rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1   "
            >
                {props.label}
            </label>
            <input
                type={props.type}
                placeholder={props.placeholder}
                // value={props.value}
                onChange={props.onChange}
                className="form-input input_color "
                required={props.required ? props.required : false}
                disabled={props.disabled ? props.disabled : false}
            />
        </div>
    );
};

export default InputComponent;

import React, { useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import { customNumbersInputProps } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleRTL } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';

const NubmerInput = (props: customNumbersInputProps) => {
    return (
        <div className="relative  ">
            <label htmlFor="" className={`absolute z-10   top-[-10px] left-[19px] bg-white text-[14px] font-[500]`}>
                Phone Number
            </label>

            <PhoneInput       country={'eg'} value={props.value} onChange={(value) => props.onChange(value)} />
        </div>
    );
};

export default NubmerInput;

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { customNumbersInputProps } from '../../types/types';

const NubmerInput = (props: customNumbersInputProps) => {
    return <>
      <div className="relative">
            <label htmlFor="" className={`  text-[14px] font-[500]`}>
                Phone Number
            </label>

            <PhoneInput defaultCountry="eg" className=" " value={props?.value} onChange={(phone:any) => props?.onChange(phone)} />
        </div>
    
    </>
};

export default NubmerInput;
import React from 'react';
import Select from 'react-select';
import { customSelectProps } from '../../types/types';

const CustomSelect = (props: customSelectProps) => {
    const customStyles = {
      
       
        option: (provided:any, state:any) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#F23F39' : 'white',
          color: state.isSelected ? 'white' : 'black',

        }),
      };
    return <>
    
<div className="relative ">
<label htmlFor="" className="absolute text-[18px]  font-[500]   transform -translate-y-4 scale-75 top-2 z-10  bg-white dark:bg-gray-900 px-2   rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">                {props.label}
</label>

            
            <Select defaultValue={props.options[0]} className="select_styles" options={props.options} isSearchable={false}  styles={customStyles} />
        </div>
    </>
        
     

};

export default CustomSelect;

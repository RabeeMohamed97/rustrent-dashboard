import React, { useState } from 'react'
import FormLayout from '../../../components/reusableComponents/FormLayout'
import InputComponent from '../../../components/reusableComponents/InputComponent'
import MainPageCard from '../../../components/reusableComponents/MainPageCard'
import CustomSelect from '../../../components/reusableComponents/CustomSelect';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import NubmerInput from '../../../components/reusableComponents/NubmerInput';
import ReactQuill from 'react-quill';
import Upload from '../../../components/reusableComponents/Upload';
import { Link } from 'react-router-dom';
export default function Add_Users() {
  
    
    const [file, setFile] = useState<File | null>(null);



const [phone, setPohone] = useState('');


//Switch Functions
const [isChecked, setIsChecked] = useState(true);
const handleCheckboxChange = (event:any) => {
  setIsChecked(event.target.checked);
};





//Password Functions
const [isPasswordVisible, setIsPasswordVisible] = useState(false);
const handleTogglePasswordVisibility = () => {
  setIsPasswordVisible(!isPasswordVisible);
};
  return <> 

    <MainPageCard>
    <div className="flex flex-col p-5  gap-[20px] ">
        <FormLayout title="Add User">
            <div className="grid-cols-12 lg:p-5   p-2  grid gap-4 ">
              
                <div className="lg:col-span-2 md:col-span-4 col-span-12">

                <Upload user={true}  setFile={setFile} />
                </div>
                <div className="lg:col-span-10 md:col-span-8 col-span-12 ">



                    <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-5">

<InputComponent type="text" placeholder="Enter Name" onChange={(e) => console.log(e)} label="Full Name"  />
<div className="relative">
<InputComponent
type={isPasswordVisible ? 'text' : 'password'}
placeholder="************"
label="Password"
onChange={(e) => console.log(e)}        
className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
/>

<div
  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
  onClick={handleTogglePasswordVisibility}
>
  {isPasswordVisible ? (
    <FaEyeSlash className="h-5 w-5 text-red-500" />
  ) : (
    <FaEye className="h-5 w-5 text-red-500" />
  )}
</div>

</div>
<NubmerInput value={phone} onChange={(phone) => setPohone(phone)} />

<div className='flex md:flex-wrap gap-x-11 gap-y-3  justify-between lg:py-10 py-0  items-center'>
<h2 className='text-[#373837] text-[18px] lg:font-semibold '>Status</h2>

<div className="inline-flex gap-4 capitalize items-center">
<span className={!isChecked ? "text-red-500 font-semibold text-[16px]" : "text-[16px]"}>Un Active</span>

<div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
  <input
    id="switch-2"
    type="checkbox"
    checked={isChecked}
    onChange={handleCheckboxChange}
    className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-red-500 peer-checked:border-red-500 peer-checked:before:bg-red-500"
  />
  <label
    htmlFor="switch-2"
    className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-red-500 peer-checked:before:bg-red-500">
    <div
      className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
      data-ripple-dark="true"
    ></div>
  </label>
</div>
<span className={isChecked ? "text-red-500 font-semibold text-[16px]" : "text-[16px]"}>Active</span>
</div>
</div>



</div>

</div>

            </div>
        </FormLayout>

    </div>
 


  

</MainPageCard>
<div className='flex py-16 capitalize  justify-between'>

<Link to={'/Restaurant/List'} className="btn text-[20px] hover:bg-black hover:text-white shadow-sm rounded-full px-10 py-3  mt-6">
      back
  </Link>
<button type="submit" className="btn rounded-full text-[18px] btn-primary shadow-md px-10 py-3  mt-6">
      Save
  </button>
</div>  </>
}

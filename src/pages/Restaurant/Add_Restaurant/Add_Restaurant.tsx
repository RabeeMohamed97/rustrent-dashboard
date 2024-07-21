import React, { useState } from 'react';
import FormLayout from '../../../components/reusableComponents/FormLayout';
import InputComponent from '../../../components/reusableComponents/InputComponent';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import CustomSelect from '../../../components/reusableComponents/CustomSelect';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import NubmerInput from '../../../components/reusableComponents/NubmerInput';
import ReactQuill from 'react-quill';
import Upload from '../../../components/reusableComponents/Upload';
import { Link } from 'react-router-dom';

export default function Add_Restaurant() {
    const [file, setFile] = useState<File | null>(null);
    const [phone, setPohone] = useState('');
    const [value, setValue] = useState('');
    const [formdata, setformdata] = useState({
        ResturtanttName: '',
    });

    const countCharactersBetweenTags = (value: any) => {
        const strippedHtml = value.replace(/(<([^>]+)>)/gi, '');
        return strippedHtml.length;
    };
    const characterCount = countCharactersBetweenTags(value);

    const options = [
        { value: '', label: 'Select one' },
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];

    //Switch Functions
    const [isChecked, setIsChecked] = useState(true);
    const handleCheckboxChange = (event: any) => {
        setIsChecked(event.target.checked);
    };

    //Password Functions
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ],
    };
    return (
        <>
            <MainPageCard>
                <div className="flex flex-col p-5 gap-[20px]">
                    <FormLayout title="Add Resturant">
                        <div className="grid-cols-12 lg:p-5 p-2  grid gap-4 ">
                            <div className="lg:col-span-2 md:col-span-4  col-span-12">
                                <Upload setFile={setFile} />
                            </div>
                            <div className="lg:col-span-10 md:col-span-8 col-span-12">
                                <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-5">
                                    <InputComponent type="text" placeholder="Enter Name" onChange={(e) => console.log(e)} label="Restaurant Owner" />
                                    <InputComponent type="email" placeholder="example@gmail.com" onChange={(e) => console.log(e)} label="Email" />
                                    <NubmerInput value={phone} onChange={(phone) => setPohone(phone)} />

                                    <div className="relative">
                                        <InputComponent
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            placeholder="************"
                                            label="Password"
                                            onChange={(e) => console.log(e)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />

                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={handleTogglePasswordVisibility}>
                                            {isPasswordVisible ? <FaEyeSlash className="h-5 w-5 text-red-500" /> : <FaEye className="h-5 w-5 text-red-500" />}
                                        </div>
                                    </div>
                                    <CustomSelect options={options} label="Restaurant Type" />
                                    <InputComponent type="text" placeholder="Restaurant Name" onChange={(e) => console.log(e)} label="Restaurant Name" />
                                    <InputComponent type="date" placeholder="Register Date" onChange={(e) => console.log(e)} label="Register Date" />
                                    <InputComponent type="date" placeholder="Activate Date" onChange={(e) => console.log(e)} label="Activate Date" />
                                    <div className="flex gap-3 justify-around items-center">
                                        <h2 className="text-[#373837] text-[18px] font-semibold">Delivery</h2>

                                        <div className="inline-flex gap-4 capitalize items-center">
                                            <span className={!isChecked ? 'text-red-500 font-semibold text-[16px]' : 'text-[16px]'}>No</span>

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
                                                    className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-red-500 peer-checked:before:bg-red-500"
                                                >
                                                    <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" data-ripple-dark="true"></div>
                                                </label>
                                            </div>
                                            <span className={isChecked ? 'text-red-500 font-semibold text-[16px]' : 'text-[16px]'}>Yes</span>
                                        </div>
                                    </div>

                                    <CustomSelect options={options} label="Register Type" />
                                </div>
                            </div>
                        </div>
                    </FormLayout>
                </div>
                <div className="flex p-5 flex-col gap-[20px]">
                    <FormLayout title="Add Responsible">
                        <div className="grid-cols-12  lg:p-5 p-2  grid gap-4 ">
                            <div className="col-span-12  ">
                                <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-5">
                                    <InputComponent type="text" placeholder="Enter Name" onChange={(e) => console.log(e)} label="Responsiable Name" />
                                    <NubmerInput value={phone} onChange={(phone) => setPohone(phone)} />
                                    <div className="relative">
                                        <InputComponent type="text" placeholder="El Mansoura -Egypt" onChange={(e) => console.log(e)} label="Location Address" />
                                        <div className="absolute right-5 top-5">
                                            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M15.4651 7.53384C14.6776 3.86502 11.6551 2.21326 9.00007 2.21326C9.00007 2.21326 9.00007 2.21326 8.99257 2.21326C6.34507 2.21326 3.31507 3.85708 2.52757 7.5259C1.65007 11.6236 4.02007 15.0938 6.16507 17.2777C6.96007 18.0877 7.98007 18.4927 9.00007 18.4927C10.0201 18.4927 11.0401 18.0877 11.8276 17.2777C13.9726 15.0938 16.3426 11.6315 15.4651 7.53384ZM9.00007 11.5124C7.69507 11.5124 6.63757 10.3927 6.63757 9.0109C6.63757 7.62914 7.69507 6.50943 9.00007 6.50943C10.3051 6.50943 11.3626 7.62914 11.3626 9.0109C11.3626 10.3927 10.3051 11.5124 9.00007 11.5124Z"
                                                    fill="#F23F39"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormLayout>
                </div>
                <div className="flex  p-5 flex-col gap-[20px] ">
                    <FormLayout title="Description">
                        <div className="md:mb-10 mb-1">
                            <ReactQuill modules={modules} theme="snow" value={value} placeholder="type here" onChange={setValue} className="h-auto md:h-[150px]" />
                        </div>

                        <h2>
                            Number of characters <span className="text-red-500">{characterCount}</span>
                        </h2>
                    </FormLayout>
                </div>
            </MainPageCard>
            <div className="flex capitalize justify-between">
                <Link to={'/Restaurant/List'} className="btn text-[20px] hover:bg-black hover:text-white shadow-sm rounded-full px-10 py-3  mt-6">
                    back
                </Link>
                <button type="submit" className="btn rounded-full text-[18px] btn-primary shadow-md px-10 py-3  mt-6">
                    Save
                </button>
            </div>
        </>
    );
}

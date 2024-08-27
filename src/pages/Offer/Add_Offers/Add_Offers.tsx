import React, { useState } from 'react';

import Upload from '../../../components/reusableComponents/Upload';
import CustomSelect from '../../../components/reusableComponents/CustomSelect';
import CustomSelectWithType from '../../../components/reusableComponents/CustomSelectWithType';
import CustomTextAria from '../../../components/reusableComponents/CustomTextAria';

export default function Add_Offers() {

type AdvertisementsFormData = {
    name: string;
    description: string;
    publish_start_date: string;
    publish_end_date: string;
    is_active: number;
};
    const [AdvertisementsFormDataformData, setAdvertisementsFormDataFormData] = useState<AdvertisementsFormData>({
        name: '',
        is_active:1,
        publish_start_date: '', // Convert string to Date
        publish_end_date: '',
        description: '',
    });
    interface CityFormData {
        name: string;
        city_id: number;
    }
    const [resformData, setresFormData] = useState<CityFormData>({
        name: '',
        city_id: 0,
    });
    const options = [
        { value: '', label: 'Burger' },
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [isChecked, setIsChecked] = useState(true);
    const handleCheckboxChange = (event: any) => {
        setIsChecked(event.target.checked);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setFormData({
            name: '',
            price: '',
            category: '',
            description: '',
        });
    };
    const handleSelectChange = (value: number) => {
        setresFormData({ ...resformData, city_id: value }); // Update the category in state
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-12">
                    <div className="lg:col-span-12 col-span-12">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Offer Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Write your offer name"
                        />
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                  <CustomSelect options={options}     onChange={handleChange} label="Category" />
                </div>
                    <div className="lg:col-span-6 col-span-12">
                  <CustomSelect options={options}     onChange={handleChange} label="Sub Category" />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <CustomSelect options={options}     onChange={handleChange} label="Meals" />
                </div>

                    <div className="lg:col-span-6 col-span-12 mt-[28px] ms-[3px]">
<div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg" data-hs-input-number>
  <div className=" gap-x-1.5">
    <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabIndex={-1} aria-label="Decrease" data-hs-input-number-decrement>
      <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
      </svg>
    </button>
    <input className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" style={{MozAppearance: 'textfield'}} type="number" aria-roledescription="Number field" defaultValue={0} data-hs-input-number-input />
    <button type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabIndex={-1} aria-label="Increase" data-hs-input-number-increment>
      <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </button>
  </div>
</div>



                    </div>
                    <div className="lg:col-span-6 col-span-12">
                  <CustomSelect options={options}     onChange={handleChange} label="discount Type" />
                </div>
                <div className="lg:col-span-6 col-span-12">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            discount percentage
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Write your discount percentage "
                        />
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            start Date
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="mm//dd//yyyy"
                        />
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            End Date
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="mm//dd//yyyy"
                        />
                    </div>
                </div>
                <div className="w-full  flex justify-end">
                    <button
                        type="submit"
                        className="text-white flex    bg-gradient-to-r from-[#F23F39] to-[#BD0600] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Save
                    </button>
                </div>


                <CustomTextAria label="Meal Description" name="description" onChange={handleChange} value={AdvertisementsFormDataformData?.description} placeholder="Type Here" />

            </form>
        </>
    );
}

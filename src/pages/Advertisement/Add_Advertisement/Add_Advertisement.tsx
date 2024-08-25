import React, { useEffect, useState } from 'react';

import Upload from '../../../components/reusableComponents/Upload';

import { showAlert } from '../../../components/Error';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

import CustomTextAria from '../../../components/reusableComponents/CustomTextAria';
import { useCreateAdvertisementsMutation, useEditAdvertisementsMutation } from '../../../api/Resturants/Advertisements';
import CustomDataInput from '../../../components/reusableComponents/DateInput';

export const formSchema = z.object({
    // name: z.string().min(1, 'يجب إدخال الاسم'),
});

type AdvertisementsFormData = {
    name: string;
    description: string;
    publish_start_date: string;
    publish_end_date: string;
    is_active: number;
};
interface Category {
    id: number;
    name: string;
}

type EditAdvertisementProps = {
    data?: any;
};
export default function Add_Meals(props: EditAdvertisementProps) {
        const [file, setFile] = useState<File | null>(null);
    
    const [options, setoptions] = useState([]);
    const [subCatOptions, setSubCatOpions] = useState([]);
    const navigate = useNavigate();



    const [AdvertisementsFormDataformData, setAdvertisementsFormDataFormData] = useState<AdvertisementsFormData>({
        name: '',
        is_active:1,
        publish_start_date: '', // Convert string to Date
        publish_end_date: '', 
        description: '',
    });

    useEffect(() => {
        setAdvertisementsFormDataFormData(props.data);
    }, []);

    const [isChecked, setIsChecked] = useState(true);

    const [toastData, setToastData] = useState<any>({});

    const [errors, setErrors] = useState<any>({});
    const [createAdvertisements, { isLoading }] = useCreateAdvertisementsMutation();
    const [editAdvertisements, { isLoading: editIsLoading }] = useEditAdvertisementsMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAdvertisementsFormDataFormData({ ...AdvertisementsFormDataformData, [name]: value });
    };
   
     const handleCheckboxChange = (event: any) => {
        setAdvertisementsFormDataFormData({ ...AdvertisementsFormDataformData, is_active: event.target.checked ? 1 : 0 });
    };

    useEffect(() => {
        if (toastData?.data?.status === 200) {
            showAlert('Added', toastData?.data?.response?.message);
            navigate('/Advertisement');
            setToastData({});
        }
        if (toastData?.error?.status === 422) {
            toast.error(toastData?.error?.response.data?.message, {});
            setToastData({});
        }
        if (toastData?.error?.status === 500) {
            toast.error(toastData?.error?.response?.data?.message, {});
            setToastData({});
        }

        if (isLoading) {
            toast.loading('Loading...', {
                toastId: 'loginLoadingToast',
                autoClose: false,
            });
        } else {
            toast.dismiss('loginLoadingToast');
        }
    }, [toastData, isLoading]);
    const [StartedDate, setStartedDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        
        const formattedDate = date?.toISOString().split('T')[0];
                    {/* @ts-ignore */}
        setStartedDate(formattedDate);
    };
    const [EndDate, setEndDate] = useState<Date | null>(new Date());

    const handleEndDateChange = (date: Date | null) => {
        const formattedDate = date?.toISOString().split('T')[0];
                            {/* @ts-ignore */}
        setEndDate(formattedDate);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
                            {/* @ts-ignore */}
        AdvertisementsFormDataformData.publish_start_date = StartedDate;
                            {/* @ts-ignore */}
        AdvertisementsFormDataformData.publish_end_date = EndDate;
        const formData = new FormData();

        formData.append('name', AdvertisementsFormDataformData.name);
        formData.append('description', AdvertisementsFormDataformData.description);
        formData.append('publish_start_date', AdvertisementsFormDataformData.publish_start_date);
        formData.append('publish_end_date', AdvertisementsFormDataformData.publish_end_date);
                                    {/* @ts-ignore */}
        formData.append('is_active', AdvertisementsFormDataformData.is_active);
        
        if (file) {
            
            formData.append(`image`, file);
        }
        // dispatch(modalActions.closeModal())
        const result = formSchema.safeParse(formData);

        // Perform your form submission logic here, such as making an API call.
        // After submission, you can close the modal and clear the form
        if (!result.success) {
            // @ts-ignore
            setErrors(result.error.formErrors.fieldErrors);
            return;
        }
        // const data = await createResturant(formData);
        // console.log(data);

        // if (!props?.data.id) {

        // }

        try {
            if (props?.data?.id) {
                const response = await editAdvertisements({ id: props?.data?.id, formData });
                console.log(response);
                setToastData(response);
                setErrors({});
            } else {
                const response = await createAdvertisements(formData);
                console.log(response);
                setToastData(response);
                setErrors({});
            }
        } catch (err) {
            setToastData(err);
            setErrors(err);
        }
    };
 
    return (
        <>
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-12">
                    <div className="lg:col-span-6 col-span-12">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Advertisement Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={AdvertisementsFormDataformData?.name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Write your Table name"
                        />
                    </div>


                    <div className="lg:col-span-6 col-span-12">
                                  <CustomDataInput label="Publication start date" value={StartedDate} onChange={handleDateChange} />
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                                  <CustomDataInput label="Publication End date" value={EndDate} onChange={handleEndDateChange} />
                    </div>
                    <div className="lg:col-span-2 col-span-12  ">
                        <h2 className="text-[#2E2E2E] text-center text-[16px] font-medium   pb-5">Advertisement Status</h2>

                        <div className="flex gap-4 capitalize items-center justify-center ">
                            <span className={!isChecked ? 'text-red-500 font-semibold text-[16px]' : 'text-[16px]'}>Active</span>

                            <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                                <input
                                    id="switch-2"
                                    type="checkbox"
                                    checked={AdvertisementsFormDataformData?.is_active==1?true:false}
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
                            <span className={isChecked ? 'text-red-500 font-semibold text-[16px]' : 'text-[16px]'}>Un Active</span>
                        </div>
                    </div>
                  
                    
                    <div className="col-span-12 ">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            image
                        </label>

                        <Upload setFile={setFile} editImgUrl={props?.data?.image} />
                    </div>
                    <CustomTextAria label="Meal Description" name="description" onChange={handleChange} value={AdvertisementsFormDataformData?.description} placeholder="Type Here" />
                    {/* <div className="col-span-12">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Meal Description
                        </label>
                        <textarea
                            rows={4}
                            name="details"
                            id="name"
                            onChange={handleChange}
                            value={mealsformData?.details}
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type Here"
                        />
                    </div> */}
                </div>
                <div className="w-full  flex justify-end">
                    <button
                        type="submit"
                        className="text-white flex    bg-gradient-to-r from-[#F23F39] to-[#BD0600] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}

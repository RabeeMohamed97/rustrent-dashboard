import React, { useEffect, useState } from 'react';
import Upload from '../../../components/reusableComponents/Upload';
import InputComponent from '../../../components/reusableComponents/InputComponent';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { NumberInput } from '@mantine/core';
import { z } from 'zod';
import NubmerInput from '../../../components/reusableComponents/NubmerInput';
import CustomSelect from '../../../components/reusableComponents/CustomSelect';
import { toast } from 'react-toastify';
import { showAlert } from '../../../components/Error';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '../../../components/reusableComponents/Loading_button';
import { useCreateCategoryMutation, useCreateRegionMutation, useEditRegionMutation } from '../../../api/Resturants/Categories';
import CustomSelectWithType from '../../../components/reusableComponents/CustomSelectWithType';

export const formSchema = z.object({
    name: z.string().min(1, 'يجب إدخال الاسم').max(100, 'يجب أن يكون الاسم أقل من 100 حرف'),
});

interface CityFormData {
    name: string;
    city_id: number;
}

type editData = {
    data?: any;
};
export default function Add_Region(props: editData) {
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const [resformData, setresFormData] = useState<CityFormData>({
        name: '',
        city_id: 0,
    });

    const [isChecked, setIsChecked] = useState(true);
    // const handleCheckboxChange = (event: any) => {
    //   setresFormData({ ...resformData, has_delivery: event.target.checked ? 1 : 0 });
    // };
    const [toastData, setToastData] = useState<any>({});

    const [errors, setErrors] = useState<any>({});
    const [createRegion, { isLoading }] = useCreateRegionMutation();
    const [editRegion, { isLoading: eidtLoding }] = useEditRegionMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setresFormData({ ...resformData, [name]: value });
    };
    const handleSelectChange = (value: number) => {
        setresFormData({ ...resformData, city_id: value }); // Update the category in state
    };
    useEffect(() => {
        setresFormData({
            name: props?.data?.name,
            city_id: props?.data?.city_id,
        });
    }, []);
    useEffect(() => {
        if (toastData?.data?.status === 200) {
            showAlert('Added', toastData?.data?.response?.message);
            navigate('/Region/List');
            setToastData({});
        }
        // console.log(toastData.data);
        if (toastData?.error?.status === 422) {
            toast.error(toastData?.error?.response.data?.message, {});
            setToastData({});
        }
        if (toastData?.error?.status === 500) {
            toast.error(toastData?.error?.response?.data?.message, {});
            setToastData({});
        }

        if (isLoading || eidtLoding) {
            toast.loading('Loading...', {
                toastId: 'loginLoadingToast',
                autoClose: false,
            });
        } else {
            toast.dismiss('loginLoadingToast');
        }
    }, [toastData, isLoading, eidtLoding]);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', resformData);

        const result = formSchema.safeParse(resformData);

        if (!result.success) {
            // @ts-ignore
            setErrors(result.error.formErrors.fieldErrors);
            console.log(result.error.formErrors.fieldErrors);
            return;
        }

        try {
            if (props?.data?.id) {
                const response = await editRegion({ id: props?.data?.id, formData: resformData });
                console.log(response);
                setToastData(response);
                setErrors({});
            } else {
                const response = await createRegion(resformData);
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
                            Region Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={resformData.name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Write your Coupon name"
                        />
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <CustomSelectWithType label="MainCity" type="City" onChange={handleSelectChange} />
                    </div>

                    <div className="lg:col-span-6 col-span-12 ">
                        <h2 className="text-[#373837] text-[18px] font-semibold pb-5">Category Status</h2>

                        <div className="inline-flex gap-4 capitalize items-center">
                            <span className={!isChecked ? 'text-red-500 font-semibold text-[16px]' : 'text-[16px]'}>Active</span>

                            <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                                <input
                                    id="switch-2"
                                    type="checkbox"
                                    checked={isChecked}
                                    className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-red-500 peer-checked:border-red-500 peer-checked:before:bg-red-500"
                                />
                                <label
                                    htmlFor="switch-2"
                                    className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-red-500 peer-checked:before:bg-red-500"
                                >
                                    <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" data-ripple-dark="true"></div>
                                </label>
                            </div>
                            <span className={isChecked ? 'text-red-500 font-semibold text-[16px]' : 'text-[16px]'}>unActive</span>
                        </div>
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
            </form>
        </>
    );
}

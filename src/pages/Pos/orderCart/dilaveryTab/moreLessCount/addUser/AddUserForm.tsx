import React, { useEffect, useState } from 'react';

import { z } from 'zod';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { useCreateRegionMutation, useEditRegionMutation } from '../../../../../../api/Resturants/Country_City_Region';
import { showAlert } from '../../../../../../components/Error';
import CustomSelectWithType from '../../../../../../components/reusableComponents/CustomSelectWithType';
import CustomModal from '../../../../../../components/reusableComponents/CustomModal';
import InputComponent from '../../../../../../components/reusableComponents/InputComponent';
import NubmerInput from '../../../../../../components/reusableComponents/NubmerInput';

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
export default function AddUserForm(props: editData) {
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const [resformData, setresFormData] = useState<CityFormData>({
        name: '',
        city_id: 0,
    });

    const [isChecked, setIsChecked] = useState(true);

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
                <div className="flex gap-4 mb-4 flex-col w-full">
                    <InputComponent label="Name" name="name" placeholder="Mohamed Ahmed" onChange={handleChange} type="text" />

                    <NubmerInput value="0101274386733" onChange={() => console.log('first')} />
                    <div className="lg:col-span-6 col-span-12">
                        <CustomSelectWithType label="City" type="City" onChange={handleSelectChange} />
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <CustomSelectWithType label="Regions" type="region" onChange={handleSelectChange} />
                    </div>
                    <InputComponent label="Location Details" name="name" placeholder="Nasar City, Cairo, Egypt" onChange={handleChange} type="text" />
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

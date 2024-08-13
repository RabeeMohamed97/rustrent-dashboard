import React, { useEffect, useState } from 'react';

import Upload from '../../../components/reusableComponents/Upload';
import CustomSelect from '../../../components/reusableComponents/CustomSelect';
import { useCreateMealMutation } from '../../../api/Resturants/Meals';
import { showAlert } from '../../../components/Error';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

export const formSchema = z.object({
    name: z.string().min(1, 'يجب إدخال الاسم').max(100, 'يجب أن يكون الاسم أقل من 100 حرف'),
});

type mealsFormData = {
    name: string;
    price: string;
    description: string;
    sub_category_id: string;
    category_id: string;
    details: string;
    preparation_time: string;
};

export default function Add_Meals() {
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const [mealsformData, setMealsFormData] = useState<mealsFormData>({
        name: '',
        price: '',
        description: '',
        sub_category_id: '',
        preparation_time: '',
        category_id: '',
        details: '',
    });

    const [isChecked, setIsChecked] = useState(true);

    const [toastData, setToastData] = useState<any>({});

    const [errors, setErrors] = useState<any>({});
    const [createMeal, { isLoading }] = useCreateMealMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMealsFormData({ ...mealsformData, [name]: value });
        console.log(mealsformData);
    };

    useEffect(() => {
        if (toastData?.data?.status === 200) {
            showAlert('Added', toastData?.data?.response?.message);
            navigate('/Categories/List');
            setToastData({});
        }
        console.log(toastData.data);
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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', mealsformData.name);
        formData.append('description', mealsformData.description);
        //@ts-ignore
        formData.append('has_delivery', resformData.has_delivery);

        if (file) {
            formData.append(`image`, file);
        }
        // dispatch(modalActions.closeModal())
        const result = formSchema.safeParse(mealsformData);

        // Perform your form submission logic here, such as making an API call.
        // After submission, you can close the modal and clear the form
        if (!result.success) {
            // @ts-ignore
            setErrors(result.error.formErrors.fieldErrors);
            console.log(result.error.formErrors.fieldErrors);
            return;
        }
        // const data = await createResturant(formData);
        // console.log(data);
        try {
            const response = await createMeal(formData);

            setToastData(response);
            setErrors({});
        } catch (err) {
            setToastData(err);
            setErrors(err);
        }
    };
    const options = [
        { value: '', label: 'Write your table Category' },
        { value: 'orange', label: 'Orange' },
        { value: 'white', label: 'White' },
        { value: 'purple', label: 'Purple' },
    ];

    return (
        <>
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-12">
                    <div className="lg:col-span-6 col-span-12">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Meal Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={mealsformData?.name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Write your Table name"
                        />
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Preparation Date
                        </label>
                        <input
                            type="text"
                            name="preparation_time"
                            id="name"
                            value={mealsformData?.name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Write your Table name"
                        />
                    </div>

                    <div className="lg:col-span-6 col-span-12">
                        <CustomSelect options={options} label=" Category Name" />
                    </div>

                    <div className="lg:col-span-6 col-span-12">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Sub Category Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={mealsformData?.name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Write your Minimum number of people "
                        />
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Price
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={mealsformData?.name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Write your Maximum number of people"
                        />
                    </div>
                    <div className="col-span-12 ">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            image
                        </label>
                        <Upload setFile={setFile} />
                    </div>
                    <div className="col-span-12">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Meal Description
                        </label>
                        <textarea
                            rows={4}
                            name="name"
                            id="name"
                            value={mealsformData?.name}
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type Here"
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
            </form>
        </>
    );
}

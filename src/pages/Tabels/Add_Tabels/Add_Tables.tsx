import React, { useEffect, useState } from 'react';
import CustomSelect from '../../../components/reusableComponents/CustomSelect';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { showAlert } from '../../../components/Error';
import { z } from 'zod';
import LoadingButton from '../../../components/reusableComponents/Loading_button';
import { useCreateTableMutation, useEditTableMutation } from '../../../api/Resturants/Table';
import { useGetAllCategoriesWithoutPaginationQuery } from '../../../api/Resturants/Categories';

interface TableFormData {
    table_name: string;
    minimum_count: number;
    type: any;
    maximum_count: number;
}
type catEditProps = {
    data?: any;
};

export const formSchema = z.object({
    table_name: z.string().min(1, 'يجب إدخال الاسم').max(100, 'يجب أن يكون الاسم أقل من 100 حرف'),
});
export default function Add_Tables(props: catEditProps) {
    const { refetch, data, isSuccess, isError } = useGetAllCategoriesWithoutPaginationQuery();

    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [isChecked, setIsChecked] = useState(true);
    const handleCheckboxChange = (event: any) => {
        setIsChecked(event.target.checked);
    };

    const [resformData, setresFormData] = useState<TableFormData>({
        table_name: '',
        minimum_count: 0,
        type: '',
        maximum_count: 1,
    });
    const options = [
        { value: 'private', label: 'private' },
        { value: 'public', label: 'public' },
    ];

    const handleSelectChange = (value: number | string) => {
        setresFormData({ ...resformData, type: value }); // Update the category in state
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setresFormData({ ...resformData, [name]: value });
    };
    const [createTable, { isLoading }] = useCreateTableMutation();
    const [editTable, { isLoading: EditisLoading }] = useEditTableMutation();

    const [toastData, setToastData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (toastData?.data?.status === 200) {
            showAlert('Added', toastData?.data?.response?.message);
            navigate('/Tables/List');
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

        if (isLoading || EditisLoading) {
            toast.loading('Loading...', {
                toastId: 'loginLoadingToast',
                autoClose: false,
            });
        } else {
            toast.dismiss('loginLoadingToast');
        }
    }, [toastData, isLoading, EditisLoading]);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', resformData);

        // dispatch(modalActions.closeModal())
        const result = formSchema.safeParse(resformData);

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
            if (props?.data?.id) {
                const response = await editTable({ id: props?.data?.id, formData: resformData });
                setToastData(response);
                setErrors({});
            } else {
                const response = await createTable(resformData);
                console.log(response);
                setToastData(response);
                setErrors({});
            }
        } catch (err) {
            setToastData(err);
            setErrors(err);
        }
    };
    useEffect(() => {
        setresFormData({
            ...resformData,
            table_name: props?.data?.table_name,
            minimum_count: props?.data?.minimum_count,
            maximum_count: props?.data?.maximum_count,
            type: props?.data?.type,
        });
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-12">
                    <div className="lg:col-span-6 col-span-12">
                        <label htmlFor="table_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Table Name
                        </label>
                        <input
                            type="text"
                            name="table_name"
                            id="table_name"
                            value={resformData.table_name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Write your Table name"
                        />
                    </div>

                    <div className="lg:col-span-6 col-span-12">
                        <CustomSelect options={options} onChange={handleSelectChange} label=" Table Category " />
                    </div>

                    <div className="lg:col-span-6 col-span-12">
                        <label htmlFor="minimum_count" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Minimum number of people
                        </label>
                        <input
                            type="text"
                            name="minimum_count"
                            id="minimum_count"
                            value={resformData.minimum_count}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Write your Minimum number of people "
                        />
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <label htmlFor="maximum_count" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Maximum number of people
                        </label>
                        <input
                            type="text"
                            name="maximum_count"
                            id="maximum_count"
                            value={resformData.maximum_count}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Write your Maximum number of people"
                        />
                    </div>
                    <div className="lg:col-span-4 col-span-12 ">
                        <h2 className="text-[#373837] text-[18px] font-semibold pb-5">Table Status</h2>

                        <div className="inline-flex gap-4 capitalize items-center">
                            <span className={!isChecked ? 'text-red-500 font-semibold text-[16px]' : 'text-[16px]'}>Active</span>

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
                            <span className={isChecked ? 'text-red-500 font-semibold text-[16px]' : 'text-[16px]'}>un Active</span>
                        </div>
                    </div>
                </div>
                <div className="w-full  flex justify-end">
                    {isLoading || EditisLoading ? (
                        <>
                            <LoadingButton />
                        </>
                    ) : (
                        <>
                            <button
                                type="submit"
                                className="text-white flex    bg-gradient-to-r from-[#F23F39] to-[#BD0600]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                                </svg>
                                Add new Table
                            </button>
                        </>
                    )}
                </div>
            </form>
        </>
    );
}

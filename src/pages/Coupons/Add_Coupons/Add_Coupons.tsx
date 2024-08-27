import React, { useEffect, useState } from 'react';
import CustomSelect from '../../../components/reusableComponents/CustomSelect';
import Upload from '../../../components/reusableComponents/Upload';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { showAlert } from '../../../components/Error';
import { z } from 'zod';
import LoadingButton from '../../../components/reusableComponents/Loading_button';
import InputComponent from '../../../components/reusableComponents/InputComponent';
import CustomDataInput from '../../../components/reusableComponents/DateInput';
import { useCreateCouponMutation, useEditCouponMutation } from '../../../api/Resturants/Coupons';

interface TableFormData {
    name: string;
    code: string;
    type: string;
    value: string;
    start_date: string;
    end_date: string;
}
type catEditProps = {
    data?: any;
};

// export const formSchema = z.object({
//     table_name: z.string().min(1, 'يجب إدخال الاسم').max(100, 'يجب أن يكون الاسم أقل من 100 حرف'),
// });
export default function Add_Tables(props: catEditProps) {
    console.log(props.data?.name);
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [isChecked, setIsChecked] = useState(true);
    const handleCheckboxChange = (event: any) => {
        setIsChecked(event.target.checked);
    };
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(new Date());

    const [couponFormData, setcouponFormData] = useState<TableFormData>({
        name: '',
        code: '',
        type: 'fixed',
        value: '',
        start_date: '',
        end_date: '',
    });
    const options = [
        { value: 'fixed', label: 'Fixed amount' },
        { value: 'percentage', label: 'Percent %' },
    ];

    const handleStartDateChange = (date: Date | null) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
        setSelectedEndDate(date);
    };

    const handleSelectChange = (value: number | string) => {
        setcouponFormData({ ...couponFormData, type: value.toString() });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setcouponFormData({ ...couponFormData, [name]: value });
    };
    const [createCoupon, { isLoading }] = useCreateCouponMutation();
    const [editCoupon, { isLoading: EditisLoading }] = useEditCouponMutation();

    const [toastData, setToastData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (toastData?.data?.status === 200) {
            showAlert('Added', toastData?.data?.response?.message);
            navigate('/Coupons/List');
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
        console.log('Form submitted:', couponFormData);

        // dispatch(modalActions.closeModal())
        // const result = formSchema.safeParse(couponFormData);

        // Perform your form submission logic here, such as making an API call.
        // After submission, you can close the modal and clear the form
        // if (!result.success) {
        //     // @ts-ignore
        //     setErrors(result.error.formErrors.fieldErrors);
        //     console.log(result.error.formErrors.fieldErrors);
        //     return;
        // }
        // const data = await createResturant(formData);
        // console.log(data);

        couponFormData.start_date = convertData(selectedStartDate);
        couponFormData.end_date = convertData(selectedEndDate);

        try {
            if (props?.data?.id) {
                const response = await editCoupon({ id: props?.data?.id, formData: couponFormData });
                setToastData(response);
                setErrors({});
            } else {
                const response = await createCoupon(couponFormData);
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
        setcouponFormData({
            ...couponFormData,
            name: props?.data?.name,
            code: props?.data?.code,
            type: props?.data?.type,
            value: props?.data?.value,
        });
        setSelectedStartDate(props?.data?.start_date);
        setSelectedEndDate(props?.data?.end_date);
    }, [props.data]);

    console.log(couponFormData);
    console.log(selectedStartDate);
    const convertData = (date: Date | null) => {
        //@ts-ignore
        const convertedDate = new Date(date);

        // Extracting the month, day, and year
        const month = String(convertedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const day = String(convertedDate.getDate()).padStart(2, '0');
        const year = convertedDate.getFullYear();

        // Formatting the date as MM/DD/YYYY
        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);
        return formattedDate;
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-12">
                    <div className="lg:col-span-6 col-span-12">
                        <InputComponent name="name" label="Coupon Name" value={couponFormData.name} onChange={handleChange} type="text" placeholder="Write your coupon name" />
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <InputComponent name="code" label="Coupon Code" value={couponFormData.code} onChange={handleChange} type="text" placeholder="Write your coupon code" />
                    </div>

                    <div className="lg:col-span-6 col-span-12">
                        <CustomSelect options={options} onChange={handleSelectChange} label="Discount Type" />
                    </div>
                    {couponFormData.type === 'fixed' ? (
                        <div className="lg:col-span-6 col-span-12">
                            <InputComponent name="value" label="discount percentage" value={couponFormData.value} onChange={handleChange} type="text" placeholder="Write your  fixed discount " />
                        </div>
                    ) : (
                        <div className="lg:col-span-6 col-span-12">
                            <InputComponent name="value" label="discount percentage" value={couponFormData.value} onChange={handleChange} type="text" placeholder="Write your discount percentage" />
                        </div>
                    )}

                    <div className="lg:col-span-6 col-span-12">
                        <CustomDataInput label=" Start Date" value={selectedStartDate} onChange={handleStartDateChange} />
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <CustomDataInput label=" End Date" value={selectedEndDate} onChange={handleEndDateChange} />
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

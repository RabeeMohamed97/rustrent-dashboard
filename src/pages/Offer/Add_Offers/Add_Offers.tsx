import React, { useEffect, useState } from 'react';
import CustomSelect from '../../../components/reusableComponents/CustomSelect';
import CustomSelectWithType from '../../../components/reusableComponents/CustomSelectWithType';
import CustomTextAria from '../../../components/reusableComponents/CustomTextAria';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useGetAllCategoriesWithoutPaginationQuery, useGetAllSubCategoriesWithoutPaginationQuery } from '../../../api/Resturants/Categories';
import { toast } from 'react-toastify';
import { showAlert } from '../../../components/Error';
import { useCreateMealMutation, useEditMealMutation } from '../../../api/Resturants/Meals';
import LoadingButton from '../../../components/reusableComponents/Loading_button';
import { useCreateofferMutation, useEditofferMutation } from '../../../api/Resturants/Offer';
import DateInput from '../../../components/reusableComponents/DateInput';
export const formSchema = z.object({
    // name: z.string().min(1, 'يجب إدخال الاسم'),
});

type offerFormData = {
    name: string;
    item_id: string;
    is_active: string;
    discount_percentage: string;
    end_date: string;
    start_date: string;
};

interface CategoreyresFormData {
    name: string;
    has_delivery: number;
    description: string;
}
type EditofferProps = {
    data?: any;
};
const options = [
    { value: 'private', label: 'private' },
    { value: 'public', label: 'public' },
];

export default function Add_Offers(props: EditofferProps) {

    const [resformData, setresFormData] = useState<CategoreyresFormData>({
        name: '',
        has_delivery: 1,
        description: 'Test',
    });
    console.log(props.data);
    const [file, setFile] = useState<File | null>(null);

    const navigate = useNavigate();



    const [offerformData, setofferFormData] = useState<offerFormData>({
     name: "",
    item_id: "",
    is_active: "",
    discount_percentage: "",
    end_date: "",
    start_date: "",
    });

    useEffect(() => {
        setofferFormData(props.data);
    }, []);

    const [isChecked, setIsChecked] = useState(true);

    const [toastData, setToastData] = useState<any>({});

    const [errors, setErrors] = useState<any>({});
    const [createMeal, { isLoading }] = useCreateofferMutation();
    const [editMeal, { isLoading: editIsLoading }] = useEditofferMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setofferFormData({ ...offerformData, [name]: value });
        console.log(offerformData);
    };


    useEffect(() => {
        if (toastData?.data?.status === 200) {
            showAlert('Added', toastData?.data?.response?.message);
            navigate('/Meals/List');
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
        console.log(offerformData);
        const formData = new FormData();

        formData.append('name', offerformData.name);
        formData.append('price', offerformData.item_id);
        formData.append('sub_category_id',offerformData.is_active);
        formData.append('preparation_time', offerformData.discount_percentage);
        formData.append('category_id', offerformData.end_date);
        formData.append('details', offerformData.start_date);
        if (file) {
            formData.append(`image`, file);
        }

        const result = formSchema.safeParse(formData);

        if (!result.success) {
            // @ts-ignore
            setErrors(result.error.formErrors.fieldErrors);
            console.log(result.error.formErrors.fieldErrors);
            return;
        }


        try {
            if (props?.data?.id) {
                const response = await editMeal({ id: props?.data?.id, formData });
                console.log(response);
                setToastData(response);
                setErrors({});
            } else {
                const response = await createMeal(formData);
                console.log(response);
                setToastData(response);
                setErrors({});
            }
        } catch (err) {
            setToastData(err);
            setErrors(err);
        }
    };
    const handleCheckboxChange = (event: any) => {
        setresFormData({ ...resformData, has_delivery: event.target.checked ? 1 : 0 });
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
                            name="table_name"
                            id="table_name"

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
<div className="py-2 px-3 inline-block  border border-r  rounded-lg"  data-hs-input-number>
  <div className=" gap-x-1.5">
    <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-medium " tabIndex={-1} aria-label="Decrease" data-hs-input-number-decrement>
      <svg className="shrink-0  bg-[#BD0600] text-[white] rounded-md size-3.5" xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />

      </svg>
    </button>
    <input className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" style={{MozAppearance: 'textfield'}} type="number" aria-roledescription="Number field" defaultValue={0} data-hs-input-number-input />
    <button type="button" className="size-8  inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md  text-gray-800  hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabIndex={-1} aria-label="Increase" data-hs-input-number-increment>
    <svg className="shrink-0  bg-[#BD0600]  text-[white] rounded-md size-3.5" xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </button>
  </div>
</div>



                    </div>
                    <div className="lg:col-span-6 col-span-12">
                  <DateInput options={options}     onChange={handleChange} label="start Date" />

                </div>
                <div className="lg:col-span-6 col-span-12">
                  <DateInput options={options}     onChange={handleChange} label="end Date" />

                </div>
                </div>








<div className=''>
    <p className='font-bold'> Offer Status </p>
<div className="w-full  flex justify-end">
                    {isLoading || editIsLoading ? (
                        <>
                            <LoadingButton />
                        </>
                    ) : (
                        <>



                            <div className="lg:col-span-2 col-span-12  ">
                        <h2 className="text-[#2E2E2E] text-center text-[16px] font-medium   pb-5">Delivery</h2>

                        <div className="flex gap-4 capitalize items-center justify-center ">
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
                        </>
                    )}
                </div>
</div>












                <CustomTextAria label="Meal Description" name="description" onChange={handleChange} placeholder="Type Here" />
              <div className='flex justify-end'>
              <button
                                type="submit"
                                className="text-white flex  mt-[44px]   bg-gradient-to-r from-[#F23F39] to-[#BD0600]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                                </svg>
                                Save
                            </button>
              </div>

            </form>
        </>
    );
}

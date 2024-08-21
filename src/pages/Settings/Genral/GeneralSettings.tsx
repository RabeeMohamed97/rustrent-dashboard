import React, { useEffect, useState } from 'react';
import CustomTextAria from '../../../components/reusableComponents/CustomTextAria';
import InputComponent from '../../../components/reusableComponents/InputComponent';
import { useGeneralSettingsMutation } from '../../../api/Resturants/SettingSlice';
import { showAlert } from '../../../components/Error';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface generalFormData {
    tax: number;
    terms_conditions: string;
    cancelation_policy: string;
    about: string;
    privacy_policy: string;
    shipping_policy: string;
}
const initalFromData = {
    tax: 0,
    terms_conditions: '',
    cancelation_policy: '',
    about: '',
    privacy_policy: '',
    shipping_policy: '',
};
const GeneralSettings = () => {
    const [generalFormData, setGeneralFormData] = useState<generalFormData>(initalFromData);
    const [toastData, setToastData] = useState<any>({});

    const [errors, setErrors] = useState<any>({});
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setGeneralFormData({ ...generalFormData, [name]: value });
    };
    console.log(generalFormData);

    const [generalSettings, { isLoading }] = useGeneralSettingsMutation();
    useEffect(() => {
        if (toastData?.data?.status === 200) {
            showAlert('Added', toastData?.data?.response?.message);
            navigate('/profile');
            setToastData({});
            setGeneralFormData(initalFromData);
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

        // const result = formSchema.safeParse(generalFormData);

        // if (!result.success) {
        //     // @ts-ignore
        //     setErrors(result.error.formErrors.fieldErrors);
        //     console.log(result.error.formErrors.fieldErrors);
        //     return;
        // }

        try {
            const response = await generalSettings({ formData: generalFormData });
            console.log(response);
            setToastData(response);
            setErrors({});
        } catch (err) {
            setToastData(err);
            setErrors(err);
        }
    };
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-[28px] w-full ">
                    <InputComponent label="Value added tax" type="number" onChange={handleChange} placeholder="0" labelLang="AR" />

                    <InputComponent label="Value added tax" type="number" name="tax" onChange={handleChange} placeholder="0" labelLang="EN" />

                    <CustomTextAria label="Terms and Conditions Policy" name="terms_conditions" labelLang="AR" onChange={() => console.log('change')} value="changing" placeholder="Type Here" />

                    <CustomTextAria
                        label="Terms and Conditions Policy "
                        name="terms_conditions"
                        labelLang="EN"
                        onChange={handleChange}
                        value={generalFormData.terms_conditions}
                        placeholder="Type Here"
                    />

                    <CustomTextAria label="Terms and Conditions Policy" name="terms_conditions" labelLang="AR" onChange={() => console.log('change')} value="changing" placeholder="Type Here" />

                    <CustomTextAria label="Cancellation Policy " name="cancelation_policy" labelLang="EN" onChange={handleChange} value={generalFormData.cancelation_policy} placeholder="Type Here" />

                    <CustomTextAria label="About App" name="terms_conditions" labelLang="AR" onChange={() => console.log('change')} value="changing" placeholder="Type Here" />

                    <CustomTextAria label="About App " name="about" labelLang="EN" onChange={handleChange} value={generalFormData.about} placeholder="Type Here" />

                    <CustomTextAria label="About App" name="terms_conditions" labelLang="AR" onChange={() => console.log('change')} value="changing" placeholder="Type Here" />

                    <CustomTextAria label="privacy policy " name="privacy_policy" labelLang="EN" onChange={handleChange} value={generalFormData.privacy_policy} placeholder="Type Here" />

                    <CustomTextAria label="About App" name="terms_conditions" labelLang="AR" onChange={() => console.log('change')} value="changing" placeholder="Type Here" />

                    <CustomTextAria label="Shipping policy" name="shipping_policy" labelLang="EN" onChange={handleChange} value={generalFormData.shipping_policy} placeholder="Type Here" />

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="text-white flex    bg-gradient-to-r from-[#F23F39] to-[#BD0600]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default GeneralSettings;

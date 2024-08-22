import React, { ChangeEvent, useEffect, useState } from 'react';

import Upload from '../../components/reusableComponents/Upload';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { showAlert } from '../../components/Error';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '../../components/reusableComponents/Loading_button';
import { useCreateCategoryMutation, useEditCategoryMutation } from '../../api/Resturants/Categories';
import CustomTextAria from '../../components/reusableComponents/CustomTextAria';
import ReusableButton from '../../components/reusableComponents/Reusablebutton';
import { useSendRespnseMutation } from '../../api/Resturants/SettingSlice';

export const formSchema = z.object({
    response_msg: z.string().min(1, 'يجب إدخال الاسم').max(100, 'يجب أن يكون الاسم أقل من 100 حرف'),
});

interface initalFormData {
    response_msg: string;
}

interface responseProps {
    id?: string | number;
}

export default function Add_Response(props: responseProps) {
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const [responseData, setResponseData] = useState<initalFormData>({
        response_msg: '',
    });

    const [toastData, setToastData] = useState<any>({});

    const [errors, setErrors] = useState<any>({});
    const [sendRespnse, { isLoading }] = useSendRespnseMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResponseData({ ...responseData, [name]: value });
        console.log(responseData);
    };

    useEffect(() => {
        if (toastData?.data?.status === 200) {
            showAlert('Added', toastData?.data?.response?.message);
            navigate('/contact-us');
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

        // dispatch(modalActions.closeModal())
        const result = formSchema.safeParse(responseData);

        // Perform your form submission logic here, such as making an API call.
        // After submission, you can close the modal and clear the form
        if (!result.success) {
            // @ts-ignore
            setErrors(result.error.formErrors.fieldErrors);
            console.log(result.error.formErrors.fieldErrors);
            return;
        }

        try {
            const response = await sendRespnse({ id: props.id, formData: responseData });
            console.log(response);
            setToastData(response);
            setErrors({});
        } catch (err) {
            setToastData(err);
            setErrors(err);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="p-4 md:p-5 flex flex-col gap-6">
                <CustomTextAria label="" name="response_msg" onChange={handleChange} value={responseData?.response_msg} placeholder="Type Here" />

                <div className="flex justify-end ">
                    <ReusableButton label="Save" type="submit" />
                </div>
            </form>
        </>
    );
}

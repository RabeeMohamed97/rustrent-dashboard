import React, { useEffect, useState } from 'react';
import FormLayout from '../../../components/reusableComponents/FormLayout';
import InputComponent from '../../../components/reusableComponents/InputComponent';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';
import CustomSelect from '../../../components/reusableComponents/CustomSelect';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import NubmerInput from '../../../components/reusableComponents/NubmerInput';
import ReactQuill from 'react-quill';
import Upload from '../../../components/reusableComponents/Upload';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useChangePasswordMutation } from '../../../api/Auth';
const formSchema = z
    .object({
        new_password: z
            .string()
            .min(6, 'يجب أن يكون الرقم السري لا يقل عن 6 حروف أو أرقام')
            .refine((value) => /[A-Z]/.test(value), {
                message: 'يجب أن تحتوي كلمة السر على حرف واحد كبير على الأقل',
            }),
        new_password_confirmation: z
            .string()
            .min(6, 'يجب أن يكون الرقم السري لا يقل عن 6 حروف أو أرقام')
            .refine((value) => /[A-Z]/.test(value), {
                message: 'يجب أن تحتوي كلمة السر على حرف واحد كبير على الأقل',
            }),
    })
    .refine((data) => data.new_password === data.new_password_confirmation, {
        message: 'كلمات السر غير متطابقة',
        path: ['new_password_confirmation'], // The error message will be associated with the new_password_confirmation field
    });

interface signInfromData {
    old_password: string;
    new_password: string;
    new_password_confirmation: string;
}

const initialFormData = {
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
};
export default function ChangePasswordForProfile() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState<signInfromData>(initialFormData);
    const [toastData, setToastData] = React.useState<any>({});
    const logoutHandler = () => {
        localStorage.removeItem('deliToken');
        // setIsLogedIn(false);
        navigate('/');
    };
    const [errors, setErrors] = React.useState<any>({});
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    // const [deleteAccount, { isLoading: deleteIsLoading }] = useDeleteAccountMutation();


    useEffect(() => {
        if (toastData?.data?.status === 200) {
            toast.success('تم  تغيير كلمه السر بنجاح', {});

            setToastData({});
            // navigate('/');
            logoutHandler();
        }
        if (toastData?.error?.response?.status === 422) {
            toast.error(toastData.error?.response?.data?.message, {});
            setToastData({});
        }
        if (toastData?.error?.data?.status === 500) {
            toast.error(toastData?.error?.data?.message, {});
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name)
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = formSchema.safeParse(formData);
        // phoneSchema.safeParse(phone);

        if (!result.success) {
            // @ts-ignore
            setErrors(result.error.formErrors.fieldErrors);
            console.log(result.error.formErrors.fieldErrors);
            return;
        }
        const data = await changePassword(formData);
        console.log(data);
        // @ts-ignore
        if (data?.data?.status_code === 200) {
            setFormData(initialFormData);
        }
        setToastData(data);
        setErrors({});
    };

    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const handleToggleOldPasswordVisibility = () => {
        setIsOldPasswordVisible(!isOldPasswordVisible);
    };

    const handleToggleNewPasswordVisibility = () => {
        setIsNewPasswordVisible(!isNewPasswordVisible);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };
    console.log(formData);
    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                    <div className="flex flex-col p-5 gap-[20px]">
                            <div className="grid-cols-12 lg:p-5 p-2  grid gap-4 ">
                                <div className="lg:col-span-12 md:col-span-12 col-span-12">
                                    <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-5">
                                        <div className="relative">
                                            <InputComponent
                                                type={isOldPasswordVisible ? 'text' : 'password'}
                                                placeholder="************"
                                                label="Old Password"
                                                name="old_password"
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />

                                            <div className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center cursor-pointer" onClick={handleToggleOldPasswordVisibility}>
                                                {isOldPasswordVisible ? <FaEyeSlash className="h-5 w-5 text-red-500" /> : <FaEye className="h-5 w-5 text-red-500" />}
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <InputComponent
                                                type={isNewPasswordVisible ? 'text' : 'password'}
                                                placeholder="************"
                                                label="New Password"
                                                name="new_password"
                                                
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />

                                            <div className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center cursor-pointer" onClick={handleToggleNewPasswordVisibility}>
                                                {isNewPasswordVisible ? <FaEyeSlash className="h-5 w-5 text-red-500" /> : <FaEye className="h-5 w-5 text-red-500" />}
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <InputComponent
                                                type={isConfirmPasswordVisible ? 'text' : 'password'}
                                                placeholder="************"
                                                label="Confirm Password"
                                                name="new_password_confirmation"
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />

                                            <div className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center cursor-pointer" onClick={handleToggleConfirmPasswordVisibility}>
                                                {isConfirmPasswordVisible ? <FaEyeSlash className="h-5 w-5 text-red-500" /> : <FaEye className="h-5 w-5 text-red-500" />}
                                            </div>
                                        </div>
                                        <div className="flex justify-between w-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center ">
                                {errors.new_password_confirmation && <p className="text-[#FF0000] text-[12px]">{errors.new_password_confirmation}</p>}
                                {errors.new_password && <p className="text-[#FF0000] text-[12px]">{errors.new_password}</p>}
                            </div>
                    </div>
                <div className="flex capitalize justify-end">
                    <button type="submit" className="btn rounded-full text-[18px] btn-primary shadow-md px-10 py-3  mt-6">
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}

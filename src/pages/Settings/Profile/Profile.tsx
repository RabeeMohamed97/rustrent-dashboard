import React, { useEffect, useState } from 'react';
import FormLayout from '../../../components/reusableComponents/FormLayout';
import InputComponent from '../../../components/reusableComponents/InputComponent';
import MainPageCard from '../../../components/reusableComponents/MainPageCard';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import NubmerInput from '../../../components/reusableComponents/NubmerInput';

import Upload from '../../../components/reusableComponents/Upload';

import { z } from 'zod';
import { toast } from 'react-toastify';
// import { useCreateResturantMutation } from '../../../api/Resturants/resturant';
import { showAlert } from '../../../components/Error';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '../../../components/reusableComponents/Loading_button';
import Upload_cover from '../../../components/reusableComponents/Upload_Cover';
import MapComponent from '../../../components/reusableComponents/Map';

export const formSchema = z
    .object({
        name: z.string().min(1, 'يجب إدخال الاسم').max(100, 'يجب أن يكون الاسم أقل من 100 حرف'),

        owner_name: z.string().min(1, 'يجب إدخال اسم المالك').max(100, 'يجب أن يكون اسم المالك أقل من 100 حرف'),

        username: z.string().min(3, 'يجب أن يكون اسم المستخدم لا يقل عن 3 حروف').max(50, 'يجب أن يكون اسم المستخدم أقل من 50 حرف'),

        address: z.string().min(1, 'يجب إدخال العنوان').max(200, 'يجب أن يكون العنوان أقل من 200 حرف'),

        email: z.string().email('يجب إدخال البريد الإلكتروني بشكل صحيح').min(1, 'يجب إدخال البريد الإلكتروني'),

        latitude: z.string().min(1, 'ادخل اخط العرض'),

        longitude: z.string().min(1, 'ادخل اخط العرض'),

        phone: z
            .string()
            .min(10, 'يجب أن يكون رقم الهاتف لا يقل عن 10 أرقام')
            .refine((value) => /^\d+$/.test(value), {
                message: 'يجب أن يحتوي رقم الهاتف على أرقام فقط',
            }),

        password: z
            .string()
            .min(6, 'يجب أن يكون الرقم السري لا يقل عن 6 حروف أو أرقام')
            .refine((value) => /[A-Z]/.test(value), {
                message: 'يجب أن تحتوي كلمة السر على حرف واحد كبير على الأقل',
            }),

        password_confirmation: z.string(),
    })
    .refine(
        (data) => {
            // Check if password matches password_confirmation
            return data.password === data.password_confirmation;
        },
        {
            message: 'كلمتا المرور غير متطابقتين',
            path: ['password_confirmation'], // Specify the path to the field being validated
        }
    );
interface ProfileFormData {
    name: string;
    owner_name: string;
    username: string;
    address: string;
    email: string;
    longitude: string | null;
    latitude: string | null;
    password: string;
    password_confirmation: string;
    has_delivery: number;
    phone: string;
}
export default function ProfileForm() {
    const [phone, setPohone] = useState('');
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
    const navigate = useNavigate();

    const [resFormData, setresFormData] = useState<ProfileFormData>({
        name: '',
        owner_name: '',
        username: '',
        address: '',
        email: '',
        longitude: null,
        latitude: null,
        password: '',
        password_confirmation: '',
        has_delivery: 0,
        phone: '',
    });
    const [image, setImage] = useState<File | null>(null);
    const [cover_image, setCoverImage] = useState<File | null>(null);

    const [toastData, setToastData] = useState<any>({});

    const [errors, setErrors] = useState<any>({});
    // const [createProfile, { isLoading }] = useCreateProfileMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setresFormData({ ...resFormData, [name]: value });
    };
    const setLatLong = (position: { lat: number; lng: number } | null) => {
        setPosition(position);
        console.log(position);
    };
    const [isChecked, setIsChecked] = useState(true);
    const handleCheckboxChange = (event: any) => {
        // setIsChecked(event.target.checked);
        setresFormData({ ...resFormData, has_delivery: event.target.checked ? 1 : 0 });
    };

    //Password Functions
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        if (toastData?.data?.status === 201) {
            showAlert('Added', toastData?.data?.response?.message);
            navigate('/Restaurant/List');
            setToastData({});
        }
        console.log(toastData);
        if (toastData?.error?.status === 422) {
            toast.error(toastData?.error?.response.data?.message, {});
            setToastData({});
        }
        if (toastData?.error?.status === 500) {
            toast.error(toastData?.error?.response?.data?.message, {});
            setToastData({});
        }

        // if (isLoading) {
        //     toast.loading('Loading...', {
        //         toastId: 'loginLoadingToast',
        //         autoClose: false,
        //     });
        // } else {
        //     toast.dismiss('loginLoadingToast');
        // }
    }, [
        toastData,
        // isLoading
    ]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (position) {
            resFormData.latitude = String(position?.lat);
            resFormData.longitude = String(position?.lng);
        }
        resFormData.phone = phone;

        //resFormData
        const formData = new FormData();
        formData.append('name', resFormData.name);
        formData.append('owner_name', resFormData.owner_name);
        formData.append('username', resFormData.username);
        formData.append('email', resFormData.email);
        formData.append('address', resFormData.address);
        //@ts-ignore
        formData.append('latitude', resFormData?.latitude);
        //@ts-ignore
        formData.append('longitude', resFormData?.longitude);
        formData.append('password', resFormData.password);
        formData.append('password_confirmation', resFormData.password_confirmation);
        //@ts-ignore
        formData.append('has_delivery', resFormData.has_delivery);
        formData.append('phone', resFormData.phone);

        if (cover_image) {
            formData.append(`media[0]`, cover_image);
        }

        if (image) {
            formData.append(`media[1]`, image);
        }
        const result = formSchema.safeParse(resFormData);
        // phoneSchema.safeParse(phone);

        if (!result.success) {
            // @ts-ignore
            setErrors(result.error.formErrors.fieldErrors);
            console.log(result.error.formErrors.fieldErrors);
            return;
        }
        // const data = await createResturant(formData);
        // console.log(data);
        try {
            // const response = await createProfile(formData);
            // console.log(response);
            // setToastData(response);
            setErrors({});
        } catch (err) {
            setToastData(err);
            setErrors(err);
        }
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-col p-5 gap-[20px] pb-[30px]">
                    <div className="flex justify-center lg:flex-nowrap items-center bg-[#F5F5F5] flex-wrap md:w-[75%] mb-[30px] w-full  m-auto border-dashed border-2 rounded-3xl border-[#B7B7B7]">
                        {/* <div className="flex justify-around gap-5 bg-grey-500 "> */}
                        <div className="w-full p-4">
                            <Upload setFile={setImage} />
                        </div>
                        <div className="lg:border-s-2 lg:border-t-0 border-t-2 p-4 border-[#B7B7B7] border-solid  w-full">
                            <Upload_cover setFile={setCoverImage} />
                        </div>
                    </div>
                    <div className="grid-cols-12 lg:p-5 p-2  grid gap-4   ">
                        <div className="lg:col-span-12 md:col-span-12 col-span-12">
                            <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-5">
                                <div className="flex flex-col gap-2">
                                    <InputComponent type="text" placeholder="Enter Name" onChange={handleChange} name="name" label="Restaurant Name" />
                                    {errors?.name && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.name}</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputComponent type="text" placeholder="Enter Owner name" onChange={handleChange} name="name" label="Owner name" />
                                    {errors?.name && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.name}</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="relative">
                                        <InputComponent type="text" placeholder="El Mansoura -Egypt" onChange={handleChange} name="address" label="Location Address" />
                                    </div>
                                    <div>{errors?.address && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.address}</p>}</div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputComponent type="text" placeholder="deli_2024" onChange={handleChange} name="username" label="User Name" />
                                    {errors?.username && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.username}</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <NubmerInput value={phone} onChange={(phone) => setPohone(phone)} />
                                    {errors?.phone && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.phone}</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputComponent type="email" placeholder="example@gmail.com" onChange={handleChange} name="email" label="Email" />
                                    {errors?.email && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.email}</p>}
                                </div>

                                {/* <CustomSelect options={options} label="Register Type" /> */}
                            </div>
                        </div>
                    </div>

                    {/* {resFormData.has_delivery ? (
                                <></>
                            ) : (
                                <>
                                    <MapComponent setPosition={setLatLong} />
                                </>
                            )} */}
                </div>
                <div className="flex capitalize justify-end">
                    {/* {isLoading ? (
                        <>
                            <LoadingButton />
                        </>
                    ) : (
                        <> 
                        
                            <button type="submit" className="btn rounded-full text-[18px] btn-primary shadow-md px-10 py-3  mt-6">
                               Save 
                            </button>
                        </>
                    )} */}
                </div>
            </form>
        </>
    );
}

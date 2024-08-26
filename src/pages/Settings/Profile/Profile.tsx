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
import { useEditProfileMutation, useGetProfileQuery } from '../../../api/Resturants/Profile';
import CustomDataInput from '../../../components/reusableComponents/DateInput';

export const formSchema = z
    .object({
        name: z.string().min(1, 'يجب إدخال الاسم').max(100, 'يجب أن يكون الاسم أقل من 100 حرف'),

        owner_name: z.string().min(1, 'يجب إدخال اسم المالك').max(100, 'يجب أن يكون اسم المالك أقل من 100 حرف'),

        username: z.string().min(3, 'يجب أن يكون اسم المستخدم لا يقل عن 3 حروف').max(50, 'يجب أن يكون اسم المستخدم أقل من 50 حرف'),

        address: z.string().min(1, 'يجب إدخال العنوان').max(200, 'يجب أن يكون العنوان أقل من 200 حرف'),

        email: z.string().email('يجب إدخال البريد الإلكتروني بشكل صحيح').min(1, 'يجب إدخال البريد الإلكتروني'),



    })
 
interface ProfileFormData {
    name: string;
    owner_name: string;
    username: string;
    address: string;
    email: string;

    phone: string;
}
export default function ProfileForm() {
    const [phone, setPohone] = useState('');
    const { refetch, data, isSuccess, isError } = useGetProfileQuery();
    const [editProfile, { isLoading }] = useEditProfileMutation();


    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
    const navigate = useNavigate();

    const [resFormData, setresFormData] = useState<ProfileFormData>({
        name: '',
        owner_name: '',
        username: '',
        address: '',
        email: '',
        phone: '',
    });
    const [image, setImage] = useState<File | null>(null);
    const [cover_image, setCoverImage] = useState<File | null>(null);

    const [toastData, setToastData] = useState<any>({});
    const [cuurentData, setcuurentData] = useState({})
    
    const [errors, setErrors] = useState<any>({});
    // const [createProfile, { isLoading }] = useCreateProfileMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setresFormData({ ...resFormData, [name]: value });
    };


    //Password Functions

    useEffect(() => {
  
        setcuurentData(data?.response?.data)
        setresFormData({
            ...resFormData,
            name: data?.response?.data?.name,
            owner_name: data?.response?.data?.owner_name,
            username: data?.response?.data?.username,
            address: data?.response?.data?.address,
            phone: data?.response?.data?.phone,
            email: data?.response?.data?.email,
        });
    
}, [data])

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
    const [StartedDate, setStartedDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        
        const formattedDate = date?.toISOString().split('T')[0];
                    {/* @ts-ignore */}
        setStartedDate(formattedDate);
    };
    const [EndDate, setEndDate] = useState<Date | null>(new Date());

    const handleEndDateChange = (date: Date | null) => {
        const formattedDate = date?.toISOString().split('T')[0];
                            {/* @ts-ignore */}
        setEndDate(formattedDate);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        resFormData.phone = phone;
                            {/* @ts-ignore */}
                            resFormData.publish_start_date = StartedDate;
                            {/* @ts-ignore */}
                            resFormData.publish_end_date = EndDate;
        //resFormData
        const formData = new FormData();
        formData.append('name', resFormData.name);
        formData.append('owner_name', resFormData.owner_name);
        formData.append('username', resFormData.username);
        formData.append('email', resFormData.email);
        formData.append('address', resFormData.address);

        //@ts-ignore
        formData.append('phone', resFormData.phone);

        if (cover_image) {
            formData.append(`cover_image`, cover_image);
        }

        if (image) {
            formData.append(`image`, image);
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
            if (cuurentData) {
                const response = await editProfile({ formData });
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
            <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-col p-5 gap-[20px] pb-[30px]">
                    <div className="flex justify-center lg:flex-nowrap items-center bg-[#F5F5F5] flex-wrap md:w-[75%] mb-[30px] w-full  m-auto border-dashed border-2 rounded-3xl border-[#B7B7B7]">
                        {/* <div className="flex justify-around gap-5 bg-grey-500 "> */}
                        <div className="w-full p-4">
                            <Upload setFile={setImage}  editImgUrl={data?.response?.data?.image}/>
                        </div>
                        <div className="lg:border-s-2 lg:border-t-0 border-t-2 p-4 border-[#B7B7B7] border-solid  w-full">
                            <Upload_cover setFile={setCoverImage} editImgUrl={data?.response?.data?.cover_image} />
                        </div>
                    </div>
                    <div className="grid-cols-12 lg:p-5 p-2  grid gap-4   ">
                        <div className="lg:col-span-12 md:col-span-12 col-span-12">
                            <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-5">
                                <div className="flex flex-col gap-2">
                                    <InputComponent type="text" placeholder="Enter Name" value={resFormData?.name}  onChange={handleChange} name="name" label="Restaurant Name" />
                                    {errors?.name && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.name}</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                  <CustomDataInput label="Publication start date" value={StartedDate} onChange={handleDateChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                                  <CustomDataInput label="Publication End date" value={EndDate} onChange={handleEndDateChange} />
                    </div>
                                <div className="flex flex-col gap-2">
                                    <InputComponent type="text" placeholder="Enter Owner name" value={resFormData?.owner_name} onChange={handleChange} name="owner_name" label="Owner name" />
                                    {errors?.name && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.name}</p>}
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <div className="relative">
                                        <InputComponent value={resFormData.address} type="text" placeholder="El Mansoura -Egypt" onChange={handleChange} name="address" label="Location Address" />
                                    </div>
                                    <div>{errors?.address && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.address}</p>}</div>
                                </div>
                                
                 

                                <div className="flex flex-col gap-2">
                                    <InputComponent value={resFormData.username} type="text" placeholder="deli_2024" onChange={handleChange} name="username" label="User Name" />
                                    {errors?.username && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.username}</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <NubmerInput value={resFormData?.phone||phone} onChange={(phone) => setPohone(phone)} />
                                    {errors?.phone && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.phone}</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <InputComponent value={resFormData.email} type="email" placeholder="example@gmail.com" onChange={handleChange} name="email" label="Email" />
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
                    {isLoading ? (
                        <>
                            <LoadingButton />
                        </>
                    ) : (
                        <> 
                        
                            <button type="submit" className="btn rounded-full text-[18px] btn-primary shadow-md px-10 py-3  mt-6">
                               Edit Profile 
                            </button>
                        </>
                    )}
                </div>
            </form>
        </>
    );
}

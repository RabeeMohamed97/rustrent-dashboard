import React, { useEffect, useState } from 'react';
import InputComponent from '../../../components/reusableComponents/InputComponent';

import NubmerInput from '../../../components/reusableComponents/NubmerInput';


import { z } from 'zod';
import { toast } from 'react-toastify';
// import { useCreateResturantMutation } from '../../../api/Resturants/resturant';
import { useNavigate } from 'react-router-dom';

import { useCreateSocialMediaMutation, useEditSocialMutation, useGetSocilamediaQuery } from '../../../api/Resturants/Settings';
import LoadingButton from '../../../components/reusableComponents/Loading_button';
import { showAlert } from '../../../components/Error';

export const formSchema = z.object({
    phone: z.string().min(8, { message: "Phone number is required." }),
    whatsapp: z.string().min(10, { message: "WhatsApp number must be at least 10 characters long." }),
    facebook_link: z.string().url({ message: "Facebook link must be a valid URL." }),
    twitter_link: z.string().url({ message: "Twitter link must be a valid URL." }),
    tiktok_link: z.string().url({ message: "TikTok link must be a valid URL." }),
    instagram_link: z.string().url({ message: "Instagram link must be a valid URL." }),
    snapchat_link: z.string().url({ message: "Snapchat link must be a valid URL." })
  });
interface Social_MediaFormData {
    phone: string;
    whatsapp: string;
    facebook_link: string;
    twitter_link: string;
    tiktok_link: string;
    instagram_link: string ;
    snapchat_link: string ;
}
export default function Social_Media() {
    const [phone, setPohone] = useState('');
    const navigate = useNavigate();

 
    const [toastData, setToastData] = useState<any>({});

    const [errors, setErrors] = useState<any>({});

  
;

const [resFormData, setresFormData] = useState<Social_MediaFormData>({
    facebook_link: '',
    twitter_link: '',
    tiktok_link: '',
    instagram_link: '',
    snapchat_link: '',
    whatsapp: '',
    phone: '',
});
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setresFormData({ ...resFormData, [name]: value });
};

const [cuurentData, setcuurentData] = useState({})

const [createSocialMedia, { isLoading }] = useCreateSocialMediaMutation();
const {data,  isLoading:getSocilamediaLoading } = useGetSocilamediaQuery();

const [editSocial, { isLoading: editIsLoading }] = useEditSocialMutation();
 
useEffect(() => {
  
        setcuurentData(data?.response?.data)
        setresFormData({
            ...resFormData,
            facebook_link: data?.response?.data?.facebook_link,
            phone: data?.response?.data?.phone,
            whatsapp: data?.response?.data?.whatsapp,
            tiktok_link: data?.response?.data?.tiktok_link,
            twitter_link: data?.response?.data?.twitter_link,
            instagram_link: data?.response?.data?.instagram_link,
            snapchat_link: data?.response?.data?.snapchat_link,
        });
    
}, [data])








    useEffect(() => {
        if (toastData?.data?.status === 200) {
            showAlert('Added', toastData?.data?.response?.message);
            navigate('/profile')
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

        if (isLoading||editIsLoading) {
            toast.loading('Loading...', {
                toastId: 'loginLoadingToast',
                autoClose: false,
            });
        } else {
            toast.dismiss('loginLoadingToast');
        }
    }, [toastData, 
        isLoading,editIsLoading
    ]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
     
        resFormData.phone=phone
        console.log(resFormData);
      
        const result = formSchema.safeParse(resFormData);

        if (!result.success) {
            // @ts-ignore
            setErrors(result.error.formErrors.fieldErrors);
            console.log(result.error.formErrors.fieldErrors);
            return;
        }
        // console.log(data);
        try {
            if (data?.response?.data?.id) {
                const response = await editSocial({ id: data?.response?.data?.id, formData:resFormData });
                console.log(response);
                setToastData(response);
                setErrors({});
            } else {
                const response = await createSocialMedia(resFormData);
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
                 
                            <div className="grid-cols-12 lg:p-5 p-2  grid gap-4   ">
                                <div className="lg:col-span-12 md:col-span-12 col-span-12">
                                    <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-5">
                                    <div className="flex flex-col gap-2 p-0 justify-end">
                                            <NubmerInput value={resFormData?.phone||phone} onChange={(phone) => setPohone(phone)} />
                                            {errors?.phone && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.phone}</p>}
                                     
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <InputComponent value={resFormData?.whatsapp} type="text" placeholder="Whats app Number" onChange={handleChange} name="whatsapp" label="Whats app Number" />
                                            {errors?.whatsapp && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.whatsapp}</p>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <InputComponent value={resFormData?.facebook_link} type="text" placeholder="Enter Facebook Link" onChange={handleChange} name="facebook_link" label="Facebook Link" />
                                            {errors?.facebook_link && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.facebook_link}</p>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <InputComponent value={resFormData?.twitter_link} type="text" placeholder="Enter Twitter Link" onChange={handleChange} name="twitter_link" label="Twitter Link" />
                                            {errors?.twitter_link && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.twitter_link}</p>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <InputComponent value={resFormData?.tiktok_link} type="text" placeholder="Enter Tiktok Link" onChange={handleChange} name="tiktok_link" label="Tiktok Link" />
                                            {errors?.tiktok_link && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.tiktok_link}</p>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <InputComponent value={resFormData?.instagram_link} type="text" placeholder="Enter Instagram Link" onChange={handleChange} name="instagram_link" label="Instagram Link" />
                                            {errors?.instagram_link && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.instagram_link}</p>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <InputComponent value={resFormData?.snapchat_link} type="text" placeholder="Enter Snap chat Link" onChange={handleChange} name="snapchat_link" label="Snap chat Link" />
                                            {errors?.snapchat_link && <p className="text-[#FF0000] text-[14px] mx-2">{errors?.snapchat_link}</p>}
                                        </div>
                                   
                                       
                                        </div>
                                </div>
                            </div>
                          
                     
                    </div>
                <div className="flex capitalize justify-end">
                {isLoading||editIsLoading ? (
                        <>
                            <LoadingButton />
                        </>
                    ) : (
                        <> 
                               <button type="submit" className="btn rounded-full text-[18px] text-white bg-custom-gradient shadow-md px-10 py-3  mt-6">
                              {data?.response?.data!==undefined? 'Edit Social' :'Add Social' }
                            </button>
                        
                        </>
                    )}
               
                </div>
            </form>
        </>
    );
}

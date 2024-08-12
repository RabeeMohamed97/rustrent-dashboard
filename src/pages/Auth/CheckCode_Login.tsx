import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Artboard 2 2.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { z } from 'zod';
import { useAdminloginCodeMutation } from '../../api/Auth';
import { toast } from 'react-toastify';
interface signInfromData {
  code: string | null;
}

const initialFormData = {
  code:'',
};
const loginSchema = z.object({
  code: z.string().min(1, ' restaurant Code is required'),
});

export default function CheckCode_Login() {
  const navigate = useNavigate();
  const [AdminloginCode, { isLoading }] = useAdminloginCodeMutation();
  const [formData, setFormData] = useState<signInfromData>(initialFormData);
  const [toastData, setToastData] = useState<any>({});

  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
      const token = localStorage.getItem('deliProviderToken');
      if (token) {
          navigate('/Categories/List');
      }
  }, []);
  useEffect(() => {
      if (toastData.status === 200) {
          toast.success('تم تسجيل دخولك بنجاح', {});
          console.log();
          localStorage.setItem(
              'restaurantToken',
              // @ts-ignore
              JSON.stringify(toastData?.response.data.token)
          );
          setToastData({});
          navigate('/Login', { state: { restaurant_id: toastData?.response?.data?.restaurant_id } });
      }

      if (toastData?.status === 422) {
          toast.error(toastData?.response.data?.message, {});
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

  //   const goForgetPasswordPage = () => {
  //     props.openForgetPass();
  //     dispatch(modelActions.setIsLoginToFalse());
  //     dispatch(modelActions.setSignupTofalse());
  //   };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // navigate('/Restaurant/Add');

      const result = loginSchema.safeParse(formData);
      // // phoneSchema.safeParse(phone);

      if (!result.success) {
          // @ts-ignore
          setErrors(result.error.formErrors.fieldErrors);
          console.log(result.error.formErrors.fieldErrors);
          return;
      }

      try {
          const response = await AdminloginCode(formData).unwrap();
          console.log(response);
          setToastData(response);
          setErrors({});
      } catch (err) {
          setToastData(err);
          setErrors(err);
      }

      //@ts-ignore
      // if (+data?.error?.status === 410) {
      //   setIsVirefied(false);
      // }
      // @ts-ignore
      // if (data?.data?.status_code === 200) {
      //   dispatch(modelActions.closeAuthModel());
      // @ts-ignore
      // localStorage.getItem("celiacToken")! &&
      // dispatch(modelActions.SetToken(localStorage.getItem("celiacToken")));

      // setFormData(initialFormData);

      // dispatch(modelActions.closeAuthModel())
      // }

      // if (data?.error)
  };



  return (
    <div className="flex bg-[#373837]  relative  h-screen">
    <div className="absolute top-10 left-10 hidden md:block">
        <svg width="65" height="49" viewBox="0 0 65 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M39.6552 0.0680246C23.8665 -0.0350615 5.60582 6.92119 0.94427 18.1906C-1.03911 23.0604 -0.377295 31.8598 7.58714 34.8163C13.2919 36.9378 15.7949 30.1898 13.8816 29.7733C5.77695 28.1033 5.0471 23.7572 6.50886 20.6255C10.2653 12.4858 25.6045 7.23457 38.6119 6.81604C63.3073 5.98105 63.3753 21.2502 45.9517 31.266C33.3607 38.5707 14.1269 42.3952 4.04098 40.4489C1.2927 39.9273 1.2927 48.1 8.91077 48.1C21.5017 48.1 37.6409 44.1002 49.7081 37.3172C72.8365 24.2417 69.5667 0.27832 39.6552 0.0680246Z"
                fill="#F23F39"
            />
        </svg>
    </div>
    <div className="flex flex-col justify-between items-center  w-[80%] py-[100px]   md:w-[50%] lg:w-[25%] b m-auto">
        <div className="flex flex-col w-full justify-center items-center rounded-2xl   bg-[#555755] gap-[20px] p-[48px]">
            <div className="flex flex-col w-full justify-center items-center py-3 bg-[#555755]">
                <img src={Logo} className="w-[60%] pb-5" />
                <h2 className="font-bold text-white text-[24px]">Restaurant Login</h2>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[24px]">
       
                <div className="flex flex-col   ">
                    <input
                        placeholder="Enter Restaurant Code"
                        value={formData?.code || ''}
                        className="py-3 px-2 rounded-2xl   outline-none  border-[1px]  bg-[#3C3D41] text-white"
                        type="text" 
                        name="code"
                        onChange={handleChange}
                    />
                </div>

                {errors.code && (
                    <div className="bg-red-100 border mx-2 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{errors.code}</span>
                    </div>
                )}

            
                <div className="flex justify-between items-center  text-[#0A111A]">
                    <div
                        className="flex items-center align-middle justify-center  gap-2 cursor-pointer "
                        // id="Option1"
                        // dir="ltr"
                    >
                        {/* <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 " /> */}
                        {/* <label htmlFor="default-checkbox" className="m-0 text-[17px] font-semibold  text-[#B7B7B7] ">
                            Save me
                        </label> */}
                        {/* <input
                            type="checkbox"
                            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded "
                
                        />
                        <div className="font-bold text-[#B7B7B7]" id="Option1">
                            Save me
                        </div> */}
                    </div>
                    {/* <button type="button" className="text-[#F23F39] text-[16px]  underline" onClick={() => goForgetPasswordPage()}>
                        Forgot Your Password?
                    </button> */}
                </div>
                <button
                    // type="submit"
                    // onClick={() => navigate('/Restaurant/Add')}
                    className="bg-[#F23F39] w-full hover:bg-[#f23f39d3] text-gray-800 font-bold p-2 my-3  rounded-3xl flex items-center justify-between"
                >
                    <div className="w-full text-[24px] text-white flex justify-center">
                        <h2>Check Code </h2>
                    </div>
                    <div className="bg-white p-2 rounded-full">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.025 4.94167L17.0833 10L12.025 15.0583" stroke="#F23F39" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2.91666 10H16.9417" stroke="#F23F39" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </button>
            </form>
        </div>
    </div>
</div>  )
}

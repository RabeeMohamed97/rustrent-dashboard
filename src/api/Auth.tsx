import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL
const baseUrl = 'https://deliback.rowaduae.com/api/';

// Define the user API slice
const authApi = createApi({
    reducerPath: 'authApi',

    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            headers.set('Accept-Language', 'ar');
            return headers;
        },
    }),

    endpoints: (builder) => ({
        Adminlogin: builder.mutation<any, any>({
            query: (formData) => ({
                url: `restaurant/auth/login`,
                method: 'POST',
                body: formData,
            }),

            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
              
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
       
                return { status: meta?.response?.status, response };
            },
        }),
        AdminloginCode: builder.mutation<any, any>({
            query: (code) => ({
                url: `/admin/restaurant/code`,
                method: 'POST',
                body: code,
            }),

            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
              
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
       
                return { status: meta?.response?.status, response };
            },
        }),
        changePassword: builder.mutation<any, any>({
            query: (formData) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: '/restaurant/auth/change-password',
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        ForgetPassword: builder.mutation<any, any>({
            query: (formData) => ({
                url: `reset-password/email-validation`,
                method: 'POST',
                body: formData,
            }),
        }),

        verifyCode: builder.mutation<any, any>({
            query: (code) => ({
                url: 'reset-password/send-code',
                method: 'POST',
                body: code,
            }),
        }),

        ResetPassword: builder.mutation<any, any>({
            query: (formData) => ({
                url: `reset-password/change-password`,
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

// Export the generated hooks and the API slice
export const { useAdminloginMutation,useAdminloginCodeMutation, useForgetPasswordMutation, useResetPasswordMutation, useChangePasswordMutation, useVerifyCodeMutation } = authApi;
export default authApi;

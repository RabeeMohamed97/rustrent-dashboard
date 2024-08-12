import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL
const baseUrl = 'https://deliback.rowaduae.com/api/';

// Define the user API slice
const resApi = createApi({
    reducerPath: 'resApi',
    tagTypes: ['country', 'Categories'],

    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            // headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            // headers.set('Accept-Language', 'ar');
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
        getAllCategories: builder.query<any, { page: number }>({
            query: ({ page }) => {
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');
                return {
                    url: `/restaurant/store/category?page=${page}`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            providesTags: ['Categories'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        createResturant: builder.mutation<any, any>({
            query: (formData) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: 'admin/restaurant/create',
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
        deleteResturant: builder.mutation<any, any>({
            query: (id) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: `/admin/restaurant/delete/${id}`,
                    method: 'DELETE',

                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ['Categories'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        getAlltable: builder.query<any, { page: number }>({
            query: ({ page }) => {
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');
                return {
                    url: `/restaurant/store/table?page=${page}`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            providesTags: ['Categories'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),


        updateRestaurantStatus: builder.mutation<any, any>({
            query: ({ id, formData }) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: `/admin/restaurant/restaurant-status/${id}`,
                    method: 'POST',
                    body: formData,

                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ['Categories'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        updateRestaurantDelivery: builder.mutation<any, any>({
            query: ({ id, formData }) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: `/admin/restaurant/restaurant-delivery/${id}`,
                    method: 'POST',
                    body: formData,

                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ['Categories'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        updateCountryStatus: builder.mutation<any, any>({
            query: ({ id, formData }) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: `/admin/country-status/${id}`,
                    method: 'POST',
                    body: formData,

                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ['country'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        createCountry: builder.mutation<any, any>({
            query: (formData) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: 'admin/country',
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ['country'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);

                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        updateCountry: builder.mutation<any, any>({
            query: ({ id, formData }) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: `admin/country/${id}`,
                    method: 'PUT',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ['country'],
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
                const accessToken = JSON.parse(localStorage.getItem('deliToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: 'admin/auth/change-password',
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
        deleteCountry: builder.mutation<any, any>({
            query: (id) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: `/admin/country/${id}`,
                    method: 'DELETE',

                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ['country'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        getAllCoountries: builder.query<any, { page: number }>({
            query: ({ page }) => {
                const accessToken = JSON.parse(localStorage.getItem('deliToken') || '');
                return {
                    url: `/admin/country?page=${page}`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            providesTags: ['country'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        getCountry: builder.query<any, { id: string | undefined }>({
            query: ({ id }) => {
                const accessToken = JSON.parse(localStorage.getItem('deliToken') || '');
                return {
                    url: `/admin/country/${id}`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            providesTags: ['country'],
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
export const {
    useGetAllCategoriesQuery,
    useAdminloginMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
     useGetAlltableQuery,
    useForgetPasswordMutation,
    useCreateResturantMutation,
    useUpdateCountryStatusMutation,
    useUpdateRestaurantStatusMutation,
    useUpdateRestaurantDeliveryMutation,
    useUpdateCountryMutation,
    useVerifyCodeMutation,
    useCreateCountryMutation,
    useGetAllCoountriesQuery,
    useDeleteCountryMutation,
    useDeleteResturantMutation,
    useGetCountryQuery,
} = resApi;
export default resApi;

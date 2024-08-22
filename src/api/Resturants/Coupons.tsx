import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL
const baseUrl = 'https://deliback.rowaduae.com/api/';

// Define the user API slice
const couponsApi = createApi({
    reducerPath: 'couponsApi',
    tagTypes: ['coupons', 'Categories', 'sub_category'],

    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');

            // headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            headers.set('Authorization', `Bearer ${accessToken}`);
            // headers.set('Accept-Language', 'ar');
            return headers;
        },
    }),

    endpoints: (builder) => ({
        getCoupons: builder.query<any, any>({
            query: ({ page }) => {
                return {
                    url: `restaurant/store/coupon?${page}`,
                    method: 'GET',
                };
            },
            providesTags: ['coupons'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),

        createSocialMedia: builder.mutation<any, any>({
            query: (formData) => {
                return {
                    url: '/restaurant/socialMedia',
                    method: 'POST',
                    body: formData,
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
        editMeal: builder.mutation<any, any>({
            query: ({ id, formData }) => {
                return {
                    url: `restaurant/store/item/${id}`,
                    method: 'POST',
                    body: formData,
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
    }),
});

// Export the generated hooks and the API slice
export const { useGetCouponsQuery, useCreateSocialMediaMutation, useEditMealMutation } = couponsApi;
export default couponsApi;

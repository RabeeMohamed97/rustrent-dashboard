import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL
const baseUrl = 'https://deliback.rowaduae.com/api/';

// Define the user API slice
const AdvertisementsApi = createApi({
    reducerPath: 'AdvertisementsApi',
    tagTypes: ['Advertisements'],

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
        getAllAdvertisements: builder.query<any, { page: number }>({
            query: ({ page }) => {
                return {
                    url: `/restaurant/store/banner?page=${page}`,
                    method: 'GET',
                };
            },
            providesTags: ['Advertisements'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),

        createAdvertisements: builder.mutation<any, any>({
            query: (formData) => {
                return {
                    url: '/restaurant/store/banner',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Advertisements'],

            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);

                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        editAdvertisements: builder.mutation<any, any>({
            query: ({ id, formData }) => {
                return {
                    url: `/restaurant/store/banner/${id}`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Advertisements'],

            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);

                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),

       
        deleteAdvertisements: builder.mutation<any, any>({
            query: (id) => {
                // Get the access token from the parsed auth_data

                return {
                    url: `/restaurant/store/banner/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Advertisements'],
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
export const {
    useGetAllAdvertisementsQuery,
    useCreateAdvertisementsMutation,
useEditAdvertisementsMutation,
    useDeleteAdvertisementsMutation,
} = AdvertisementsApi;
export default AdvertisementsApi;

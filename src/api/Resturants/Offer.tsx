import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL
const baseUrl = 'https://deliback.rowaduae.com/api/';

// Define the user API slice
const offerApi = createApi({
    reducerPath: 'offerApi',
    tagTypes: ["offer"],

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
        getAlloffer: builder.query<any, { page: number }>({
            query: ({ page }) => {
                return {
                    url: `restaurant/store/offer?page=${page}`,
                    method: 'GET',
                };
            },
            providesTags: ["offer"],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),

        createoffer: builder.mutation<any, any>({
            query: (formData) => {
                return {
                    url: 'restaurant/store/offer',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['offer'],

            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);

                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        editoffer: builder.mutation<any, any>({
            query: ({ id, formData }) => {
                return {
                    url: `restaurant/store/offer/${id}`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['offer'],

            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);

                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        deleteoffer: builder.mutation<any, any>({
            query: (id) => {
                // Get the access token from the parsed auth_data

                return {
                    url: `restaurant/store/offer/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['offer'],
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
    useGetAllofferQuery,
    useCreateofferMutation,
    useEditofferMutation,
    useDeleteofferMutation,
} = offerApi;
export default offerApi;

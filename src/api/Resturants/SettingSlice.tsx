import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL
const baseUrl = 'https://deliback.rowaduae.com/api/';

// Define the user API slice
const settingApi = createApi({
    reducerPath: 'settingApi',
    tagTypes: ['contactUs'],

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
        getAllContacts: builder.query<any, { page: number }>({
            query: ({ page }) => {
                return {
                    // url: `restaurant/contactUs`,
                    url: `restaurant/contactUs?page=${page}`,
                    method: 'GET',
                };
            },
            providesTags: ['contactUs'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        getSingleContact: builder.query<any, { id: number | null | undefined }>({
            query: ({ id }) => {
                return {
                    // url: `restaurant/contactUs`,
                    url: `restaurant/contactUs/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['contactUs'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        deleteContact: builder.mutation<any, any>({
            query: (id) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: `/restaurant/contactUs/${id}`,
                    method: 'DELETE',

                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ['contactUs'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        sendRespnse: builder.mutation<any, any>({
            query: ({ id, formData }) => {
                return {
                    url: `restaurant/contactUs/${id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: ['contactUs'],

            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);

                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        generalSettings: builder.mutation<any, any>({
            query: ({ formData }) => {
                return {
                    url: `restaurant/auth/settings`,
                    method: 'Post',
                    body: formData,
                };
            },
            // invalidatesTags: ['contactUs'],

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
export const { useGetAllContactsQuery, useSendRespnseMutation, useGetSingleContactQuery, useGeneralSettingsMutation,    useDeleteContactMutation} = settingApi;
export default settingApi;

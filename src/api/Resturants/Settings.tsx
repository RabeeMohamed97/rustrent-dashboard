import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL
const baseUrl = 'https://deliback.rowaduae.com/api/';

// Define the user API slice
const settingsApi = createApi({
    reducerPath: 'settingsApi',
    tagTypes: ['social', 'Categories', 'sub_category'],

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
        getSocilamedia: builder.query<any, void>({
            query: () => {
                return {
                    url: `/restaurant/socialMedia`,
                    method: 'GET',
                };
            },
            providesTags: ['social'],
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
            invalidatesTags: ['social'],

            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);

                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        editSocial: builder.mutation<any, any>({
            query: ({ id, formData }) => {
                return {
                    url: `/restaurant/socialMedia/${id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: ['social'],

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
    useGetSocilamediaQuery,
    useCreateSocialMediaMutation,
    useEditSocialMutation,
} = settingsApi;
export default settingsApi;

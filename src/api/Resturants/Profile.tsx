import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL
const baseUrl = 'https://deliback.rowaduae.com/api/';

// Define the user API slice
const ProfileApi = createApi({
    reducerPath: 'ProfileApi',
    tagTypes: ['Profile'],

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
        getProfile: builder.query<any, void>({
            query: () => {
                return {
                    url: `/restaurant/restaurantProfile`,
                    method: 'GET',
                };
            },
            providesTags: ['Profile'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),


        editProfile: builder.mutation<any, any>({
            query: ({ formData }) => {
                return {
                    url: `/restaurant/updateRestaurantProfile`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Profile'],

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
    useGetProfileQuery,
    useEditProfileMutation,
} = ProfileApi;
export default ProfileApi;

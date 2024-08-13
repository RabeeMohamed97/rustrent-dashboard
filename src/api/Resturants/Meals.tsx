import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL
const baseUrl = 'https://deliback.rowaduae.com/api/';

// Define the user API slice
const mealsApi = createApi({
    reducerPath: 'mealsApi',
    tagTypes: ['meals', 'Categories', 'sub_category'],

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
        getAllMeals: builder.query<any, { page: number }>({
            query: ({ page }) => {
                return {
                    url: `restaurant/store/item?page=${page}`,
                    method: 'GET',
                };
            },
            providesTags: ['meals'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        createMeal: builder.mutation<any, any>({
            query: (formData) => {
                return {
                    url: 'restaurant/store/item',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['meals'],

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
        deleteMeal: builder.mutation<any, any>({
            query: (id) => {
                // Get the access token from the parsed auth_data

                return {
                    url: `restaurant/store/item/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['meals'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        deletetable: builder.mutation<any, any>({
            query: (id) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: `/restaurant/store/table/${id}`,
                    method: 'DELETE',

                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ['Categories', 'sub_category'],
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
            invalidatesTags: ['meals'],
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
            invalidatesTags: ['meals'],
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
            invalidatesTags: ['meals'],
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
            invalidatesTags: ['meals'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        getAllSubCategories: builder.query<any, { page: number }>({
            query: ({ page }) => {
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');
                return {
                    url: `/restaurant/store/subCategories?page=${page}`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            providesTags: ['sub_category'],
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
    useGetAllMealsQuery,
    useCreateMealMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useGetAllSubCategoriesQuery,

    useGetAlltableQuery,
    useForgetPasswordMutation,
    useCreateResturantMutation,
    useUpdateCountryStatusMutation,
    useUpdateRestaurantStatusMutation,
    useUpdateRestaurantDeliveryMutation,
    useUpdateCountryMutation,
    useVerifyCodeMutation,
    useCreateCountryMutation,
    useDeleteCountryMutation,
    useDeleteMealMutation,
    useDeletetableMutation,
} = mealsApi;
export default mealsApi;

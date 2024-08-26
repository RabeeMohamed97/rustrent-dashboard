import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL
const baseUrl = 'https://deliback.rowaduae.com/api/';

// Define the user API slice
const mealsApi = createApi({
    reducerPath: 'mealsApi',
    tagTypes: ['meals'],

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
        editMeal: builder.mutation<any, any>({
            query: ({ id, formData }) => {
                return {
                    url: `restaurant/store/item/${id}`,
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
       
      
    }),
});

// Export the generated hooks and the API slice
export const {
    useGetAllMealsQuery,
    useCreateMealMutation,
    useEditMealMutation,
    useDeleteMealMutation,
} = mealsApi;
export default mealsApi;

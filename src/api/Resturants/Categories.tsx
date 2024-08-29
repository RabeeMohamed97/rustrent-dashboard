import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL
const baseUrl = 'https://deliback.rowaduae.com/api/';

// Define the user API slice
const CategoriesApi = createApi({
    reducerPath: 'CategoriesApi',
    tagTypes: ['Categories', 'sub_category'],

    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');
            // headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            headers.set('Authorization', `Bearer ${accessToken}`);
            return headers;
        },
    }),

    endpoints: (builder) => ({
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
        getAllCategoriesWithoutPagination: builder.query<any, void>({
            query: () => {
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');
                return {
                    url: `/restaurant/store/listOfcategories?type=mainCategory`,
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
        getCategoriesWithoutPagination: builder.query<any, void>({
            query: () => {
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');
                return {
                    url: `/restaurant/store/listOfcategories?type=mainCategory`,
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
        getAllSubCategoriesByMain: builder.query<any, void>({
            query: () => {
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');
                return {
                    url: `/restaurant/store/category/subCategories/59`,
                    method: 'GET',
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
        getAllSubCategoriesWithoutPagination: builder.query<any, void>({
            query: () => {
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');
                return {
                    url: `/restaurant/store/listOfcategories`,
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

        // getAllCityWithoutPagination: builder.query<any, void>({
        //     query: () => {
        //         const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');
        //         return {
        //             url: `restaurant/store/city/`,
        //             method: 'GET',
        //             headers: {
        //                 Authorization: `Bearer ${accessToken}`,
        //             },
        //         };
        //     },
        //     providesTags: ['Categories'],
        //     transformResponse: (response, meta) => {
        //         console.log(meta?.response?.status);
        //         return { status: meta?.response?.status, response };
        //     },
        //     transformErrorResponse: (response, meta) => {
        //         return { status: meta?.response?.status, response };
        //     },
        // }),
        createCategory: builder.mutation<any, any>({
            query: (formData) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: '/restaurant/store/category',
                    method: 'POST',
                    body: formData,
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
        editCategory: builder.mutation<any, any>({
            query: ({ id, formData }) => {
                return {
                    url: `restaurant/store/category/${id}`,
                    method: 'POST',
                    body: formData,
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

        deleteCategory: builder.mutation<any, any>({
            query: (id) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: `/restaurant/store/category/${id}`,
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
        getAnySelectOptions: builder.query<any, { type: string }>({
            query: ({ type }) => {
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');
                return {
                    url: `restaurant/list/${type}`,
                    method: 'GET',
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
    }),
});

// Export the generated hooks and the API slice
export const {
    useGetAllCategoriesQuery,
    useGetAllCategoriesWithoutPaginationQuery,

    useGetAllSubCategoriesQuery,
    useGetAllSubCategoriesWithoutPaginationQuery,
    useGetAnySelectOptionsQuery,
    useEditCategoryMutation,

    useCreateCategoryMutation,

    useDeleteCategoryMutation,
    useGetAllSubCategoriesByMainQuery,
} = CategoriesApi;
export default CategoriesApi;

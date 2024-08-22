import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL
const baseUrl = 'https://deliback.rowaduae.com/api/';

// Define the user API slice
const CountryApi = createApi({
    reducerPath: 'CountryApi',
    tagTypes: ['country', 'city', 'region'],

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

        editCity: builder.mutation<any, any>({
            query: ({ id, formData }) => {
                return {
                    url:`/restaurant/store/city/${id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: ['city'],

            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);

                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        createCity: builder.mutation<any, any>({
            query: (formData) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: '/restaurant/store/city',
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ['city'],

            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);

                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        editRegion: builder.mutation<any, any>({
            query: ({ id, formData }) => {
                return {
                    url: `restaurant/store/region/${id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: ['region'],

            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);

                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        createRegion: builder.mutation<any, any>({
            query: (formData) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: '/restaurant/store/region',
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ['region'],

            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);

                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        deleteCity: builder.mutation<any, any>({
            query: (id) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: `/restaurant/store/city/${id}`,
                    method: 'DELETE',

                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ['city'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        deleteRegion: builder.mutation<any, any>({
            query: (id) => {
                // Retrieve auth_data from localStorage and parse it
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');

                // Get the access token from the parsed auth_data

                return {
                    url: `/restaurant/store/region/${id}`,
                    method: 'DELETE',

                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            invalidatesTags: ['region'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        getAllcity: builder.query<any, { page: number }>({
            query: ({ page }) => {
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');
                return {
                    url: `restaurant/store/city?page=${page}`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            providesTags: ['city'],
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return { status: meta?.response?.status, response };
            },
            transformErrorResponse: (response, meta) => {
                return { status: meta?.response?.status, response };
            },
        }),
        getAllregion: builder.query<any, { page: number }>({
            query: ({ page }) => {
                const accessToken = JSON.parse(localStorage.getItem('deliProviderToken') || '');
                return {
                    url: `restaurant/store/region?page=${page}`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            providesTags: ['region'],
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
    
    }),
});

// Export the generated hooks and the API slice
export const {
    useGetAllcityQuery,
    useGetAllregionQuery,
    useDeleteCityMutation,
    useDeleteRegionMutation,
    useGetAnySelectOptionsQuery,
    useEditRegionMutation,
    useUpdateCountryStatusMutation,
    useEditCityMutation,
    useUpdateCountryMutation,
    useCreateCountryMutation,
    useDeleteCountryMutation,
    useGetCountryQuery,
    useCreateCityMutation,
    useCreateRegionMutation,
} = CountryApi;
export default CountryApi;

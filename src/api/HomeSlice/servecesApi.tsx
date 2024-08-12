import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://rowad.rowaduae.com/api/v1/';

const servecesApi = createApi({
    reducerPath: 'servecesApi',
    tagTypes: ['service', 'banners', 'sub-service', 'offers'],

    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
            headers.set('Lang', 'ar');
            // headers.set('Authorization', `Bearer ${localStorage.getItem('admintoken')!}`);
            return headers;
        },
    }),

    endpoints: (builder) => ({
        getNews: builder.query<any, void>({
            query: () => 'posts',
            providesTags: ['service'],
        }),

        getServices: builder.query<any, void>({
            query: () => ({
                url: `all-services`,
                method: 'GET',
                headers: {
                    // Lang: `${lang}`,
                },
            }),
            providesTags: ['service'],
        }),
        addService: builder.mutation<any, any>({
            query: (formData) => ({
                url: `service`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['service'],
        }),
        updateService: builder.mutation<any, any>({
            query: (formData) => ({
                url: `update-service`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['service'],
        }),
        deleteService: builder.mutation({
            query: (userId) => ({
                url: `service/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['service'],
        }),
        getSubServices: builder.query<any, any>({
            query: (id) => ({
                url: `all-sub-services/${id}`,
                method: 'GET',
                headers: {
                    // Lang: `${lang}`,
                },
            }),
            providesTags: ['sub-service'],
        }),
        addSubService: builder.mutation<any, any>({
            query: (formData) => ({
                url: `sub-service`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['sub-service'],
        }),
        updateSubService: builder.mutation<any, any>({
            query: (formData) => ({
                url: `update-sub-service`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['sub-service'],
        }),
        deleteSubService: builder.mutation({
            query: (userId) => ({
                url: `sub-service/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['sub-service'],
        }),

        // offers

        getServiceOffers: builder.query<any, any>({
            query: (id) => ({
                url: `all-services-offers/${id}`,
                method: 'GET',
                headers: {
                    // Lang: `${lang}`,
                },
            }),
            providesTags: ['offers'],
        }),

        updateServiceOffers: builder.mutation<any, any>({
            query: ({ id, formData }) => ({
                url: `service-offer/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['offers'],
        }),
        addServiceOffer: builder.mutation<any, any>({
            query: (formData) => ({
                url: `service-offer`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['offers'],
        }),
        deleteServiceOffer: builder.mutation({
            query: (userId) => ({
                url: `service-offer/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['sub-service'],
        }),
        GetBanners: builder.query<any, void>({
            query: () => 'banners',
            providesTags: ['banners'],
        }),
        AddNewBanner: builder.mutation<any, any>({
            query: (formData) => ({
                url: `banners`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['banners'],
        }),
        DeleteBanner: builder.mutation({
            query: (userId) => ({
                url: `banners/${userId}`,
                method: 'DELETE',
            }),
        }),
        EditBanner: builder.mutation<any, { Id: number; formData: any }>({
            query: ({ Id, formData }) => ({
                url: `banners/${Id}`,
                method: 'POST',
                body: formData,
                params: {
                    _method: 'PUT',
                },
            }),
            invalidatesTags: ['banners'],
        }),
        ChangeBannerStatus: builder.mutation({
            query: ({ userId }) => ({
                url: `banners/change-activation/${userId}`,
                method: 'POST',
            }),
            invalidatesTags: ['banners'],
        }),
    }),
});

export const {
    useGetNewsQuery,
    useGetServicesQuery,
    useAddServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
    useAddSubServiceMutation,
    useUpdateSubServiceMutation,
    useDeleteSubServiceMutation,
    useGetServiceOffersQuery,
    useUpdateServiceOffersMutation,
    useAddServiceOfferMutation,
    useDeleteServiceOfferMutation,
    useGetBannersQuery,
    useAddNewBannerMutation,
    useDeleteBannerMutation,
    useChangeBannerStatusMutation,
    useEditBannerMutation,
    useGetSubServicesQuery,
} = servecesApi;
export default servecesApi;

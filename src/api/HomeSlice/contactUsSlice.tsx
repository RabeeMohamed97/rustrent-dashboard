import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://rowad.rowaduae.com/api/v1/';

const contactUsApi = createApi({
    reducerPath: 'contactUsApi',
    tagTypes: ['questions'],
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
        getAllFaqs: builder.query<any, void>({
            query: () => ({
                url: `all-questions`,
                method: 'GET',
                headers: {
                    // Lang: `${lang}`,
                },
            }),
            providesTags: ['questions'],
        }),
        getAllContactsList: builder.query<any, void>({
            query: () => ({
                url: `contact-list`,
                method: 'GET',
                headers: {
                    // Lang: `${lang}`,
                },
            }),
        }),
        deleteContant: builder.mutation({
            query: (userId) => ({
                url: `delete-contact/${userId}`,
                method: 'DELETE',
            }),
        }),
        addQuestion: builder.mutation<any, any>({
            query: (formData) => ({
                url: `question`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['questions'],
        }),
        updateQuestion: builder.mutation<any, any>({
            query: ({ id, formData }) => ({
                url: `question/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['questions'],
        }),
        deleteQuestion: builder.mutation({
            query: (userId) => ({
                url: `question/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['questions'],
        }),
    }),
});

export const { useGetAllFaqsQuery, useAddQuestionMutation, useDeleteContantMutation, useUpdateQuestionMutation, useDeleteQuestionMutation, useGetAllContactsListQuery } = contactUsApi;
export default contactUsApi;

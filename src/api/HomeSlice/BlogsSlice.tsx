import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://rowad.rowaduae.com/api/v1/';

const blogsApi = createApi({
    reducerPath: 'blogsApi',

    tagTypes: ['blog'],
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
        getAllBlogs: builder.query<any, void>({
            query: () => ({
                url: `all-blogs`,
                method: 'GET',
            }),

            providesTags: ['blog'],
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
        addBlog: builder.mutation<any, any>({
            query: (formData) => ({
                url: `blog`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['blog'],
        }),
        updateBlogs: builder.mutation<any, any>({
            query: (formData) => ({
                url: `update-blog`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['blog'],
        }),
        deleteBlog: builder.mutation({
            query: (userId) => ({
                url: `blog/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['blog'],
        }),
    }),
});

export const { useGetAllBlogsQuery, useAddBlogMutation, useDeleteBlogMutation, useUpdateBlogsMutation, useGetAllContactsListQuery } = blogsApi;
export default blogsApi;

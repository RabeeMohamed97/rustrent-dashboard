import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://rowad.rowaduae.com/api/v1/';

const galleryApi = createApi({
    reducerPath: 'galleryApi',
    tagTypes: ['tools', 'gallery'],
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            // headers.set('Accept', 'application/json');
            headers.set('Lang', 'ar');
            // headers.set('Authorization', `Bearer ${localStorage.getItem('admintoken')!}`);
            return headers;
        },
    }),

    endpoints: (builder) => ({
        getAllTools: builder.query<any, void>({
            query: () => ({
                url: `tool`,
                method: 'GET',
            }),
            providesTags: ['tools'],
        }),
        addTool: builder.mutation<any, any>({
            query: (formData) => ({
                url: `tool`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['tools'],
        }),

        deleteTool: builder.mutation({
            query: (userId) => ({
                url: `tool/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['tools'],
        }),
        getAllProjects: builder.query<any, void>({
            query: () => ({
                url: `projects`,
                method: 'GET',
            }),
            providesTags: ['tools'],
        }),
        addNewProject: builder.mutation<any, any>({
            query: (formData) => ({
                url: `project`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['gallery'],
        }),
        updateBlogs: builder.mutation<any, any>({
            query: (formData) => ({
                url: `update-blog`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['tools'],
        }),
        deleteBlog: builder.mutation({
            query: (userId) => ({
                url: `blog/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['tools'],
        }),
    }),
});

export const { useGetAllToolsQuery, useGetAllProjectsQuery, useAddToolMutation, useDeleteToolMutation, useUpdateBlogsMutation, useAddNewProjectMutation } = galleryApi;
export default galleryApi;

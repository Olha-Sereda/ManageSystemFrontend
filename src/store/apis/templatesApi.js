import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const templatesApi = createApi({
  reducerPath: 'templates',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  tagTypes: ['Template'],
  endpoints(builder) {
    return {
      fetchTemplates: builder.query({
        query: () => {
          return {
            url: `/templates/`,
            method: 'GET',
          };
        },
        providesTags: (result, error, id) => {
          return result ? [{ type: 'Template', id }] : [];
        },
      }),
      addTemplate: builder.mutation({
        query: ({ templateId, template_name }) => {
          return {
            url: `/template/`,
            params: { id: templateId },
            method: 'POST',
            body: {
              template_name: template_name,
            },
          };
        },
        invalidatesTags: (result, error, { templateId }) => {
          console.log('result', result);
          return [{ type: 'Template', id: templateId }];
        },
      }),
      removeTemplate: builder.mutation({
        invalidatesTags: (result, error, template) => {
          return [{ type: 'Template', id: template.id }];
        },
        query: ({ templateId }) => {
          return {
            url: `/template/${templateId}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const { useFetchTemplatesQuery, useAddTemplateMutation, useRemoveTemplateMutation } = templatesApi;
export { templatesApi };

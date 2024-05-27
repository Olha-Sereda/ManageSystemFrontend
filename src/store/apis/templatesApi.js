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
        query: ({ template_name, test_code, expected_answer }) => {
          return {
            url: `/template/`,
            method: 'POST',
            body: {
              template_name: template_name,
              test_code: test_code,
              expected_answer: expected_answer,
            },
          };
        },
        invalidatesTags: () => {
          return [{ type: 'Template' }];
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

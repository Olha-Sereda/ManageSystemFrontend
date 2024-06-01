import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const testsApi = createApi({
  reducerPath: 'tests',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  tagTypes: ['Test'],
  endpoints(builder) {
    return {
      fetchTests: builder.query({
        query: () => {
          return {
            url: `/tests`,
            method: 'GET',
          };
        },
        providesTags: (result, error, id) => {
          return result ? [{ type: 'Test', id }] : [];
        },
      }),
      addTest: builder.mutation({
        query: ({ test_name, test_code, expected_answer }) => {
          return {
            url: `/test`,
            method: 'POST',
            body: {
              test_name: test_name,
              test_code: test_code,
              expected_answer: expected_answer,
            },
          };
        },
        invalidatesTags: () => {
          return [{ type: 'Test' }];
        },
      }),
      removeTest: builder.mutation({
        invalidatesTags: (result, error, test) => {
          return [{ type: 'Test', id: test.id }];
        },
        query: ({ testId }) => {
          return {
            url: `/test/${testId}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const { useFetchTestsQuery, useAddTestMutation, useRemoveTestMutation } = testsApi;
export { testsApi };

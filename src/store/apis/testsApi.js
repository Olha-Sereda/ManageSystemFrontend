import { api } from './api';

const testsApi = api.injectEndpoints({
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

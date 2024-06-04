import { api } from './api';

const resultLogApi = api.injectEndpoints({
  tagTypes: ['TestResultLog'],
  endpoints(builder) {
    return {
      fetchServiceLogs: builder.query({
        query: (serviceId) => {
          return {
            url: `/service/${serviceId}/resultlog`,
            method: 'GET',
          };
        },
        providesTags: (result, error, serviceId) => {
          return result ? [{ type: 'TestResultLog', id: serviceId }] : [];
        },
      }),
      fetchTestLogs: builder.query({
        query: (testId) => {
          return {
            url: `/test/${testId}/resultlog`,
            method: 'GET',
          };
        },
        providesTags: (result, error, testId) => {
          return result ? [{ type: 'TestResultLog', id: testId }] : [];
        },
      }),
    };
  },
});

export const { useFetchServiceLogsQuery, useFetchTestLogsQuery } = resultLogApi;
export { resultLogApi };

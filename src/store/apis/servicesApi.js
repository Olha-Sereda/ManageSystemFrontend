import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const servicesApi = createApi({
  reducerPath: 'services',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  tagTypes: ['Service'],
  endpoints(builder) {
    return {
      fetchServices: builder.query({
        query: (id) => {
          return {
            url: `/server/${id}`,
            method: 'GET',
          };
        },
        providesTags: (result, error, id) => {
          return result ? [{ type: 'Service', id }] : [];
        },
      }),
      addService: builder.mutation({
        query: ({ serverId, service_name }) => {
          return {
            url: `/server/`,
            params: { id: serverId },
            method: 'POST',
            body: {
              service_name: service_name,
            },
          };
        },
        invalidatesTags: (result, error, { serverId }) => {
          return [{ type: 'Service', id: serverId }];
        },
      }),
      removeService: builder.mutation({
        invalidatesTags: (result, error, service) => {
          return [{ type: 'Service', id: service.id }];
        },
        query: ({ serviceId }) => {
          return {
            url: `/service/${serviceId}`,
            method: 'DELETE',
          };
        },
      }),
      startService: builder.mutation({
        query: (serviceId) => {
          return {
            url: `/service/${serviceId}/start`,
            method: 'GET',
          };
        },
        invalidatesTags: (result, error, serviceId) => {
          return [{ type: 'Service', id: serviceId }];
        },
      }),
      stopService: builder.mutation({
        query: (serviceId) => {
          return {
            url: `/service/${serviceId}/stop`,
            method: 'GET',
          };
        },
        invalidatesTags: (result, error, serviceId) => {
          return [{ type: 'Service', id: serviceId }];
        },
      }),
    };
  },
});

export const {
  useFetchServicesQuery,
  useAddServiceMutation,
  useRemoveServiceMutation,
  useStartServiceMutation,
  useStopServiceMutation,
} = servicesApi;
export { servicesApi };

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const servicesApi = createApi({
    reducerPath: 'services',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api', }),
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
            query: ({serverId, service_name}) => {
              return {
                url: `/server/`,  
                params: { id: serverId},
                method: 'POST',
                body: {
                  service_name: service_name,
                },
              };
            },
          }),
          removeService: builder.mutation({
            invalidatesTags: (result, error, service) => {
              return [{ type: 'Service', id: service.id }];
            },
            query: ({serviceId}) => {
              return {
                url: `/service/${serviceId}`,
                method: 'DELETE',
              };
            },
          }),
      };
    },
});


export const {
    useFetchServicesQuery,
    useAddServiceMutation,
    useRemoveServiceMutation,
  } = servicesApi;
export { servicesApi };
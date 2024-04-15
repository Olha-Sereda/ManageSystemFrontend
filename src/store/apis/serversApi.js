import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const serversApi = createApi({
    reducerPath: 'servers',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api', }),
    endpoints(builder) {  
     return {
        fetchServers: builder.query({
            query: () => {
                return {
                    url: '/servers',
                    method: 'GET',
                };
            }
        }),
        // addAlbum: builder.mutation({
        //     invalidatesTags: (result, error, user) => {
        //       return [{ type: 'UsersAlbums', id: user.id }];
        //     },
        //     query: (user) => {
        //       return {
        //         url: '/albums',
        //         method: 'POST',
        //         body: {
        //           userId: user.id,
        //           title: faker.commerce.productName(),
        //         },
        //       };
        //     },
        //   }),
      };
    },
});


export const {
    useFetchServersQuery,
    //useAddAlbumMutation,
    //useRemoveAlbumMutation,
  } = serversApi;
export { serversApi };
import { api } from './api';

const serversApi = api.injectEndpoints({
  endpoints(builder) {
    return {
      fetchServers: builder.query({
        query: () => {
          return {
            url: '/servers',
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const { useFetchServersQuery } = serversApi;
export { serversApi };

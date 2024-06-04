import { api } from './api';

const authApi = api.injectEndpoints({
  endpoints(builder) {
    return {
      login: builder.mutation({
        query: ({ email, password }) => {
          return {
            url: '/login_check',
            method: 'POST',
            body: {
              email: email,
              password: password,
            },
          };
        },
      }),
    };
  },
});

export const { useLoginMutation } = authApi;
export { authApi };

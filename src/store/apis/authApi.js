import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api', }),
    endpoints(builder) {  
     return {
       
        login: builder.mutation({
            query: ({email, password}) => {
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


export const {
    useLoginMutation,
  } = authApi;
export { authApi };
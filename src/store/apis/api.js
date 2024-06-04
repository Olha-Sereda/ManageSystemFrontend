import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setSession } from '../reducers/sessionSlice';
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(api.endpoints);
  if (result?.error?.status === 401) {
    // handle 401 error
    api.dispatch(setSession(false));
    localStorage.removeItem('token');
    console.log('401 error: ', result);
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryFn,
  endpoints: () => ({}),
});

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { serversApi } from './apis/serversApi';
import { servicesApi } from './apis/servicesApi';
import { authApi } from './apis/authApi';
import { templatesApi } from './apis/templatesApi';
import { usersApi } from './apis/usersApi';

export const store = configureStore({
  reducer: {
    [serversApi.reducerPath]: serversApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [templatesApi.reducerPath]: templatesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(serversApi.middleware)
      .concat(servicesApi.middleware)
      .concat(authApi.middleware)
      .concat(templatesApi.middleware)
      .concat(usersApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useFetchServersQuery } from './apis/serversApi';
export { useFetchTemplatesQuery, useAddTemplateMutation, useRemoveTemplateMutation } from './apis/templatesApi';
export { useFetchServicesQuery, useAddServiceMutation, useRemoveServiceMutation } from './apis/servicesApi';

export { useLoginMutation } from './apis/authApi';

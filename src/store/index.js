import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './apis/api';
import sessionSlice from './reducers/sessionSlice';

export const store = configureStore({
  reducer: {
    [sessionSlice.name]: sessionSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

setupListeners(store.dispatch);

export { useFetchServersQuery } from './apis/serversApi';
export { useFetchTemplatesQuery, useAddTemplateMutation, useRemoveTemplateMutation } from './apis/templatesApi';
export { useFetchServicesQuery, useAddServiceMutation, useRemoveServiceMutation } from './apis/servicesApi';

export { useLoginMutation } from './apis/authApi';

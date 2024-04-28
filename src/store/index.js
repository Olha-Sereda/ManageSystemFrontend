import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { serversApi } from './apis/serversApi';
import { servicesApi } from './apis/servicesApi';
import { authApi } from './apis/authApi';

export const store = configureStore({
  reducer: {
    [serversApi.reducerPath]: serversApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(serversApi.middleware)
      .concat(servicesApi.middleware)
      .concat(authApi.middleware);

  },
});

setupListeners(store.dispatch);

export {
  useFetchServersQuery,
  //useAddAlbumMutation,
  
} from './apis/serversApi';

export {
      useFetchServicesQuery,
      useAddServiceMutation,
      useRemoveServiceMutation,
  } from './apis/servicesApi';

export {
  useLoginMutation,
} from './apis/authApi';
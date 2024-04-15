import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { serversApi } from './apis/serversApi';
import { servicesApi } from './apis/servicesApi';

export const store = configureStore({
  reducer: {
    [serversApi.reducerPath]: serversApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(serversApi.middleware)
        .concat(servicesApi.middleware);
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
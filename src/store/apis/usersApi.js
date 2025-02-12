import { api } from './api';

const usersApi = api.injectEndpoints({
  tagTypes: ['User'],
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        query: () => {
          return {
            url: `/users`,
            method: 'GET',
          };
        },
        providesTags: (result, error, id) => {
          return result ? [{ type: 'User', id }] : [];
        },
      }),
      addUser: builder.mutation({
        query: ({ user_name, user_surname, email, password }) => {
          return {
            url: `/users`,
            method: 'POST',
            body: {
              user_name: user_name,
              user_surname: user_surname,
              email: email,
              password: password,
            },
          };
        },
        invalidatesTags: () => {
          return [{ type: 'User' }];
        },
      }),
      removeUser: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'User', id: user.id }];
        },
        query: ({ userId }) => {
          return {
            url: `/users/${userId}`,
            method: 'DELETE',
          };
        },
      }),
      editUser: builder.mutation({
        query: ({ id, roles, user_name, user_surname, email, password }) => {
          return {
            url: `/users/${id}`,
            method: 'PATCH',
            body: {
              roles: roles,
              user_name: user_name,
              user_surname: user_surname,
              email: email,
              password: password,
            },
          };
        },
        invalidatesTags: (result, error, { userId }) => {
          return [{ type: 'User', id: userId }];
        },
      }),
      getCurrentUserRole: builder.query({
        query: () => {
          return {
            url: `/current_user_role`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useAddUserMutation,
  useRemoveUserMutation,
  useFetchUsersQuery,
  useEditUserMutation,
  useLazyGetCurrentUserRoleQuery,
} = usersApi;
export { usersApi };

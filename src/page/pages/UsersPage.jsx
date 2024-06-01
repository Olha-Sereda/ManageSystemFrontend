import { UsersTable } from '@/components/UsersTable';
import { useFetchUsersQuery, useRemoveUserMutation } from '../../store/apis/usersApi.js';
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { EditUserForm } from '@/components/EditUserForm/EditUserForm.jsx';

export default function UsersPage() {
  const { data: usersData, error, isLoading: isUsersLoading } = useFetchUsersQuery();

  const [removeUser] = useRemoveUserMutation();

  const columns = [
    {
      accessorKey: 'user_name',
      header: 'User Name',
    },
    {
      accessorKey: 'user_surname',
      header: 'User Surname',
    },
    {
      accessorKey: 'email',
      header: 'User Name',
    },
    {
      accessorKey: 'password',
      header: 'Password',
      cell: () => {
        return '********';
      },
    },
    {
      accessorKey: 'edit',
      header: 'Edit',
      cell: ({ row }) => {
        return (
          console.log(row.original),
          (
            <EditUserForm user={row.original}>
              <Pencil />
            </EditUserForm>
          )
        );
      },
    },
    {
      accessorKey: 'delete',
      header: 'Delete',
      cell: ({ row }) => {
        const handleDelete = async () => {
          await removeUser({ userId: row.original.id });
        };
        return <Trash2 onClick={handleDelete} />;
      },
    },
  ];

  if (isUsersLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <UsersTable usersData={usersData} columns={columns} />
    </>
  );
}

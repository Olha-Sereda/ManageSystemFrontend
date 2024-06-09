import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useEditUserMutation } from '../../store/apis/usersApi';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

EditUserForm.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user_name: PropTypes.string.isRequired,
    user_surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

function EditUserForm({ children, user }) {
  const [editUser] = useEditUserMutation();
  console.log(user);

  function onSubmit(data) {
    editUser(data);
  }
  const [open, setOpen] = useState(false);

  const roles = [
    { value: 'ROLE_USER', label: 'User' },
    { value: 'ROLE_ADMIN', label: 'Admin' },
  ];

  const form = useForm({
    defaultValues: {
      user_name: '',
      user_surname: '',
      email: '',
      password: '',
      roles: roles.find((role) => role.value === user.roles) || { value: '', label: '' },
    },
    values: user,
    mode: 'onBlur',
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Create a user for the test</DialogTitle>
              <DialogDescription>
                Create a new user for your test here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            {/* ?????? Why here is a strange error */}
            <Controller
              name="roles"
              control={form.control}
              rules={{ required: 'This field is required' }}
              defaultValue={roles ? roles[0] : {}} // set the default value to the first item in the roles array or an empty object
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select {...field} options={roles} isClearable isSearchable />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_name"
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_surname"
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User surname</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter test code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button onClick={form.handleSubmit(onSubmit)} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { EditUserForm };

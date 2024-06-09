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
import { useAddUserMutation } from '../../store/apis/usersApi';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

AddUserForm.propTypes = {
  children: PropTypes.node.isRequired,
};

function AddUserForm({ children }) {
  const [addUser, result] = useAddUserMutation();
  const [selectedRole, setSelectedRole] = useState(null);

  function onSubmit(data) {
    addUser(data);
  }
  const [open, setOpen] = useState(false);

  const roles = [
    { value: 'ROLE_USER', label: 'User' },
    { value: 'ROLE_ADMIN', label: 'Admin' },
  ];

  const form = useForm({
    defaultValues: { user_name: '', user_surname: '', email: '', password: '', roles: null },
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
            <FormField
              control={form.control}
              name="roles"
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Controller
                      name="roles"
                      control={form.control}
                      render={({ field }) => <Select {...field} options={roles} isClearable isSearchable />}
                    />
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
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button onClick={() => setOpen(false)} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { AddUserForm };

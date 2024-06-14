import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../store/index';
import { useNavigate } from 'react-router-dom';
import { setSession } from '@/store/reducers/sessionSlice';
import { useLazyGetCurrentUserRoleQuery } from '@/store/apis/usersApi';

export default function LoginForm() {
  const [login, result] = useLoginMutation();
  const [getRole, roleResult] = useLazyGetCurrentUserRoleQuery();
  const navigate = useNavigate();

  console.log(result, roleResult);

  function onSubmit(data) {
    login(data)
      .unwrap()
      .then((res) => {
        localStorage.setItem('token', res.token);
        getRole()
          .unwrap()
          .then((res) => {
            console.log('Role res:', res);
            localStorage.setItem('role', res);
            setSession(true);
            navigate('/');
          });
      })
      .catch((err) => {});
  }

  const form = useForm({ defaultValues: { email: '', password: '' }, mode: 'onBlur' });
  return (
    <Form {...form} className="">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          rules={{ required: 'This field is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
                <Input type="password" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

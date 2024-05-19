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
import { useAddServiceMutation } from '../../store/apis/servicesApi';
import { useParams } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import PropTypes from 'prop-types';

AddTemplateForm.propTypes = {
  children: PropTypes.node.isRequired,
};

function AddTemplateForm({ children }) {
  const [addService, result] = useAddServiceMutation();
  const { id } = useParams();

  function onSubmit(data) {
    addService(data);
  }

  console.log('Result', result);

  const form = useForm({ defaultValues: { service_name: '', serverId: id }, mode: 'onBlur' });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Create a test</DialogTitle>
              <DialogDescription>
                Create a new test for your service here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="service_name"
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="test_code"
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Code</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter test code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expected_answer"
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected answer</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter expected answer" {...field} />
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
      </DialogContent>
    </Dialog>
  );
}

export { AddTemplateForm };

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
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function AddServiceForm({ children }) {
  const [addService] = useAddServiceMutation();
  const { id } = useParams();

  function onSubmit(data) {
    addService(data);
  }

  const [open, setOpen] = useState(false);

  const form = useForm({ defaultValues: { service_name: '', serverId: id }, mode: 'onBlur' });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Add a service</DialogTitle>
              <DialogDescription>Create a new service. Click save when you&apos;re done.</DialogDescription>
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

export { AddServiceForm };

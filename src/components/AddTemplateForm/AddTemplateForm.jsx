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
import { useAddTemplateMutation } from '../../store/apis/templatesApi';
import { Textarea } from '@/components/ui/textarea';
import PropTypes from 'prop-types';
import { useState } from 'react';

AddTemplateForm.propTypes = {
  children: PropTypes.node.isRequired,
};

function AddTemplateForm({ children }) {
  const [addTemplate, result] = useAddTemplateMutation();

  function onSubmit(data) {
    addTemplate(data);
  }
  const [open, setOpen] = useState(false);

  console.log('Result', result);

  const form = useForm({ defaultValues: { template_name: '', test_code: '', expected_answer: '' }, mode: 'onBlur' });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Create a template for the test</DialogTitle>
              <DialogDescription>
                Create a new template for your test here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="template_name"
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template name</FormLabel>
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
                    <Textarea placeholder="Enter expected answer" {...field} />
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

export { AddTemplateForm };

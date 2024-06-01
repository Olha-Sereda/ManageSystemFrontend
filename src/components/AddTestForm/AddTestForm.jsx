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
import { useAddTestMutation } from '../../store/apis/testsApi';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useFetchTemplatesQuery } from '../../store/apis/templatesApi';
import { TemplateDropdownMenu } from './TemplateDropdownMenu';

function AddTestForm({ children }) {
  const [addTest, result] = useAddTestMutation();
  const { data: templates = [], error, isLoading } = useFetchTemplatesQuery();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  function onSubmit(data) {
    addTest(data);
  }
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: { test_name: '', test_code: '', expected_answer: '' },
    values: selectedTemplate,
    mode: 'onBlur',
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Create a test</DialogTitle>
              <DialogDescription>
                Create a new test for your test here. Click save when you&apos;re done.
              </DialogDescription>
              <TemplateDropdownMenu templates={templates} onSelect={setSelectedTemplate} />
            </DialogHeader>
            <FormField
              control={form.control}
              name="test_name"
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test name</FormLabel>
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

export { AddTestForm };

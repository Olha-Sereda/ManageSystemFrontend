import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useLoginMutation } from "../../store/index";
import { useNavigate, useParams } from 'react-router-dom';

export default function LoginForm() {
  const [login, result] = useLoginMutation();
  const { id } = useParams();
  const navigate = useNavigate();

  function onSubmit(data) {
    login(data);
  }

  if (result.isSuccess) {
    useNavigate("/servers");
  }

  console.log("Result", result);
  console.log("LoginForm");

  const form = useForm({defaultValues: {email: "", password: ""}, mode: "onBlur"})
  return (
   
        <Form {...form} className="">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "This field is required" }}
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
              rules={{ required: "This field is required" }}
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
  )
}
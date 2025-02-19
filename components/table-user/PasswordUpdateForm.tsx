"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UpdateButton } from "../loading-button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updatePasswordSchema } from "@/lib/auth-schema";
import { useState, useEffect } from "react";
import { updateUser } from "@/services/user/post.user";
import { useToast } from "@/hooks/use-toast";

type PasswordUpdateFormProps = {
  userId: string;
};

export default function PasswordUpdateForm({
  userId,
}: PasswordUpdateFormProps) {
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState("");

  const passwordForm = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: "" },
  });

  useEffect(() => {
    passwordForm.reset({ password: "" });
  }, [passwordForm]);

  async function onSubmitPassword(
    values: z.infer<typeof updatePasswordSchema>
  ) {
    try {
      await updateUser(`/api/users/${userId}`, { arg: values });
      toast({
        variant: "success",
        title: "Success",
        description: "Password updated successfully!",
      });
      passwordForm.reset();
    } catch (error) {
      setErrorMessage(`${error}, Failed to update password. Please try again.`);
    }
  }

  return (
    <section className="my-10">
      <h1 className="text-lg font-semibold underline underline-offset-2 mb-7">
        Password Update
      </h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
          className="space-y-8"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:max-w-[70%] gap-x-6 gap-y-8">
            <FormField
              control={passwordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Update password here..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <UpdateButton pending={passwordForm.formState.isSubmitting}>
            Update Password
          </UpdateButton>
        </form>
      </Form>
    </section>
  );
}

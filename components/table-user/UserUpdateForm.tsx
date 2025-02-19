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
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { updateUserSchema } from "@/lib/auth-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { updateUser } from "@/services/user/post.user";
import { User } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";

type UserUpdateFormProps = {
  user?: User;
  userId: string;
  mutate: () => void;
  isLoading: boolean;
};

export default function UserUpdateForm({
  user,
  userId,
  mutate,
  isLoading,
}: UserUpdateFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "User",
      supplier_code: "",
      pic_name: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        role: (user.role as "Admin" | "Supplier" | "User") || "User",
        ...(user.role === "Supplier"
          ? {
              supplier_code: user.supplier_code || "",
              pic_name: user.pic_name || "",
              phone: user.phone || "",
              address: user.address || "",
            }
          : {}),
      });
    }
  }, [user, form]);

  async function onSubmitData(values: z.infer<typeof updateUserSchema>) {
    try {
      await updateUser(`/api/users/${userId}`, { arg: values });
      mutate();
      toast({
        variant: "success",
        title: "Success",
        description: "Data updated successfully!",
      });
    } catch (error) {
      const errMessage =
        (error as Error).message || "An unexpected error occurred";
      toast({
        variant: "destructive",
        title: "Error",
        description: errMessage,
      });
    }
  }

  return (
    <section className="my-10">
      <h1 className="text-lg font-semibold underline underline-offset-2 mb-7">
        Data Updates
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitData)}
          className="space-y-8"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:max-w-[70%] gap-x-3 gap-y-4">
            {isLoading
              ? ["name", "email"].map((field, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))
              : ["name", "email"].map((field) => (
                  <FormField
                    control={form.control}
                    key={field}
                    name={field as keyof z.infer<typeof updateUserSchema>}
                    render={({ field: fieldProps }) => (
                      <FormItem>
                        <FormLabel>
                          {field
                            .replace(/_/g, " ")
                            .replace(/\b[a-z]/g, (char) => char.toUpperCase())
                            .replace(/([a-z])([A-Z])/g, "$1 $2")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder={`Enter your ${field}`}
                            {...fieldProps}
                            value={fieldProps.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
            {user?.role === "Supplier"
              ? ["supplier_code", "pic_name", "phone"].map((field) => (
                  <FormField
                    control={form.control}
                    key={field}
                    name={field as keyof z.infer<typeof updateUserSchema>}
                    render={({ field: fieldProps }) => (
                      <FormItem>
                        <FormLabel>
                          {field
                            .replace(/_/g, " ")
                            .replace(/\b[a-z]/g, (char) => char.toUpperCase())
                            .replace(/([a-z])([A-Z])/g, "$1 $2")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder={`Enter ${field}`}
                            {...fieldProps}
                            value={fieldProps.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))
              : null}
            {user?.role === "Supplier" ? (
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Input address here..."
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
          </div>
          <UpdateButton pending={form.formState.isSubmitting}>
            Update Data
          </UpdateButton>
        </form>
      </Form>
    </section>
  );
}

"use client";
import { useEffect, useState } from "react";
import { UpdateButton } from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/lib/auth-schema";
import { addUser } from "@/services/user/post.user";
import { mutate } from "swr";
import { useToast } from "@/hooks/use-toast";

export default function AddUserForm() {
  const { toast } = useToast();
  const [role, setRole] = useState("");

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    shouldUnregister: true,
    defaultValues: {
      name: "",
      email: "",
      role: "",
      supplier_code: "",
      pic_name: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchRole = form.watch("role");

  useEffect(() => {
    if (watchRole !== "Supplier") {
      form.setValue("supplier_code", "");
      form.setValue("pic_name", "");
      form.setValue("phone", "");
      form.setValue("address", "");
    }
  }, [watchRole, form]);

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const data = {
      name: values.name,
      email: values.email,
      role: values.role,
      password: values.password,
      ...(values.role === "Supplier" && {
        supplier_code: values.supplier_code,
        pic_name: values.pic_name,
        phone: values.phone,
        address: values.address,
      }),
    };
    try {
      await addUser("/api/users", { arg: data });
      toast({
        variant: "success",
        title: "Success",
        description: "User added successfully",
      });
      mutate((key) => typeof key === "string" && key.startsWith("/api/users"));
      form.reset();
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
    <section>
      <h1 className="w-full mx-auto md:max-w-[80%] xl:max-w-[65%] mb-6 font-bold underline underline-offset-2">
        Form Create User
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mx-auto md:max-w-[80%] xl:max-w-[65%]"
          autoComplete="off"
        >
          <div className="mb-4 grid grid-cols-2 gap-2">
            {/* Name & Email */}
            {["name", "email"].map((field) => (
              <FormField
                control={form.control}
                key={field}
                name={field as keyof z.infer<typeof signUpSchema>}
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
                        placeholder={`Enter ${field
                          .replace(/_/g, " ")
                          .replace(/\b[a-z]/g, (char) => char.toUpperCase())
                          .replace(/([a-z])([A-Z])/g, "$1 $2")}`}
                        {...fieldProps}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* Role Selection */}
            <Controller
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setRole(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="User">User</SelectItem>
                        <SelectItem value="Supplier">Supplier</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Field untuk Supplier */}
            {role === "Supplier" && (
              <>
                {["supplier_code", "pic_name", "phone"].map((field) => (
                  <FormField
                    control={form.control}
                    key={field}
                    name={field as keyof z.infer<typeof signUpSchema>}
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
                            placeholder={`Enter ${field
                              .replace(/_/g, " ")
                              .replace(/\b[a-z]/g, (char) => char.toUpperCase())
                              .replace(/([a-z])([A-Z])/g, "$1 $2")}`}
                            {...fieldProps}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </>
            )}

            {/* Password & Confirm Password */}
            {["password", "confirmPassword"].map((field) => (
              <FormField
                control={form.control}
                key={field}
                name={field as keyof z.infer<typeof signUpSchema>}
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
                        type="password"
                        placeholder={`Enter ${field
                          .replace(/_/g, " ")
                          .replace(/\b[a-z]/g, (char) => char.toUpperCase())
                          .replace(/([a-z])([A-Z])/g, "$1 $2")}`}
                        {...fieldProps}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {role === "Supplier" && (
              <FormField
                control={form.control}
                name="address"
                render={({ field: fieldProps }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter address" {...fieldProps} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <div>
            <UpdateButton pending={form.formState.isSubmitting}>
              Add User
            </UpdateButton>
          </div>
        </form>
      </Form>
    </section>
  );
}

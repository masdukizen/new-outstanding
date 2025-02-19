"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "@/lib/auth-schema";
import { signUpCredential } from "@/lib/action";
import { LoadingButton } from "@/components/loading-button";
import ErrorMessage from "@/components/error-message";
import { ServerActionResponse } from "@/types/user";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SignUp() {
  const { toast } = useToast();
  const router = useRouter();
  const [globalError, setGlobalError] = useState("");
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      role: "Supplier",
      email: "",
      supplier_code: "",
      pic_name: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      const result: ServerActionResponse = await signUpCredential(values);
      if (result?.success) {
        toast({
          variant: "success",
          title: "Success",
          description: result.message,
        });
        form.reset();
        router.push("/");
      } else
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message,
        });
    } catch (error) {
      setGlobalError(`${error}`);
    }
  }
  return (
    <Card className="w-full max-w-[50%] mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        {globalError && <ErrorMessage error={globalError} />}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=""
            autoComplete="off"
          >
            <div className="mb-4 grid grid-cols-2 gap-2">
              {[
                "name",
                "email",
                "supplier_code",
                "pic_name",
                "phone",
                "address",
                "password",
                "confirmPassword",
              ].map((field) => (
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
                          type={
                            field.includes("password")
                              ? "password"
                              : field === "confirmPassword"
                              ? "password"
                              : "text"
                          }
                          placeholder={`${field
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
            </div>
            <div className=" ml-auto max-w-[30%]">
              <LoadingButton pending={form.formState.isSubmitting}>
                Sign Up
              </LoadingButton>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

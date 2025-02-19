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
import { useState } from "react";
import ErrorMessage from "./error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInFormSchema } from "@/lib/auth-schema";
import { signInCredential } from "@/lib/action";
import { LoadingButton } from "./loading-button";
import { Input } from "./ui/input";
import Link from "next/link";
export default function FormLogin() {
  const [globalError, setGlobalError] = useState("");
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const result = await signInCredential(values);
    if (result?.message) {
      setGlobalError(result.message);
    }
  }
  return (
    <Card className="min-w-80">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>Please sign in to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        {globalError && <ErrorMessage error={globalError} />}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3"
            autoComplete="off"
          >
            {["email", "password"].map((field) => (
              <FormField
                control={form.control}
                key={field}
                name={field as keyof z.infer<typeof signInFormSchema>}
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
                        type={field.includes("password") ? "password" : "text"}
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
            <LoadingButton pending={form.formState.isSubmitting}>
              Sign In
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don&rsquo;t have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

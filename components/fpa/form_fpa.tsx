"use client";
import * as React from "react";
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
import { ItemSchema } from "@/lib/item_schema";
import { useSupplierData } from "@/services/fpa/fpa.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import SkeletonCard from "../dashboard/SkeletonCard";
import { useToast } from "@/hooks/use-toast";
import { addItem } from "@/services/fpa/post.item";
import { mutate } from "swr";
import { User } from "@/types/user";

export default function AddItemForm() {
  const { toast } = useToast();
  const [session, setSession] = React.useState<User | null>(null);
  const { data: supplier, isLoading } = useSupplierData();
  const [supplierId, setSupplierId] = useState("");
  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      contract_no: "",
      contract_no_manual: "",
      effective_date: undefined,
      expiry_date: undefined,
      stock_code: 0,
      stock_description: "",
      part_no: "",
      original_price: 0,
      price_usd: 0,
      discount: 0,
      price_after_discount: 0,
      stock_class: "",
      leadtime: 0,
      last_price_update_date: undefined,
      supplierId: supplierId,
    },
  });

  async function onSubmit(values: z.infer<typeof ItemSchema>) {
    try {
      await addItem("/api/fpa", { arg: values });
      toast({
        variant: "success",
        title: "Success",
        description: "User added successfully",
      });
      mutate((key) => typeof key === "string" && key.startsWith("/api/fpa"));
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
  React.useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setSession(data);
    };
    fetchSession();
  }, []);
  if (isLoading) {
    return (
      <section className="max-w-[80%] mx-auto p-4 space-y-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </section>
    );
  }
  return (
    <section>
      {session?.role !== "Supplier" ? (
        <>
          <h1 className="w-full mx-auto md:max-w-[80%] xl:max-w-[65%] mb-6 font-bold underline underline-offset-2">
            Form Create Item
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full mx-auto md:max-w-[80%] xl:max-w-[65%]"
              autoComplete="off"
            >
              <div className="mb-4 grid grid-cols-2 gap-2">
                {/* Input untuk String */}
                {[
                  "contract_no",
                  "contract_no_manual",
                  "stock_description",
                  "part_no",
                  "stock_class",
                ].map((field) => (
                  <FormField
                    control={form.control}
                    key={field}
                    name={field as keyof z.infer<typeof ItemSchema>}
                    render={({ field: fieldProps }) => (
                      <FormItem>
                        <FormLabel>
                          {field
                            .replace(/_/g, " ")
                            .toLowerCase()
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder={`Enter ${field}`}
                            {...fieldProps}
                            value={
                              typeof fieldProps.value === "string"
                                ? fieldProps.value
                                : fieldProps.value?.toString() ?? ""
                            }
                            onChange={(e) =>
                              fieldProps.onChange(e.target.value)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                {/* number input */}
                {[
                  "stock_code",
                  "original_price",
                  "price_usd",
                  "discount",
                  "price_after_discount",
                  "leadtime",
                ].map((field) => (
                  <FormField
                    control={form.control}
                    key={field}
                    name={field as keyof z.infer<typeof ItemSchema>}
                    render={({ field: fieldProps }) => (
                      <FormItem>
                        <FormLabel>
                          {field
                            .replace(/_/g, " ")
                            .toLowerCase()
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder={`Enter ${field}`}
                            value={
                              typeof fieldProps.value === "number"
                                ? fieldProps.value
                                : ""
                            }
                            onChange={(e) => {
                              const newValue =
                                e.target.value === ""
                                  ? undefined
                                  : Number(e.target.value);
                              fieldProps.onChange(newValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                {/* date input */}
                {[
                  "effective_date",
                  "expiry_date",
                  "last_price_update_date",
                ].map((field) => (
                  <FormField
                    control={form.control}
                    key={field}
                    name={field as keyof z.infer<typeof ItemSchema>}
                    render={({ field: fieldProps }) => (
                      <FormItem>
                        <FormLabel>
                          {field
                            .replace(/_/g, " ")
                            .toLowerCase()
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder={`Enter ${field}`}
                            {...fieldProps}
                            value={
                              fieldProps.value
                                ? new Date(fieldProps.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              fieldProps.onChange(
                                e.target.value
                                  ? new Date(e.target.value)
                                  : undefined
                              )
                            }
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
                  name="supplierId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSupplierId(value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Supplier" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Supplier</SelectLabel>
                            {supplier?.map(
                              (s: { id: string; name: string }) => (
                                <SelectItem key={s.id} value={s.id}>
                                  {s.name}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <UpdateButton pending={form.formState.isSubmitting}>
                  Add User
                </UpdateButton>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <p>Data not found</p>
      )}
    </section>
  );
}

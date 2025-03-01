"use client";
import { useToast } from "@/hooks/use-toast";
import { UpdateItemSchema } from "@/lib/item_schema";
import { updateFpa } from "@/services/fpa/post.item";
import { Item } from "@/types/item";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

type FpaUpdateFormProps = {
  item?: Item;
  itemId: string;
  mutate: () => void;
  isLoading: boolean;
};

export default function FormUpdateAdm({
  item,
  itemId,
  mutate,
  isLoading,
}: FpaUpdateFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof UpdateItemSchema>>({
    resolver: zodResolver(UpdateItemSchema),
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
    },
  });

  // Reset form ketika item berubah
  useEffect(() => {
    if (item) {
      form.reset({
        contract_no: item.contract_no,
        contract_no_manual: item.contract_no_manual,
        effective_date: item.effective_date,
        expiry_date: item.expiry_date,
        stock_code: item.stock_code,
        stock_description: item.stock_description,
        part_no: item.part_no,
        original_price: item.original_price,
        price_usd: item.price_usd,
        discount: item.discount,
        price_after_discount: item.price_after_discount,
        stock_class: item.stock_class,
        leadtime: item.leadtime,
        last_price_update_date: item.last_price_update_date,
      });
    }
  }, [item, form]);

  async function onSubmitData(values: z.infer<typeof UpdateItemSchema>) {
    try {
      await updateFpa(`/api/fpa/${itemId}`, { arg: values });
      mutate();
      // await mutate("/api/fpa", async () => await fetcher("/api/fpa"), {
      //   revalidate: false,
      // });
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
    <section className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitData)}
          className="space-y-8"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:max-w-[70%] gap-x-3 gap-y-4">
            {[
              "contract_no",
              "contract_no_manual",
              "stock_description",
              "part_no",
              "stock_class",
            ].map((field) =>
              isLoading ? (
                // Tampilkan skeleton jika isLoading true
                <div key={field} className="space-y-4">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <FormField
                  control={form.control}
                  key={field}
                  name={field as keyof z.infer<typeof UpdateItemSchema>}
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
                          onChange={(e) => fieldProps.onChange(e.target.value)}
                          disabled={isLoading || form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            )}
            {[
              "stock_code",
              "original_price",
              "price_usd",
              "discount",
              "price_after_discount",
              "leadtime",
            ].map((field) =>
              isLoading ? (
                <div key={field} className="space-y-4">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <FormField
                  control={form.control}
                  key={field}
                  name={field as keyof z.infer<typeof UpdateItemSchema>}
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
                          disabled={isLoading || form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            )}
            {["effective_date", "expiry_date", "last_price_update_date"].map(
              (field) =>
                isLoading ? (
                  <div key={field} className="space-y-4">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : (
                  <FormField
                    control={form.control}
                    key={field}
                    name={field as keyof z.infer<typeof UpdateItemSchema>}
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
                              fieldProps.value &&
                              !isNaN(new Date(fieldProps.value).getTime())
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
                            disabled={isLoading || form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
            )}
          </div>
          <UpdateButton pending={form.formState.isSubmitting || isLoading}>
            Update Data
          </UpdateButton>
        </form>
      </Form>
    </section>
  );
}

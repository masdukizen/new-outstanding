"use client";
import { useToast } from "@/hooks/use-toast";
import { UpdateItemSuprSchema } from "@/lib/item_schema";
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
export default function FormUpdateSpr({
  item,
  itemId,
  mutate,
  isLoading,
}: FpaUpdateFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof UpdateItemSuprSchema>>({
    resolver: zodResolver(UpdateItemSuprSchema),
    defaultValues: {
      stock_update: "",
      remarks_stock: "",
    },
  });

  // Reset form ketika item berubah
  useEffect(() => {
    if (item) {
      form.reset({
        stock_update: item.stock_update ?? undefined,
        remarks_stock: item.remarks_stock ?? undefined,
      });
    }
  }, [item, form]);

  async function onSubmitData(values: z.infer<typeof UpdateItemSuprSchema>) {
    try {
      await updateFpa(`/api/fpa/${itemId}`, { arg: values });
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
    <section className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitData)}
          className="space-y-8"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:max-w-[70%] gap-x-3 gap-y-4">
            {["stock_update", "remarks_stock"].map((field) =>
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
                  name={field as keyof z.infer<typeof UpdateItemSuprSchema>}
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
                          placeholder={`Enter ${field
                            .replace(/_/g, " ")
                            .toLowerCase()
                            .replace(/\b\w/g, (char) => char.toUpperCase())}`}
                          {...fieldProps}
                          value={fieldProps.value}
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
          </div>
          <UpdateButton pending={form.formState.isSubmitting || isLoading}>
            Update Data
          </UpdateButton>
        </form>
      </Form>
    </section>
  );
}

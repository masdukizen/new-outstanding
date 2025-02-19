"use client";
import { useSupplier } from "@/services/sheet/sheet.queries";
import { POData } from "@/types/sheet";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { poSchema } from "@/lib/po-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";
import { sendMessage, useUploadPO } from "@/services/sheet/po.mutation";
import { Button } from "../ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
type PoProps = {
  supplier_name: string;
  data: POData;
};

export default function DetailsPO({ supplier_name, data }: PoProps) {
  const [session, setSession] = useState<User | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const { trigger, isMutating } = useUploadPO();
  const {
    data: data_supplier,
    isLoading,
    error: isError,
  } = useSupplier(supplier_name);
  const form = useForm<z.infer<typeof poSchema>>({
    resolver: zodResolver(poSchema),
    defaultValues: {
      po_number: data.PO_NO,
      po_items: data.PO_item,
      supplierId: "",
      file: undefined,
      userId: "",
    },
  });
  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setSession(data);
    };
    fetchSession();

    if (data_supplier?.id) {
      form.setValue("supplierId", data_supplier.id || "");
    }
    if (session?.id) {
      form.setValue("userId", session.id || "");
    }
  }, [data_supplier?.id, session?.id, form]);

  async function onSubmit(values: z.infer<typeof poSchema>) {
    const formData = new FormData();
    formData.append("po_number", values.po_number);
    formData.append("po_items", values.po_items);
    formData.append("supplierId", values.supplierId);
    formData.append("userId", values.userId);

    if (values.file instanceof File) {
      formData.append("file", values.file);
    }
    try {
      await trigger(formData);
      await sendMessage({
        nomor: data_supplier?.phone,
        pesan: `Dear, Rekan Vendor PT Antang Gunung Meratus Terdapat PO dengan nomor ${data.PO_NO}, mohon untuk update ketersediaan diisi di website po`,
      });
      sessionStorage.removeItem("selectedPO");
      router.push("/outstanding");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.error || "Input error occurred";
        toast({
          variant: "destructive",
          title: "Error",
          description: `Error sent PO: ${errorMessage}`,
        });
      }
    }
  }

  if (isError) return <p>Supplier not found</p>;
  return (
    <section>
      <article>
        <h1 className="font-bold underline underline-offset-2 mb-6">
          Details Request
        </h1>
      </article>
      <article className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl mb-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="border-b">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </div>
            ))}
          </div>
        ) : (
          [
            { label: "Supplier Name", value: data_supplier.name },
            { label: "PO Number", value: data.PO_NO },
            { label: "PO Item", value: data.PO_item },
          ].map((item, index) => (
            <div key={index} className="border-b">
              <small className="text-gray-500">{item.label}:</small>
              <p className="text-sm">{item.value}</p>
            </div>
          ))
        )}
      </article>
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="ml-2"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field: { onChange, ref } }) => (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="application/pdf"
                    ref={ref}
                    className="max-w-56 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const maxSize = 2 * 1024 * 1024;
                        if (file.size > maxSize) {
                          toast({
                            variant: "destructive",
                            title: "Error",
                            description: "The file size must not exceed 2MB!",
                          });
                          return;
                        }
                      }
                      onChange(file || undefined);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="my-3">
            <Button type="submit" disabled={isMutating}>
              {isMutating ? "Uploading..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

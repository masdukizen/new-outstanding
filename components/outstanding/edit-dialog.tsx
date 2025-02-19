import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { Po } from "@/types/po";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileSchema } from "@/lib/po-schema";
import { useUpdatePO } from "@/services/outstanding/outstanding.queries";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: Po;
}

export function EditDialog({ isOpen, onClose, data }: EditDialogProps) {
  const { toast } = useToast();
  const { trigger, isMutating } = useUpdatePO();
  const form = useForm<z.infer<typeof fileSchema>>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      file: undefined,
    },
  });
  async function onSubmit(values: z.infer<typeof fileSchema>) {
    const formData = new FormData();
    formData.append("id", data.id);
    if (values.file instanceof File) {
      formData.append("file", values.file);
    }
    try {
      await trigger(formData);
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.error || "Input error occurred";
        toast({
          variant: "destructive",
          title: "Error",
          description: `${errorMessage}`,
        });
      }
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit File</DialogTitle>
          <DialogDescription>Upload new file to update data.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          {data.file_name && (
            <div className="text-sm text-gray-500">
              Current file:{" "}
              <a
                href={`/uploads/${data.file_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {data.file_name}
              </a>
            </div>
          )}
        </div>
        <Form {...form}>
          <form
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
            className="ml-2"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf"
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
                        field.onChange(file || undefined);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="my-3">
              <Button type="submit" disabled={isMutating}>
                {isMutating ? "Uploading..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

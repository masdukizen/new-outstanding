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
import { updateOrdered } from "@/services/ordered_items/ordered.service";
import { useToast } from "@/hooks/use-toast";
import { readySchema } from "@/lib/po-schema";
import { UpdateButton } from "../loading-button";
import { mutate } from "swr";

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data?: Po;
}

export function EditReadyDate({ isOpen, onClose, data }: EditDialogProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof readySchema>>({
    resolver: zodResolver(readySchema),
    defaultValues: {
      remarks_on_supply: "",
      ready_date: undefined,
      status: "Ready to pickup",
    },
  });
  async function onSubmit(values: z.infer<typeof readySchema>) {
    if (data?.create_at && values.ready_date < new Date(data.create_at)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ready date cannot be earlier than the order date",
      });
      return;
    }
    try {
      await updateOrdered(`/api/po/${data?.id}`, { arg: values });
      mutate((key) => typeof key === "string" && key.startsWith("/api/po"));
      toast({
        variant: "success",
        title: "Success",
        description: "Data updated successfully!",
      });
      onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit File</DialogTitle>
          <DialogDescription>Upload new file to update data.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
            className="ml-2"
          >
            <FormField
              control={form.control}
              name="remarks_on_supply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks On Supply</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Remarks on supply"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ready_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ready Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Select ready date"
                      value={
                        field.value
                          ? field.value.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="my-3">
              <UpdateButton pending={form.formState.isSubmitting}>
                Update Data
              </UpdateButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

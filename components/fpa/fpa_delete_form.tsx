"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { UserRoundX } from "lucide-react";
import { mutate } from "swr";
import { useToast } from "@/hooks/use-toast";
import { deleteItem } from "@/services/fpa/post.item";

export default function ItemDeleteForm({ fpaId }: { fpaId: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmitData() {
    try {
      await deleteItem(`/api/fpa/${fpaId}`);
      toast({
        variant: "success",
        title: "Success",
        description: "Item deleted successfully!",
      });
      mutate((key) => typeof key === "string" && key.startsWith("/api/fpa"));
      router.push("/fpa");
    } catch (error) {
      setErrorMessage(`${error}, Failed to delete item. Please try again.`);
    }
  }

  return (
    <section className="my-10">
      <h1 className="text-lg text-rose-600 font-semibold underline underline-offset-2 mb-7">
        Item Delete
      </h1>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="rounded-3xl">
            <UserRoundX /> Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this Item ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel>
            <AlertDialogAction className="text-xs" onClick={onSubmitData}>
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </section>
  );
}

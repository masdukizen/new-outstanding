"use client";

import { useState } from "react";
import { deleteUser } from "@/services/user/post.user";
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
type UserUpdateFormProps = {
  userId: string;
};

export default function UserDeleteForm({ userId }: UserUpdateFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmitData() {
    try {
      await deleteUser(`/api/users/${userId}`);
      toast({
        variant: "success",
        title: "Success",
        description: "User deleted successfully!",
      });
      mutate((key) => typeof key === "string" && key.startsWith("/api/users"));
      router.push("/setting");
    } catch (error) {
      setErrorMessage(`${error}, Failed to delete user. Please try again.`);
    }
  }

  return (
    <section className="my-10">
      <h1 className="text-lg text-rose-600 font-semibold underline underline-offset-2 mb-7">
        User Delete
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
              Are you sure you want to delete this user ?
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

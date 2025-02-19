// import { Button } from "@/components/ui/button";
// import { Po } from "@/types/po";

// interface ActionCellProps {
//   data: Po;
// }

// const ActionFinish: React.FC<ActionCellProps> = ({ data }) => {
//   return (
//     <div className="flex justify-center items-center gap-2">
//       {/* Tombol Edit */}
//       <Button
//         size="sm"
//         onClick={() => setEditOpen(true)}
//         className="text-xs px-4 py-2"
//       >
//         Complete Order
//       </Button>
//     </div>
//   );
// };

// export default ActionFinish;
"use client";

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
import { Po } from "@/types/po";
import { Button } from "../ui/button";
import agingSupply from "@/lib/aging-supply";
import { updateOrdered } from "@/services/ordered_items/ordered.service";
import { mutate } from "swr";
import { useToast } from "@/hooks/use-toast";

type PoFinishFormProps = {
  data: Po;
};

export default function PoFinishForm({ data }: PoFinishFormProps) {
  const { toast } = useToast();

  async function handleFinish() {
    const due = data.due_date ?? null;
    const dateToPass: Date | null = due
      ? typeof due === "string"
        ? new Date(due)
        : due
      : null;

    const aging = agingSupply(dateToPass);
    const status = "Finish";

    try {
      await updateOrdered(`/api/po/${data.id}`, {
        arg: {
          aging_supply: aging,
          status: status,
        },
      });
      mutate((key) => typeof key === "string" && key.startsWith("/api/po"));
      toast({
        variant: "success",
        title: "Success",
        description: "Order successfully updated!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update order: " + error,
      });
    }
  }

  return (
    <div className="sticky h-12 top-0 z-50 flex items-center justify-between bg-white p-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm">Complete Order</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm</AlertDialogTitle>
            <AlertDialogDescription>
              Finishing this Order ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel>
            <AlertDialogAction className="text-xs" onClick={handleFinish}>
              Yes, finish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

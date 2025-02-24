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
import { useDeletePo } from "@/services/sheet/po.mutation";
import { Po } from "@/types/po";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";

export default function AlertDelete({ po }: { po: Po }) {
  const { trigger, isMutating } = useDeletePo();
  const handleDelete = async () => await trigger({ id: po.id });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="text-rose-500 text-center">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Trash2
                  size={25}
                  className="border p-1 border-rose-500 rounded-sm hover:bg-rose-500 hover:text-white"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Delete PO</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure to delete this{" "}
            <span className="underline font-semibold text-rose-600">
              PO {po.po_number}
            </span>{" "}
            with{" "}
            <span className="underline font-semibold text-rose-600">
              PO Item {po.po_items}
            </span>{" "}
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="text-xs"
            onClick={handleDelete}
            disabled={isMutating}
          >
            {isMutating ? "Deleting..." : " Yes, Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

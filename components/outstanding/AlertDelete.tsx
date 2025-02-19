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
import { Button } from "@/components/ui/button";
import { useDeletePo } from "@/services/sheet/po.mutation";
import { Po } from "@/types/po";
export default function AlertDelete({ po }: { po: Po }) {
  const { trigger, isMutating } = useDeletePo();
  const handleDelete = async () => await trigger({ id: po.id });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-red-600 hover:text-white"
        >
          Delete
        </Button>
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

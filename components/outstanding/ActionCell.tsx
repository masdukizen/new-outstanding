import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditDialog } from "./edit-dialog";
import { Po } from "@/types/po";
import AlertDelete from "./AlertDelete";

interface ActionCellProps {
  data: Po;
}

const ActionCell: React.FC<ActionCellProps> = ({ data }) => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        size="sm"
        onClick={() => setEditOpen(true)}
        className="text-xs px-4 py-2"
      >
        Edit
      </Button>
      <EditDialog
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        data={data}
      />

      <AlertDelete po={data} />
    </div>
  );
};

export default ActionCell;

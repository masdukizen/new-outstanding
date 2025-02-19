import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Po } from "@/types/po";
import { EditDueDate } from "./EditDueDate";
import { EditPlanDate } from "./EditPlanDate";
import { EditReadyDate } from "./EditReadyDate";

interface ActionCellProps {
  data?: Po;
}

const ActionOrder: React.FC<ActionCellProps> = ({ data }) => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      {!data?.due_date ? (
        <div className="">
          <Button
            size="sm"
            onClick={() => setEditOpen(true)}
            className="text-xs px-4 py-2"
          >
            Add due date
          </Button>
          <EditDueDate
            isOpen={editOpen}
            onClose={() => setEditOpen(false)}
            data={data}
          />
        </div>
      ) : null}
      {data?.due_date && !data?.plan_date ? (
        <div className="">
          <Button
            size="sm"
            onClick={() => setEditOpen(true)}
            className="text-xs px-4 py-2"
          >
            Add plan date
          </Button>
          <EditPlanDate
            isOpen={editOpen}
            onClose={() => setEditOpen(false)}
            data={data}
          />
        </div>
      ) : null}
      {data?.due_date && data?.plan_date && !data?.ready_date ? (
        <div className="">
          <Button
            size="sm"
            onClick={() => setEditOpen(true)}
            className="text-xs px-4 py-2"
          >
            Add ready date
          </Button>
          <EditReadyDate
            isOpen={editOpen}
            onClose={() => setEditOpen(false)}
            data={data}
          />
        </div>
      ) : null}
    </>
  );
};

export default ActionOrder;

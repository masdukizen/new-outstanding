import { useState } from "react";
import { EditDialog } from "./edit-dialog";
import { Po } from "@/types/po";
import AlertDelete from "./AlertDelete";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, FileSearch } from "lucide-react";

interface ActionCellProps {
  data: Po;
}

const ActionCell: React.FC<ActionCellProps> = ({ data }) => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="flex justify-center items-center gap-2">
      <div
        onClick={() => setEditOpen(true)}
        className="text-xs py-2 text-green-500 text-center"
      >
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Edit
                size={25}
                className="border p-1 border-green-500 rounded-sm hover:bg-green-500 hover:text-white"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <EditDialog
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        data={data}
      />

      <Link
        href={`/outstanding/${data.id}`}
        prefetch={true}
        className="text-blue-500 text-center"
      >
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <FileSearch
                size={25}
                className="border p-1 border-blue-500 rounded-sm hover:bg-blue-500 hover:text-white"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Detail</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
      <AlertDelete po={data} />
    </div>
  );
};

export default ActionCell;

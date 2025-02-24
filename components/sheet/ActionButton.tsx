"use client";

import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import { POData } from "@/types/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Upload } from "lucide-react";

const ActionButton = ({ row }: { row: Row<POData> }) => {
  const router = useRouter();
  const po = row.original;

  const handleClick = () => {
    sessionStorage.setItem("selectedPO", JSON.stringify(po));
    router.push(`/po/${po.PO_NO}`);
  };

  return (
    <div onClick={handleClick} className="text-center text-violet-600">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <Upload
              size={25}
              className="border p-1 rounded-sm border-violet-600 hover:bg-violet-600 hover:text-white"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload PO</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ActionButton;

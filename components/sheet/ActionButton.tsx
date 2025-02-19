"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { POData } from "@/types/sheet";

const ActionButton = ({ row }: { row: Row<POData> }) => {
  const router = useRouter();
  const po = row.original;

  const handleClick = () => {
    sessionStorage.setItem("selectedPO", JSON.stringify(po));
    router.push(`/po/${po.PO_NO}`);
  };

  return (
    <Button onClick={handleClick} size="sm">
      Upload PO
    </Button>
  );
};

export default ActionButton;

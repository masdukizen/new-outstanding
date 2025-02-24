"use client";

import UserDetails from "@/components/table-user/user-details";
import { SettingsIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function Details() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  return (
    <div className="container mx-auto py-2">
      <div className="flex gap-2 items-center mb-14 ">
        <SettingsIcon size={22} /> <h1 className="text-2xl">Settings</h1>
      </div>
      <Suspense>
        <UserDetails userId={id} />
      </Suspense>
    </div>
  );
}

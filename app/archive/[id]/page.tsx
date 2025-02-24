"use client";
import ArchiveDetails from "@/components/archive/DetailsArchive";
import { Suspense } from "react";

export default function DetailArchive() {
  return (
    <Suspense>
      <ArchiveDetails />
    </Suspense>
  );
}

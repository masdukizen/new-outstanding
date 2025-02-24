"use client";
import { useParams } from "next/navigation";

export default function FpaDetails() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  return (
    <div className="container mx-auto py-2">
      <h1>{id}</h1>
    </div>
  );
}

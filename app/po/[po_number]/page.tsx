"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DetailsPO from "@/components/sheet/DetailsPO";
import { POData } from "@/types/sheet";
export default function PODetailPage() {
  const router = useRouter();
  const [poData, setPOData] = useState<POData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("selectedPO");
    if (storedData) {
      setPOData(JSON.parse(storedData));
    } else {
      router.push("/po");
    }
  }, [router]);

  if (!poData) return null;

  return (
    <>
      <section>
        <div className="container mt-10 w-full mx-auto md:max-w-[80%] xl:max-w-[65%]">
          <DetailsPO supplier_name={poData.Supplier_Name} data={poData} />
        </div>
      </section>
    </>
  );
}

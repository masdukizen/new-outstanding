"use client";
import { useFpaById } from "@/services/fpa/fpa.queries";
import { Suspense } from "react";
import FpaShow from "./fpa_show_data";
import * as React from "react";
import FormUpdateAdm from "./form_update_adm";
import FormUpdateSpr from "./form_update_spr";
import { User } from "@/types/user";
import ItemDeleteForm from "./fpa_delete_form";
export default function FpaData({ fpaId }: { fpaId: string }) {
  const [session, setSession] = React.useState<User | null>(null);
  const { data: item, isLoading, error, mutate } = useFpaById(fpaId);
  React.useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setSession(data);
    };
    fetchSession();
  }, []);
  if (error) return <p>Error fetching data item</p>;
  return (
    <>
      <Suspense>
        <h2 className="mb-3 font-semibold underline">Details data of FPA</h2>
        <FpaShow item={item} isLoading={isLoading} />
      </Suspense>
      <Suspense>
        <h2 className="mb-3 font-semibold underline">Form Update FPA</h2>
        {session?.role !== "Supplier" ? (
          <>
            <FormUpdateAdm
              item={item}
              itemId={fpaId}
              mutate={mutate}
              isLoading={isLoading}
            />
            <Suspense>
              <ItemDeleteForm fpaId={fpaId} />
            </Suspense>
          </>
        ) : (
          <FormUpdateSpr
            item={item}
            itemId={fpaId}
            mutate={mutate}
            isLoading={isLoading}
          />
        )}
      </Suspense>
    </>
  );
}

import AddUserForm from "@/components/table-user/add-userForm";
import PageHeader from "@/components/table-user/userHeader";
import { Suspense } from "react";

export default function NewUser() {
  return (
    <>
      <Suspense>
        <PageHeader title="Create User" />
        <AddUserForm />
      </Suspense>
    </>
  );
}

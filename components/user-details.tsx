"use client";

import { useUser } from "@/services/user/user.queries";
import UserShow from "./table-user/user-show";
import PasswordUpdateForm from "./table-user/PasswordUpdateForm";
import UserUpdateForm from "./table-user/UserUpdateForm";
import { Separator } from "./ui/separator";
import { Suspense } from "react";
import UserDeleteForm from "./table-user/UserDeleteForm";

export default function UserDetails({ userId }: { userId: string }) {
  const { data: user, isLoading, error: isError, mutate } = useUser(userId);

  if (isError) return <p>Error fetching user data.</p>;

  return (
    <>
      <Suspense>
        <UserShow user={user} isLoading={isLoading} />
      </Suspense>
      <Separator className="max-w-[90%]" />
      <Suspense>
        <UserUpdateForm
          user={user}
          userId={userId}
          mutate={mutate}
          isLoading={isLoading}
        />
      </Suspense>
      <Separator className="max-w-[90%]" />
      <Suspense>
        <PasswordUpdateForm userId={userId} />
      </Suspense>
      <Separator className="max-w-[90%]" />
      <Suspense>
        <UserDeleteForm userId={userId} />
      </Suspense>
    </>
  );
}

import { User } from "@/types/user";
import { Skeleton } from "../ui/skeleton";
interface UserProps {
  user?: User;
  isLoading: boolean;
}

export default function UserShow({ user, isLoading }: UserProps) {
  return (
    <section className="mb-10">
      <h1 className="text-lg font-semibold underline underline-offset-2 mb-7">
        User Details
      </h1>
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-[90%] gap-4 bg-gray-50 p-5 rounded-2xl">
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div key={index} className="border-b space-y-2">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))
          : [
              { label: "Name", value: user?.name },
              { label: "Email", value: user?.email },
              { label: "Supplier Code", value: user?.supplier_code || "-" },
              { label: "Pic Name", value: user?.pic_name || "-" },
              { label: "Phone", value: user?.phone || "-" },
              { label: "Address", value: user?.address || "-" },
              { label: "Role", value: user?.role },
            ].map((item, index) => (
              <div key={index} className="border-b">
                <small className="text-gray-500">{item.label}:</small>
                <p className="text-sm">{item.value}</p>
              </div>
            ))}
      </article>
    </section>
  );
}

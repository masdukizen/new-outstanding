import { UserPlus2 } from "lucide-react";

export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex items-baseline gap-2 mb-10">
      <UserPlus2 size={20} strokeWidth={3} />{" "}
      <h1 className="text-lg font-semibold">{title}</h1>
    </div>
  );
}

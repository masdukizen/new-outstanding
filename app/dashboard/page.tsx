import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();
  return (
    <div className="p-5">
      <h1 className="text-2xl font-light">
        Wellcome back...{session?.user.name}
      </h1>
    </div>
  );
}

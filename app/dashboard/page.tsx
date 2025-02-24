import { auth } from "@/auth";
import PoChart from "@/components/dashboard/SalesChart";

export default async function Dashboard() {
  const session = await auth();
  return (
    <div className="container mx-auto py-2 max-w-[1024px]">
      <h1 className="text-2xl px-10 font-bold mb-4">Dashboard</h1>
      <div className="mb-4 px-10">
        <h1 className="text-base font-semibold">
          Welcome back :{" "}
          <span className="font-light">{session?.user.name}</span>{" "}
        </h1>
      </div>
      {/* Chart */}
      <div className="px-10">
        {session?.user.role !== "Supplier" ? <PoChart /> : null}
      </div>
    </div>
  );
}

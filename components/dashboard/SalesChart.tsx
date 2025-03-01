"use client";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import {
  useMonitoring,
  useMonthlyPOCount,
} from "@/services/monitoring/monitoring.queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SkeletonCard from "./SkeletonCard";
import { UserCheck2 } from "lucide-react";
interface CustomTickProps {
  x: number;
  y: number;
  payload: {
    value: string;
  };
}

const renderCustomizedTick = (props: CustomTickProps) => {
  const { x, y, payload } = props;
  const formattedLabel = new Date(payload.value).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-45)"
        fontSize={12}
      >
        {formattedLabel}
      </text>
    </g>
  );
};

export default function PoChart({
  userName,
  role,
}: {
  userName: string;
  role: string;
}) {
  const { monthlyStats, isLoading } = useMonthlyPOCount();
  const { data: monitoring } = useMonitoring();
  const [chartData, setChartData] = useState<{ name: string; sales: number }[]>(
    []
  );
  useEffect(() => {
    if (monitoring?.countsByCreator) {
      const transformedData = monitoring.countsByCreator.map(
        (item: { name: string; count: number }) => ({
          name: item.name,
          sales: item.count,
        })
      );
      setChartData(transformedData);
    }
  }, [monitoring]);
  const currentYear = new Date().getFullYear();

  const monthsArray = Array.from({ length: 12 }).map((_, index) => {
    const date = new Date(currentYear, index, 1);
    return {
      date,
      month: date.toISOString(),
      total: 0,
    };
  });
  const formattedStats = monthlyStats?.map(
    (item: { month: string; total: number }) => {
      const date = new Date(item.month);
      return {
        month: date.toISOString(),
        total: item.total,
      };
    }
  );
  const data = monthsArray.map((m) => {
    const found = formattedStats?.find(
      (fs: { month: string | number | Date }) => {
        const fsDate = new Date(fs.month);
        return (
          fsDate.getFullYear() === m.date.getFullYear() &&
          fsDate.getMonth() === m.date.getMonth()
        );
      }
    );
    return {
      month: m.month,
      total: found ? found.total : 0,
    };
  });
  const defaultColors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6384",
    "#AA336A",
    "#33AAFF",
    "#FF33AA",
    "#33FFAA",
    "#AAFF33",
  ];
  if (isLoading)
    return (
      <section className="max-w-[1024px] mx-auto p-4 space-y-4">
        <SkeletonCard />
        <SkeletonCard />
      </section>
    );
  return (
    <section className="max-w-[1024px]">
      {/* Card PO */}
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 mb-8">
        <div className="flex flex-col gap-6">
          <div className="text-center h-auto border p-4 rounded-xl flex items-center gap-4 bg-slate-600 text-white">
            <div className="h-16 w-16 border border-slate-200 bg-slate-50 rounded-full flex justify-center items-center">
              <UserCheck2 size={35} className="text-slate-800" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-semibold">
                {userName.split(" ")[0]}
              </h1>
              <small className="text-muted">{role}</small>
            </div>
          </div>
          <Card className="text-center h-auto flex flex-col justify-between max-h-[300px]">
            <CardHeader>
              <CardTitle className="text-4xl">Total PO</CardTitle>
              <CardDescription className="text-sm">
                Data PO terbaru
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-7xl">
                <CountUp end={monitoring?.totalPO || 0} duration={2.5} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center text-4xl font-extrabold my-2">
              PO
            </CardFooter>
          </Card>
        </div>

        <Card className="p-2 order-1 lg:order-2">
          <CardHeader>
            <CardTitle>Admin PO Chart</CardTitle>
            <CardDescription>
              Distribusi administrator terhadap PO
            </CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <div className="flex justify-center h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="sales"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {chartData.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={defaultColors[index % defaultColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[250px]">
                <p className="text-gray-500">Data kosong</p>
              </div>
            )}
            <div className="">
              <ul className="flex justify-center items-center space-x-4">
                {chartData.map((item, index) => (
                  <li key={item.name} className="flex items-center">
                    <span
                      className="w-4 h-4 rounded-full inline-block mr-2"
                      style={{
                        backgroundColor:
                          defaultColors[index % defaultColors.length],
                      }}
                    ></span>
                    <span className="font-medium text-sm">{item.name}:</span>
                    <span className="ml-1 text-gray-700">{item.sales}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* area chart */}
      <Card className="w-full min-h-[400px] p-4 m-4 mx-auto bg-white shadow rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Monthly PO Data</CardTitle>
          <CardDescription>
            Data PO per bulan untuk tahun {currentYear}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
            >
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={renderCustomizedTick} interval={0} />
              <YAxis />
              <Tooltip
                labelFormatter={(label: string) =>
                  new Date(label).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                }
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorTotal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>
  );
}

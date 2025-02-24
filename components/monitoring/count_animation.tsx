import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useEffect, useState } from "react";

const industrialStyles = [
  "bg-[#6A8D92] border-[#4F7176] text-[#F4F4F2] shadow-sm shadow-[#4F7176]",
  "bg-[#D8A47F] border-[#B5805B] text-[#3D2C2E] shadow-sm shadow-[#B5805B]",
  "bg-[#EEC373] border-[#D8A144] text-[#3D2C2E] shadow-sm shadow-[#D8A144]",
  "bg-[#5A7D7C] border-[#3E5F5E] text-[#F4F4F2] shadow-sm shadow-[#3E5F5E]",
  "bg-[#C94C4C] border-[#9B3636] text-[#F8EDE3] shadow-sm shadow-[#9B3636]",
];

interface StatusItem {
  status: string;
  count: number;
}

interface StatusCardsProps {
  statuses?: StatusItem[];
}

export default function StatusCards({ statuses = [] }: StatusCardsProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {statuses.length > 0 ? (
        statuses.map((item, index) => (
          <motion.div
            key={item.status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              className={`relative rounded-lg flex flex-col justify-between h-44 p-4 
              ${industrialStyles[index % industrialStyles.length]}`}
            >
              <CardHeader className="border-b border-gray-500 pb-2 flex items-center justify-center">
                <CardTitle className="text-base font-bold uppercase text-center">
                  {item.status}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center flex-1">
                <p className="text-4xl font-extrabold text-center">
                  {hasMounted ? (
                    <CountUp end={item.count} duration={2.5} />
                  ) : (
                    item.count
                  )}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))
      ) : (
        <div className="text-muted-foreground">Loading...</div>
      )}
    </div>
  );
}

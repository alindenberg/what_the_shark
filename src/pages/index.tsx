import { useState, useEffect } from 'react';
import { Inter } from "next/font/google";
import SharkTile from "@/components/SharkTile";
import Sort from "@/components/Sort";
import Sharks from "@/data/sharks.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedSharks, setSortedSharks] = useState([...Sharks]);

  useEffect(() => {
    const sorted = [...Sharks].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortedSharks(sorted);
  }, [sortOrder]);

  const handleSortChange = (e: any) => {
    setSortOrder(e.target.value);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-center mx-auto">
          <h1 className="text-2xl underline font-bold">Sharks</h1>
          <h3 className="text-md font-medium">Explore the many types of beautiful sharks on this earth.</h3>
        </div>
        <div className="p-2">
          <Sort sortOrder={sortOrder} handler={handleSortChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-3">
        {sortedSharks.map((shark) => (
          <SharkTile key={shark.id} {...shark} />
        ))}
      </div>
    </main>
  );
}
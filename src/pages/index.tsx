import { useState, useEffect } from 'react';
import { Inter } from "next/font/google";
import SharkTile from "@/components/SharkTile";
import Sort from "@/components/Sort";
import Sharks from "@/data/sharks.json";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedSharks, setSortedSharks] = useState([...Sharks]);

  useEffect(() => {
    const sorted = [...Sharks].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      }
      else if (sortOrder === 'desc') {
        return b.name.localeCompare(a.name);
      }
      else if (sortOrder === 'popularity') {
        return a.popularity - b.popularity;
      }
      return 0;
    });
    setSortedSharks(sorted);
  }, [sortOrder]);

  const handleSortChange = (e: any) => {
    setSortOrder(e.target.value);
  };

  return (
    <Layout>
      <main
        className={`flex flex-col items-center ${inter.className} mb-6`}
      >
        <div className="flex flex-col justify-center items-center w-full border-5">
          <div className="text-center mx-auto">
            <h1 className="text-2xl underline font-bold">Sharks</h1>
            <h3 className="text-md font-medium">Explore the beautiful sharks of this earth.</h3>
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
    </Layout>
  );
}
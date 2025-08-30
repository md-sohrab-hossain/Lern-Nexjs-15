"use client";

import dynamic from "next/dynamic";
import SearchSkeleton from "@/components/ui/SearchSkeleton";

const Search = dynamic(() => import("./Search"), {
  ssr: false,
  loading: () => <SearchSkeleton />,
});

const Header = () => {
  return (
    <div className="flex justify-between">
      <h1 className="font-bold text-3xl">Discover Events</h1>
      <Search />
    </div>
  );
};

export default Header;

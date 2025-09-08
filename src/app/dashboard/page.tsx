"use client";
import { useState } from "react";
import UserCard from "../components/UserCard";
import DashboardNav from "../components/DashboardNav";
import DashboardCards from "../components/DashboardCards";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [techFilter, setTechFilter] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleTechFilterChange = (value: string) => {
    setTechFilter(value);
  };

  return (
    <div className='w-screen h-screen flex flex-col justify-center'>
      <div className='w-full h-full p-8 overflow-auto'>
        <UserCard />
        <DashboardNav
          onSearchChange={handleSearchChange}
          onTechFilterChange={handleTechFilterChange}
        />
        <DashboardCards searchQuery={searchQuery} techFilter={techFilter} />
      </div>
    </div>
  );
}

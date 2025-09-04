'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

interface DashboardNavProps {
    onSearchChange?: (value: string) => void;
    onTechFilterChange?: (value: string) => void;
}

export default function DashboardNav({ onSearchChange, onTechFilterChange }: DashboardNavProps) {
    const session = useSession();
    const [searchQuery, setSearchQuery] = useState('');
    const [techFilter, setTechFilter] = useState('');

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        onSearchChange?.(value);
    };

    const handleTechFilterChange = (value: string) => {
        setTechFilter(value);
        onTechFilterChange?.(value);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setTechFilter('');
        onSearchChange?.('');
        onTechFilterChange?.('');
    };

    return (
        <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 my-4 sm:mx-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center w-full justify-between gap-4">
                {/* Left Section - Title and Description */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-neutral-100 mb-2">Project Dashboard</h1>
                    <p className="text-neutral-400 text-sm">
                        Manage and explore the projects. Use the search and filters below to find specific projects.
                    </p>
                </div>

                {/* Right Section - Actions and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    {/* Search Bar */}
                    <div className="relative flex-1 sm:flex-none">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full sm:w-64 px-4 py-2 pl-10 bg-neutral-800 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-100 focus:border-transparent"
                        />
                        <svg 
                            className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Technology Filter */}
                    <div className="relative flex-1 sm:flex-none">
                        <select
                            value={techFilter}
                            onChange={(e) => handleTechFilterChange(e.target.value)}
                            className="w-full sm:w-48 px-4 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-100 focus:border-transparent appearance-none cursor-pointer"
                        >
                            <option value="">All Technologies</option>
                            <option value="react">React</option>
                            <option value="next.js">Next.js</option>
                            <option value="node.js">Node.js</option>
                            <option value="typescript">TypeScript</option>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="postgresql">PostgreSQL</option>
                            <option value="mongodb">MongoDB</option>
                            <option value="tailwind">Tailwind CSS</option>
                        </select>
                        <svg 
                            className="absolute right-3 top-2.5 h-4 w-4 text-neutral-500 pointer-events-none" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {/* Clear Filters Button */}
                    {(searchQuery || techFilter) && (
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 rounded-lg transition-colors text-sm"
                        >
                            Clear Filters
                        </button>
                    )}

                    {/* Add Project Button */}
                    {session.data?.user ? (
                        <Link 
                            href="/addproject" 
                            className="px-6 py-2 bg-neutral-100 hover:bg-neutral-300 text-neutral-950 rounded-lg transition-colors font-medium text-center"
                        >
                            + Add Project
                        </Link>
                    ) : (
                        <div className="px-6 py-2 bg-neutral-700 text-neutral-400 rounded-lg text-center text-sm">
                            Sign in to add projects
                        </div>
                    )}
                </div>
            </div>

            {/* Active Filters Display */}
            {(searchQuery || techFilter) && (
                <div className="mt-4 pt-4 border-t border-neutral-700">
                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <span>Active filters:</span>
                        {searchQuery && (
                            <span className="px-2 py-1 bg-blue-600 text-neutral-100 rounded-md">
                                Search: "{searchQuery}"
                            </span>
                        )}
                        {techFilter && (
                            <span className="px-2 py-1 bg-green-600 text-neutral-100 rounded-md">
                                Tech: {techFilter}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

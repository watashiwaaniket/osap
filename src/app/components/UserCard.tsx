'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function UserCard() {
    const session = useSession();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 my-4 sm:mx-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                {/* Left Section - Navigation and Title */}
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                        <button 
                            onClick={() => router.push('/')}
                            className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors group"
                        >
                            <svg 
                                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Go Back</span>
                        </button>
                    </div>
                    <h1 className="text-3xl font-bold text-neutral-100">Find. Contribute. Learn.</h1>
                    <p className="text-neutral-400 mt-1">Explore amazing projects and showcase your own</p>
                </div>

                {/* Right Section - User Profile */}
                <div className="relative" ref={dropdownRef}>
                    {session.data?.user ? (
                        <div className="flex items-center gap-3">
                            {/* User Info Display */}
                            <div className="hidden sm:block text-right">
                                <p className="text-neutral-100 font-medium">{session.data.user.name}</p>
                                <p className="text-neutral-400 text-sm">{session.data.user.email}</p>
                            </div>

                            {/* Profile Picture Toggle */}
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="relative group focus:outline-none focus:ring-2 focus:ring-neurtal-100 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-full"
                                >
                                    <img 
                                        src={session.data.user.image || 'https://via.placeholder.com/64/374151/9CA3AF?text=U'} 
                                        alt="Profile" 
                                        className="w-12 h-12 rounded-full border-2 border-neutral-600 group-hover:border-neutral-400 transition-colors cursor-pointer"
                                    />
                                    {/* Dropdown Indicator */}
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-neutral-700 rounded-full flex items-center justify-center">
                                        <svg 
                                            className={`w-2 h-2 text-neutral-300 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute sm:right-0 mt-2 w-64 bg-neutral-800 border border-neutral-600 rounded-lg shadow-xl z-50">
                                        <div className="p-4 border-b border-neutral-600">
                                            <div className="flex flex-col overflow-auto">
                                                    <p className="text-neutral-100 font-medium">{session.data.user.name}</p>
                                                    <p className="text-neutral-400 text-sm overflow-auto">{session.data.user.email}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="p-2">
                                            <button
                                                onClick={() => router.push('/addproject')}
                                                className="w-full text-left px-3 py-2 text-neutral-200 hover:bg-neutral-700 rounded-md transition-colors flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Add New Project
                                            </button>
                                            
                                            <button
                                                onClick={() => router.push('/dashboard')}
                                                className="w-full text-left px-3 py-2 text-neutral-200 hover:bg-neutral-700 rounded-md transition-colors flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                                View Dashboard
                                            </button>
                                        </div>

                                        <div className="p-2 border-t border-neutral-600">
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-md transition-colors flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            {/* Welcome Message for Non-authenticated Users */}
                            <div className="text-center sm:text-left">
                                <p className="text-neutral-300 text-sm mb-2">Welcome! Browse projects freely</p>
                                <p className="text-neutral-400 text-xs">Sign in to add your own projects</p>
                            </div>
                            
                            {/* Sign In Button */}
                            <button
                                onClick={() => signIn()}
                                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-300 text-neutral-950 rounded-lg transition-colors font-medium text-sm"
                            >
                                Sign In
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

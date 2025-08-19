'use client';
import UserCard from "../components/UserCard";
import DashboardNav from "../components/DashboardNav";
import DashboardCards from "../components/DashboardCards";

export default function Dashboard() {
    
    return(
        <div className="w-screen h-screen flex justify-center">
            <div className="w-full h-full p-8">
                <UserCard />
                <DashboardNav />
                <DashboardCards />
            </div>
        </div>
    )
};

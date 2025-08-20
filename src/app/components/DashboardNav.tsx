import { useSession } from "next-auth/react"
import Link from "next/link";

export default function DashboardNav() {
    const session = useSession();
    return(
        <div className="border p-6 my-2 border-dashed flex">
                    <div className="flex items-center w-full justify-between">
                        <p className="px-6 text-slate-600">"This button is conditionally rendered, such that only logged in users can add projects, tho you can use your creative freedom to add search button on this nav and also filter options according to techstack used in project"</p>
                        {session.data?.user ? <Link href={'/addproject'} className="border p-1 bg-slate-600 cursor-pointer">Add Project</Link> : ''}
                    </div>
                </div>
    )
};

"use client"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserCard() {
    const session = useSession();
    const router = useRouter();
    return(
        <div className="flex w-full text-center justify-between items-end border p-1 border-dashed">
                            <div>
                            <p className="text-xl flex px-6 cursor-pointer" onClick={() => router.push('/')}>&lt; goback</p>
                            <p className="text-4xl text-left px-6">DASHBOARD NAV</p>
                            <p className="pb-6 px-6 text-gray-600">"This is your playground, go all in for the frontend"</p>
                            </div>
                            <div className="flex flex-col border border-dashed p-2">
                            <p className="text-gray-600">"Show user Details here"</p>
                            <img src={`${session.data?.user?.image}`} alt="pfp" className="rounded-full w-16 self-center"/>
                            {session.data?.user?.name}
                            <p>
                                <button onClick={() => {
                                        signOut();
                                    }}
                                    className="bg-slate-600 p-1 border cursor-pointer m-1"
                                >logout</button>
                            </p>
                            <p className="w-50 text-justify pt-2 text-gray-600">"Make this pfp a toggle button and when the user clicks on the pfp, they can see the email, username and also a button to logout"</p>
                            </div>
                        </div>
    )
};

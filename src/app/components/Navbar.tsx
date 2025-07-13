'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";

export function Navbar(){
    //design a beautiful navbar, this is just a placeholder rn
    const session = useSession();

    return(
        <div className="flex p-2 border rounded-xl m-4 justify-end">
            {!session.data?.user ? <Button text="login" variant="primary" size="sm" animated={false} glow={true} onClick={() => {signIn()}}/> : null}
            {session.data?.user ? <Button text="logout" variant="primary" size="sm" animated={false} glow={true} onClick={() => {signOut()}} /> : null}
        </div>
    )
}
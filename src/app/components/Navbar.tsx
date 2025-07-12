'use client';

import { signIn } from "next-auth/react";
import { Button } from "./Button";

export function Navbar(){
    //design a beautiful navbar, this is just a placeholder rn
    return(
        <div className="flex p-2 border rounded-xl m-4 justify-end">
            <Button text="login" variant="primary" size="sm" animated={false} glow={true} onClick={() => {signIn()}}/>
        </div>
    )
}
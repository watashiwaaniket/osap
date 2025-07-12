import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import client from "./lib/db"
import Resend from "next-auth/providers/resend"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers: [Resend, Google],
})
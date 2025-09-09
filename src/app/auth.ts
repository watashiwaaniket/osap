import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import client from "./lib/db"
import Resend from "next-auth/providers/resend"
import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers: [
        Resend, 
        Google({ 
            clientId: process.env.AUTH_GOOGLE_ID, 
            clientSecret: process.env.AUTH_GOOGLE_SECRET 
        }),
        Twitter({
            clientId: process.env.AUTH_TWITTER_ID,
            clientSecret: process.env.AUTH_TWITTER_SECRET
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }){
            return `${baseUrl}/dashboard`;
        }
    }
})

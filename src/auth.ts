import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { prisma } from "./lib/prisma"
import { saltAndHashPassword } from "./lib/utils"
import Credentials from "next-auth/providers/credentials"
// import bcrypt from "bcryptjs"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Github,
   Credentials({
    name: "Credentials",
    credentials: {
      email: {
        label: "Email",
        type: "email",
        placeholder: "Email",
      },
      password: {
        label: "Password",
        type: "password",
        placeholder: "Password",
      },
    },

    authorize: async (credentials) => { 
     let user = null;
     const pwHash = saltAndHashPassword(credentials.password as string);
     user = await prisma.user.findUnique({
       where: {
         email: credentials.email as string,
         password: pwHash,
       },

     });
     if (!user) {
       throw new Error("Invalid credentials");
     }
     return user;
    }

    
    })
  ],
  pages: {
    signIn: "login",
  },
})
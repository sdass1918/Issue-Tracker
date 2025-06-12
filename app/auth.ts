import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],

  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "" // Ensure `user.id` is added to the session
      }
      return session
    },
  },

  events: {
    async signIn({ user }) {
      try {
        await prisma.user.upsert({
          where: { email: user.email! },
          update: {}, // No update needed
          create: {
            email: user.email!,
            name: user.name,
            image: user.image,
          },
        })
      } catch (err) {
        console.error("Prisma user upsert error:", err)
      }
    },
  },
})

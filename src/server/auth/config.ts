import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      dni: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    dni: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    dni: string;
    role: string;
  }
}

export const authConfig = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "DNI",
      credentials: {
        dni: { label: "DNI", type: "text", placeholder: "Escribe tu DNI" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ dni: z.string().min(8), password: z.string().min(6) })
          .safeParse(credentials);
        
        if (parsedCredentials.success) {
          const { dni, password } = parsedCredentials.data;
          const user = await db.user.findUnique({ where: { dni } });
          
          if (!user || !user.password) return null;
          
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return {
              id: user.id,
              dni: user.dni ?? dni,
              role: user.role,
              name: user.name,
              email: user.email,
            };
          }
        }
        return null;
      }
    })
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      if (isOnLogin) {
        if (isLoggedIn) return Response.redirect(new URL('/dashboard', nextUrl));
        return true;
      }
      if (!isLoggedIn) {
        return false;
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.dni = user.dni;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id as string,
        dni: token.dni as string,
        role: token.role as string,
      },
    }),
  },
} satisfies NextAuthConfig;

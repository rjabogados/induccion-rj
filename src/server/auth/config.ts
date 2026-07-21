import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { type DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      dni: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    dni: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    dni: string;
    role: string;
  }
}

export const authConfig = {
  session: { strategy: "jwt" },
  providers: [],
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
        token.id = user.id as string;
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

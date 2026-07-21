import NextAuth from "next-auth";
import { cache } from "react";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "~/server/db";

import { authConfig } from "./config";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
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
          
          if (!user?.password) return null;
          
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
});

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };

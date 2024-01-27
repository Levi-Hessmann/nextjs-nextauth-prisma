import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import prisma from "@lib/prisma";
import { compare } from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error("Fehlender Benutzername oder Passwort");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !(await compare(password, user.password))) {
          throw new Error("Falscher Benutzername oder Passwort");
        }

        return {
          ...user,
          id: user.id.toString(),
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };

import NextAuth from "next-auth";

import type { NextAuthConfig, DefaultSession } from "next-auth";

import Credentials from "@auth/core/providers/credentials";
import { validateJWT } from "./authHelpers";

type CustomUser = {
  walletAddress?: string;
  userType?: string;
} & DefaultSession["user"];

declare module "next-auth" {
  interface Session {
    user: CustomUser;
  }
  interface User {
    walletAddress?: string;
    userType?: string;
  }
}

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(
        credentials: Partial<Record<"token", unknown>>,
        request: Request
      ): Promise<CustomUser | null> {
        const token = credentials.token as string;
        if (typeof token !== "string" || !token) {
          throw new Error("Token is required");
        }
        const jwtPayload = await validateJWT(token);
        if (jwtPayload && jwtPayload.sub) {
          const walletAddress = jwtPayload.verified_credentials[0].address;
          const user: CustomUser = {
            id: jwtPayload.sub,
            name: jwtPayload?.name || "",
            email: jwtPayload?.email || "",
            walletAddress,
            userType: "admin",
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user, session, trigger, account }) {
      if (trigger === "update" && session?.user) {
        const updatedUser = session?.user;
        console.log(updatedUser);
      }
      if (user) {
        token.walletAddress = user.walletAddress;
        token.userType = user?.userType || "admin";
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...token,
          id: token.sub,
          exp: undefined,
          jti: undefined,
          sub: undefined,
        },
      };
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/userinfo.profile",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const user = await res.json();

        if (res.ok && user.access) {
          return {
            id: user.user.id,
            email: credentials.email,
            accessToken: user.access,
            refreshToken: user.refresh,
            first_name: user.user.first_name,
            last_name: user.user.last_name,
            role: user.role,
            accessTokenExpires: Date.now() + 60 * 60 * 1000,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "google") {
        token.accessToken = account.access_token; // This is the Google access token
      }

      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
        token.role = user.role;
        token.user = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        };
      }

      const shouldRefresh = Date.now() >= (token.accessTokenExpires as number);

      if (shouldRefresh) {
        console.log("Access token expired, refreshing...");
        return await refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          first_name: token.user?.first_name as string,
          last_name: token.user?.last_name as string,
          email: token.user?.email as string,
        };
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.role = token.role as string;
        session.accessTokenExpires = token.accessTokenExpires as number;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login", // Redirect to custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: token.refreshToken,
        }),
      }
    );

    const refreshedTokens = await res.json();

    if (!res.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access,
      accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1 hour expiry
      refreshToken: refreshedTokens.refresh ?? token.refreshToken, // Fall back to old refresh token if none returned
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

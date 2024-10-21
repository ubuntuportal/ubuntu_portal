import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import axios from "axios";

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

        try {
          // Replacing fetch with Axios
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
            {
              email: credentials.email,
              password: credentials.password,
            },
            { headers: { "Content-Type": "application/json" } }
          );

          const user = res.data;

          if (res.status === 200 && user.access) {
            return {
              id: user.user.id,
              email: credentials.email,
              accessToken: user.access,
              refreshToken: user.refresh,
              first_name: user.user.first_name,
              last_name: user.user.last_name,
              role: user.role,
              accessTokenExpires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
            };
          }

          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "google") {
        token.accessToken = account.access_token;
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
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    // Retry logic: Attempt to refresh the token up to 2 times
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        // Replacing fetch with Axios for token refresh
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`,
          { refresh: token.refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const refreshedTokens = res.data;

        if (res.status !== 200) {
          throw refreshedTokens;
        }

        // Return updated tokens if refresh succeeds
        return {
          ...token,
          accessToken: refreshedTokens.access,
          accessTokenExpires: Date.now() + 2 * 60 * 60 * 1000, // 2-hour expiry
          refreshToken: refreshedTokens.refresh ?? token.refreshToken, // Fallback to old refresh token if none returned
        };
      } catch (error) {
        console.log(`Attempt ${attempt + 1} failed:`, error);
        if (attempt < 1)
          await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    // After 2 failed attempts, log the user out
    console.error(
      "Failed to refresh access token after 2 attempts. Logging out..."
    );
    return {
      ...token,
      error: "RefreshAccessTokenError",
      accessToken: undefined,
      refreshToken: undefined,
    };
  } catch (error) {
    console.error("Critical error refreshing access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

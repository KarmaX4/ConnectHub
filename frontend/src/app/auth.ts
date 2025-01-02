import NextAuth from "next-auth";   
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      emailVerified: Date | null;
      user: {
        username: string;
        email: string;
      };
      token: string;
    }
  }
}

const login = async (credentials: { email: string; password: string }) => {
  try {
    const baseUrl = process.env.BASE_API_URL || 'http://localhost:5000';
    // console.log("credentials =",credentials);
    const response = await fetch(
      `${baseUrl}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    console.log("response =",response);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "Failed to login!");
    }
    
    return data;
  } catch (err) {
    throw err; 
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials as { email: string; password: string });
          return user;
        } catch (err: unknown) {
          if (err instanceof Error) {
            throw new Error(err.message);
          }
          throw new Error('An unknown error occurred');
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token , ...user };
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          emailVerified: null,
          user: token.user as { username: string; email: string },
          token: token.token as string,
        };
      }
      return session;
    },
  },
});

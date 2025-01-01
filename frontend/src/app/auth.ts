import NextAuth from "next-auth";   
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";

declare module "next-auth" {
  interface Session {
    user: {
      user: {
        username: string;
        email: string;
      };
      token: string;
    }
  }
}

const login = async (credentials: any) => {
  try {
    // console.log("credentials =",credentials);
    const response = await fetch(
      ` http://localhost:5000/api/auth/login`,
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
          const user = await login(credentials);
          return user;
        } catch (err: any) {
          throw new Error(err.message); 
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
        session.user = token as any;
      }
      return session;
    },
  },
});

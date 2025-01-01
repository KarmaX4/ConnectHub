import { NextAuthConfig } from 'next-auth';

interface AuthRequest {
  nextUrl: URL;
}

interface AuthContext {
  auth: {
    user: Record<string, unknown> | null;
  } | null;
  request: AuthRequest;
}

export const authConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/auth/login",
 
  },
  callbacks: {
    authorized({ auth, request }: AuthContext) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/");
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", request.nextUrl));
      }
      return true;
    },
  },
};

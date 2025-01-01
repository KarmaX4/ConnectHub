
export const authConfig = {
  providers:[],
  pages: {
    signIn: "/auth/login",
    register: "/auth/register",
  },
  callbacks: {
    authorized({ auth, request }:{ auth : any, request: any }) {
      const isLoggedIn = auth?.user
      
      // console.log("auth =",auth?.user);
      
    
      const isOnDashboard = request.nextUrl.pathname.startsWith("/");
      // const isHomePage = request.nextUrl.pathname === "/";
      // if(isHomePage){
      //   return Response.redirect(new URL("/", request.nextUrl));
      // }
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

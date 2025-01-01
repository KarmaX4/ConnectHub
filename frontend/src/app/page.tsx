import CreatePost from "@/components/CreatePost";
import Posts from "@/components/posts";
import { auth, signOut } from "./auth";
import { LuLogOut } from "react-icons/lu";
import { handleSignOut } from "./actions/auth";
import Logout from "@/components/logout";

export default async function Home() {
  const session = await auth();
  async function handleSignOut() {
    await signOut();
  }
  console.log(session?.user?.user?.username);
  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">ConnectHub</h1>
        <div className="flex items-center gap-4">
          <span className="text-xl">{session?.user?.user?.username}</span>
        <Logout />
        </div>
      </header>
      <CreatePost />
      <Posts user={session} />
    </div>
  );
}

import { likePost } from "@/app/actions/posts";

interface LikeButtonProps {
  count: number;
  liked: boolean;
  postId: string;
}


export default function LikeButton({ count, liked, postId }: LikeButtonProps) {
  async function handleLike() {
    await likePost(postId);
    console.log('like');
  }
  return (
    <button onClick={handleLike} className={`flex items-center gap-1 text-sm ${liked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {count}
    </button>
  );
} 
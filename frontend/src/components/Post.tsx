"use client";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import LikeButton from "@/components/LikeButton";
import CommentButton from "@/components/CommentButton";
import { useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { deletePost, updatePost } from "@/app/actions/posts";
import { useAppDispatch } from "@/hooks/redux";
import { triggerRefresh } from "@/store/slices/postsSlice";

interface PostProps {
  post: {
    _id: string;
    content: string;
    userId: {
      username: string;
      profilePicture: string;
    };
    likes: string[];
    comments: {
      userId: string;
      content: string;
      createdAt: string;
    }[];
    createdAt: string;
    selfPost: boolean;
  };
  user: any;
  onUpdatePost?: (postId: string, newContent: string) => Promise<void>;
}

export default function Post({ post, user }: PostProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const userId = user.userId;
  confirm
  
  const dispatch = useAppDispatch();
  const handleSave = async () => {
    await updatePost(post._id, editContent);
    dispatch(triggerRefresh());
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deletePost(post._id);
    dispatch(triggerRefresh());
  };


  return (
    <article
      className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 ${
        post.selfPost ? "border-2 border-blue-500" : ""
      }`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Image
            src={"/images/boy-animation.webp"}
            alt={`${post.userId.username}'s profile`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-3">
            <h2 className="font-semibold">
              {post.userId.username}
              {post.selfPost && (
                <span className="ml-2 text-sm text-blue-500">(You)</span>
              )}
            </h2>
            <p className="text-sm text-gray-500">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {post.selfPost && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="ml-auto p-2 text-gray-500 hover:text-blue-500 flex items-center">
              <MdModeEditOutline className="h-5 w-5" />
              {"Edit"}
            </button>
          )}
          {post.selfPost && (
            <button
              onClick={handleDelete}
              className="ml-auto p-2 text-gray-500 hover:text-red-500 flex items-center">
              <MdDelete className="h-5 w-5" />
              {"Delete"}
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="mb-4">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            rows={3}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditContent(post.content);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
      )}

      <div className="flex items-center gap-4">
        <LikeButton postId={post._id} liked={post.likes.includes(userId)} count={post.likes.length} />
        <CommentButton count={post.comments.length} />
      </div>
    </article>
  );
}
